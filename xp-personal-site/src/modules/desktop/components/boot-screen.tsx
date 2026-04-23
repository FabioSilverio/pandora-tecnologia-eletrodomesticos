"use client";

interface BootScreenProps {
  progress: number;
}

export function BootScreen({ progress }: BootScreenProps) {
  return (
    <div className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-black text-white">
      <div className="mb-6 text-center">
        <div className="text-4xl font-bold tracking-tight text-blue-200">Windows XP</div>
        <div className="mt-2 text-sm text-blue-100/80">
          Personal Edition
        </div>
      </div>
      <div className="boot-frame w-[320px] p-2">
        <div className="h-4 overflow-hidden rounded-full border border-[#1a3e77] bg-[#0d1f36]">
          <div
            className="h-full bg-[linear-gradient(90deg,#4ec7ff,#3a76ef,#4ec7ff)] transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <p className="mt-5 text-xs tracking-[0.3em] text-blue-100/70 uppercase">
        Loading desktop shell
      </p>
    </div>
  );
}
