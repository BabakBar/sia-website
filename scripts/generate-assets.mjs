import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import pngToIco from 'png-to-ico'

const publicDir = path.resolve(process.cwd(), 'public')

// Preferred workflow: keep ONE “master” image and generate all sizes from it.
// User-provided master:
const masterFavicon = path.join(publicDir, 'BB-favicon.jpg')

// Optional future-friendly names (in case you want to switch later without changing the script)
const brandMasterCandidates = [
  masterFavicon,
  path.join(publicDir, 'brand-master.svg'),
  path.join(publicDir, 'brand-master.png'),
  path.join(publicDir, 'brand-master.webp'),
  path.join(publicDir, 'brand-master.jpg'),
  path.join(publicDir, 'brand-master.jpeg'),
]

// Back-compat fallbacks (old workflow)
const iconSourceFallback = path.join(publicDir, 'icon-source.svg')
const ogSourceFallback = path.join(publicDir, 'og-image.svg')

async function fileExists(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

async function firstExisting(paths) {
  for (const p of paths) {
    if (await fileExists(p)) return p
  }
  return null
}

async function renderSquarePng({
  inputPath,
  size,
  outputPath,
  paddingRatio,
  background,
}) {
  const pad = Math.round(size * paddingRatio)
  const inner = size - pad * 2

  const innerPng = await sharp(inputPath)
    .resize(inner, inner, {
      fit: 'contain',
      withoutEnlargement: true,
      background,
    })
    .png()
    .toBuffer()

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background,
    },
  })
    .composite([{ input: innerPng, left: pad, top: pad }])
    .png()
    .toFile(outputPath)
}

function buildOgSvg({ iconPngBase64 }) {
  // Uses system fonts so this works without bundling font files.
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="Babak Barghi — Cloud &amp; AI Engineer">
  <defs>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#1B4332" stop-opacity="0.95"/>
      <stop offset="1" stop-color="#1B4332" stop-opacity="0.35"/>
    </linearGradient>
    <filter id="noise" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.10 0"/>
    </filter>
  </defs>

  <rect width="1200" height="630" fill="#0A0A0A"/>
  <rect width="1200" height="630" filter="url(#noise)" opacity="0.20"/>

  <circle cx="1030" cy="-120" r="460" fill="#1B4332" opacity="0.12"/>
  <circle cx="160" cy="740" r="520" fill="#1B4332" opacity="0.08"/>

  <rect x="96" y="132" width="160" height="160" rx="32" fill="#0D0D0D" stroke="#1B4332" stroke-opacity="0.55"/>
  <image x="96" y="132" width="160" height="160" href="data:image/png;base64,${iconPngBase64}" />

  <text x="286" y="198" fill="#FAFAFA" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" font-size="58" font-weight="800" letter-spacing="-0.02em">Babak Barghi</text>
  <text x="286" y="248" fill="#1B4332" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" font-size="28" font-weight="700">Cloud &amp; AI Engineer</text>

  <rect x="286" y="285" width="560" height="10" rx="5" fill="url(#accent)" opacity="0.75"/>

  <text x="286" y="356" fill="#A3A3A3" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" font-size="28" font-weight="600">Architecting intelligent systems</text>
  <text x="286" y="428" fill="#D4D4D4" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" font-size="22" font-weight="600">babakbarghi.com</text>
</svg>`
}

async function main() {
  const bg = '#0A0A0A'

  const iconInput =
    (await firstExisting(brandMasterCandidates)) ??
    ((await fileExists(iconSourceFallback)) ? iconSourceFallback : null)

  if (!iconInput) {
    throw new Error(
      `Missing icon source. Expected one of: ${[...brandMasterCandidates, iconSourceFallback].join(
        ', '
      )}`
    )
  }

  // PWA icons (maskable needs padding)
  await renderSquarePng({
    inputPath: iconInput,
    size: 192,
    outputPath: path.join(publicDir, 'pwa-192x192.png'),
    paddingRatio: 0.16,
    background: bg,
  })
  await renderSquarePng({
    inputPath: iconInput,
    size: 512,
    outputPath: path.join(publicDir, 'pwa-512x512.png'),
    paddingRatio: 0.20,
    background: bg,
  })

  // Apple touch icon
  await renderSquarePng({
    inputPath: iconInput,
    size: 180,
    outputPath: path.join(publicDir, 'apple-touch-icon.png'),
    paddingRatio: 0.14,
    background: bg,
  })

  // PNG favicons (tight framing for tiny sizes)
  await renderSquarePng({
    inputPath: iconInput,
    size: 16,
    outputPath: path.join(publicDir, 'favicon-16x16.png'),
    paddingRatio: 0.04,
    background: bg,
  })
  await renderSquarePng({
    inputPath: iconInput,
    size: 32,
    outputPath: path.join(publicDir, 'favicon-32x32.png'),
    paddingRatio: 0.04,
    background: bg,
  })

  // Favicon ICO (multi-size)
  const png16 = await sharp(path.join(publicDir, 'favicon-16x16.png')).png().toBuffer()
  const png32 = await sharp(path.join(publicDir, 'favicon-32x32.png')).png().toBuffer()
  const png48 = await sharp(iconInput)
    .resize(48, 48, { fit: 'contain', background: bg })
    .png()
    .toBuffer()

  const ico = await pngToIco([png16, png32, png48])
  await fs.writeFile(path.join(publicDir, 'favicon.ico'), ico)

  // OG image: generate from the master icon when available, otherwise fallback to og-image.svg
  const hasMaster = (await fileExists(masterFavicon)) || (await fileExists(path.join(publicDir, 'brand-master.svg')))

  if (hasMaster) {
    const iconForOg = await sharp(iconInput)
      .resize(160, 160, { fit: 'contain', background: bg })
      .png()
      .toBuffer()

    const ogSvg = buildOgSvg({ iconPngBase64: iconForOg.toString('base64') })
    await sharp(Buffer.from(ogSvg))
      .resize(1200, 630)
      .png()
      .toFile(path.join(publicDir, 'og-image.png'))
  } else {
    if (!(await fileExists(ogSourceFallback))) {
      throw new Error(`Missing OG source fallback: ${ogSourceFallback}`)
    }
    await sharp(ogSourceFallback).resize(1200, 630).png().toFile(path.join(publicDir, 'og-image.png'))
  }
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
