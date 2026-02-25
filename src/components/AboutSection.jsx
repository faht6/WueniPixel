import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, ShieldCheck, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import './AboutSection.css';

const images = [
    { src: '/products/wueni-about-main.jpg', alt: 'WueniPixel Tienda' },
    { src: '/products/wueni-about-2.jpg', alt: 'WueniPixel Experiencia' },
    { src: '/products/wueni-phone-table.jpg', alt: 'Experiencia real WueniPixel' },
];

const AboutSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const goTo = (index) => setCurrentIndex(index);
    const goPrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    const goNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);

    const handleTouchStart = useCallback((e) => {
        touchStartX.current = e.touches[0].clientX;
    }, []);

    const handleTouchMove = useCallback((e) => {
        touchEndX.current = e.touches[0].clientX;
    }, []);

    const handleTouchEnd = useCallback(() => {
        const diff = touchStartX.current - touchEndX.current;
        const threshold = 50;
        if (diff > threshold) goNext();
        else if (diff < -threshold) goPrev();
    }, []);

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
                                <p>Emitimos boleta de venta.</p>
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
                        <div
                            className="about-carousel"
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                        >
                            <div
                                className="carousel-track"
                                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                            >
                                {images.map((img, i) => (
                                    <img
                                        key={i}
                                        src={img.src}
                                        alt={img.alt}
                                        className="about-img"
                                    />
                                ))}
                            </div>

                            {/* Navigation Arrows */}
                            <button className="carousel-arrow carousel-arrow-left" onClick={goPrev} aria-label="Anterior">
                                <ChevronLeft size={20} />
                            </button>
                            <button className="carousel-arrow carousel-arrow-right" onClick={goNext} aria-label="Siguiente">
                                <ChevronRight size={20} />
                            </button>

                            {/* Dots */}
                            <div className="carousel-dots">
                                {images.map((_, i) => (
                                    <button
                                        key={i}
                                        className={`carousel-dot ${i === currentIndex ? 'active' : ''}`}
                                        onClick={() => goTo(i)}
                                        aria-label={`Imagen ${i + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutSection;
