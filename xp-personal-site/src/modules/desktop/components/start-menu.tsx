"use client";

import type { FavoritePage } from "@/types/content";

import { SystemIcon } from "@/modules/desktop/components/system-icons";

interface StartMenuProps {
  open: boolean;
  onClose: () => void;
  onOpenFolder: (path: string) => void;
  onOpenPage: (page: FavoritePage) => void;
  onOpenApp: (
    appId:
      | "media-player"
      | "msn"
      | "calculator"
      | "paint"
      | "minesweeper"
      | "control-panel"
      | "command-prompt",
  ) => void;
  onOpenAboutNote: () => void;
  onToggleSound: () => void;
  onCycleWallpaper: () => void;
  onLock: () => void;
  onRestart: () => void;
  onShutdown: () => void;
  soundEnabled: boolean;
  ownerName: string;
}

const shortcuts = [
  { label: "My Documents", icon: "documents", action: "documents" },
  { label: "My Pictures", icon: "image", action: "pictures" },
  { label: "My Music", icon: "music", action: "music" },
  { label: "Portfolio", icon: "folder-star", action: "portfolio" },
  { label: "Internet Explorer", icon: "ie", action: "about" },
  { label: "Windows Media Player", icon: "player", action: "media" },
  { label: "MSN Messenger", icon: "messenger", action: "messenger" },
  { label: "Notepad", icon: "notepad", action: "notepad" },
  { label: "Calculator", icon: "calculator", action: "calculator" },
  { label: "Paint", icon: "paint", action: "paint" },
  { label: "Command Prompt", icon: "command", action: "cmd" },
  { label: "Control Panel", icon: "control-panel", action: "control" },
  { label: "Minesweeper", icon: "minesweeper", action: "minesweeper" },
] as const;

export function StartMenu({
  open,
  onClose,
  onOpenFolder,
  onOpenPage,
  onOpenApp,
  onOpenAboutNote,
  onToggleSound,
  onCycleWallpaper,
  onLock,
  onRestart,
  onShutdown,
  soundEnabled,
  ownerName,
}: StartMenuProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="absolute bottom-[38px] left-0 z-[105] w-[420px] overflow-hidden rounded-t-[8px] border-[3px] border-[#0c5cd3] bg-[#f7f3e8] shadow-[7px_7px_16px_rgba(0,0,0,0.36)]">
      <div className="flex">
        <div className="relative flex w-[66px] flex-col justify-end bg-[linear-gradient(180deg,#1e52c2,#3072e8)] px-3 pb-3">
          <div className="absolute inset-x-0 top-0 h-[54px] bg-[linear-gradient(180deg,#4da6ff,#2166d1)]" />
          <div className="relative z-10 flex items-center gap-3 px-2 pt-3 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/30">
              <span className="text-lg font-bold">XP</span>
            </div>
          </div>
          <div className="pointer-events-none absolute bottom-16 left-3 origin-bottom-left -rotate-90 text-[31px] font-bold tracking-tight text-white/90">
            {ownerName}
          </div>
        </div>
        <div className="flex flex-1 flex-col bg-[#fbfbfb]">
          <div className="border-b border-[#c3d6f8] bg-[linear-gradient(180deg,#f8fbff,#d8e7fd)] px-4 py-3">
            <div className="text-sm font-bold text-[#193968]">Welcome back</div>
            <div className="text-xs text-[#34507d]">Explore the portfolio like a real desktop.</div>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 p-3">
            {shortcuts.map((item) => (
              <button
                key={item.label}
                type="button"
                className="start-menu-item flex items-center gap-3 rounded px-2 py-2 text-left text-[13px] text-[#163562] hover:bg-[#316ac5] hover:text-white"
                onClick={() => {
                  switch (item.action) {
                    case "documents":
                      onOpenFolder("/My Documents");
                      break;
                    case "pictures":
                      onOpenFolder("/My Pictures");
                      break;
                    case "music":
                      onOpenFolder("/My Music");
                      break;
                    case "portfolio":
                      onOpenFolder("/Portfolio");
                      break;
                    case "about":
                      onOpenPage("about");
                      break;
                    case "media":
                      onOpenApp("media-player");
                      break;
                    case "messenger":
                      onOpenApp("msn");
                      break;
                    case "notepad":
                      onOpenAboutNote();
                      break;
                    case "calculator":
                      onOpenApp("calculator");
                      break;
                    case "paint":
                      onOpenApp("paint");
                      break;
                    case "cmd":
                      onOpenApp("command-prompt");
                      break;
                    case "control":
                      onOpenApp("control-panel");
                      break;
                    case "minesweeper":
                      onOpenApp("minesweeper");
                      break;
                  }
                  onClose();
                }}
              >
                <SystemIcon
                  name={item.icon}
                  className="h-9 w-9 shrink-0"
                />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          <div className="border-t border-[#cfddfa] bg-[#eef3ff] px-3 py-3">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="xp-button px-3 py-1 text-xs"
                onClick={() => {
                  onToggleSound();
                  onClose();
                }}
              >
                {soundEnabled ? "Mute Sounds" : "Enable Sounds"}
              </button>
              <button
                type="button"
                className="xp-button px-3 py-1 text-xs"
                onClick={() => {
                  onCycleWallpaper();
                  onClose();
                }}
              >
                Switch Wallpaper
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" className="xp-button px-3 py-1 text-xs" onClick={() => { onLock(); onClose(); }}>
                Lock
              </button>
              <button type="button" className="xp-button px-3 py-1 text-xs" onClick={() => { onRestart(); onClose(); }}>
                Restart
              </button>
              <button type="button" className="xp-button px-3 py-1 text-xs" onClick={() => { onShutdown(); onClose(); }}>
                Shut Down
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
