import { TrafficLights } from './TrafficLights';

import type React from 'react';
import type { ReactNode } from 'react';

export interface TerminalShellProps {
  children: ReactNode;
}

/**
 * macOS-style glassmorphism terminal window.
 * Provides the visual shell container with title bar and traffic lights.
 */
export function TerminalShell({ children }: TerminalShellProps): React.JSX.Element {
  return (
    <div
      className="relative w-[80vw] max-w-4xl overflow-hidden rounded-xl border border-white/10 bg-black/80 backdrop-blur-xl"
      style={{
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 80px rgba(0, 255, 0, 0.03)',
      }}
    >
      {/* Title bar */}
      <div className="flex h-10 items-center gap-2 border-b border-white/10 bg-black/50 px-4">
        <TrafficLights />
        <span className="ml-auto font-mono text-xs text-terminal-gray">DinBuilds Terminal</span>
      </div>

      {/* Screen content area */}
      <div className="relative min-h-[400px] p-6 pt-10">{children}</div>
    </div>
  );
}
