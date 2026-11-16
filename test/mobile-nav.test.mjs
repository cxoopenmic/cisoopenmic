import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, readdirSync} from 'node:fs';
import vm from 'node:vm';
const root = new URL('../public/', import.meta.url);
const source = readFileSync(new URL('assets/mobile-nav.js', root), 'utf8');
function setup(lang = 'en') {
  class Element {
    constructor() { this.children=[]; this.attrs={}; this.events={}; this.className=''; this.textContent=''; this.title=''; }
    setAttribute(k,v) { this.attrs[k]=v; }
    getAttribute(k) { return this.attrs[k]; }
    addEventListener(k,fn) { this.events[k]=fn; }
    append(e) { this.children.push(e); }
    replaceChildren() { this.children=[]; }
    focus() { this.focused=true; }
    set href(v) { this.url=new URL(v,'https://cisoopenmic.com/account/').href; }
    get href() { return this.url; }
  }
  const nav=new Element(),header=new Element(),media=new Element(),document=new Element();
  const classes=new Set();
  header.classList={contains:k=>classes.has(k),add:k=>classes.add(k)};
  header.querySelector=()=>nav;
  header.contains=e=>e===header||e===nav||header.children.includes(e)||nav.children.includes(e);
  for(const [href,label] of [['/','Home'],['/events/','Events'],['/faq/','FAQ'],['/account/','My Account']]) {
    const a=new Element();a.href=href;a.textContent=label;nav.append(a);
  }
  nav.querySelectorAll=()=>nav.children.filter(e=>e.href);
  document.querySelector=()=>header;
  document.createElement=()=>new Element();
  document.documentElement={lang};document.readyState='complete';
  const context={document,URL,location:{pathname:'/account/'},matchMedia:()=>media};
  vm.runInNewContext(source,context);
  return {context,document,header,media,button:nav.children.at(-1),panel:header.children[0]};
}
test('mobile menu retains accessible labels and account-only contextual links',()=>{
  const {button,panel}=setup();
  assert.equal(panel.hidden,true);
  button.events.click();
  assert.equal(button.attrs['aria-expanded'],'true');
  assert.deepEqual(panel.children.map(a=>a.textContent),['Home','Blog','Sponsors','Partners','FAQ','My Account','Events']);
  assert.equal(panel.children.find(a=>a.textContent==='My Account').attrs['aria-current'],'page');
  button.events.click();
  assert.equal(panel.hidden,true);
});
test('Escape restores focus; outside click and breakpoint change dismiss the menu',()=>{
  const {button,panel,document,media}=setup();
  button.events.click();
  document.events.keydown({key:'Escape',preventDefault(){}});
  assert.equal(panel.hidden,true);assert.equal(button.focused,true);
  button.events.click();document.events.click({target:{}});
  assert.equal(panel.hidden,true);
  button.events.click();media.events.change();
  assert.equal(panel.hidden,true);
});
test('French labels and duplicate initialization',()=>{
  const {button,panel,context,header}=setup('fr-CA');
  assert.equal(button.attrs['aria-label'],'Ouvrir le menu');
  button.events.click();
  assert.ok(panel.children.some(a=>a.textContent==='Mon compte'));
  vm.runInNewContext(source,context);
  assert.equal(header.children.length,1);
});
test('every static site header loads a shared menu entry point',()=>{
  function visit(dir) {
    for(const entry of readdirSync(dir,{withFileTypes:true})) {
      const file=new URL(entry.name+(entry.isDirectory()?'/':''),dir);
      if(entry.isDirectory())visit(file);
      else if(entry.name.endsWith('.html')){
        const html=readFileSync(file,'utf8');
        if(html.includes('class="site-head"'))assert.match(html,/assets\/(language|city-20260716|account-nav)\.js\?v=menu-20261114/,file.pathname);
      }
    }
  }
  visit(root);
});
