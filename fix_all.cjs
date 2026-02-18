const fs = require('fs');
const path = require('path');

console.log('=== COMPREHENSIVE FIX SCRIPT ===\n');

// ──────────────────────────────────────
// 1. FIX PIXEL PRICES (price = 0)
// ──────────────────────────────────────
const catalogPath = path.join(__dirname, 'public', 'catalog.json');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

// Realistic prices in Soles for each Pixel model
const pixelPrices = {
    'Google Pixel 10 Pro XL': 4999,
    'Google Pixel 10 Pro': 4499,
    'Google Pixel 10': 3499,
    'Google Pixel 10a': 2299,
    'Google Pixel 9 Pro XL': 3999,
    'Google Pixel 9 Pro': 3499,
    'Google Pixel 9': 2799,
    'Google Pixel 8a': 1499,
    'Google Pixel 7a': 1199,
    'Google Pixel 6a': 899,
};

let priceFixCount = 0;
catalog.forEach(p => {
    if (pixelPrices[p.name] && (!p.price || p.price <= 0)) {
        p.price = pixelPrices[p.name];
        priceFixCount++;
        console.log('  [PRICE FIXED] ' + p.name + ' -> S/' + p.price);
    }
});
console.log('Fixed ' + priceFixCount + ' prices.\n');

// Save catalog
fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 4), 'utf8');
console.log('[OK] Catalog saved.\n');

// ──────────────────────────────────────
// 2. VERIFY: No duplicate IDs
// ──────────────────────────────────────
const ids = catalog.map(p => p.id);
const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
if (dupes.length > 0) {
    console.log('[WARNING] Duplicate IDs: ' + dupes.join(', '));
} else {
    console.log('[OK] No duplicate IDs.\n');
}

// ──────────────────────────────────────
// 3. VERIFY: All image files exist
// ──────────────────────────────────────
let missingImages = 0;
catalog.forEach(p => {
    const checkImg = (img) => {
        const fp = path.join(__dirname, 'public', img.split('?')[0]);
        if (!fs.existsSync(fp)) {
            console.log('  [MISSING IMG] ' + p.name + ': ' + img);
            missingImages++;
        }
    };
    if (p.image) checkImg(p.image);
    if (p.colorImages) {
        Object.values(p.colorImages).forEach(imgs => imgs.forEach(checkImg));
    }
});
if (missingImages === 0) console.log('[OK] All image files present.\n');

// ──────────────────────────────────────
// 4. VERIFY: colorImages keys match colors array
// ──────────────────────────────────────
let colorMismatches = 0;
catalog.forEach(p => {
    if (p.colorImages) {
        p.colors.forEach(c => {
            if (!p.colorImages[c]) {
                console.log('  [COLOR MISMATCH] ' + p.name + ': color "' + c + '" missing in colorImages');
                colorMismatches++;
            }
        });
    }
});
if (colorMismatches === 0) console.log('[OK] All color mappings consistent.\n');

// ──────────────────────────────────────
// 5. LIST PRODUCTS WITH MISSING colorImages
// ──────────────────────────────────────
let noColorImages = 0;
catalog.forEach(p => {
    if (!p.colorImages) {
        noColorImages++;
    }
});
console.log('[INFO] ' + noColorImages + ' products without colorImages (use generic image).\n');

// ──────────────────────────────────────
// 6. CLEANUP: Remove stale fix scripts
// ──────────────────────────────────────
const staleFiles = ['fix_catalog.cjs', 'fix_order_and_images.cjs', 'audit_catalog.cjs'];
staleFiles.forEach(f => {
    const fp = path.join(__dirname, f);
    if (fs.existsSync(fp)) {
        fs.unlinkSync(fp);
        console.log('[CLEANUP] Deleted ' + f);
    }
});

console.log('\n=== ALL FIXES APPLIED ===');
