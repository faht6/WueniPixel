import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Truck, ShieldCheck, CreditCard, Battery, Smartphone } from 'lucide-react';
import './FAQSection.css';

const faqs = [
    {
        question: "¿Dónde realizan las entregas?",
        answer: "Las entregas se coordinan exclusivamente en puntos seguros de San Vicente de Cañete (Plaza de Armas o centros comerciales) previa programación.",
        icon: <Truck size={20} />
    },
    {
        question: "¿Cuál es el tiempo de espera?",
        answer: "Trabajamos mediante importación directa bajo pedido. El tiempo estimado de entrega es de aproximadamente 2 semanas tras confirmar la reserva.",
        icon: <Smartphone size={20} />
    },
    {
        question: "¿Qué garantía ofrecen?",
        answer: "Ofrecemos una garantía de 3 días (periodo de prueba técnica) para asegurar que recibas el equipo en óptimas condiciones de funcionamiento.",
        icon: <ShieldCheck size={20} />
    },
    {
        question: "¿Emiten comprobante de pago?",
        answer: "Sí, emitimos Boleta de Venta electrónica bajo el Régimen Nuevo RUS, garantizando la formalidad de tu compra.",
        icon: <CreditCard size={20} />
    },
    {
        question: "¿Aceptan mi equipo actual?",
        answer: "Contamos con un programa de renovación exclusivo para iPhone. Evaluamos tu equipo actual Apple como parte de pago (Sujeto a evaluación técnica).",
        icon: <Battery size={20} />
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
