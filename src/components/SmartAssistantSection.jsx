import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Camera, Gamepad2, Briefcase, Share2, Sparkles, MessageCircle, Send } from 'lucide-react';
import './SmartAssistantSection.css';

/* ─── Recommendation Engine ─── */
const phoneDatabase = [
    { name: 'Pixel 9 Pro', brand: 'Google', price: 3499, condition: 'Nuevo Sellado', image: '/products/pixel9pro_allcolors.jpg', id: 211 },
    { name: 'iPhone 16 Pro', brand: 'Apple', price: 4699, condition: 'Nuevo Sellado', image: '/products/iphone16pro_titanionegro.jpg', id: 112 },
    { name: 'iPhone 16', brand: 'Apple', price: 3999, condition: 'Nuevo Sellado', image: '/products/iphone16_negro.jpg', id: 111 },
    { name: 'Pixel 9', brand: 'Google', price: 2799, condition: 'Nuevo Sellado', image: '/products/pixel9_allcolors.jpg', id: 210 },
    { name: 'Pixel 8', brand: 'Google', price: 2799, condition: 'Como Nuevo', image: '/products/pixel8_allcolors.jpg', id: 205 },
    { name: 'Pixel 9a', brand: 'Google', price: 1999, condition: 'Nuevo Sellado', image: '/products/pixel9a_allcolors.jpg', id: 217 },
    { name: 'Pixel 7a', brand: 'Google', price: 1199, condition: 'Nuevo Sellado', image: '/products/pixel7a_allcolors.jpg', id: 208 },
    { name: 'iPhone 14', brand: 'Apple', price: 2599, condition: 'Grado A+', image: '/products/iphone14_medianoche.jpg', id: 115 },
    { name: 'iPhone 13', brand: 'Apple', price: 1899, condition: 'Grado A+', image: '/products/iphone13_midnight.jpg', id: 120 },
    { name: 'iPhone 11', brand: 'Apple', price: 1299, condition: 'Grado A+', image: '/products/iphone11_allcolors.jpg', id: 101 },
    { name: 'iPhone 17 Pro Max', brand: 'Apple', price: 6599, condition: 'Nuevo Sellado', image: '/products/iphone17promax_deepblue.jpg', id: 110 },
    { name: 'Pixel 10 Pro', brand: 'Google', price: 4499, condition: 'Nuevo Sellado', image: '/products/pixel10pro_allcolors.jpg', id: 214 },
    { name: 'iPhone 15 Pro', brand: 'Apple', price: 3899, condition: 'Nuevo Sellado', image: '/products/iphone15pro_titanionegro.jpg', id: 114 },
];

const getRecommendation = (usos, presupuesto) => {
    const budget = Number(presupuesto) || 2000;

    // Score each phone
    const scored = phoneDatabase
        .filter(p => p.price <= budget * 1.1) // small margin
        .map(phone => {
            let score = 0;
            const reasons = [];

            // Budget fit
            if (phone.price <= budget) {
                score += 25;
                reasons.push('Dentro de tu presupuesto.');
            } else {
                score += 10;
                reasons.push('Ligeramente por encima, pero vale la pena.');
            }

            // Use-case scoring
            if (usos.includes('photo')) {
                if (phone.brand === 'Google') { score += 30; reasons.push('Mejor cámara nocturna con Night Sight e IA de Google.'); }
                else if (phone.name.includes('Pro')) { score += 25; reasons.push('Sistema ProRes y cámara de nivel profesional.'); }
                else { score += 10; }
            }
            if (usos.includes('gaming')) {
                if (phone.brand === 'Apple') { score += 25; reasons.push('Chip optimizado para FPS estables y gráficos AAA.'); }
                else { score += 15; reasons.push('Rendimiento sólido para gaming móvil.'); }
            }
            if (usos.includes('work')) {
                if (phone.name.includes('Pro')) { score += 20; reasons.push('Multitarea avanzada y pantalla grande para productividad.'); }
                else { score += 12; reasons.push('Ideal para apps de oficina y comunicación.'); }
            }
            if (usos.includes('social')) {
                if (phone.brand === 'Google') { score += 22; reasons.push('IA para fotos virales y edición inteligente.'); }
                else { score += 18; reasons.push('Grabación 4K y edición de contenido fluida.'); }
            }

            // Price-to-value bonus
            const ratio = budget / phone.price;
            if (ratio >= 1.2) score += 10;
            else if (ratio >= 1) score += 5;

            // Condition bonus
            if (phone.condition === 'Nuevo Sellado') score += 5;

            // Normalize to percentage
            const maxPossible = 25 + 30 + 10 + 5;
            const matchScore = Math.min(98, Math.round((score / maxPossible) * 100));

            return { ...phone, matchScore, reasons: reasons.slice(0, 3) };
        })
        .sort((a, b) => b.matchScore - a.matchScore);

    if (scored.length === 0) {
        return {
            main: { name: 'Pixel 7a', brand: 'Google', price: 1199, condition: 'Nuevo Sellado', image: '/products/pixel7a_allcolors.jpg', id: 208, matchScore: 85, reasons: ['El mejor valor en tu rango de precio.', 'Cámara de 64MP con IA de Google.', 'Disponible para entrega inmediata.'] },
            alt: null,
        };
    }

    return {
        main: scored[0],
        alt: scored[1] || null,
    };
};

