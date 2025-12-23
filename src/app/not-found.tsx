import Link from 'next/link';

export default function NotFound(): React.ReactElement {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background font-mono text-terminal-green">
      <h2 className="text-glow mb-4 text-2xl">404 - NOT FOUND</h2>
      <p className="mb-8 text-terminal-gray">The requested resource could not be located.</p>
      <Link
        href="/"
        className="rounded border border-terminal-green px-4 py-2 transition-colors hover:bg-terminal-green hover:text-background"
      >
        [ RETURN HOME ]
      </Link>
    </div>
  );
}
