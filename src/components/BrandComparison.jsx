import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Apple, Smartphone, Cpu, Camera, Shield, Zap, Palette, Brain, BatteryCharging, Globe } from 'lucide-react';
import './BrandComparison.css';

const categories = [
    { id: 'ecosystem', label: 'Ecosistema', icon: Globe },
    { id: 'camera', label: 'Cámara', icon: Camera },
    { id: 'performance', label: 'Rendimiento', icon: Cpu },
    { id: 'ai', label: 'Inteligencia', icon: Brain },
    { id: 'security', label: 'Seguridad', icon: Shield },
    { id: 'battery', label: 'Batería', icon: BatteryCharging },
];

const comparisonData = {
    ecosystem: {
        title: 'Ecosistema & Software',
        apple: {
            name: 'iPhone · iOS',
            points: [
                'Integración perfecta con Mac, iPad, Apple Watch y AirPods',
                'iMessage, AirDrop y Continuity para flujo de trabajo unificado',
                'App Store curada con apps optimizadas',
                'Actualizaciones de iOS garantizadas por 5-6 años',
            ],
            highlight: 'Ideal para quienes viven en el universo Apple',
        },
        pixel: {
            name: 'Pixel · Android',
            points: [
                'Integración nativa con Google Maps, Gmail, Drive y YouTube',
                'Android puro sin bloatware, la experiencia más limpia',
                'Google Assistant como el asistente más inteligente del mercado',
                '7 años de actualizaciones de OS y seguridad',
            ],
            highlight: 'Ideal para quienes dependen de servicios Google',
        },
    },
    camera: {
        title: 'Sistema de Cámaras',
        apple: {
            name: 'iPhone · Fotografía',
            points: [
                'Colores naturales y tonos de piel precisos',
                'ProRAW y ProRes para control profesional',
                'Modo Cine con enfoque selectivo en video 4K',
                'Procesamiento más conservador, fotos "reales"',
            ],
            highlight: 'La elección de videógrafos y creadores de contenido',
        },
        pixel: {
            name: 'Pixel · Fotografía',
            points: [
                'Modo Noche líder en la industria, fotos nocturnas superiores',
                'Magic Eraser y herramientas de IA integradas',
                'Astrofotografía dedicada para capturar estrellas',
                'HDR+ agresivo con rango dinámico excepcional',
            ],
            highlight: 'La mejor cámara computacional del mercado',
        },
    },
    performance: {
        title: 'Hardware & Rendimiento',
        apple: {
            name: 'iPhone · Chip serie A/M',
            points: [
                'Chips A-series/M-series líderes en benchmarks',
                'Arquitectura ARM personalizada desde cero',
                'GPU integrada optimizada para juegos y AR',
                'Gestión térmica superior en tareas intensivas',
            ],
            highlight: 'El procesador móvil más rápido del planeta',
        },
        pixel: {
            name: 'Pixel · Google Tensor',
            points: [
                'Chip Tensor diseñado para Machine Learning on-device',
                'Procesamiento de lenguaje natural ultra rápido',
                'Optimización específica para fotografía computacional',
                'Modem 5G integrado con conectividad avanzada',
            ],
            highlight: 'Diseñado para IA, no solo para benchmarks',
        },
    },
    ai: {
        title: 'Inteligencia Artificial',
        apple: {
            name: 'iPhone · Apple Intelligence',
            points: [
                'Siri con integración profunda en el sistema',
                'Procesamiento on-device para privacidad total',
                'Texto predictivo y autocorrección contextual',
                'Live Text y Visual Lookup en fotos',
            ],
            highlight: 'IA que prioriza tu privacidad ante todo',
        },
        pixel: {
            name: 'Pixel · Google AI',
            points: [
                'Gemini Nano ejecutándose directamente en el dispositivo',
                'Traducción en tiempo real de llamadas y conversaciones',
                'Circle to Search: rodea cualquier cosa para buscarla',
                'Resúmenes inteligentes de grabaciones y documentos',
            ],
            highlight: 'La IA más avanzada del mundo en tu bolsillo',
        },
    },
    security: {
        title: 'Privacidad & Seguridad',
        apple: {
            name: 'iPhone · Privacidad',
            points: [
                'App Tracking Transparency: control total sobre rastreo',
                'Face ID con procesamiento 100% local',
                'iCloud Private Relay para navegación anónima',
                'Bloqueo de modo extremo contra spyware avanzado',
            ],
            highlight: 'La privacidad es un derecho, no un privilegio',
        },
        pixel: {
            name: 'Pixel · Titan M2',
            points: [
                'Chip de seguridad Titan M2 dedicado',
                'VPN de Google One incluida gratis',
                'Actualizaciones de seguridad cada mes por 7 años',
                'Detección de llamadas spam con IA en tiempo real',
            ],
            highlight: 'Seguridad de nivel empresarial para todos',
        },
    },
    battery: {
        title: 'Batería & Carga',
        apple: {
            name: 'iPhone · Eficiencia',
            points: [
                'Optimización única hardware-software para máxima duración',
                'Carga MagSafe inalámbrica con alineación magnética',
                'Modo de bajo consumo inteligente y adaptativo',
                'Salud de batería transparente con alertas',
            ],
            highlight: 'Eficiencia energética insuperable',
        },
        pixel: {
            name: 'Pixel · Adaptive Battery',
            points: [
                'Baterías de mayor capacidad (hasta 5200+ mAh)',
                'Adaptive Battery con IA que aprende tus patrones',
                'Carga rápida de 30W y carga inalámbrica',
                'Battery Share para cargar otros dispositivos',
            ],
            highlight: 'Baterías enormes con gestión inteligente',
        },
    },
};

