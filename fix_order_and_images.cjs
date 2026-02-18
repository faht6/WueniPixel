const fs = require('fs');
const path = require('path');

const catalogPath = path.join(__dirname, 'public', 'catalog.json');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

console.log('=== FIXING DUPLICATE ID 120 ===');
// iPhone 12 Pro Max currently has ID 120 — change it to 123
// iPhone 13 also has ID 120 — keep it as 120
catalog.forEach(p => {
    if (p.id === 120 && p.name === 'iPhone 12 Pro Max') {
        p.id = 123;
        console.log('  Changed iPhone 12 Pro Max from ID 120 -> 123');
    }
});

// Now extract iPhone 13 series by NAME not just ID
const iphone13Names = ['iPhone 13', 'iPhone 13 Pro', 'iPhone 13 Pro Max'];
const iphone13Entries = catalog.filter(p => iphone13Names.includes(p.name));
const rest = catalog.filter(p => !iphone13Names.includes(p.name));

console.log('\n=== iPhone 13 entries ===');
iphone13Entries.forEach(p => console.log(`  [ID ${p.id}] ${p.name}`));

// Sort: Pro Max (122) first, Pro (121), Base (120) 
const tierOrder = { 'iPhone 13 Pro Max': 0, 'iPhone 13 Pro': 1, 'iPhone 13': 2 };
iphone13Entries.sort((a, b) => (tierOrder[a.name] ?? 99) - (tierOrder[b.name] ?? 99));

// Find iPhone 14 in the rest array
const iphone14Idx = rest.findIndex(p => p.name === 'iPhone 14');
console.log(`\niPhone 14 found at index ${iphone14Idx} in rest array`);

// Insert iPhone 13 series right after iPhone 14
const insertAt = iphone14Idx + 1;
const reordered = [...rest.slice(0, insertAt), ...iphone13Entries, ...rest.slice(insertAt)];

console.log('\n=== NEW ORDER ===');
reordered.forEach((p, i) => console.log(`  ${i}: [ID ${p.id}] ${p.name}`));

// Ensure correct images for all 3 models
const baseFix = reordered.find(p => p.id === 120 && p.name === 'iPhone 13');
if (baseFix) {
    baseFix.image = '/products/iphone13_midnight.jpg';
    baseFix.colorImages = {
        "Blue": ["/products/iphone13_blue.jpg", "/products/iphone13_blue1.jpg", "/products/iphone13_blue2.jpg"],
        "Green": ["/products/iphone13_green.jpg", "/products/iphone13_green1.jpg", "/products/iphone13_green2.jpg"],
        "Midnight": ["/products/iphone13_midnight.jpg", "/products/iphone13_midnight1.jpg", "/products/iphone13_midnight2.jpg"],
        "Pink": ["/products/iphone13_pink.jpg", "/products/iphone13_pink1.jpg", "/products/iphone13_pink2.jpg"],
        "Starlight": ["/products/iphone13_starlight.jpg", "/products/iphone13_starlight1.jpg", "/products/iphone13_starlight2.jpg"]
    };
    console.log('\n[OK] iPhone 13 base images set');
}

const proFix = reordered.find(p => p.id === 121);
if (proFix) {
    proFix.image = '/products/iphone13pro_grafito.jpg';
    proFix.colorImages = {
        "Azul Sierra": ["/products/iphone13pro_azulsierra.jpg", "/products/iphone13pro_azulsierra1.jpg", "/products/iphone13pro_azulsierra2.jpg"],
        "Grafito": ["/products/iphone13pro_grafito.jpg", "/products/iphone13pro_grafito1.jpg", "/products/iphone13pro_grafito2.jpg"],
        "Oro": ["/products/iphone13pro_oro.jpg", "/products/iphone13pro_oro1.jpg", "/products/iphone13pro_oro2.jpg"],
        "Plata": ["/products/iphone13pro_plata.jpg", "/products/iphone13pro_plata1.jpg", "/products/iphone13pro_plata2.jpg"],
        "Verde Alpino": ["/products/iphone13pro_verdealpino.jpg", "/products/iphone13pro_verdealpino1.jpg", "/products/iphone13pro_verdealpino2.jpg"]
    };
    console.log('[OK] iPhone 13 Pro images set');
}

const maxFix = reordered.find(p => p.id === 122);
if (maxFix) {
    maxFix.image = '/products/iphone13promax_grafito.jpg';
    maxFix.colorImages = {
        "Azul Sierra": ["/products/iphone13promax_azulsierra.jpg", "/products/iphone13promax_azulsierra1.jpg", "/products/iphone13promax_azulsierra2.jpg"],
        "Grafito": ["/products/iphone13promax_grafito.jpg", "/products/iphone13promax_grafito1.jpg", "/products/iphone13promax_grafito2.jpg"],
        "Oro": ["/products/iphone13promax_oro.jpg", "/products/iphone13promax_oro1.jpg", "/products/iphone13promax_oro2.jpg"],
        "Plata": ["/products/iphone13promax_plata.jpg", "/products/iphone13promax_plata1.jpg", "/products/iphone13promax_plata2.jpg"],
        "Verde Alpino": ["/products/iphone13promax_verdealpino.jpg", "/products/iphone13promax_verdealpino1.jpg", "/products/iphone13promax_verdealpino2.jpg"]
    };
    console.log('[OK] iPhone 13 Pro Max images set');
}

// Remove any ?v=2 from ALL products
reordered.forEach(p => {
    if (p.image) p.image = p.image.split('?')[0];
    if (p.colorImages) {
        Object.keys(p.colorImages).forEach(color => {
            p.colorImages[color] = p.colorImages[color].map(img => img.split('?')[0]);
        });
    }
});

// Verify image files
console.log('\n=== VERIFYING IMAGE FILES ===');
let allGood = true;
[baseFix, proFix, maxFix].forEach(p => {
    if (!p || !p.colorImages) return;
    Object.values(p.colorImages).forEach(imgs => {
        imgs.forEach(img => {
            const fp = path.join(__dirname, 'public', img);
            if (!fs.existsSync(fp)) {
                console.log(`  [MISSING] ${img}`);
                // Try copying from Downloads
                const dl = path.join('c:\\Users\\User\\Downloads', path.basename(img));
                if (fs.existsSync(dl)) {
                    fs.copyFileSync(dl, fp);
                    console.log(`    -> COPIED from Downloads`);
                } else {
                    allGood = false;
                }
            }
        });
    });
});
if (allGood) console.log('  All image files present!');

// Check for duplicate IDs
const ids = reordered.map(p => p.id);
const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
if (dupes.length > 0) {
    console.log(`\n[ERROR] Duplicate IDs: ${dupes}`);
} else {
    console.log('\n[OK] No duplicate IDs');
}

// Save
fs.writeFileSync(catalogPath, JSON.stringify(reordered, null, 4), 'utf8');
console.log(`\n=== CATALOG SAVED (${reordered.length} products) ===`);
