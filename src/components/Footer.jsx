import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-top">
                    <div className="footer-col brand-col">
                        <h3>WueniPixel</h3>
                        <p>Tecnología que inspira. Llevamos a tus manos los dispositivos más avanzados con una experiencia de compra inigualable.</p>
                        <div className="social-links">
                            <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
                            <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                            <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
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
                        <h4>Ayuda</h4>
                        <ul>
                            <li><Link to="/help/order-status">Estado de mi pedido</Link></li>
                            <li><Link to="/help/shipping">Envíos y entregas</Link></li>
                            <li><Link to="/help/returns">Devoluciones</Link></li>
                            <li><Link to="/help/contact">Contacto</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col newsletter-col">
                        <h4>Mantente al día</h4>
                        <p>Suscríbete para recibir lanzamientos y ofertas exclusivas.</p>
                        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                            <div className="input-group">
                                <Mail size={16} className="input-icon" />
                                <input type="email" placeholder="Tu correo electrónico" required />
                                <button type="submit">→</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="legal-links">
                        <Link to="/legal/privacy">Privacidad</Link>
                        <span>|</span>
                        <Link to="/legal/terms">Términos de Uso</Link>
                        <span>|</span>
                        <Link to="/legal/sitemap">Mapa del Sitio</Link>
                    </div>
                    <p>&copy; {new Date().getFullYear()} WueniPixel. Diseñado con precisión.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
