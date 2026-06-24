import { useState, useRef, Suspense, lazy, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import { products } from '../../data/products';
import './ProductShowcase.css';

gsap.registerPlugin(ScrollTrigger);

// Lazy load Three.js background
const ShowcaseParticles = lazy(() => import('../three/ShowcaseParticles'));

// 3D Tilt Card Component
const TiltCard = ({ product, index, isFeatured }) => {
  const cardRef = useRef(null);
  
  // Motion values for tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for fluid motion
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // Map mouse position to rotation (subtle rotation for premium feel)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

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
  };

  // Staggered entrance animation
  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.8, 
        delay: index * 0.1, 
        ease: [0.21, 1.11, 0.81, 0.99] 
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9, 
      transition: { duration: 0.3 } 
    }
  };

  const isBeverage = product.category === 'Tea' || product.category === 'Coffee';

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      className={`ps-card-wrapper ${isFeatured ? 'ps-card-featured' : ''}`}
      style={{ rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={cardRef}
    >
      <div className="ps-card">
        {isFeatured && <div className="ps-badge">Bestseller</div>}
        
        <div className="ps-img-box">
          <img src={product.image} alt={product.name} className="ps-img" loading="lazy" decoding="async" />
          {isBeverage && <div className="ps-steam"></div>}
        </div>

        <div className="ps-info">
          <div className="ps-category">{product.category}</div>
          <h3 className="ps-title">{product.name}</h3>
          <p className="ps-desc">{product.description}</p>
          
          <div className="ps-footer">
            {product.price ? (
              <span className="ps-price">₹{product.price}</span>
            ) : (
              <span className="ps-price" style={{fontSize: '0.9rem'}}>Price upon request</span>
            )}
            <button className="ps-btn">Add to Cart</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProductShowcase = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get('category') || 'All';
  const matchedFilter = ['All', 'Tea', 'Coffee', 'Snacks'].find(f => f.toLowerCase() === categoryParam.toLowerCase()) || 'All';

  const [activeFilter, setActiveFilter] = useState(matchedFilter);
  const sectionRef = useRef(null);
  
  const filters = ['All', 'Juices', 'Lassi', 'Mojitos', 'Milkshakes', 'Fruit Custard', 'Snacks Mandi', 'Tea', 'Coffee'];

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      const matched = filters.find(f => f.toLowerCase() === category.toLowerCase());
      if (matched) {
        setActiveFilter(matched);
      }
    } else {
      setActiveFilter('All');
    }
  }, [location.search]);

  const filteredProducts = activeFilter === 'All' 
    ? products.slice(0, 7) 
    : products.filter(p => p.category === activeFilter).slice(0, 7);

  // Scroll Entrance
  useGSAP(() => {
    gsap.fromTo(sectionRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="product-showcase" className="product-showcase">
      {/* 3D Ambient Background */}
      <Suspense fallback={null}>
        <ShowcaseParticles />
      </Suspense>

      <div className="container">
        <div className="ps-header">
          <SectionTitle 
            subtitle="Signature Collection" 
            title="Crafted for Connoisseurs" 
            description="Experience the rich heritage of Palm Jaggery infused into our premium beverages and artisanal snacks."
            light={true}
          />
          
          <div className="ps-filters">
            {filters.map(filter => (
              <button
                key={filter}
                className={`ps-filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
                {activeFilter === filter && (
                  <motion.div 
                    layoutId="ps-filter-indicator"
                    className="ps-filter-indicator"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="ps-grid">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => {
              // Highlight the first product of the "All" view or a specific high-ticket item
              const isFeatured = activeFilter === 'All' && index === 0;
              
              return (
                <TiltCard 
                  key={product.id} 
                  product={product} 
                  index={index} 
                  isFeatured={isFeatured}
                />
              );
            })}
          </AnimatePresence>
        </motion.div>

        <div className="ps-view-all" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="primary" size="lg" href="/products">Explore Products</Button>
          <Button variant="secondary" size="lg" href="/franchise">Own a Franchise</Button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
