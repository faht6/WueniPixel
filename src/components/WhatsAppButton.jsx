import React from 'react';
import { MessageCircle } from 'lucide-react';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
    const phoneNumber = "51999999999"; // Replace with real number
    const message = "Hola, estoy interesado en un equipo.";

    const handleClick = () => {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="whatsapp-float" onClick={handleClick}>
            <div className="whatsapp-icon">
                <MessageCircle size={32} />
            </div>
            <span className="whatsapp-text">Chat de Ventas</span>
            <span className="whatsapp-notification-dot"></span>
        </div>
    );
};

export default WhatsAppButton;
