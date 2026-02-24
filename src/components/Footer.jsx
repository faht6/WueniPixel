import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, Smartphone } from 'lucide-react';
import './Footer.css';

const TikTokIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15z" />
    </svg>
);

const Footer = () => {
    const [subscribed, setSubscribed] = useState(false);

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        setSubscribed(true);
        setTimeout(() => setSubscribed(false), 4000);
    };

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-top">
                    <div className="footer-col brand-col">
                        <h3>WueniPixel</h3>
                        <p>Tecnología sin límites. Creamos el puente entre las mejores innovaciones y tu día a día con total confianza.</p>
                        <div className="social-links">
                            <a href="https://www.facebook.com/profile.php?id=61574088498219" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                            </a>
                            <a href="https://instagram.com/wuenipixel" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={20} /></a>
                            <a href="https://tiktok.com/@wuenipixel" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><TikTokIcon /></a>
                        </div>
                    </div>

                    <div className="footer-col">
                        <h4>Tienda</h4>
                        <ul>
                            <li><Link to="/products?brand=Apple">iPhone</Link></li>
                            <li><Link to="/products?brand=Google">Pixel</Link></li>
                            <li><Link to="/products">Todos los productos</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Información</h4>
                        <ul>
                            <li><a href="https://wa.me/51941126123?text=Hola%20WueniPixel%2C%20quiero%20consultar%20el%20estado%20de%20mi%20pedido." target="_blank" rel="noopener noreferrer">Estado de mi pedido</a></li>
                            <li><Link to="/#about">Sobre nosotros</Link></li>
                            <li><a href="https://wa.me/51941126123?text=Hola%20WueniPixel%2C%20tengo%20una%20consulta." target="_blank" rel="noopener noreferrer">Contacto WhatsApp</a></li>
                        </ul>
                    </div>

                    <div className="footer-col newsletter-col">
                        <h4>Mantente al día</h4>
                        <p>Suscríbete para recibir lanzamientos y ofertas exclusivas.</p>
                        <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                            {subscribed ? (
                                <div className="newsletter-success">
                                    ✅ ¡Gracias! Te mantendremos informado.
                                </div>
                            ) : (
                                <div className="input-group">
                                    <Mail size={16} className="input-icon" />
                                    <input type="email" placeholder="Tu correo electrónico" required />
                                    <button type="submit">→</button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="legal-links">
                        <span>San Vicente de Cañete, Lima</span>
                        <span>|</span>
                        <a href="https://wa.me/51941126123" target="_blank" rel="noopener noreferrer">WhatsApp: 941 126 123</a>
                    </div>
                    <p>&copy; 2026 WueniPixel | <span style={{ opacity: 0.6, fontSize: '0.85em' }}>v12.4.0</span></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
