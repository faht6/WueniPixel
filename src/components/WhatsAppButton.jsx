import React from 'react';
import { MessageCircle } from 'lucide-react';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
    const phoneNumber = "51999999999"; // Replace with real number
    const message = "Hola, estoy interesado en un equipo.";

    return (
        <a
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-float"
            aria-label="Chat de WhatsApp"
        >
            <div className="whatsapp-icon-container">
                <MessageCircle size={28} />
            </div>
            <div className="whatsapp-label">
                <span className="whatsapp-title">WhatsApp</span>
                <span className="whatsapp-subtitle">Chat de Ventas</span>
            </div>
            <span className="whatsapp-notification-dot"></span>
        </a>
    );
};

export default WhatsAppButton;
