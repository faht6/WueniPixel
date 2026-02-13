import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Navbar from './components/Navbar';
import PromoBanner from './components/PromoBanner';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import ComparePage from './pages/ComparePage';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import InfoPage from './pages/InfoPage';
import Toast from './components/Toast';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';
import CompareBar from './components/CompareBar';
import { ProductProvider } from './context/ProductContext';
import ComplaintsBook from './pages/ComplaintsBook';

function App() {
    // Estado del Carrito
    // Estado para el carrito con persistencia
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const location = useLocation();
    const [notification, setNotification] = useState(null);

    // Guardar carrito en localStorage cada vez que cambie
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Estado del Distrito (Persistente)
    const [district, setDistrict] = useState(() => {
        return localStorage.getItem('district') || '';
    });

    useEffect(() => {
        if (district) {
            localStorage.setItem('district', district);
        }
    }, [district]);

    // Estado del Tema (Dark Mode) con Persistencia y Detección Automática
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) return savedTheme;

        // Auto Dark Mode: 7 PM - 6 AM
        const hour = new Date().getHours();
        return (hour >= 19 || hour < 6) ? 'dark' : 'light';
    });

    // Efecto para aplicar tema al body y guardar preferencia
    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const showToast = (message) => {
        setNotification(message);
        // El componente Toast se auto-cierra, pero limpiamos el estado aqui si queremos
        // O dejamos que el Toast llame a onClose.
        // Simplificación: Toast componente maneja su timer, pero aqui reseteamos si quisieramos forzar.
    };

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true);
        showToast(`Agregado: ${product.name}`);
    };

    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, change) => {
        setCart(prev => prev.map(item => {
            if (item.id === productId) {
                const newQuantity = Math.max(1, item.quantity + change);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    // Estado para Comparador
    const [compareList, setCompareList] = useState([]);

    const addToCompare = (product) => {
        if (compareList.length >= 2) {
            showToast("Máximo 2 productos para comparar");
            return;
        }
        if (compareList.find(p => p.id === product.id)) {
            showToast("Producto ya está en comparación");
            return;
        }
        setCompareList(prev => [...prev, product]);
    };

    const removeFromCompare = (productId) => {
        setCompareList(prev => prev.filter(p => p.id !== productId));
    };

    const clearCompare = () => {
        setCompareList([]);
    };

    return (
        <ProductProvider>
            <div className="app">
                <Helmet>
                    <title>WueniPixel | iPhones y Pixels Seminuevos con Garantía</title>
                    <meta name="description" content="La boutique de tecnología más confiable del Perú. Encuentra iPhones y Google Pixels seminuevos certificados y nuevos con garantía real." />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="WueniPixel | Tecnología Premium al Mejor Precio" />
                    <meta property="og:description" content="iPhones y Pixels con garantía, envío gratis y cuotas sin intereses." />
                    <meta property="og:image" content="https://wuenipixel.com/og-image.jpg" /> {/* Pending real image */}
                </Helmet>

                <PromoBanner />
                <ScrollToTop />
                <Navbar
                    cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
                    onCartClick={() => setIsCartOpen(true)}
                    theme={theme}
                    toggleTheme={toggleTheme}
                    district={district}
                    setDistrict={setDistrict}
                />

                <main>
                    {/* Rutas de Información (Ayuda y Legal) */}
                    <AnimatePresence mode="wait">
                        <Routes location={location} key={location.pathname}>
                            <Route path="/" element={
                                <Home
                                    addToCart={addToCart}
                                    district={district}
                                    addToCompare={addToCompare}
                                    compareList={compareList}
                                />
                            } />
                            <Route path="/products" element={
                                <ProductList
                                    addToCart={addToCart}
                                    addToCompare={addToCompare}
                                    compareList={compareList}
                                />
                            } />
                            <Route path="/products/:id" element={
                                <ProductDetail
                                    addToCart={addToCart}
                                    district={district}
                                    setDistrict={setDistrict}
                                    addToCompare={addToCompare}
                                    compareList={compareList}
                                />
                            } />
                            <Route path="/compare" element={<ComparePage addToCart={addToCart} />} />
                            <Route path="/cart" element={
                                <Cart
                                    items={cart}
                                    removeFromCart={removeFromCart}
                                    updateQuantity={updateQuantity}
                                />
                            } />
                            <Route path="/checkout" element={
                                <Checkout cart={cart} clearCart={() => setCart([])} />
                            } />

                            <Route path="/help/:slug" element={<InfoPage />} />
                            <Route path="/legal/:slug" element={<InfoPage />} />
                        </Routes>
                    </AnimatePresence>
                </main>


                <Footer />
                <CompareBar
                    compareList={compareList}
                    removeFromCompare={removeFromCompare}
                    clearCompare={clearCompare}
                />
                {notification && (
                    <Toast
                        message={notification}
                        onClose={() => setNotification(null)}
                    />
                )}
                <WhatsAppButton />
            </div>
        </ProductProvider>
    );
}

export default App;
