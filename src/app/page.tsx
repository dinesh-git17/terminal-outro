'use client';

export default function Home(): React.ReactElement {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-background">
      {/* Placeholder for terminal outro animation */}
      <div className="text-center font-mono">
        <h1 className="text-glow mb-4 text-4xl font-bold text-terminal-green">
          DinBuilds Terminal Outro
        </h1>
        <p className="text-terminal-gray">Animation implementation pending</p>
        <div className="mt-8">
          <span className="text-terminal-green">$</span>
          <span className="cursor-blink ml-2 inline-block h-5 w-3 bg-terminal-green" />
        </div>
      </div>
    </div>
  );
}
