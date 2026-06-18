import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useScrollReveal } from '../../hooks/useGSAPAnimations';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import './QuickContact.css';

const QuickContact = () => {
  const containerRef = useRef(null);
  const leftDecorRef = useRef(null);
  const rightDecorRef = useRef(null);

  useScrollReveal(containerRef);

  useGSAP(() => {
    if (leftDecorRef.current) {
      gsap.to(leftDecorRef.current, {
        yPercent: -25,
        rotation: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    if (rightDecorRef.current) {
      gsap.to(rightDecorRef.current, {
        yPercent: 30,
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
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="quick-contact section">
      {/* Decorative background items */}
      <div className="section-decor decor-left-bottom" ref={leftDecorRef}>
        <img src="/images/decor/decor-coffee-cup.png" alt="Coffee" className="floating-img-decor" />
      </div>
      <div className="section-decor decor-right-top" ref={rightDecorRef}>
        <img src="/images/hero/item-jaggery.png" alt="Jaggery" className="floating-img-decor" />
      </div>

      <div className="container">
        <div className="quick-contact-grid">
          <div className="quick-contact-info">
            <SectionTitle 
              subtitle="Connect With Us"
              title="Get in Touch"
              description="Have questions about our brewing process or organic sourcing? Reach out to us directly."
              align="left"
            />
            
            <div className="contact-details">
              <div className="contact-item">
                <span className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="contact-svg-icon">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <div className="contact-text">
                  <h4>Sarvana Heritage Flagship</h4>
                  <p>12, Palm Grove Avenue, Mylapore, Chennai - 600004</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="contact-svg-icon">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <div className="contact-text">
                  <h4>Phone & WhatsApp</h4>
                  <p>+91 98765 43210</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="contact-svg-icon">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <div className="contact-text">
                  <h4>Email Support</h4>
                  <p>hello@sarvanafoods.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="quick-contact-form-wrapper">
            <form className="quick-contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <input type="text" id="name" required placeholder=" " />
                <label htmlFor="name">Your Name</label>
              </div>
              
              <div className="form-group">
                <input type="email" id="email" required placeholder=" " />
                <label htmlFor="email">Your Email Address</label>
              </div>

              <div className="form-group">
                <textarea id="message" rows="4" required placeholder=" "></textarea>
                <label htmlFor="message">Your Message</label>
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickContact;
