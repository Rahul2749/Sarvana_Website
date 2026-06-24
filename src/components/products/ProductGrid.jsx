import { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { cardEmerge } from '../../utils/gsapAnimations';
import SectionTitle from '../ui/SectionTitle';
import ProductCard from './ProductCard';
import Button from '../ui/Button';
import { products } from '../../data/products';
import './ProductGrid.css';

const FILTERS = ['Tea', 'Coffee', 'Juices', 'Lassi', 'Mojitos', 'Milkshakes', 'Fruit Custard', 'Snacks Mandi'];

const ProductGrid = () => {
  const location = useLocation();
  const gridRef = useRef(null);

  // Group products by category
  const groupedProducts = {};
  FILTERS.forEach(filter => {
    groupedProducts[filter] = products.filter(p => p.category === filter);
  });

  const scrollToSection = (id) => {
    const el = document.getElementById(`category-${id.replace(/\s+/g, '-')}`);
    if (el) {
      // Get the height of the navbar (usually around 80px) + padding
      const y = el.getBoundingClientRect().top + window.scrollY - 180; 
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');
    if (category && FILTERS.includes(category)) {
      setTimeout(() => {
        scrollToSection(category);
      }, 300);
    }
  }, [location.search]);

  // Card emerge animation — rise from below with fade + scale
  useGSAP(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.product-card');
      if (cards.length) {
        // Only animate the first 8 cards to avoid lag on 100 items
        cardEmerge(Array.from(cards).slice(0, 8), gridRef.current, 0.1);
      }
    }
  }, { scope: gridRef });

  return (
    <section className="section product-grid-section">
      <div className="container">
        <SectionTitle 
          subtitle="Our Menu" 
          title="Handcrafted with Love" 
        />
        
        <div className="filter-tabs" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '1rem', 
          marginBottom: '3rem', 
          flexWrap: 'wrap',
          position: 'sticky',
          top: '80px',
          zIndex: 40,
          background: 'rgba(248, 245, 238, 0.95)',
          backdropFilter: 'blur(10px)',
          padding: '1rem 0',
          borderBottom: '1px solid rgba(0,0,0,0.05)'
        }}>
          {FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => scrollToSection(filter)}
              style={{
                background: 'transparent',
                color: 'var(--color-primary)',
                border: `1px solid var(--color-primary)`,
                padding: '0.5rem 1.5rem',
                borderRadius: '9999px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: 'var(--font-body)',
                fontWeight: 500
              }}
              onMouseEnter={(e) => {
                  e.target.style.background = 'var(--color-primary)';
                  e.target.style.color = 'var(--color-white)';
              }}
              onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = 'var(--color-primary)';
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        <div ref={gridRef}>
          {FILTERS.map(category => (
            <div key={category} id={`category-${category.replace(/\s+/g, '-')}`} style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
              <h3 style={{ 
                fontSize: '2.5rem', 
                color: 'var(--color-primary)', 
                fontFamily: 'var(--font-heading)',
                marginBottom: '2rem',
                borderBottom: '1px solid rgba(0,0,0,0.1)',
                paddingBottom: '0.5rem'
              }}>
                {category}
              </h3>
              <div className="product-grid-wrapper">
                {groupedProducts[category].map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {location.pathname !== '/products' && (
          <div className="text-center" style={{ marginTop: '3rem' }}>
            <Button variant="secondary" size="lg" href="/products">View Full Menu</Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
