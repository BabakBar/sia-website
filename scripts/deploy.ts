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

const endpoint = new URL(`/api/v1/deployments/${deployment.deployment_uuid}`, webhook);
console.log(`Observing deployment ${deployment.deployment_uuid}`);
for (let attempt = 0; attempt < 120; attempt++) {
  const statusResponse = await fetch(endpoint, { headers, signal: AbortSignal.timeout(30_000) });
  if (!statusResponse.ok) throw new Error(`Cannot observe deployment: HTTP ${statusResponse.status}`);
  const current = await statusResponse.json();
  if (current.status === 'finished') {
    if (current.commit !== expectedCommit) throw new Error('Deployed commit differs from the checked commit');
    console.log(`Deployment finished at ${expectedCommit}`);
    process.exit(0);
  }
  if (['failed', 'cancelled', 'canceled'].includes(current.status)) {
    throw new Error(`Deployment ${current.status}`);
  }
  await Bun.sleep(5000);
}
throw new Error('Timed out waiting for deployment completion');
