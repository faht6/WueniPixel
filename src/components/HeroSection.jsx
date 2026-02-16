import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './HeroSection.css';

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay }
    }
});

const scaleIn = (delay = 0) => ({
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay }
    }
});

const HeroSection = () => {
    return (
        <section className="hero-section">
            {/* Clean Background */}
            <div className="hero-bg" />

            {/* ── Centered Text Block ── */}
            <div className="hero-text-area">
                <motion.h1
                    className="hero-title"
                    variants={fadeUp(0.1)}
                    initial="hidden"
                    animate="visible"
                >
                    iPhone <span className="hero-title-accent">17</span>
                </motion.h1>

                <motion.p
                    className="hero-subtitle"
                    variants={fadeUp(0.25)}
                    initial="hidden"
                    animate="visible"
                >
                    Conoce la nueva generación de iPhone en WueniPixel.
                </motion.p>

                <motion.div
                    className="hero-buttons"
                    variants={fadeUp(0.4)}
                    initial="hidden"
                    animate="visible"
                >
                    <Link to="/catalog?brand=Apple" className="hero-btn-primary">
                        Ver Colección
                        <ArrowRight size={16} className="hero-btn-icon" />
                    </Link>
                    <Link to="/catalog" className="hero-btn-secondary">
                        Explorar Todo
                    </Link>
                </motion.div>
            </div>

            {/* ── Multi-Phone Composition ── */}
            <div className="hero-phones-area">
                <motion.div
                    className="hero-phones-row"
                    variants={scaleIn(0.5)}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="hero-phone hero-phone-left">
                        <img
                            src="/products/iphone17promax_deepblue.jpg"
                            alt="iPhone 17 Pro Max — Deep Blue"
                            loading="eager"
                        />
                    </div>
                    <div className="hero-phone hero-phone-center">
                        <img
                            src="/products/iphone17promax_cosmicorange.jpg"
                            alt="iPhone 17 Pro Max — Cosmic Orange"
                            loading="eager"
                        />
                    </div>
                    <div className="hero-phone hero-phone-right">
                        <img
                            src="/products/iphone17_lavanda.jpg"
                            alt="iPhone 17 — Lavanda"
                            loading="eager"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
