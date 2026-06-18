import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { navigationLinks } from '../../data/navigation';
import Button from '../ui/Button';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollDirection = useScrollDirection();
  const navRef = useRef(null);

  // Track scroll position to toggle background opacity/blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Lock scroll when mobile menu is open
    document.body.style.overflow = !isOpen ? 'hidden' : 'unset';
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  // Framer Motion staggered variants for mobile menu
  const menuVariants = {
    open: {
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };

  const itemVariants = {
    open: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 150, damping: 15 } },
    closed: { opacity: 0, y: 15 }
  };

  return (
    <>
      {/* SVG definitions for the mobile menu background illustrations */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
        <defs>
          <linearGradient id="menuCoffeeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4A2E1C" />
            <stop offset="100%" stopColor="#1A0F0A" />
          </linearGradient>
          <linearGradient id="menuGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D9B44A" />
            <stop offset="100%" stopColor="#C8943E" />
          </linearGradient>
          <linearGradient id="menuLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2D5016" />
            <stop offset="100%" stopColor="#1E330F" />
          </linearGradient>
          <linearGradient id="menuVeinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D9B44A" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#C8943E" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>

      <motion.header 
        ref={navRef}
        className={`navbar ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={scrollDirection === 'down' && isScrolled ? 'hidden' : 'visible'}
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 }
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 120, 
          damping: 20, 
          delay: isScrolled ? 0 : 0.5 
        }}
      >
        <div className="navbar-container">
          <NavLink to="/" className="navbar-logo" onClick={closeMenu}>
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
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Floating background decorative SVGs */}
            <div className="mobile-menu-bg-element element-coffee-menu">
              <svg viewBox="0 0 100 100" width="140" height="140">
                <ellipse cx="50" cy="50" rx="30" ry="40" fill="url(#menuCoffeeGrad)" transform="rotate(-15 50 50)" />
                <path d="M 50 10 Q 38 32 50 50 T 50 90" fill="none" stroke="url(#menuGoldGrad)" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="mobile-menu-bg-element element-leaf-menu">
              <svg viewBox="0 0 100 100" width="110" height="110">
                <path d="M50,15 C72,38 72,68 50,85 C28,68 28,38 50,15 Z" fill="url(#menuLeafGrad)" transform="rotate(25 50 50)" />
                <path d="M50,15 L50,85" stroke="url(#menuVeinGrad)" strokeWidth="2.5" fill="none" />
              </svg>
            </div>

            <motion.div 
              className="mobile-menu-content"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {navigationLinks.map((link) => (
                <motion.div key={link.id} variants={itemVariants}>
                  <NavLink 
                    to={link.path}
                    className={({ isActive }) => isActive ? 'mobile-link active' : 'mobile-link'}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div variants={itemVariants} className="w-full">
                <div className="mobile-menu-actions">
                  <Button variant="primary" size="lg" href="/products" onClick={closeMenu} className="w-full">
                    Order Now
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
