/**
 * Generate favicons from assets/favicon/khenbridge-favicon.png (run after replacing source art).
 * Small sizes: brand mark only. Large sizes: full lockup. Background: white.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import toIco from "to-ico";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const sourcePath = path.join(rootDir, "assets", "favicon", "khenbridge-favicon.png");
const appDir = path.join(rootDir, "src", "app");
const publicDir = path.join(rootDir, "public");

const BLACK_THRESHOLD = 30;
const WHITE_BG = { r: 255, g: 255, b: 255, alpha: 1 };
/** Top portion of trimmed vertical lockup used for tab favicons */
const MARK_CROP_HEIGHT_RATIO = 0.48;
const MARK_FILL_RATIO = 0.88;
const FULL_FILL_RATIO = 0.82;
const MASKABLE_FILL_RATIO = 0.72;

async function makeBackgroundTransparent(buffer) {
  const image = sharp(buffer).ensureAlpha();
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    if (r <= BLACK_THRESHOLD && g <= BLACK_THRESHOLD && b <= BLACK_THRESHOLD) {
      data[i + 3] = 0;
    }
  }

  return sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  });
}

async function prepareTrimmedArtwork() {
  const trimmed = await sharp(sourcePath).trim({ threshold: 15 }).png().toBuffer();
  const meta = await sharp(trimmed).metadata();
  const transparent = await makeBackgroundTransparent(trimmed);
  const rgba = await transparent.png().toBuffer();
  return { buffer: rgba, width: meta.width ?? 0, height: meta.height ?? 0 };
}

async function extractMarkBuffer(fullBuffer, fullWidth, fullHeight) {
  const cropHeight = Math.max(1, Math.round(fullHeight * MARK_CROP_HEIGHT_RATIO));
  return sharp(fullBuffer)
    .extract({ left: 0, top: 0, width: fullWidth, height: cropHeight })
    .png()
    .toBuffer();
}

async function renderSquareIcon(artworkBuffer, size, fillRatio) {
  const contentSize = Math.round(size * fillRatio);
  const content = await sharp(artworkBuffer)
    .resize(contentSize, contentSize, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  const offset = Math.round((size - contentSize) / 2);

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: WHITE_BG,
    },
  })
    .composite([{ input: content, left: offset, top: offset }])
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();
}

async function writeAppOutput(filename, buffer) {
  const outputPath = path.join(appDir, filename);
  await fs.writeFile(outputPath, buffer);

  if (filename.endsWith(".ico")) {
    console.log(`${filename}: ${(buffer.length / 1024).toFixed(1)} KB`);
    return;
  }

  const meta = await sharp(buffer).metadata();
  console.log(`${filename}: ${meta.width}x${meta.height}px, ${(buffer.length / 1024).toFixed(1)} KB`);
}

async function writePublicOutput(filename, buffer) {
  const outputPath = path.join(publicDir, filename);
  await fs.writeFile(outputPath, buffer);
  const meta = await sharp(buffer).metadata();
  console.log(`public/${filename}: ${meta.width}x${meta.height}px, ${(buffer.length / 1024).toFixed(1)} KB`);
}

const { buffer: fullArtwork, width, height } = await prepareTrimmedArtwork();
const markArtwork = await extractMarkBuffer(fullArtwork, width, height);

await fs.mkdir(appDir, { recursive: true });
await fs.mkdir(publicDir, { recursive: true });

const icon96 = await renderSquareIcon(markArtwork, 96, MARK_FILL_RATIO);
const apple180 = await renderSquareIcon(fullArtwork, 180, FULL_FILL_RATIO);
const manifest192 = await renderSquareIcon(fullArtwork, 192, MASKABLE_FILL_RATIO);
const manifest512 = await renderSquareIcon(fullArtwork, 512, MASKABLE_FILL_RATIO);
const icoSizes = await Promise.all(
  [16, 32, 48].map((size) => renderSquareIcon(markArtwork, size, MARK_FILL_RATIO)),
);
const faviconIco = await toIco(icoSizes);

await writeAppOutput("icon.png", icon96);
await writeAppOutput("apple-icon.png", apple180);
await writeAppOutput("favicon.ico", faviconIco);
await writePublicOutput("web-app-manifest-192x192.png", manifest192);
await writePublicOutput("web-app-manifest-512x512.png", manifest512);

console.log("Favicon optimization complete.");
