import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { cinematicReveal, goldenLineReveal } from '../../utils/gsapAnimations';
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
    // Cinematic reveal for whole section
    cinematicReveal(containerRef.current, containerRef.current);

    // Golden divider lines
    const dividers = containerRef.current.querySelectorAll('.story-golden-divider');
    dividers.forEach((el) => {
      goldenLineReveal(el, el, 0.2);
    });

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
        <svg viewBox="0 0 100 100" className="floating-svg-decor">
          <defs>
            <linearGradient id="storyLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2D5016" />
              <stop offset="100%" stopColor="#1E330F" />
            </linearGradient>
            <linearGradient id="storyVeinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D9B44A" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#C8943E" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <path d="M50,15 C72,38 72,68 50,85 C28,68 28,38 50,15 Z" fill="url(#storyLeafGrad)" transform="rotate(25 50 50)" />
          <path d="M50,15 L50,85" stroke="url(#storyVeinGrad)" strokeWidth="2.5" fill="none" />
          <path d="M50,35 Q60,30 65,25 M50,45 Q62,40 67,33 M50,55 Q62,50 67,43 M50,35 Q40,30 35,25 M50,45 Q38,40 33,33 M50,55 Q38,50 33,43" fill="none" stroke="url(#storyVeinGrad)" strokeWidth="1.2" />
        </svg>
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
              <div className="story-golden-divider" />
              <p className="reveal-text">
                Unlike refined sugar, our Thati Bellam retains its natural minerals—rich in iron, calcium, and potassium. It lends a deep, caramel-like earthiness to our teas and coffees, transforming every sip into a moment of pure, traditional indulgence.
              </p>
              <div className="story-golden-divider" />
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
