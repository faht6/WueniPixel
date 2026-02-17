import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Parallax, EffectCreative } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-creative';
import './HeroCarousel.css';

const HeroCarousel = () => {
    const slides = [
        {
            id: 1,
            title: "iPhone 16 Pro",
            subtitle: "Diseño en Titanio. Potencia A18 Pro.",
            description: "La máxima expresión de tecnología Apple, ahora disponible en Cañete con entrega inmediata.",
            image: "/products/iphone16pro_titanionegro.jpg", // Ensure this path exists or use a fallback
            cta: "Ver Colección",
            link: "/products?brand=Apple",
            theme: "dark"
        },
        {
            id: 2,
            title: "Google Pixel 9",
            subtitle: "La IA de Google en tus manos.",
            description: "Fotografía computacional de otro nivel y la experiencia Android más pura.",
            image: "/products/iphone15_blue.jpg", // Placeholder until we have a pixel hero, or use generic
            cta: "Descubrir Pixel",
            link: "/products?brand=Google",
            theme: "light"
        },
        {
            id: 3,
            title: "Garantía WueniPixel",
            subtitle: "Compra local, soporte real.",
            description: "Olvídate de las esperas. Equipos Grado A+ con garantía directa en San Vicente y alrededores.",
            image: "/products/iphone15promax_naturaltitanium.jpg",
            cta: "Conocer Más",
            link: "/info",
            theme: "dark"
        }
    ];

    return (
        <div className="hero-carousel-wrapper">
            <Swiper
                modules={[Autoplay, Pagination, Parallax, EffectCreative]}
                spaceBetween={0}
                slidesPerView={1}
                speed={1000}
                parallax={true}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true
                }}
                effect={'creative'}
                creativeEffect={{
                    prev: {
                        shadow: true,
                        translate: [0, 0, -400],
                    },
                    next: {
                        translate: ['100%', 0, 0],
                    },
                }}
                className="hero-swiper"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id} className={`slide-theme-${slide.theme}`}>
                        <div className="slide-content container">
                            <div className="text-content" data-swiper-parallax="-300">
                                <span className="slide-subtitle">{slide.subtitle}</span>
                                <h2 className="slide-title">{slide.title}</h2>
                                <p className="slide-desc">{slide.description}</p>
                                <Link to={slide.link} className="slide-cta btn-primary">
                                    {slide.cta}
                                </Link>
                            </div>
                            <div className="image-content" data-swiper-parallax="-100">
                                <div className="hero-image-wrapper">
                                    <img src={slide.image} alt={slide.title} className="hero-image" />
                                    <div className="hero-glow"></div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HeroCarousel;
