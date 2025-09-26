import { useState, useEffect } from 'react';

const AnimatedCounter = ({ target, duration = 2000, suffix = '', startAnimation = false }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (startAnimation && !isVisible) {
      setIsVisible(true);
    }
  }, [startAnimation, isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      const currentCount = Math.floor(target * easeOutQuart);
      
      setCount(currentCount);

      if (percentage < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [target, duration, isVisible]);

  return (
    <span className="relative inline-block">
      {/* Espacio reservado para evitar saltos */}
      <span className="invisible">
        {target}{suffix}
      </span>
      {/* Contador animado */}
      <span className={`absolute top-0 left-0 w-full transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}>
        {count}{suffix}
      </span>
    </span>
  );
};

export default AnimatedCounter;