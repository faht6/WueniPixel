import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import './HeroSlider.css';

/* ─── Slide transition variants (fade + slide-up) ─── */
const slideVariants = {
    enter: { opacity: 0, y: 40 },
    center: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: {
        opacity: 0,
        y: -30,
        transition: { duration: 0.4, ease: 'easeIn' },
    },
};

const SLIDE_COUNT = 2;
const AUTO_ADVANCE_MS = 6000;

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const goToSlide = useCallback((index) => {
        if (index === currentSlide) return;
        setCurrentSlide(index);
    }, [currentSlide]);

    const goToNext = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % SLIDE_COUNT);
    }, []);

    /* Auto-advance every 6 seconds (infinite loop) */
    useEffect(() => {
        const timer = setInterval(goToNext, AUTO_ADVANCE_MS);
        return () => clearInterval(timer);
    }, [goToNext]);

    const slides = [
        <IPhone17eSlide key="iphone17e" />,
        <PixelSlide key="pixel" />,
    ];

    return (
        <section className="hero-slider-section" id="hero">
            {/* Animated radial gradient background */}
            <div className="hero-bg-gradient" />
            <div className="hero-bg-particles" />

            {/* Slide Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="hero-slide-wrapper"
                >
                    {slides[currentSlide]}
                </motion.div>
            </AnimatePresence>

            {/* Dot Indicators */}
            <div className="hero-dots">
                {['iPhone 17e', 'Pixel 10a'].map((label, i) => (
                    <button
                        key={i}
                        className={`hero-dot ${currentSlide === i ? 'active' : ''}`}
                        onClick={() => goToSlide(i)}
                        aria-label={`Ir a ${label}`}
                    >
                        <span className="hero-dot-label">{label}</span>
                    </button>
                ))}
            </div>

            {/* Scroll Down */}
            <motion.button
                className="hero-scroll-cta"
                onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.5 }}
            >
                <span>Explorar catálogo</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
            </motion.button>
        </section>
    );
};

/* ═══════════════════════════════════════════════
   SLIDE 1 — iPHONE 17e (PRINCIPAL)
   ═══════════════════════════════════════════════ */
const IPhone17eSlide = () => {
    const specs = [
        { icon: '⚡', text: 'Chip A19 Bionic (3nm) — el más potente de la gama' },
        { icon: '📷', text: 'Cámara 48MP Fusion + Zoom 2x óptico' },
        { icon: '🔋', text: 'Batería 26h + carga 50% en 30 minutos' },
        { icon: '🛡️', text: 'Ceramic Shield 2 — 3x más resistente' },
        { icon: '✨', text: 'Apple Intelligence + iOS 26' },
        { icon: '🔌', text: 'USB-C + 5G + MagSafe' },
    ];

    const whatsappUrl =
        'https://wa.me/51941126123?text=Hola%2C%20quiero%20información%20del%20iPhone%2017e%20que%20vi%20en%20la%20web';

    return (
        <div className="hero-slide hero-slide--iphone17e">
            {/* Left: Text Content */}
            <div className="hero-text-col">
                {/* Badge */}
                <motion.div
                    className="hero-badge hero-badge--red"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <span className="hero-badge-pulse" />
                    NUEVO 2026
                </motion.div>

                {/* Title */}
                <motion.h1
                    className="hero-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                >
                    iPhone <span className="hero-title-accent">17e</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    className="hero-subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                >
                    Lo mejor de Apple al precio más inteligente.
                </motion.p>

                {/* Specs Grid */}
                <motion.ul
                    className="hero-specs"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    {specs.map((spec, i) => (
                        <motion.li
                            key={i}
                            className="hero-spec-item"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.35 + i * 0.08 }}
                        >
                            <span className="hero-spec-icon">{spec.icon}</span>
                            <span className="hero-spec-text">{spec.text}</span>
                        </motion.li>
                    ))}
                </motion.ul>

                {/* Price */}
                <motion.div
                    className="hero-price-block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                >
                    <span className="hero-price">Desde S/ 2,940</span>
                </motion.div>

                {/* Tags */}
                <motion.div
                    className="hero-tags"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    <span className="hero-tag hero-tag--gold">💳 5% descuento pagando por transferencia</span>
                </motion.div>

                {/* CTA */}
                <motion.div
                    className="hero-ctas"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                >
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hero-btn hero-btn--primary">
                        Ver iPhone 17e <ArrowRight size={18} />
                    </a>
                    <a href="/products?brand=Apple" className="hero-btn hero-btn--ghost">
                        Ver colección Apple <ChevronRight size={18} />
                    </a>
                </motion.div>
            </div>

            {/* Right: Product Image */}
            <motion.div
                className="hero-image-col"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            >
                <div className="hero-phone-float">
                    <img
                        src="/products/iphone17e.jpg"
                        alt="iPhone 17e — Nuevo 2026"
                        className="hero-phone-img"
                    />
                    {/* Red glow shadow */}
                    <div className="hero-phone-shadow" />
                    {/* Reflection */}
                    <div className="hero-phone-reflection" />
                </div>
            </motion.div>
        </div>
    );
};

/* ═══════════════════════════════════════════════
   SLIDE 2 — PIXEL 10a
   ═══════════════════════════════════════════════ */
const PixelSlide = () => {
    const whatsappUrl =
        'https://wa.me/51941126123?text=Hola%2C%20quiero%20reservar%20el%20Pixel%2010a%20en%20preventa';

    return (
        <div className="hero-slide hero-slide--pixel">
            {/* Left: Text */}
            <div className="hero-text-col">
                <motion.div
                    className="hero-badge hero-badge--teal"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <span className="hero-badge-pulse hero-badge-pulse--teal" />
                    PREVENTA · 2026
                </motion.div>

                <motion.h1
                    className="hero-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                >
                    <span className="hero-title-pixel">Pixel</span> 10a
                </motion.h1>

                <motion.p
                    className="hero-subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                >
                    La nueva generación Pixel llega a WueniPixel. IA de Google, Night Sight y la mejor cámara por tu presupuesto.
                </motion.p>

                <motion.p
                    className="hero-meta"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                >
                    Entrega estimada: Abril 2026 · Stock limitado en preventa.
                </motion.p>

                <motion.div
                    className="hero-ctas"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.45 }}
                >
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hero-btn hero-btn--primary hero-btn--teal">
                        Reservar Pixel 10a <ArrowRight size={18} />
                    </a>
                    <a href="/products?brand=Google" className="hero-btn hero-btn--ghost">
                        Ver modelos Pixel <ChevronRight size={18} />
                    </a>
                </motion.div>
            </div>

            {/* Right: Image */}
            <motion.div
                className="hero-image-col"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            >
                <div className="hero-phone-float hero-phone-float--pixel">
                    <div className="pixel-card-container">
                        <img
                            src="/images/pixel10a.jpg"
                            alt="Google Pixel 10a — Preventa 2026"
                            className="hero-pixel-img"
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default HeroSlider;
