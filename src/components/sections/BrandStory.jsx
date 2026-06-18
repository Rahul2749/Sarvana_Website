import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useStaggerReveal, useScrollReveal } from '../../hooks/useGSAPAnimations';
import SectionTitle from '../ui/SectionTitle';
import AnimatedCounter from '../ui/AnimatedCounter';
import './BrandStory.css';

const BrandStory = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const leafRef = useRef(null);
  const jaggeryRef = useRef(null);

  useStaggerReveal(textRef, '.reveal-text');
  useScrollReveal(imageRef);

  useGSAP(() => {
    if (leafRef.current) {
      gsap.to(leafRef.current, {
        yPercent: -30,
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

    if (jaggeryRef.current) {
      gsap.to(jaggeryRef.current, {
        yPercent: 40,
        rotation: -20,
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
    <section ref={containerRef} className="section brand-story">
      {/* Decorative floating items */}
      <div className="section-decor decor-left floating-leaf" ref={leafRef}>
        <img src="/images/decor/decor-tea-cup.png" alt="Tea" className="floating-img-decor" />
      </div>
      <div className="section-decor decor-right floating-jaggery" ref={jaggeryRef}>
        <img src="/images/hero/item-jaggery.png" alt="Jaggery" className="floating-img-decor" />
      </div>

      <div className="container">
        <div className="story-grid">
          <div ref={textRef} className="story-content">
            <SectionTitle 
              subtitle="Our Heritage" 
              title="A Tradition of Natural Sweetness" 
              align="left"
            />
            
            <div className="story-paragraphs">
              <p className="reveal-text">
                For generations, Thati Bellam (Palm Jaggery) has been the heart of South Indian wellness. Extracted meticulously from the sap of the Palmyra palm tree, it is an artisanal craft passed down through centuries.
              </p>
              <p className="reveal-text">
                Unlike refined sugar, our Thati Bellam retains its natural minerals—rich in iron, calcium, and potassium. It lends a deep, caramel-like earthiness to our teas and coffees, transforming every sip into a moment of pure, traditional indulgence.
              </p>
              <p className="reveal-text">
                At Sarvana, we source directly from traditional tappers, ensuring that the age-old methods are preserved, and only the highest quality jaggery reaches your cup.
              </p>
            </div>

            <div className="story-stats">
              <div className="stat-item reveal-text">
                <AnimatedCounter end={50} suffix="+" className="stat-number" />
                <span className="stat-label">Years Tradition</span>
              </div>
              <div className="stat-item reveal-text">
                <span className="stat-number text-accent">100%</span>
                <span className="stat-label">Natural & Unrefined</span>
              </div>
              <div className="stat-item reveal-text">
                <AnimatedCounter end={10} suffix="k+" className="stat-number" />
                <span className="stat-label">Happy Customers</span>
              </div>
            </div>
          </div>

          <div ref={imageRef} className="story-image-container">
            <div className="story-image-wrapper">
              <img src="/images/hero/story-image.jpg" alt="Traditional Palm Jaggery making process" className="story-image" />
              <div className="story-quote">
                "From the Palmyra tree to your cup, crafted with devotion."
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
