import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Search, Filter, SlidersHorizontal, ChevronDown, Check } from 'lucide-react';
import Reveal from '../components/Reveal';
import PageTransition from '../components/PageTransition';
import { useProducts } from '../context/ProductContext';
import './ProductList.css';

const ProductList = ({ addToCart, addToCompare, compareList }) => {
    const { products, loading } = useProducts();
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('All');
    const [sortBy, setSortBy] = useState('featured');
    const [showSortMenu, setShowSortMenu] = useState(false);

    // Sincronizar estado con URL al cargar    // Filtrado y Ordenamiento
    useEffect(() => {
        const brandParam = searchParams.get('brand');
        if (brandParam) {
            setSelectedBrand(brandParam);
        } else {
            setSelectedBrand('All');
        }
    }, [searchParams]);

    const brands = ['All', ...new Set(products.map(p => p.brand))];

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

    // Filtrado
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesBrand = selectedBrand === 'All' || product.brand === selectedBrand;
        return matchesSearch && matchesBrand;
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
                    <h1 className="list-title">Catálogo Completo</h1>
                    <p className="list-subtitle">Encuentra tu próximo smartphone ideal.</p>
                </div>

                {loading ? (
                    <div className="loading-container" style={{ padding: '40px', textAlign: 'center' }}>
                        <p>Cargando catálogo...</p>
                        <p style={{ fontSize: '10px', color: '#666' }}>Intentando leer /catalog.json</p>
                    </div>
                ) : error ? (
                    <div className="error-container" style={{ padding: '40px', textAlign: 'center', color: 'red' }}>
                        <h3>Error cargando el catálogo</h3>
                        <p>{error}</p>
                        <button onClick={() => window.location.reload()}>Reintentar</button>
                    </div>
                ) : (
                    <>
                        <div className="controls-bar">
                            {/* Brand Tabs */}
                            <div className="brand-tabs">
                                {brands.map(brand => (
                                    <button
                                        key={brand}
                                        className={`brand-tab ${selectedBrand === brand ? 'active' : ''}`}
                                        onClick={() => handleBrandChange(brand)}
                                    >
                                        {brand === 'All' ? 'Todos' : brand}
                                    </button>
                                ))}
                            </div>

                            {/* Sort Dropdown */}
                            <div className="sort-dropdown-container">
                                <button className="sort-btn" onClick={() => setShowSortMenu(!showSortMenu)}>
                                    <SlidersHorizontal size={16} />
                                    <span>Ordenar: {getSortLabel(sortBy)}</span>
                                    <ChevronDown size={14} />
                                </button>

                                {showSortMenu && (
                                    <div className="sort-menu">
                                        <button onClick={() => { setSortBy('featured'); setShowSortMenu(false); }} className={sortBy === 'featured' ? 'active' : ''}>
                                            Destacados
                                        </button>
                                        <button onClick={() => { setSortBy('price-asc'); setShowSortMenu(false); }} className={sortBy === 'price-asc' ? 'active' : ''}>
                                            Precio: Bajo a Alto
                                        </button>
                                        <button onClick={() => { setSortBy('price-desc'); setShowSortMenu(false); }} className={sortBy === 'price-desc' ? 'active' : ''}>
                                            Precio: Alto a Bajo
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Results Count */}
                        <div className="results-count">
                            Mostrando {filteredProducts.length} dispositivos
                        </div>

                        {/* Grid */}
                        {filteredProducts.length > 0 ? (
                            <div className="products-grid">
                                {filteredProducts.map(product => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        addToCart={addToCart}
                                        addToCompare={addToCompare}
                                        compareList={compareList}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="no-results-list">
                                <p>No se encontraron productos con estos filtros.</p>
                                <button className="btn-reset-filters" onClick={() => {
                                    setSelectedBrand('All');
                                    setSortBy('featured');
                                }}>
                                    Limpiar Filtros
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
