import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Lock, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Checkout.css';

const Checkout = ({ cart, clearCart }) => {
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        card: '',
        cvv: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const total = (cart || []).reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate API call
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            clearCart();
        }, 2500);
    };

    if (isSuccess) {
        return (
            <div className="checkout-success container">
                <div className="success-card">
                    <div className="success-icon">
                        <Check size={48} strokeWidth={3} />
                    </div>
                    <h1>¡Pago Exitoso!</h1>
                    <p>Gracias por tu compra, {formData.name.split(' ')[0]}.</p>
                    <p className="order-number">Orden #WUENI-{Math.floor(Math.random() * 10000)}</p>
                    <p className="email-note">Te hemos enviado la confirmación a {formData.email}</p>

                    <Link to="/" className="btn-home">Volver al Inicio</Link>
                </div>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="checkout-empty container">
                <h2>Tu carrito está vacío</h2>
                <Link to="/products" className="btn-home">Ir a comprar</Link>
            </div>
        );
    }

    return (
        <div className="checkout-page container">
            <Link to="/cart" className="back-link">
                <ArrowLeft size={20} /> Volver al carrito
            </Link>

            <div className="checkout-grid">
                {/* FORMULARIO */}
                <div className="checkout-form-section">
                    <h1>Finalizar Compra</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Contacto</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Correo electrónico"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Envío</label>
                            <div className="row">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Nombre completo"
                                    required
                                    className="highlight"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="Ciudad"
                                    required
                                    value={formData.city}
                                    onChange={handleChange}
                                />
                            </div>
                            <input
                                type="text"
                                name="address"
                                placeholder="Dirección de entrega"
                                required
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Pago Seguro <Lock size={14} /></label>
                            <div className="card-input-wrapper">
                                <CreditCard className="card-icon" size={20} />
                                <input
                                    type="text"
                                    name="card"
                                    placeholder="Número de tarjeta (Simulado)"
                                    required
                                    maxLength="19"
                                    value={formData.card}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="row">
                                <input type="text" placeholder="MM / YY" required maxLength="5" />
                                <input
                                    type="text"
                                    name="cvv"
                                    placeholder="CVV"
                                    required
                                    maxLength="3"
                                    value={formData.cvv}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn-pay"
                            disabled={isProcessing}
                        >
                            {isProcessing ? 'Procesando...' : `Pagar S/ ${total.toFixed(2)}`}
                        </button>
                    </form>
                </div>

                {/* RESUMEN LATERAL */}
                <div className="checkout-summary">
                    {cart.map(item => (
                        <div key={item.id} className="summary-item">
                            <div className="summary-img-wrapper">
                                <img src={item.image} alt={item.name} />
                                <span className="qty-badge">{item.quantity}</span>
                            </div>
                            <div className="summary-info">
                                <p className="name">{item.name}</p>
                                {(item.selectedColor || item.selectedStorage) && (
                                    <p className="variant">
                                        {[item.selectedColor, item.selectedStorage].filter(Boolean).join(', ')}
                                    </p>
                                )}
                            </div>
                            <p className="price">S/ {(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    ))}

                    <div className="summary-totals">
                        <div className="row">
                            <span>Subtotal</span>
                            <span>S/ {total.toFixed(2)}</span>
                        </div>
                        <div className="row">
                            <span>Envío</span>
                            <span>Gratis</span>
                        </div>
                        <div className="row total">
                            <span>Total</span>
                            <span>S/ {total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
