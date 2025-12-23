'use client';

export interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ reset }: ErrorProps): React.ReactElement {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background font-mono text-terminal-green">
      <h2 className="text-glow mb-4 text-2xl">ERROR: Something went wrong</h2>
      <button
        onClick={reset}
        className="rounded border border-terminal-green px-4 py-2 transition-colors hover:bg-terminal-green hover:text-background"
      >
        [ RETRY ]
      </button>
    </div>
  );
}
