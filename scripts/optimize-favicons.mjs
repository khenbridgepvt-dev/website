import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import toIco from "to-ico";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const sourcePath = path.join(rootDir, "assets", "logo", "Logo.png");
const appDir = path.join(rootDir, "src", "app");

const BLACK_THRESHOLD = 30;
const BRAND_PURPLE = { r: 33, g: 23, b: 63, alpha: 1 };
const FILL_RATIO = 0.88;

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

async function prepareLogo() {
  const trimmed = await sharp(sourcePath).trim({ threshold: 15 }).png().toBuffer();
  return makeBackgroundTransparent(trimmed);
}

async function renderIcon(logo, size) {
  const logoSize = Math.round(size * FILL_RATIO);
  const logoBuffer = await logo
    .clone()
    .resize(logoSize, logoSize, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  const offset = Math.round((size - logoSize) / 2);

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: BRAND_PURPLE,
    },
  })
    .composite([{ input: logoBuffer, left: offset, top: offset }])
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();
}

async function writeOutput(filename, buffer) {
  const outputPath = path.join(appDir, filename);
  await fs.writeFile(outputPath, buffer);

  if (filename.endsWith(".ico")) {
    console.log(`${filename}: ${(buffer.length / 1024).toFixed(1)} KB`);
    return;
  }

  const meta = await sharp(buffer).metadata();
  console.log(`${filename}: ${meta.width}x${meta.height}px, ${(buffer.length / 1024).toFixed(1)} KB`);
}

const logo = await prepareLogo();

await fs.mkdir(appDir, { recursive: true });

const icon96 = await renderIcon(logo, 96);
const apple180 = await renderIcon(logo, 180);
const icoSizes = await Promise.all([16, 32, 48].map((size) => renderIcon(logo, size)));
const faviconIco = await toIco(icoSizes);

await writeOutput("icon.png", icon96);
await writeOutput("apple-icon.png", apple180);
await writeOutput("favicon.ico", faviconIco);

console.log("Favicon optimization complete.");
