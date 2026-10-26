import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const logoPath = path.join(rootDir, "public", "logo", "khenbridge-logo.png");
const outDir = path.join(rootDir, "public", "og");
const outPath = path.join(outDir, "og-image.png");

const WIDTH = 1200;
const HEIGHT = 630;
const BG = { r: 33, g: 23, b: 63, alpha: 1 };
const LOCKUP_MAX_HEIGHT = 200;

async function main() {
  await fs.mkdir(outDir, { recursive: true });

  const lockup = await sharp(logoPath).resize({ height: LOCKUP_MAX_HEIGHT }).png().toBuffer();
  const lockupMeta = await sharp(lockup).metadata();
  const lockupWidth = lockupMeta.width ?? 0;
  const lockupHeight = lockupMeta.height ?? 0;
  const left = Math.round((WIDTH - lockupWidth) / 2);
  const top = Math.round((HEIGHT - lockupHeight) / 2);

  await sharp({
    create: {
      width: WIDTH,
      height: HEIGHT,
      channels: 4,
      background: BG,
    },
  })
    .composite([{ input: lockup, left, top }])
    .png()
    .toFile(outPath);

  console.log(`Wrote ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
