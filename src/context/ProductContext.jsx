import React, { createContext, useState, useEffect, useContext } from 'react';
import Papa from 'papaparse';

const ProductContext = createContext();

// CONFIGURACIÓN: URL de Google Sheets publicada como CSV
const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRoFtNE3hMrKjGG22omYUG_kTyvc4Hp92z_Ni_cnZGISJk_nxSeDunBjn-8Fmx-xhFzgviOY7NSmFi-/pub?gid=1480052043&single=true&output=csv";

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dataSource, setDataSource] = useState('loading'); // 'sheets' | 'local' | 'loading'

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            setError(null);

            // STEP 1: Load local catalog
            let localProducts = [];
            try {
                const response = await fetch(`/catalog.json?t=${Date.now()}`);
                if (!response.ok) throw new Error('Local catalog failed');
                localProducts = await response.json();
            } catch (localErr) {
                console.error("❌ Error catálogo local", localErr);
                setError('No se pudo cargar el catálogo.');
                setLoading(false);
                return;
            }

            // STEP 2: Try cache first
            const cached = getCachedData();
            if (cached) {
                const merged = mergeWithSheetsPricing(localProducts, cached);
                setProducts(merged);
                setDataSource('sheets');
                setLoading(false);
                return;
            }

            // STEP 3: Fetch from Sheets
            try {
                console.log("📡 Cargando precios desde Google Sheets...");
                const sheetPricing = await fetchPricingFromSheets();
                setCachedData(sheetPricing);

                const merged = mergeWithSheetsPricing(localProducts, sheetPricing);
                setProducts(merged);
                setDataSource('sheets');
            } catch (sheetsErr) {
                console.warn("⚠️ Sheets no disponible:", sheetsErr.message);
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

    // Build a name to ID map from local products for fallback matching
    const nameToId = {};
    localProducts.forEach(p => {
        if (p.name) {
            // Robust matching: remove accents, spaces, and lowercase
            const cleanName = p.name.toLowerCase().trim()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            nameToId[cleanName] = parseInt(p.id);
        }
    });

    for (const row of sheetRows) {
        // Helper to get value from row case-insensitively
        const getVal = (searchKey) => {
            const actualKey = Object.keys(row).find(
                k => k.toLowerCase().trim() === searchKey.toLowerCase()
            );
            return actualKey ? row[actualKey] : null;
        };

        const sheetName = getVal('name');
        let idStr = getVal('id');
        let id = parseInt(idStr);

        // Critical fallback: If name matches perfectly (sanitized) but ID is wrong/conflicting, use local ID
        if (sheetName) {
            const cleanSheetName = sheetName.toLowerCase().trim()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            if (nameToId[cleanSheetName]) {
                id = nameToId[cleanSheetName];
            }
        }

        if (isNaN(id)) continue;

        const parsePrice = (key) => {
            const val = getVal(key);
            if (!val || val.trim() === '' || val.trim() === '0') return null;
            // Simple approach: remove everything except numbers and decimal point
            const numericString = val.replace(/[^0-9.]/g, '');
            const num = parseFloat(numericString);
            return isNaN(num) ? null : num;
        };

        pricingMap[id] = {
            price: parsePrice('price'),
            storagePrices: {
                '64GB': parsePrice('Precio_Venta_64GB_PEN'),
                '128GB': parsePrice('Precio_Venta_128GB_PEN'),
                '256GB': parsePrice('Precio_Venta_256GB_PEN'),
                '512GB': parsePrice('Precio_Venta_512GB_PEN'),
                '1TB': parsePrice('Precio_Venta_1TB_PEN'),
                '2TB': parsePrice('Precio_Venta_2TB_PEN'),
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

        // SYNC BASE PRICE: Find the minimum price among all available capacities
        const prices = Object.values(sheetData.storagePrices).filter(p => p !== null && p !== undefined && p > 0);

        // INVENTORY CONTROL: If the product is in Sheets but has ZERO prices,
        // the user has chosen not to sell it. Flag it for removal.
        if (prices.length === 0) {
            merged._noStock = true;
            return merged;
        }

        merged.price = Math.min(...prices);

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
    }).filter(p => !p._noStock);
};

// CACHE Logic for Google Sheets
const CACHE_KEY = 'wueni_sheets_cache';
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes

const getCachedData = () => {
    if (typeof window === 'undefined') return null;
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    try {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_EXPIRY) {
            console.log("♻️ Usando caché de precios (válido por 5 min)");
            return data;
        }
    } catch (e) {
        localStorage.removeItem(CACHE_KEY);
    }
    return null;
};

const setCachedData = (data) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CACHE_KEY, JSON.stringify({
        data,
        timestamp: Date.now()
    }));
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
