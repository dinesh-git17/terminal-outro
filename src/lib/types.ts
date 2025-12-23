/**
 * Animation phase states for the terminal outro sequence.
 * Transitions: IDLE -> TYPING_COMMAND -> MATRIX_EFFECT -> REVEAL_IDENTITY -> SHOW_LINKS -> FINISHED
 */
export const ANIMATION_PHASE = {
  IDLE: 'IDLE',
  TYPING_COMMAND: 'TYPING_COMMAND',
  MATRIX_EFFECT: 'MATRIX_EFFECT',
  REVEAL_IDENTITY: 'REVEAL_IDENTITY',
  SHOW_LINKS: 'SHOW_LINKS',
  FINISHED: 'FINISHED',
} as const;

export type AnimationPhase = (typeof ANIMATION_PHASE)[keyof typeof ANIMATION_PHASE];

/**
 * Return type for the useSequence hook.
 */
export interface UseSequenceReturn {
  phase: AnimationPhase;
  advancePhase: () => void;
  resetSequence: () => void;
  isComplete: boolean;
}
