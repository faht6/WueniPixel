import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, Camera, Gamepad2, Briefcase, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import './BudgetRecommender.css';
import { calculateSellingPrice, formatCurrency, fetchExchangeRate } from '../utils/pricing';

const BudgetRecommender = ({ district }) => {
    const { products } = useProducts();
    const [budget, setBudget] = useState("");
    const [useCase, setUseCase] = useState('social');
    const [recommendation, setRecommendation] = useState(null);
    const [exchangeRate, setExchangeRate] = useState(3.85);
    const [isSearching, setIsSearching] = useState(false);
    const sectionRef = useRef(null);

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

        setIsSearching(true);

        // Simulated delay for premium feel
        setTimeout(() => {
            const getBatteryMah = (specs) => {
                if (!specs || !specs.battery) return 0;
                const match = specs.battery.match(/(\d+)\s*mAh/i);
                return match ? parseInt(match[1]) : 0;
            };

            let recommendedProduct = null;
            let reasonText = "";
            let analysisText = "";
            const budgetNum = parseFloat(budget);

            const affordableProducts = products.map(p => {
                const price = p.ebayPrice ? calculateSellingPrice(p.ebayPrice, exchangeRate) : p.price;
                return { ...p, calculatedPrice: price };
            }).filter(p => p.calculatedPrice <= budgetNum);

            if (affordableProducts.length > 0) {
                if (selectedUseCase === 'photo') {
                    affordableProducts.sort((a, b) => {
                        if (a.brand === 'Google' && b.brand !== 'Google') return -1;
                        if (a.brand !== 'Google' && b.brand === 'Google') return 1;
                        return b.calculatedPrice - a.calculatedPrice;
                    });
                    recommendedProduct = affordableProducts[0];
                    reasonText = "El rey indiscutible de la fotografía. HDR+ y Tono Real para fotos perfectas.";
                    analysisText = `Para tu perfil de fotógrafo en ${district || 'tu zona'}, este equipo es imbatible en rango dinámico.`;
                } else if (selectedUseCase === 'gaming') {
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
                    analysisText = `Recomendamos este modelo por su frialdad bajo carga extrema y FPS estables.`;
                } else if (selectedUseCase === 'social') {
                    affordableProducts.sort((a, b) => {
                        if (a.brand === 'Apple' && b.brand !== 'Apple') return -1;
                        if (a.brand !== 'Apple' && b.brand === 'Apple') return 1;
                        return b.calculatedPrice - a.calculatedPrice;
                    });
                    recommendedProduct = affordableProducts[0];
                    reasonText = "Sube historias a Instagram y TikTok con la máxima calidad de compresión.";
                    analysisText = `Es el estándar para creadores de contenido. La cámara integrada en apps de terceros es superior.`;
                } else {
                    affordableProducts.sort((a, b) => {
                        const batteryA = getBatteryMah(a.specs);
                        const batteryB = getBatteryMah(b.specs);
                        return batteryB - batteryA;
                    });
                    recommendedProduct = affordableProducts[0];
                    reasonText = "Productividad non-stop. La mayor batería disponible para tu presupuesto.";
                    analysisText = `Para jornadas largas priorizamos la autonomía (${recommendedProduct?.specs?.battery || 'batería optimizada'}).`;
                }
            } else {
                const cheapest = products.map(p => ({ ...p, calculatedPrice: p.ebayPrice ? calculateSellingPrice(p.ebayPrice, exchangeRate) : p.price })).sort((a, b) => a.calculatedPrice - b.calculatedPrice)[0];
                if (cheapest) {
                    recommendedProduct = cheapest;
                    reasonText = `Tu presupuesto es ajustado, pero este es el mejor equipo de entrada.`;
                    analysisText = `Es la opción más económica disponible con garantía certificada.`;
                }
            }

            if (recommendedProduct) {
                setRecommendation({ ...recommendedProduct, reasonText, analysisText });
            }
            setIsSearching(false);
        }, 600);
    };

    const useCases = [
        { id: 'photo', label: 'Fotografía', icon: Camera, desc: 'Cámara pro' },
        { id: 'gaming', label: 'Gaming', icon: Gamepad2, desc: 'Alto rendimiento' },
        { id: 'work', label: 'Trabajo', icon: Briefcase, desc: 'Productividad' },
        { id: 'social', label: 'Redes', icon: Share2, desc: 'Contenido viral' },
    ];



    return (
        <div className="budget-recommender" ref={sectionRef}>
            <section className="br-section">
                {/* Animated Background */}
                <div className="br-bg">
                    <div className="br-orb br-orb-1"></div>
                    <div className="br-orb br-orb-2"></div>
                    <div className="br-orb br-orb-3"></div>
                    <div className="br-grid-lines"></div>
                </div>

                <div className="br-container">
                    {/* LEFT: Controls */}
                    <div className="br-left">
                        <div className="br-badge">
                            <Sparkles size={14} />
                            <span>Asistente Inteligente</span>
                        </div>

                        <h2 className="br-title">
                            Encuentra tu <br />
                            <span className="br-title-accent">Celular Ideal</span>
                        </h2>

                        <p className="br-subtitle">
                            Dinos tu presupuesto y cómo usas tu celular. Nuestro algoritmo te encontrará el match perfecto.
                        </p>

                        {/* Use Case Chips */}
                        <div className="br-chips">
                            {useCases.map(uc => (
                                <button
                                    key={uc.id}
                                    className={`br-chip ${useCase === uc.id ? 'active' : ''}`}
                                    onClick={() => { setUseCase(uc.id); setRecommendation(null); }}
                                >
                                    <uc.icon size={18} />
                                    <div className="br-chip-text">
                                        <span className="br-chip-label">{uc.label}</span>
                                        <span className="br-chip-desc">{uc.desc}</span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Budget Input */}
                        <div className="br-input-row">
                            <div className="br-input-box">
                                <span className="br-currency">S/</span>
                                <input
                                    type="number"
                                    value={budget}
                                    onChange={(e) => setBudget(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleRecommend()}
                                    placeholder="Tu presupuesto"
                                    className="br-input"
                                />
                            </div>
                            <button
                                onClick={() => handleRecommend()}
                                className={`br-search-btn ${isSearching ? 'searching' : ''}`}
                                disabled={isSearching}
                            >
                                {isSearching ? (
                                    <div className="br-spinner"></div>
                                ) : (
                                    <>
                                        <span>Encontrar Match</span>
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </div>


                    </div>

                    {/* RIGHT: Visual */}
                    <div className="br-right">
                        {recommendation ? (
                            <div className="br-result animate-pop-in">
                                <div className="br-result-glow"></div>
                                <div className="br-result-inner">
                                    <div className="br-result-header">
                                        <span className="br-match-badge">
                                            <Sparkles size={12} /> Match Perfecto
                                        </span>
                                        <button className="br-close" onClick={() => setRecommendation(null)}>×</button>
                                    </div>

                                    <div className="br-result-img">
                                        <img src={recommendation.image} alt={recommendation.name} />
                                    </div>

                                    <h3 className="br-result-name">{recommendation.name}</h3>
                                    <p className="br-result-price">{formatCurrency(recommendation.calculatedPrice)}</p>
                                    <p className="br-result-reason">{recommendation.reasonText}</p>

                                    <Link to={`/products/${recommendation.id}`} className="br-result-btn">
                                        <span>Ver Detalles</span>
                                        <ArrowRight size={18} />
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="br-hero-visual">
                                <div className="br-phone br-phone-left">
                                    <img src="/products/pixel8.jpg" alt="Google Pixel" />
                                </div>
                                <div className="br-phone br-phone-right">
                                    <img src="/products/iphone14promax_deeppurple.jpg" alt="iPhone" />
                                </div>
                                <div className="br-visual-badge">
                                    <span>VS</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BudgetRecommender;
