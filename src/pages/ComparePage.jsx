import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, X, ShoppingCart } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { calculateSellingPrice, formatCurrency, fetchExchangeRate } from '../utils/pricing';
import PageTransition from '../components/PageTransition';
import './ComparePage.css';

const ComparePage = ({ addToCart }) => {
    const [searchParams] = useSearchParams();
    const p1Id = searchParams.get('p1');
    const p2Id = searchParams.get('p2');

    const { getProductById, loading } = useProducts();
    const [productsToCompare, setProductsToCompare] = useState([]);
    const [exchangeRate, setExchangeRate] = useState(3.85);

    useEffect(() => {
        const init = async () => {
            const rate = await fetchExchangeRate();
            setExchangeRate(rate);
        };
        init();
    }, []);

    useEffect(() => {
        if (!loading) {
            const p1 = getProductById(p1Id);
            const p2 = getProductById(p2Id);

            const list = [];
            if (p1) list.push(p1);
            if (p2) list.push(p2);
            setProductsToCompare(list);
        }
    }, [loading, p1Id, p2Id, getProductById]);

    const getPrice = (product) => {
        if (!product) return 0;
        return product.ebayPrice
            ? calculateSellingPrice(product.ebayPrice, exchangeRate)
            : product.price;
    };

    if (loading) {
        return <div className="compare-page container" style={{ padding: '80px', textAlign: 'center' }}>Cargando comparación...</div>;
    }

    if (productsToCompare.length === 0) {
        return (
            <div className="compare-page container">
                <p>No hay productos para comparar.</p>
                <Link to="/products" className="btn-back">Volver al catálogo</Link>
            </div>
        );
    }

    return (
        <PageTransition>
            <div className="compare-page container">
                <Link to="/products" className="back-link">
                    <ArrowLeft size={20} /> Volver al catálogo
                </Link>

                <h1 className="page-title">Comparación de Modelos</h1>

                <div className="compare-grid">
                    <div className="compare-labels">
                        <div className="label-row header-row"></div>
                        <div className="label-row">Precio</div>
                        <div className="label-row">Pantalla</div>
                        <div className="label-row">Procesador</div>
                        <div className="label-row">Cámara</div>
                        <div className="label-row">Batería</div>
                        <div className="label-row">Condición</div>
                        <div className="label-row">Colores</div>
                    </div>

                    {productsToCompare.map(product => (
                        <div key={product.id} className="compare-column">
                            <div className="compare-header">
                                <img src={product.image} alt={product.name} className="compare-image" />
                                <h3>{product.name}</h3>
                            </div>

                            <div className="compare-data">
                                <div className="data-row price-row">
                                    {formatCurrency(getPrice(product))}
                                </div>
                                <div className="data-row">{product.specs.screen}</div>
                                <div className="data-row">{product.specs.processor}</div>
                                <div className="data-row">{product.specs.camera}</div>
                                <div className="data-row">{product.specs.battery}</div>
                                <div className="data-row">
                                    {product.condition === 'new' ? 'Nuevo' : 'Seminuevo'}
                                </div>
                                <div className="data-row colors-row">
                                    {product.colors.map(c => (
                                        <span key={c} className="color-dot" title={c} style={{ backgroundColor: c.toLowerCase() }}></span>
                                    ))}
                                </div>
                                <div className="data-row action-row">
                                    <button
                                        className="btn-add-cart-compare"
                                        onClick={() => addToCart({ ...product, price: getPrice(product) })}
                                    >
                                        <ShoppingCart size={16} /> Agregar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PageTransition>
    );
};

export default ComparePage;
