import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const read=p=>readFileSync(new URL('../public/'+p,import.meta.url),'utf8');
test('French policies retain every section, paragraph and list item',()=>{
 for(const key of ['privacy','terms','conduct']){
  const en=read(key+'.html'), fr=read(key+'/fr/index.html');
  const main=html=>html.match(/<main>[\s\S]*?<\/main>/)[0];
  for(const tag of ['h1','h2','p','li'])assert.equal((main(fr).match(new RegExp('<'+tag+'(?:>| )','g'))||[]).length,(main(en).match(new RegExp('<'+tag+'(?:>| )','g'))||[]).length,`${key}: ${tag} parity`);
  assert.match(fr,/<html lang="fr-CA">/);
  assert.ok(fr.includes(`href="/${key}" lang="en-CA"`));
  assert.ok(fr.includes(`href="/${key}/fr/" lang="fr-CA"`));
  assert.match(fr,/privacy@cxoopenmic.com/);
  assert.match(fr,key==='terms'?/1er mai 2026/:/17 juillet 2026/);
 }
});
test('French Montréal pages have direct French FAQ and legal navigation',()=>{
 for(const path of ['ca/montreal/fr/index.html','ca/montreal/fr/fall2026/index.html']){
  const html=read(path);
  for(const dest of ['faq','privacy','terms','conduct'])assert.ok(html.includes(`href="/${dest}/fr/"`),dest);
  assert.match(html,/mobile-nav.css\?v=3/);
 }
});
test('language preference rewrites only known same-origin links and preserves explicit English',()=>{
 const handlers=[];
 const link=(href,hreflang='')=>({href,getAttribute:()=>href,hreflang,addEventListener:(_,fn)=>handlers.push(fn)});
 const faq=link('/faq/'),privacy=link('/privacy'),external=link('https://example.com/privacy'),other=link('/sponsors/'),english=link('/faq/','en-CA');
 const store=new Map([['ciso-language','fr']]);
 const context={URL,location:{href:'https://cisoopenmic.com/',origin:'https://cisoopenmic.com'},localStorage:{getItem:k=>store.get(k),setItem:(k,v)=>store.set(k,v)},document:{documentElement:{lang:'en'},querySelectorAll:selector=>selector==='a[hreflang]'?[english]:[faq,privacy,external,other]}};
 vm.runInNewContext(read('assets/language.js'),context);
 assert.equal(faq.href,'/faq/fr/');assert.equal(privacy.href,'/privacy/fr/');assert.equal(external.href,'https://example.com/privacy');assert.equal(other.href,'/sponsors/');assert.equal(english.href,'/faq/');
 handlers[0]();assert.equal(store.get('ciso-language'),'en');
 context.localStorage={getItem(){throw Error('blocked')},setItem(){throw Error('blocked')}};
 assert.doesNotThrow(()=>vm.runInNewContext(read('assets/language.js'),context));
});
