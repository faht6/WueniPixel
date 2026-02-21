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
import StickyBuyBar from '../components/StickyBuyBar';


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
    const [isStickyVisible, setIsStickyVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show sticky bar after scrolling 600px (approx past the buy box on mobile)
            setIsStickyVisible(window.scrollY > 600);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


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
            // Removed: setSelectedImageIndex(0); to persist view across color changes
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
                setSelectedImageIndex(0); // Reset image index on new product load
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
                    <meta name="description" content={`Consigue tu ${product.name} en WueniPixel. ${product.description} Garantía de prueba técnica y entrega programada en Cañete.`} />
                    <meta property="og:title" content={`${product.name} | WueniPixel Store`} />
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
                            <h2>¡Gracias! Tu solicitud ha sido enviada.</h2>
                            <p>Te contactaremos para iniciar el proceso de reserva (S/ 50.00).</p>
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
                            <span className="condition-text">{product.name.includes('Pixel') ? 'Nuevo Sellado' : 'Seminuevo Premium'}</span>
                            <h1 className="meli-title">{product.name}</h1>

                            <div className="aesthetics-grade">
                                <span className="grade-label">Estado:</span>
                                <span className="grade-value">{product.grade || 'Impecable (10/10)'}</span>
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
                                <h3>Especificaciones Destacadas</h3>
                                <ul>
                                    <li><strong>Pantalla:</strong> {product.specs?.screen || 'N/A'}</li>
                                    <li><strong>Procesador:</strong> {product.specs?.processor || 'N/A'}</li>
                                    <li><strong>Cámara:</strong> {product.specs?.camera || 'N/A'}</li>
                                    <li><strong>Batería:</strong> {product.specs?.battery || 'N/A'}</li>
                                </ul>
                            </div>

                            <div className="battery-health-badge">
                                <Battery size={20} color="#50C878" />
                                <span>Salud Mínima: {product.condition === 'new' ? '100%' : '85%'}</span>
                            </div>
                        </div>

                        {/* COLUMNA 3: BUY BOX */}
                        <div className="buy-box-section">
                            <div className="buy-box">
                                <p className="meli-price">{formatCurrency(finalPrice)}</p>
                                <p className="price-neto-label">Precio final al contado</p>

                                {/* LOGISTICA LOCAL */}
                                <div className="local-shipping-badge">
                                    <MapPin size={16} />
                                    <p>Entrega programada por importación (2-3 semanas).</p>
                                </div>

                                <p className="stock-label">Stock disponible (Pocas unidades)</p>

                                <div className="buy-actions">
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="btn-add-to-cart"
                                        style={{
                                            backgroundColor: 'transparent',
                                            border: '2px solid #800020',
                                            color: '#800020',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            fontWeight: 'bold',
                                            cursor: 'pointer',
                                            marginBottom: '10px'
                                        }}
                                    >
                                        Agregar al Carrito
                                    </button>
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
                                            padding: '12px',
                                            borderRadius: '8px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Consultar Stock Real
                                    </button>
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

                <StickyBuyBar
                    product={product}
                    price={finalPrice}
                    visible={isStickyVisible}
                    onBuy={() => setIsModalOpen(true)}
                />
            </div >
        </PageTransition >

    );
};

export default ProductDetail;
