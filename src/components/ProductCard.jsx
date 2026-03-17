import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Zap, GitCompare } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { calculateSellingPrice, formatCurrency, fetchExchangeRate } from '../utils/pricing';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import './ProductCard.css';

const ProductCard = ({ product, addToCart, addToCompare = () => { }, compareList = [], onQuickView }) => {
  const [price, setPrice] = useState(product.price);
  const [showTooltip, setShowTooltip] = useState(false);
  const cardRef = useRef(null);

  // Motion Values for 3D Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  // Glare effect position
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setShowTooltip(false);
  };

  useEffect(() => {
    const initPrice = async () => {
      if (product.price > 0) {
        setPrice(product.price);
      } else if (product.ebayPrice) {
        const rate = await fetchExchangeRate();
        const calculated = calculateSellingPrice(product.ebayPrice, rate);
        setPrice(calculated);
      }
    };
    initPrice();
  }, [product.price, product.ebayPrice]);

  // Calculate discount price (5% off for transfer)
  const discountPrice = price > 0 ? Math.round(price * 0.95) : 0;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="product-card"
    >
      {/* Glare Overlay */}
      <motion.div
        className="card-glare"
        style={{
          background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.2) 0%, transparent 60%)`,
        }}
      />

      <Link to={`/products/${product.id}`} className="card-image-container" style={{ transform: "translateZ(30px)" }}>
        <img
          src={product.image}
          alt={product.name}
          className={`card-image ${product.name.includes('17e') ? 'scale-17e' : ''}`}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/400x400/1e1e2e/FFF?text=No+Image';
          }}
        />

        {/* Badge: 5% OFF Transfer (top-left) */}
        <span className="badge-discount">5% OFF · Transferencia</span>



        {/* Existing badges */}
        {product.featured && <span className="badge badge-featured-pulse">Destacado</span>}
        {product.condition === 'used' && (
          <div className="badge-battery">
            <Zap size={10} color="#50C878" fill="#50C878" />
            <span>Batería {product.battery_health || product.specs?.battery || '85%+'}</span>
          </div>
        )}
      </Link>

      <div className="card-content" style={{ transform: "translateZ(20px)" }}>
        <span className="card-brand">{product.brand}</span>
        <Link to={`/products/${product.id}`}>
          <h3 className="card-title">{product.name}</h3>
        </Link>

        {/* Pricing: Base Price as main + Discounted for transfer */}
        <div
          className="card-price"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {price > 0 && (
            <span className="price-soles">
              {product.storagePrices ? 'Desde ' : ''}{formatCurrency(price)}
            </span>
          )}
          <span className="price-transfer-label">
            {formatCurrency(discountPrice)} pagando por transferencia
          </span>

          {/* Tooltip on hover */}
          {showTooltip && (
            <div className="price-tooltip">
              Paga por Yape, BCP, Interbank o cualquier banco
            </div>
          )}
        </div>

        <div className="card-actions">
          <button
            className="btn-view-details"
            onClick={(e) => {
              e.preventDefault();
              if (onQuickView) onQuickView(product);
            }}
            title="Vista Rápida"
          >
            <Eye size={20} />
          </button>

          <button
            className="btn-compare-toggle"
            onClick={(e) => {
              e.preventDefault();
              addToCompare(product);
            }}
            disabled={compareList.find(p => p.id === product.id)}
            title="Comparar"
          >
            <GitCompare size={20} />
          </button>

          <a
            href={`https://wa.me/51941126123?text=${encodeURIComponent(`Hola WueniPixel, quiero información del ${product.name} que vi en la web.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-add-cart btn-pulse"
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
          >
            <ShoppingCart size={18} /> Reservar
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
