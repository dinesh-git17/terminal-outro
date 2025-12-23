export default function Loading(): React.ReactElement {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background font-mono text-terminal-green">
      <div className="text-center">
        <p className="text-glow animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
