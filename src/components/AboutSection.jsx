import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, ShieldCheck, MapPin } from 'lucide-react';
import './AboutSection.css';

const AboutSection = () => {
    return (
        <section className="about-section container" id="about">
            <div className="about-grid">
                <motion.div
                    className="about-content"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="section-tag">Nuestra Identidad</h2>
                    <h1 className="about-title">Tienda Online en Cañete</h1>
                    <p className="about-description">
                        En WueniPixel, redefinimos la experiencia de adquirir tecnología Apple y Google en nuestra comunidad.
                        Somos una tienda que opera con un modelo directo desde USA,
                        para ofrecerte equipos impecables al mejor precio del mercado.
                    </p>

                    <div className="about-points">
                        <div className="about-point">
                            <div className="point-icon"><MapPin size={20} /></div>
                            <div>
                                <h4>Enfoque Local</h4>
                                <p>Operamos exclusivamente para clientes en Cañete, garantizando cercanía y confianza.</p>
                            </div>
                        </div>
                        <div className="about-point">
                            <div className="point-icon"><ShieldCheck size={20} /></div>
                            <div>
                                <h4>Formalidad y Garantía</h4>
                                <p>Emitimos boleta de venta y ofrecemos soporte técnico.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="about-visual"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="visual-card">
                        <div className="visual-badge">100% Digital</div>
                        <img src="/products/wueni-phone-table.jpg" alt="Experiencia real WueniPixel" className="about-img" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutSection;
