import { useGSAP } from '@gsap/react';
import { fadeInUp, staggerReveal, parallaxBg, scaleReveal, clipPathReveal, slideInSide } from '../utils/gsapAnimations';

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

export const useScaleReveal = (containerRef, itemsSelector, dependencies = []) => {
  useGSAP(() => {
    if (containerRef.current) {
      const items = containerRef.current.querySelectorAll(itemsSelector);
      scaleReveal(items, containerRef.current);
    }
  }, { scope: containerRef, dependencies });
};

export const useClipPathReveal = (ref, direction = 'bottom', dependencies = []) => {
  useGSAP(() => {
    if (ref.current) {
      clipPathReveal(ref.current, ref.current, direction, 0);
    }
  }, { scope: ref, dependencies });
};

export const useStaggerClipPathReveal = (containerRef, itemsSelector, direction = 'bottom', dependencies = []) => {
  useGSAP(() => {
    if (containerRef.current) {
      const items = containerRef.current.querySelectorAll(itemsSelector);
      clipPathReveal(items, containerRef.current, direction, 0.1);
    }
  }, { scope: containerRef, dependencies });
};

export const useSlideInSide = (ref, side = 'left', delay = 0, dependencies = []) => {
  useGSAP(() => {
    if (ref.current) {
      slideInSide(ref.current, ref.current, side, delay);
    }
  }, { scope: ref, dependencies });
};

export const useTimelineReveal = (containerRef, itemsSelector, dependencies = []) => {
  useGSAP(() => {
    if (containerRef.current) {
      const items = containerRef.current.querySelectorAll(itemsSelector);
      items.forEach((item, index) => {
        const side = index % 2 === 0 ? 'left' : 'right';
        slideInSide(item, item, side, 0);
      });
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
