import { useGSAP } from '@gsap/react';
import { fadeInUp, staggerReveal, parallaxBg } from '../utils/gsapAnimations';

export const useScrollReveal = (ref, dependencies = []) => {
  useGSAP(() => {
    if (ref.current) {
      fadeInUp(ref.current, ref.current);
    }
  }, { scope: ref, dependencies });
};

export const useStaggerReveal = (containerRef, itemsSelector, dependencies = []) => {
  useGSAP(() => {
    if (containerRef.current) {
      const items = containerRef.current.querySelectorAll(itemsSelector);
      staggerReveal(items, containerRef.current);
    }
  }, { scope: containerRef, dependencies });
};

export const useParallax = (ref, speed = 0.5, dependencies = []) => {
  useGSAP(() => {
    if (ref.current) {
      parallaxBg(ref.current, ref.current, speed);
    }
  }, { scope: ref, dependencies });
};
