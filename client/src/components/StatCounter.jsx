// components/StatCounter.jsx — Animated number counter for impact stats section
import { useState, useEffect, useRef } from 'react';

/**
 * Animates counting from 0 to the target value when the element scrolls into view.
 * Props:
 *  - value: number (e.g. 5000)
 *  - label: string (e.g. "Volunteers")
 *  - suffix: string (e.g. "+", "K+")
 *  - icon: React element
 */
const StatCounter = ({ value, label, suffix = '+', icon }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // Use IntersectionObserver to trigger animation on scroll
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCount();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAnimated]);

  const animateCount = () => {
    const duration = 1800; // ms
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
  };

  return (
    <div ref={ref} className="flex flex-col items-center text-center p-6">
      {/* Icon */}
      {icon && (
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
          style={{ background: 'rgba(13,115,119,0.12)' }}
        >
          {icon}
        </div>
      )}
      {/* Counter */}
      <div className="font-heading text-4xl font-bold mb-1" style={{ color: 'var(--color-primary)' }}>
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-gray-600 text-sm font-medium uppercase tracking-wide">{label}</div>
    </div>
  );
};

export default StatCounter;
