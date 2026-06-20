import { useRef } from 'react';
import { useStaggerReveal } from '../../hooks/useGSAPAnimations';
import SectionTitle from '../ui/SectionTitle';
import './OutletOptions.css';

const options = [
  {
    title: 'Kiosk / Express',
    description: 'Perfect for high-footfall areas like malls, airports, and tech parks. Quick service model with a focused menu.',
    area: '100 - 200 sq.ft',
    investment: '5 - 8 Lakhs',
    staff: '2 - 3 Members',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v5" />
      </svg>
    )
  },
  {
    title: 'Standard Cafe',
    description: 'A comfortable sit-down space ideal for high streets and neighborhoods. Full menu offering with cozy aesthetics.',
    area: '300 - 500 sq.ft',
    investment: '10 - 15 Lakhs',
    staff: '4 - 6 Members',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3" />
      </svg>
    )
  },
  {
    title: 'Premium Lounge',
    description: 'Our flagship experience. Expansive seating, exclusive menu items, and a premium ambiance for connoisseurs.',
    area: '800+ sq.ft',
    investment: '20+ Lakhs',
    staff: '8+ Members',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
      </svg>
    )
  }
];

const OutletOptions = () => {
  const containerRef = useRef(null);
  useStaggerReveal(containerRef, '.outlet-card');

  return (
    <section ref={containerRef} className="outlet-options section">
      <div className="container">
        <SectionTitle 
          subtitle="Franchise Models"
          title="Three Ways to Open Your Outlet"
          description="Choose the model that fits your investment capacity and location strategy."
        />

        <div className="outlet-grid">
          {options.map((opt, index) => (
            <div key={index} className="outlet-card">
              <div className="outlet-icon">
                {opt.icon}
              </div>
              <h3>{opt.title}</h3>
              <p>{opt.description}</p>
              
              <ul className="outlet-details">
                <li>
                  <span>Required Area:</span>
                  <strong>{opt.area}</strong>
                </li>
                <li>
                  <span>Est. Investment:</span>
                  <strong>{opt.investment}</strong>
                </li>
                <li>
                  <span>Staff Required:</span>
                  <strong>{opt.staff}</strong>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OutletOptions;
