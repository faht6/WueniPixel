import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, Smartphone, Building2, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import './Footer.css';

// ─── EmailJS Credentials ───
// 1. Crea cuenta en https://www.emailjs.com/
// 2. Añade un "Email Service" (Gmail) → copia el Service ID
// 3. Crea un "Email Template" con variables: {{from_email}}, {{message}}
// 4. Copia tu Public Key de Account → General
const EMAILJS_SERVICE_ID = 'service_wuenipixel';  // ← Reemplaza con tu Service ID
const EMAILJS_TEMPLATE_ID = 'template_newsletter'; // ← Reemplaza con tu Template ID
const EMAILJS_PUBLIC_KEY = 'TU_PUBLIC_KEY_AQUI';   // ← Reemplaza con tu Public Key

const TikTokIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15z" />
    </svg>
);

const Footer = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState('');

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Ingresa un email válido');
            return;
        }

        setSending(true);

        try {
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    from_email: email,
                    to_email: 'wuenipixel@gmail.com',
                    message: `Nueva suscripción al newsletter de WueniPixel: ${email}`
                },
                EMAILJS_PUBLIC_KEY
            );

            setSubscribed(true);
            setEmail('');
            setTimeout(() => setSubscribed(false), 5000);
        } catch (err) {
            setError('Error al suscribir. Intenta de nuevo.');
            console.error('EmailJS error:', err);
        } finally {
            setSending(false);
        }
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
                            <li><a href="/#about" onClick={(e) => { e.preventDefault(); const el = document.getElementById('about'); if (el) { el.scrollIntoView({ behavior: 'smooth' }); } else { window.location.href = '/#about'; } }}>Sobre nosotros</a></li>
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
                                <>
                                    <div className="input-group">
                                        <Mail size={16} className="input-icon" />
                                        <input
                                            type="email"
                                            placeholder="Tu correo electrónico"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            disabled={sending}
                                        />
                                        <button type="submit" disabled={sending}>
                                            {sending ? <Loader2 size={16} className="spin-icon" /> : '→'}
                                        </button>
                                    </div>
                                    {error && <p className="newsletter-error">{error}</p>}
                                </>
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
                            <svg viewBox="0 0 1000 1000" width="48" height="30">
                                <rect width="1000" height="1000" rx="80" fill="#016fd0" />
                                <g transform="translate(-55.5,-1002.3452)">
                                    <path d="m 249.14015,1697.4441 0,-156.6094 165.82027,0 17.79072,23.1924 18.37901,-23.1924 601.88665,0 0,145.8088 c 0,0 -15.7404,10.644 -33.9449,10.8006 l -333.27706,0 -20.05834,-24.6872 0,24.6872 -65.72965,0 0,-42.1418 c 0,0 -8.97877,5.8825 -28.39026,5.8825 l -22.37277,0 0,36.2593 -99.52024,0 -17.7653,-23.6898 -18.03807,23.6898 z" fill="#ffffff" />
                                    <path d="m 55.5,1422.7991 37.393125,-87.1766 64.667505,0 21.22103,48.8328 0,-48.8328 80.38767,0 12.63289,35.2949 12.24716,-35.2949 360.8573,0 0,17.7439 c 0,0 18.96995,-17.7439 50.14586,-17.7439 l 117.08499,0.4092 20.85469,48.1937 0,-48.6029 67.27259,0 18.5154,27.6834 0,-27.6834 67.88977,0 0,156.6093 -67.88977,0 -17.74392,-27.7731 0,27.7731 -98.83835,0 -9.93959,-24.6872 -26.57108,0 -9.77781,24.6872 -67.02872,0 c -26.82589,0 -43.97406,-17.3816 -43.97406,-17.3816 l 0,17.3816 -101.06318,0 -20.05835,-24.6872 0,24.6872 -375.80462,0 -9.93274,-24.6872 -26.48635,0 -9.86254,24.6872 -46.1989,0 z" fill="#ffffff" />
                                    <path d="m 106.12803,1354.9291 -50.435161,117.2641 32.835892,0 9.305914,-23.4816 54.099665,0 9.2577,23.4816 33.55915,0 -50.38695,-117.2641 -38.23621,0 z m 18.66004,27.2909 16.49028,41.0329 -33.02877,0 16.53849,-41.0329 z" fill="#016fd0" />
                                    <path d="m 198.22282,1472.1735 0,-117.2642 46.66163,0.1733 27.13999,75.6045 26.4901,-75.7778 46.28848,0 0,117.2642 -29.31604,0 0,-86.4052 -31.07562,86.4052 -25.71023,0 -31.16227,-86.4052 0,86.4052 z" fill="#016fd0" />
                                    <path d="m 364.86136,1472.1735 0,-117.2642 95.66287,0 0,26.2302 -66.03824,0 0,20.0583 64.49529,0 0,24.6872 -64.49529,0 0,20.8298 66.03824,0 0,25.4587 z" fill="#016fd0" />
                                    <path d="m 477.49667,1354.9291 0,117.2641 29.31604,0 0,-41.6596 12.34359,0 35.15032,41.6596 35.82536,0 -38.57374,-43.2025 c 15.8309,-1.3359 32.16085,-14.9233 32.16085,-36.0182 0,-24.6765 -19.36827,-38.0434 -40.98459,-38.0434 l -65.23783,0 z m 29.31604,26.2301 33.51093,0 c 8.03881,0 13.88655,6.2882 13.88655,12.3436 0,7.7905 -7.57673,12.3436 -13.45259,12.3436 l -33.94489,0 0,-24.6872 z" fill="#016fd0" />
                                    <path d="m 625.61982,1472.1735 -29.93322,0 0,-117.2642 29.93322,0 z" fill="#016fd0" />
                                    <path d="m 696.59549,1472.1735 -6.4611,0 c -31.26172,0 -50.24229,-24.6292 -50.24229,-58.1499 0,-34.3488 18.76806,-59.1143 58.24634,-59.1143 l 32.40194,0 0,27.7731 -33.58657,0 c -16.026,0 -27.35994,12.5067 -27.35994,31.6305 0,22.7096 12.95987,32.2476 31.63047,32.2476 l 7.71474,0 z" fill="#016fd0" />
                                    <path d="m 760.3868,1354.9291 -50.43515,117.2641 32.83589,0 9.30591,-23.4816 54.09967,0 9.25769,23.4816 33.55915,0 -50.38694,-117.2641 -38.23622,0 z m 18.66005,27.2909 16.49027,41.0329 -33.02876,0 16.53849,-41.0329 z" fill="#016fd0" />
                                    <path d="m 852.43338,1472.1735 0,-117.2642 37.27187,0 47.59035,73.6759 0,-73.6759 29.31604,0 0,117.2642 -36.06644,0 -48.79578,-75.6045 0,75.6045 z" fill="#016fd0" />
                                    <path d="m 269.1985,1677.3858 0,-117.2642 95.66286,0 0,26.2302 -66.03823,0 0,20.0583 64.49528,0 0,24.6872 -64.49528,0 0,20.8298 66.03823,0 0,25.4587 z" fill="#016fd0" />
                                    <path d="m 737.94653,1677.3858 0,-117.2642 95.66287,0 0,26.2302 -66.03824,0 0,20.0583 64.1867,0 0,24.6872 -64.1867,0 0,20.8298 66.03824,0 0,25.4587 z" fill="#016fd0" />
                                    <path d="m 368.57408,1677.3858 46.57779,-57.9089 -47.68678,-59.3553 36.93435,0 28.39991,36.6932 28.49635,-36.6932 35.48784,0 -47.05996,58.6321 46.66353,58.6321 -36.92851,0 -27.57537,-36.1148 -26.90518,36.1148 z" fill="#016fd0" />
                                    <path d="m 499.86944,1560.1414 0,117.2641 30.08751,0 0,-37.0308 30.85899,0 c 26.11107,0 45.90274,-13.8524 45.90274,-40.7917 0,-22.3164 -15.52271,-39.4416 -42.09358,-39.4416 l -64.75566,0 z m 30.08751,26.5194 32.49837,0 c 8.43546,0 14.46515,5.1701 14.46515,13.5008 0,7.8262 -5.99925,13.5008 -14.56158,13.5008 l -32.40194,0 0,-27.0016 z" fill="#016fd0" />
                                    <path d="m 619.44802,1560.1216 0,117.2642 29.31604,0 0,-41.6597 12.34359,0 35.15032,41.6597 35.82536,0 -38.57374,-43.2026 c 15.83089,-1.3361 32.16085,-14.9233 32.16085,-36.0183 0,-24.6764 -19.36827,-38.0433 -40.98459,-38.0433 l -65.23783,0 z m 29.31604,26.2302 33.51093,0 c 8.03881,0 13.88654,6.2881 13.88654,12.3435 0,7.7906 -7.57673,12.3436 -13.45259,12.3436 l -33.94488,0 0,-24.6871 z" fill="#016fd0" />
                                    <path d="m 847.18735,1677.3858 0,-25.4587 58.67066,0 c 8.68115,0 12.44003,-4.6912 12.44003,-9.8363 0,-4.9296 -3.74703,-9.9134 -12.44003,-9.9134 l -26.5126,0 c -23.04571,0 -35.88042,-14.0409 -35.88042,-35.1214 0,-18.8023 11.75348,-36.9344 45.99918,-36.9344 l 57.08913,0 -12.3436,26.3844 -49.37438,0 c -9.43821,0 -12.3436,4.9526 -12.3436,9.6821 0,4.8612 3.59036,10.222 10.80065,10.222 l 27.77309,0 c 25.69029,0 36.83792,14.5724 36.83792,33.6556 0,20.5163 -12.42212,37.3201 -38.23646,37.3201 z" fill="#016fd0" />
                                    <path d="m 954.78398,1677.3858 0,-25.4587 58.67062,0 c 8.6812,0 12.4401,-4.6912 12.4401,-9.8363 0,-4.9296 -3.7471,-9.9134 -12.4401,-9.9134 l -26.51256,0 c -23.04571,0 -35.88043,-14.0409 -35.88043,-35.1214 0,-18.8023 11.75348,-36.9344 45.99918,-36.9344 l 57.08911,0 -12.3436,26.3844 -49.37436,0 c -9.4382,0 -12.34359,4.9526 -12.34359,9.6821 0,4.8612 3.59035,10.222 10.80064,10.222 l 27.77311,0 c 25.6903,0 36.8379,14.5724 36.8379,33.6556 0,20.5163 -12.4221,37.3201 -38.2365,37.3201 z" fill="#016fd0" />
                                </g>
                            </svg>
                        </div>

                        {/* Separator */}
                        <span className="payment-divider" />

                        {/* Yape */}
                        <div className="payment-logo-card" title="Yape">
                            <img src="/images/logo_yape.png" alt="Yape" className="payment-brand-logo" />
                        </div>

                        {/* Plin */}
                        <div className="payment-logo-card" title="Plin">
                            <img src="/images/logo_plin.jpg" alt="Plin" className="payment-brand-logo" />
                        </div>

                        {/* Transferencia */}
                        <div className="payment-logo-card payment-text-badge" title="Transferencia Bancaria" style={{ background: 'var(--color-surface-secondary)', border: '1px solid var(--color-border-subtle)' }}>
                            <Building2 size={14} style={{ color: 'var(--color-text-secondary)' }} />
                            <span style={{ color: 'var(--color-text-secondary)', fontWeight: 600, fontSize: '0.7rem' }}>Transferencia</span>
                        </div>
                    </div>
                </div>

                {/* ── Newsletter Banner ── */}
                <div className="newsletter-banner">
                    <div className="newsletter-banner-content">
                        <h3 className="newsletter-banner-title">Ofertas exclusivas en tu email</h3>
                        <p className="newsletter-banner-subtitle">
                            Recibe alertas de nuevos iPhones y Pixels, preventas y ofertas limitadas en Cañete.
                        </p>
                        <form className="newsletter-banner-form" onSubmit={handleNewsletterSubmit}>
                            {subscribed ? (
                                <div className="newsletter-banner-success">
                                    ✅ ¡Gracias! Te mantendremos informado.
                                </div>
                            ) : (
                                <>
                                    <input
                                        type="email"
                                        placeholder="tuemail@ejemplo.com"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={sending}
                                        className="newsletter-banner-input"
                                    />
                                    <button type="submit" className="newsletter-banner-btn" disabled={sending}>
                                        {sending ? 'Enviando...' : 'Suscríbete'}
                                    </button>
                                </>
                            )}
                        </form>
                        {error && <p className="newsletter-error" style={{ color: '#ff6b6b', fontSize: '13px', marginTop: '8px' }}>{error}</p>}
                        <p className="newsletter-banner-guarantee">Sin spam. Solo ofertas reales. Puedes cancelar cuando quieras.</p>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="legal-links">
                        <span>San Vicente de Cañete, Lima</span>
                        <span>|</span>
                        <a href="https://wa.me/51941126123" target="_blank" rel="noopener noreferrer">WhatsApp: 941 126 123</a>
                    </div>
                    <p>&copy; 2026 WueniPixel | <span style={{ opacity: 0.6, fontSize: '0.85em' }}>v12.6.0</span></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
