import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import './HeroSection.css';

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay }
    }
});

const bounceIn = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay: 0.05 }
    }
};

const phoneSlide = (delay = 0, yStart = 80) => ({
    hidden: { opacity: 0, y: yStart, scale: 0.92 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay }
    }
});

const HeroSection = () => {
    return (
        <section className="hero-section">
            {/* BG layers */}
            <div className="hero-bg" />
            <div className="hero-orb hero-orb-1" />
            <div className="hero-orb hero-orb-2" />

            {/* ── Centered Text ── */}
            <div className="hero-content">
                <motion.div
                    className="hero-badge"
                    variants={bounceIn}
                    initial="hidden"
                    animate="visible"
                >
                    <span className="hero-badge-dot" />
                    NUEVO EN WUENIPIXEL
                </motion.div>

                <motion.h1
                    className="hero-title"
                    variants={fadeUp(0.12)}
                    initial="hidden"
                    animate="visible"
                >
                    iPhone <span className="hero-accent">17</span> Pro Max
                </motion.h1>

                <motion.p
                    className="hero-subtitle"
                    variants={fadeUp(0.25)}
                    initial="hidden"
                    animate="visible"
                >
                    Titanio. Chip A19 Pro. La cámara más avanzada jamás creada.
                    <br className="hero-br-desktop" />
                    Disponible ahora en Cañete con entrega inmediata.
                </motion.p>

                <motion.div
                    className="hero-ctas"
                    variants={fadeUp(0.4)}
                    initial="hidden"
                    animate="visible"
                >
                    <Link to="/catalog?brand=Apple" className="hero-cta-primary">
                        <span>Ver Colección</span>
                        <ArrowRight size={16} className="cta-icon" />
                    </Link>
                    <Link to="/catalog" className="hero-cta-outline">
                        <span>Explorar Todo</span>
                        <ChevronRight size={16} className="cta-icon" />
                    </Link>
                </motion.div>
            </div>

            {/* ── Phone Composition ── */}
            <div className="hero-phones">
                {/* Glow behind center phone */}
                <div className="hero-center-glow" />

                {/* Left — Cosmic Orange */}
                <motion.div
                    className="hero-phone hero-phone-side hero-phone-left"
                    variants={phoneSlide(0.5, 100)}
                    initial="hidden"
                    animate="visible"
                >
                    <img
                        src="/products/iphone17promax_cosmicorange.jpg"
                        alt="iPhone 17 Pro Max — Cosmic Orange"
                        loading="eager"
                    />
                </motion.div>

                {/* Center — Deep Blue (10% bigger) */}
                <motion.div
                    className="hero-phone hero-phone-center"
                    variants={phoneSlide(0.6, 120)}
                    initial="hidden"
                    animate="visible"
                >
                    <img
                        src="/products/iphone17promax_deepblue.jpg"
                        alt="iPhone 17 Pro Max — Deep Blue"
                        loading="eager"
                    />
                </motion.div>

                {/* Right — Silver */}
                <motion.div
                    className="hero-phone hero-phone-side hero-phone-right"
                    variants={phoneSlide(0.7, 100)}
                    initial="hidden"
                    animate="visible"
                >
                    <img
                        src="/products/iphone17promax_silver.jpg"
                        alt="iPhone 17 Pro Max — Silver"
                        loading="eager"
                    />
                </motion.div>
            </div>

            {/* Bottom fade */}
            <div className="hero-fade" />
        </section>
    );
};

export default HeroSection;
