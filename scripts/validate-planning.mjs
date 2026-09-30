import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { parse } from 'parse5';
import { gzipSync } from 'node:zlib';
const url = 'https://borgesprev.com.br/planejamento-previdenciario/';
const html = await readFile('dist/planejamento-previdenciario/index.html', 'utf8');
const nodes=[];
function visit(n){if(n.tagName)nodes.push(n);for(const c of n.childNodes??[])visit(c);}
visit(parse(html));
const attr=(n,key)=>n.attrs?.find(a=>a.name===key)?.value;
const content=n=>(n.childNodes??[]).map(c=>c.value??content(c)).join('');
const tags=name=>nodes.filter(n=>n.tagName===name);
assert.equal(tags('h1').length,1);
assert.equal(content(tags('h1')[0]),'Planejamento Previdenciário');
assert.equal(attr(tags('html')[0],'lang'),'pt-BR');
assert.equal(attr(tags('link').find(n=>attr(n,'rel')==='canonical'),'href'),url);
assert(!tags('meta').some(n=>/noindex/i.test(attr(n,'content')??'')));
const ids=nodes.map(n=>attr(n,'id')).filter(Boolean);
assert.equal(new Set(ids).size,ids.length,'Duplicate IDs');
for(const n of tags('a')){const href=attr(n,'href');if(href?.startsWith('#'))assert(ids.includes(href.slice(1)),`Missing anchor ${href}`);}
assert.equal(tags('details').length,9);
for(const n of tags('details'))assert(content(n).length>200,'FAQ answer missing from HTML');
for(const n of tags('img')){assert(attr(n,'alt')!==undefined);assert(attr(n,'width'));assert(attr(n,'height'));}
for(const n of tags('input'))assert(tags('label').some(l=>attr(l,'for')===attr(n,'id')));
assert.equal(tags('astro-island').length,0);
const schema=JSON.parse(content(tags('script').find(n=>attr(n,'type')==='application/ld+json')));
assert(!schema['@graph'].some(n=>n['@type']==='FAQPage'));
assert.equal(schema['@graph'].find(n=>n['@type']==='WebPage').url,url);
const sitemap=await readFile('dist/sitemap-0.xml','utf8');
assert(sitemap.includes(url));assert(sitemap.includes('<loc>https://borgesprev.com.br/</loc>'));
assert(!sitemap.includes('/cartao/'));assert.equal((sitemap.match(/<url>/g)??[]).length,8);
assert.equal(await readFile('dist/sitemap.xml','utf8'),await readFile('dist/sitemap-index.xml','utf8'));
assert.equal(await readFile('dist/robots.txt','utf8'),await readFile('public/robots.txt','utf8'));
assert.equal(await readFile('dist/645afb922843d07af397741fac293c8f.txt','utf8'),await readFile('public/645afb922843d07af397741fac293c8f.txt','utf8'));
const assets=[];
for(const n of nodes){const ref=n.tagName==='link'&&attr(n,'rel')==='stylesheet'?attr(n,'href'):n.tagName==='script'?attr(n,'src'):null;if(ref?.startsWith('/')){const data=await readFile(`dist${ref}`);assets.push({file:ref,bytes:data.length,gzip:gzipSync(data).length});}}
const inlineJs=tags('script').filter(n=>!attr(n,'src')&&attr(n,'type')!=='application/ld+json').map(content).join('\n');
if(inlineJs)assets.push({file:'inline JavaScript',bytes:Buffer.byteLength(inlineJs),gzip:gzipSync(inlineJs).length});
await writeFile('docs/planning-schema.json',JSON.stringify(schema,null,2)+'\n');
console.log(JSON.stringify({result:'PASS',h1:1,faqAnswersInHtml:9,images:tags('img').length,astroIslands:0,sitemapUrls:8,assets,schema:'docs/planning-schema.json'},null,2));
