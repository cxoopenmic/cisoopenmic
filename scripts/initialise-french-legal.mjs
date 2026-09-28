// One-time scaffolding. The published HTML is subsequently managed by the CMS.
import {readFileSync, writeFileSync, mkdirSync, existsSync} from 'node:fs';
const root=new URL('../',import.meta.url);
for (const key of ['privacy','terms','conduct']) {
 const source=readFileSync(new URL(`public/${key}.html`,root),'utf8');
 const fragment=readFileSync(new URL(`cms/legal-fr/${key}.html`,root),'utf8');
 const title=fragment.match(/<h1>(.*?)<\/h1>/)[1];
 const nav=`<nav class="legal-nav" aria-label="Navigation des politiques"><a href="/faq/fr/">FAQ</a><a href="/privacy/fr/">Confidentialité</a><a href="/terms/fr/">Conditions</a><a href="/conduct/fr/">Conduite</a><a href="/${key}" lang="en-CA" hreflang="en-CA">English</a><a href="/${key}/fr/" lang="fr-CA" hreflang="fr-CA" aria-current="page">Français</a></nav>`;
 const links=`<link rel="canonical" href="https://cisoopenmic.com/${key}/fr/"><link rel="alternate" hreflang="en-CA" href="https://cisoopenmic.com/${key}"><link rel="alternate" hreflang="fr-CA" href="https://cisoopenmic.com/${key}/fr/">`;
 let html=source.replace('<html lang="en">','<html lang="fr-CA">').replace(/<title>.*?<\/title>/,`<title>${title} | CxO Open Mic Inc.</title>${links}`).replace(/<main>[\s\S]*?<\/main>/,`<main>\n${fragment}</main>`).replace('<body>','<body>\n'+nav).replace('CISO Open Mic is a brand licensed to and operated by CxO Open Mic Inc.','CISO Open Mic est une marque exploitée sous licence par CxO Open Mic Inc.').replace('</head>','<link rel="stylesheet" href="/assets/legal-navigation.css"></head>').replace('</body>','<script src="/assets/language.js?v=1"></script></body>');
 const path=new URL(`public/${key}/fr/index.html`,root);
 if (existsSync(path)) throw new Error(`${key}: already exists; edit in CMS instead of overwriting.`);
 mkdirSync(new URL(`public/${key}/fr/`,root),{recursive:true});
 writeFileSync(path,html);
}
