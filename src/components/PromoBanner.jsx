import React, { useState } from 'react';
import { X } from 'lucide-react';
import './PromoBanner.css';

const PromoBanner = () => {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    return (
        <div className="announcement-bar">
            <div className="announcement-content container">
                <p>
                    🚚 Envíos <strong>GRATIS</strong> a todo el Perú en todos los pedidos
                    <span className="announcement-divider">·</span>
                    💳 <strong>5% OFF</strong> pagando por transferencia
                </p>
            </div>
            <button
                className="announcement-close"
                onClick={() => setVisible(false)}
                aria-label="Cerrar anuncio"
            >
                <X size={14} />
            </button>
        </div>
    );
};

export default PromoBanner;
