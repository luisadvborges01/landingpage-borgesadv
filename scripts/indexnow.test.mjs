import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { ENDPOINT, KEY, KEY_URL, ORIGIN, isPublicPage, run } from './indexnow.mjs';

const html = (url, extra = '') => `<html><head><link rel="canonical" href="${url}">${extra}</head><body>Public page</body></html>`;
const sitemap = (urls) => `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((url) => `<url><loc>${url}</loc></url>`).join('')}</urlset>`;

async function fixture(t) {
  const dir = await mkdtemp(join(tmpdir(), 'borges-indexnow-'));
  t.after(() => rm(dir, { recursive: true, force: true }));
  const statePath = join(dir, 'state.json');
  const responses = new Map([
    [KEY_URL, () => new Response(KEY)],
    [`${ORIGIN}/sitemap.xml`, () => new Response(`<sitemapindex><sitemap><loc>${ORIGIN}/sitemap-0.xml</loc></sitemap></sitemapindex>`)],
    [`${ORIGIN}/sitemap-0.xml`, () => new Response(sitemap([`${ORIGIN}/`]))],
    [`${ORIGIN}/`, () => new Response(html(`${ORIGIN}/`), { headers: { 'content-type': 'text/html' } })],
  ]);
  const posts = [];
  const options = {
    statePath, log: () => {},
    fetchImpl: async (url, init) => {
      assert.equal(init.redirect, 'manual');
      if (url === ENDPOINT) {
        posts.push(JSON.parse(init.body));
        return responses.has(ENDPOINT) ? responses.get(ENDPOINT)() : new Response('', { status: 200 });
      }
      assert.ok(responses.has(url), `Unexpected fetch: ${url}`);
      return responses.get(url)();
    },
  };
  return { options, responses, posts, statePath };
}

test('submit new/changed pages, skip unchanged, notify confirmed deletion once', async (t) => {
  const { options, responses, posts } = await fixture(t);
  assert.deepEqual((await run(options)).submitted, [`${ORIGIN}/`]);
  assert.deepEqual(posts[0], { host: 'borgesprev.com.br', key: KEY, keyLocation: KEY_URL, urlList: [`${ORIGIN}/`] });
  assert.deepEqual((await run(options)).submitted, []);
  responses.set(`${ORIGIN}/`, () => new Response(html(`${ORIGIN}/`, '<title>Updated</title>'), { headers: { 'content-type': 'text/html' } }));
  assert.deepEqual((await run(options)).submitted, [`${ORIGIN}/`]);
  responses.set(`${ORIGIN}/sitemap-0.xml`, () => new Response(sitemap([])));
  // Redirects are never treated as deletion notifications.
  responses.set(`${ORIGIN}/`, () => new Response('', { status: 301 }));
  assert.deepEqual((await run(options)).submitted, []);
  responses.set(`${ORIGIN}/`, () => new Response('', { status: 410 }));
  assert.deepEqual((await run(options)).submitted, [`${ORIGIN}/`]);
  assert.deepEqual((await run(options)).submitted, []);
});

test('reject restricted paths, assets and noncanonical hosts', () => {
  for (const path of ['/cartao/rodrigo/', '/%63artao/ariane/', '/api/test', '/internal/test', '/_astro/app.js', '/file.vcf', '/img/photo.jpg', '/robots.txt', '/sitemap.xml', '/404', '/?a=1']) {
    assert.equal(isPublicPage(`${ORIGIN}${path}`), false, path);
  }
  assert.equal(isPublicPage('https://www.borgesprev.com.br/'), false);
  assert.equal(isPublicPage(`${ORIGIN}/`), true);
});

test('noindex, redirects, non-HTML and divergent canonicals never get submitted', async (t) => {
  const { options, responses, posts } = await fixture(t);
  for (const response of [
    () => new Response('', { status: 308 }),
    () => new Response(html(`${ORIGIN}/`), { headers: { 'content-type': 'text/html', 'x-robots-tag': 'noindex' } }),
    () => new Response(html(`${ORIGIN}/`, '<meta content="noindex,follow" name="robots">'), { headers: { 'content-type': 'text/html' } }),
    () => new Response(html(`${ORIGIN}/`, '<meta name="bingbot" content="none">'), { headers: { 'content-type': 'text/html' } }),
    () => new Response(html('https://www.borgesprev.com.br/'), { headers: { 'content-type': 'text/html' } }),
    () => new Response('{}', { headers: { 'content-type': 'application/json' } }),
  ]) {
    responses.set(`${ORIGIN}/`, response);
    assert.deepEqual((await run(options)).submitted, []);
  }
  assert.equal(posts.length, 0);
});

test('key 404 or redirect aborts before submission', async (t) => {
  const { options, responses, posts } = await fixture(t);
  for (const status of [404, 308]) {
    responses.set(KEY_URL, () => new Response('', { status }));
    await assert.rejects(run(options), /Chave ainda não publicada/);
  }
  assert.equal(posts.length, 0);
});

test('failed API requests preserve state; 202 records acceptance; dry-run does not write', async (t) => {
  const { options, responses, posts, statePath } = await fixture(t);
  await run({ ...options, dryRun: true });
  assert.equal(posts.length, 0);
  await assert.rejects(readFile(statePath), { code: 'ENOENT' });
  responses.set(ENDPOINT, () => new Response('Unavailable', { status: 503 }));
  await assert.rejects(run(options), /503/);
  await assert.rejects(readFile(statePath), { code: 'ENOENT' });
  responses.set(ENDPOINT, () => new Response('', { status: 202 }));
  assert.deepEqual((await run(options)).statuses, [202]);
  const saved = await readFile(statePath, 'utf8');
  responses.set(`${ORIGIN}/sitemap-0.xml`, () => new Response('<html>broken</html>'));
  await assert.rejects(run(options), /não é um sitemap/);
  assert.equal(await readFile(statePath, 'utf8'), saved);
});
