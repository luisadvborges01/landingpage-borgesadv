import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { parse } from 'parse5';
import { gzipSync } from 'node:zlib';
const site='https://borgesprev.com.br';
const slugs=['aposentadoria','planejamento-previdenciario','bpc-loas','pensao-por-morte','beneficio-por-incapacidade','aposentadoria-rural','aposentadoria-especial'];
const attr=(n,k)=>n?.attrs?.find(a=>a.name===k)?.value;
const content=n=>(n.childNodes??[]).map(c=>c.value??content(c)).join('');
const cache=new Map();
async function document(route){
  if(cache.has(route))return cache.get(route);
  const html=await readFile(`dist${route}index.html`,'utf8'), nodes=[];
  function visit(n){if(n.tagName)nodes.push(n);for(const c of n.childNodes??[])visit(c);}visit(parse(html));
  const tags=t=>nodes.filter(n=>n.tagName===t);
  const graph=tags('script').filter(n=>attr(n,'type')==='application/ld+json').flatMap(n=>{const s=JSON.parse(content(n));return s['@graph']??[s];});
  const result={html,nodes,tags,graph,ids:nodes.map(n=>attr(n,'id')).filter(Boolean)};cache.set(route,result);return result;
}
const home=await document('/');
const organization=home.graph.find(n=>n['@type']==='LegalService');
const website=home.graph.find(n=>n['@type']==='WebSite');
const results=[];
for(const slug of slugs){
  const route=`/${slug}/`, canonical=site+route, {html,nodes,tags,graph,ids}=await document(route);
  assert.equal(tags('h1').length,1,slug);assert.equal(attr(tags('html')[0],'lang'),'pt-BR');
  assert.equal(attr(tags('link').find(n=>attr(n,'rel')==='canonical'),'href'),canonical);
  const title=content(tags('title')[0]), description=attr(tags('meta').find(n=>attr(n,'name')==='description'),'content');
  assert(title.length>15&&description.length>70);assert(!tags('meta').some(n=>/noindex/.test(attr(n,'content')??'')));
  for(const [key,value] of [['og:title',title],['og:description',description],['og:url',canonical]])assert.equal(attr(tags('meta').find(n=>attr(n,'property')===key),'content'),value);
  assert.equal(new Set(ids).size,ids.length,`Duplicate IDs: ${slug}`);
  const internalLinks=new Set();
  for(const a of tags('a')){
    const href=attr(a,'href');if(!href)continue;
    if(href.startsWith('#'))assert(ids.includes(href.slice(1)),`${slug}: missing ${href}`);
    else if(href.startsWith('/')){const u=new URL(href,site), target=await document(u.pathname);if(u.hash)assert(target.ids.includes(u.hash.slice(1)),`${slug}: broken ${href}`);internalLinks.add(href);}
    if(href.includes('wa.me')){const u=new URL(href);assert.equal(u.pathname,'/556235824711');assert(u.searchParams.get('text')?.includes('atendimento'));}
  }
  assert(tags('details').length>=6&&tags('details').length<=10);
  for(const d of tags('details'))assert(content(d).length>180,`${slug}: incomplete FAQ`);
  for(const img of tags('img')){assert(attr(img,'alt')!==undefined);assert(attr(img,'width'));assert(attr(img,'height'));}
  for(const i of tags('input'))assert(tags('label').some(l=>attr(l,'for')===attr(i,'id')));
  assert.equal(tags('astro-island').length,0);
  assert.deepEqual(graph.find(n=>n['@type']==='LegalService'),organization);
  assert.deepEqual(graph.find(n=>n['@type']==='WebSite'),website);
  assert(!graph.some(n=>n['@type']==='FAQPage'));assert(!/"(priceRange|aggregateRating|review)"/.test(JSON.stringify(graph)));
  const page=graph.find(n=>n['@type']==='WebPage');assert.equal(page.url,canonical);assert.equal(page.publisher['@id'],organization['@id']);assert.equal(page.isPartOf['@id'],website['@id']);
  const crumbs=graph.find(n=>n['@type']==='BreadcrumbList');assert.equal(crumbs.itemListElement.at(-1).item,canonical);
  const assets=[];
  for(const n of nodes){const ref=n.tagName==='link'&&attr(n,'rel')==='stylesheet'?attr(n,'href'):n.tagName==='script'?attr(n,'src'):null;if(ref?.startsWith('/')){const bytes=await readFile(`dist${ref}`);assets.push({file:ref,bytes:bytes.length,gzip:gzipSync(bytes).length});}}
  const js=tags('script').filter(n=>!attr(n,'src')&&attr(n,'type')!=='application/ld+json').map(content).join('\n');
  if(js)assets.push({file:'inline JavaScript',bytes:Buffer.byteLength(js),gzip:gzipSync(js).length});
  if(slug!=='planejamento-previdenciario'){assert.equal(js.length,0);assert(!tags('script').some(n=>attr(n,'src')));}
  results.push({slug,title,description,canonical,h1:content(tags('h1')[0]),faq:tags('details').length,htmlBytes:Buffer.byteLength(html),assets,internalLinks:[...internalLinks],schema:{'@context':'https://schema.org','@graph':graph}});
}
assert.equal(new Set(results.map(r=>r.title)).size,7);assert.equal(new Set(results.map(r=>r.description)).size,7);
const sitemap=await readFile('dist/sitemap-0.xml','utf8'), urls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
assert.deepEqual(urls.sort(),[site+'/',...slugs.map(s=>`${site}/${s}/`)].sort());
assert.equal(await readFile('dist/sitemap.xml','utf8'),await readFile('dist/sitemap-index.xml','utf8'));
for(const file of ['robots.txt','645afb922843d07af397741fac293c8f.txt'])assert.equal(await readFile(`dist/${file}`,'utf8'),await readFile(`public/${file}`,'utf8'));
await writeFile('docs/services-validation.json',JSON.stringify({result:'PASS',sitemap:urls,pages:results},null,2)+'\n');
console.log(JSON.stringify({result:'PASS',sitemap:urls,pages:results.map(({schema,internalLinks,...r})=>r)},null,2));
