import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';
import { Search } from 'lucide-react';
import Reveal from '../components/Reveal';
import './ProductList.css';

const ProductList = ({ addToCart }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('All');

    // Sincronizar estado con URL al cargar o cambiar parámetros
    useEffect(() => {
        const brand = searchParams.get('brand');
        if (brand) {
            setSelectedBrand(brand);
        } else {
            setSelectedBrand('All');
        }
    }, [searchParams]);

    const brands = ['All', ...new Set(productsData.map(p => p.brand))];

    const handleBrandClick = (brand) => {
        setSelectedBrand(brand);
        if (brand === 'All') {
            searchParams.delete('brand');
        } else {
            searchParams.set('brand', brand);
        }
        setSearchParams(searchParams);
    };

    const filteredProducts = productsData.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesBrand = selectedBrand === 'All' || product.brand === selectedBrand;
        return matchesSearch && matchesBrand;
    });

    return (
        <div className="catalog-page container">
            <div className="filters-container">
                <h1>Catálogo Completo</h1>

                <div className="filters-row">
                    <div className="search-bar">
                        <Search size={20} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Buscar celulares..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="brand-filters">
                        {brands.map(brand => (
                            <button
                                key={brand}
                                className={`brand-btn ${selectedBrand === brand ? 'active' : ''}`}
                                onClick={() => handleBrandClick(brand)}
                            >
                                {brand}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="product-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                        <Reveal key={product.id} delay={index * 0.05}>
                            <ProductCard product={product} addToCart={addToCart} />
                        </Reveal>
                    ))
                ) : (
                    <div className="no-results">
                        <p>No se encontraron productos.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductList;
