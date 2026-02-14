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
import { getColorHex } from '../utils/productColors';

const ProductDetail = ({ addToCart, district, setDistrict, addToCompare, compareList }) => {
    const { id } = useParams();
    const { getProductById, loading } = useProducts();
    const [product, setProduct] = useState(null);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedStorage, setSelectedStorage] = useState('');
    const [currentImages, setCurrentImages] = useState([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    // Estados
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reservationSuccess, setReservationSuccess] = useState(false);
    const [added, setAdded] = useState(false);

    // Dynamic Pricing State

    // ...

    // Update images when color changes
    useEffect(() => {
        if (product && selectedColor) {
            const images = product.colorImages?.[selectedColor] || [product.image, product.image, product.image];
            // Ensure we always have at least 3 images for the layout
            const filledImages = [...images];
            while (filledImages.length < 3) {
                filledImages.push(product.image);
            }
            setCurrentImages(filledImages.slice(0, 3));
            setSelectedImageIndex(0);
        }
    }, [product, selectedColor]);

    // Fetch product data
    useEffect(() => {
        const fetchProduct = async () => {
            const fetchedProduct = await getProductById(id);
            setProduct(fetchedProduct);
            if (fetchedProduct && fetchedProduct.colors && fetchedProduct.colors.length > 0) {
                setSelectedColor(fetchedProduct.colors[0]);
                setSelectedStorage(fetchedProduct.storage ? fetchedProduct.storage[0] : '');
            }
        };
        fetchProduct();
    }, [id, getProductById]);

    // Simple price logic for catalog items (already in Soles)
    const finalPrice = product ? product.price : 0;

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
                                {currentImages.map((img, i) => (
                                    <div
                                        key={i}
                                        className={`thumb ${selectedImageIndex === i ? 'active' : ''}`}
                                        onMouseEnter={() => setSelectedImageIndex(i)}
                                        onClick={() => setSelectedImageIndex(i)}
                                    >
                                        <img src={img} alt={`Thumbnail ${i + 1}`} />
                                    </div>
                                ))}
                            </div>
                            <div className="main-image-container">
                                <img
                                    src={currentImages[selectedImageIndex]}
                                    alt={product.name}
                                    className="main-image-meli"
                                    onError={(e) => {
                                        console.error('IMG ERROR:', e.target.src);
                                        // Optional fallback if needed in future
                                        // e.target.src = '/placeholder.jpg';
                                    }}
                                />
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

                            <div className="meli-selector">
                                <span className="selector-label">Color: <strong>{selectedColor}</strong></span>
                                {product.colors && (
                                    <div className="color-options-meli">
                                        {product.colors.map(color => (
                                            <button
                                                key={color}
                                                className={`color-swatch ${selectedColor === color ? 'active' : ''}`}
                                                onClick={() => setSelectedColor(color)}
                                                title={color}
                                                style={{ backgroundColor: getColorHex(color) }}
                                            >
                                                {/* Visual only, text via tooltips/label */}
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
                )
                }

                <ReservationModal
                    isOpen={isModalOpen}
                    onClose={handleReservationClose}
                    product={product}
                    selectedColor={selectedColor}
                    selectedStorage={selectedStorage}
                />

            </div >
        </PageTransition >
    );
};

export default ProductDetail;
