"use client";

interface LoginScreenProps {
  name: string;
  role: string;
  onLogin: () => void;
}

export function LoginScreen({ name, role, onLogin }: LoginScreenProps) {
  return (
    <div className="fixed inset-0 z-[140] flex items-center justify-center bg-[radial-gradient(circle_at_top,#7db9ff,#3272d9_42%,#103c8f_100%)]">
      <div className="flex w-full max-w-[900px] overflow-hidden rounded-[18px] border border-white/25 bg-white/12 shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-[2px]">
        <div className="flex w-[42%] flex-col justify-between bg-[linear-gradient(180deg,#0b3eaa,#114fbf)] p-8 text-white">
          <div>
            <div className="text-sm uppercase tracking-[0.26em] text-white/70">
              Welcome
            </div>
            <h1 className="mt-4 text-5xl font-bold tracking-tight">Windows XP</h1>
            <p className="mt-4 max-w-sm text-sm leading-7 text-white/85">
              Fabio&apos;s portfolio desktop. Log in to open projects, experiments, playlists, and a few hidden easter eggs.
            </p>
          </div>
          <div className="text-sm text-white/65">Personal Edition</div>
        </div>
        <div className="flex flex-1 items-center justify-center bg-[linear-gradient(180deg,#f7fbff,#e8f1ff)] p-10">
          <div className="w-full max-w-[320px] rounded-[22px] border border-[#bfd3f6] bg-white p-6 text-center shadow-[0_10px_30px_rgba(50,93,170,0.15)]">
            <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-[linear-gradient(180deg,#6baeff,#2e6cda)] text-4xl font-bold text-white">
              F
            </div>
            <div className="mt-4 text-2xl font-bold text-[#173b68]">{name}</div>
            <div className="mt-1 text-sm text-[#567393]">{role}</div>
            <button
              type="button"
              className="xp-button mt-6 w-full px-4 py-3 text-sm font-semibold"
              onClick={onLogin}
            >
              Log On
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
