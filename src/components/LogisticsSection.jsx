import React from 'react';
import { Package, CreditCard, MapPin, Truck } from 'lucide-react';
import './LogisticsSection.css';

const LogisticsSection = () => {
    return (
        <section className="logistics-section container">
            <div className="logistics-grid">

                {/* LOGISTICS CARD */}
                <div className="feature-card logistics-card">
                    <div className="card-header">
                        <div className="icon-box">
                            <Package size={24} />
                        </div>
                        <h3>Opciones de Entrega</h3>
                    </div>

                    <div className="options-list">
                        <div className="option-item">
                            <div className="option-info">
                                <div className="dot accent"></div>
                                <div>
                                    <h4>Delivery Local</h4>
                                    <p>San Vicente, Imperial, San Luis</p>
                                </div>
                            </div>
                            <span className="price">S/ 5.00</span>
                        </div>

                        <div className="option-item">
                            <div className="option-info">
                                <div className="dot gray"></div>
                                <div>
                                    <h4>Envío Nacional</h4>
                                    <p>Shalom / Olva Courier</p>
                                </div>
                            </div>
                            <span className="price-text">Varía destino</span>
                        </div>
                    </div>
                </div>

                {/* PAYMENT CARD */}
                <div className="feature-card payment-card">
                    <div className="card-header">
                        <div className="icon-box">
                            <CreditCard size={24} />
                        </div>
                        <h3>Métodos de Pago</h3>
                    </div>

                    <div className="payment-options">
                        <div className="payment-option yape-option">
                            <div className="payment-content">
                                <h4>Yape / Transferencia</h4>
                                <p>Sin comisiones adicionales</p>
                            </div>
                            <div className="badge-free">S/ 0 Comisión</div>
                        </div>

                        <div className="payment-option card-option">
                            <div className="payment-content">
                                <h4>Tarjeta de Crédito</h4>
                                <p>Visa, Mastercard, Amex</p>
                            </div>
                            <div className="badge-fee">+5% Recargo</div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default LogisticsSection;
