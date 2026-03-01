import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Check, Truck, Battery, ShoppingBag, ShieldCheck, MapPin } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import ReservationModal from '../components/ReservationModal';
import PageTransition from '../components/PageTransition';
import './ProductDetail.css';
import { calculateSellingPrice, formatCurrency, fetchExchangeRate } from '../utils/pricing';
import { getColorHex } from '../utils/productColors';
import StickyBuyBar from '../components/StickyBuyBar';


const ProductDetail = ({ addToCart, district, setDistrict, addToCompare, compareList }) => {
    const { id } = useParams();
    const { getProductById, loading, dataSource } = useProducts();
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
            setIsStickyVisible(window.scrollY > 600);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Update images when color changes
    useEffect(() => {
        if (product && selectedColor) {
            const images = product.colorImages?.[selectedColor] || [product.image];
            setCurrentImages(images);
        }
    }, [product, selectedColor]);

    // Fetch product data
    useEffect(() => {
        const fetchProduct = async () => {
            const fetchedProduct = await getProductById(id);
            setProduct(fetchedProduct);
            if (fetchedProduct && fetchedProduct.colors && fetchedProduct.colors.length > 0) {
                setSelectedColor(fetchedProduct.colors[0]);
                // Select first available storage with a price
                const firstAvailable = getFirstAvailableStorage(fetchedProduct);
                setSelectedStorage(firstAvailable || (fetchedProduct.storage ? fetchedProduct.storage[0] : ''));
                setSelectedImageIndex(0);
            }
        };
        fetchProduct();
    }, [id, getProductById]);

    // Helper: get first storage option that has a price
    const getFirstAvailableStorage = (prod) => {
        if (!prod || !prod.storage) return '';
        if (prod.storagePrices) {
            // From Sheets: pick first with a non-null price
            for (const s of prod.storage) {
                if (prod.storagePrices[s] !== null && prod.storagePrices[s] !== undefined) {
                    return s;
                }
            }
        }
        return prod.storage[0] || '';
    };

    // Dynamic price: resolve per-capacity or fallback to flat price
    const getPrice = () => {
        if (!product) return 0;

        // If product has per-capacity pricing (from Sheets)
        if (product.storagePrices && selectedStorage) {
            const capacityPrice = product.storagePrices[selectedStorage];
            if (capacityPrice !== null && capacityPrice !== undefined) {
                return capacityPrice;
            }
        }

        // Fallback to flat price
        return product.price || 0;
    };

    const finalPrice = getPrice();

    // Check if a storage option is available (has a price)
    const isStorageAvailable = (size) => {
        if (!product) return false;
        // If coming from local JSON (no storagePrices), all listed options are available
        if (!product.storagePrices) return true;
        return product.storagePrices[size] !== null && product.storagePrices[size] !== undefined;
    };

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

    // SKELETON LOADING STATE
    if (loading || !product) {
        return (
            <PageTransition>
                <div className="detail-page container">
                    <div className="skeleton-back-link"></div>
                    <div className="meli-grid">
                        <div className="image-section-meli">
                            <div className="skeleton-thumbnails">
                                {[1, 2, 3].map(i => <div key={i} className="skeleton-thumb"></div>)}
                            </div>
                            <div className="skeleton-main-image"></div>
                        </div>
                        <div className="info-section-meli">
                            <div className="skeleton-line skeleton-condition"></div>
                            <div className="skeleton-line skeleton-title"></div>
                            <div className="skeleton-line skeleton-grade"></div>
                            <div className="skeleton-colors">
                                {[1, 2, 3, 4].map(i => <div key={i} className="skeleton-swatch"></div>)}
                            </div>
                            <div className="skeleton-storage">
                                {[1, 2, 3].map(i => <div key={i} className="skeleton-pill"></div>)}
                            </div>
                            <div className="skeleton-specs">
                                {[1, 2, 3, 4].map(i => <div key={i} className="skeleton-line skeleton-spec"></div>)}
                            </div>
                        </div>
                        <div className="buy-box-section">
                            <div className="skeleton-buybox">
                                <div className="skeleton-line skeleton-price"></div>
                                <div className="skeleton-line skeleton-label"></div>
                                <div className="skeleton-btn"></div>
                                <div className="skeleton-btn"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </PageTransition>
        );
    }

    return (
        <PageTransition>
            <div className="detail-page container">
                <Helmet>
                    <title>{`${product.name} - ${selectedStorage || product.storage?.[0] || ''} | WueniPixel`}</title>
                    <meta name="description" content={`Consigue tu ${product.name} en WueniPixel. ${product.description} Garantía de prueba técnica y entrega programada en Cañete.`} />
                    <meta property="og:title" content={`${product.name} | WueniPixel Store`} />
                    <meta property="og:description" content={product.description} />
                    <meta property="og:image" content={product.image} />
                    <script type="application/ld+json">{JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Product",
                        "name": product.name,
                        "image": product.image,
                        "description": product.description || `${product.name} disponible en WueniPixel`,
                        "brand": { "@type": "Brand", "name": product.brand },
                        "sku": `WP-${product.id}`,
                        "itemCondition": product.condition === 'new'
                            ? "https://schema.org/NewCondition"
                            : "https://schema.org/RefurbishedCondition",
                        "offers": {
                            "@type": "Offer",
                            "url": `https://wuenipixel.com/products/${product.id}`,
                            "priceCurrency": "PEN",
                            "price": finalPrice,
                            "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                            "availability": "https://schema.org/InStock",
                            "seller": {
                                "@type": "LocalBusiness",
                                "name": "WueniPixel",
                                "address": {
                                    "@type": "PostalAddress",
                                    "addressLocality": "San Vicente de Cañete",
                                    "addressRegion": "Lima",
                                    "addressCountry": "PE"
                                }
                            }
                        }
                    })}</script>
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
                                    }}
                                />
                            </div>
                        </div>


                        {/* COLUMNA 2: INFO CENTRAL */}
                        <div className="info-section-meli">
                            <span className="condition-text">{product.condition === 'new' ? 'Nuevo Sellado' : 'Seminuevo'}</span>
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
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* STORAGE SELECTOR - Píldoras con Vino Tinto */}
                            <div className="meli-selector">
                                <span className="selector-label">Almacenamiento: <strong>{selectedStorage}</strong></span>
                                {product.storage && (
                                    <div className="storage-pills">
                                        {product.storage.map(size => {
                                            const available = isStorageAvailable(size);
                                            const isActive = selectedStorage === size;
                                            return (
                                                <button
                                                    key={size}
                                                    className={`storage-pill ${isActive ? 'active' : ''} ${!available ? 'disabled' : ''}`}
                                                    onClick={() => available && setSelectedStorage(size)}
                                                    disabled={!available}
                                                    title={available ? `Seleccionar ${size}` : `${size} no disponible`}
                                                >
                                                    {size}
                                                </button>
                                            );
                                        })}
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
                                {/* ANIMATED PRICE */}
                                <div className="price-animate-container">
                                    <AnimatePresence mode="wait">
                                        <motion.p
                                            key={finalPrice}
                                            className="meli-price"
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -12 }}
                                            transition={{ duration: 0.25, ease: 'easeOut' }}
                                        >
                                            {formatCurrency(finalPrice)}
                                        </motion.p>
                                    </AnimatePresence>
                                </div>
                                <p className="price-neto-label">Precio final al contado</p>

                                {/* Sheets indicator */}
                                {dataSource === 'sheets' && (
                                    <span className="sheets-live-badge">● Precio en tiempo real</span>
                                )}

                                {/* LOGISTICA LOCAL */}
                                <div className="local-shipping-badge">
                                    <MapPin size={16} />
                                    <p>Entrega programada por importación (2-3 semanas).</p>
                                </div>

                                <p className="stock-label">Stock disponible (Pocas unidades)</p>

                                <div className="buy-actions">
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="btn-add-to-cart-detail"
                                    >
                                        Agregar al Carrito
                                    </button>
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="btn-buy-now-detail"
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
