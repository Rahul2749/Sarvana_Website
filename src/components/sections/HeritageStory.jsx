import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HeritageStory.css';

gsap.registerPlugin(ScrollTrigger);

const HeritageStory = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);
  const borderRef = useRef(null);

  // Split text content for line-by-line reveal
  const paragraph1 = "For generations, Thati Bellam (Palm Jaggery) has been the heart of South Indian wellness. Extracted meticulously from the sap of the Palmyra palm tree, it is an artisanal craft passed down through centuries.".split(" ");
  const paragraph2 = "Unlike refined sugar, our Thati Bellam retains its natural minerals—rich in iron, calcium, and potassium. It lends a deep, caramel-like earthiness to our teas and coffees, transforming every sip into a moment of pure, traditional indulgence.".split(" ");
  const paragraph3 = "At Sarvana, we source directly from traditional tappers, ensuring that the age-old methods are preserved, and only the highest quality jaggery reaches your cup.".split(" ");

  useGSAP(() => {
    // 1. Master timeline for section entrance (Fade Up)
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
      }
    });

    masterTl.fromTo(containerRef.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
    );

    // 2. Text Reveal Animations
    const textTl = gsap.timeline({
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top 75%',
      }
    });

    // Subtitle & Line reveal
    textTl.fromTo('.heritage-subtitle',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    )
    .fromTo('.heritage-line',
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: 'power3.inOut' },
      '-=0.4'
    );

    // Main Title stagger
    textTl.fromTo('.heritage-title .word',
      { opacity: 0, y: 40, rotationX: -45 },
      { opacity: 1, y: 0, rotationX: 0, duration: 0.8, stagger: 0.05, ease: 'back.out(1.4)' },
      '-=0.4'
    );

    // Paragraph stagger
    textTl.fromTo('.heritage-p .word',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.015, ease: 'power1.out' },
      '-=0.4'
    );

    // 3. Image Animations (Zoom out on enter)
    gsap.fromTo(imageRef.current,
      { scale: 1.25, filter: 'brightness(0.5)' },
      { 
        scale: 1, 
        filter: 'brightness(1)',
        duration: 1.8, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: imageContainerRef.current,
          start: 'top 80%',
        }
      }
    );

    // 4. Parallax Image (Scroll based)
    gsap.to(imageRef.current, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: imageContainerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });

    // 5. SVG Border Draw Animation
    const path = borderRef.current;
    if (path) {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: imageContainerRef.current,
          start: 'top 60%',
        }
      });
    }

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="heritage-section">
      <div className="heritage-container">
        
        {/* Left Side: Text Content */}
        <div ref={textRef} className="heritage-content">
          <div className="heritage-header">
            <span className="heritage-subtitle">Our Heritage</span>
            <div className="heritage-line"></div>
          </div>
          
          <h2 className="heritage-title">
            {"A Tradition of Natural Sweetness".split(" ").map((word, i) => (
              <span key={i} className="word-wrap">
                <span className="word">{word}&nbsp;</span>
              </span>
            ))}
          </h2>

          <div className="heritage-body">
            <p className="heritage-p">
              {paragraph1.map((word, i) => (
                <span key={`p1-${i}`} className="word-wrap">
                  <span className="word">{word}&nbsp;</span>
                </span>
              ))}
            </p>
            <p className="heritage-p">
              {paragraph2.map((word, i) => (
                <span key={`p2-${i}`} className="word-wrap">
                  <span className="word">{word}&nbsp;</span>
                </span>
              ))}
            </p>
            <p className="heritage-p">
              {paragraph3.map((word, i) => (
                <span key={`p3-${i}`} className="word-wrap">
                  <span className="word">{word}&nbsp;</span>
                </span>
              ))}
            </p>
          </div>

          <div className="heritage-stats">
            <div className="h-stat">
              <span className="h-stat-num">50+</span>
              <span className="h-stat-label">Years Tradition</span>
            </div>
            <div className="h-stat">
              <span className="h-stat-num text-gold">100%</span>
              <span className="h-stat-label">Natural & Unrefined</span>
            </div>
          </div>
        </div>

        {/* Right Side: Image and Border */}
        <div className="heritage-visual">
          <div ref={imageContainerRef} className="heritage-image-wrapper">
            
            {/* Animated Golden Border SVG */}
            <svg className="heritage-border-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path 
                ref={borderRef}
                d="M 2 2 L 98 2 L 98 98 L 2 98 Z" 
                fill="none" 
                stroke="rgba(212, 162, 76, 0.6)" 
                strokeWidth="0.5" 
              />
            </svg>

            {/* Inner frame for overflow hidden */}
            <div className="heritage-image-inner">
              <img 
                ref={imageRef} 
                src="/images/hero/heritage-story.png" 
                alt="Artisanal Palm Jaggery Processing" 
                className="heritage-image" 
              />
              <div className="heritage-image-overlay"></div>
            </div>

            {/* Floating Decorations */}
            <div className="h-decor h-decor-top">✦</div>
            <div className="h-decor h-decor-bottom">✦</div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeritageStory;
