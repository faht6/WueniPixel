import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Truck, ShieldCheck, CreditCard, Battery, Smartphone } from 'lucide-react';
import './FAQSection.css';

const faqs = [
    {
        question: "¿Dónde realizan las entregas?",
        answer: "Realizamos entregas inmediatas en Cañete (San Vicente, Imperial, San Luis). Para Lima y provincias, enviamos por Shalom u Olva Courier con seguro de envío incluido.",
        icon: <Truck size={20} />
    },
    {
        question: "¿Medios de Pago?",
        answer: "Aceptamos transferencias, Yape/Plin sin comisiones. También aceptamos todas las tarjetas de crédito (Visa, Mastercard, Amex) con un recargo del 5%.",
        icon: <CreditCard size={20} />
    },
    {
        question: "¿Qué garantía ofrecen?",
        answer: "Brindamos 1 año de garantía en equipos nuevos (Apple/Google) y 3 meses de garantía técnica en equipos seminuevos. Tu inversión está protegida.",
        icon: <ShieldCheck size={20} />
    },
    {
        question: "¿Cómo garantizan la batería?",
        answer: "Solo seleccionamos equipos con batería superior al 85% de vida útil real. Garantizamos que tu equipo rinda al máximo desde el primer día.",
        icon: <Battery size={20} />
    },
    {
        question: "¿Tienen tienda física?",
        answer: "Somos una Tienda 100% Online. Operamos digitalmente para ofrecerte los mejores precios del mercado sin costos de alquiler inflados. Garantizamos seguridad y confianza en cada envío.",
        icon: <Smartphone size={20} />
    }
];

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="faq-section container">
            <h2 className="faq-title">Preguntas Frecuentes</h2>

            <div className="faq-grid">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className={`faq-item ${openIndex === index ? 'open' : ''}`}
                        onClick={() => toggleFAQ(index)}
                    >
                        <div className="faq-header">
                            <div className="faq-question-group">
                                <div className="faq-icon-wrapper">
                                    {faq.icon}
                                </div>
                                <h3 className="faq-question">{faq.question}</h3>
                            </div>
                            <span className="faq-toggle-icon">
                                {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </span>
                        </div>
                        <div className="faq-body">
                            <div className="faq-answer">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQSection;
