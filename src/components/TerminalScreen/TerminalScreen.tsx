'use client';

import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';

import { AsciiReveal } from '@/components/AsciiReveal';
import { FooterLinks } from '@/components/FooterLinks';
import { MatrixRain } from '@/components/MatrixRain';
import { TerminalCursor } from '@/components/TerminalCursor';
import { TypewriterText } from '@/components/TypewriterText';
import { COMMAND_TEXT, SHELL_PROMPT } from '@/lib/constants';
import { useReducedMotion, useSequence } from '@/lib/hooks';
import { TIMING } from '@/lib/timing';
import { ANIMATION_PHASE } from '@/lib/types';

import type React from 'react';

/**
 * Terminal screen content orchestrator.
 * Manages animation phases and renders appropriate content for each phase.
 */
export function TerminalScreen(): React.JSX.Element {
  const { phase, advancePhase } = useSequence(true);
  const prefersReducedMotion = useReducedMotion();
  const [showTypingCursor, setShowTypingCursor] = useState(true);

  const handleTypingComplete = useCallback((): void => {
    // Pause then advance to matrix phase
    window.setTimeout(() => {
      setShowTypingCursor(false);
      advancePhase();
    }, TIMING.POST_TYPING_PAUSE);
  }, [advancePhase]);

  const handleMatrixComplete = useCallback((): void => {
    advancePhase();
  }, [advancePhase]);

  const handleRevealComplete = useCallback((): void => {
    window.setTimeout(() => {
      advancePhase();
    }, TIMING.LINKS_START_DELAY);
  }, [advancePhase]);

  const handleLinksComplete = useCallback((): void => {
    advancePhase();
  }, [advancePhase]);

  // Reduced motion: show final state immediately with fade
  if (prefersReducedMotion && phase === ANIMATION_PHASE.FINISHED) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: TIMING.REDUCED_MOTION_FADE / 1000 }}
        className="flex flex-col items-center justify-center font-mono text-terminal-green"
      >
        <AsciiReveal isActive />
        <FooterLinks isActive />
        <div className="mt-4">
          <TerminalCursor />
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative min-h-[350px] font-mono text-terminal-green">
      {/* IDLE phase - empty screen */}
      {phase === ANIMATION_PHASE.IDLE && (
        <div className="flex items-center">
          <TerminalCursor />
        </div>
      )}

      {/* TYPING_COMMAND phase - shell prompt with typewriter */}
      {phase === ANIMATION_PHASE.TYPING_COMMAND && (
        <div className="flex items-center">
          <span className="text-terminal-cyan">{SHELL_PROMPT}</span>
          <span className="ml-2">
            <TypewriterText text={COMMAND_TEXT} onComplete={handleTypingComplete} />
          </span>
          {showTypingCursor && <TerminalCursor className="ml-0.5" />}
        </div>
      )}

      {/* MATRIX_EFFECT phase - canvas overlay */}
      <MatrixRain
        isActive={phase === ANIMATION_PHASE.MATRIX_EFFECT}
        onComplete={handleMatrixComplete}
      />

      {/* REVEAL_IDENTITY, SHOW_LINKS, FINISHED phases - ASCII and links */}
      {(phase === ANIMATION_PHASE.REVEAL_IDENTITY ||
        phase === ANIMATION_PHASE.SHOW_LINKS ||
        phase === ANIMATION_PHASE.FINISHED) && (
        <div className="flex flex-col items-center justify-center">
          <AsciiReveal
            isActive={
              phase === ANIMATION_PHASE.REVEAL_IDENTITY ||
              phase === ANIMATION_PHASE.SHOW_LINKS ||
              phase === ANIMATION_PHASE.FINISHED
            }
            onComplete={handleRevealComplete}
          />

          <FooterLinks
            isActive={phase === ANIMATION_PHASE.SHOW_LINKS || phase === ANIMATION_PHASE.FINISHED}
            onComplete={handleLinksComplete}
          />

          {phase === ANIMATION_PHASE.FINISHED && (
            <div className="mt-4">
              <TerminalCursor />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
