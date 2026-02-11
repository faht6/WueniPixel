import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, Truck, Battery, ShoppingBag, ShieldCheck, MapPin } from 'lucide-react';
import productsData from '../data/products.json';
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import ReservationModal from '../components/ReservationModal';
import './ProductDetail.css';
import { calculateSellingPrice, formatCurrency, fetchExchangeRate } from '../utils/pricing';

const ProductDetail = ({ addToCart, district }) => {
    const { id } = useParams();
    const product = productsData.find(p => p.id === parseInt(id));

    const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null);
    const [selectedStorage, setSelectedStorage] = useState(product?.storage?.[0] || null);
    const [added, setAdded] = useState(false);

    // Dynamic Pricing State
    const [exchangeRate, setExchangeRate] = useState(3.85);
    const [finalPrice, setFinalPrice] = useState(product?.price || 0);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reservationSuccess, setReservationSuccess] = useState(false);

    useEffect(() => {
        const init = async () => {
            const rate = await fetchExchangeRate();
            setExchangeRate(rate);
            if (product?.ebayPrice) {
                const calculated = calculateSellingPrice(product.ebayPrice, rate);
                setFinalPrice(calculated);
            } else {
                setFinalPrice(product?.price || 0);
            }
        };
        init();
    }, [product]);

    if (!product) {
        return <div className="detail-page container">Producto no encontrado</div>;
    }

    const handleAddToCart = () => {
        addToCart({
            ...product,
            price: finalPrice, // Use calculated price
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
            // Hide success message after a few seconds? Or keep it?
            // User said: "Al terminar, muestra este mensaje en pantalla..."
            // We'll render it conditionally in the JSX.
        }
    };

    return (
        <div className="detail-page container">
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
    );
};

export default ProductDetail;
