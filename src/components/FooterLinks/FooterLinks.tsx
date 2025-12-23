'use client';

import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

import { TypewriterText } from '@/components/TypewriterText';
import { FOOTER_LINKS } from '@/lib/constants';
import { TIMING } from '@/lib/timing';

import type React from 'react';

export interface FooterLinksProps {
  isActive: boolean;
  onComplete?: () => void;
}

/**
 * Footer links with sequential typewriter effect.
 * Types out each link line one after another.
 */
export function FooterLinks({ isActive, onComplete }: FooterLinksProps): React.JSX.Element | null {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState<number[]>([]);
  const hasCompletedRef = useRef(false);

  const handleLineComplete = useCallback(
    (lineIndex: number): void => {
      setCompletedLines((prev) => [...prev, lineIndex]);

      if (lineIndex < FOOTER_LINKS.length - 1) {
        // Start next line after delay
        window.setTimeout(() => {
          setCurrentLineIndex(lineIndex + 1);
        }, TIMING.LINK_LINE_DELAY);
      } else {
        // All lines complete
        if (!hasCompletedRef.current) {
          hasCompletedRef.current = true;
          onComplete?.();
        }
      }
    },
    [onComplete]
  );

  // Reset state when deactivated - this is intentional state reset based on prop change
  // Using queueMicrotask to avoid synchronous setState warning while maintaining behavior
  useEffect(() => {
    if (!isActive) {
      queueMicrotask(() => {
        setCurrentLineIndex(0);
        setCompletedLines([]);
        hasCompletedRef.current = false;
      });
    }
  }, [isActive]);

  if (!isActive) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="mt-8 space-y-2 text-center font-mono text-sm"
    >
      {FOOTER_LINKS.map((link, index) => {
        const isVisible = index <= currentLineIndex;
        const isComplete = completedLines.includes(index);
        const fullText = `${link.label} ${link.url}`;

        if (!isVisible) {
          return null;
        }

        return (
          <div key={link.url} className="text-terminal-green-dim">
            {isComplete ? (
              <span>{fullText}</span>
            ) : (
              <TypewriterText
                text={fullText}
                charDelay={TIMING.LINK_TYPEWRITER_DELAY}
                onComplete={(): void => handleLineComplete(index)}
              />
            )}
          </div>
        );
      })}
    </motion.div>
  );
}
