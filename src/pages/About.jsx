import { useRef } from 'react';
import SectionTitle from '../components/ui/SectionTitle';
import { useTimelineReveal } from '../hooks/useGSAPAnimations';
import './About.css';

const About = () => {
  const timelineRef = useRef(null);
  useTimelineReveal(timelineRef, '.timeline-item');
  return (
    <div className="page about-page">
      <div className="page-header">
        <div className="container">
          <SectionTitle 
            subtitle="Our Journey" 
            title="The Sarvana Story" 
            description="From the Palmyra palm trees of South India to your cup."
            light={true}
          />
        </div>
      </div>
      
      <div className="container section">
        <div className="about-content">
          <div className="text-center" style={{ maxWidth: '800px', margin: '0 auto 4rem' }}>
            <p className="lead-text" style={{ fontSize: '1.5rem', color: 'var(--color-primary)', fontFamily: 'var(--font-accent)', fontStyle: 'italic', marginBottom: '2rem' }}>
              We started with a simple belief: sweetness shouldn't come at the cost of health or tradition.
            </p>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8 }}>
              Sarvana Thati Bellam Tea & Coffee was born out of a desire to bring the ancient goodness of palm jaggery back into our daily lives. While refined sugar has taken over modern kitchens, we remembered the rich, earthy taste of the 'karupatti' or 'thati bellam' our grandparents used. We partner directly with artisan tappers who follow centuries-old methods to extract the sap and slow-cook it into the golden jaggery that defines our brand.
            </p>
          </div>
          
          <div className="timeline" ref={timelineRef}>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>The Inspiration</h3>
                <p>A journey back to our roots, rediscovering the health benefits of Thati Bellam.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>Finding the Artisans</h3>
                <p>Partnering with traditional palm tappers across South India to ensure ethical and authentic sourcing.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>Crafting the Blends</h3>
                <p>Months of tasting to perfectly balance premium tea leaves and coffee beans with the unique flavor profile of palm jaggery.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>Sarvana Today</h3>
                <p>Serving thousands of health-conscious consumers who refuse to compromise on taste or tradition.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
