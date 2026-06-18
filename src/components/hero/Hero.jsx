import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import HeroScene from '../three/HeroScene';
import Button from '../ui/Button';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const buttonsRef = useRef(null);
  const floatingRefs = useRef([]);
  const floatingInnerRefs = useRef([]);

  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. Initial entrance for central content
    tl.from(logoRef.current, {
      scale: 0.2,
      rotation: -45,
      opacity: 0,
      duration: 1.5,
      ease: 'back.out(1.5)',
      delay: 0.3
    })
    .to('.animated-word', {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.05,
      ease: 'power4.out'
    }, '-=1.0')
    .from('.hero-subtitle', {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.8')
    .from(buttonsRef.current.children, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'back.out(1.7)'
    }, '-=0.6')
    .from('.scroll-indicator', {
      y: -20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.4');

    // 2. Entrance for floating elements
    floatingRefs.current.forEach((el, index) => {
      if (el) {
        tl.fromTo(el,
          { opacity: 0, scale: 0, rotation: index % 2 === 0 ? -60 : 60 },
          { opacity: 1, scale: 1, rotation: 0, duration: 1.2, ease: 'back.out(1.2)' },
          '-=1.2'
        );
      }
    });

    // 3. Continuous gentle floating animation on the INNER container
    floatingInnerRefs.current.forEach((el, index) => {
      if (el) {
        gsap.to(el, {
          y: '+=20',
          rotation: index % 2 === 0 ? 8 : -8,
          duration: 4 + index * 0.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.2
        });
      }
    });

    // 4. Parallax effect linked to scroll (scrubbing)
    gsap.to(contentRef.current, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    // Scrub the floating items slightly differently for vertical parallax depth!
    floatingRefs.current.forEach((el, index) => {
      if (el) {
        const speed = (index + 1) * 30; // different speeds for layered depth
        gsap.to(el, {
          y: `-=${speed}`,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    });

    // 5. Parallax effect linked to mouse movement
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) * 0.04;
      const moveY = (clientY - window.innerHeight / 2) * 0.04;

      floatingRefs.current.forEach((el, index) => {
        if (el) {
          const factor = (index + 1) * 0.45;
          gsap.to(el, {
            x: moveX * factor,
            y: moveY * factor,
            duration: 1.2,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, { scope: heroRef });

  return (
    <section ref={heroRef} className="hero">
      <HeroScene />
      
      <div className="hero-overlay"></div>

      {/* Floating Elements Background Layer */}
      <div className="hero-floating-elements">
        <div className="floating-item element-jaggery" ref={el => floatingRefs.current[0] = el}>
          <div className="floating-inner" ref={el => floatingInnerRefs.current[0] = el}>
            <img src="/images/hero/item-jaggery.png" alt="Palm Jaggery" />
          </div>
        </div>
        <div className="floating-item element-coffee" ref={el => floatingRefs.current[1] = el}>
          <div className="floating-inner" ref={el => floatingInnerRefs.current[1] = el}>
            <svg viewBox="0 0 100 100" className="floating-svg">
              <defs>
                <linearGradient id="coffeeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4A2E1C" />
                  <stop offset="100%" stopColor="#1A0F0A" />
                </linearGradient>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D9B44A" />
                  <stop offset="100%" stopColor="#C8943E" />
                </linearGradient>
              </defs>
              <ellipse cx="50" cy="50" rx="30" ry="40" fill="url(#coffeeGrad)" transform="rotate(-15 50 50)" />
              <path d="M 50 10 Q 38 32 50 50 T 50 90" fill="none" stroke="url(#goldGrad)" strokeWidth="3.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        <div className="floating-item element-leaf" ref={el => floatingRefs.current[2] = el}>
          <div className="floating-inner" ref={el => floatingInnerRefs.current[2] = el}>
            <svg viewBox="0 0 100 100" className="floating-svg">
              <defs>
                <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2D5016" />
                  <stop offset="100%" stopColor="#1E330F" />
                </linearGradient>
                <linearGradient id="veinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D9B44A" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#C8943E" stopOpacity="0.4" />
                </linearGradient>
              </defs>
              <path d="M50,15 C72,38 72,68 50,85 C28,68 28,38 50,15 Z" fill="url(#leafGrad)" transform="rotate(25 50 50)" />
              <path d="M50,15 L50,85" stroke="url(#veinGrad)" strokeWidth="2.5" fill="none" />
              <path d="M50,35 Q60,30 65,25 M50,45 Q62,40 67,33 M50,55 Q62,50 67,43 M50,35 Q40,30 35,25 M50,45 Q38,40 33,33 M50,55 Q38,50 33,43" fill="none" stroke="url(#veinGrad)" strokeWidth="1.2" />
            </svg>
          </div>
        </div>
        <div className="floating-item element-cardamom" ref={el => floatingRefs.current[3] = el}>
          <div className="floating-inner" ref={el => floatingInnerRefs.current[3] = el}>
            <svg viewBox="0 0 100 100" className="floating-svg">
              <defs>
                <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#5E7A3E" />
                  <stop offset="100%" stopColor="#3F522A" />
                </linearGradient>
              </defs>
              <path d="M50,15 C68,28 68,72 50,85 C32,72 32,28 50,15 Z" fill="url(#cardGrad)" transform="rotate(-30 50 50)" />
              <path d="M50,15 Q58,45 50,85 M50,15 Q42,45 50,85" fill="none" stroke="rgba(200, 148, 62, 0.4)" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      
      <div ref={contentRef} className="container hero-content">
        <div ref={logoRef} className="hero-logo-container">
          <div className="hero-logo-glow"></div>
          <img src="/images/Logo/logo-badge.png" alt="Sarvana Thati Bellam" className="hero-main-logo" />
        </div>
        
        <div ref={titleRef} className="hero-text">
          <h1 className="hero-title">
            <span className="block hero-title-line">
              {"Sweetened by Nature,".split(" ").map((word, i) => (
                <span key={i} className="word-wrapper">
                  <span className="animated-word">{word}&nbsp;</span>
                </span>
              ))}
            </span>
            <span className="block hero-title-line text-accent">
              {"Brewed with Love".split(" ").map((word, i) => (
                <span key={i} className="word-wrapper">
                  <span className="animated-word">{word}&nbsp;</span>
                </span>
              ))}
            </span>
          </h1>
          <p className="hero-subtitle">
            Premium Tea, Coffee & Snacks crafted with the traditional goodness of pure Palm Jaggery
          </p>
        </div>
        
        <div ref={buttonsRef} className="hero-buttons">
          <Button variant="primary" size="lg" href="/products">Explore Products</Button>
          <Button variant="secondary" size="lg" href="/about">Our Story</Button>
        </div>
      </div>

      <div className="scroll-indicator">
        <span className="scroll-text">Scroll to explore</span>
        <div className="scroll-arrow">↓</div>
      </div>
    </section>
  );
};

export default Hero;
