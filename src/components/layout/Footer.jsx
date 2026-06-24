import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { navigationLinks, socialLinks } from '../../data/navigation';
import { useStaggerReveal } from '../../hooks/useGSAPAnimations';
import './Footer.css';

const Footer = () => {
  const footerGridRef = useRef(null);
  useStaggerReveal(footerGridRef, '.footer-brand, .footer-links, .footer-newsletter');
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid" ref={footerGridRef}>
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src="/images/Logo/Sarvana_Logo.png" alt="Sarvana" />
            </Link>
            <p className="footer-description">
              Premium tea, coffee, and snacks naturally sweetened with the goodness of traditional Thati Bellam.
            </p>
            <div className="social-links">
              {socialLinks.map((link, index) => (
                <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="social-link" aria-label={link.label}>
                  <span className={`icon-${link.icon}`}>{link.label[0]}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              {navigationLinks.map((link) => (
                <li key={link.id}><Link to={link.path}>{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer-links">
            <h3>Products</h3>
            <ul>
              <li><Link to="/products?category=Tea">Premium Tea</Link></li>
              <li><Link to="/products?category=Coffee">Filter Coffee</Link></li>
              <li><Link to="/products?category=Snacks Mandi">Snacks Mandi</Link></li>
            </ul>
          </div>

          <div className="footer-newsletter">
            <h3>Stay Updated</h3>
            <p>Subscribe to our newsletter for offers and updates.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email address" required />
              <button type="submit" className="btn btn-primary btn-sm">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Sarvana Thati Bellam Tea & Coffee. All rights reserved.</p>
        </div>
      </div>
      
      {/* Decorative SVG */}
      <div className="footer-decoration">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
           <path d="M0,100 C20,80 50,100 100,50 L100,100 Z" fill="rgba(217, 180, 74, 0.05)" />
        </svg>
      </div>
    </footer>
  );
};

export default Footer;
