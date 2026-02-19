import React from 'react';
import { Package, CreditCard, MapPin, Truck, ShieldCheck, FileText } from 'lucide-react';
import './LogisticsSection.css';

const LogisticsSection = () => {
    return (
        <section className="logistics-section container">
            <div className="logistics-grid">

                {/* LOGISTICS CARD */}
                <div className="feature-card logistics-card">
                    <div className="card-header">
                        <div className="icon-box" style={{ width: '64px', height: '64px', borderRadius: '16px' }}>
                            <Truck size={32} />
                        </div>
                        <h3>Logística y Entregas</h3>
                    </div>

                    <div className="options-list">
                        <div className="option-item">
                            <div className="option-info">
                                <div className="dot accent"></div>
                                <div>
                                    <h4>Tiempo de Entrega</h4>
                                    <p>Directo desde USA: **2 a 3 semanas** desde la confirmación.</p>
                                </div>
                            </div>
                        </div>

                        <div className="option-item">
                            <div className="option-info">
                                <div className="dot accent"></div>
                                <div>
                                    <h4>Puntos de Entrega Seguros</h4>
                                    <p>Exclusivamente en **San Vicente de Cañete** (Plaza de Armas o C.C.).</p>
                                </div>
                            </div>
                        </div>

                        <div className="option-item">
                            <div className="option-info">
                                <div className="dot accent"></div>
                                <div>
                                    <h4>Garantía y Documentación</h4>
                                    <p>Emitimos **Boleta de Venta**. Soporte técnico incluido.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PAYMENT & RESERVATION CARD */}
                <div className="feature-card payment-card">
                    <div className="card-header">
                        <div className="icon-box" style={{ width: '64px', height: '64px', borderRadius: '16px' }}>
                            <CreditCard size={32} />
                        </div>
                        <h3>Sistema de Reserva</h3>
                    </div>

                    <div className="payment-options">
                        <div className="payment-option yape-premium-card">
                            <div className="payment-content">
                                <h4>Adelanto de Reserva</h4>
                                <p>Se requiere un adelanto de **S/ 50.00** para iniciar el pedido.</p>
                            </div>
                            <div className="badge-free">Obligatorio</div>
                        </div>

                        <div className="reservation-footer">
                            <p className="policy-note">
                                * El adelanto de S/ 50.00 **no es reembolsable**, ya que cubre gastos logísticos y operativos.
                            </p>
                        </div>

                        <div className="payment-option card-option">
                            <div className="payment-content">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <FileText size={16} />
                                    <h4>Formalidad total</h4>
                                </div>
                                <p>Aceptamos Yape, Plin y Transferencias.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default LogisticsSection;
