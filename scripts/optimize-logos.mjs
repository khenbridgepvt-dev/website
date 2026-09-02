import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const assetsDir = path.join(rootDir, "assets", "logo");
const outputDir = path.join(rootDir, "public", "logo");

const BLACK_THRESHOLD = 30;

const targets = [
  { input: "Logo.png", output: "Logo.png", height: 72 },
  { input: "Title.png", output: "Title.png", height: 56 },
];

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
  }).png();
}

async function optimizeLogo({ input, output, height }) {
  const inputPath = path.join(assetsDir, input);
  const outputPath = path.join(outputDir, output);

  const trimmed = await sharp(inputPath).trim({ threshold: 15 }).png().toBuffer();
  const transparent = await makeBackgroundTransparent(trimmed);

  await transparent
    .resize({ height, withoutEnlargement: false })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(outputPath);

  const stats = await fs.stat(outputPath);
  const meta = await sharp(outputPath).metadata();

  console.log(
    `${output}: ${meta.width}x${meta.height}px, ${(stats.size / 1024).toFixed(1)} KB`,
  );
}

await fs.mkdir(outputDir, { recursive: true });

for (const target of targets) {
  await optimizeLogo(target);
}

console.log("Logo optimization complete.");
