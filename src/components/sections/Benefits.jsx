import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useStaggerReveal } from '../../hooks/useGSAPAnimations';
import SectionTitle from '../ui/SectionTitle';
import './Benefits.css';

const benefitsData = [
  {
    title: "Rich in Minerals",
    description: "Packed with essential minerals like Iron, Calcium, and Potassium that refined sugar lacks.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z"
  },
  {
    title: "Lower Glycemic Index",
    description: "Causes a slower rise in blood sugar levels, making it a better choice for mindful consumption.",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
  },
  {
    title: "Boosts Immunity",
    description: "Traditionally used to soothe throats and relieve coughs due to its antioxidant properties.",
    icon: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
  },
  {
    title: "Aids Digestion",
    description: "Activates digestive enzymes and helps cleanse the liver and intestines of toxins.",
    icon: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
  },
  {
    title: "Natural Energy Source",
    description: "Complex carbohydrates provide gradual, sustained energy rather than a sudden spike.",
    icon: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"
  },
  {
    title: "100% Unrefined",
    description: "No chemicals, no bleaching—just the pure, natural sap of the Palmyra tree.",
    icon: "M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"
  }
];

const Benefits = () => {
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const leafRef = useRef(null);
  const jaggeryRef = useRef(null);

  useStaggerReveal(gridRef, '.benefit-card');

  useGSAP(() => {
    if (leafRef.current) {
      gsap.to(leafRef.current, {
        yPercent: 35,
        rotation: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    if (jaggeryRef.current) {
      gsap.to(jaggeryRef.current, {
        yPercent: -35,
        rotation: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="section benefits">
      {/* Decorative background items */}
      <div className="section-decor decor-left floating-leaf" ref={leafRef}>
        <img src="/images/decor/decor-masala-chai.png" alt="Masala Chai" className="floating-img-decor" />
      </div>
      <div className="section-decor decor-right floating-jaggery" ref={jaggeryRef}>
        <img src="/images/hero/item-jaggery.png" alt="Jaggery" className="floating-img-decor" />
      </div>

      <div className="container">
        <SectionTitle 
          subtitle="Why Palm Jaggery?" 
          title="Nature's Sweetest Gift" 
          description="Discover the traditional health benefits of Thati Bellam that make every sip of our tea and coffee not just delicious, but nourishing."
        />
        
        <div ref={gridRef} className="benefits-grid">
          {benefitsData.map((benefit, index) => (
            <div key={index} className={`benefit-card card-${index + 1}`}>
              <div className="benefit-icon-wrapper">
                <svg viewBox="0 0 24 24" className="benefit-icon">
                  <path d={benefit.icon} fill="currentColor" />
                </svg>
              </div>
              <h3 className="benefit-title">{benefit.title}</h3>
              <p className="benefit-description">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
