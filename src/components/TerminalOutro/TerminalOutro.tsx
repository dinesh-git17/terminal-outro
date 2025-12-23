'use client';

import { TerminalScreen } from '@/components/TerminalScreen';
import { TerminalShell } from '@/components/TerminalShell';

import type React from 'react';

/**
 * Root component for the terminal outro animation.
 * Renders atmospheric background with centered terminal shell.
 */
export function TerminalOutro(): React.JSX.Element {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Atmospheric background gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(0, 255, 0, 0.03) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Terminal window */}
      <TerminalShell>
        <TerminalScreen />
      </TerminalShell>
    </main>
  );
}
