import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../ui/SectionTitle';
import './Benefits.css';

gsap.registerPlugin(ScrollTrigger);

const benefitsData = [
  {
    id: 1,
    title: "Rich in Minerals",
    description: "Packed with essential minerals like Iron, Calcium, and Potassium that refined sugar lacks.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z"
  },
  {
    id: 2,
    title: "Lower Glycemic Index",
    description: "Causes a slower rise in blood sugar levels, making it a better choice for mindful consumption.",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
  },
  {
    id: 3,
    title: "100% Unrefined & Pure",
    description: "No chemicals, no bleaching—just the pure, natural sap of the Palmyra tree harvested with care.",
    icon: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z",
    featured: true
  },
  {
    id: 4,
    title: "Boosts Immunity",
    description: "Traditionally used to soothe throats and relieve coughs due to its powerful antioxidant properties.",
    icon: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
  },
  {
    id: 5,
    title: "Natural Energy Source",
    description: "Complex carbohydrates provide gradual, sustained energy rather than a sudden spike and crash.",
    icon: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: [0.21, 1.11, 0.81, 0.99] // Spring-like custom ease
    }
  })
};

const Benefits = () => {
  const sectionRef = useRef(null);
  const svgLinesRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useGSAP(() => {
    // Parallax floating background elements
    const floaters = gsap.utils.toArray('.b-floating');
    floaters.forEach((el, i) => {
      gsap.to(el, {
        y: () => -50 - (i * 20),
        rotation: () => 15 + (i * 10),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    // SVG Line Drawing Animation
    if (svgLinesRef.current) {
      const paths = svgLinesRef.current.querySelectorAll('path');
      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2.5,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          }
        });
      });
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="benefits-premium" style={{ backgroundColor: 'var(--color-primary-dark)', position: 'relative', overflow: 'hidden' }}>
      {/* Background Ambience */}
      <div className="b-glow b-glow-left"></div>
      <div className="b-glow b-glow-right"></div>
      
      {/* Floating Elements */}
      <div className="b-floating b-leaf-1">
        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
          <path d="M50,15 C72,38 72,68 50,85 C28,68 28,38 50,15 Z" fill="#2D5016" opacity="0.3" />
        </svg>
      </div>
      <div className="b-floating b-dust-1">✦</div>
      <div className="b-floating b-dust-2">✦</div>

      <div className="container">
        <div className="benefits-header">
          <SectionTitle 
            subtitle="Why Palm Jaggery?" 
            title="Nature's Sweetest Gift" 
            description="Discover the traditional health benefits of Thati Bellam that make every sip of our tea and coffee not just delicious, but deeply nourishing."
            light={true}
          />
        </div>

        <div className="benefits-grid-layout">
          
          {/* SVG Connection Lines (Absolute behind cards) */}
          <svg ref={svgLinesRef} className="benefits-connection-lines" viewBox="0 0 1000 600" preserveAspectRatio="none">
            {/* Lines connecting outer cards to the center */}
            <path d="M 200 150 Q 500 100 500 300" className="b-line" />
            <path d="M 800 150 Q 500 100 500 300" className="b-line" />
            <path d="M 200 450 Q 500 500 500 300" className="b-line" />
            <path d="M 800 450 Q 500 500 500 300" className="b-line" />
          </svg>

          {/* Grid of Cards */}
          <div className="b-grid">
            {benefitsData.map((benefit, i) => (
              <motion.div 
                key={benefit.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className={`b-card-wrapper ${benefit.featured ? 'b-featured' : `b-card-${i}`}`}
              >
                <div className={`b-card ${benefit.featured ? 'b-card-gold' : ''}`}>
                  <div className="b-card-glow"></div>
                  <div className="b-card-content">
                    <div className="b-icon-box">
                      <svg viewBox="0 0 24 24" className="b-icon">
                        <path d={benefit.icon} fill="currentColor" />
                      </svg>
                    </div>
                    <h3 className="b-card-title">{benefit.title}</h3>
                    <p className="b-card-desc">{benefit.description}</p>
                    {benefit.featured && (
                      <div className="b-card-featured-image">
                        <img src="/images/hero/item-jaggery.png" alt="Premium Palm Jaggery" loading="lazy" decoding="async" />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Benefits;
