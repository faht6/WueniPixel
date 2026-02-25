import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, Smartphone, Building2 } from 'lucide-react';
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
                        <Link to="/" className="footer-logo-link">
                            <img src="/images/wuenipixel-logo.jpg" alt="WueniPixel" className="footer-logo-img" />
                        </Link>
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

                {/* ── Payment Methods ── */}
                <div className="footer-payment-strip">
                    <p className="payment-title">Aceptamos todos los medios de pago</p>
                    <div className="payment-logos">
                        {/* Visa */}
                        <div className="payment-logo-card" title="Visa">
                            <svg viewBox="0 0 780 500" width="48" height="30">
                                <rect width="780" height="500" rx="40" fill="#1A1F71" />
                                <path d="M293.2 348.7l33.4-195.7h53.4l-33.4 195.7H293.2zM570.1 158.2c-10.6-4-27.2-8.3-47.9-8.3-52.8 0-90 26.6-90.2 64.6-.3 28.1 26.5 43.8 46.8 53.2 20.8 9.6 27.8 15.7 27.7 24.3-.1 13.1-16.6 19.1-32 19.1-21.4 0-32.7-3-50.3-10.2l-6.9-3.1-7.5 43.8c12.5 5.5 35.6 10.2 59.6 10.5 56.2 0 92.6-26.3 93-66.8.2-22.3-14-39.2-44.8-53.2-18.7-9.1-30.1-15.1-30-24.3 0-8.1 9.7-16.8 30.6-16.8 17.5-.3 30.1 3.5 40 7.5l4.8 2.3 7.3-42.6h-.2zM651.1 153h-41.3c-12.8 0-22.4 3.5-28 16.3l-79.5 179.4H559s9.2-24.1 11.2-29.4h68.6c1.6 6.9 6.5 29.4 6.5 29.4h49.7L651.1 153zm-66.3 126.3c4.4-11.3 21.4-54.8 21.4-54.8-.3.5 4.4-11.4 7.1-18.8l3.6 17s10.3 47 12.5 56.6h-44.6zM231.5 153L179.2 284l-5.6-27.1c-9.7-31.2-39.9-65.1-73.7-82l47.9 171.8h56.6l84.1-193.7h-57z" fill="#fff" />
                                <path d="M146.9 153H62.4l-.7 4c67.2 16.2 111.7 55.4 130.1 102.5L173.7 170c-3.2-12.4-12.6-16.3-26.8-17z" fill="#F9A533" />
                            </svg>
                        </div>

                        {/* Mastercard */}
                        <div className="payment-logo-card" title="Mastercard">
                            <svg viewBox="0 0 780 500" width="48" height="30">
                                <rect width="780" height="500" rx="40" fill="#16366F" />
                                <circle cx="312" cy="250" r="148" fill="#D9222A" />
                                <circle cx="468" cy="250" r="148" fill="#EE9F2D" />
                                <path d="M390 130.7c-39.1 30.9-64.2 79.2-64.2 133.3s25.1 102.4 64.2 133.3c39.1-30.9 64.2-79.2 64.2-133.3S429.1 161.6 390 130.7z" fill="#EB6F20" />
                            </svg>
                        </div>

                        {/* American Express */}
                        <div className="payment-logo-card" title="American Express">
                            <svg viewBox="0 0 780 500" width="48" height="30">
                                <rect width="780" height="500" rx="40" fill="#2E77BB" />
                                <text x="390" y="285" textAnchor="middle" fill="#fff" fontFamily="Arial,Helvetica,sans-serif" fontSize="160" fontWeight="bold">AMEX</text>
                            </svg>
                        </div>

                        {/* Separator */}
                        <span className="payment-divider" />

                        {/* Yape */}
                        <div className="payment-logo-card payment-text-badge" title="Yape" style={{ background: '#742284' }}>
                            <span style={{ color: '#fff', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.01em' }}>Yape</span>
                        </div>

                        {/* Plin */}
                        <div className="payment-logo-card payment-text-badge" title="Plin" style={{ background: '#00D26A' }}>
                            <span style={{ color: '#fff', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.01em' }}>Plin</span>
                        </div>

                        {/* Transferencia */}
                        <div className="payment-logo-card payment-text-badge" title="Transferencia Bancaria" style={{ background: 'var(--color-surface-secondary)', border: '1px solid var(--color-border-subtle)' }}>
                            <Building2 size={14} style={{ color: 'var(--color-text-secondary)' }} />
                            <span style={{ color: 'var(--color-text-secondary)', fontWeight: 600, fontSize: '0.7rem' }}>Transferencia</span>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="legal-links">
                        <span>San Vicente de Cañete, Lima</span>
                        <span>|</span>
                        <a href="https://wa.me/51941126123" target="_blank" rel="noopener noreferrer">WhatsApp: 941 126 123</a>
                    </div>
                    <p>&copy; 2026 WueniPixel | <span style={{ opacity: 0.6, fontSize: '0.85em' }}>v12.5.5</span></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
