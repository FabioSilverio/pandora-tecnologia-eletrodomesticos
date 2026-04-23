"use client";

import type { DesktopPreferences } from "@/modules/window-manager/types";

interface ControlPanelAppProps {
  preferences: DesktopPreferences;
  onTogglePreference: (key: keyof DesktopPreferences) => void;
  onCycleWallpaper: () => void;
  onRestart: () => void;
  onLock: () => void;
  onShutdown: () => void;
}

export function ControlPanelApp({
  preferences,
  onTogglePreference,
  onCycleWallpaper,
  onRestart,
  onLock,
  onShutdown,
}: ControlPanelAppProps) {
  return (
    <div className="flex h-full min-h-0 bg-[#eef2f8]">
      <aside className="w-[210px] border-r border-[#bfcae0] bg-[linear-gradient(180deg,#d7e7fb,#bcd1f3)] p-4">
        <div className="text-[11px] uppercase tracking-[0.22em] text-[#4f6d93]">Control Panel</div>
        <h2 className="mt-2 text-2xl font-bold text-[#173b68]">System</h2>
        <p className="mt-3 text-sm leading-6 text-[#456381]">
          Adjust sound, startup behavior, wallpaper, screensaver, and quick power actions.
        </p>
      </aside>
      <div className="min-h-0 flex-1 overflow-auto p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <section className="rounded-[18px] border border-[#d0d9eb] bg-white p-4">
            <h3 className="text-lg font-bold text-[#173b68]">Appearance</h3>
            <div className="mt-4 flex flex-col gap-3">
              <button type="button" className="xp-button px-3 py-2 text-left text-sm" onClick={onCycleWallpaper}>
                Wallpaper: {preferences.wallpaperVariant === "day" ? "Bliss Day" : "Sunset Blue"}
              </button>
              <button
                type="button"
                className="xp-button px-3 py-2 text-left text-sm"
                onClick={() => onTogglePreference("showBootScreen")}
              >
                Boot Screen: {preferences.showBootScreen ? "Enabled" : "Disabled"}
              </button>
              <button
                type="button"
                className="xp-button px-3 py-2 text-left text-sm"
                onClick={() => onTogglePreference("screensaverEnabled")}
              >
                Screensaver: {preferences.screensaverEnabled ? "Enabled" : "Disabled"}
              </button>
            </div>
          </section>

          <section className="rounded-[18px] border border-[#d0d9eb] bg-white p-4">
            <h3 className="text-lg font-bold text-[#173b68]">Audio</h3>
            <div className="mt-4 flex flex-col gap-3">
              <button
                type="button"
                className="xp-button px-3 py-2 text-left text-sm"
                onClick={() => onTogglePreference("soundEnabled")}
              >
                Interface Sounds: {preferences.soundEnabled ? "Enabled" : "Muted"}
              </button>
            </div>
          </section>

          <section className="rounded-[18px] border border-[#d0d9eb] bg-white p-4 md:col-span-2">
            <h3 className="text-lg font-bold text-[#173b68]">Power</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              <button type="button" className="xp-button px-4 py-2 text-sm" onClick={onLock}>
                Lock Session
              </button>
              <button type="button" className="xp-button px-4 py-2 text-sm" onClick={onRestart}>
                Restart
              </button>
              <button type="button" className="xp-button px-4 py-2 text-sm" onClick={onShutdown}>
                Shut Down
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
