import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Check, Battery, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { calculateSellingPrice, formatCurrency, fetchExchangeRate } from '../utils/pricing';
import { useState, useEffect } from 'react';
import './ProductQuickView.css';

const ProductQuickView = ({ product, isOpen, onClose }) => {
    const [price, setPrice] = useState(product?.price || 0);

    useEffect(() => {
        if (product) {
            const initPrice = async () => {
                if (product.price > 0) {
                    setPrice(product.price);
                } else if (product.ebayPrice) {
                    const rate = await fetchExchangeRate();
                    const calculated = calculateSellingPrice(product.ebayPrice, rate);
                    setPrice(calculated);
                }
            };
            initPrice();
        }
    }, [product]);

    if (!isOpen || !product) return null;

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } },
        exit: { opacity: 0, scale: 0.95, y: 20 }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="quickview-overlay"
                    variants={overlayVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={onClose}
                >
                    <motion.div
                        className="quickview-modal"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="close-btn" onClick={onClose}>
                            <X size={24} />
                        </button>

                        <div className="quickview-grid">
                            <div className="quickview-image-col">
                                <motion.img
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    src={product.image}
                                    alt={product.name}
                                    className="quickview-image"
                                />
                                {product.condition === 'new' && <span className="qv-badge new">Nuevo Sellado</span>}
                                {product.grade?.includes('A+') && <span className="qv-badge grade">Grado A+</span>}
                            </div>

                            <div className="quickview-info-col">
                                <span className="qv-brand">{product.brand}</span>
                                <h2 className="qv-title">{product.name}</h2>
                                <div className="qv-price-block">
                                    <span className="qv-price">{formatCurrency(price)}</span>
                                    <span className="qv-tax-text">Precio neto al contado</span>
                                </div>

                                <div className="qv-features">
                                    <div className="qv-feature">
                                        <Check size={16} className="text-green" />
                                        <span>Garantía {product.condition === 'new' ? '1 Año' : '3 Meses'}</span>
                                    </div>
                                    <div className="qv-feature">
                                        <Battery size={16} className="text-green" />
                                        <span>Batería: {product.battery_health || product.specs?.battery || '85%+'}</span>
                                    </div>
                                    <div className="qv-feature">
                                        <Zap size={16} className="text-accent" />
                                        <span>Estado estético Excelente/Good</span>
                                    </div>
                                </div>

                                <p className="qv-desc">
                                    {product.description || `Disfruta del rendimiento premium del ${product.name}. Directa de USA con entrega personal en San Vicente.`}
                                </p>

                                <div className="qv-actions">
                                    <a
                                        href={`https://wa.me/51900000000?text=${encodeURIComponent(`Hola WueniPixel, estoy interesado en el ${product.name} que vi en la Vista Rápida.`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-whatsapp-qv"
                                    >
                                        <ShoppingCart size={20} />
                                        Reservar ahora
                                    </a>
                                    <Link to={`/products/${product.id}`} className="btn-details-qv" onClick={onClose}>
                                        Ver detalles completos
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProductQuickView;
