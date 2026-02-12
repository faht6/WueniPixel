import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Check, Truck, Battery, ShoppingBag, ShieldCheck, MapPin } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import ReservationModal from '../components/ReservationModal';
import PageTransition from '../components/PageTransition';
import './ProductDetail.css';
import { calculateSellingPrice, formatCurrency, fetchExchangeRate } from '../utils/pricing';

const ProductDetail = ({ addToCart, district, setDistrict, addToCompare, compareList }) => {
    const { id } = useParams();
    const { getProductById, loading } = useProducts();
    const [product, setProduct] = useState(null);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedStorage, setSelectedStorage] = useState('');

    // Estados
    const [added, setAdded] = useState(false);

    // Dynamic Pricing State
    const [finalPrice, setFinalPrice] = useState(0);
    const [exchangeRate, setExchangeRate] = useState(3.85); // Keep this here, it's not in the provided snippet but is used.

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reservationSuccess, setReservationSuccess] = useState(false);

    useEffect(() => {
        const init = async () => {
            // Exchange rate fetch
            const rate = await fetchExchangeRate();
            setExchangeRate(rate);
        };
        init();
    }, []);

    // Actualizar estado cuando el producto (desde context) esté listo
    useEffect(() => {
        if (product) {
            setSelectedColor(product.colors[0]);
            setSelectedStorage(product.storage[0]);

            // Calculo inicial de precio
            // Calculo inicial de precio
            // Prioridad: 1. Precio Manual (CSV 'price') | 2. Calculado (CSV 'ebayPrice')
            const basePrice = product.price > 0
                ? product.price
                : (product.ebayPrice ? calculateSellingPrice(product.ebayPrice, exchangeRate) : 0);

            // setDisplayPrice(basePrice); // This was removed in the instruction
            setFinalPrice(basePrice);
        }
    }, [product, exchangeRate]);

    // Fetch product data
    useEffect(() => {
        const fetchProduct = async () => {
            const fetchedProduct = await getProductById(id);
            setProduct(fetchedProduct);
        };
        fetchProduct();
    }, [id, getProductById]);

    const handleAddToCart = () => {
        addToCart({
            ...product,
            price: finalPrice,
            selectedColor,
            selectedStorage
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const handleReservationClose = (success) => {
        setIsModalOpen(false);
        if (success) {
            setReservationSuccess(true);
        }
    };

    if (loading || !product) {
        return (
            <PageTransition>
                <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>
                    <h2>Cargando producto...</h2>
                </div>
            </PageTransition>
        );
    }

    return (
        <PageTransition>
            <div className="detail-page container">
                <Helmet>
                    <title>{`${product.name} - ${product.storage?.[0] || ''} | WueniPixel`}</title>
                    <meta name="description" content={`Compra ${product.name} en WueniPixel. ${product.description} Garantía de 1 año y envío gratis.`} />
                    <meta property="og:title" content={`${product.name} en Oferta | WueniPixel`} />
                    <meta property="og:description" content={product.description} />
                    <meta property="og:image" content={product.image} />
                </Helmet>

                <Link to="/products" className="back-link">
                    <ArrowLeft size={20} /> Volver al listado
                </Link>

                {reservationSuccess ? (
                    <div className="reservation-success-message animate-fade-in">
                        <div className="success-content">
                            <Check size={48} color="#50C878" />
                            <h2>¡Gracias! Tu reserva ha sido enviada.</h2>
                            <p>Te contactaremos en breve para coordinar la entrega.</p>
                            <button onClick={() => setReservationSuccess(false)} className="btn-reset">Volver al producto</button>
                        </div>
                    </div>
                ) : (
                    <div className="meli-grid">
                        {/* COLUMNA 1: IMAGEN */}
                        <div className="image-section-meli">
                            <div className="thumbnail-list">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className={`thumb ${i === 1 ? 'active' : ''}`}>
                                        <img src={product.image} alt="Thumbnail" />
                                    </div>
                                ))}
                            </div>
                            <div className="main-image-container">
                                <img src={product.image} alt={product.name} className="main-image-meli" />
                            </div>
                        </div>

                        {/* COLUMNA 2: INFO CENTRAL */}
                        <div className="info-section-meli">
                            <span className="condition-text">{product.condition === 'new' ? 'Nuevo' : 'Seminuevo Certificado'}</span>
                            <h1 className="meli-title">{product.name}</h1>

                            <div className="aesthetics-grade">
                                <span className="grade-label">Grado Estético:</span>
                                <span className="grade-value">{product.grade || 'A+ (Impecable)'}</span>
                            </div>

                            {/* SELECTORES */}
                            <div className="meli-selector">
                                <span className="selector-label">Color: <strong>{selectedColor}</strong></span>
                                {product.colors && (
                                    <div className="color-options-meli text-options">
                                        {product.colors.map(color => (
                                            <button
                                                key={color}
                                                className={`color-pill ${selectedColor === color ? 'active' : ''}`}
                                                onClick={() => setSelectedColor(color)}
                                            >
                                                {color}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="meli-selector">
                                <span className="selector-label">Almacenamiento: <strong>{selectedStorage}</strong></span>
                                {product.storage && (
                                    <div className="storage-options-meli">
                                        {product.storage.map(size => (
                                            <button
                                                key={size}
                                                className={`storage-chip-meli ${selectedStorage === size ? 'active' : ''}`}
                                                onClick={() => setSelectedStorage(size)}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="specs-list-meli">
                                <h3>Lo que tienes que saber de este producto</h3>
                                <ul>
                                    <li><strong>Pantalla:</strong> {product.specs.screen}</li>
                                    <li><strong>Procesador:</strong> {product.specs.processor}</li>
                                    <li><strong>Cámara:</strong> {product.specs.camera}</li>
                                    <li><strong>Batería:</strong> {product.specs.battery}</li>
                                </ul>
                            </div>

                            <div className="battery-health-badge">
                                <Battery size={20} color="#50C878" />
                                <span>Salud de Batería: 85% - 100%</span>
                            </div>
                        </div>

                        {/* COLUMNA 3: BUY BOX */}
                        <div className="buy-box-section">
                            <div className="buy-box">
                                <p className="meli-price">{formatCurrency(finalPrice)}</p>
                                <p className="price-neto-label">Precio neto al contado (Efectivo/Yape/Plin)</p>

                                {/* LOGISTICA LOCAL */}
                                {['San Vicente', 'Imperial'].includes(district) ? (
                                    <div className="local-shipping-badge">
                                        <MapPin size={16} />
                                        <p>Stock físico en Cañete - <strong>Entrega hoy mismo</strong></p>
                                    </div>
                                ) : (
                                    <p className="meli-shipping-free"><Truck size={16} style={{ display: 'inline', marginRight: '6px' }} />Envío Gratis a todo el Perú</p>
                                )}

                                <p className="stock-label">Stock disponible (Pocas unidades)</p>

                                <div className="buy-actions">
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="btn-buy-now"
                                        style={{
                                            backgroundColor: '#800020', // Vino Tinto
                                            textDecoration: 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold',
                                            color: 'white',
                                            border: 'none',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Consultar Stock Real
                                    </button>
                                    {/* Optional Add to Cart */}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <ReservationModal
                    isOpen={isModalOpen}
                    onClose={handleReservationClose}
                    product={product}
                    selectedColor={selectedColor}
                    selectedStorage={selectedStorage}
                />

            </div>
        </PageTransition>
    );
};

export default ProductDetail;
