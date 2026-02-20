'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import './HeroSection.css';

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut", delay }
    }
});

const HeroSection = () => {
    return (
        <section className="hero-section-v11">
            <div className="hero-container-v11">
                {/* ── TOP CONTENT (Centered) ── */}
                <div className="hero-header-v11">
                    <motion.div
                        className="hero-badge-v11"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <span className="pulse-dot-red" />
                        NUEVO EN WUENIPIXEL
                    </motion.div>

                    <motion.h1
                        className="hero-title-v11"
                        variants={fadeUp(0.1)}
                        initial="hidden"
                        animate="visible"
                    >
                        iPhone <span className="text-wine-v11">17</span> Pro Max
                    </motion.h1>

                    <motion.div
                        className="hero-subtitle-container-v11"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    >
                        <p>Titanio. Chip A19 Pro. La cámara más avanzada jamás creada.</p>
                        <p>Directo desde USA con entrega programada (2 a 3 semanas).</p>
                    </motion.div>

                    <motion.div
                        className="hero-ctas-v11"
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
                </div>

                {/* ── PHONE IMAGES (Staggered) ── */}
                <div className="hero-phones-v11">
                    {/* LEFT Phone (Orange) */}
                    <motion.div
                        className="phone-wrap-v11 left-phone-v11 animate-float-delayed"
                        initial={{ opacity: 0, x: -60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                    >
                        <img
                            src="/products/iphone17promax_cosmicorange.jpg"
                            alt="iPhone 17 Pro Max Orange"
                            className="phone-img-v11 side-phone-v11"
                        />
                    </motion.div>

                    {/* CENTER Phone (Blue/Hero) */}
                    <motion.div
                        className="phone-wrap-v11 center-phone-v11 animate-float"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    >
                        <img
                            src="/products/iphone17promax_deepblue.jpg"
                            alt="iPhone 17 Pro Max Blue"
                            className="phone-img-v11 hero-phone-v11"
                        />
                    </motion.div>

                    {/* RIGHT Phone (Silver) */}
                    <motion.div
                        className="phone-wrap-v11 right-phone-v11 animate-float-delayed-2"
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                    >
                        <img
                            src="/products/iphone17promax_silver.jpg"
                            alt="iPhone 17 Pro Max Silver"
                            className="phone-img-v11 side-phone-v11"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
