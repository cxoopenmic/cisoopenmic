import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {buildFrenchFaq} from '../scripts/build-french-faq.mjs';
const read = path => readFileSync(new URL('../'+path, import.meta.url), 'utf8');
const en = read('public/faq/index.html');
const fr = read('public/faq/fr/index.html');
test('French output matches generator and covers all 41 questions', () => {
  assert.equal(fr, buildFrenchFaq());
  assert.equal([...fr.matchAll(/<summary>/g)].length, 41);
  assert.equal([...en.matchAll(/<summary>/g)].length, 41);
  assert.equal([...fr.matchAll(/class="faq-section"/g)].length, 6);
  for (const [source, question, answer] of JSON.parse(read('cms/faq-fr.json'))) {
    assert.ok(en.includes(`<summary>${source}</summary>`));
    assert.ok(fr.includes(`<summary>${question}</summary>`));
    assert.ok(fr.includes(answer));
  }
});
test('both languages expose language links and French metadata is localized', () => {
  for (const page of [en,fr]) {
    assert.match(page,/hreflang="en-CA" href="https:\/\/cisoopenmic.com\/faq\/"/);
    assert.match(page,/hreflang="fr-CA" href="https:\/\/cisoopenmic.com\/faq\/fr\/"/);
  }
  assert.match(fr,/<html lang="fr-CA">/);
  assert.match(fr,/rel="canonical" href="https:\/\/cisoopenmic.com\/faq\/fr\/"/);
  assert.match(fr,/hreflang="fr-CA" aria-current="page">Français/);
  assert.match(fr,/data-light-aria-label="Activer le thème clair"/);
  assert.doesNotMatch(fr,/Search the FAQ|questions available|Link to this answer|No matching questions/);
});
test('scripts parse and search normalization ignores accents', () => {
  for (const page of [en,fr]) {
    for (const [,script] of page.matchAll(/<script>([\s\S]*?)<\/script>/g)) new vm.Script(script);
    const expression = page.match(/const normalize = (.*);/)[1];
    const normalize = vm.runInNewContext(`(${expression})`);
    assert.equal(normalize('  ÉVÉNEMENT  Montréal  '), 'evenement montreal');
  }
});
