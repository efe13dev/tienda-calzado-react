import { useEffect, useState } from "react";

interface CounterProps {
  target: number;
  duration?: number;
  suffix?: string;
}

const Counter = ({ target, duration = 2000, suffix = "" }: CounterProps) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let startTime: number;
    let animationId: number;

    const animate = (timestamp: number) => {
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
  }, [target, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

export default Counter;
