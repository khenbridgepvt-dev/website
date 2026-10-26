import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const logoPath = path.join(rootDir, "public", "logo", "Logo.png");
const titlePath = path.join(rootDir, "public", "logo", "Title.png");
const outDir = path.join(rootDir, "public", "og");
const outPath = path.join(outDir, "og-image.png");

const WIDTH = 1200;
const HEIGHT = 630;
const BG = { r: 33, g: 23, b: 63, alpha: 1 };

async function main() {
  await fs.mkdir(outDir, { recursive: true });

  const logo = await sharp(logoPath).resize({ height: 160 }).png().toBuffer();
  const title = await sharp(titlePath).resize({ height: 72 }).png().toBuffer();
  const logoMeta = await sharp(logo).metadata();
  const titleMeta = await sharp(title).metadata();

  const gap = 24;
  const blockWidth = (logoMeta.width ?? 0) + gap + (titleMeta.width ?? 0);
  const logoLeft = Math.round((WIDTH - blockWidth) / 2);
  const titleLeft = logoLeft + (logoMeta.width ?? 0) + gap;
  const logoTop = Math.round((HEIGHT - (logoMeta.height ?? 0)) / 2);
  const titleTop = Math.round((HEIGHT - (titleMeta.height ?? 0)) / 2);

  await sharp({
    create: {
      width: WIDTH,
      height: HEIGHT,
      channels: 4,
      background: BG,
    },
  })
    .composite([
      { input: logo, left: logoLeft, top: logoTop },
      { input: title, left: titleLeft, top: titleTop },
    ])
    .png()
    .toFile(outPath);

  console.log(`Wrote ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
