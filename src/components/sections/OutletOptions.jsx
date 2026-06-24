import { useRef } from 'react';
import { useStaggerReveal } from '../../hooks/useGSAPAnimations';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import './OutletOptions.css';

const options = [
  {
    tier: 'STARTER',
    title: 'Kiosk Model',
    area: '100–150 sq ft',
    price: '₹6–9 L',
    priceDesc: 'est. all-in',
    features: [
      'Low investment entry',
      'Ideal for malls & high streets',
      'Fast 60-day setup',
      'Express menu'
    ],
    buttonText: 'Enquire Now',
    variant: 'light',
    badge: null
  },
  {
    tier: 'MOST POPULAR',
    title: 'Standard Café',
    area: '250–500 sq ft',
    price: '₹14–22 L',
    priceDesc: 'est. all-in',
    features: [
      'Full menu service',
      'Seating for 18–30',
      'High footfall returns',
      'Recommended ROI: 12–15 mo'
    ],
    buttonText: 'Enquire Now',
    variant: 'dark',
    badge: 'MOST POPULAR'
  },
  {
    tier: 'FLAGSHIP',
    title: 'Premium Lounge',
    area: '500+ sq ft',
    price: '₹28–45 L',
    priceDesc: 'est. all-in',
    features: [
      'Heritage interior design',
      'Snack + dessert bar',
      'Highest revenue model',
      'Brand showcase store'
    ],
    buttonText: 'Enquire Now',
    variant: 'light',
    badge: null
  }
];

const OutletOptions = () => {
  const containerRef = useRef(null);
  useStaggerReveal(containerRef, '.outlet-card');

  // Custom title rendering for italicized green text
  const customTitle = (
    <span className="custom-section-title">
      Three Ways to <em>Open Your Outlet.</em>
    </span>
  );

  return (
    <section ref={containerRef} className="outlet-options section" id="outlet-options">
      <div className="container">
        <SectionTitle 
          subtitle="FRANCHISE MODELS"
          title={customTitle}
          description="Pick the format that fits your city, budget and ambition."
        />

        <div className="outlet-grid">
          {options.map((opt, index) => (
            <div key={index} className={`outlet-card ${opt.variant}`}>
              {opt.badge && (
                <div className="outlet-badge">{opt.badge}</div>
              )}
              
              <div className="outlet-card-header">
                {!opt.badge && <div className="outlet-tier">{opt.tier}</div>}
                <h3>{opt.title}</h3>
                <div className="outlet-area">{opt.area}</div>
              </div>
              
              <div className="outlet-price-section">
                <span className="outlet-price">{opt.price}</span>
                <span className="outlet-price-desc">{opt.priceDesc}</span>
              </div>
              
              <ul className="outlet-features">
                {opt.features.map((feature, idx) => (
                  <li key={idx}>
                    <svg viewBox="0 0 24 24" className="check-icon" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="outlet-action">
                <Button 
                  href="/#contact"
                  className={`w-full ${opt.variant === 'dark' ? 'btn-gold' : 'btn-dark'}`}
                >
                  {opt.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OutletOptions;
