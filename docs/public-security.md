# Public site security baseline

The deployed static directory is `public/`. Its `_headers` policy applies to Pages static responses, not the separate Workers handling accounts, login, API calls, sponsorship, or newsletters.

The baseline prevents MIME sniffing, restricts referrer details, blocks plugin objects and foreign base URLs, and limits framing to this origin and the CxO editorial origins. It disables unused camera, microphone, location and USB access. HSTS initially lasts one day and deliberately does not include subdomains or preload.

There is no `default-src`, `script-src`, `connect-src`, `frame-src`, `form-action`, cross-origin isolation, or public-key credential restriction in this first pass. Inline scripts, Turnstile, Luma registration/payment embeds, cross-origin newsletter submission and authentication redirects retain their existing behavior. This is a baseline, not a complete XSS policy or authentication audit.

`404.html` gives unknown static paths a real not-found response instead of Pages' implicit SPA homepage fallback. Existing extensionless HTML routes and directory indexes remain supported; Worker routes take precedence.

Before merging, validate the Pages preview: homepage and assets; legal pages; unknown URL returns 404; security headers on HTML and assets; embedded registration and Turnstile. After deployment, check `/account/`, sign-in and passkeys in a real browser. Automated source checks cannot prove end-to-end authentication.

Revert this change to roll back the static headers and 404 handling. HSTS already stored in browsers expires within one day.

Reference: https://developers.cloudflare.com/pages/configuration/headers/

HTTP regression check: `node scripts/check-public-security.mjs http://localhost:8791` (use the appropriate preview port or deployment URL). The check covers home/legal/assets headers and missing-file responses. Local Cloudflare previews passed all nine requests for each site.
