import assert from 'node:assert/strict';

// Run against a Pages preview or deployment, not a generic static file server.
const origin = process.argv[2];
assert.ok(origin, 'Usage: node scripts/check-public-security.mjs <preview-origin>');
const routes = ['/', '/privacy', '/terms', '/conduct', '/assets/account-nav.js'];
for (const path of routes) {
  const response = await fetch(new URL(path, origin));
  assert.equal(response.status, 200, path);
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff', path);
  assert.equal(response.headers.get('referrer-policy'), 'strict-origin-when-cross-origin', path);
  assert.equal(response.headers.get('strict-transport-security'), 'max-age=86400', path);
  const policy = response.headers.get('content-security-policy') || '';
  assert.match(policy, /object-src 'none'/, path);
  assert.match(policy, /base-uri 'self'/, path);
  assert.match(policy, /frame-ancestors 'self'/, path);
  // This baseline must not block existing scripts, registration frames or login requests.
  assert.doesNotMatch(policy, /(?:default|script|connect|frame)-src|form-action|sandbox/, path);
  assert.doesNotMatch(response.headers.get('permissions-policy') || '', /publickey-credentials|payment/, path);
  assert.equal(response.headers.get('x-powered-by'), null, path);
  console.log('PASS headers and route', path);
}
for (const path of ['/missing-security-check-page', '/.env', '/.git/HEAD', '/AGENTS.md']) {
  const response = await fetch(new URL(path, origin));
  assert.equal(response.status, 404, path);
  assert.match(await response.text(), /Page not found/, path);
  console.log('PASS not found', path);
}
