import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { useProducts } from '../context/ProductContext';
import BudgetRecommender from '../components/BudgetRecommender';
import BrandMarquee from '../components/BrandMarquee';
import CameraComparison from '../components/CameraComparison';
import LogisticsSection from '../components/LogisticsSection';
import FAQSection from '../components/FAQSection';
import HeroSection from '../components/HeroSection';
import ValuePillars from '../components/ValuePillars';
import ProductList from './ProductList';
import './Home.css';

const Home = ({ addToCart, district, addToCompare, compareList }) => {
    return (
        <PageTransition>
            <div className="home-container">
                {/* 1. NEW HERO SECTION */}
                <HeroSection />

                {/* 2. VALUE PILLARS */}
                <ValuePillars />

                {/* 3. ORIGINAL BUDGET RECOMMENDER (Renamed/Contextualized) */}
                <section className="bg-white py-4">
                    <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <p style={{ color: '#666', marginBottom: '1rem' }}>¿Indeciso? Déjanos ayudarte.</p>
                        <BudgetRecommender district={district} />
                    </div>
                </section>

                {/* TRUST MARQUEE */}
                <BrandMarquee />

                {/* 4. MAIN CATALOG EMBEDDED */}
                <section id="catalog" className="catalog-section" style={{ background: '#F5F5F5', paddingBottom: '4rem' }}>
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
                        />
                    </div>
                </section>

                {/* 5. CAMERA COMPARISON */}
                <CameraComparison />

                {/* 6. LOGISTICS & PAYMENTS */}
                <LogisticsSection />

                {/* 7. FAQ SECTION */}
                <FAQSection />
            </div>
        </PageTransition>
    );
};

export default Home;
