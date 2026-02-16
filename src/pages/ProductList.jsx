import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal, ChevronDown, Sparkles, Smartphone, Battery } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { useProducts } from '../context/ProductContext';
import { motion, AnimatePresence } from 'framer-motion';
import './ProductList.css';

const ProductList = ({ addToCart, addToCompare, compareList }) => {
    const { products, loading, error } = useProducts();
    const [searchParams, setSearchParams] = useSearchParams();

    // States
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('All');
    const [selectedCondition, setSelectedCondition] = useState('All');
    const [sortBy, setSortBy] = useState('featured');
    const [showSortMenu, setShowSortMenu] = useState(false);

    // Sync with URL on load
    useEffect(() => {
        const brandParam = searchParams.get('brand');
        const searchParam = searchParams.get('q');

        if (brandParam) setSelectedBrand(brandParam);
        if (searchParam) setSearchTerm(searchParam);
    }, [searchParams]);

    // Derived Data
    const brands = ['All', ...new Set(products.map(p => p.brand))];
    const conditions = ['All', 'excellent', 'good', 'fair']; // Based on typical data

    // Handlers
    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        if (term) {
            searchParams.set('q', term);
        } else {
            searchParams.delete('q');
        }
        setSearchParams(searchParams);
    };

    const handleBrandChange = (brand) => {
        setSelectedBrand(brand);
        if (brand === 'All') {
            searchParams.delete('brand');
        } else {
            searchParams.set('brand', brand);
        }
        setSearchParams(searchParams);
    };

    const getSortLabel = (sort) => {
        switch (sort) {
            case 'price-asc': return 'Precio: Bajo a Alto';
            case 'price-desc': return 'Precio: Alto a Bajo';
            default: return 'Destacados';
        }
    };

    // Filter Logic
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesBrand = selectedBrand === 'All' || product.brand === selectedBrand;
        const matchesCondition = (() => {
            if (selectedCondition === 'All') return true;
            if (selectedCondition === 'Nuevo') {
                return product.condition === 'new' || (product.grade && product.grade.toLowerCase().includes('nuevo'));
            }
            if (selectedCondition === 'Excelente') {
                return product.grade && (product.grade.includes('A+') || product.grade.toLowerCase().includes('impecable'));
            }
            if (selectedCondition === 'Good') {
                // Matches "Grado A" (not plus), "Grado B", or just generic "Used" not A+
                const g = product.grade ? product.grade.toLowerCase() : '';
                return (g.includes('grado a') && !g.includes('a+')) || g.includes('grado b') || g.includes('bueno');
            }
            return false;
        })();

        return matchesSearch && matchesBrand && matchesCondition;
    }).sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return (a.featured === b.featured) ? 0 : a.featured ? -1 : 1;
    });

    return (
        <PageTransition>
            <div className="product-list-container container">

                {/* Header & Controls */}
                <div className="list-header">
                    <h1 className="list-title">Catálogo Premium</h1>
                    <p className="list-subtitle">Tecnología certificada con estilo.</p>
                </div>

                {/* SEARCH BAR (New) */}
                <div className="catalog-search-container">
                    <div className="search-input-wrapper">
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Buscar modelo (ej: Pixel 7, iPhone 14)..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="catalog-search-input"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p>Cargando colección...</p>
                    </div>
                ) : error ? (
                    <div className="error-container">
                        <h3>Error de conexión</h3>
                        <p>{error}</p>
                        <button onClick={() => window.location.reload()}>Reintentar</button>
                    </div>
                ) : (
                    <>
                        {/* FILTERS TOOLBAR */}
                        <div className="controls-bar">

                            <div className="filters-group">
                                {/* Brand Chips */}
                                <div className="filter-section">
                                    <span className="filter-label"><Smartphone size={14} /> Marca:</span>
                                    <div className="chips-row">
                                        {brands.map(brand => (
                                            <button
                                                key={brand}
                                                className={`filter-chip ${selectedBrand === brand ? 'active' : ''}`}
                                                onClick={() => handleBrandChange(brand)}
                                            >
                                                {brand === 'All' ? 'Todas' : brand}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Condition Chips */}
                                <div className="filter-section">
                                    <span className="filter-label"><Sparkles size={14} /> Condición:</span>
                                    <div className="chips-row">
                                        {['All', 'Nuevo', 'Excelente', 'Good'].map(cond => (
                                            <button
                                                key={cond}
                                                className={`filter-chip ${selectedCondition === cond ? 'active' : ''}`}
                                                onClick={() => setSelectedCondition(cond)}
                                            >
                                                {cond === 'All' ? 'Cualquiera' : cond}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Sort Dropdown */}
                            <div className="sort-dropdown-container">
                                <button className="sort-btn" onClick={() => setShowSortMenu(!showSortMenu)}>
                                    <SlidersHorizontal size={16} />
                                    <span>{getSortLabel(sortBy)}</span>
                                    <ChevronDown size={14} />
                                </button>
                                {showSortMenu && (
                                    <div className="sort-menu">
                                        <button onClick={() => { setSortBy('featured'); setShowSortMenu(false); }}>Destacados</button>
                                        <button onClick={() => { setSortBy('price-asc'); setShowSortMenu(false); }}>Precio: Bajo a Alto</button>
                                        <button onClick={() => { setSortBy('price-desc'); setShowSortMenu(false); }}>Precio: Alto a Bajo</button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Results Count */}
                        <div className="results-meta">
                            <span>Mostrando <strong>{filteredProducts.length}</strong> dispositivos</span>
                        </div>

                        {/* GRID with Animations */}
                        <motion.div
                            layout
                            className="products-grid"
                        >
                            <AnimatePresence>
                                {filteredProducts.map(product => (
                                    <motion.div
                                        key={product.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ProductCard
                                            product={product}
                                            addToCart={addToCart}
                                            addToCompare={addToCompare}
                                            compareList={compareList}
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {filteredProducts.length === 0 && (
                            <div className="no-results-list">
                                <p>No se encontraron resultados.</p>
                                <button className="btn-reset-filters" onClick={() => {
                                    setSelectedBrand('All');
                                    setSelectedCondition('All');
                                    setSearchTerm('');
                                }}>
                                    Limpiar todo
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </PageTransition>
    );
};

export default ProductList;
