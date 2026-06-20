import { useRef } from 'react';
import { useStaggerReveal } from '../../hooks/useGSAPAnimations';
import SectionTitle from '../ui/SectionTitle';
import './InvestmentProcess.css';

const steps = [
  {
    title: 'Initial Inquiry',
    description: 'Submit the franchise application form to register your interest. Our team will review your profile and location preferences.'
  },
  {
    title: 'Discovery Call',
    description: 'A detailed discussion with our franchise team to understand the brand, business model, and expected ROI.'
  },
  {
    title: 'Location Finalization',
    description: 'Collaborate with our experts to identify and finalize a high-potential retail space for your outlet.'
  },
  {
    title: 'Agreement & Setup',
    description: 'Sign the franchise agreement. Our interior design team begins the store setup and branding process.'
  },
  {
    title: 'Training & Launch',
    description: 'Comprehensive staff training on recipes, hygiene, and customer service, followed by a grand store launch.'
  }
];

const InvestmentProcess = () => {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  
  useStaggerReveal(timelineRef, '.timeline-step');

  return (
    <section ref={containerRef} id="investment" className="investment-process section">
      <div className="container">
        <SectionTitle 
          subtitle="Simple & Transparent"
          title="The Investment Process"
          description="Your journey to owning a Sarvana franchise is streamlined for rapid setup and success."
          light={true}
        />

        <div className="investment-timeline" ref={timelineRef}>
          {steps.map((step, index) => (
            <div key={index} className="timeline-step">
              <div className="step-marker">{index + 1}</div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestmentProcess;
