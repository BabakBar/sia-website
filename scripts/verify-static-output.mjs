import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { posts } from '../src/content/posts/index.ts';

const root = process.cwd();
const dist = path.join(root, 'dist');
const siteUrl = 'https://www.babakbarghi.com';

const expectedPages = [
  {
    file: 'index.html',
    canonical: 'https://www.babakbarghi.com/',
    visibleText: 'Salesforce–Azure–SAP integration',
  },
  {
    file: 'blog/index.html',
    canonical: `${siteUrl}/blog`,
    visibleText: 'Posts',
  },
  ...posts.map(post => ({
    file: `blog/${post.slug}/index.html`,
    canonical: `${siteUrl}/blog/${post.slug}`,
    visibleText: post.title,
    article: post,
  })),
  {
    file: '404.html',
    canonical: `${siteUrl}/404.html`,
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

  if (page.article) {
    if (!html.includes('<meta property="og:type" content="article"')) {
      throw new Error(`${page.file} is missing article Open Graph metadata`);
    }

    if (!html.includes(`<meta property="article:published_time" content="${page.article.publishedAt}"`)) {
      throw new Error(`${page.file} is missing its publication date`);
    }

    if (
      !html.includes('<script type="application/ld+json">') ||
      !html.includes('"@type":"Article"') ||
      !html.includes('"name":"Babak Barghi"')
    ) {
      throw new Error(`${page.file} is missing Article structured data`);
    }
  }

  if (!html.includes('data-website-id="51f09c81-8626-488b-b73b-20c452d3fff7"')) {
    throw new Error(`${page.file} is missing the Umami analytics tracking script`);
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
