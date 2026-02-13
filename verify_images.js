import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, 'public');
const catalogPath = path.join(publicDir, 'catalog.json');

const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));

console.log('--- Verifying Images ---');
let missingCount = 0;

function checkImage(imgRelPath, context) {
    if (!imgRelPath) return;
    const imgPath = path.join(publicDir, imgRelPath.startsWith('/') ? imgRelPath.substring(1) : imgRelPath);
    if (!fs.existsSync(imgPath)) {
        console.error(`[MISSING] ${context}: ${imgRelPath}`);
        missingCount++;
    }
}

catalog.forEach(product => {
    checkImage(product.image, `Product ${product.name} (Main)`);
    if (product.colorImages) {
        Object.entries(product.colorImages).forEach(([color, images]) => {
            images.forEach((img, i) => {
                checkImage(img, `Product ${product.name} (${color} #${i + 1})`);
            });
        });
    }
});

if (missingCount === 0) {
    console.log('ALL IMAGES VALID.');
} else {
    console.log(`FOUND ${missingCount} MISSING IMAGES.`);
}
