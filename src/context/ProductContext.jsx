import React, { createContext, useState, useEffect, useContext } from 'react';
import Papa from 'papaparse';

const ProductContext = createContext();

// CONFIGURACIÓN: REEMPLAZA ESTO CON TU URL DE GOOGLE SHEETS PUBLICADA COMO CSV
// 1. En Google Sheets: Archivo > Compartir > Publicar en la web
// 2. Elegir "Valores separados por comas (.csv)"
// 3. Copiar el enlace y pegarlo aquí abajo
const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ13YcoM57Rwi-JrPoxHwbJGjREPTlZvCAvVJJK2GW5fx46TMWCbSXLazIRUSUuBMlGHFtsgqySRATl/pub?gid=0&single=true&output=csv";
// NOTA: Si esta URL falla o está vacía, se usará 'catalog.json' como respaldo.

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            // FORZAR CATALOGO LOCAL PARA DESARROLLO/PRODUCCION CON FOTOS NUEVAS
            // Si se desea volver a Sheets, descomentar y actualizar la URL en el futuro.
            fetchLocalCatalog();

            /* 
            try {
                console.log("Intentando cargar desde Google Sheets...");
                // ... (Google Sheets logic commented out)
                Papa.parse(GOOGLE_SHEET_CSV_URL, {
                    // ...
                });
            } catch (err) { ... }
            */
        };

        const fetchLocalCatalog = async () => {
            try {
                const response = await fetch(`/catalog.json?v=${new Date().getTime()}`);
                if (!response.ok) throw new Error('Local catalog failed');
                const data = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (localErr) {
                console.error("Critical: Failed to load both Sheets and Local catalog", localErr);
                setError(localErr.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Helper: Transforma las filas del CSV (Strings) a Objetos JS (Numbers, Arrays)
    const transformSheetData = (rows) => {
        return rows.map(row => {
            // Filtrar filas vacías
            if (!row.id || !row.name) return null;

            return {
                id: parseInt(row.id),
                name: row.name,
                brand: row.brand,
                ebayPrice: row.ebayPrice ? parseFloat(row.ebayPrice) : 0,
                price: row.price ? parseFloat(row.price) : 0,
                condition: row.condition,
                image: row.image,
                description: row.description,
                grade: row.grade,
                colors: row.colors ? row.colors.split(',').map(c => c.trim()) : [],
                storage: row.storage ? row.storage.split(',').map(s => s.trim()) : [],
                specs: {
                    screen: row.screen || 'N/A',
                    processor: row.processor || 'N/A',
                    camera: row.camera || 'N/A',
                    battery: row.battery || 'N/A'
                },
                featured: row.featured === 'TRUE' || row.featured === 'true'
            };
        }).filter(item => item !== null); // Eliminar nulos
    };

    // Helper to get product by ID
    const getProductById = (id) => {
        return products.find(p => p.id === parseInt(id));
    };

    return (
        <ProductContext.Provider value={{ products, loading, error, getProductById }}>
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
