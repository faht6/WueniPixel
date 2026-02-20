import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { useProducts } from '../context/ProductContext';
import BudgetRecommender from '../components/BudgetRecommender';
import BrandMarquee from '../components/BrandMarquee';
import BrandComparison from '../components/BrandComparison';
import LogisticsSection from '../components/LogisticsSection';
import FAQSection from '../components/FAQSection';
import HeroSection from '../components/HeroSection';
import ValuePillars from '../components/ValuePillars';
import AboutSection from '../components/AboutSection';
import TradeInSection from '../components/TradeInSection';
import ProductList from './ProductList';
import './Home.css';

const Home = ({ addToCart, district, addToCompare, compareList }) => {
    return (
        <PageTransition>
            <div className="home-container">
                {/* 1. NEW HERO SECTION */}
                <HeroSection />

                {/* 2. ABOUT US (NEW) */}
                <AboutSection />

                {/* 3. VALUE PILLARS */}
                <ValuePillars />

                {/* 3. ORIGINAL BUDGET RECOMMENDER (Renamed/Contextualized) */}
                <section className="recommender-section" style={{ padding: '4rem 0' }}>
                    <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>¿Indeciso? Déjanos ayudarte.</p>
                        <BudgetRecommender district={district} />
                    </div>
                </section>

                {/* TRUST MARQUEE */}
                <BrandMarquee />

                {/* 4. MAIN CATALOG EMBEDDED */}
                <section id="catalog" className="catalog-section" style={{ background: 'var(--color-background)', paddingBottom: '4rem' }}>
                    <div className="container" style={{ paddingTop: '4rem' }}>
                        <div className="section-header center" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <h2 className="section-title" style={{ fontSize: '2.5rem', fontWeight: 800 }}>Nuestro Catálogo</h2>
                            <p className="section-subtitle">Explora la colección completa en San Vicente.</p>
                        </div>
                        <ProductList
                            addToCart={addToCart}
                            addToCompare={addToCompare}
                            compareList={compareList}
                            isEmbedded={true}
                            featuredSeries={['iPhone 17', 'iPhone Air', 'iPhone 13', 'Pixel 10', 'Pixel 7']}
                        />
                        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                            <Link
                                to="/products"
                                className="btn-buy-now"
                                style={{
                                    padding: '12px 24px',
                                    textDecoration: 'none',
                                    backgroundColor: 'transparent',
                                    border: '2px solid #800020',
                                    color: '#800020'
                                }}
                            >
                                Ver todos los modelos
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 5. BRAND COMPARISON (iPhone vs Pixel) */}
                <BrandComparison />

                {/* 5.5 RENEWAL PROGRAM (NEW) */}
                <TradeInSection />

                {/* 6. LOGISTICS & PAYMENTS */}
                <LogisticsSection />

                {/* 7. FAQ SECTION */}
                <FAQSection />
            </div>
        </PageTransition>
    );
};

export default Home;
