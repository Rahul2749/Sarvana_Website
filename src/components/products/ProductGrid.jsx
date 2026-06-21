import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { cardEmerge } from '../../utils/gsapAnimations';
import SectionTitle from '../ui/SectionTitle';
import ProductCard from './ProductCard';
import Button from '../ui/Button';
import { products } from '../../data/products';
import './ProductGrid.css';

const FILTERS = ['All', 'Tea', 'Coffee', 'Snacks'];

const ProductGrid = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialCategory = searchParams.get('category') || 'All';
  
  const [activeFilter, setActiveFilter] = useState(initialCategory);
  const gridRef = useRef(null);
  const sectionRef = useRef(null);



  useEffect(() => {
    const category = searchParams.get('category');
    if (category && FILTERS.includes(category)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveFilter(category);
      
      // Smooth scroll to the section if navigating from a submenu
      if (sectionRef.current) {
        setTimeout(() => {
          sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    } else {
      setActiveFilter('All');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const filteredProducts = activeFilter === 'All' 
    ? products.slice(0, 8) 
    : products.filter(p => p.category === activeFilter).slice(0, 8);

  // Card emerge animation — rise from below with fade + scale
  useGSAP(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.product-card');
      if (cards.length) {
        cardEmerge(cards, gridRef.current, 0.1);
      }
    }
  }, { scope: gridRef, dependencies: [activeFilter] });

  return (
    <section ref={sectionRef} className="section product-grid-section">
      <div className="container">
        <SectionTitle 
          subtitle="Our Collection" 
          title="Handcrafted with Love" 
        />
        
        <div className="filter-tabs" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          {FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              style={{
                background: activeFilter === filter ? 'var(--color-primary)' : 'transparent',
                color: activeFilter === filter ? 'var(--color-white)' : 'var(--color-primary)',
                border: `1px solid var(--color-primary)`,
                padding: '0.5rem 1.5rem',
                borderRadius: '9999px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: 'var(--font-body)',
                fontWeight: 500
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        <div 
          ref={gridRef}
          className="product-grid-wrapper"
        >
          {filteredProducts.map(product => (
            <ProductCard key={`${product.id}-${activeFilter}`} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Button variant="secondary" size="lg" href="/products">View All Products</Button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
