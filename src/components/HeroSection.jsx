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

const phoneReveal = (delay = 0, x = 0) => ({
    hidden: { opacity: 0, y: 80, x, scale: 0.92 },
    visible: {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay }
    }
});

const HeroSection = () => {
    return (
        <section className="hero-section">
            {/* Background */}
            <div className="hero-bg" />

            {/* Subtle glow behind phone area */}
            <div className="hero-composition-glow" />

            {/* ── Centered Text ── */}
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
                {/* Phone 1: Deep Blue — left, tilted */}
                <motion.div
                    className="hero-phone hero-phone-left"
                    variants={phoneReveal(0.5, -30)}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ y: -12, scale: 1.03, transition: { duration: 0.35 } }}
                >
                    <img
                        src="/products/iphone17promax_deepblue.jpg"
                        alt="iPhone 17 Pro Max — Deep Blue"
                        loading="eager"
                    />
                    <div className="phone-shine" />
                </motion.div>

                {/* Phone 2: Cosmic Orange — center, dominant */}
                <motion.div
                    className="hero-phone hero-phone-center"
                    variants={phoneReveal(0.6, 0)}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ y: -16, scale: 1.04, transition: { duration: 0.35 } }}
                >
                    <img
                        src="/products/iphone17promax_cosmicorange.jpg"
                        alt="iPhone 17 Pro Max — Cosmic Orange"
                        loading="eager"
                    />
                    <div className="phone-shine" />
                </motion.div>

                {/* Phone 3: Lavanda — right, tilted */}
                <motion.div
                    className="hero-phone hero-phone-right"
                    variants={phoneReveal(0.7, 30)}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ y: -12, scale: 1.03, transition: { duration: 0.35 } }}
                >
                    <img
                        src="/products/iphone17_lavanda.jpg"
                        alt="iPhone 17 — Lavanda"
                        loading="eager"
                    />
                    <div className="phone-shine" />
                </motion.div>
            </div>

            {/* Bottom gradient fade */}
            <div className="hero-bottom-fade" />
        </section>
    );
};

export default HeroSection;
