import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const read = path => readFileSync(new URL('../'+path, import.meta.url), 'utf8');
const en = read('public/faq/index.html');
const fr = read('public/faq/fr/index.html');
test('French and English FAQ cover the same question count and sections', () => {
  assert.equal([...fr.matchAll(/<summary>/g)].length, 41);
  assert.equal([...en.matchAll(/<summary>/g)].length, 41);
  assert.equal([...fr.matchAll(/class="faq-section"/g)].length, 6);
  assert.match(fr,/href="\/privacy\/fr\/"/);
  assert.match(fr,/href="\/terms\/fr\/"/);
  assert.match(fr,/href="\/conduct\/fr\/"/);
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
