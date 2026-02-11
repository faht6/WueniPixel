import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = ({ items, removeFromCart, updateQuantity }) => {
    // const { cart, removeFromCart, updateQuantity, totalPrice } = useCart(); // REMOVED: Context
    const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    if (items.length === 0) {
        return (
            <div className="cart-page container">
                <h1 className="cart-title">Carrito de Compras</h1>
                <div className="empty-cart">
                    <p>Tu carrito está vacío</p>
                    <Link to="/products">Explorar productos</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page container">
            <h1 className="cart-title">Carrito de Compras</h1>

            <div className="cart-grid">
                <div className="cart-items">
                    {items.map(item => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.name} className="item-image" />

                            <div className="item-details">
                                <div className="item-header">
                                    <h3>{item.name}</h3>
                                    <button
                                        className="remove-btn"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>

                                <div className="item-price">${item.price}</div>

                                <div className="item-controls">
                                    <button
                                        className="quantity-btn"
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span className="quantity">{item.quantity}</span>
                                    <button
                                        className="quantity-btn"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <h2>Resumen de Orden</h2>
                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>${totalPrice}</span>
                    </div>
                    <div className="summary-row">
                        <span>Envío</span>
                        <span>Gratis</span>
                    </div>
                    <div className="summary-row total">
                        <span>Total</span>
                        <span>S/ {totalPrice.toFixed(2)}</span>
                    </div>
                    <Link to="/checkout" className="checkout-btn" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
                        Continuar Compra
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
