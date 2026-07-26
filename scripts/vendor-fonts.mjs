import path from 'node:path';

const fonts = [
  {
    file: 'InterLatin.woff2',
    url: 'https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7W0Q5nw.woff2',
  },
  {
    file: 'JetBrainsMonoLatin.woff2',
    url: 'https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPxDcwgknk-4.woff2',
  },
];

const licenses = [
  {
    file: 'Inter-LICENSE.txt',
    url: 'https://raw.githubusercontent.com/rsms/inter/master/LICENSE.txt',
  },
  {
    file: 'JetBrainsMono-LICENSE.txt',
    url: 'https://raw.githubusercontent.com/JetBrains/JetBrainsMono/master/OFL.txt',
  },
];

const fontDirectory = path.resolve(process.cwd(), 'src/fonts');

await Promise.all(
  fonts.map(async ({ file, url }) => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Unable to download ${file}: HTTP ${response.status}`);
    }

    await Bun.write(path.join(fontDirectory, file), await response.arrayBuffer());
  })
);

await Promise.all(
  licenses.map(async ({ file, url }) => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Unable to download ${file}: HTTP ${response.status}`);
    }

    await Bun.write(path.join(fontDirectory, file), await response.text());
  })
);

console.log(`vendored ${fonts.length} font files and ${licenses.length} licenses`);
