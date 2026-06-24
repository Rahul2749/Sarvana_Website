import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import './ProductCarousel.css';

const categories = [
  {
    id: 'Tea',
    title: 'Premium Tea',
    description: 'Blended with traditional Indian spices and sweetened with natural palm jaggery.',
    image: '/images/products/category-tea.jpg',
    color: '#D9B44A'
  },
  {
    id: 'Coffee',
    title: 'Filter Coffee',
    description: 'Authentic South Indian filter coffee naturally sweetened with rich Thati Bellam.',
    image: '/images/products/category-coffee.jpg',
    color: '#351F13'
  },
  {
    id: 'Snacks Mandi',
    title: 'Traditional Snacks',
    description: 'Crispy, savory, and sweet delicacies made with 100% pure palm jaggery.',
    image: '/images/products/category_mandi_1782302305628.png',
    color: '#B8592A'
  }
];

const ProductCarousel = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const handleViewCollection = (categoryId) => {
    // Navigate and update query param
    navigate(`/?category=${categoryId}`);
    
    // Scroll to the ProductShowcase section
    setTimeout(() => {
      const el = document.getElementById('product-showcase');
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <section ref={containerRef} id="menus" className="product-carousel-section">
      <div className="carousel-header">
        <h2 className="carousel-title">Explore Our Range</h2>
        <p>Discover the magic of Thati Bellam</p>
      </div>
      
      <div className="carousel-wrapper">
        {categories.map((cat, index) => (
          <div key={cat.id} className="carousel-panel">
            <div className="panel-content">
              <div className="panel-content-inner">
                <div className="panel-text">
                  <span className="panel-number">0{index + 1}</span>
                  <h3 style={{ color: cat.color }}>{cat.title}</h3>
                  <p>{cat.description}</p>
                  <Button 
                    variant="secondary" 
                    onClick={() => handleViewCollection(cat.id)}
                    style={{ position: 'relative', zIndex: 10 }}
                  >
                    View Collection
                  </Button>
                </div>
                <div className="panel-image-container">
                  <div className="panel-image-overlay" style={{ backgroundColor: cat.color }}></div>
                  <img src={cat.image} alt={cat.title} className="panel-image" loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCarousel;
