import React, { createContext, useState, useEffect, useContext } from 'react';
import Papa from 'papaparse';

const ProductContext = createContext();

// CONFIGURACIÓN: URL de Google Sheets publicada como CSV
const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRoFtNE3hMrKjGG22omYUG_kTyvc4Hp92z_Ni_cnZGISJk_nxSeDunBjn-8Fmx-xhFzgviOY7NSmFi-/pub?output=csv";

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dataSource, setDataSource] = useState('loading'); // 'sheets' | 'local' | 'loading'

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            setError(null);

            // STEP 1: Always load local catalog first (has images, colorImages, specs, etc.)
            let localProducts = [];
            try {
                const response = await fetch(`/catalog.json?t=${Date.now()}`);
                if (!response.ok) throw new Error('Local catalog failed');
                localProducts = await response.json();
                console.log(`📦 ${localProducts.length} productos cargados desde catálogo local`);
            } catch (localErr) {
                console.error("❌ Error crítico: no se pudo cargar catálogo local", localErr);
                setError('No se pudo cargar el catálogo. Inténtalo de nuevo.');
                setLoading(false);
                return;
            }

            // STEP 2: Try to fetch pricing overlay from Google Sheets
            try {
                console.log("📡 Cargando precios desde Google Sheets...");
                const sheetPricing = await fetchPricingFromSheets();

                // Merge: local product data + Sheets pricing
                const mergedProducts = mergeWithSheetsPricing(localProducts, sheetPricing);
                setProducts(mergedProducts);
                setDataSource('sheets');
                console.log(`✅ Precios actualizados desde Sheets para ${sheetPricing.length} productos`);
            } catch (sheetsErr) {
                // Sheets failed — use local catalog as-is (no per-capacity pricing)
                console.warn("⚠️ Sheets no disponible, usando precios locales:", sheetsErr.message);
                setProducts(localProducts);
                setDataSource('local');
            }

            setLoading(false);
        };

        loadProducts();
    }, []);

    // Fetch only pricing data from Sheets
    const fetchPricingFromSheets = () => {
        return new Promise((resolve, reject) => {
            const url = `${GOOGLE_SHEET_CSV_URL}&_t=${Date.now()}`;

            Papa.parse(url, {
                download: true,
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    if (results.data && results.data.length > 0) {
                        resolve(results.data);
                    } else {
                        reject(new Error('Empty response from Google Sheets'));
                    }
                },
                error: (err) => {
                    reject(err);
                }
            });
        });
    };

    // Merge local products with Sheets pricing data
    const mergeWithSheetsPricing = (localProducts, sheetRows) => {
        const pricingMap = {};

        for (const row of sheetRows) {
            // Helper to get value from row case-insensitively
            const getVal = (searchKey) => {
                const actualKey = Object.keys(row).find(
                    k => k.toLowerCase().trim() === searchKey.toLowerCase()
                );
                return actualKey ? row[actualKey] : null;
            };

            const idStr = getVal('id');
            if (!idStr) continue;
            const id = parseInt(idStr);
            if (isNaN(id)) continue;

            const parsePrice = (key) => {
                const val = getVal(key);
                if (!val || val.trim() === '' || val.trim() === '0') return null;
                // Remove currency symbols, commas for thousands, etc.
                const cleanVal = val.replace(/[S/$.\s,]/g, (match) => {
                    // We keep dots if they look like decimals, but usually CSVs use dots for thousands in some locales
                    // To be safe, let's just use a more surgical approach
                    return '';
                });
                // Simple approach: remove everything except numbers and decimal point
                const numericString = val.replace(/[^0-9.]/g, '');
                const num = parseFloat(numericString);
                return isNaN(num) ? null : num;
            };

            pricingMap[id] = {
                price: parsePrice('price'),
                storagePrices: {
                    '64GB': parsePrice('Precio_64GB'),
                    '128GB': parsePrice('Precio_128GB'),
                    '256GB': parsePrice('Precio_256GB'),
                    '512GB': parsePrice('Precio_512GB'),
                    '1TB': parsePrice('Precio_1TB'),
                    '2TB': parsePrice('Precio_2TB'),
                },
                name: getVal('name'),
                description: getVal('description'),
                grade: getVal('grade'),
                condition: getVal('condition'),
                featured: getVal('featured') ? (getVal('featured').toLowerCase() === 'true') : null,
            };
        }

        return localProducts.map(product => {
            const sheetData = pricingMap[product.id];
            if (!sheetData) return product;

            const merged = { ...product };

            if (sheetData.price !== null) merged.price = sheetData.price;

            // Add per-capacity pricing
            merged.storagePrices = sheetData.storagePrices;

            // DYNAMIC STORAGE: Combine original storage with capacities that have prices in Sheets
            const allPossibleCapacities = ['64GB', '128GB', '256GB', '512GB', '1TB', '2TB'];
            const activeFromSheets = allPossibleCapacities.filter(cap =>
                sheetData.storagePrices[cap] !== null && sheetData.storagePrices[cap] !== undefined
            );

            const combinedStorage = Array.from(new Set([...(merged.storage || []), ...activeFromSheets]));
            merged.storage = allPossibleCapacities.filter(cap => combinedStorage.includes(cap));

            if (sheetData.name && sheetData.name.trim()) merged.name = sheetData.name;
            if (sheetData.description && sheetData.description.trim()) merged.description = sheetData.description;
            if (sheetData.grade && sheetData.grade.trim()) merged.grade = sheetData.grade;
            if (sheetData.condition && sheetData.condition.trim()) merged.condition = sheetData.condition;
            if (sheetData.featured !== null) merged.featured = sheetData.featured;

            return merged;
        });
    };

    // Helper to get product by ID
    const getProductById = (id) => {
        return products.find(p => p.id === parseInt(id));
    };

    return (
        <ProductContext.Provider value={{ products, loading, error, dataSource, getProductById }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};
