import { useRef, useEffect, Suspense, lazy } from 'react';
import { motion, useInView } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { testimonials } from '../../data/testimonials';
import './LuxuryTestimonials.css';

gsap.registerPlugin(ScrollTrigger);

const ShowcaseParticles = lazy(() => import('../three/ShowcaseParticles'));

const Counter = ({ value, suffix = "", duration = 2 }) => {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && nodeRef.current) {
      const targetValue = parseInt(value.replace(/,/g, ''), 10);
      const obj = { val: 0 };
      
      gsap.to(obj, {
        val: targetValue,
        duration: duration,
        ease: "power3.out",
        onUpdate: () => {
          if (nodeRef.current) {
            // Format with commas if needed
            const formatted = Math.floor(obj.val).toLocaleString();
            nodeRef.current.textContent = formatted + suffix;
          }
        }
      });
    }
  }, [isInView, value, suffix, duration]);

  return <span ref={nodeRef}>0{suffix}</span>;
};

const LuxuryTestimonials = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  const titleText = "Loved by Connoisseurs".split(" ");

  // Double the testimonials to ensure a seamless infinite marquee
  const marqueeItems = [...testimonials, ...testimonials];

  // Parallax background and section fade in
  useGSAP(() => {
    gsap.fromTo(sectionRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.5,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="luxury-testimonials">
      <Suspense fallback={null}>
        <ShowcaseParticles />
      </Suspense>

      <div className="container">
        <div ref={headerRef} className="lt-header-wrapper">
          <span className="lt-subtitle">Real Stories</span>
          
          <h2 className="lt-title">
            {titleText.map((word, i) => (
              <motion.span
                key={i}
                className="lt-title-word"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.21, 1.11, 0.81, 0.99] }}
              >
                {word}
              </motion.span>
            ))}
          </h2>

          <div className="lt-trust-metrics">
            <div className="lt-metric">
              <span className="lt-metric-value"><Counter value="10000" suffix="+" /></span>
              <span className="lt-metric-label">Happy Customers</span>
            </div>
            <div className="lt-metric">
              <span className="lt-metric-value"><Counter value="50" suffix="+" /></span>
              <span className="lt-metric-label">Artisanal Recipes</span>
            </div>
            <div className="lt-metric">
              <span className="lt-metric-value"><Counter value="100" suffix="%" /></span>
              <span className="lt-metric-label">Organic Sourcing</span>
            </div>
          </div>
        </div>
      </div>

      <div className="lt-marquee-container">
        {/* Top Track - Scrolling Left */}
        <div className="lt-marquee-track left">
          {marqueeItems.map((review, i) => (
            <div key={`left-${review.id}-${i}`} className="lt-card">
              <div className="lt-card-header">
                <img src={review.avatar} alt={review.name} className="lt-avatar" />
                <div className="lt-reviewer-info">
                  <h4>{review.name}</h4>
                  <span>{review.role} • {review.location}</span>
                </div>
              </div>
              <div className="lt-stars">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <span 
                    key={idx} 
                    className={`lt-star ${idx < review.rating ? 'active' : ''}`}
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="lt-card-text">"{review.text}"</p>
            </div>
          ))}
        </div>

        {/* Bottom Track - Scrolling Right (Start offset to look organic) */}
        <div className="lt-marquee-track right" style={{ marginLeft: '-15%' }}>
          {marqueeItems.slice().reverse().map((review, i) => (
            <div key={`right-${review.id}-${i}`} className="lt-card">
              <div className="lt-card-header">
                <img src={review.avatar} alt={review.name} className="lt-avatar" />
                <div className="lt-reviewer-info">
                  <h4>{review.name}</h4>
                  <span>{review.role} • {review.location}</span>
                </div>
              </div>
              <div className="lt-stars">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <span 
                    key={idx} 
                    className={`lt-star ${idx < review.rating ? 'active' : ''}`}
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="lt-card-text">"{review.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LuxuryTestimonials;
