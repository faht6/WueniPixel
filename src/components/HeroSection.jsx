import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import './HeroSection.css';

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay }
    }
});

const phoneReveal = (delay = 0, xStart = 0, rotStart = 0) => ({
    hidden: { opacity: 0, y: 70, x: xStart, rotate: rotStart + 8, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        x: 0,
        rotate: rotStart,
        scale: 1,
        transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay }
    }
});

const bounceIn = {
    hidden: { opacity: 0, scale: 0.5, y: 10 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay: 0.1 }
    }
};

const HeroSection = () => {
    return (
        <section className="hero-section">
            {/* Background */}
            <div className="hero-bg" />

            {/* Brand accent blurs */}
            <div className="hero-accent hero-accent-1" />
            <div className="hero-accent hero-accent-2" />

            {/* Main Content — Asymmetric */}
            <div className="hero-layout">
                {/* ── Left: Text (35%) ── */}
                <div className="hero-text-col">
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
                        variants={fadeUp(0.15)}
                        initial="hidden"
                        animate="visible"
                    >
                        iPhone{' '}
                        <span className="hero-gradient-text">17</span>
                        <br />
                        Pro Max
                    </motion.h1>

                    <motion.p
                        className="hero-desc"
                        variants={fadeUp(0.3)}
                        initial="hidden"
                        animate="visible"
                    >
                        Titanio. Chip A19 Pro. La cámara más avanzada jamás creada.
                        Ahora disponible en Cañete con entrega inmediata.
                    </motion.p>

                    <motion.div
                        className="hero-ctas"
                        variants={fadeUp(0.45)}
                        initial="hidden"
                        animate="visible"
                    >
                        <Link to="/catalog?brand=Apple" className="hero-cta-primary">
                            <span>Ver Colección</span>
                            <ArrowRight size={16} className="cta-arrow" />
                        </Link>
                        <Link to="/catalog" className="hero-cta-outline">
                            <span>Explorar Todo</span>
                            <ChevronRight size={16} className="cta-chevron" />
                        </Link>
                    </motion.div>
                </div>

                {/* ── Right: Product Composition (65%) ── */}
                <div className="hero-product-col">
                    {/* Phone A — Cosmic Orange, back view, dominant */}
                    <motion.div
                        className="hero-phone phone-a"
                        variants={phoneReveal(0.4, 40, -6)}
                        initial="hidden"
                        animate="visible"
                        whileHover={{
                            y: -14,
                            scale: 1.04,
                            rotate: -3,
                            transition: { duration: 0.4 }
                        }}
                    >
                        <img
                            src="/products/iphone17promax_cosmicorange.jpg"
                            alt="iPhone 17 Pro Max — Cosmic Orange, vista trasera"
                            loading="eager"
                        />
                    </motion.div>

                    {/* Phone B — Deep Blue alternate angle */}
                    <motion.div
                        className="hero-phone phone-b"
                        variants={phoneReveal(0.55, 30, 4)}
                        initial="hidden"
                        animate="visible"
                        whileHover={{
                            y: -12,
                            scale: 1.04,
                            rotate: 1,
                            transition: { duration: 0.4 }
                        }}
                    >
                        <img
                            src="/products/iphone17promax_deepblue.jpg"
                            alt="iPhone 17 Pro Max — Deep Blue, vista trasera"
                            loading="eager"
                        />
                    </motion.div>

                    {/* Phone C — Silver, third accent (optional, smaller) */}
                    <motion.div
                        className="hero-phone phone-c"
                        variants={phoneReveal(0.7, 20, 8)}
                        initial="hidden"
                        animate="visible"
                        whileHover={{
                            y: -10,
                            scale: 1.05,
                            rotate: 5,
                            transition: { duration: 0.4 }
                        }}
                    >
                        <img
                            src="/products/iphone17promax_silver.jpg"
                            alt="iPhone 17 Pro Max — Silver"
                            loading="eager"
                        />
                    </motion.div>

                    {/* Glow behind the composition */}
                    <div className="product-glow" />
                </div>
            </div>

            {/* Bottom fade */}
            <div className="hero-bottom-fade" />
        </section>
    );
};

export default HeroSection;
