import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Camera, Gamepad2, Briefcase, Sparkles } from 'lucide-react';
import './HeroSection.css';

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay }
    }
});

const floatAnim = {
    animate: {
        y: [0, -6, 0],
        transition: {
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity
        }
    }
};

const HeroSection = () => {
    const categories = [
        { icon: <Camera size={16} />, label: "Fotografía" },
        { icon: <Gamepad2 size={16} />, label: "Gaming" },
        { icon: <Briefcase size={16} />, label: "Trabajo" },
        { icon: <Sparkles size={16} />, label: "Estilo" }
    ];

    return (
        <section className="hero-section">
            <div className="hero-container">
                {/* ── LEFT SIDE: TEXT ── */}
                <div className="hero-left">
                    <motion.div
                        className="hero-badge-v9"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="pulse-dot" />
                        NUEVO EN WUENIPIXEL
                    </motion.div>

                    <motion.h1
                        className="hero-title-v9"
                        variants={fadeUp(0.1)}
                        initial="hidden"
                        animate="visible"
                    >
                        iPhone 17 <span className="text-wine">Pro Max</span>
                    </motion.h1>

                    <motion.p
                        className="hero-subtitle-v9"
                        variants={fadeUp(0.2)}
                        initial="hidden"
                        animate="visible"
                    >
                        Titanio. Chip A19 Pro. La cámara más avanzada jamás creada.
                    </motion.p>

                    <motion.p
                        className="hero-availability"
                        variants={fadeUp(0.3)}
                        initial="hidden"
                        animate="visible"
                    >
                        Disponible en Cañete · Entrega ~2 semanas
                    </motion.p>

                    <motion.div
                        className="hero-ctas-v9"
                        variants={fadeUp(0.4)}
                        initial="hidden"
                        animate="visible"
                    >
                        <Link to="/products?brand=Apple" className="btn-primary-wine">
                            Ver Colección <ArrowRight size={18} />
                        </Link>
                        <Link to="/products" className="btn-secondary-outline">
                            Explorar Todo <ChevronRight size={18} />
                        </Link>
                    </motion.div>

                    <motion.div
                        className="hero-categories"
                        variants={fadeUp(0.5)}
                        initial="hidden"
                        animate="visible"
                    >
                        {categories.map((cat, i) => (
                            <div key={i} className="category-pill">
                                {cat.icon} <span>{cat.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* ── RIGHT SIDE: IMAGES ── */}
                <div className="hero-right">
                    <div className="hero-visual-wrapper">
                        <div className="hero-gradient-bg" />

                        <motion.div
                            className="staggered-phone phone-1"
                            variants={floatAnim}
                            animate="animate"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6, duration: 1 }}
                        >
                            <img src="/products/iphone17promax_cosmicorange.jpg" alt="iPhone 17 Pro Max Orange" />
                        </motion.div>

                        <motion.div
                            className="staggered-phone phone-2"
                            variants={floatAnim}
                            animate="animate"
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 15 }} // Slight offset
                            viewport={{ once: true }}
                            transition={{ delay: 0.7, duration: 1 }}
                        >
                            <img src="/products/iphone17promax_deepblue.jpg" alt="iPhone 17 Pro Max Blue" />
                        </motion.div>

                        <motion.div
                            className="staggered-phone phone-3"
                            variants={floatAnim}
                            animate="animate"
                            initial={{ opacity: 0, y: 80 }}
                            whileInView={{ opacity: 1, y: 30 }} // More offset
                            viewport={{ once: true }}
                            transition={{ delay: 0.8, duration: 1 }}
                        >
                            <img src="/products/iphone17promax_silver.jpg" alt="iPhone 17 Pro Max Silver" />
                        </motion.div>
                    </div>
                </div>
            </div>
            <div className="hero-bottom-fade" />
        </section>
    );
};

export default HeroSection;
