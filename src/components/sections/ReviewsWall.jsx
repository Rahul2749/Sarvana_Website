import { useRef } from 'react';
import { useScrollReveal } from '../../hooks/useGSAPAnimations';
import SectionTitle from '../ui/SectionTitle';
import { testimonials } from '../../data/testimonials';
import './ReviewsWall.css';

const ReviewsWall = () => {
  const containerRef = useRef(null);
  useScrollReveal(containerRef);

  return (
    <section ref={containerRef} className="reviews-wall section">
      {/* Decorative floating items */}
      <div className="section-decor decor-left-top">
        <svg viewBox="0 0 100 100" className="floating-svg-decor">
          <path d="M50,15 C72,38 72,68 50,85 C28,68 28,38 50,15 Z" fill="url(#leafGrad)" transform="rotate(25 50 50)" />
          <path d="M50,15 L50,85" stroke="url(#veinGrad)" strokeWidth="2.5" fill="none" />
        </svg>
      </div>

      <div className="container">
        <SectionTitle 
          subtitle="Real Stories"
          title="Loved by Coffee & Tea Connoisseurs"
          description="Hear from our community of wellness advocates and tea lovers across India."
          align="center"
        />

        <div className="reviews-grid-wall">
          {testimonials.map((review) => (
            <div key={review.id} className="review-wall-card">
              <div className="review-card-inner">
                <div className="review-header">
                  <div className="reviewer-avatar">
                    <img src={review.avatar} alt={review.name} />
                  </div>
                  <div className="reviewer-details">
                    <h4>{review.name}</h4>
                    <span>{review.role} • {review.location}</span>
                  </div>
                </div>
                <div className="review-rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={`star ${i < review.rating ? 'active' : ''}`}>★</span>
                  ))}
                </div>
                <p className="review-text">"{review.text}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsWall;
