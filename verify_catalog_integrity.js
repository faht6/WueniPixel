import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const catalogPath = path.join(__dirname, 'public', 'catalog.json');

const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));

console.log('--- Verifying Catalog Integrity ---');
let errors = 0;

catalog.forEach(product => {
    if (product.colors && product.colorImages) {
        const colorKeys = Object.keys(product.colorImages);

        // Check if all declared colors have an image entry
        product.colors.forEach(color => {
            if (!colorKeys.includes(color)) {
                console.warn(`[WARNING] Product ${product.name}: Color '${color}' declared but missing in colorImages`);
                // This isn't strictly an error if we have unstable images, but for iPhone 17 it is.
                if (product.name.includes('iPhone 17')) errors++;
            }
        });

        // Check if keys match exactly (trim)
        colorKeys.forEach(key => {
            if (key !== key.trim()) {
                console.error(`[ERROR] Product ${product.name}: colorImages key '${key}' has whitespace!`);
                errors++;
            }
        });
    }
});

if (errors === 0) {
    console.log('CATALOG INTEGRITY OK.');
} else {
    console.log(`FOUND ${errors} INTEGRITY ISSUES.`);
}
