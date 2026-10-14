/*
  Regenerates every favicon / app icon of the site from the Volver al Origen
  logo. All landings share these files through the root app segment, so this
  is the only place to touch when the logo changes:

    node scripts/generate-favicons.mjs

  The outputs are committed. Next does not optimize icons — they are served
  as-is — so each platform gets a file at the exact size it asks for instead
  of the 1254x1254 original.
*/
import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

const SOURCE = "public/diagnostico/contenido/logo/new-logo.png";

// The green of the disc, sampled from the source. Opaque variants are filled
// with it so the disc leaves no seam against the square.
const GREEN = { r: 1, g: 49, b: 3, alpha: 1 };
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

// Bounding square of the disc inside the 1254x1254 source, and a mask a few
// pixels inside its edge: the source has a light antialiased rim that shows
// up as a halo on dark browser chrome.
const DISC = { left: 43, top: 39, width: 1168, height: 1168 };
const MASK_RADIUS = 578;

async function disc() {
  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${DISC.width}" height="${DISC.height}">
       <circle cx="${DISC.width / 2}" cy="${DISC.height / 2}" r="${MASK_RADIUS}" fill="#fff"/>
     </svg>`,
  );
  return sharp(SOURCE)
    .extract(DISC)
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();
}

// Round icon on a transparent square: browser tabs, bookmarks, Android.
function transparent(source, size) {
  return sharp(source)
    .resize(size, size, { fit: "contain", background: TRANSPARENT })
    .png({ compressionLevel: 9, palette: true, quality: 90, effort: 10 })
    .toBuffer();
}

// Full-bleed green square. `scale` shrinks the logo inside it: iOS and
// Windows show the whole square, Android crops maskable icons to a shape and
// only guarantees the central 80%.
async function opaque(source, size, scale = 1) {
  const inner = Math.round(size * scale);
  const logo = await sharp(source).resize(inner, inner).png().toBuffer();
  return sharp({
    create: { width: size, height: size, channels: 4, background: GREEN },
  })
    .composite([{ input: logo, gravity: "center" }])
    .flatten({ background: GREEN })
    .png({ compressionLevel: 9, palette: true, quality: 90, effort: 10 })
    .toBuffer();
}

// An .ico is a directory of images; PNG entries are valid since Windows Vista.
function ico(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(entries.length, 4);

  let offset = 6 + 16 * entries.length;
  const directory = entries.map(({ size, png }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size, 0);
    entry.writeUInt8(size, 1);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += png.length;
    return entry;
  });

  return Buffer.concat([header, ...directory, ...entries.map((e) => e.png)]);
}

const logo = await disc();
await mkdir("public/icons", { recursive: true });

const icoEntries = await Promise.all(
  [16, 32, 48].map(async (size) => ({ size, png: await transparent(logo, size) })),
);

const files = {
  // Legacy and desktop browsers, Windows shortcuts and taskbar.
  "src/app/favicon.ico": ico(icoEntries),
  // Modern desktop browsers (Chrome, Edge, Firefox, Safari on macOS).
  "src/app/icon1.png": await transparent(logo, 32),
  // Android Chrome tab and shortcut.
  "src/app/icon2.png": await transparent(logo, 192),
  // iOS / iPadOS home screen and Safari on macOS. Opaque: iOS paints
  // transparency black.
  "src/app/apple-icon.png": await opaque(logo, 180),
  // Web manifest: Android home screen and splash, Windows / macOS installs.
  "public/icons/icon-192.png": await transparent(logo, 192),
  "public/icons/icon-512.png": await transparent(logo, 512),
  "public/icons/icon-maskable-512.png": await opaque(logo, 512, 0.8),
  // Windows start-menu tile.
  "public/icons/mstile-144.png": await opaque(logo, 144),
};

for (const [path, buffer] of Object.entries(files)) {
  await writeFile(path, buffer);
  console.log(`${path}  ${(buffer.length / 1024).toFixed(1)} KB`);
}
