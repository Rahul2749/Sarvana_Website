import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        {product.badge && (
          <span className={`product-badge badge-${product.badge}`}>
            {product.badge}
          </span>
        )}
        <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
        <div className="product-actions-overlay">
          <Button variant="primary" size="sm" className="add-to-cart-btn">
            Quick Add
          </Button>
        </div>
      </div>
      
      <div className="product-info">
        <div className="product-meta">
          <span className="product-category">{product.category}</span>
          <span className="product-weight">{product.weight}</span>
        </div>
        
        <Link to={`/products/${product.id}`} className="product-title-link">
          <h3 className="product-name">{product.name}</h3>
        </Link>
        
        <div className="product-rating">
          <span className="stars">
            {"★".repeat(Math.floor(product.rating))}
            {product.rating % 1 !== 0 ? "½" : ""}
            <span className="stars-empty">{"★".repeat(5 - Math.ceil(product.rating))}</span>
          </span>
          <span className="review-count">({product.reviews})</span>
        </div>
        
        <div className="product-bottom">
          <span className="product-price">₹{product.price}</span>
          <Button variant="secondary" size="sm" className="view-details-btn" href={`/products/${product.id}`}>
            Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
