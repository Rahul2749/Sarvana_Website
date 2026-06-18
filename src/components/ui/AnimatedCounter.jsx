import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { counterAnimation } from '../../utils/gsapAnimations';

const AnimatedCounter = ({ end, suffix = '', duration = 2, className = '' }) => {
  const counterRef = useRef(null);

  useGSAP(() => {
    if (counterRef.current) {
      counterAnimation(counterRef.current, end, counterRef.current);
    }
  }, { scope: counterRef });

  return (
    <span className={className}>
      <span ref={counterRef}>0</span>{suffix}
    </span>
  );
};

export default AnimatedCounter;
