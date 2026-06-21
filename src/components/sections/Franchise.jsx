import { useRef } from 'react';
import { useScrollReveal, useStaggerReveal } from '../../hooks/useGSAPAnimations';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import './Franchise.css';

const Franchise = () => {
  const containerRef = useRef(null);
  const leftSideRef = useRef(null);
  const formRef = useRef(null);

  useScrollReveal(containerRef);
  useStaggerReveal(leftSideRef, '.benefit-card');
  useStaggerReveal(formRef, '.form-group, .franchise-form-header, button');

  return (
    <section ref={containerRef} id="franchise" className="franchise-section section">
      <div className="container">
        <div className="franchise-grid">
          
          <div className="franchise-content" ref={leftSideRef}>
            <SectionTitle 
              subtitle="Partner With Us"
              title="Become a Sarvana Franchise"
              description="Join our legacy of purity and authenticity. We are expanding our footprint and looking for passionate partners to bring the premium Sarvana experience to new cities."
              align="left"
              light={true}
            />
            
            <div className="franchise-benefits">
              <div className="benefit-card">
                <div className="benefit-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div className="benefit-text">
                  <h4>High ROI Potential</h4>
                  <p>Our premium brand positioning and loyal customer base ensure a rapid path to profitability.</p>
                </div>
              </div>

              <div className="benefit-card">
                <div className="benefit-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div className="benefit-text">
                  <h4>End-to-End Support</h4>
                  <p>Comprehensive training, store design, and marketing assistance from day one.</p>
                </div>
              </div>

              <div className="benefit-card">
                <div className="benefit-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
                <div className="benefit-text">
                  <h4>Premium Heritage Brand</h4>
                  <p>Leverage our decades of trust and uncompromised quality in organic products.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="franchise-form-wrapper">
            <div className="franchise-form-container" ref={formRef}>
              <div className="franchise-form-header">
                <h3>Apply for Franchise</h3>
                <p>Register your interest and our team will connect with you.</p>
              </div>

              <form className="franchise-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <input type="text" id="franchise-name" required placeholder=" " />
                  <label htmlFor="franchise-name">Full Name</label>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <input type="email" id="franchise-email" required placeholder=" " />
                    <label htmlFor="franchise-email">Email Address</label>
                  </div>
                  <div className="form-group">
                    <input type="tel" id="franchise-phone" required placeholder=" " />
                    <label htmlFor="franchise-phone">Phone Number</label>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <input type="text" id="franchise-city" required placeholder=" " />
                    <label htmlFor="franchise-city">Preferred City</label>
                  </div>
                  <div className="form-group">
                    <select id="franchise-budget" required defaultValue="">
                      <option value="" disabled hidden></option>
                      <option value="5-10">5 - 10 Lakhs</option>
                      <option value="10-20">10 - 20 Lakhs</option>
                      <option value="20-50">20 - 50 Lakhs</option>
                      <option value="50+">50+ Lakhs</option>
                    </select>
                    <label htmlFor="franchise-budget">Investment Budget</label>
                  </div>
                </div>

                <div className="form-group">
                  <textarea id="franchise-message" placeholder=" "></textarea>
                  <label htmlFor="franchise-message">Briefly tell us about your background (Optional)</label>
                </div>

                <Button type="submit" variant="primary" size="lg">
                  Submit Application
                </Button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Franchise;
