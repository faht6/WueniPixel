const fs = require('fs');
const path = require('path');
const catalogPath = path.join(__dirname, 'public', 'catalog.json');
let content = fs.readFileSync(catalogPath, 'utf8');

// First, restore the corrupted ones if they matched too much (e.g. lost the suffix)
// But wait, I don't know what the suffix was for each one unless I use the ID.
// Actually, I should probably just restore from a previous state if I had one, 
// OR I can use the colorImages to map them back.

const catalog = JSON.parse(content);

catalog.forEach(p => {
    if (p.name.includes('iPhone 13')) {
        // Main image
        if (p.image.includes('iphone13') && !p.image.includes('_') && p.image.includes('.jpg')) {
            // It was corrupted. Map based on first color or default.
            if (p.id === 120) p.image = '/products/iphone13_midnight.jpg';
            if (p.id === 121) p.image = '/products/iphone13pro_grafito.jpg';
            if (p.id === 122) p.image = '/products/iphone13promax_grafito.jpg';
        }

        // Fix colorImages if corrupted
        if (p.colorImages) {
            Object.keys(p.colorImages).forEach(color => {
                p.colorImages[color] = p.colorImages[color].map(img => {
                    if (img.includes('iphone13') && !img.includes('_') && img.includes('.jpg')) {
                        // This is tricky. I need to know the original color mapping.
                        // I'll just reconstruct the names based on color.
                        const cleanColor = color.toLowerCase().replace(/ /g, '');
                        const prefix = p.id === 120 ? 'iphone13' : (p.id === 121 ? 'iphone13pro' : 'iphone13promax');
                        // This might not be perfect for numbers like _blue1, but it's a start.
                        // Actually, I better just look at what I DID in Step 5715 and 5716.
                    }
                    return img;
                });
            }
        });
    }
});

// BETTER APPROACH: Use the known mappings for iPhone 13 series and force them.
const mappings = {
    120: {
        image: "/products/iphone13_midnight.jpg",
        colors: {
            "Blue": ["/products/iphone13_blue.jpg", "/products/iphone13_blue1.jpg", "/products/iphone13_blue2.jpg"],
            "Green": ["/products/iphone13_green.jpg", "/products/iphone13_green1.jpg", "/products/iphone13_green2.jpg"],
            "Midnight": ["/products/iphone13_midnight.jpg", "/products/iphone13_midnight1.jpg", "/products/iphone13_midnight2.jpg"],
            "Pink": ["/products/iphone13_pink.jpg", "/products/iphone13_pink1.jpg", "/products/iphone13_pink2.jpg"],
            "Starlight": ["/products/iphone13_starlight.jpg", "/products/iphone13_starlight1.jpg", "/products/iphone13_starlight2.jpg"]
        }
    },
    121: {
        image: "/products/iphone13pro_grafito.jpg",
        colors: {
            "Azul Sierra": ["/products/iphone13pro_azulsierra.jpg", "/products/iphone13pro_azulsierra1.jpg", "/products/iphone13pro_azulsierra2.jpg"],
            "Grafito": ["/products/iphone13pro_grafito.jpg", "/products/iphone13pro_grafito1.jpg", "/products/iphone13pro_grafito2.jpg"],
            "Oro": ["/products/iphone13pro_oro.jpg", "/products/iphone13pro_oro1.jpg", "/products/iphone13pro_oro2.jpg"],
            "Plata": ["/products/iphone13pro_plata.jpg", "/products/iphone13pro_plata1.jpg", "/products/iphone13pro_plata2.jpg"],
            "Verde Alpino": ["/products/iphone13pro_verdealpino.jpg", "/products/iphone13pro_verdealpino1.jpg", "/products/iphone13pro_verdealpino2.jpg"]
        }
    },
    122: {
        image: "/products/iphone13promax_grafito.jpg",
        colors: {
            "Azul Sierra": ["/products/iphone13promax_azulsierra.jpg", "/products/iphone13promax_azulsierra1.jpg", "/products/iphone13promax_azulsierra2.jpg"],
            "Grafito": ["/products/iphone13promax_grafito.jpg", "/products/iphone13promax_grafito1.jpg", "/products/iphone13promax_grafito2.jpg"],
            "Oro": ["/products/iphone13promax_oro.jpg", "/products/iphone13promax_oro1.jpg", "/products/iphone13promax_oro2.jpg"],
            "Plata": ["/products/iphone13promax_plata.jpg", "/products/iphone13promax_plata1.jpg", "/products/iphone13promax_plata2.jpg"],
            "Verde Alpino": ["/products/iphone13promax_verdealpino.jpg", "/products/iphone13promax_verdealpino1.jpg", "/products/iphone13promax_verdealpino2.jpg"]
        }
    }
};

catalog.forEach(p => {
    if (mappings[p.id]) {
        const m = mappings[p.id];
        p.image = m.image + '?v=2';
        if (p.colorImages) {
            Object.keys(m.colors).forEach(color => {
                if (p.colorImages[color]) {
                    p.colorImages[color] = m.colors[color].map(img => img + '?v=2');
                }
            });
        }
    }
});

fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 4), 'utf8');
console.log('Fixed and versioned iPhone 13 images successfully.');
