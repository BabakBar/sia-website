import { readFile } from 'node:fs/promises';
import path from 'node:path';

const site = 'https://www.babakbarghi.com';
const host = new URL(site).host;
const keyFile = '0003fb406392c14511a50a188de4d5e6.txt';
const keyLocation = `${site}/${keyFile}`;
const key = (await readFile(path.join(process.cwd(), 'public', keyFile), 'utf8')).trim();

const keyResponse = await fetch(keyLocation, {
  headers: { 'cache-control': 'no-cache' },
});

if (!keyResponse.ok || (await keyResponse.text()).trim() !== key) {
  throw new Error(`IndexNow key is not live at ${keyLocation}`);
}

const sitemapResponse = await fetch(`${site}/sitemap.xml`, {
  headers: { 'cache-control': 'no-cache' },
});

if (!sitemapResponse.ok) {
  throw new Error(`Unable to read the live sitemap: HTTP ${sitemapResponse.status}`);
}

const sitemap = await sitemapResponse.text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => url);

if (urlList.length === 0 || urlList.some(url => new URL(url).host !== host)) {
  throw new Error('The live sitemap does not contain a valid canonical URL set');
}

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host,
    key,
    keyLocation,
    urlList,
  }),
});

if (![200, 202].includes(response.status)) {
  throw new Error(`IndexNow submission failed: HTTP ${response.status}`);
}

console.log(`IndexNow accepted ${urlList.length} canonical URLs with HTTP ${response.status}`);
