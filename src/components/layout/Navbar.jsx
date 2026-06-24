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
  const navRef = useRef(null);

  const [expandedMenus, setExpandedMenus] = useState({});

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
    // Reset expanded menus when closing
    setExpandedMenus({});
    // eslint-disable-next-line react-hooks/immutability
    document.body.style.overflow = 'unset';
  };

  const toggleSubmenu = (e, id) => {
    e.stopPropagation();
    setExpandedMenus(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleLinkClick = (e, path) => {
    // Check if path has a hash (like #about or #product-showcase)
    const hashMatch = path.match(/#([a-zA-Z0-9_-]+)/);
    if (hashMatch) {
      const hash = '#' + hashMatch[1];
      const element = document.querySelector(hash);
      if (element) {
        // Check if we are currently on the Home page (or base path)
        const isHomePage = location.pathname === '/' || location.pathname === import.meta.env.BASE_URL;
        // Determine the target pathname (excluding query params and hash)
        const targetPathname = path.split('?')[0].split('#')[0] || '/';
        const isSamePage = isHomePage && (targetPathname === '/' || targetPathname === '');

        if (isSamePage) {
          e.preventDefault();
          element.scrollIntoView({ behavior: 'smooth' });
          navigate(path);
        }
      }
    }
    // Defer closing the menu slightly so the link click/touch event can propagate fully in mobile browsers
    setTimeout(() => {
      closeMenu();
    }, 100);
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
        className={`navbar ${isScrolled || location.pathname !== '/' ? 'scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate="visible"
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
        <div className="topbar">
          <div className="topbar-inner">
            <div className="topbar-left">
              <div className="topbar-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>MIG 524, Mayuri Nagar, Nizampet</span>
              </div>
            </div>
            <div className="topbar-right">
              <div className="topbar-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>+91 80088 98935</span>
              </div>
              <div className="topbar-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>hello@sarvanafoods.com</span>
              </div>
            </div>
          </div>
        </div>
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
              href="/#franchise"
              onClick={(e) => handleLinkClick(e, '/#franchise')}
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
                      <div 
                        className={isActive ? 'mobile-link active' : 'mobile-link'}
                        onClick={(e) => toggleSubmenu(e, link.id)}
                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                      >
                        {link.label}
                        <svg 
                          width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          style={{ 
                            transform: expandedMenus[link.id] ? 'rotate(180deg)' : 'rotate(0deg)', 
                            transition: 'transform 0.3s ease',
                            marginTop: '2px'
                          }}
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </div>
                    ) : (
                      <Link 
                        to={link.path}
                        className={isActive ? 'mobile-link active' : 'mobile-link'}
                        onClick={(e) => handleLinkClick(e, link.path)}
                      >
                        {link.label}
                      </Link>
                    )}
                    
                    <AnimatePresence>
                      {link.submenus && expandedMenus[link.id] && (
                        <motion.div 
                          className="mobile-submenus"
                          initial={{ height: 0, opacity: 0, marginTop: 0, marginBottom: 0 }}
                          animate={{ height: 'auto', opacity: 1, marginTop: '0.5rem', marginBottom: '1rem' }}
                          exit={{ height: 0, opacity: 0, marginTop: 0, marginBottom: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
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
                  </motion.div>
                );
              })}
              <motion.div variants={itemVariants} className="w-full">
                <div className="mobile-menu-actions">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    href="/#franchise" 
                    className="w-full"
                    onClick={(e) => handleLinkClick(e, '/#franchise')}
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
