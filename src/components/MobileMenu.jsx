import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { X, Smartphone, ChevronRight, Apple, Zap, Search } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import './MobileMenu.css';
import { useState } from 'react';

const MobileMenu = ({ isOpen, onClose, onSearchOpen }) => {
    const { products } = useProducts();
    const navigate = useNavigate();
    const [expandedMenu, setExpandedMenu] = useState(null);

    const menuVariants = {
        closed: {
            x: "100%",
            transition: { type: "spring", stiffness: 300, damping: 30 }
        },
        open: {
            x: 0,
            transition: { type: "spring", stiffness: 300, damping: 30 }
        }
    };

    const linkVariants = {
        closed: { x: 50, opacity: 0 },
        open: (i) => ({
            x: 0,
            opacity: 1,
            transition: { delay: i * 0.05, type: "spring", stiffness: 300, damping: 20 }
        })
    };

    const iphones = products.filter(p => p.brand === 'Apple').slice(0, 5);
    const pixels = products.filter(p => p.brand === 'Google').slice(0, 5);

    const handleNavigation = (path) => {
        navigate(path);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="mobile-menu-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div
                        className="mobile-menu-container"
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                    >
                        <div className="mobile-menu-header">
                            <span className="mobile-menu-title">Menú</span>
                            <button className="mobile-menu-close" onClick={onClose}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className="mobile-menu-search">
                            <button className="mobile-search-btn" onClick={() => { onSearchOpen(); onClose(); }}>
                                <Search size={20} />
                                <span>Buscar equipos...</span>
                            </button>
                        </div>

                        <nav className="mobile-nav-links">
                            {/* Home */}
                            <motion.div variants={linkVariants} custom={0}>
                                <button className="mobile-nav-item" onClick={() => handleNavigation('/')}>
                                    Inicio
                                </button>
                            </motion.div>

                            {/* Apple Section */}
                            <motion.div variants={linkVariants} custom={1}>
                                <div className="mobile-nav-group">
                                    <button
                                        className={`mobile-nav-item has-submenu ${expandedMenu === 'apple' ? 'active' : ''}`}
                                        onClick={() => setExpandedMenu(expandedMenu === 'apple' ? null : 'apple')}
                                    >
                                        <span className="flex-center"><Apple size={18} style={{ marginRight: 8 }} /> iPhone</span>
                                        <ChevronRight size={16} className={`submenu-arrow ${expandedMenu === 'apple' ? 'rotated' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                        {expandedMenu === 'apple' && (
                                            <motion.div
                                                className="mobile-submenu"
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                            >
                                                {iphones.map(p => (
                                                    <button key={p.id} className="submenu-item" onClick={() => handleNavigation(`/products/${p.id}`)}>
                                                        {p.name}
                                                    </button>
                                                ))}
                                                <button className="submenu-item view-all" onClick={() => handleNavigation('/products?brand=Apple')}>
                                                    Ver todos los iPhone
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>

                            {/* Google Section */}
                            <motion.div variants={linkVariants} custom={2}>
                                <div className="mobile-nav-group">
                                    <button
                                        className={`mobile-nav-item has-submenu ${expandedMenu === 'google' ? 'active' : ''}`}
                                        onClick={() => setExpandedMenu(expandedMenu === 'google' ? null : 'google')}
                                    >
                                        <span className="flex-center"><Smartphone size={18} style={{ marginRight: 8 }} /> Google Pixel</span>
                                        <ChevronRight size={16} className={`submenu-arrow ${expandedMenu === 'google' ? 'rotated' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                        {expandedMenu === 'google' && (
                                            <motion.div
                                                className="mobile-submenu"
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                            >
                                                {pixels.map(p => (
                                                    <button key={p.id} className="submenu-item" onClick={() => handleNavigation(`/products/${p.id}`)}>
                                                        {p.name}
                                                    </button>
                                                ))}
                                                <button className="submenu-item view-all" onClick={() => handleNavigation('/products?brand=Google')}>
                                                    Ver todos los Pixel
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>

                            {/* Info Links */}
                            <motion.div variants={linkVariants} custom={3}>
                                <button className="mobile-nav-item" onClick={() => handleNavigation('/tracking')}>
                                    <Zap size={18} style={{ marginRight: 8 }} /> Rastrear Pedido
                                </button>
                            </motion.div>
                        </nav>

                        <div className="mobile-menu-footer">
                            <p>WueniPixel &copy; 2026</p>
                            <p className="text-sm">Envíos a todo Cañete</p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MobileMenu;
