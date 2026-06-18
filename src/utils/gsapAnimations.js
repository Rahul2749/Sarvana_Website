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
