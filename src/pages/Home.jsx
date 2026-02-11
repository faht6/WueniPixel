import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';
import BudgetRecommender from '../components/BudgetRecommender';
import BrandMarquee from '../components/BrandMarquee';
import CameraComparison from '../components/CameraComparison';
import LogisticsSection from '../components/LogisticsSection';
import FAQSection from '../components/FAQSection';
import products from '../data/products.json';
import './Home.css';

const Home = ({ addToCart, district }) => {
    const featuredProducts = products.filter(p => p.featured);

    return (
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
                    <div className="catalog-tabs">
                        <Link to="/products" className="tab-pill active">Todos</Link>
                        <Link to="/products?brand=Apple" className="tab-pill">iPhone</Link>
                        <Link to="/products?brand=Google" className="tab-pill">Pixel</Link>
                    </div>
                </div>

                <div className="product-grid">
                    {featuredProducts.slice(0, 4).map((product, index) => (
                        <Reveal key={product.id} delay={index * 0.1}>
                            <ProductCard product={product} addToCart={addToCart} />
                        </Reveal>
                    ))}
                </div>

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
    );
};

export default Home;
