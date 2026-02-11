import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { calculateSellingPrice, formatCurrency, fetchExchangeRate } from '../utils/pricing';
import './ProductCard.css';

const ProductCard = ({ product, addToCart }) => {
  const [price, setPrice] = useState(product.price);

  useEffect(() => {
    const initPrice = async () => {
      if (product.ebayPrice) {
        const rate = await fetchExchangeRate();
        const calculated = calculateSellingPrice(product.ebayPrice, rate);
        setPrice(calculated);
      }
    };
    initPrice();
  }, [product.ebayPrice]);

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="card-image-container">
        <img src={product.image} alt={product.name} className="card-image" />
        {product.featured && <span className="badge">Destacado</span>}
        {product.condition === 'used' && (
          <div className="badge-battery">
            <Zap size={10} color="#50C878" fill="#50C878" />
            <span>Batería 85%+</span>
          </div>
        )}
      </Link>

      <div className="card-content">
        <span className="card-brand">{product.brand}</span>
        <Link to={`/products/${product.id}`}>
          <h3 className="card-title">{product.name}</h3>
        </Link>

        <div className="card-price reverse-price">
          <span className="price-soles">{formatCurrency(price)}</span>
          <span className="price-neto-card">Precio neto al contado</span>
        </div>

        <div className="card-actions">
          <Link to={`/products/${product.id}`} className="btn-view-details">
            <Eye size={20} />
          </Link>
          <a
            href={`https://wa.me/51900000000?text=${encodeURIComponent(`Hola WueniPixel, deseo adquirir el ${product.name} al contado. ¿Está disponible?`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-add-cart"
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
          >
            <ShoppingCart size={18} /> Consultar
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
