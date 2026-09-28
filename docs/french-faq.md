# French FAQ

English remains at `/faq/`; Canadian French is at `/faq/fr/`. Both are static, usable without JavaScript, and expose reciprocal language links. Search, direct-answer links, metadata, theme labels and FAQ structured data are localized. French navigation links to the French legal pages.

The published HTML files are now the source of truth, managed through the CMS Site pages workspace. English and French have separate editors, previews, approvals and history in that workspace. The French editor shows the current English text for comparison. Review fingerprints flag French content when either language changes, and an explicit review checkbox records the comparison against the loaded English version. The old one-way JSON generator has been retired so it cannot overwrite CMS edits.

French privacy, terms and conduct pages are available at `/privacy/fr/`, `/terms/fr/` and `/conduct/fr/`. Their original effective dates remain unchanged. The English policies have not been rewritten. Legal translation should receive qualified review before publication; no language-precedence clause has been invented.

French Montréal pages link to French FAQ/legal pages without requiring JavaScript. The small shared language helper remembers an explicit choice where browser storage is available and adapts links only for known French counterparts. It does not redirect URLs, translate English-only pages, or override language-switch links. Templates in `cms/legal-fr/` and the initialisation script are one-time scaffolding; use the CMS for later edits.
