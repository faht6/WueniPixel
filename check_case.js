import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, 'public');
const catalogPath = path.join(publicDir, 'catalog.json');

const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));

console.log('--- Verifying Images (CASE SENSITIVE CHECK) ---');
let errors = 0;

function checkImage(imgRelPath, context) {
    if (!imgRelPath) return;

    // Remove leading slash
    const relativePath = imgRelPath.startsWith('/') ? imgRelPath.substring(1) : imgRelPath;
    const fullPath = path.join(publicDir, relativePath);
    const dir = path.dirname(fullPath);
    const basename = path.basename(fullPath);

    if (!fs.existsSync(fullPath)) {
        console.error(`[MISSING] ${context}: ${imgRelPath}`);
        errors++;
        return;
    }

    // Check case sensitivity
    const actualFiles = fs.readdirSync(dir);
    if (!actualFiles.includes(basename)) {
        const found = actualFiles.find(f => f.toLowerCase() === basename.toLowerCase());
        console.error(`[CASE MISMATCH] ${context}: Catalog has '${basename}', but OS has '${found}'`);
        errors++;
    } else {
        // console.log(`[OK] ${context}`);
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

if (errors === 0) {
    console.log('ALL IMAGES VALID AND CASE CORRECT.');
} else {
    console.log(`FOUND ${errors} ERRORS.`);
}
