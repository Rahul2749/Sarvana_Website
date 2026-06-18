import { useState, useRef } from 'react';
import { useScaleReveal } from '../../hooks/useGSAPAnimations';
import SectionTitle from '../ui/SectionTitle';
import ProductCard from './ProductCard';
import Button from '../ui/Button';
import { products } from '../../data/products';
import './ProductGrid.css';

const ProductGrid = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const gridRef = useRef(null);

  const filters = ['All', 'Tea', 'Coffee', 'Snacks'];

  const filteredProducts = activeFilter === 'All' 
    ? products.slice(0, 8) 
    : products.filter(p => p.category === activeFilter).slice(0, 8);

  // Re-run animation when filter changes
  useScaleReveal(gridRef, '.product-card', [activeFilter]);

  return (
    <section className="section product-grid-section">
      <div className="container">
        <SectionTitle 
          subtitle="Our Collection" 
          title="Handcrafted with Love" 
        />
        
        <div className="filter-tabs" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          {filters.map(filter => (
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
