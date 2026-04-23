"use client";

interface ScreensaverProps {
  name: string;
}

export function Screensaver({ name }: ScreensaverProps) {
  return (
    <div className="fixed inset-0 z-[125] cursor-none overflow-hidden bg-black">
      <div className="screensaver-bounce absolute left-0 top-0 rounded-[20px] border border-white/15 bg-[linear-gradient(180deg,#3b8eff,#0c4fc4)] px-8 py-5 text-white shadow-[0_20px_30px_rgba(0,0,0,0.45)]">
        <div className="text-sm uppercase tracking-[0.3em] text-white/70">Screensaver</div>
        <div className="mt-2 text-4xl font-bold">{name}</div>
        <div className="mt-1 text-lg text-white/80">Designer and AI Designer</div>
      </div>
    </div>
  );
}
