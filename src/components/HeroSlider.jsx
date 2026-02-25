import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';
import './HeroSlider.css';

/* ─── Slide transition variants ─── */
const slideVariants = {
    enter: (dir) => ({
        opacity: 0,
        x: dir === 1 ? 60 : -60,
    }),
    center: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.45, ease: 'easeOut' },
    },
    exit: (dir) => ({
        opacity: 0,
        x: dir === 1 ? -60 : 60,
        transition: { duration: 0.3, ease: 'easeIn' },
    }),
};

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut', delay },
    },
});

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0); // 0 = Pixel, 1 = iPhone
    const [direction, setDirection] = useState(1);

    const goToNext = () => {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % 2);
    };

    const goToPrev = () => {
        setDirection(-1);
        setCurrentSlide((prev) => (prev - 1 + 2) % 2);
    };

    const goToSlide = (index) => {
        if (index === currentSlide) return;
        setDirection(index > currentSlide ? 1 : -1);
        setCurrentSlide(index);
    };

    return (
        <section className="hero-slider-section">
            {/* ── Arrow Controls ── */}
            <button className="slider-arrow slider-arrow-left" onClick={goToPrev} aria-label="Slide anterior">
                <ChevronLeft size={22} />
            </button>
            <button className="slider-arrow slider-arrow-right" onClick={goToNext} aria-label="Siguiente slide">
                <ChevronRight size={22} />
            </button>

            {/* ── Slide Content ── */}
            <AnimatePresence mode="wait" custom={direction}>
                {currentSlide === 0 ? (
                    <motion.div
                        key="pixel"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                    >
                        <PixelSlide />
                    </motion.div>
                ) : (
                    <motion.div
                        key="iphone"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                    >
                        <IPhoneSlide />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Bottom Indicators ── */}
            <div className="slider-indicators">
                <p className="slider-hint">Desliza para cambiar de modelo</p>
                <div className="slider-pills">
                    <button
                        className={`slider-pill ${currentSlide === 0 ? 'active' : ''}`}
                        onClick={() => goToSlide(0)}
                    >
                        Pixel 10a
                    </button>
                    <button
                        className={`slider-pill ${currentSlide === 1 ? 'active' : ''}`}
                        onClick={() => goToSlide(1)}
                    >
                        iPhone 17 Pro Max
                    </button>
                </div>
            </div>
        </section>
    );
};

/* ═══════════════════════════════════════════════
   SLIDE 1 — PIXEL 10a (PRE-VENTA)
   ═══════════════════════════════════════════════ */
const PixelSlide = () => {
    const whatsappUrl =
        'https://wa.me/51941126123?text=Hola%2C%20quiero%20reservar%20el%20Pixel%2010a%20en%20preventa';

    return (
        <div className="slide-content">
            {/* Badge */}
            <motion.div
                className="pixel-badge"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <span className="pixel-badge-dot" />
                NUEVO · PREVENTA
            </motion.div>

            {/* Title */}
            <motion.h1
                className="slide-title"
                variants={fadeUp(0.1)}
                initial="hidden"
                animate="visible"
            >
                <span className="pixel-gradient-text">Pixel</span> 10a
            </motion.h1>

            {/* Subtitles */}
            <motion.div
                className="slide-subtitles"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            >
                <p>La nueva generación Pixel llega a WueniPixel.</p>
                <p>IA de Google, Night Sight y la mejor cámara por tu presupuesto.</p>
            </motion.div>

            {/* Meta */}
            <motion.p
                className="slide-meta"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.25 }}
            >
                Entrega estimada: Abril 2026 · Stock limitado en preventa.
            </motion.p>

            {/* Buttons */}
            <motion.div
                className="slide-ctas"
                variants={fadeUp(0.3)}
                initial="hidden"
                animate="visible"
            >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary-v11">
                    Reservar Pixel 10a <ArrowRight size={18} />
                </a>
                <a href="/products?brand=Google" className="btn-secondary-v11">
                    Ver modelos Pixel <ChevronRight size={18} />
                </a>
            </motion.div>

            {/* Hero Image */}
            <motion.div
                className="pixel-image-wrapper"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
            >
                <div className="pixel-image-float">
                    <div className="pixel-image-container">
                        <img
                            src="/images/pixel10a.jpg"
                            alt="Google Pixel 10a — 4 colores"
                            className="pixel-hero-img"
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

/* ═══════════════════════════════════════════════
   SLIDE 2 — iPHONE 17 PRO MAX
   ═══════════════════════════════════════════════ */
const IPhoneSlide = () => {
    return (
        <div className="slide-content">
            {/* Badge */}
            <motion.div
                className="hero-badge-v11"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <span className="pulse-dot-red" />
                NUEVO EN WUENIPIXEL
            </motion.div>

            {/* Title */}
            <motion.h1
                className="slide-title"
                variants={fadeUp(0.1)}
                initial="hidden"
                animate="visible"
            >
                iPhone <span className="text-wine-v11">17</span> Pro Max
            </motion.h1>

            {/* Subtitles */}
            <motion.div
                className="slide-subtitles"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            >
                <p>Titanio. Chip A19 Pro. La cámara más avanzada jamás creada.</p>
                <p>Directo desde USA con entrega programada (2 a 3 semanas).</p>
            </motion.div>

            {/* Buttons */}
            <motion.div
                className="slide-ctas"
                variants={fadeUp(0.3)}
                initial="hidden"
                animate="visible"
            >
                <a href="/products?brand=Apple" className="btn-primary-v11">
                    Ver Colección <ArrowRight size={18} />
                </a>
                <a href="/products" className="btn-secondary-v11">
                    Explorar Todo <ChevronRight size={18} />
                </a>
            </motion.div>

            {/* iPhone Triple Layout */}
            <div className="iphone-phones-layout">
                <motion.div
                    className="iphone-phone-wrap iphone-phone-left"
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                >
                    <img
                        src="/products/iphone17promax_cosmicorange.jpg"
                        alt="iPhone 17 Pro Max Orange"
                        className="iphone-phone-img iphone-side"
                    />
                </motion.div>

                <motion.div
                    className="iphone-phone-wrap iphone-phone-center"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                >
                    <img
                        src="/products/iphone17promax_deepblue.jpg"
                        alt="iPhone 17 Pro Max Blue"
                        className="iphone-phone-img iphone-hero"
                    />
                </motion.div>

                <motion.div
                    className="iphone-phone-wrap iphone-phone-right"
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                >
                    <img
                        src="/products/iphone17promax_silver.jpg"
                        alt="iPhone 17 Pro Max Silver"
                        className="iphone-phone-img iphone-side"
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default HeroSlider;
