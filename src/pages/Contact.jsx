import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import './Contact.css';

const Contact = () => {
  return (
    <div className="page contact-page">
      <div className="page-header">
        <div className="container">
          <SectionTitle 
            subtitle="Get in Touch" 
            title="We'd Love to Hear From You" 
            description="Have a question about our products, want to wholesale, or just want to say hello? Drop us a message."
            light={true}
          />
        </div>
      </div>
      
      <div className="container section">
        <div className="contact-grid">
          <div className="contact-info">
            <div className="info-card">
              <h3>Visit Us</h3>
              <p>123 Palm Grove Avenue<br />Jubilee Hills, Hyderabad<br />Telangana 500033</p>
            </div>
            <div className="info-card">
              <h3>Contact</h3>
              <p>Email: hello@sarvana.com<br />Phone: +91 98765 43210</p>
            </div>
            <div className="info-card">
              <h3>Hours</h3>
              <p>Monday - Saturday: 9:00 AM - 8:00 PM<br />Sunday: Closed</p>
            </div>
          </div>
          
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <input type="text" id="name" required placeholder=" " />
                <label htmlFor="name">Full Name</label>
              </div>
              <div className="form-group">
                <input type="email" id="email" required placeholder=" " />
                <label htmlFor="email">Email Address</label>
              </div>
              <div className="form-group">
                <select id="subject" required defaultValue="">
                  <option value="" disabled hidden>Select a Subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="wholesale">Wholesale/Bulk Orders</option>
                  <option value="support">Customer Support</option>
                </select>
              </div>
              <div className="form-group">
                <textarea id="message" rows="5" required placeholder=" "></textarea>
                <label htmlFor="message">Your Message</label>
              </div>
              <Button variant="primary" size="lg" type="submit" className="submit-btn">Send Message</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
