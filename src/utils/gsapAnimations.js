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
