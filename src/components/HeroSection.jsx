import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import './HeroSection.css';

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay }
    }
});

const phoneSlide = (delay = 0, xStart = 0, rotateStart = 0) => ({
    hidden: { opacity: 0, y: 100, x: xStart, rotate: rotateStart + 5 },
    visible: {
        opacity: 1,
        y: 0,
        x: 0,
        rotate: rotateStart,
        transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay }
    }
});

const HeroSection = () => {
    return (
        <section className="hero-section">
            {/* Background */}
            <div className="hero-bg" />
            <div className="hero-composition-glow" />

            {/* ── Text ── */}
            <div className="hero-text-area">
                <motion.p
                    className="hero-eyebrow"
                    variants={fadeUp(0.05)}
                    initial="hidden"
                    animate="visible"
                >
                    WueniPixel · Boutique Tecnológica
                </motion.p>

                <motion.h1
                    className="hero-title"
                    variants={fadeUp(0.15)}
                    initial="hidden"
                    animate="visible"
                >
                    iPhone <span className="hero-title-accent">17</span>
                </motion.h1>

                <motion.p
                    className="hero-subtitle"
                    variants={fadeUp(0.3)}
                    initial="hidden"
                    animate="visible"
                >
                    Conoce la nueva generación de iPhone. Disponible ahora en Cañete.
                </motion.p>

                <motion.div
                    className="hero-buttons"
                    variants={fadeUp(0.45)}
                    initial="hidden"
                    animate="visible"
                >
                    <Link to="/catalog?brand=Apple" className="hero-btn-primary">
                        Ver Colección
                        <ArrowRight size={16} className="hero-btn-icon" />
                    </Link>
                    <Link to="/catalog" className="hero-btn-secondary">
                        Explorar Todo
                        <ChevronRight size={16} />
                    </Link>
                </motion.div>
            </div>

            {/* ── Phone Composition ── */}
            <div className="hero-phones-area">
                <div className="hero-phones-row">
                    {/* Left — Deep Blue, tilted left */}
                    <motion.div
                        className="hero-phone hero-phone-left"
                        variants={phoneSlide(0.5, -40, -5)}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ y: -10, scale: 1.03, rotate: -2, transition: { duration: 0.35 } }}
                    >
                        <img
                            src="/products/iphone17promax_deepblue.jpg"
                            alt="iPhone 17 Pro Max — Deep Blue"
                            loading="eager"
                        />
                        <div className="phone-shine" />
                    </motion.div>

                    {/* Center — Cosmic Orange, dominant */}
                    <motion.div
                        className="hero-phone hero-phone-center"
                        variants={phoneSlide(0.6, 0, 0)}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ y: -14, scale: 1.04, transition: { duration: 0.35 } }}
                    >
                        <img
                            src="/products/iphone17promax_cosmicorange.jpg"
                            alt="iPhone 17 Pro Max — Cosmic Orange"
                            loading="eager"
                        />
                        <div className="phone-shine" />
                    </motion.div>

                    {/* Right — Lavanda, tilted right */}
                    <motion.div
                        className="hero-phone hero-phone-right"
                        variants={phoneSlide(0.7, 40, 5)}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ y: -10, scale: 1.03, rotate: 2, transition: { duration: 0.35 } }}
                    >
                        <img
                            src="/products/iphone17_lavanda.jpg"
                            alt="iPhone 17 — Lavanda"
                            loading="eager"
                        />
                        <div className="phone-shine" />
                    </motion.div>
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="hero-bottom-fade" />
        </section>
    );
};

export default HeroSection;
