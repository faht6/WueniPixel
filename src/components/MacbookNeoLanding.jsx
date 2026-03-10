import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './MacbookNeoLanding.css';

const COLORS = [
    {
        name: 'Plata',
        hex: '#C0C0C8',
        slug: 'silver',
        images: [
            '/macbook/macbook-neo-color-select-202603-silver-512gb.webp',
            '/macbook/macbook-neo-color-select-202603-silver-512gb_AV1.webp',
            '/macbook/macbook-neo-color-select-202603-silver-512gb_AV2.webp',
            '/macbook/macbook-neo-color-select-202603-silver-512gb_AV3.webp',
        ],
    },
    {
        name: 'Rosa Rubor',
        hex: '#E8A0B5',
        slug: 'blush',
        images: [
            '/macbook/macbook-neo-color-select-202603-blush-512gb.webp',
            '/macbook/macbook-neo-color-select-202603-blush-512gb_AV1.webp',
            '/macbook/macbook-neo-color-select-202603-blush-512gb_AV2.webp',
            '/macbook/macbook-neo-color-select-202603-blush-512gb_AV3.webp',
        ],
    },
    {
        name: 'Amarillo Cítrico',
        hex: '#E8D44D',
        slug: 'citrus',
        images: [
            '/macbook/macbook-neo-color-select-202603-citrus-512gb.webp',
            '/macbook/macbook-neo-color-select-202603-citrus-512gb_AV1.webp',
            '/macbook/macbook-neo-color-select-202603-citrus-512gb_AV2.webp',
            '/macbook/macbook-neo-color-select-202603-citrus-512gb_AV3.webp',
        ],
    },
    {
        name: 'Índigo',
        hex: '#4B5FAA',
        slug: 'indigo',
        images: [
            '/macbook/macbook-neo-color-select-202603-indigo-512gb.webp',
            '/macbook/macbook-neo-color-select-202603-indigo-512gb_AV1.webp',
            '/macbook/macbook-neo-color-select-202603-indigo-512gb_AV2.webp',
            '/macbook/macbook-neo-color-select-202603-indigo-512gb_AV3.webp',
        ],
    },
];

const VALUE_PROPS = [
    {
        icon: '⚡',
        title: 'Poder A18 Pro',
        desc: 'El cerebro del iPhone más potente, ahora en tu computadora.',
    },
    {
        icon: '🤫',
        title: 'Silencio Absoluto',
        desc: 'Diseño sin ventiladores. Potencia fría y silenciosa.',
    },
    {
        icon: '🔋',
        title: 'Batería de Todo el Día',
        desc: 'Hasta 16 horas de autonomía para que nunca te detengas.',
    },
    {
        icon: '🎨',
        title: 'Colores Vibrantes',
        desc: 'Disponible en Plata, Rosa Rubor, Amarillo Cítrico e Índigo.',
    },
];

const FadeInSection = ({ children, delay = 0, className = '' }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            {children}
        </motion.div>
    );
};

const MacbookNeoLanding = () => {
    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedThumb, setSelectedThumb] = useState(0);
    const videoRef = useRef(null);

    const currentColor = COLORS[selectedColor];
    const currentImage = currentColor.images[selectedThumb];

    // Reset thumb when switching colors
    useEffect(() => {
        setSelectedThumb(0);
    }, [selectedColor]);

    const whatsappUrl = `https://wa.me/51941126123?text=${encodeURIComponent(
        `Hola WueniPixel, quiero más información sobre la nueva MacBook Neo en color ${currentColor.name}.`
    )}`;

    return (
        <section className="macbook-neo-landing" id="macbook-neo">
            {/* ===== HERO VIDEO ===== */}
            <div className="macbook-neo-hero">
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    src="/macbook/macbookneo_hero.mp4"
                />
                <div className="macbook-neo-hero-overlay" />
                <motion.div
                    className="macbook-neo-hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                >
                    <div className="macbook-neo-hero-badge">
                        <span className="dot" /> NUEVO 2026
                    </div>
                    <h1>
                        MacBook <span>Neo</span>
                    </h1>
                    <p className="macbook-neo-hero-sub">
                        El futuro es ligero. El futuro es tuyo.
                    </p>
                </motion.div>
            </div>

            {/* ===== PRODUCT SHOWCASE ===== */}
            <FadeInSection>
                <div className="macbook-neo-showcase">
                    <h2>Diseñada para crear, estudiar y brillar.</h2>
                    <p className="subtitle">
                        La potencia del chip A18 Pro llega por primera vez a una MacBook.
                        Un diseño ultra delgado, sin ventiladores y con colores que inspiran.
                    </p>

                    {/* Color Picker */}
                    <div className="macbook-neo-colors">
                        {COLORS.map((color, i) => (
                            <button
                                key={color.slug}
                                className={`macbook-neo-color-btn ${selectedColor === i ? 'active' : ''}`}
                                style={{ backgroundColor: color.hex }}
                                onClick={() => setSelectedColor(i)}
                                aria-label={`Color ${color.name}`}
                                title={color.name}
                            />
                        ))}
                    </div>
                    <p className="macbook-neo-color-label">{currentColor.name}</p>

                    {/* Main Product Image */}
                    <div className="macbook-neo-product-image">
                        <motion.img
                            key={currentImage}
                            src={currentImage}
                            alt={`MacBook Neo ${currentColor.name}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4 }}
                        />
                    </div>

                    {/* Thumbnails */}
                    <div className="macbook-neo-thumbs">
                        {currentColor.images.map((img, i) => (
                            <button
                                key={i}
                                className={`macbook-neo-thumb ${selectedThumb === i ? 'active' : ''}`}
                                onClick={() => setSelectedThumb(i)}
                            >
                                <img src={img} alt={`Vista ${i + 1}`} loading="lazy" />
                            </button>
                        ))}
                    </div>
                </div>
            </FadeInSection>

            {/* ===== VALUE PROPOSITIONS ===== */}
            <div className="macbook-neo-values">
                {VALUE_PROPS.map((item, i) => (
                    <FadeInSection key={i} delay={i * 0.1}>
                        <div className="macbook-neo-value">
                            <div className="macbook-neo-value-icon">{item.icon}</div>
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                        </div>
                    </FadeInSection>
                ))}
            </div>

            {/* ===== CTA ===== */}
            <FadeInSection>
                <div className="macbook-neo-cta">
                    <div className="macbook-neo-trust-badge">
                        <span className="shield-icon">🛡️</span>
                        Garantía WueniPixel &nbsp;|&nbsp; Entrega en Cañete y a nivel nacional
                    </div>
                    <br />
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="macbook-neo-cta-btn"
                    >
                        Consultar Disponibilidad
                        <ArrowRight size={20} />
                    </a>
                </div>
            </FadeInSection>
        </section>
    );
};

export default MacbookNeoLanding;
