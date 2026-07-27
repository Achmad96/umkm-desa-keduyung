"use client";
import { useState, useEffect, useRef } from "react";

export default function AnimatedNumber({ value, suffix = "", prefix = "", duration = 2000, decimal = false }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const end = parseFloat(value);
    if (isNaN(end)) {
      setCount(value);
      return;
    }

    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      setCount(end * easeProgress);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    window.requestAnimationFrame(step);
  }, [isVisible, value, duration]);

  const displayValue = isNaN(parseFloat(value)) ? count : decimal ? Number(count).toFixed(1).replace(".", ",") : Math.floor(count).toLocaleString("id-ID");

  return (
    <span ref={elementRef}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
