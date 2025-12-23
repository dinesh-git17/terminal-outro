'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { MATRIX_CHARACTERS } from '@/lib/constants';
import { TIMING } from '@/lib/timing';

import type React from 'react';

export interface MatrixRainProps {
  isActive: boolean;
  onComplete?: () => void;
}

interface Column {
  y: number;
  speed: number;
}

const CHAR_SIZE = 14;
const CHAR_HEIGHT = 20;

/**
 * Canvas-based matrix rain effect.
 * Runs for a fixed duration then fades out.
 * Uses deterministic character selection for reproducibility.
 */
export function MatrixRain({ isActive, onComplete }: MatrixRainProps): React.JSX.Element | null {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const columnsRef = useRef<Column[]>([]);
  const hasCompletedRef = useRef(false);
  const [opacity, setOpacity] = useState(0);

  // Reset state when deactivated - using queueMicrotask to avoid synchronous setState warning
  useEffect(() => {
    if (!isActive) {
      queueMicrotask(() => {
        hasCompletedRef.current = false;
        setOpacity(0);
      });
      return undefined;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return undefined;
    }

    // Set canvas size to match container
    const updateCanvasSize = (): void => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    updateCanvasSize();

    // Initialize columns with deterministic starting positions
    const columnCount = Math.floor(canvas.width / CHAR_SIZE);
    columnsRef.current = Array.from({ length: columnCount }, (_, i) => ({
      // Deterministic starting position based on column index
      y: Math.floor(Math.sin(i * 0.5) * 10 + 5),
      // Deterministic speed variation based on column index
      speed: 0.8 + (Math.sin(i * 0.3) * 0.2 + 0.2),
    }));

    startTimeRef.current = performance.now();
    let hasFadedOut = false;

    // Fade in - using queueMicrotask to avoid synchronous setState warning
    queueMicrotask(() => {
      setOpacity(1);
    });

    const draw = (currentTime: number): void => {
      const elapsed = currentTime - startTimeRef.current;

      // Check if should start fading out - only trigger once
      if (!hasFadedOut && elapsed >= TIMING.MATRIX_DURATION - TIMING.MATRIX_FADE_OUT) {
        hasFadedOut = true;
        queueMicrotask(() => {
          setOpacity(0);
        });
      }

      // Check if animation is complete
      if (elapsed >= TIMING.MATRIX_DURATION) {
        if (!hasCompletedRef.current) {
          hasCompletedRef.current = true;
          onComplete?.();
        }
        return;
      }

      // Semi-transparent black for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set font
      ctx.font = `${CHAR_SIZE}px monospace`;

      const columns = columnsRef.current;

      for (let i = 0; i < columns.length; i++) {
        const column = columns[i];
        if (!column) continue;

        // Deterministic character selection based on column index and elapsed time
        const charIndex =
          (i + Math.floor(elapsed / 100) + Math.floor(column.y)) % MATRIX_CHARACTERS.length;
        const char = MATRIX_CHARACTERS[charIndex];

        if (char === undefined) continue;

        const x = i * CHAR_SIZE;
        const y = column.y * CHAR_HEIGHT;

        // Vary brightness deterministically based on position
        const brightness = 0.4 + 0.6 * Math.abs(Math.sin(i * 0.1 + elapsed * 0.002));
        ctx.fillStyle = `rgba(0, 255, 0, ${brightness})`;

        ctx.fillText(char, x, y);

        // Move column down
        column.y += column.speed;

        // Reset column when it reaches bottom (deterministic reset threshold)
        if (y > canvas.height && Math.sin(i + elapsed * 0.005) > 0.95) {
          column.y = 0;
        }
      }

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    animationFrameRef.current = requestAnimationFrame(draw);

    return (): void => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isActive, onComplete]);

  if (!isActive) {
    return null;
  }

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: TIMING.MATRIX_FADE_IN / 1000 }}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
