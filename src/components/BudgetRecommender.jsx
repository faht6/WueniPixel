import React, { useState, useEffect } from 'react';
import { Search, Sparkles, ArrowRight, ShoppingBag, Camera, Gamepad2, Briefcase, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import products from '../data/products.json';
import './BudgetRecommender.css';
import { calculateSellingPrice, formatCurrency, fetchExchangeRate } from '../utils/pricing';

const BudgetRecommender = ({ district }) => {
    const [budget, setBudget] = useState("");
    const [useCase, setUseCase] = useState('social'); // social, photo, gaming, work
    const [recommendation, setRecommendation] = useState(null);
    const [exchangeRate, setExchangeRate] = useState(3.85);

    useEffect(() => {
        const getRate = async () => {
            const rate = await fetchExchangeRate();
            setExchangeRate(rate);
        };
        getRate();
    }, []);

    // Auto-recomendar cuando cambia el caso de uso si ya hay presupuesto
    useEffect(() => {
        if (budget) {
            handleRecommend(useCase);
        }
    }, [useCase]);

    const handleRecommend = (selectedUseCase = useCase) => {
        if (!budget) return;

        // Parse battery helper
        const getBatteryMah = (specs) => {
            const match = specs.battery.match(/(\d+)\s*mAh/i);
            return match ? parseInt(match[1]) : 0;
        };

        let recommendedProduct = null;
        let reasonText = "";
        let analysisText = "";
        const budgetNum = parseFloat(budget);

        // 1. Calculate Dynamic Prices & Filter by Budget
        const affordableProducts = products.map(p => {
            const price = p.ebayPrice ? calculateSellingPrice(p.ebayPrice, exchangeRate) : p.price;
            return { ...p, calculatedPrice: price };
        }).filter(p => p.calculatedPrice <= budgetNum);

        // 2. Sort/Filter Logic based on Use Case
        if (affordableProducts.length > 0) {
            if (selectedUseCase === 'photo') {
                // Prioritize Pixel (Google)
                // Sort: Pixels first, then by price desc
                affordableProducts.sort((a, b) => {
                    if (a.brand === 'Google' && b.brand !== 'Google') return -1;
                    if (a.brand !== 'Google' && b.brand === 'Google') return 1;
                    return b.calculatedPrice - a.calculatedPrice;
                });
                recommendedProduct = affordableProducts[0];
                reasonText = "El rey indiscutible de la fotografía. HDR+ y Tono Real para fotos perfectas.";
                analysisText = `Para tu perfil de fotógrafo en ${district || 'tu zona'}, este Pixel es imbatible en rango dinámico y retrato.`;

            } else if (selectedUseCase === 'gaming') {
                // Prioritize Pro Max -> Then Apple (A-Series) -> Then High Price
                affordableProducts.sort((a, b) => {
                    const aIsProMax = a.name.includes('Pro Max');
                    const bIsProMax = b.name.includes('Pro Max');
                    const aIsApple = a.brand === 'Apple';
                    const bIsApple = b.brand === 'Apple';

                    if (aIsProMax && !bIsProMax) return -1;
                    if (!aIsProMax && bIsProMax) return 1;
                    if (aIsApple && !bIsApple) return -1;
                    if (!aIsApple && bIsApple) return 1;

                    return b.calculatedPrice - a.calculatedPrice;
                });
                recommendedProduct = affordableProducts[0];
                reasonText = "Potencia bruta y estabilidad. El chip ideal para renderizar gráficos complejos.";
                analysisText = `Análisis WueniPixel: En ${district || 'Lima'}, recomendamos este modelo por su frialdad bajo carga extrema y FPS estables.`;

            } else if (selectedUseCase === 'social') {
                // Prioritize Apple (Ecosystem)
                affordableProducts.sort((a, b) => {
                    if (a.brand === 'Apple' && b.brand !== 'Apple') return -1;
                    if (a.brand !== 'Apple' && b.brand === 'Apple') return 1;
                    return b.calculatedPrice - a.calculatedPrice;
                });
                recommendedProduct = affordableProducts[0];
                reasonText = "Sube historias a Instagram y TikTok con la máxima calidad de compresión.";
                analysisText = `Es el estándar para influencers en ${district || 'la ciudad'}. La cámara integrada en apps de terceros es superior.`;

            } else { // work
                // Prioritize Battery Capacity (mAh)
                affordableProducts.sort((a, b) => {
                    const batteryA = getBatteryMah(a.specs);
                    const batteryB = getBatteryMah(b.specs);
                    return batteryB - batteryA;
                });
                recommendedProduct = affordableProducts[0];
                reasonText = "Productividad non-stop. La mayor batería disponible para tu presupuesto.";
                analysisText = `Para jornadas largas en ${district || 'la región'}, priorizamos la autonomía de este equipo (${recommendedProduct?.specs?.battery}).`;
            }
        } else {
            // Fallback: Cheapest
            const cheapest = products.map(p => ({ ...p, calculatedPrice: p.ebayPrice ? calculateSellingPrice(p.ebayPrice, exchangeRate) : p.price })).sort((a, b) => a.calculatedPrice - b.calculatedPrice)[0];
            if (cheapest) {
                recommendedProduct = cheapest;
                reasonText = `Tu presupuesto es ajustado, pero este es el mejor equipo de entrada.`;
                analysisText = `Es la opción más económica que podemos enviarte a ${district || 'tu domicilio'}.`;
            }
        }

        if (recommendedProduct) {
            setRecommendation({ ...recommendedProduct, reasonText, analysisText });
        }
    };

    return (
        <section className="budget-recommender">
            <div className="recommender-card glass-card">
                <div className="recommender-intro">
                    <span className="badge-ai">Experiencia de Compra Inteligente</span>
                    <h2 className="hero-title-text">Encuentra tu <span className="highlight-gradient">Celular Ideal</span></h2>
                    <p>Cuéntanos tu presupuesto y uso principal.</p>
                </div>

                {/* USE CASE SELECTOR */}
                <div className="use-case-selector">
                    <button
                        className={`use-case-btn ${useCase === 'photo' ? 'active' : ''}`}
                        onClick={() => { setUseCase('photo'); handleRecommend('photo'); }}
                    >
                        <Camera size={18} /> Fotografía
                    </button>
                    <button
                        className={`use-case-btn ${useCase === 'gaming' ? 'active' : ''}`}
                        onClick={() => { setUseCase('gaming'); handleRecommend('gaming'); }}
                    >
                        <Gamepad2 size={18} /> Gaming
                    </button>
                    <button
                        className={`use-case-btn ${useCase === 'work' ? 'active' : ''}`}
                        onClick={() => { setUseCase('work'); handleRecommend('work'); }}
                    >
                        <Briefcase size={18} /> Trabajo
                    </button>
                    <button
                        className={`use-case-btn ${useCase === 'social' ? 'active' : ''}`}
                        onClick={() => { setUseCase('social'); handleRecommend('social'); }}
                    >
                        <Instagram size={18} /> Estilo/Redes
                    </button>
                </div>

                <div className="recommender-inputs">
                    <div className="input-wrapper">
                        <span className="currency-symbol">S/</span>
                        <input
                            type="number"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleRecommend()}
                            placeholder="Ej. 3500"
                        />
                    </div>
                    <button onClick={handleRecommend} className="btn-recommend">
                        <Sparkles size={20} />
                        ENCONTRAR MATCH
                    </button>
                </div>

                {recommendation && (
                    <div className="recommendation-result animate-fade-in">
                        <div className="rec-image-container">
                            <img src={recommendation.image} alt={recommendation.name} className="rec-image" />
                        </div>
                        <div className="rec-content">
                            <span className="match-tag">✨ Match para {useCase === 'photo' ? 'Fotografía' : useCase === 'gaming' ? 'Gaming' : useCase === 'work' ? 'Trabajo' : 'Redes'}</span>
                            <h3>{recommendation.name}</h3>
                            <p className="rec-reason">{recommendation.reasonText}</p>

                            {/* ANALYST VERDICT */}
                            <div className="analyst-verdict">
                                <p>{recommendation.analysisText}</p>
                            </div>

                            <div className="rec-specs">
                                <span>{recommendation.specs.screen}</span>
                                <span>•</span>
                                <span>{recommendation.specs.camera}</span>
                            </div>

                            <div className="rec-price">
                                {formatCurrency(recommendation.calculatedPrice)}
                                <span style={{ fontSize: '12px', color: '#50C878', display: 'block', fontWeight: '600', marginTop: '4px' }}>
                                    Precio neto al contado (Efectivo/Yape)
                                </span>
                            </div>

                            <div className="rec-actions">
                                <Link to={`/products/${recommendation.id}`} className="btn-details">
                                    Ver Detalles <ArrowRight size={16} />
                                </Link>
                                <a
                                    href={`https://wa.me/51900000000?text=${encodeURIComponent(`Hola WueniPixel, deseo adquirir el ${recommendation.name} al contado en ${district || 'mi zona'}. ¿Está disponible?`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-whatsapp-action"
                                >
                                    <ShoppingBag size={18} /> Consultar Stock Real
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default BudgetRecommender;
