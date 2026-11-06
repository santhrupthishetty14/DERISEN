const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      await processDirectory(fullPath);
      continue;
    }

    const ext = path.extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;
    if (file.endsWith('.webp')) continue;

    const base = path.basename(file, ext);
    const webpPath = path.join(dir, `${base}.webp`);
    if (fs.existsSync(webpPath)) continue; // already converted

    try {
      const inputBuffer = fs.readFileSync(fullPath);
      const originalSize = inputBuffer.length;
      if (originalSize === 0) continue;

      if (ext === '.jpg' || ext === '.jpeg') {
        const webpBuffer = await sharp(inputBuffer)
          .webp({ quality: 80, effort: 5 })
          .toBuffer();
        fs.writeFileSync(webpPath, webpBuffer);

        const optimizedJpgBuffer = await sharp(inputBuffer)
          .jpeg({ quality: 82, mozjpeg: true })
          .toBuffer();
        if (optimizedJpgBuffer.length < originalSize) {
          fs.writeFileSync(fullPath, optimizedJpgBuffer);
        }
      } else if (ext === '.png') {
        const webpBuffer = await sharp(inputBuffer)
          .webp({ quality: 82, effort: 5 })
          .toBuffer();
        fs.writeFileSync(webpPath, webpBuffer);

        if (originalSize > 50 * 1024) {
          const optimizedPngBuffer = await sharp(inputBuffer)
            .png({ quality: 85, compressionLevel: 9, effort: 6 })
            .toBuffer();
          if (optimizedPngBuffer.length < originalSize) {
            fs.writeFileSync(fullPath, optimizedPngBuffer);
          }
        }
      }
      console.log(`Converted ${file} -> ${base}.webp`);
    } catch (err) {
      console.warn(`Skipped ${file}: ${err.message}`);
    }
  }
}

async function run() {
  const publicDir = path.resolve(__dirname, '..', 'public');
  await processDirectory(path.join(publicDir, 'assets'));
  await processDirectory(path.join(publicDir, 'extracted_images'));
  console.log('All public directory images converted to WebP.');
}

run();
