import { motion } from 'framer-motion';

const Loader = ({ onComplete }) => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
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
      <div style={{
        width: '120px',
        height: '120px',
        marginBottom: '2rem',
        animation: 'pulse 2s infinite ease-in-out'
      }}>
        <img src="/images/Logo/transparent-logo.png" alt="Sarvana" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>
      <div style={{
        width: '200px',
        height: '4px',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: '2px',
        overflow: 'hidden'
      }}>
        <motion.div 
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, var(--color-accent), var(--color-secondary))'
          }}
        />
      </div>
    </motion.div>
  );
};

export default Loader;
