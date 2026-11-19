const webhook = process.env.COOLIFY_WEBHOOK_URL;
const token = process.env.COOLIFY_API_TOKEN;
const expectedCommit = process.env.GITHUB_SHA;
if (!webhook || !token || !expectedCommit) throw new Error('Deployment environment is incomplete');

const headers = { Authorization: `Bearer ${token}` };
const response = await fetch(webhook, { method: 'POST', headers, signal: AbortSignal.timeout(30_000) });
if (!response.ok) throw new Error(`Coolify rejected deployment: HTTP ${response.status}`);
const result = await response.json();
const deployment = result.deployments?.find(
  (item: { resource_uuid: string }) => item.resource_uuid === 'zsossos8so8occ4c4gg8w0sk'
);
if (!deployment?.deployment_uuid) throw new Error('Coolify did not return this website’s deployment ID');

// The existing CI token intentionally has deploy permission without API read
// permission. Observe the released revision without broadening that credential.
const endpoint = new URL('/revision.txt', process.env.SMOKE_BASE_URL ?? 'https://www.babakbarghi.com');
console.log(`Waiting for public revision ${expectedCommit} (deployment ${deployment.deployment_uuid})`);
const deadline = Date.now() + 10 * 60_000;
let consecutiveMatches = 0;
for (let attempt = 0; Date.now() < deadline; attempt++) {
  endpoint.searchParams.set('release', `${expectedCommit}-${attempt}`);
  try {
    const published = await fetch(endpoint, {
      headers: { 'Cache-Control': 'no-cache' },
      signal: AbortSignal.timeout(10_000),
    });
    if (published.ok && (await published.text()).trim() === expectedCommit) {
      // The proxy may briefly serve both containers during a rolling update.
      consecutiveMatches++;
      if (consecutiveMatches === 3) {
        console.log(`Public website is serving ${expectedCommit}`);
        process.exit(0);
      }
    } else {
      consecutiveMatches = 0;
    }
  } catch {
    // A rolling update may briefly interrupt the request; the deadline is fixed.
    consecutiveMatches = 0;
  }
  await Bun.sleep(5000);
}
throw new Error('Timed out waiting for the checked revision to become public');
