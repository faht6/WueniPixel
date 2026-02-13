import React, { useState, useEffect } from 'react';
import { Search, Sparkles, ArrowRight, ShoppingBag, Camera, Gamepad2, Briefcase, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import './BudgetRecommender.css';
import { calculateSellingPrice, formatCurrency, fetchExchangeRate } from '../utils/pricing';

const BudgetRecommender = ({ district }) => {
    const { products } = useProducts();
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

    // Hero Images (Hardcoded for aesthetics, referencing existing assets)
    const heroImages = {
        pixel: "/products/pixel8pro.jpg",
        iphone: "/products/iphone15promax.jpg"
    };

    return (
        <section className="hero-section">
            <div className="hero-background-aurora"></div>

            <div className="hero-container">
                {/* LEFT COLUMN: Search & Text */}
                <div className="hero-content">
                    <div className="hero-badge">
                        <Sparkles size={14} />
                        <span>Nueva Generación 2025</span>
                    </div>

                    <h1 className="hero-title">
                        Encuentra tu <br />
                        <span className="text-gradient">Celular Ideal</span>
                    </h1>

                    <p className="hero-subtitle">
                        Súmate a la economía circular con tecnología premium certificada.
                    </p>

                    {/* USE CASE SELECTOR */}
                    <div className="hero-selector-group">
                        <button
                            className={`hero-chip ${useCase === 'photo' ? 'active' : ''}`}
                            onClick={() => { setUseCase('photo'); setRecommendation(null); }}
                        >
                            <Camera size={18} /> Fotografía
                        </button>
                        <button
                            className={`hero-chip ${useCase === 'gaming' ? 'active' : ''}`}
                            onClick={() => { setUseCase('gaming'); setRecommendation(null); }}
                        >
                            <Gamepad2 size={18} /> Gaming
                        </button>
                        <button
                            className={`hero-chip ${useCase === 'work' ? 'active' : ''}`}
                            onClick={() => { setUseCase('work'); setRecommendation(null); }}
                        >
                            <Briefcase size={18} /> Trabajo
                        </button>
                        <button
                            className={`hero-chip ${useCase === 'social' ? 'active' : ''}`}
                            onClick={() => { setUseCase('social'); setRecommendation(null); }}
                        >
                            <Instagram size={18} /> Estilo
                        </button>
                    </div>

                    {/* INPUTS */}
                    <div className="hero-search-box">
                        <div className="hero-input-wrapper">
                            <span className="currency-prefix">S/</span>
                            <input
                                type="number"
                                value={budget}
                                onChange={(e) => setBudget(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleRecommend()}
                                placeholder="Ej. 3500"
                                className="hero-budget-input"
                            />
                        </div>
                        <button onClick={() => handleRecommend()} className="hero-search-btn">
                            ENCONTRAR MATCH
                        </button>
                    </div>
                </div>

                {/* RIGHT COLUMN: VISUALS */}
                <div className="hero-visuals">
                    {recommendation ? (
                        // RESULT CARD (Replaces Phones)
                        <div className="hero-result-card animate-pop-in">
                            <div className="result-header">
                                <span className="match-badge">✨ Match Perfecto</span>
                                <button className="close-result" onClick={() => setRecommendation(null)}>×</button>
                            </div>

                            <div className="result-img-wrapper">
                                <img src={recommendation.image} alt={recommendation.name} />
                            </div>

                            <h3>{recommendation.name}</h3>
                            <p className="result-price">{formatCurrency(recommendation.calculatedPrice)}</p>

                            <p className="result-reason">{recommendation.reasonText}</p>

                            <div className="result-actions">
                                <Link to={`/products/${recommendation.id}`} className="btn-result-view">
                                    Ver Detalles
                                </Link>
                            </div>
                        </div>
                    ) : (
                        // SINGLE HERO IMAGE (User Provided)
                        <div className="hero-single-image-container">
                            <img src="/hero-devices.png" alt="Premium Devices" className="hero-main-image" />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default BudgetRecommender;
