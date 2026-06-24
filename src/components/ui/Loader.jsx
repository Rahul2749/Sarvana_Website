import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleProgress = (e) => {
      setProgress(e.detail.progress);
    };

    window.addEventListener('loaderProgress', handleProgress);
    return () => window.removeEventListener('loaderProgress', handleProgress);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] } }}
      onAnimationComplete={onComplete}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: 'var(--color-primary)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
      }}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{
          width: '240px',
          height: '240px',
          marginBottom: '3rem',
          position: 'relative'
        }}
      >
        <motion.img 
          src="/images/Logo/preloader-logo.jpg" 
          alt="Sarvana" 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
          style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }} 
        />
      </motion.div>

      <div style={{
        width: '240px',
        height: '2px',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: '2px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <motion.div 
          initial={{ width: '0%' }}
          animate={{ width: `${Math.max(15, progress)}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, var(--color-accent), #FFF)',
            boxShadow: '0 0 10px rgba(217, 180, 74, 0.5)'
          }}
        />
      </div>
    </motion.div>
  );
};

export default Loader;

