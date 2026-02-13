const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const assetsDir = path.join(__dirname, "../src/assets");
const supportedFormats = [".jpg", ".jpeg", ".png"];

async function convertImagesToWebP() {
  try {
    const files = fs.readdirSync(assetsDir);

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();

      if (supportedFormats.includes(ext)) {
        const inputPath = path.join(assetsDir, file);
        const outputPath = path.join(
          assetsDir,
          file.replace(/\.(jpg|jpeg|png)$/i, ".webp"),
        );

        // Skip if WebP version already exists
        if (fs.existsSync(outputPath)) {
          console.log(`⏭️  Skipping ${file} - WebP version already exists`);
          continue;
        }

        const stats = fs.statSync(inputPath);
        const originalSize = stats.size / 1024; // KB

        await sharp(inputPath)
          .webp({ quality: 85, effort: 6 })
          .toFile(outputPath);

        const newStats = fs.statSync(outputPath);
        const newSize = newStats.size / 1024; // KB
        const saved = (((originalSize - newSize) / originalSize) * 100).toFixed(
          2,
        );

        console.log(`✅ Converted ${file} -> ${path.basename(outputPath)}`);
        console.log(
          `   Size: ${originalSize.toFixed(2)}KB -> ${newSize.toFixed(2)}KB (saved ${saved}%)`,
        );
      }
    }

    console.log("\n🎉 Image optimization complete!");
  } catch (error) {
    console.error("❌ Error during image conversion:", error);
    process.exit(1);
  }
}

convertImagesToWebP();
