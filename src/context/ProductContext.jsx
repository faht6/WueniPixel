import React, { createContext, useState, useEffect, useContext } from 'react';
import Papa from 'papaparse';

const ProductContext = createContext();

// CONFIGURACIÓN: URL de Google Sheets publicada como CSV
const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ13YcoM57Rwi-JrPoxHwbJGjREPTlZvCAvVJJK2GW5fx46TMWCbSXLazIRUSUuBMlGHFtsgqySRATl/pub?gid=0&single=true&output=csv";

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
        // Build a lookup map from Sheets rows by product ID
        const pricingMap = {};
        for (const row of sheetRows) {
            if (!row.id) continue;
            const id = parseInt(row.id);
            if (isNaN(id)) continue;

            const parsePrice = (val) => {
                if (!val || val.trim() === '' || val.trim() === '0') return null;
                const num = parseFloat(val);
                return isNaN(num) ? null : num;
            };

            pricingMap[id] = {
                // Override base price if present in Sheets
                price: row.price ? parseFloat(row.price) : null,
                // Per-capacity pricing
                storagePrices: {
                    '64GB': parsePrice(row.Precio_64GB),
                    '128GB': parsePrice(row.Precio_128GB),
                    '256GB': parsePrice(row.Precio_256GB),
                    '512GB': parsePrice(row.Precio_512GB),
                    '1TB': parsePrice(row.Precio_1TB),
                    '2TB': parsePrice(row.Precio_2TB),
                },
                // Override other fields ONLY if present and non-empty in Sheets
                name: row.name && row.name.trim() ? row.name.trim() : null,
                description: row.description && row.description.trim() ? row.description.trim() : null,
                grade: row.grade && row.grade.trim() ? row.grade.trim() : null,
                condition: row.condition && row.condition.trim() ? row.condition.trim() : null,
                featured: row.featured !== undefined && row.featured !== '' ? (row.featured === 'TRUE' || row.featured === 'true') : null,
            };
        }

        // Merge pricing into local products (local keeps all images, colorImages, specs, etc.)
        return localProducts.map(product => {
            const sheetData = pricingMap[product.id];
            if (!sheetData) return product; // No Sheets data for this product, keep as-is

            const merged = { ...product };

            // Override base price if Sheets has one
            if (sheetData.price !== null) {
                merged.price = sheetData.price;
            }

            // Add per-capacity pricing
            merged.storagePrices = sheetData.storagePrices;

            // Override text fields only if Sheets has non-empty values
            if (sheetData.name) merged.name = sheetData.name;
            if (sheetData.description) merged.description = sheetData.description;
            if (sheetData.grade) merged.grade = sheetData.grade;
            if (sheetData.condition) merged.condition = sheetData.condition;
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
