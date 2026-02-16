import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import './HeroSection.css';

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3,
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
    }
};

const imageVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }
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
                animate={{ opacity: 0.5 }}
                transition={{ duration: 2, delay: 0.5 }}
            />
            <motion.div
                className="blur-shape blur-shape-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 2, delay: 0.8 }}
            />
            <motion.div
                className="blur-shape blur-shape-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 2, delay: 1.1 }}
            />

            {/* Main Content */}
            <div className="hero-content">
                {/* Text Block */}
                <motion.div
                    className="hero-text"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div className="hero-eyebrow" variants={itemVariants}>
                        <span className="hero-eyebrow-dot" />
                        NUEVO EN WUENIPIXEL
                    </motion.div>

                    <motion.h1 className="hero-title" variants={itemVariants}>
                        iPhone 17<br />Pro Max
                    </motion.h1>

                    <motion.p className="hero-subtitle" variants={itemVariants}>
                        Titanio. A19 Pro. La cámara más avanzada de Apple.
                        Disponible ahora en Cañete con entrega inmediata.
                    </motion.p>

                    <motion.div variants={itemVariants}>
                        <Link to="/catalog?brand=Apple" className="hero-cta">
                            Ver Colección
                            <ArrowRight size={18} className="hero-cta-icon" />
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Image Block */}
                <motion.div
                    className="hero-image-block"
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="hero-product-container">
                        <img
                            src="/products/iphone17promax_deepblue.jpg"
                            alt="iPhone 17 Pro Max - Deep Blue"
                            className="hero-product-img"
                            loading="eager"
                        />
                        <div className="hero-image-glow" />
                    </div>
                </motion.div>
            </div>

            {/* Bottom Fade into next section */}
            <div className="hero-bottom-fade" />

            {/* Scroll Indicator */}
            <motion.div
                className="hero-scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
            >
                <span className="scroll-line" />
            </motion.div>
        </section>
    );
};

export default HeroSection;
