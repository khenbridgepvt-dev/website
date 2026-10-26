import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const imagesDir = path.join(rootDir, "public", "images");
const pngPath = path.join(imagesDir, "custom_hero_bg.png");
const webpPath = path.join(imagesDir, "custom_hero_bg.webp");
const MAX_WIDTH = 1920;

async function main() {
  try {
    await fs.access(pngPath);
  } catch {
    console.warn(
      `Skipping hero optimize: ${pngPath} not found. Add the asset under public/images/ then re-run.`,
    );
    process.exit(0);
  }

  const resized = await sharp(pngPath)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .toBuffer();

  await fs.writeFile(webpPath, await sharp(resized).webp({ quality: 82 }).toBuffer());
  try {
    await fs.writeFile(
      pngPath,
      await sharp(resized).png({ compressionLevel: 9 }).toBuffer(),
    );
    console.log(`Optimized ${pngPath} and wrote ${webpPath}`);
  } catch (err) {
    console.warn(`Wrote ${webpPath}; could not rewrite PNG (${err.code ?? err.message})`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
