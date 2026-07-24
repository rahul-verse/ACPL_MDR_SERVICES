"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

interface AnimatedCounterProps {
  value: string | number;
  className?: string;
  duration?: number;
}

export function AnimatedCounter({
  value,
  className,
  duration = 1.6,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState<string>(String(value));

  useEffect(() => {
    if (!isInView) return;

    const rawString = String(value);
    const numericMatch = rawString.match(/[\d.]+/);

    if (!numericMatch) {
      setDisplayValue(rawString);
      return;
    }

    const numericValue = parseFloat(numericMatch[0]);
    const prefix = rawString.substring(0, numericMatch.index);
    const suffix = rawString.substring(
      (numericMatch.index ?? 0) + numericMatch[0].length
    );
    const isDecimal = numericMatch[0].includes(".");
    const decimalPlaces = isDecimal ? numericMatch[0].split(".")[1].length : 0;

    const controls = animate(0, numericValue, {
      duration,
      ease: [0.25, 0.1, 0.25, 1.0],
      onUpdate(latest) {
        const formattedNumber = isDecimal
          ? latest.toFixed(decimalPlaces)
          : Math.floor(latest).toLocaleString();
        setDisplayValue(`${prefix}${formattedNumber}${suffix}`);
      },
    });

    return () => controls.stop();
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}