/* ─── Format currency ─── */
const formatPrice = (n) => 'S/ ' + Number(n).toLocaleString('es-PE');

/* ─── Use case definitions ─── */
const useCases = [
    { id: 'photo', icon: Camera, label: 'Fotografía', desc: 'Cámara pro y detalles de noche.' },
    { id: 'gaming', icon: Gamepad2, label: 'Gaming', desc: 'FPS estables y buen rendimiento.' },
    { id: 'work', icon: Briefcase, label: 'Trabajo', desc: 'Apps de oficina y multitarea.' },
    { id: 'social', icon: Share2, label: 'Redes', desc: 'Contenido viral, TikTok, Instagram.' },
];

const budgetChips = [
    { label: 'Menos de S/ 1500', min: 800, max: 1500 },
    { label: 'S/ 1500 – 2500', min: 1500, max: 2500 },
    { label: 'S/ 2500 – 3500', min: 2500, max: 3500 },
    { label: 'Más de S/ 3500', min: 3500, max: 6000 },
];

const stepLabels = ['Uso', 'Presupuesto', 'Recomendación'];

/* ─── Motion variants ─── */
const stepVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 50 : -50 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -50 : 50, transition: { duration: 0.25 } }),
};

const chatBubbleVariants = {
    hidden: { opacity: 0, y: 12, scale: 0.95 },
    visible: (i) => ({
        opacity: 1, y: 0, scale: 1,
        transition: { delay: i * 0.6, duration: 0.4, ease: 'easeOut' },
    }),
};

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */
const SmartAssistantSection = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [direction, setDirection] = useState(1);
    const [selectedUses, setSelectedUses] = useState([]);
    const [budget, setBudget] = useState(2500);
    const [recommendation, setRecommendation] = useState(null);
    const [isThinking, setIsThinking] = useState(false);

    const toggleUse = (id) => {
        setSelectedUses(prev =>
            prev.includes(id) ? prev.filter(u => u !== id) : [...prev, id]
        );
    };

    const goNext = () => {
        if (currentStep === 2) {
            // Calculate recommendation
            setIsThinking(true);
            setDirection(1);
            setCurrentStep(3);
            setTimeout(() => {
                const result = getRecommendation(selectedUses, budget);
                setRecommendation(result);
                setIsThinking(false);
            }, 1500);
        } else {
            setDirection(1);
            setCurrentStep(prev => Math.min(prev + 1, 3));
        }
    };

    const goBack = () => {
        setDirection(-1);
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const restart = () => {
        setDirection(-1);
        setSelectedUses([]);
        setBudget(2500);
        setRecommendation(null);
        setCurrentStep(1);
    };

    const getWhatsAppUrl = (phone) => {
        const msg = `Hola, me interesa el ${phone.name} (${phone.condition}) a ${formatPrice(phone.price)}. ¿Está disponible?`;
        return `https://wa.me/51941126123?text=${encodeURIComponent(msg)}`;
    };

    // Chat messages based on state
    const getChatMessages = () => {
        if (currentStep === 1 && selectedUses.length === 0) {
            return [{ from: 'ai', text: '¡Hola! Cuéntame cómo usas tu celular y te ayudo a encontrar el ideal.' }];
        }
        if (currentStep === 1 && selectedUses.length > 0) {
            const labels = selectedUses.map(u => useCases.find(uc => uc.id === u)?.label).join(' y ');
            return [
                { from: 'ai', text: `Interesante… priorizas ${labels}.` },
                { from: 'ai', text: 'Ahora dime tu presupuesto para filtrar las mejores opciones.' },
            ];
        }
        if (currentStep === 2) {
            return [
                { from: 'ai', text: `Buscando equipos hasta ${formatPrice(budget)}…` },
                { from: 'ai', text: 'Presiona "Ver mi recomendación" cuando estés listo.' },
            ];
        }
        if (isThinking) {
            return [{ from: 'ai', text: 'thinking' }];
        }
        if (recommendation) {
            return [
                { from: 'ai', text: `¡Encontré tu match! El ${recommendation.main.name}.` },
                { from: 'ai', text: recommendation.main.reasons[0] || 'Excelente opción para tu perfil.' },
            ];
        }
        return [{ from: 'ai', text: '¡Hola! Empecemos.' }];
    };

    return (
        <section className="sa-section">
            {/* Background */}
            <div className="sa-bg">
                <div className="sa-grid-overlay" />
                <div className="sa-glow-orb sa-orb-1" />
                <div className="sa-glow-orb sa-orb-2" />
            </div>

            <div className="sa-container">
                {/* ── LEFT COLUMN ── */}
                <div className="sa-left">
                    {/* Badge */}
                    <div className="sa-badge">
                        <Sparkles size={14} />
                        Asistente IA · WueniPixel Match
                    </div>

                    {/* Title */}
                    <h2 className="sa-title">
                        Encuentra<br />tu<br />
                        <span className="sa-title-gradient">Celular Ideal</span>
                    </h2>

                    {/* Description */}
                    <p className="sa-description">
                        Responde 3 preguntas rápidas y te recomendaremos el mejor iPhone o Pixel según tu uso, presupuesto y stock disponible.
                    </p>

                    {/* ── WIZARD CARD ── */}
                    <div className="sa-wizard-card">
                        {/* Progress */}
                        <div className="sa-progress-header">
                            <span className="sa-progress-text">Paso {currentStep} de 3</span>
                            <div className="sa-progress-bar">
                                <motion.div
                                    className="sa-progress-fill"
                                    animate={{ width: `${(currentStep / 3) * 100}%` }}
                                    transition={{ duration: 0.4, ease: 'easeOut' }}
                                />
                            </div>
                        </div>

                        {/* Step indicators */}
                        <div className="sa-step-indicators">
                            {stepLabels.map((label, i) => (
                                <div key={i} className={`sa-step-dot ${currentStep >= i + 1 ? 'active' : ''} ${currentStep === i + 1 ? 'current' : ''}`}>
                                    <span className="sa-step-num">{i + 1}</span>
                                    <span className="sa-step-label">{label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Step content */}
                        <AnimatePresence mode="wait" custom={direction}>
                            {currentStep === 1 && (
                                <motion.div key="step1" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit">
                                    <Step1 selectedUses={selectedUses} toggleUse={toggleUse} />
                                </motion.div>
                            )}
                            {currentStep === 2 && (
                                <motion.div key="step2" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit">
                                    <Step2 budget={budget} setBudget={setBudget} />
                                </motion.div>
                            )}
                            {currentStep === 3 && (
                                <motion.div key="step3" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit">
                                    <Step3
                                        isThinking={isThinking}
                                        recommendation={recommendation}
                                        getWhatsAppUrl={getWhatsAppUrl}
                                        restart={restart}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Navigation buttons */}
                        {currentStep < 3 && (
                            <div className="sa-nav-buttons">
                                {currentStep > 1 && (
                                    <button className="sa-btn-outline" onClick={goBack}>
                                        <ArrowLeft size={16} /> Atrás
                                    </button>
                                )}
                                <button
                                    className={`sa-btn-primary ${currentStep === 1 && selectedUses.length === 0 ? 'disabled' : ''}`}
                                    onClick={goNext}
                                    disabled={currentStep === 1 && selectedUses.length === 0}
                                    title={currentStep === 1 && selectedUses.length === 0 ? 'Elige al menos un uso' : ''}
                                >
                                    {currentStep === 2 ? 'Ver mi recomendación' : 'Siguiente'}
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── RIGHT COLUMN — AI ASSISTANT VISUAL ── */}
                <div className="sa-right">
                    <div className="sa-ai-card">
                        <div className="sa-ai-card-glow" />

                        {/* AI Header */}
                        <div className="sa-ai-header">
                            <div className="sa-ai-avatar">
                                <Sparkles size={16} />
                            </div>
                            <div>
                                <p className="sa-ai-name">WueniPixel IA</p>
                                <p className="sa-ai-status">
                                    <span className="sa-online-dot" />
                                    {isThinking ? 'Analizando...' : 'En línea'}
                                </p>
                            </div>
                        </div>

                        {/* Chat bubbles */}
                        <div className="sa-chat-area">
                            <AnimatePresence mode="wait">
                                {getChatMessages().map((msg, i) => (
                                    <motion.div
                                        key={`${currentStep}-${i}-${msg.text}`}
                                        className="sa-chat-bubble"
                                        custom={i}
                                        variants={chatBubbleVariants}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        {msg.text === 'thinking' ? (
                                            <div className="sa-typing-indicator">
                                                <span /><span /><span />
                                            </div>
                                        ) : (
                                            <>
                                                <MessageCircle size={12} className="sa-bubble-icon" />
                                                {msg.text}
                                            </>
                                        )}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Phone preview */}
                        {recommendation && !isThinking && (
                            <motion.div
                                className="sa-preview-phone"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            >
                                <div className="sa-preview-badge">
                                    <Sparkles size={10} />
                                    IA dice: este es tu match
                                </div>
                                <img
                                    src={recommendation.main.image}
                                    alt={recommendation.main.name}
                                    className="sa-preview-img"
                                />
                            </motion.div>
                        )}

                        {/* Default phone placeholder when no recommendation */}
                        {!recommendation && !isThinking && (
                            <div className="sa-preview-phone sa-preview-placeholder">
                                <img
                                    src="/products/pixel9pro_allcolors.jpg"
                                    alt="Teléfono"
                                    className="sa-preview-img sa-preview-dim"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

/* ═══════════════════════════════════════════════════════
   STEP 1 — USO PRINCIPAL
   ═══════════════════════════════════════════════════════ */
const Step1 = ({ selectedUses, toggleUse }) => (
    <div className="sa-step-content">
        <h3 className="sa-step-title">¿Para qué usas más tu celular?</h3>
        <p className="sa-step-subtitle">Puedes elegir uno o dos.</p>

        <div className="sa-chips-grid">
            {useCases.map(uc => (
                <button
                    key={uc.id}
                    className={`sa-chip ${selectedUses.includes(uc.id) ? 'selected' : ''}`}
                    onClick={() => toggleUse(uc.id)}
                >
                    <uc.icon size={22} className="sa-chip-icon" />
                    <div className="sa-chip-text">
                        <span className="sa-chip-label">{uc.label}</span>
                        <span className="sa-chip-desc">{uc.desc}</span>
                    </div>
                </button>
            ))}
        </div>

        <p className="sa-tip">
            💡 Tip: si eliges Fotografía + Redes, priorizaremos cámaras con buena IA.
        </p>
    </div>
);

/* ═══════════════════════════════════════════════════════
   STEP 2 — PRESUPUESTO
   ═══════════════════════════════════════════════════════ */
const Step2 = ({ budget, setBudget }) => {
    const handleInputChange = (e) => {
        const val = e.target.value.replace(/[^\d]/g, '');
        setBudget(Number(val) || 800);
    };

    return (
        <div className="sa-step-content">
            <h3 className="sa-step-title">¿Cuál es tu presupuesto aproximado?</h3>
            <p className="sa-step-subtitle">Te mostraremos opciones que se adapten a este rango.</p>

            {/* Slider */}
            <div className="sa-slider-container">
                <input
                    type="range"
                    min="800"
                    max="6000"
                    step="100"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="sa-range-slider"
                />
                <div className="sa-slider-labels">
                    <span>S/ 800</span>
                    <span>S/ 6,000</span>
                </div>
            </div>

            {/* Input */}
            <div className="sa-budget-input-wrap">
                <span className="sa-currency-label">S/</span>
                <input
                    type="text"
                    value={budget}
                    onChange={handleInputChange}
                    className="sa-budget-input"
                    placeholder="Tu presupuesto"
                />
            </div>

            {/* Quick chips */}
            <div className="sa-budget-chips">
                {budgetChips.map((chip, i) => (
                    <button
                        key={i}
                        className={`sa-budget-chip ${budget >= chip.min && budget <= chip.max ? 'active' : ''}`}
                        onClick={() => setBudget(Math.round((chip.min + chip.max) / 2))}
                    >
                        {chip.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════════════════
   STEP 3 — RECOMENDACIÓN
   ═══════════════════════════════════════════════════════ */
const Step3 = ({ isThinking, recommendation, getWhatsAppUrl, restart }) => {
    if (isThinking) {
        return (
            <div className="sa-step-content sa-thinking">
                <div className="sa-thinking-animation">
                    <Sparkles size={32} className="sa-thinking-icon" />
                    <p className="sa-thinking-text">Analizando tu perfil...</p>
                    <div className="sa-typing-indicator sa-typing-lg">
                        <span /><span /><span />
                    </div>
                </div>
            </div>
        );
    }

    if (!recommendation) return null;

    const { main, alt } = recommendation;
    const matchColor = main.matchScore >= 85 ? 'green' : main.matchScore >= 70 ? 'yellow' : 'red';

    return (
        <div className="sa-step-content">
            <h3 className="sa-step-title">Tu match ideal</h3>
            <p className="sa-step-subtitle">Basado en tu uso y presupuesto.</p>

            {/* Main recommendation card */}
            <div className="sa-rec-card">
                <div className="sa-rec-card-glow" />

                <div className="sa-rec-header">
                    <span className={`sa-match-badge ${matchColor}`}>
                        <Sparkles size={12} /> Match {main.matchScore}%
                    </span>
                    <span className="sa-brand-tag">
                        {main.brand === 'Apple' ? '🍎' : ''} {main.brand}
                    </span>
                </div>

                <div className="sa-rec-body">
                    <img src={main.image} alt={main.name} className="sa-rec-img" />
                    <div className="sa-rec-info">
                        <h4 className="sa-rec-name">{main.name}</h4>
                        <p className="sa-rec-condition">{main.condition}</p>
                        <p className="sa-rec-price">{formatPrice(main.price)}</p>
                    </div>
                </div>

                {/* Reasons */}
                <ul className="sa-rec-reasons">
                    {main.reasons.map((r, i) => (
                        <li key={i}>
                            <span className="sa-reason-dot">✓</span> {r}
                        </li>
                    ))}
                </ul>

                {/* CTAs */}
                <div className="sa-rec-ctas">
                    <a href={getWhatsAppUrl(main)} target="_blank" rel="noopener noreferrer" className="sa-btn-primary sa-btn-whatsapp">
                        <Send size={16} /> Comprar por WhatsApp
                    </a>
                    <a href={`/products/${main.id}`} className="sa-btn-outline">
                        Ver detalles del modelo
                    </a>
                </div>
            </div>

            {/* Alternative */}
            {alt && (
                <div className="sa-alt-card">
                    <p className="sa-alt-label">Opción alternativa</p>
                    <div className="sa-alt-body">
                        <img src={alt.image} alt={alt.name} className="sa-alt-img" />
                        <div className="sa-alt-info">
                            <h5 className="sa-alt-name">{alt.name}</h5>
                            <p className="sa-alt-price">{formatPrice(alt.price)}</p>
                            <span className={`sa-match-badge small ${alt.matchScore >= 80 ? 'green' : 'yellow'}`}>
                                Match {alt.matchScore}%
                            </span>
                        </div>
                        <a href={`/products/${alt.id}`} className="sa-alt-link">
                            Ver →
                        </a>
                    </div>
                </div>
            )}

            {/* Restart */}
            <button className="sa-restart-btn" onClick={restart}>
                <ArrowLeft size={14} /> Empezar de nuevo
            </button>
        </div>
    );
};

export default SmartAssistantSection;
