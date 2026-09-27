# French FAQ

English remains at `/faq/`; Canadian French is at `/faq/fr/`. Both are static, usable without JavaScript, and expose reciprocal language links. Search, direct-answer links, metadata, theme labels and FAQ structured data are localized. Links to the existing English legal pages are labelled as such.

The English page remains the shared layout source. Maintain the 41 French question/answer entries in `cms/faq-fr.json`, then run `node scripts/build-french-faq.mjs` and `node --test test/faq-fr.test.mjs`. Commit the generated French page. The generator fails on missing/new questions or changed UI text, rather than silently dropping translations. When editing an English answer, review the corresponding French answer too; semantic translation equivalence requires editorial review.

This does not translate the rest of the website or add a CMS editor. Existing English FAQ content and policy remain unchanged.
