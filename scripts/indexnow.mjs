import { createHash } from 'node:crypto';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { XMLParser, XMLValidator } from 'fast-xml-parser';
import { parse } from 'parse5';

export const ORIGIN = 'https://borgesprev.com.br';
export const KEY = '645afb922843d07af397741fac293c8f';
export const KEY_URL = `${ORIGIN}/${KEY}.txt`;
export const ENDPOINT = 'https://api.indexnow.org/IndexNow';
const root = fileURLToPath(new URL('../', import.meta.url));
const xmlParser = new XMLParser({ parseTagValue: false });
const array = (value) => value == null ? [] : Array.isArray(value) ? value : [value];

export function isPublicPage(value) {
  try {
    const url = new URL(value);
    const path = decodeURIComponent(url.pathname);
    return url.origin === ORIGIN && !url.username && !url.password &&
      !url.search && !url.hash && !path.includes('\\') &&
      !/(^|\/)(cartao|api|assets|internal|admin|_astro|404|500)(\/|$)/i.test(path) &&
      !path.split('/').some((part) => part.startsWith('_') || part.startsWith('.')) &&
      !/\.[^/]+\/?$/.test(path);
  } catch { return false; }
}

function elements(node, result = []) {
  if (node.tagName) result.push(node);
  for (const child of node.childNodes ?? []) elements(child, result);
  return result;
}

export function isIndexable(html, headers, url) {
  if (!/text\/html/i.test(headers.get('content-type') ?? '')) return false;
  if (/\b(noindex|none)\b/i.test(headers.get('x-robots-tag') ?? '')) return false;
  const tags = elements(parse(html)).map((node) => ({
    name: node.tagName,
    attrs: Object.fromEntries(node.attrs.map(({ name, value }) => [name, value])),
  }));
  if (tags.some(({ name, attrs }) => name === 'meta' &&
    /^(robots|googlebot|bingbot|yandex|yandexbot)$/i.test(attrs.name ?? '') &&
    /\b(noindex|none)\b/i.test(attrs.content ?? ''))) return false;
  if (tags.some(({ name, attrs }) => name === 'meta' &&
    /^refresh$/i.test(attrs['http-equiv'] ?? ''))) return false;
  const canonicals = tags.filter(({ name, attrs }) => name === 'link' &&
    (attrs.rel ?? '').toLowerCase().split(/\s+/).includes('canonical'));
  if (canonicals.length !== 1) return false;
  try { return new URL(canonicals[0].attrs.href, url).href === url; }
  catch { return false; }
}

export async function readSitemap(request, start = `${ORIGIN}/sitemap.xml`) {
  const visited = new Set();
  const urls = new Set();
  async function visit(location) {
    const url = new URL(location);
    if (url.origin !== ORIGIN || url.username || url.password || url.search || url.hash ||
        !url.pathname.endsWith('.xml')) throw new Error(`Sitemap não canônico: ${location}`);
    if (visited.has(location)) return;
    if (visited.size >= 100) throw new Error('Limite de 100 sitemaps excedido.');
    visited.add(location);
    const response = await request(location);
    if (response.status !== 200) throw new Error(`Sitemap ${location}: HTTP ${response.status}`);
    const body = await response.text();
    if (XMLValidator.validate(body) !== true) throw new Error(`XML inválido: ${location}`);
    const data = xmlParser.parse(body);
    if (data.sitemapindex) {
      for (const entry of array(data.sitemapindex.sitemap)) await visit(entry.loc);
    } else if (data.urlset != null) {
      for (const entry of array(data.urlset.url)) {
        if (typeof entry.loc !== 'string') throw new Error(`URL inválida em ${location}`);
        if (isPublicPage(entry.loc)) urls.add(entry.loc);
      }
    } else throw new Error(`Documento não é um sitemap: ${location}`);
  }
  await visit(start);
  return [...urls].sort();
}

