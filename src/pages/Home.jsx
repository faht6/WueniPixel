import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';
import PageTransition from '../components/PageTransition';
import { useProducts } from '../context/ProductContext';
import BudgetRecommender from '../components/BudgetRecommender';
import BrandMarquee from '../components/BrandMarquee';
import CameraComparison from '../components/CameraComparison';
import LogisticsSection from '../components/LogisticsSection';
import FAQSection from '../components/FAQSection';
import './Home.css';

const Home = ({ addToCart, district, addToCompare, compareList }) => {
    const { products, loading } = useProducts();
    const featuredProducts = products.filter(p => p.featured).slice(0, 4);

    return (
        <PageTransition>
            <div className="home-container">
                {/* 1. HERO SECTION: SMART MATCH (Budget Recommender) */}
                <section className="hero">
                    <Reveal width="100%">
                        <BudgetRecommender district={district} />
                    </Reveal>
                </section>

                {/* TRUST MARQUEE */}
                <BrandMarquee />

                {/* 2. CATALOG PREVIEW */}
                <section className="featured-section container">
                    <div className="catalog-header-flex">
                        <div className="catalog-title-group">
                            <h2 className="section-title">Explora el Catálogo</h2>
                            <p className="section-subtitle">Dispositivos premium seleccionados para ti.</p>
                        </div>
                        <div className="section-header">
                            <h2>🔥 Destacados de la Semana</h2>
                            <Link to="/products" className="view-all-link">Ver todo <ArrowRight size={16} /></Link>
                        </div>
                    </div>

                    {loading ? (
                        <div className="loading-state">Cargando destacados...</div>
                    ) : (
                        <div className="product-grid">
                            {featuredProducts.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    addToCart={addToCart}
                                    addToCompare={addToCompare}
                                    compareList={compareList}
                                />
                            ))}
                        </div>
                    )}

                    {/* TRUST BAR */}
                    <div className="start-trust-bar">
                        <p>🛡️ Garantía WueniPixel: 3 meses en seminuevos | 1 año oficial en nuevos (Apple/Google)</p>
                    </div>
                </section>

                {/* 4. CAMERA COMPARISON */}
                <Reveal width="100%">
                    <CameraComparison />
                </Reveal>

                {/* 5. LOGISTICS & PAYMENTS */}
                <Reveal width="100%">
                    <LogisticsSection />
                </Reveal>

                {/* 6. FAQ SECTION */}
                <Reveal width="100%">
                    <FAQSection />
                </Reveal>
            </div>
        </PageTransition>
    );
};

export default Home;
