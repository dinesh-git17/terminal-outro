'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { TIMING } from '@/lib/timing';
import { ANIMATION_PHASE } from '@/lib/types';

import { useReducedMotion } from './useReducedMotion';

import type { AnimationPhase, UseSequenceReturn } from '@/lib/types';

/**
 * State machine hook for orchestrating animation phases.
 * Handles automatic phase transitions based on timing constants.
 *
 * @param autoStart - Whether to automatically start the sequence after boot delay
 * @returns Object containing current phase and control functions
 */
export function useSequence(autoStart: boolean = true): UseSequenceReturn {
  const prefersReducedMotion = useReducedMotion();

  // Compute initial phase - skip to FINISHED if reduced motion is preferred
  const initialPhase = useMemo((): AnimationPhase => {
    if (prefersReducedMotion && autoStart) {
      return ANIMATION_PHASE.FINISHED;
    }
    return ANIMATION_PHASE.IDLE;
  }, [prefersReducedMotion, autoStart]);

  const [phase, setPhase] = useState<AnimationPhase>(initialPhase);

  const advancePhase = useCallback((): void => {
    setPhase((current) => {
      switch (current) {
        case ANIMATION_PHASE.IDLE:
          return ANIMATION_PHASE.TYPING_COMMAND;
        case ANIMATION_PHASE.TYPING_COMMAND:
          return ANIMATION_PHASE.MATRIX_EFFECT;
        case ANIMATION_PHASE.MATRIX_EFFECT:
          return ANIMATION_PHASE.REVEAL_IDENTITY;
        case ANIMATION_PHASE.REVEAL_IDENTITY:
          return ANIMATION_PHASE.SHOW_LINKS;
        case ANIMATION_PHASE.SHOW_LINKS:
          return ANIMATION_PHASE.FINISHED;
        case ANIMATION_PHASE.FINISHED:
          return ANIMATION_PHASE.FINISHED;
        default:
          return current;
      }
    });
  }, []);

  const resetSequence = useCallback((): void => {
    setPhase(ANIMATION_PHASE.IDLE);
  }, []);

  // Auto-start after boot delay (only if not reduced motion)
  useEffect(() => {
    if (!autoStart || phase !== ANIMATION_PHASE.IDLE || prefersReducedMotion) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      advancePhase();
    }, TIMING.BOOT_DELAY);

    return (): void => {
      window.clearTimeout(timer);
    };
  }, [autoStart, phase, advancePhase, prefersReducedMotion]);

  return {
    phase,
    advancePhase,
    resetSequence,
    isComplete: phase === ANIMATION_PHASE.FINISHED,
  };
}
