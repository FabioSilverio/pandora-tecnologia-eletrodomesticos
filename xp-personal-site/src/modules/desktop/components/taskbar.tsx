"use client";

import { useEffect, useState } from "react";

import { SystemIcon } from "@/modules/desktop/components/system-icons";
import { StartMenu } from "@/modules/desktop/components/start-menu";
import type { FavoritePage } from "@/types/content";
import type { WindowInstance } from "@/modules/window-manager/types";

interface TaskbarProps {
  windows: WindowInstance[];
  focusedWindowId?: string;
  onToggleWindow: (id: string) => void;
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

function iconForApp(appId: WindowInstance["appId"]) {
  switch (appId) {
    case "explorer":
      return "folder";
    case "media-player":
      return "player";
    case "msn":
    case "msn-chat":
      return "messenger";
    case "calculator":
      return "calculator";
    case "notepad":
      return "notepad";
    case "internet-explorer":
      return "ie";
    case "image-viewer":
      return "image";
    case "paint":
      return "paint";
    case "minesweeper":
      return "minesweeper";
    case "control-panel":
      return "control-panel";
    case "command-prompt":
      return "command";
    default:
      return "folder";
  }
}

export function Taskbar({
  windows,
  focusedWindowId,
  onToggleWindow,
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
}: TaskbarProps) {
  const [startOpen, setStartOpen] = useState(false);
  const [clock, setClock] = useState("");

  useEffect(() => {
    const syncClock = () => {
      const now = new Date();
      setClock(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    };

    syncClock();
    const interval = window.setInterval(syncClock, 1000 * 15);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="taskbar absolute inset-x-0 bottom-0 z-[100] h-[40px] bg-[linear-gradient(180deg,#0d62f2_0%,#0c57db_10%,#0a4bd0_54%,#0a42b8_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]">
      <StartMenu
        open={startOpen}
        onClose={() => setStartOpen(false)}
        onOpenFolder={onOpenFolder}
        onOpenPage={onOpenPage}
        onOpenApp={onOpenApp}
        onOpenAboutNote={onOpenAboutNote}
        onToggleSound={onToggleSound}
        onCycleWallpaper={onCycleWallpaper}
        onLock={onLock}
        onRestart={onRestart}
        onShutdown={onShutdown}
        soundEnabled={soundEnabled}
        ownerName={ownerName}
      />
      <div className="flex h-full items-center gap-2 px-0.5">
        <button
          type="button"
          aria-expanded={startOpen}
          className="mx-[2px] flex h-[34px] min-w-[98px] items-center gap-2 rounded-r-full rounded-l-[8px] bg-[linear-gradient(180deg,#4ac54a,#2c952f)] px-4 text-[20px] font-bold italic text-white shadow-[inset_-3px_-3px_6px_rgba(0,0,0,0.25),inset_1px_1px_1px_rgba(255,255,255,0.55)] [text-shadow:1px_1px_2px_rgba(0,0,0,0.45)]"
          onClick={() => setStartOpen((current) => !current)}
        >
          <span className="grid h-5 w-5 place-items-center rounded-full border border-white/50 bg-white/20 text-[11px] not-italic">
            XP
          </span>
          <span className="text-lg">start</span>
        </button>
        <div className="flex min-w-0 flex-1 items-center gap-1 overflow-hidden">
          {windows.map((windowItem) => {
            const active = focusedWindowId === windowItem.id && !windowItem.isMinimized;
            return (
              <button
                key={windowItem.id}
                type="button"
                className="taskbar-button flex h-[31px] min-w-[160px] max-w-[220px] items-center gap-2 overflow-hidden rounded-[4px] border border-[#215cd4] px-2 text-left text-xs text-white"
                style={{
                  background: active
                    ? "linear-gradient(180deg,#5ea2ff,#3f82ef)"
                    : "linear-gradient(180deg,#2669e0,#1b54ca)",
                }}
                onClick={() => {
                  onToggleWindow(windowItem.id);
                  setStartOpen(false);
                }}
              >
                <SystemIcon
                  name={iconForApp(windowItem.appId)}
                  className="h-5 w-5 shrink-0"
                />
                <span className="truncate">{windowItem.title}</span>
              </button>
            );
          })}
        </div>
        <div className="mr-1 flex h-[31px] items-center gap-2 rounded bg-[linear-gradient(180deg,#0f8de5,#0d6fd1)] px-3 text-xs text-white shadow-[inset_1px_1px_0_rgba(255,255,255,0.4)]">
          <span className="rounded-full border border-white/30 bg-white/15 px-1.5 py-0.5 text-[10px]">
            {soundEnabled ? "SND" : "MUT"}
          </span>
          <span className="rounded-full border border-white/30 bg-white/15 px-1.5 py-0.5 text-[10px]">
            LAN
          </span>
          <span className="font-bold">{clock}</span>
        </div>
      </div>
    </div>
  );
}
