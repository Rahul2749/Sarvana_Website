import gsap from 'gsap';

export const fadeInUp = (element, trigger, delay = 0) => {
  return gsap.fromTo(
    element,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      delay,
      force3D: true,
      scrollTrigger: {
        trigger: trigger || element,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    }
  );
};

export const staggerReveal = (elements, trigger, staggerTime = 0.1) => {
  return gsap.fromTo(
    elements,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: staggerTime,
      ease: 'power2.out',
      force3D: true,
      scrollTrigger: {
        trigger: trigger,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    }
  );
};

export const parallaxBg = (element, trigger, speed = 0.5) => {
  return gsap.to(element, {
    yPercent: speed * 100,
    ease: 'none',
    force3D: true,
    scrollTrigger: {
      trigger: trigger,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
};

export const counterAnimation = (element, endValue, trigger) => {
  return gsap.fromTo(
    element,
    { innerHTML: 0 },
    {
      innerHTML: endValue,
      duration: 2,
      ease: 'power2.out',
      snap: { innerHTML: 1 },
      scrollTrigger: {
        trigger: trigger || element,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    }
  );
};

export const scaleReveal = (elements, trigger, staggerTime = 0.1) => {
  return gsap.fromTo(
    elements,
    { scale: 0.95, opacity: 0, y: 30 },
    {
      scale: 1,
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: staggerTime,
      ease: 'power3.out',
      force3D: true,
      scrollTrigger: {
        trigger: trigger,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    }
  );
};

export const clipPathReveal = (elements, trigger, direction = 'bottom', staggerTime = 0) => {
  const clipPaths = {
    bottom: 'inset(100% 0 0 0)',
    top: 'inset(0 0 100% 0)',
    left: 'inset(0 100% 0 0)',
    right: 'inset(0 0 0 100%)'
  };
  
  return gsap.fromTo(
    elements,
    { clipPath: clipPaths[direction] || clipPaths.bottom, opacity: 0 },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      opacity: 1,
      duration: 1.5,
      ease: 'power3.inOut',
      stagger: staggerTime,
      force3D: true,
      scrollTrigger: {
        trigger: trigger || elements,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    }
  );
};

export const slideInSide = (element, trigger, side = 'left', delay = 0) => {
  return gsap.fromTo(
    element,
    { x: side === 'left' ? -80 : 80, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
      delay,
      force3D: true,
      scrollTrigger: {
        trigger: trigger || element,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    }
  );
};

/* ============================================================
   NEW: Premium Cinematic Animation Presets
   ============================================================ */

/**
 * Cinematic reveal — clip-path + scale + blur combined
 * Premium entrance for major sections
 */
export const cinematicReveal = (element, trigger, delay = 0) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 60,
      scale: 0.95,
      filter: 'blur(6px)',
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: 1.4,
      ease: 'power3.out',
      delay,
      force3D: true,
      scrollTrigger: {
        trigger: trigger || element,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    }
  );
};

/**
 * Golden line reveal — decorative gold line draws across
 * Use for section dividers
 */
export const goldenLineReveal = (element, trigger, delay = 0) => {
  return gsap.fromTo(
    element,
    { scaleX: 0, opacity: 0 },
    {
      scaleX: 1,
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
      delay,
      transformOrigin: 'center center',
      scrollTrigger: {
        trigger: trigger || element,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    }
  );
};

/**
 * Card emerge — product cards rise from below with fade + scale
 * Use for product grid items
 */
export const cardEmerge = (elements, trigger, staggerTime = 0.12) => {
  return gsap.fromTo(
    elements,
    {
      y: 80,
      opacity: 0,
      scale: 0.9,
      rotateX: 5,
    },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      duration: 1,
      stagger: staggerTime,
      ease: 'power3.out',
      force3D: true,
      scrollTrigger: {
        trigger: trigger,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    }
  );
};

/**
 * Parallax float — continuous floating for decorative elements
 */
export const parallaxFloat = (element, options = {}) => {
  const {
    yAmount = 20,
    rotationAmount = 5,
    duration = 4,
    delay = 0,
  } = options;

  return gsap.to(element, {
    y: `+=${yAmount}`,
    rotation: rotationAmount,
    duration,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay,
  });
};
