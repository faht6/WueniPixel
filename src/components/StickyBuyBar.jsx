import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { formatCurrency } from '../utils/pricing';
import './StickyBuyBar.css';

const StickyBuyBar = ({ product, price, visible, onBuy }) => {
    if (!product) return null;

    return (
        <div className={`sticky-buy-bar ${visible ? 'visible' : ''}`}>
            <div className="sticky-bar-container">
                <div className="sticky-bar-info">
                    <img src={product.image} alt={product.name} className="sticky-bar-img" />
                    <div className="sticky-bar-text">
                        <span className="sticky-product-name">{product.name}</span>
                        <span className="sticky-product-price">{formatCurrency(price)}</span>
                    </div>
                </div>
                <button className="sticky-buy-btn" onClick={onBuy}>
                    <ShoppingCart size={18} />
                    <span>Reservar</span>
                </button>
            </div>
        </div>
    );
};

export default StickyBuyBar;
