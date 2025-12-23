/**
 * Central timing constants for all animations.
 * All values are in milliseconds.
 */
export const TIMING = {
  // Initial delays
  BOOT_DELAY: 800,

  // Typing phase
  PROMPT_APPEAR_DELAY: 200,
  TYPEWRITER_CHAR_DELAY: 65,
  POST_TYPING_PAUSE: 600,

  // Cursor
  CURSOR_BLINK_RATE: 530,

  // Matrix phase
  MATRIX_DURATION: 2500,
  MATRIX_FADE_IN: 300,
  MATRIX_FADE_OUT: 500,
  MATRIX_DROP_SPEED: 50,

  // Reveal phase
  ASCII_FADE_IN: 800,

  // Links phase
  LINKS_START_DELAY: 400,
  LINK_TYPEWRITER_DELAY: 40,
  LINK_LINE_DELAY: 300,

  // Reduced motion
  REDUCED_MOTION_FADE: 300,
} as const;

export type TimingKey = keyof typeof TIMING;
