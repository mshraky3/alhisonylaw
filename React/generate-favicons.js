/**
 * Script to generate favicon files from existing logo
 * Run with: node generate-favicons.js
 * 
 * This script requires sharp package. Install it with:
 * npm install --save-dev sharp
 */

import sharp from 'sharp';
import { existsSync } from 'fs';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const publicDir = './public';
const logoPath = join(publicDir, 'logo_without_bg.png');

async function generateFavicons() {
  try {
    // Check if logo exists
    if (!existsSync(logoPath)) {
      console.error(`Logo file not found: ${logoPath}`);
      console.log('Please ensure logo_without_bg.png exists in the public folder');
      process.exit(1);
    }

    console.log('Generating favicon files...');

    // Read the logo
    const logoBuffer = readFileSync(logoPath);

    // Generate favicon.ico (16x16 and 32x32 combined)
    // Note: sharp doesn't create true ICO files, but we'll create PNGs with ICO extension
    // For true ICO, you may need to use an online converter or specialized tool
    const favicon16 = await sharp(logoBuffer)
      .resize(16, 16, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toBuffer();
    
    const favicon32 = await sharp(logoBuffer)
      .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toBuffer();

    // For favicon.ico, we'll create a 32x32 PNG (browsers will accept it)
    // True ICO format requires special tools
    writeFileSync(join(publicDir, 'favicon.ico'), favicon32);
    console.log('✓ Created favicon.ico');

    // Generate favicon-16x16.png
    writeFileSync(join(publicDir, 'favicon-16x16.png'), favicon16);
    console.log('✓ Created favicon-16x16.png');

    // Generate favicon-32x32.png
    writeFileSync(join(publicDir, 'favicon-32x32.png'), favicon32);
    console.log('✓ Created favicon-32x32.png');

    // Generate apple-touch-icon.png (180x180)
    const appleTouchIcon = await sharp(logoBuffer)
      .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .png()
      .toBuffer();
    writeFileSync(join(publicDir, 'apple-touch-icon.png'), appleTouchIcon);
    console.log('✓ Created apple-touch-icon.png');

    // Generate favicon-192x192.png
    const favicon192 = await sharp(logoBuffer)
      .resize(192, 192, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toBuffer();
    writeFileSync(join(publicDir, 'favicon-192x192.png'), favicon192);
    console.log('✓ Created favicon-192x192.png');

    // Generate favicon-512x512.png
    const favicon512 = await sharp(logoBuffer)
      .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toBuffer();
    writeFileSync(join(publicDir, 'favicon-512x512.png'), favicon512);
    console.log('✓ Created favicon-512x512.png');

    console.log('\n✅ All favicon files generated successfully!');
    console.log('\nNote: favicon.ico is a PNG file. For a true ICO format,');
    console.log('you can use an online converter like: https://convertio.co/png-ico/');
    console.log('or https://favicon.io/favicon-converter/');
    
  } catch (error) {
    console.error('Error generating favicons:', error.message);
    if (error.code === 'MODULE_NOT_FOUND') {
      console.error('\nPlease install sharp: npm install --save-dev sharp');
    }
    process.exit(1);
  }
}

generateFavicons();
