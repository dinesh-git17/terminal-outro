'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

import { TIMING } from '@/lib/timing';

import type React from 'react';

export interface AsciiRevealProps {
  isActive: boolean;
  onComplete?: () => void;
}

/**
 * Logo reveal with fade-in and glow effect.
 * Displays the DinBuilds logo image.
 */
export function AsciiReveal({ isActive, onComplete }: AsciiRevealProps): React.JSX.Element | null {
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    if (!isActive || hasCompletedRef.current) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true;
        onComplete?.();
      }
    }, TIMING.ASCII_FADE_IN);

    return (): void => {
      window.clearTimeout(timer);
    };
  }, [isActive, onComplete]);

  // Reset completion state when deactivated
  useEffect(() => {
    if (!isActive) {
      hasCompletedRef.current = false;
    }
  }, [isActive]);

  if (!isActive) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: TIMING.ASCII_FADE_IN / 1000,
        ease: 'easeOut',
      }}
      className="flex items-center justify-center"
      style={{
        filter:
          'drop-shadow(0 0 30px rgba(0, 255, 0, 0.8)) drop-shadow(0 0 60px rgba(0, 255, 0, 0.5)) drop-shadow(0 0 100px rgba(0, 255, 0, 0.3))',
      }}
    >
      <Image
        src="/logo.png"
        alt="DinBuilds"
        width={900}
        height={225}
        priority
        className="h-auto w-full max-w-[900px]"
      />
    </motion.div>
  );
}
