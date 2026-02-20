import React, { useState, useEffect } from 'react';
import { X, MessageCircle, MapPin, CreditCard } from 'lucide-react';
import locationsData from '../data/locations.json';
import './ReservationModal.css';

const ReservationModal = ({ isOpen, onClose, product, selectedColor, selectedStorage }) => {
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

    if (!isOpen) return null;

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

        // Construct Dynamic WhatsApp Message
        const locationString = `${formData.district}, ${formData.province} (${formData.department})`;
        const message = `Hola WueniPixel, quiero reservar el ${product.name} de ${selectedStorage || 'N/A'} en ${selectedColor || 'N/A'}. Estoy en ${locationString} y pagaré con ${formData.paymentMethod}. ¿Está disponible?`;

        const whatsappUrl = `https://wa.me/51941126123?text=${encodeURIComponent(message)}`;

        // Open WhatsApp
        window.open(whatsappUrl, '_blank');

        // Confirm visually and close
        onClose(true); // true indicates success
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content animate-slide-up">
                <button className="modal-close" onClick={() => onClose(false)}>
                    <X size={24} />
                </button>

                <h2 className="modal-title">Reserva tu {product.name}</h2>
                <p className="modal-subtitle">Completa tus datos para confirmar disponibilidad y envío.</p>

                <form onSubmit={handleSubmit} className="reservation-form">
                    <div className="form-row">
                        <div className="form-group full-width">
                            <label>Nombre Completo</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Ej. Juan Pérez"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>WhatsApp Contacto</label>
                        <input
                            type="tel"
                            name="whatsapp"
                            value={formData.whatsapp}
                            onChange={handleChange}
                            required
                            placeholder="Ej. 999 000 111"
                        />
                    </div>

                    <div className="location-group">
                        <label style={{ gridColumn: '1 / -1', fontSize: '13px', fontWeight: '600', color: '#1D1D1F' }}>Ubicación de Envío</label>

                        <div className="form-group">
                            <select name="department" value={formData.department} onChange={handleChange} required>
                                <option value="">Departamento</option>
                                {departments.map(dept => (
                                    <option key={dept} value={dept}>{dept}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <select name="province" value={formData.province} onChange={handleChange} disabled={!formData.department} required>
                                <option value="">Provincia</option>
                                {provinces.map(prov => (
                                    <option key={prov} value={prov}>{prov}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <select name="district" value={formData.district} onChange={handleChange} disabled={!formData.province} required>
                                <option value="">Distrito</option>
                                {districts.map(dist => (
                                    <option key={dist} value={dist}>{dist}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Método de Pago</label>
                        <div className="payment-options">
                            <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                                <option value="Yape/Plin">Yape / Plin (Digital)</option>
                                <option value="Efectivo">Efectivo contraentrega (Solo Lima/Cañete)</option>
                                <option value="Transferencia">Transferencia Bancaria</option>
                                <option value="Tarjeta de Crédito">Tarjeta de Crédito (+5% Niubiz)</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" className="btn-confirm-reservation">
                        Confirmar reserva por WhatsApp <MessageCircle size={18} style={{ marginLeft: '8px' }} />
                    </button>
                    <p className="secure-badge"><CreditCard size={12} /> Pagos 100% Seguros</p>
                </form>
            </div>
        </div>
    );
};

export default ReservationModal;
