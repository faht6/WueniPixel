import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import InfoPage from './pages/InfoPage';
import Toast from './components/Toast';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
    // Estado del Carrito
    // Estado para el carrito con persistencia
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

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

    return (
        <div className="app">
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
                <Routes>
                    <Route path="/" element={<Home addToCart={addToCart} district={district} />} />
                    <Route path="/products" element={<ProductList addToCart={addToCart} />} />
                    <Route path="/products/:id" element={<ProductDetail addToCart={addToCart} district={district} setDistrict={setDistrict} />} />
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

                    {/* Rutas de Información (Ayuda y Legal) */}
                    <Route path="/help/:slug" element={<InfoPage />} />
                    <Route path="/legal/:slug" element={<InfoPage />} />
                </Routes>
            </main>


            <Footer />
            {notification && (
                <Toast
                    message={notification}
                    onClose={() => setNotification(null)}
                />
            )}
            <WhatsAppButton />
        </div>
    );
}

export default App;
