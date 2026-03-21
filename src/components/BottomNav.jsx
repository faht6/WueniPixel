import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Smartphone, GitCompare, ShoppingBag, User } from 'lucide-react';
import './BottomNav.css';

const BottomNav = ({ cartCount }) => {
    const location = useLocation();

    return (
        <nav className="bottom-nav">
            <NavLink to="/" className={`bottom-nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                <Home size={22} />
                <span>Inicio</span>
            </NavLink>
            <NavLink to="/products" className={`bottom-nav-item ${location.pathname.includes('/product') ? 'active' : ''}`}>
                <Smartphone size={22} />
                <span>Tienda</span>
            </NavLink>
            <NavLink to="/compare" className={`bottom-nav-item ${location.pathname === '/compare' ? 'active' : ''}`}>
                <GitCompare size={22} />
                <span>Comparar</span>
            </NavLink>
            <NavLink to="/cart" className={`bottom-nav-item ${location.pathname === '/cart' ? 'active' : ''}`}>
                <div style={{ position: 'relative' }}>
                    <ShoppingBag size={22} />
                    {cartCount > 0 && <span className="bottom-nav-badge">{cartCount}</span>}
                </div>
                <span>Carrito</span>
            </NavLink>
            <a href="https://wa.me/51941126123" target="_blank" rel="noopener noreferrer" className="bottom-nav-item">
                <User size={22} />
                <span>Soporte</span>
            </a>
        </nav>
    );
};

export default BottomNav;
