import React from 'react';
import './BrandMarquee.css';
import { Apple, Smartphone, ShieldCheck, Truck, Zap } from 'lucide-react';

const BrandMarquee = () => {
    const brands = [
        { name: "Apple", icon: <Apple size={24} /> },
        { name: "Google Pixel", icon: <Smartphone size={24} /> },
        { name: "Garantía Total", icon: <ShieldCheck size={24} /> },
        { name: "Envío Gratis", icon: <Truck size={24} /> },
        { name: "Servicio Técnico", icon: <Zap size={24} /> },
        { name: "Apple", icon: <Apple size={24} /> },
        { name: "Google Pixel", icon: <Smartphone size={24} /> },
        { name: "Garantía Total", icon: <ShieldCheck size={24} /> },
        { name: "Envío Gratis", icon: <Truck size={24} /> },
        { name: "Servicio Técnico", icon: <Zap size={24} /> },

        { name: "Apple", icon: <Apple size={24} /> },
        { name: "Google Pixel", icon: <Smartphone size={24} /> },
        { name: "Garantía Total", icon: <ShieldCheck size={24} /> },
        { name: "Envío Gratis", icon: <Truck size={24} /> },
        { name: "Servicio Técnico", icon: <Zap size={24} /> },

        { name: "Apple", icon: <Apple size={24} /> },
        { name: "Google Pixel", icon: <Smartphone size={24} /> },
        { name: "Garantía Total", icon: <ShieldCheck size={24} /> },
        { name: "Envío Gratis", icon: <Truck size={24} /> },
        { name: "Servicio Técnico", icon: <Zap size={24} /> },
    ];

    return (
        <div className="brand-marquee-container">
            <div className="marquee-track">
                {brands.map((brand, index) => (
                    <div className="marquee-item" key={index}>
                        <span className="marquee-icon">{brand.icon}</span>
                        <span className="marquee-text">{brand.name}</span>
                    </div>
                ))}
                {/* Duplicate for seamless loop */}
                {brands.map((brand, index) => (
                    <div className="marquee-item" key={`dup-${index}`}>
                        <span className="marquee-icon">{brand.icon}</span>
                        <span className="marquee-text">{brand.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BrandMarquee;
