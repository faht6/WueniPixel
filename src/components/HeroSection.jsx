import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './HeroSection.css';

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.18,
            delayChildren: 0.3,
        }
    }
};

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
    }
};

const fadeRight = {
    hidden: { opacity: 0, x: 60, scale: 0.96 },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.25 }
    }
};

const bounceIn = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }
    }
};

const HeroSection = () => {
    return (
        <section className="hero-section">
            {/* Background Layers */}
            <div className="hero-bg" />
            <div className="hero-grid-pattern" />

            {/* Animated Blur Shapes */}
            <motion.div
                className="blur-shape blur-shape-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 0.4 }}
            />
            <motion.div
                className="blur-shape blur-shape-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 0.7 }}
            />
            <motion.div
                className="blur-shape blur-shape-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 1 }}
            />

            {/* Main Content */}
            <div className="hero-content">
                {/* ── Text Block (Left 50%) ── */}
                <motion.div
                    className="hero-text"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Badge */}
                    <motion.div className="hero-eyebrow" variants={bounceIn}>
                        <span className="hero-eyebrow-dot" />
                        NUEVO EN WUENIPIXEL
                    </motion.div>

                    {/* Title with gradient accent on "17" */}
                    <motion.h1 className="hero-title" variants={fadeUp}>
                        iPhone <span className="hero-title-accent">17</span><br />
                        Pro Max
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p className="hero-subtitle" variants={fadeUp}>
                        Titanio. Chip A19 Pro. La cámara más avanzada de Apple.
                        Disponible ahora en Cañete con entrega inmediata.
                    </motion.p>

                    {/* CTA */}
                    <motion.div variants={fadeUp}>
                        <Link to="/catalog?brand=Apple" className="hero-cta">
                            Ver Colección
                            <ArrowRight size={18} className="hero-cta-icon" />
                        </Link>
                    </motion.div>
                </motion.div>

                {/* ── Image Block (Right 50%) ── */}
                <motion.div
                    className="hero-image-block"
                    variants={fadeRight}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="hero-product-container">
                        <div className="hero-product-card">
                            <img
                                src="/products/iphone17promax_cosmicorange.jpg"
                                alt="iPhone 17 Pro Max — Cosmic Orange"
                                className="hero-product-img"
                                loading="eager"
                            />
                        </div>
                        <div className="hero-image-glow" />
                    </div>
                </motion.div>
            </div>

            {/* Bottom Fade */}
            <div className="hero-bottom-fade" />

            {/* Scroll Indicator */}
            <motion.div
                className="hero-scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 1 }}
            >
                <span className="scroll-line" />
            </motion.div>
        </section>
    );
};

export default HeroSection;
