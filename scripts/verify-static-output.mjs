import { readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');

const expectedPages = [
  {
    file: 'index.html',
    canonical: 'https://www.babakbarghi.com/',
    visibleText: 'Salesforce–Azure–SAP integration',
  },
  {
    file: 'blog/index.html',
    canonical: 'https://www.babakbarghi.com/blog',
    visibleText: 'Posts',
  },
  {
    file: 'blog/hello-world/index.html',
    canonical: 'https://www.babakbarghi.com/blog/hello-world',
    visibleText: 'Welcome to my blog',
  },
  {
    file: '404.html',
    canonical: 'https://www.babakbarghi.com/404.html',
    visibleText: 'Nothing lives at this URL.',
  },
];

for (const page of expectedPages) {
  const html = await readFile(path.join(dist, page.file), 'utf8');

  if (html.includes('<div id="root"></div>')) {
    throw new Error(`${page.file} has an empty application root`);
  }

  if (!html.includes(page.visibleText)) {
    throw new Error(`${page.file} is missing expected visible content`);
  }

  if (!html.includes(`<link rel="canonical" href="${page.canonical}"`)) {
    throw new Error(`${page.file} has the wrong canonical URL`);
  }
}

const sitemap = await readFile(path.join(dist, 'sitemap.xml'), 'utf8');

if (sitemap.includes('/404.html')) {
  throw new Error('sitemap.xml must not contain the static error document');
}

const indexNowKeyFile = '0003fb406392c14511a50a188de4d5e6.txt';
const indexNowKey = await readFile(path.join(dist, indexNowKeyFile), 'utf8');

if (indexNowKey.trim() !== indexNowKeyFile.replace('.txt', '')) {
  throw new Error('The IndexNow ownership key is missing from static output');
}

const nginx = await readFile(path.join(root, 'ops/nginx.conf'), 'utf8');

if (!nginx.includes('try_files $uri $uri/index.html =404;')) {
  throw new Error('nginx must return 404 instead of falling back to the homepage');
}

console.log(`verified ${expectedPages.length} static pages + sitemap + nginx route contract`);
