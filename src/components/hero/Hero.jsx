import { useRef, useEffect, useState, lazy, Suspense } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SteamEffect from './SteamEffect';
import Button from '../ui/Button';
import './Hero.css';

// Lazy-load Three.js scene so it doesn't block the entrance animations
const HeroScene = lazy(() => import('../three/HeroScene'));

const Hero = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const logoRef = useRef(null);
  const buttonsRef = useRef(null);
  const glassPanelRef = useRef(null);
  const teaCupRef = useRef(null);
  const coffeeCupRef = useRef(null);
  const floatingRefs = useRef([]);
  const floatingInnerRefs = useRef([]);
  const [showScene, setShowScene] = useState(false);

  // Delay Three.js mount until after entrance animations finish
  useEffect(() => {
    const timer = setTimeout(() => setShowScene(true), 2800);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(() => {
    // Single clean timeline — no overlapping, sequential flow
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out', force3D: true },
      delay: 0.2,
    });

    // 1. Logo — simple fade + scale
    tl.fromTo(logoRef.current,
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.2)' }
    )
    // 2. Glass panel — simple fade up
    .fromTo(glassPanelRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7 },
      '-=0.5'
    )
    // 3. Title words — stagger reveal
    .to('.animated-word', {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.035,
      ease: 'power4.out',
    }, '-=0.3')
    // 4. Subtitle
    .fromTo('.hero-subtitle',
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.3'
    )
    // 5. Divider
    .fromTo('.hero-divider',
      { scaleX: 0 },
      { scaleX: 1, duration: 0.5 },
      '-=0.3'
    )
    // 6. Buttons
    .fromTo(buttonsRef.current?.children || [],
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
      '-=0.2'
    )
    // 7. Scroll indicator
    .fromTo('.scroll-indicator',
      { opacity: 0 },
      { opacity: 1, duration: 0.4 },
      '-=0.2'
    );

    // Cup entrances — after main content
    if (teaCupRef.current) {
      tl.fromTo(teaCupRef.current,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 },
        '-=0.8'
      );
    }
    if (coffeeCupRef.current) {
      tl.fromTo(coffeeCupRef.current,
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 },
        '-=0.7'
      );
    }

    // Floating elements — simple pop in
    floatingRefs.current.forEach((el) => {
      if (el) {
        tl.fromTo(el,
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 0.5 },
          '-=0.5'
        );
      }
    });

    // ── Continuous animations (lightweight) ──

    // Floating inner bob
    floatingInnerRefs.current.forEach((el, i) => {
      if (el) {
        gsap.to(el, {
          y: '+=12',
          duration: 4.5 + i * 0.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.4,
        });
      }
    });

    // Cup bob
    [teaCupRef, coffeeCupRef].forEach((ref, i) => {
      if (ref.current) {
        gsap.to(ref.current, {
          y: '+=10',
          duration: 5 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    });

    // Scroll parallax (only content layer, very light)
    gsap.to(contentRef.current, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Mouse parallax — throttled with passive listener
    let rafId = null;
    let mouseX = 0, mouseY = 0;

    const onMouseMove = (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.025;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.025;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          floatingRefs.current.forEach((el, i) => {
            if (el) {
              gsap.to(el, {
                x: mouseX * (i + 1) * 0.35,
                y: mouseY * (i + 1) * 0.25,
                duration: 1.8,
                ease: 'power2.out',
                overwrite: 'auto',
              });
            }
          });

          if (teaCupRef.current) {
            gsap.to(teaCupRef.current, {
              x: mouseX * 0.2,
              y: mouseY * 0.12,
              duration: 2,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          }
          if (coffeeCupRef.current) {
            gsap.to(coffeeCupRef.current, {
              x: mouseX * 0.25,
              y: mouseY * 0.15,
              duration: 2,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          }

          rafId = null;
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, { scope: heroRef });

  return (
    <section ref={heroRef} className="hero" id="hero-section">
      {/* Three.js scene — lazy loaded after entrance animations */}
      {showScene && (
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      )}

      <div className="hero-overlay" />

      {/* Beverage Cups */}
      <div className="hero-beverages">
        <div className="hero-cup hero-cup-tea" ref={teaCupRef}>
          <SteamEffect />
          <img src="/images/hero/tea-cup.png" alt="Premium Palm Jaggery Tea" />
        </div>
        <div className="hero-cup hero-cup-coffee" ref={coffeeCupRef}>
          <SteamEffect />
          <img src="/images/hero/coffee-cup.png" alt="Premium Palm Jaggery Coffee" />
        </div>
      </div>

      {/* Floating SVG Elements */}
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

      {/* Central Content */}
      <div ref={contentRef} className="container hero-content">
        <div ref={logoRef} className="hero-logo-container">
          <div className="hero-logo-glow" />
          <div className="hero-logo-ring" />
          <div className="hero-logo-ring-outer" />
          <img src="/images/Logo/Sarvana_Logo.png" alt="Sarvana Thati Bellam" className="hero-main-logo" />
        </div>

        <div ref={glassPanelRef} className="hero-glass-panel">
          <div className="hero-text">
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
            <div className="hero-divider" />
            <p className="hero-subtitle">
              Premium Tea, Coffee & Snacks crafted with the traditional goodness of pure Palm Jaggery. Join our legacy by owning a franchise.
            </p>
          </div>

          <div ref={buttonsRef} className="hero-buttons" style={{ position: 'relative', zIndex: 100, pointerEvents: 'auto' }}>
            <Button variant="primary" size="lg" href="/products">Explore Products</Button>
            <Button variant="secondary" size="lg" href="/franchise">Own a Franchise</Button>
          </div>
        </div>
      </div>

      <div className="scroll-indicator" style={{ pointerEvents: 'none' }}>
        <span className="scroll-text">Scroll to explore</span>
        <div className="scroll-arrow">↓</div>
      </div>
    </section>
  );
};

export default Hero;
