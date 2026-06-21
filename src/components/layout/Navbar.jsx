import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { navigationLinks } from '../../data/navigation';
import Button from '../ui/Button';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollDirection = useScrollDirection();
  const location = useLocation();
  const navigate = useNavigate();
  const [openSubmenu, setOpenSubmenu] = useState(null);
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
    setOpenSubmenu(null);
    // Lock scroll when mobile menu is open
    document.body.style.overflow = !isOpen ? 'hidden' : 'unset';
  };

  const closeMenu = () => {
    setIsOpen(false);
    // eslint-disable-next-line react-hooks/immutability
    document.body.style.overflow = 'unset';
  };

  const handleLinkClick = (e, path) => {
    e.preventDefault();
    if (path.startsWith('/#')) {
      const hash = path.substring(1); // gets '#something'
      const element = document.querySelector(hash);
      if (element) {
        // Since Lenis is used, we can just use native scrollIntoView and Lenis might catch it, or just do smooth scroll
        element.scrollIntoView({ behavior: 'smooth' });
        // Update URL hash without jumping
        const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');
        window.history.pushState(null, '', baseUrl + path);
      }
    } else {
      navigate(path);
    }
    closeMenu();
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
          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            <img src="/images/Logo/logo.jpeg" alt="Sarvana" />
          </Link>

          <nav className="navbar-links desktop-only">
            {navigationLinks.map((link) => {
              const linkHash = link.path.replace('/', '');
              const isActive = location.hash === linkHash;
              
              if (link.submenus) {
                return (
                  <div key={link.id} className="nav-dropdown-container">
                    <div 
                      className={isActive ? 'nav-link active' : 'nav-link'}
                      style={{ cursor: 'default' }}
                    >
                      {link.label}
                      <svg className="dropdown-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                    <div className="nav-dropdown">
                      {link.submenus.map(sub => (
                        <Link 
                          key={sub.id}
                          to={sub.path}
                          className="dropdown-link"
                          onClick={(e) => handleLinkClick(e, sub.path)}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link 
                  key={link.id} 
                  to={link.path}
                  className={isActive ? 'nav-link active' : 'nav-link'}
                  onClick={(e) => handleLinkClick(e, link.path)}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="navbar-actions desktop-only">
            <Button 
              variant="primary" 
              size="sm" 
              onClick={() => navigate('/franchise')}
            >
              Apply for Franchise
            </Button>
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
            <button className="mobile-menu-close" onClick={closeMenu} aria-label="Close menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
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
              {navigationLinks.map((link) => {
                const linkHash = link.path.replace('/', '');
                const isActive = location.hash === linkHash;
                
                return (
                  <motion.div key={link.id} variants={itemVariants} className="mobile-link-container">
                    {link.submenus ? (
                      <>
                        <div 
                          className={isActive ? 'mobile-link active' : 'mobile-link'}
                          onClick={() => setOpenSubmenu(openSubmenu === link.id ? null : link.id)}
                          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer' }}
                        >
                          {link.label}
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: openSubmenu === link.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </div>
                        <AnimatePresence>
                          {openSubmenu === link.id && (
                            <motion.div 
                              className="mobile-submenus"
                              initial={{ height: 0, opacity: 0, marginTop: 0 }}
                              animate={{ height: 'auto', opacity: 1, marginTop: '0.5rem' }}
                              exit={{ height: 0, opacity: 0, marginTop: 0 }}
                              style={{ overflow: 'hidden' }}
                            >
                              {link.submenus.map(sub => (
                                <Link
                                  key={sub.id}
                                  to={sub.path}
                                  className="mobile-sublink"
                                  onClick={(e) => handleLinkClick(e, sub.path)}
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link 
                        to={link.path}
                        className={isActive ? 'mobile-link active' : 'mobile-link'}
                        onClick={(e) => handleLinkClick(e, link.path)}
                      >
                        {link.label}
                      </Link>
                    )}
                    )}
                  </motion.div>
                );
              })}
              <motion.div variants={itemVariants} className="w-full">
                <div className="mobile-menu-actions">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="w-full"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/franchise');
                      closeMenu();
                    }}
                  >
                    Apply for Franchise
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
