import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle, CreditCard, Check } from 'lucide-react';
import locationsData from '../data/locations.json';
import './Checkout.css';

const Checkout = ({ cart, clearCart }) => {
    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');

    // Location cascading selects
    const [departments, setDepartments] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        whatsapp: '',
        department: '',
        province: '',
        district: '',
        paymentMethod: 'Yape/Plin'
    });

    useEffect(() => {
        setDepartments(Object.keys(locationsData).sort((a, b) => a.localeCompare(b)));
    }, []);

    const total = (cart || []).reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'department') {
            setFormData({ ...formData, department: value, province: '', district: '' });
            if (value && locationsData[value]) {
                setProvinces(Object.keys(locationsData[value]).sort((a, b) => a.localeCompare(b)));
            } else {
                setProvinces([]);
            }
            setDistricts([]);
        } else if (name === 'province') {
            setFormData({ ...formData, province: value, district: '' });
            if (value && locationsData[formData.department] && locationsData[formData.department][value]) {
                setDistricts(locationsData[formData.department][value].sort((a, b) => a.localeCompare(b)));
            } else {
                setDistricts([]);
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Generate order number
        const ordNum = `WUENI-${Math.floor(Math.random() * 90000) + 10000}`;
        setOrderNumber(ordNum);

        // Build product list for WhatsApp
        const productList = cart.map(item => {
            const variant = [item.selectedColor, item.selectedStorage].filter(Boolean).join(', ');
            return `• ${item.name}${variant ? ` (${variant})` : ''} x${item.quantity} — S/ ${(item.price * item.quantity).toFixed(2)}`;
        }).join('\n');

        const locationString = `${formData.district}, ${formData.province} (${formData.department})`;

        const message = `🛒 *Pedido ${ordNum}*\n\n` +
            `*Cliente:* ${formData.name}\n` +
            `*WhatsApp:* ${formData.whatsapp}\n` +
            `*Ubicación:* ${locationString}\n` +
            `*Método de pago:* ${formData.paymentMethod}\n\n` +
            `*Productos:*\n${productList}\n\n` +
            `*Total: S/ ${total.toFixed(2)}*\n\n` +
            `¿Está disponible para envío?`;

        const whatsappUrl = `https://wa.me/51941126123?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');

        setIsSuccess(true);
        clearCart();
    };

    // Success screen
    if (isSuccess) {
        return (
            <div className="checkout-success container">
                <div className="success-card">
                    <div className="success-icon">
                        <Check size={48} strokeWidth={3} />
                    </div>
                    <h1>¡Pedido Enviado!</h1>
                    <p>Gracias, {formData.name.split(' ')[0]}. Tu pedido fue enviado por WhatsApp.</p>
                    <p className="order-number">Orden #{orderNumber}</p>
                    <p className="email-note">Te responderemos por WhatsApp a la brevedad para confirmar disponibilidad y coordinar el envío.</p>
                    <Link to="/" className="btn-home">Volver al Inicio</Link>
                </div>
            </div>
        );
    }

    // Empty cart
    if (!cart || cart.length === 0) {
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
                {/* FORMULARIO DE RESERVA */}
                <div className="checkout-form-section">
                    <h1>Finalizar Pedido</h1>
                    <p className="checkout-subtitle">Completa tus datos para confirmar disponibilidad y envío por WhatsApp.</p>

                    <form onSubmit={handleSubmit}>
                        {/* Nombre */}
                        <div className="form-group">
                            <label>Nombre Completo</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Ej. Juan Pérez"
                                required
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        {/* WhatsApp */}
                        <div className="form-group">
                            <label>WhatsApp Contacto</label>
                            <input
                                type="tel"
                                name="whatsapp"
                                placeholder="Ej. 999 000 111"
                                required
                                value={formData.whatsapp}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Ubicación */}
                        <div className="form-group">
                            <label>Ubicación de Envío</label>
                            <div className="location-row">
                                <select name="department" value={formData.department} onChange={handleChange} required>
                                    <option value="">Departamento</option>
                                    {departments.map(dept => (
                                        <option key={dept} value={dept}>{dept}</option>
                                    ))}
                                </select>
                                <select name="province" value={formData.province} onChange={handleChange} disabled={!formData.department} required>
                                    <option value="">Provincia</option>
                                    {provinces.map(prov => (
                                        <option key={prov} value={prov}>{prov}</option>
                                    ))}
                                </select>
                                <select name="district" value={formData.district} onChange={handleChange} disabled={!formData.province} required>
                                    <option value="">Distrito</option>
                                    {districts.map(dist => (
                                        <option key={dist} value={dist}>{dist}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Método de Pago */}
                        <div className="form-group">
                            <label>Método de Pago</label>
                            <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                                <option value="Yape/Plin">Yape / Plin (Digital)</option>
                                <option value="Efectivo">Efectivo contraentrega (Solo Lima/Cañete)</option>
                                <option value="Transferencia">Transferencia Bancaria</option>
                                <option value="Tarjeta de Crédito">Tarjeta de Crédito (+5%)</option>
                            </select>
                        </div>

                        <button type="submit" className="btn-pay">
                            <MessageCircle size={20} />
                            Confirmar pedido por WhatsApp
                        </button>
                        <p className="secure-note"><CreditCard size={12} /> Pagos 100% Seguros · Envío coordinado por WhatsApp</p>
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
