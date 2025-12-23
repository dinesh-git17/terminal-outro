'use client';

import { useSyncExternalStore } from 'react';

/**
 * Get the current reduced motion preference.
 */
function getReducedMotionPreference(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Subscribe to reduced motion preference changes.
 */
function subscribeToReducedMotion(callback: () => void): () => void {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', callback);
  return (): void => {
    mediaQuery.removeEventListener('change', callback);
  };
}

/**
 * Server snapshot always returns false.
 */
function getServerSnapshot(): boolean {
  return false;
}

/**
 * Hook to detect user's prefers-reduced-motion preference.
 * Uses useSyncExternalStore for proper subscription to browser media query.
 * Returns true if user prefers reduced motion.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionPreference,
    getServerSnapshot
  );
}
