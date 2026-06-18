import { useRef } from 'react';
import { useScrollReveal } from '../../hooks/useGSAPAnimations';
import SectionTitle from '../ui/SectionTitle';
import { testimonials } from '../../data/testimonials';
import './Testimonials.css';

const Testimonials = () => {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  // Duplicate for seamless infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section ref={sectionRef} className="section testimonials-section">
      <div className="container">
        <SectionTitle 
          subtitle="What People Say" 
          title="Loved by Thousands" 
          align="center"
        />
      </div>

      <div className="marquee-container">
        <div className="marquee-content marquee-left">
          {duplicatedTestimonials.map((t, index) => (
            <div key={`t1-${index}`} className="testimonial-card">
              <div className="quote-icon">"</div>
              <div className="stars">
                {"★".repeat(t.rating)}
                <span className="stars-empty">{"★".repeat(5 - t.rating)}</span>
              </div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <div className="author-avatar" style={{ backgroundColor: 'var(--color-surface-dark)' }}>
                  {/* Fallback to initial if no image */}
                  <span>{t.name.charAt(0)}</span>
                </div>
                <div className="author-info">
                  <h4>{t.name}</h4>
                  <span>{t.role}, {t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="marquee-container marquee-reverse">
        <div className="marquee-content marquee-right">
          {[...duplicatedTestimonials].reverse().map((t, index) => (
            <div key={`t2-${index}`} className="testimonial-card">
              <div className="quote-icon">"</div>
              <div className="stars">
                {"★".repeat(t.rating)}
                <span className="stars-empty">{"★".repeat(5 - t.rating)}</span>
              </div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <div className="author-avatar" style={{ backgroundColor: 'var(--color-surface-dark)' }}>
                  <span>{t.name.charAt(0)}</span>
                </div>
                <div className="author-info">
                  <h4>{t.name}</h4>
                  <span>{t.role}, {t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
