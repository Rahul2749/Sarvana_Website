import { useRef } from 'react';
import { useScrollReveal } from '../../hooks/useGSAPAnimations';
import SectionTitle from '../ui/SectionTitle';
import './ProcessJourney.css';

const steps = [
  {
    number: "01",
    title: "Artisanal Tapping",
    description: "Experienced tappers climb the palmyra palm trees at dawn to gather the fresh, sweet sap (neera) from the tree's flower spadix.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    )
  },
  {
    number: "02",
    title: "Earthenware Collection",
    description: "The sap is collected in traditional clay pots coated with slaked lime on the inside. This natural method prevents fermentation and keeps it pure.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18M5 12h14M8 5a4 4 0 0 0 8 0M16 19a4 4 0 0 0-8 0" />
      </svg>
    )
  },
  {
    number: "03",
    title: "Wood-Fired Filtration",
    description: "The raw sap is filtered and transferred to large flat iron pans. It is slow-boiled over wood fire for hours, caramelizing into a thick golden liquid.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 10.7 5 15a7 7 0 0 0 7 7z" />
      </svg>
    )
  },
  {
    number: "04",
    title: "Crystalline Pour",
    description: "The cooled syrup is poured into coconut shells or wooden molds, where it solidifies naturally into rich, unrefined blocks of Thati Bellam.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="9" rx="1" />
        <rect x="14" y="3" width="7" height="5" rx="1" />
        <rect x="14" y="12" width="7" height="9" rx="1" />
        <rect x="3" y="16" width="7" height="5" rx="1" />
      </svg>
    )
  }
];

const ProcessJourney = () => {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  return (
    <section ref={sectionRef} id="process" className="process-journey section">
      <div className="container">
        <SectionTitle 
          subtitle="Our Heritage"
          title="The Sacred Journey of Thati Bellam"
          description="Every sip of Sarvana tea and coffee is sweetened by a 100% natural, centuries-old artisanal process."
          align="center"
          light={true}
        />

        <div className="process-timeline">
          {steps.map((step, idx) => (
            <div key={idx} className={`process-step step-${idx + 1}`}>
              <div className="process-step-inner">
                <div className="process-icon-wrapper">
                  <div className="process-icon">{step.icon}</div>
                  <span className="process-number">{step.number}</span>
                </div>
                <div className="process-info">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
              {idx < steps.length - 1 && <div className="process-connector-line"></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessJourney;
