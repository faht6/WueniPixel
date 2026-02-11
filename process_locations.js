const fs = require('fs');
const path = require('path');

const deptPath = path.join(__dirname, 'src/data/temp/departamentos.json');
const provPath = path.join(__dirname, 'src/data/temp/provincias.json');
const distPath = path.join(__dirname, 'src/data/temp/distritos.json');
const outPath = path.join(__dirname, 'src/data/locations.json');

const depts = JSON.parse(fs.readFileSync(deptPath, 'utf8'));
const provs = JSON.parse(fs.readFileSync(provPath, 'utf8'));
const dists = JSON.parse(fs.readFileSync(distPath, 'utf8'));

const result = {};

// Helper to capitalize/format names if uppercase
// The raw data seems to be "Amazonas", "Chachapoyas" (Mixed case)?
// Checking snippets: "Amazonas", "Chachapoyas". Seems ok.
// But some might be "SAN MARTIN". Let's ensure title case if needed?
// Snippets show "San Martin", "Moyobamba". seems OK.

function sortObject(obj) {
    return Object.keys(obj).sort().reduce((acc, key) => {
        acc[key] = obj[key];
        return acc;
    }, {});
}

depts.forEach(dept => {
    let deptName = dept.nombre_ubigeo;
    // Fix names if needed (e.g. "Junin" -> "Junín") - ideally we rely on "etiqueta_ubigeo"?
    // "etiqueta_ubigeo": "Amazonas, Perú"
    // dept.nombre_ubigeo seems unique enough.
    // We might want to fix common accents manually if missing in source?
    // The source has "Junin" (no accent), "San Martin" (no accent), "Huanuco" (no accent).
    // The user wants "información real y actualizada". Accents are important in Spanish.
    // I will try to map common ones.

    const ACCENT_MAP = {
        'Ancash': 'Áncash',
        'Apurimac': 'Apurímac',
        'Huanuco': 'Huánuco',
        'Junin': 'Junín',
        'San Martin': 'San Martín',
        'Cesar Vallejo': 'César Vallejo',
        // Add more as discovered or generic fix?
    };
    if (ACCENT_MAP[deptName]) deptName = ACCENT_MAP[deptName];

    // Initialize dept
    // Check if we already have it (unlikely)
    if (!result[deptName]) result[deptName] = {};

    const deptProvs = provs[dept.id_ubigeo] || [];

    deptProvs.forEach(prov => {
        let provName = prov.nombre_ubigeo;

        // Special Handling for Callao (Province) inside Lima (Dept)?
        // If Dept is 'Lima' and Prov is 'Callao', we want to hoist it to 'Callao' Department.
        let targetDept = deptName;

        if (dept.nombre_ubigeo === 'Lima' && provName === 'Callao') {
            targetDept = 'Callao';
            if (!result[targetDept]) result[targetDept] = {};
        }

        // Initialize prov in target Dept
        if (!result[targetDept][provName]) result[targetDept][provName] = [];

        const provDists = dists[prov.id_ubigeo] || [];

        const distNames = provDists.map(d => d.nombre_ubigeo).sort();
        result[targetDept][provName] = distNames;
    });
});

// Final cleanup:
// 1. Sort Departments
// 2. Sort Provinces inside
// 3. Districts are already sorted above
const finalResult = sortObject(result);
for (const d in finalResult) {
    finalResult[d] = sortObject(finalResult[d]);
}

// Write
fs.writeFileSync(outPath, JSON.stringify(finalResult, null, 2), 'utf8');
console.log('locations.json generated successfully.');
