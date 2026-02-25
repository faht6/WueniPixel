import React, { createContext, useState, useEffect, useContext } from 'react';
import Papa from 'papaparse';

const ProductContext = createContext();

// CONFIGURACIÓN: URL de Google Sheets publicada como CSV
// Archivo > Compartir > Publicar en la web > CSV
const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ13YcoM57Rwi-JrPoxHwbJGjREPTlZvCAvVJJK2GW5fx46TMWCbSXLazIRUSUuBMlGHFtsgqySRATl/pub?gid=0&single=true&output=csv";

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dataSource, setDataSource] = useState('loading'); // 'sheets' | 'local' | 'loading'

    useEffect(() => {
        const fetchFromSheets = () => {
            return new Promise((resolve, reject) => {
                // Cache-busting timestamp to always get fresh data
                const url = `${GOOGLE_SHEET_CSV_URL}&_t=${Date.now()}`;

                Papa.parse(url, {
                    download: true,
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        if (results.data && results.data.length > 0) {
                            const transformed = transformSheetData(results.data);
                            if (transformed.length > 0) {
                                resolve(transformed);
                            } else {
                                reject(new Error('No valid products found in Sheets'));
                            }
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

        const fetchLocalCatalog = async () => {
            const response = await fetch(`/catalog.json?t=${Date.now()}`);
            if (!response.ok) throw new Error('Local catalog failed');
            return await response.json();
        };

        const loadProducts = async () => {
            setLoading(true);
            setError(null);

            try {
                // Intentar Google Sheets primero
                console.log("📡 Cargando catálogo desde Google Sheets...");
                const sheetProducts = await fetchFromSheets();
                setProducts(sheetProducts);
                setDataSource('sheets');
                console.log(`✅ ${sheetProducts.length} productos cargados desde Sheets`);
            } catch (sheetsErr) {
                console.warn("⚠️ Sheets falló, usando catálogo local:", sheetsErr.message);

                try {
                    // Fallback a catalog.json
                    const localProducts = await fetchLocalCatalog();
                    setProducts(localProducts);
                    setDataSource('local');
                    console.log(`📦 ${localProducts.length} productos cargados desde catálogo local`);
                } catch (localErr) {
                    console.error("❌ Error crítico: ambas fuentes fallaron", localErr);
                    setError('No se pudo cargar el catálogo. Inténtalo de nuevo.');
                }
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    // Helper: Transforma las filas del CSV a Objetos JS con precios por capacidad
    const transformSheetData = (rows) => {
        return rows.map(row => {
            // Filtrar filas vacías
            if (!row.id || !row.name) return null;

            // Parse per-capacity prices (null if empty = disabled in UI)
            const parsePrice = (val) => {
                if (!val || val.trim() === '' || val.trim() === '0') return null;
                const num = parseFloat(val);
                return isNaN(num) ? null : num;
            };

            // Build storage array from available prices
            const storagePrices = {
                '64GB': parsePrice(row.Precio_64GB),
                '128GB': parsePrice(row.Precio_128GB),
                '256GB': parsePrice(row.Precio_256GB),
                '512GB': parsePrice(row.Precio_512GB),
                '1TB': parsePrice(row.Precio_1TB),
                '2TB': parsePrice(row.Precio_2TB),
            };

            // Build storage options from CSV column (or from available prices)
            let storageOptions = [];
            if (row.storage) {
                storageOptions = row.storage.split(',').map(s => s.trim());
            } else {
                // Infer from price columns
                storageOptions = Object.keys(storagePrices).filter(k => storagePrices[k] !== null);
            }

            // Parse colorImages JSON if present
            let colorImages = {};
            if (row.colorImages) {
                try {
                    colorImages = JSON.parse(row.colorImages);
                } catch (e) {
                    // If not valid JSON, ignore
                }
            }

            return {
                id: parseInt(row.id),
                name: row.name || '',
                brand: row.brand || '',
                price: row.price ? parseFloat(row.price) : 0,
                ebayPrice: row.ebayPrice ? parseFloat(row.ebayPrice) : 0,
                condition: row.condition || 'new',
                image: row.image || '',
                description: row.description || '',
                grade: row.grade || '',
                colors: row.colors ? row.colors.split(',').map(c => c.trim()) : [],
                storage: storageOptions,
                storagePrices, // { '128GB': 3999, '256GB': 4499, ... or null }
                specs: {
                    screen: row.screen || 'N/A',
                    processor: row.processor || 'N/A',
                    camera: row.camera || 'N/A',
                    battery: row.battery || 'N/A'
                },
                colorImages,
                featured: row.featured === 'TRUE' || row.featured === 'true'
            };
        }).filter(item => item !== null);
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
