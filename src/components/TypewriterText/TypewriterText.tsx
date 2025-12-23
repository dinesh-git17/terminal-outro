'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { TIMING } from '@/lib/timing';

import type React from 'react';

export interface TypewriterTextProps {
  text: string;
  charDelay?: number;
  startDelay?: number;
  onComplete?: () => void;
  className?: string;
}

/**
 * Character-by-character typewriter text effect.
 * Fires onComplete callback when all characters are displayed.
 */
export function TypewriterText({
  text,
  charDelay = TIMING.TYPEWRITER_CHAR_DELAY,
  startDelay = 0,
  onComplete,
  className = '',
}: TypewriterTextProps): React.JSX.Element {
  const [displayedLength, setDisplayedLength] = useState(0);
  const [hasStarted, setHasStarted] = useState(startDelay === 0);
  const hasCompletedRef = useRef(false);

  // Handle start delay
  useEffect(() => {
    if (startDelay <= 0 || hasStarted) {
      return undefined;
    }

    const startTimer = window.setTimeout(() => {
      setHasStarted(true);
    }, startDelay);

    return (): void => {
      window.clearTimeout(startTimer);
    };
  }, [startDelay, hasStarted]);

  // Handle character typing
  useEffect(() => {
    if (!hasStarted) {
      return undefined;
    }

    if (displayedLength >= text.length) {
      // Prevent multiple onComplete calls
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true;
        onComplete?.();
      }
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setDisplayedLength((prev) => prev + 1);
    }, charDelay);

    return (): void => {
      window.clearTimeout(timer);
    };
  }, [hasStarted, displayedLength, text.length, charDelay, onComplete]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      className={className}
    >
      {text.slice(0, displayedLength)}
    </motion.span>
  );
}
