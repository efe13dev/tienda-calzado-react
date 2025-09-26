import { useState, useEffect } from 'react';

const AnimatedText = ({ text, className = '', delay = 0, onComplete }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      if (onComplete) onComplete();
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, onComplete]);

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Espacio reservado para evitar saltos */}
      <span className="invisible">
        {text}
      </span>
      {/* Texto animado */}
      <span 
        className={`absolute top-0 left-0 w-full transform transition-all duration-1000 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        {text}
      </span>
    </span>
  );
};

export default AnimatedText;