import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import PageTransition from './components/layout/PageTransition';
import ScrollToTop from './components/layout/ScrollToTop';
import Loader from './components/ui/Loader';

import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import FranchisePage from './pages/FranchisePage';

import './App.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const AppContent = () => {
  const [loading, setLoading] = useState(true);
  const [contentReady, setContentReady] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Lenis smooth scrolling setup
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(500, 33);

    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  // Mount content on next frame after loader finishes to avoid jank
  useEffect(() => {
    if (!loading && !contentReady) {
      requestAnimationFrame(() => {
        setContentReady(true);
      });
    }
  }, [loading, contentReady]);

  return (
    <>
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {contentReady && (
        <div className="app-container">
          <ScrollToTop />
          <Navbar />
          <main className="main-content">
            <AnimatePresence mode="wait">
              <PageTransition key={location.pathname}>
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/franchise" element={<FranchisePage />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </PageTransition>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      )}
    </>
  );
};

const App = () => {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <AppContent />
    </Router>
  );
};

export default App;
