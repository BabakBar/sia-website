import path from 'node:path';
import sharp from 'sharp';

const publicDirectory = path.resolve(process.cwd(), 'public');
const source = path.join(publicDirectory, 'IMG-website_edited.jpg');
const widths = [384, 768, 1280];

await Promise.all(
  widths.map(width =>
    sharp(source)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82, smartSubsample: true })
      .toFile(path.join(publicDirectory, `IMG-website_edited-${width}.webp`))
  )
);

console.log(`generated ${widths.length} responsive hero images`);
