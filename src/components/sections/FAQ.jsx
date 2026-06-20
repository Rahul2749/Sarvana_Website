import { useState, useRef } from 'react';
import { useScrollReveal } from '../../hooks/useGSAPAnimations';
import SectionTitle from '../ui/SectionTitle';
import './FAQ.css';

const faqs = [
  {
    question: "Do I need prior experience in the F&B industry to get a franchise?",
    answer: "No, prior experience is not mandatory. We provide comprehensive end-to-end training, including operations, recipes, hygiene, and customer service, to ensure you are fully equipped to run the outlet successfully."
  },
  {
    question: "What is the typical ROI timeline?",
    answer: "The Return on Investment (ROI) generally ranges from 12 to 18 months, depending on the outlet model (Kiosk vs Lounge), location, and operational efficiency."
  },
  {
    question: "Will the company help with finding a location?",
    answer: "Yes! Our location experts will assist you in identifying, analyzing, and finalizing a high-footfall commercial space that aligns with our brand strategy."
  },
  {
    question: "How are the raw materials supplied?",
    answer: "To maintain consistency and premium quality, all core ingredients—especially our signature Thati Bellam and proprietary blends—are supplied directly from our central warehouse to your outlet."
  },
  {
    question: "What kind of marketing support do you provide?",
    answer: "We support our franchise partners with national brand marketing, localized launch campaigns, social media strategies, and promotional materials to ensure strong brand visibility."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const containerRef = useRef(null);

  useScrollReveal(containerRef);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section ref={containerRef} id="faq" className="faq-section section">
      <div className="container">
        <SectionTitle 
          subtitle="Got Questions?"
          title="Frequently Asked Questions"
          description="Everything you need to know about partnering with Sarvana."
        />

        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
              <button 
                className="faq-question" 
                onClick={() => toggleFaq(index)}
                aria-expanded={activeIndex === index}
              >
                {faq.question}
                <span className="faq-icon"></span>
              </button>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
