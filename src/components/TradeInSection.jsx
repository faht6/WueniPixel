import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Smartphone, Battery, Unlock } from 'lucide-react';
import './TradeInSection.css';

const TradeInSection = () => {
    const requirements = [
        { icon: <Smartphone size={18} />, text: "Pantalla e integridad física impecable (sin rajaduras)." },
        { icon: <Battery size={18} />, text: "Salud de batería mínima de 85%." },
        { icon: <Unlock size={18} />, text: "Libre de operador (Unlocked) y sin bloqueos de iCloud." },
        { icon: <CheckCircle2 size={18} />, text: "Se acepta con o sin caja" },
    ];

    return (
        <section className="trade-in-section">
            <div className="container">
                <div className="trade-in-card">
                    <div className="trade-in-header">
                        <h2 className="section-tag" style={{ color: 'white' }}>Programa de Renovación</h2>
                        <h1 className="trade-title">Actualiza tu iPhone</h1>
                        <p className="trade-subtitle">
                            ¿Tienes un iPhone? Lo aceptamos como parte de pago para tu próximo equipo.
                            <br /><span>*Especialmente válido para teléfonos Apple (sujeto a evaluación técnica).</span>
                        </p>
                    </div>

                    <div className="trade-grid">
                        <div className="trade-requirements">
                            <h3>Requisitos de Evaluación</h3>
                            <ul className="req-list">
                                {requirements.map((req, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <div className="req-icon">{req.icon}</div>
                                        <span>{req.text}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        <div className="trade-cta-box">
                            <div className="cta-content">
                                <h3>Cotiza tu equipo hoy</h3>
                                <p>Envíanos fotos y detalles de tu iPhone para una pre-valoración inmediata vía WhatsApp.</p>
                                <a href="https://wa.me/51924614605" className="btn-trade-wa">
                                    Iniciar Evaluación
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TradeInSection;
