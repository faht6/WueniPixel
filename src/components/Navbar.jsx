import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Sun, Moon, Smartphone } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { calculateSellingPrice, formatCurrency, fetchExchangeRate } from '../utils/pricing';
import MobileMenu from './MobileMenu';
import './Navbar.css';

const Navbar = ({ cartCount, onCartClick, theme, toggleTheme }) => {
  const { products } = useProducts();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Estado del menú móvil y búsqueda
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(3.85);

  useEffect(() => {
    fetchExchangeRate().then(rate => setExchangeRate(rate));
  }, []);

  // Estado para dropdowns
  const [activeMenu, setActiveMenu] = useState(null); // 'iphone' | 'pixel' | null
  const menuRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Bloquear scroll cuando el buscador está abierto
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isSearchOpen]);

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cerrar todo al cambiar de ruta
  useEffect(() => {
    setActiveMenu(null);
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  const toggleMenu = (menu) => {
    if (activeMenu === menu) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menu);
    }
  };

  // Lógica de Búsqueda
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const results = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleResultClick = (id) => {
    closeSearch();
    navigate(`/products/${id}`);
  };

  // Datos filtrados para dropdowns
  // Datos filtrados para dropdowns
  const iphones = products.filter(p => p.brand === 'Apple');
  const pixels = products.filter(p => p.brand === 'Google');

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'is-scrolled' : ''}`} ref={menuRef}>
        <div className="nav-container">
          <Link
            to="/"
            className="logo"
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <Smartphone className="logo-icon" size={24} />
            WueniPixel <span style={{ fontSize: '0.7em', opacity: 0.5, marginLeft: '5px' }}>v10.0</span>
          </Link>

          {/* Desktop Links con Dropdowns */}
          <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>



            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active-tab' : ''}`}>
              Inicio
            </Link>

            <Link to="/products" className={`nav-link ${location.pathname === '/products' && !location.search ? 'active-tab' : ''}`}>
              Catálogo
            </Link>

            {/* Dropdown iPhone */}
            <div className="nav-item-dropdown">
              <button
                className={`nav-link-btn ${activeMenu === 'iphone' || location.search.includes('Apple') ? 'active-tab' : ''}`}
                onClick={() => toggleMenu('iphone')}
              >
                iPhone
              </button>

              {activeMenu === 'iphone' && (
                <div className="dropdown-menu">
                  <div className="dropdown-content">
                    <p className="dropdown-header">Explorar iPhone</p>
                    <ul>
                      {iphones.map(phone => (
                        <li key={phone.id}>
                          <Link to={`/products/${phone.id}`} className="dropdown-item">
                            {phone.name}
                          </Link>
                        </li>
                      ))}
                      <li><hr className="dropdown-divider" /></li>
                      <li><Link to="/products?brand=Apple" className="dropdown-item">Ver todos los iPhone</Link></li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Dropdown Pixel */}
            <div className="nav-item-dropdown">
              <button
                className={`nav-link-btn ${activeMenu === 'pixel' || location.search.includes('Google') ? 'active-tab' : ''}`}
                onClick={() => toggleMenu('pixel')}
              >
                Pixel
              </button>

              {activeMenu === 'pixel' && (
                <div className="dropdown-menu">
                  <div className="dropdown-content">
                    <p className="dropdown-header">Explorar Pixel</p>
                    <ul>
                      {pixels.map(phone => (
                        <li key={phone.id}>
                          <Link to={`/products/${phone.id}`} className="dropdown-item">
                            {phone.name}
                          </Link>
                        </li>
                      ))}
                      <li><hr className="dropdown-divider" /></li>
                      <li><Link to="/products?brand=Google" className="dropdown-item">Ver todos los Pixel</Link></li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="nav-actions">
            <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle Theme">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button className="icon-btn" onClick={() => setIsSearchOpen(true)} aria-label="Search">
              <Search size={20} />
            </button>

            <Link to="/cart" className="cart-btn" onClick={onCartClick} aria-label="Cart">
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>

            <button
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onSearchOpen={() => setIsSearchOpen(true)}
      />

      {/* SEARCH OVERLAY */}
      <div className={`search-overlay ${isSearchOpen ? 'open' : ''}`}>
        <div className="search-container container">
          <div className="search-header">
            <Search size={24} className="search-icon-large" />
            <input
              type="text"
              placeholder="Buscar productos..."
              className="search-input"
              value={searchQuery}
              onChange={handleSearch}
              autoFocus={isSearchOpen}
            />
            <button className="close-search-btn" onClick={closeSearch}>
              <X size={24} />
            </button>
          </div>

          <div className="search-results">
            {searchResults.length > 0 ? (
              <div className="results-grid">
                {searchResults.map(product => {
                  // Prioridad: 1. Precio Manual (CSV 'price') | 2. Calculado (CSV 'ebayPrice')
                  const price = product.price > 0
                    ? product.price
                    : (product.ebayPrice ? calculateSellingPrice(product.ebayPrice, exchangeRate) : 0);

                  return (
                    <div
                      key={product.id}
                      className="search-result-item"
                      onClick={() => handleResultClick(product.id)}
                    >
                      <img src={product.image} alt={product.name} />
                      <div className="result-info">
                        <h4>{product.name}</h4>
                        <p>{formatCurrency(price)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : searchQuery.length > 0 ? (
              <div className="no-results">
                <p>No encontramos resultados para "{searchQuery}"</p>
              </div>
            ) : (
              <div className="search-suggestions">
                <p>Enlaces rápidos</p>
                <ul>
                  <li onClick={() => { closeSearch(); navigate('/products'); }}>Ver todos los productos</li>
                  <li onClick={() => { closeSearch(); navigate('/products?brand=Apple'); }}>iPhone 15 Pro</li>
                  <li onClick={() => { closeSearch(); navigate('/products?brand=Google'); }}>Google Pixel</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
