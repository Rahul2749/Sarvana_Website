import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Button from '../ui/Button';
import './ProductCarousel.css';

const categories = [
  {
    id: 'tea',
    title: 'Premium Tea',
    description: 'Blended with traditional Indian spices and sweetened with natural palm jaggery.',
    image: '/images/products/category-tea.jpg',
    color: '#D9B44A'
  },
  {
    id: 'coffee',
    title: 'Filter Coffee',
    description: 'Authentic South Indian filter coffee naturally sweetened with rich Thati Bellam.',
    image: '/images/products/category-coffee.jpg',
    color: '#351F13'
  },
  {
    id: 'snacks',
    title: 'Traditional Snacks',
    description: 'Crispy, savory, and sweet delicacies made with 100% pure palm jaggery.',
    image: '/images/products/category-snacks.jpg',
    color: '#B8592A'
  }
];

const ProductCarousel = () => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  useGSAP(() => {
    const panels = gsap.utils.toArray('.carousel-panel');
    
    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (panels.length - 1),
        end: () => `+=${wrapperRef.current.offsetWidth}`,
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="product-carousel-section">
      <div className="carousel-header">
        <h2 className="carousel-title">Explore Our Range</h2>
        <p>Swipe to discover the magic of Thati Bellam</p>
      </div>
      
      <div ref={wrapperRef} className="carousel-wrapper">
        {categories.map((cat, index) => (
          <div key={cat.id} className="carousel-panel">
            <div className="panel-content">
              <div className="panel-text">
                <span className="panel-number">0{index + 1}</span>
                <h3 style={{ color: cat.color }}>{cat.title}</h3>
                <p>{cat.description}</p>
                <Button variant="primary" href={`/products?category=${cat.id}`}>View Collection</Button>
              </div>
              <div className="panel-image-container">
                <div className="panel-image-overlay" style={{ backgroundColor: cat.color }}></div>
                <img src={cat.image} alt={cat.title} className="panel-image" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCarousel;
