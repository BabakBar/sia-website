import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import pngToIco from 'png-to-ico'

const publicDir = path.resolve(process.cwd(), 'public')

const iconSource = path.join(publicDir, 'icon-source.svg')
const ogSource = path.join(publicDir, 'og-image.svg')

async function fileExists(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

async function main() {
  if (!(await fileExists(iconSource))) {
    throw new Error(`Missing icon source: ${iconSource}`)
  }

  if (!(await fileExists(ogSource))) {
    throw new Error(`Missing OG source: ${ogSource}`)
  }

  // PWA icons
  await sharp(iconSource).resize(192, 192).png().toFile(path.join(publicDir, 'pwa-192x192.png'))
  await sharp(iconSource).resize(512, 512).png().toFile(path.join(publicDir, 'pwa-512x512.png'))

  // Apple touch icon
  await sharp(iconSource).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'))

  // OG image
  await sharp(ogSource).resize(1200, 630).png().toFile(path.join(publicDir, 'og-image.png'))

  // Favicon ICO (multi-size)
  const png16 = await sharp(iconSource).resize(16, 16).png().toBuffer()
  const png32 = await sharp(iconSource).resize(32, 32).png().toBuffer()
  const png48 = await sharp(iconSource).resize(48, 48).png().toBuffer()

  const ico = await pngToIco([png16, png32, png48])
  await fs.writeFile(path.join(publicDir, 'favicon.ico'), ico)

  // Also emit a simple PNG favicon for platforms that prefer it
  await sharp(iconSource).resize(32, 32).png().toFile(path.join(publicDir, 'favicon-32x32.png'))
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