export async function run({
  fetchImpl = fetch,
  statePath = process.env.INDEXNOW_STATE_FILE || resolve(root, '.indexnow/state.json'),
  dryRun = false,
  log = console.log,
} = {}) {
  // Never follow redirects, including those of the verification file and sitemaps.
  const request = (url, options = {}) => fetchImpl(url, {
    ...options, redirect: 'manual', signal: AbortSignal.timeout(20000),
  });
  const keyResponse = await request(KEY_URL);
  log(`[IndexNow] Chave: HTTP ${keyResponse.status} (${KEY_URL})`);
  if (keyResponse.status !== 200 || await keyResponse.text() !== KEY) {
    throw new Error('Chave ainda não publicada corretamente. Publique o build antes do envio.');
  }
  let previous = {};
  try {
    const saved = JSON.parse(await readFile(statePath, 'utf8'));
    if (saved.version !== 1 || saved.origin !== ORIGIN || !saved.pages ||
        Array.isArray(saved.pages) || typeof saved.pages !== 'object' ||
        Object.values(saved.pages).some((hash) => typeof hash !== 'string')) {
      throw new Error('Estado IndexNow inválido; não sobrescrito.');
    }
    previous = saved.pages;
  } catch (error) { if (error.code !== 'ENOENT') throw error; }

  const current = await readSitemap(request);
  const currentSet = new Set(current);
  const next = { ...previous };
  const changes = [];
  for (const url of current) {
    const response = await request(url);
    if (response.status !== 200) {
      log(`[IndexNow] Ignorada: ${url} — HTTP ${response.status}`);
      continue;
    }
    const html = await response.text();
    if (!isIndexable(html, response.headers, url)) {
      log(`[IndexNow] Ignorada: ${url} — noindex, canonical divergente ou conteúdo não indexável`);
      continue;
    }
    const hash = createHash('sha256').update(html).digest('hex');
    if (previous[url] !== hash) changes.push({ url, hash, type: previous[url] ? 'atualizada' : 'nova' });
  }
  // Only previously submitted public pages qualify for removal notifications.
  // Absence from the sitemap alone is insufficient: require a direct 404/410.
  for (const url of Object.keys(previous)) {
    if (currentSet.has(url) || !isPublicPage(url)) continue;
    const response = await request(url);
    if (response.status === 404 || response.status === 410) {
      changes.push({ url, type: 'removida' });
    } else log(`[IndexNow] Remoção não confirmada: ${url} — HTTP ${response.status}; não enviada`);
  }
  if (!changes.length) {
    log('[IndexNow] Nenhuma alteração elegível. Nenhum POST enviado.');
    return { submitted: [], statuses: [] };
  }
  if (dryRun) {
    log(`[IndexNow] Simulação, sem POST nem alteração do estado: ${JSON.stringify(changes)}`);
    return { submitted: [], statuses: [], planned: changes };
  }
  const submitted = [];
  const statuses = [];
  for (let i = 0; i < changes.length; i += 10000) {
    const batch = changes.slice(i, i + 10000);
    const payload = {
      host: new URL(ORIGIN).host, key: KEY, keyLocation: KEY_URL,
      urlList: batch.map(({ url }) => url),
    };
    const response = await request(ENDPOINT, {
      method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });
    log(`[IndexNow] POST ${ENDPOINT}: HTTP ${response.status}; URLs: ${JSON.stringify(payload.urlList)}`);
    if (response.status !== 200 && response.status !== 202) {
      throw new Error(`API HTTP ${response.status}: ${(await response.text()).slice(0, 500)}. Estado preservado para nova tentativa.`);
    }
    if (response.status === 202) log('[IndexNow] Recebido; validação da chave pendente (202).');
    for (const change of batch) {
      if (change.type === 'removida') delete next[change.url];
      else next[change.url] = change.hash;
    }
    await mkdir(dirname(statePath), { recursive: true });
    const temp = `${statePath}.${process.pid}.tmp`;
    await writeFile(temp, JSON.stringify({ version: 1, origin: ORIGIN, pages: next }, null, 2));
    await rename(temp, statePath);
    submitted.push(...payload.urlList);
    statuses.push(response.status);
  }
  return { submitted, statuses };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  run({ dryRun: process.argv.includes('--dry-run') }).catch((error) => {
    console.error(`[IndexNow] FALHA: ${error.message}`);
    process.exitCode = process.argv.includes('--soft-fail') ? 0 : 1;
  });
}
