import type { AppId, WindowBounds, WindowInstance, WindowPayloadMap } from "@/modules/window-manager/types";

const defaultSizes: Record<AppId, { width: number; height: number; minWidth: number; minHeight: number }> = {
  explorer: { width: 860, height: 560, minWidth: 640, minHeight: 420 },
  "media-player": { width: 650, height: 460, minWidth: 620, minHeight: 420 },
  msn: { width: 720, height: 520, minWidth: 560, minHeight: 420 },
  "msn-chat": { width: 420, height: 420, minWidth: 320, minHeight: 300 },
  calculator: { width: 320, height: 420, minWidth: 280, minHeight: 360 },
  notepad: { width: 660, height: 480, minWidth: 420, minHeight: 280 },
  "internet-explorer": { width: 920, height: 620, minWidth: 720, minHeight: 420 },
  "image-viewer": { width: 820, height: 620, minWidth: 560, minHeight: 420 },
  paint: { width: 860, height: 620, minWidth: 620, minHeight: 420 },
  minesweeper: { width: 420, height: 520, minWidth: 340, minHeight: 420 },
  "control-panel": { width: 640, height: 520, minWidth: 520, minHeight: 420 },
  "command-prompt": { width: 760, height: 460, minWidth: 520, minHeight: 320 },
};

export function makeWindowId() {
  return `window-${Math.random().toString(36).slice(2, 10)}`;
}

export function getDefaultWindowGeometry(appId: AppId, index: number): {
  bounds: WindowBounds;
  minWidth: number;
  minHeight: number;
} {
  const config = defaultSizes[appId];
  const offset = index * 28;

  return {
    bounds: {
      x: 92 + offset,
      y: 76 + offset,
      width: config.width,
      height: config.height,
    },
    minWidth: config.minWidth,
    minHeight: config.minHeight,
  };
}

export function clampWindow(bounds: WindowBounds, workArea: { width: number; height: number }) {
  const maxX = Math.max(0, workArea.width - bounds.width);
  const maxY = Math.max(0, workArea.height - bounds.height);

  return {
    ...bounds,
    x: Math.min(Math.max(0, bounds.x), maxX),
    y: Math.min(Math.max(0, bounds.y), maxY),
  };
}

export function isSamePayload<T extends AppId>(
  a: WindowPayloadMap[T],
  b: WindowPayloadMap[T],
) {
  return JSON.stringify(a ?? null) === JSON.stringify(b ?? null);
}

export function getAppTitle(appId: AppId) {
  switch (appId) {
    case "explorer":
      return "File Explorer";
    case "media-player":
      return "Windows Media Player";
    case "msn":
      return "MSN Messenger";
    case "msn-chat":
      return "Conversation";
    case "calculator":
      return "Calculator";
    case "notepad":
      return "Notepad";
    case "internet-explorer":
      return "Internet Explorer";
    case "image-viewer":
      return "Image Viewer";
    case "paint":
      return "Paint";
    case "minesweeper":
      return "Minesweeper";
    case "control-panel":
      return "Control Panel";
    case "command-prompt":
      return "Command Prompt";
    default:
      return "Application";
  }
}

export function bringToFront(windows: WindowInstance[], id: string) {
  const topZ = windows.reduce((max, windowItem) => Math.max(max, windowItem.zIndex), 0);
  return windows.map((windowItem) =>
    windowItem.id === id ? { ...windowItem, zIndex: topZ + 1, isMinimized: false } : windowItem,
  );
}
