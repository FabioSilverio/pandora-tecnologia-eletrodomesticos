import type { FavoritePage, SiteContent } from "@/types/content";
import type { MockFileSystem } from "@/modules/mock-data/file-system";

export type AppId =
  | "explorer"
  | "media-player"
  | "msn"
  | "msn-chat"
  | "calculator"
  | "notepad"
  | "internet-explorer"
  | "image-viewer"
  | "paint"
  | "minesweeper"
  | "control-panel"
  | "command-prompt";

export interface WindowBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ExplorerPayload {
  path: string;
}

export interface NotepadPayload {
  path: string;
}

export interface MediaPlayerPayload {
  trackId?: string;
}

export interface InternetExplorerPayload {
  page: FavoritePage;
}

export interface ImageViewerPayload {
  imageId: string;
}

export interface MsnChatPayload {
  contactId: string;
}

export interface PaintPayload {
  documentName?: string;
}

export interface MinesweeperPayload {
  difficulty?: "beginner" | "intermediate";
}

export interface CommandPromptPayload {
  welcomeMessage?: string;
}

export interface WindowPayloadMap {
  explorer: ExplorerPayload;
  "media-player": MediaPlayerPayload;
  msn: undefined;
  "msn-chat": MsnChatPayload;
  calculator: undefined;
  notepad: NotepadPayload;
  "internet-explorer": InternetExplorerPayload;
  "image-viewer": ImageViewerPayload;
  paint: PaintPayload;
  minesweeper: MinesweeperPayload;
  "control-panel": undefined;
  "command-prompt": CommandPromptPayload;
}

export interface WindowInstance<T extends AppId = AppId> {
  id: string;
  appId: T;
  title: string;
  bounds: WindowBounds;
  minWidth: number;
  minHeight: number;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  previousBounds?: WindowBounds;
  payload: WindowPayloadMap[T];
}

export interface DesktopPreferences {
  soundEnabled: boolean;
  showBootScreen: boolean;
  wallpaperVariant: "day" | "sunset";
  screensaverEnabled: boolean;
}

export interface DesktopSnapshot {
  preferences: DesktopPreferences;
  windows: WindowInstance[];
  lastOpenedFolder: string;
}

export interface DesktopRuntime {
  content: SiteContent;
  fileSystem: MockFileSystem;
}
