import { useEffect, useState } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  onComplete?: () => void;
}

const AnimatedText = ({ text, className = "", delay = 0, onComplete }: AnimatedTextProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

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
      <span className="invisible">{text}</span>
      {/* Texto animado */}
      <span
        className={`absolute top-0 left-0 w-full transform transition-all duration-1000 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {text}
      </span>
    </span>
  );
};

export default AnimatedText;
