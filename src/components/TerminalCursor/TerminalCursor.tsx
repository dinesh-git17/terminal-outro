'use client';

import { motion } from 'framer-motion';

import { TIMING } from '@/lib/timing';

import type React from 'react';

export interface TerminalCursorProps {
  className?: string;
}

/**
 * Blinking block cursor for terminal aesthetic.
 * Uses CSS animation for consistent blink timing.
 */
export function TerminalCursor({ className = '' }: TerminalCursorProps): React.JSX.Element {
  return (
    <motion.span
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{
        duration: TIMING.CURSOR_BLINK_RATE / 1000,
        repeat: Infinity,
        times: [0, 0.5, 0.5, 1],
      }}
      className={`inline-block h-5 w-2.5 bg-terminal-green ${className}`}
      aria-hidden="true"
    />
  );
}
