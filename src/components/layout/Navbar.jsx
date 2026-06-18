import { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { navigationLinks } from '../../data/navigation';
import Button from '../ui/Button';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollDirection = useScrollDirection();
  const navRef = useRef(null);

  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.5
    });
  }, { scope: navRef });

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <header 
        ref={navRef}
        className={`navbar ${scrollDirection === 'down' ? 'hidden' : ''} ${window.scrollY > 50 ? 'scrolled' : ''}`}
      >
        <div className="container navbar-container">
          <NavLink to="/" className="navbar-logo" onClick={() => setIsOpen(false)}>
            <img src="/images/Logo/logo.jpeg" alt="Sarvana" />
          </NavLink>

          <nav className="navbar-links desktop-only">
            {navigationLinks.map((link) => (
              <NavLink 
                key={link.id} 
                to={link.path}
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="navbar-actions desktop-only">
            <Button variant="primary" size="sm" href="/products">Order Now</Button>
          </div>

          <button className="hamburger-btn mobile-only" onClick={toggleMenu} aria-label="Menu">
            <div className={`hamburger ${isOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className="mobile-menu-content">
              {navigationLinks.map((link) => (
                <NavLink 
                  key={link.id} 
                  to={link.path}
                  className={({ isActive }) => isActive ? 'mobile-link active' : 'mobile-link'}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="mobile-menu-actions">
                <Button variant="primary" size="lg" href="/products" onClick={() => setIsOpen(false)} className="w-full">
                  Order Now
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
