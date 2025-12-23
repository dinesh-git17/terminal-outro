import type React from 'react';

/**
 * macOS-style traffic light buttons (red, yellow, green).
 * Purely decorative - no interactive functionality.
 */
export function TrafficLights(): React.JSX.Element {
  return (
    <div className="flex items-center gap-2" aria-hidden="true">
      <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
      <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
      <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
    </div>
  );
}