const BrandComparison = () => {
    const [activeCategory, setActiveCategory] = useState('ecosystem');
    const data = comparisonData[activeCategory];

    return (
        <section className="brand-comparison-section">
            <div className="container">
                {/* Header */}
                <div className="bc-header">
                    <span className="bc-eyebrow">¿iPhone o Pixel?</span>
                    <h2 className="bc-title">Dos Filosofías. Un Objetivo.</h2>
                    <p className="bc-subtitle">
                        Explora las diferencias clave entre los dos ecosistemas más
                        poderosos del mundo móvil. Tú decides cuál se adapta mejor a tu vida.
                    </p>
                </div>

                {/* Category Tabs */}
                <div className="bc-tabs">
                    {categories.map(cat => {
                        const Icon = cat.icon;
                        return (
                            <button
                                key={cat.id}
                                className={`bc-tab ${activeCategory === cat.id ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat.id)}
                            >
                                <Icon size={18} />
                                <span>{cat.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Comparison Cards */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        className="bc-cards-wrapper"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                    >
                        <h3 className="bc-category-title">{data.title}</h3>

                        <div className="bc-cards">
                            {/* Apple Card */}
                            <div className="bc-card bc-card-apple">
                                <div className="bc-card-header">
                                    <div className="bc-brand-icon apple-icon">
                                        <Apple size={24} />
                                    </div>
                                    <h4>{data.apple.name}</h4>
                                </div>
                                <ul className="bc-points">
                                    {data.apple.points.map((point, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.08 }}
                                        >
                                            <span className="bc-bullet apple-bullet" />
                                            {point}
                                        </motion.li>
                                    ))}
                                </ul>
                                <div className="bc-highlight apple-highlight">
                                    <Zap size={14} />
                                    <span>{data.apple.highlight}</span>
                                </div>
                            </div>

                            {/* VS Badge */}
                            <div className="bc-vs-badge">
                                <span>VS</span>
                            </div>

                            {/* Pixel Card */}
                            <div className="bc-card bc-card-pixel">
                                <div className="bc-card-header">
                                    <div className="bc-brand-icon pixel-icon">
                                        <Smartphone size={24} />
                                    </div>
                                    <h4>{data.pixel.name}</h4>
                                </div>
                                <ul className="bc-points">
                                    {data.pixel.points.map((point, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.08 }}
                                        >
                                            <span className="bc-bullet pixel-bullet" />
                                            {point}
                                        </motion.li>
                                    ))}
                                </ul>
                                <div className="bc-highlight pixel-highlight">
                                    <Zap size={14} />
                                    <span>{data.pixel.highlight}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Bottom CTA */}
                <div className="bc-cta">
                    <p>¿Ya te decidiste? Explora todos nuestros modelos.</p>
                    <a href="/products" className="bc-cta-button">Ver Catálogo Completo</a>
                </div>
            </div>
        </section>
    );
};

export default BrandComparison;
