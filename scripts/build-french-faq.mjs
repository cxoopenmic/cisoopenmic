import {readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

const root = new URL('../', import.meta.url);
export function buildFrenchFaq() {
  let html = readFileSync(new URL('public/faq/index.html', root), 'utf8');
  const translations = JSON.parse(readFileSync(new URL('cms/faq-fr.json', root), 'utf8'));
  const byQuestion = new Map(translations.map(([en, question, answer]) => [en, {question, answer}]));
  let count = 0;
  html = html.replace(/<summary>(.*?)<\/summary><div class="faq-answer"><p>(.*?)<\/p><\/div>/gs, (_, en) => {
    const item = byQuestion.get(en);
    if (!item) throw new Error(`Missing French translation: ${en}`);
    count++;
    return `<summary>${item.question}</summary><div class="faq-answer"><p>${item.answer}</p></div>`;
  });
  if (count !== translations.length || byQuestion.size !== count) throw new Error('FAQ translation parity mismatch');
  const replacements = [
    ['<html lang="en-CA">', '<html lang="fr-CA">'],
    ['Frequently Asked Questions · CISO Open Mic', 'Foire aux questions · CISO Open Mic'],
    ['Answers about CISO Open Mic events, attendance, speaking, registration, capacity and sponsorship.', 'Réponses sur les événements CISO Open Mic, la participation, le micro, les inscriptions, la capacité et les commandites.'],
    ['rel="canonical" href="https://cisoopenmic.com/faq/"', 'rel="canonical" href="https://cisoopenmic.com/faq/fr/"'],
    ['aria-label="FAQ language"', 'aria-label="Langue de la FAQ"'],
    ['hreflang="en-CA" aria-current="page"', 'hreflang="en-CA"'],
    ['hreflang="fr-CA">Français', 'hreflang="fr-CA" aria-current="page">Français'],
    ['aria-label="Main navigation"', 'aria-label="Navigation principale"'],
    ['>Home</a>', '>Accueil</a>'], ['>Blog</a>', '>Blogue</a>'], ['>Sponsors</a>', '>Commanditaires</a>'], ['>Partners</a>', '>Partenaires</a>'],
    ['href="/faq/" aria-current="page"', 'href="/faq/fr/" aria-current="page"'],
    ['aria-label="Switch to dark theme"', 'aria-label="Activer le thème sombre" data-dark-aria-label="Activer le thème sombre" data-light-aria-label="Activer le thème clair"'],
    ['Frequently asked questions', 'Foire aux questions'], ['Questions, answered.', 'Vos questions,<br>nos réponses.'],
    ['What to expect from CISO Open Mic, how to participate and how each local gathering works.', 'Découvrez CISO Open Mic, les façons de participer et le déroulement des événements locaux.'],
    ['Start with your city.', 'Commencez par votre ville.'],
    ['Dates, locations, capacity and registration details are published on each city page as they become available.', 'Les dates, les lieux, la capacité et les renseignements d’inscription sont publiés sur la page de chaque ville dès qu’ils sont disponibles.'],
    ['Search the FAQ', 'Rechercher dans la FAQ'], ['Search registration, mic rules, sponsors…', 'Inscription, micro, commanditaires…'], ['>Clear</button>', '>Effacer</button>'],
    ['Search all questions and answers.', 'Recherchez dans toutes les questions et réponses.'], ['FAQ categories', 'Catégories de la FAQ'], ['Browse by topic', 'Parcourir par sujet'],
    ['>About</a>', '>À propos</a>'], ['Registration and approval', 'Inscription et approbation'], ['Taking the mic', 'Prendre le micro'], ['At the event', 'Sur place'], ['Judges and awards', 'Jury et prix'],
    ['No matching questions.', 'Aucune question correspondante.'], ['Try a different word or clear the search to see every question.', 'Essayez un autre mot ou effacez la recherche pour afficher toutes les questions.'],
    ['The experience', 'L’expérience'], ['About CISO Open Mic', 'À propos de CISO Open Mic'], ['Taking part', 'Participer'], ['Your contribution', 'Votre contribution'], ['In the room', 'Pendant l’événement'], ['Recognition', 'Reconnaissance'], ['Judges, awards and certificates', 'Jury, prix et attestations'], ['Community support', 'Soutenir la communauté'], ['Sponsors and commercial participation', 'Commanditaires et participation commerciale'],
    ['>Privacy Policy</a>', '>Politique de confidentialité (anglais)</a>'], ['>Terms of Use</a>', '>Conditions d’utilisation (anglais)</a>'], ['>Code of Conduct</a>', '>Code de conduite (anglais)</a>'],
    ["'Link to this answer'", "'Lien vers cette réponse'"], ['Direct link to: ${question}', 'Lien direct vers : ${question}'],
    ["${visible} ${visible === 1 ? 'result' : 'results'} for “${input.value.trim()}”.", "${visible} ${visible === 1 ? 'résultat' : 'résultats'} pour « ${input.value.trim()} »."],
    ['${items.length} questions available.', '${items.length} questions disponibles.'],
    ["'@type': 'FAQPage',", "'@type': 'FAQPage',\n        inLanguage: 'fr-CA',"],
    ['/assets/mobile-nav.css?v=2', '/assets/mobile-nav.css?v=3'],
    ['/assets/city-20260716.js?v=20260920-1', '/assets/city-20260716.js?v=20260927-fr']
  ];
  for (const [from, to] of replacements) {
    if (!html.includes(from)) throw new Error(`Missing UI source: ${from}`);
    html = html.replaceAll(from, to);
  }
  return html;
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  mkdirSync(new URL('public/faq/fr/', root), {recursive:true});
  writeFileSync(new URL('public/faq/fr/index.html', root), buildFrenchFaq());
}
