"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { SiteContent } from "@/types/content";
import { playUiSound } from "@/modules/audio/ui-sounds";
import { DesktopIcons } from "@/modules/desktop/components/desktop-icons";
import { BootScreen } from "@/modules/desktop/components/boot-screen";
import { LoginScreen } from "@/modules/desktop/components/login-screen";
import { PowerScreen } from "@/modules/desktop/components/power-screen";
import { Screensaver } from "@/modules/desktop/components/screensaver";
import { Taskbar } from "@/modules/desktop/components/taskbar";
import { WindowFrame } from "@/modules/desktop/components/window-frame";
import { FileExplorerApp } from "@/modules/apps/file-explorer/file-explorer-app";
import { MediaPlayerApp } from "@/modules/apps/media-player/media-player-app";
import { MsnMessengerApp } from "@/modules/apps/msn/msn-messenger-app";
import { MsnChatWindow } from "@/modules/apps/msn/msn-chat-window";
import { CalculatorApp } from "@/modules/apps/calculator/calculator-app";
import { NotepadApp } from "@/modules/apps/notepad/notepad-app";
import { InternetExplorerApp } from "@/modules/apps/internet-explorer/internet-explorer-app";
import { ImageViewerApp } from "@/modules/apps/image-viewer/image-viewer-app";
import { PaintApp } from "@/modules/apps/paint/paint-app";
import { MinesweeperApp } from "@/modules/apps/minesweeper/minesweeper-app";
import { ControlPanelApp } from "@/modules/apps/control-panel/control-panel-app";
import { CommandPromptApp } from "@/modules/apps/command-prompt/command-prompt-app";
import type { FsEntry } from "@/modules/file-system/types";
import { buildMockFileSystem, findEntryByPath } from "@/modules/mock-data/file-system";
import { useWindowManager } from "@/modules/window-manager/use-window-manager";
import type { FavoritePage, MusicTrack } from "@/types/content";

interface DesktopShellProps {
  content: SiteContent;
}

export function DesktopShell({ content }: DesktopShellProps) {
  const runtime = useMemo(() => {
    return {
      content,
      fileSystem: buildMockFileSystem(content),
    };
  }, [content]);
  const manager = useWindowManager(runtime);
  const [workArea, setWorkArea] = useState({ width: 1280, height: 720 });
  const [bootProgress, setBootProgress] = useState(14);
  const [selectedIconId, setSelectedIconId] = useState<string>();
  const [sessionState, setSessionState] = useState<"login" | "boot" | "desktop" | "shutdown">(
    "login",
  );
  const [powerMessage, setPowerMessage] = useState("Windows is shutting down...");
  const [screensaverVisible, setScreensaverVisible] = useState(false);
  const welcomeExplorerOpenedRef = useRef(false);

  useEffect(() => {
    const updateWorkArea = () => {
      setWorkArea({
        width: window.innerWidth,
        height: Math.max(400, window.innerHeight - 40),
      });
    };

    updateWorkArea();
    window.addEventListener("resize", updateWorkArea);
    return () => window.removeEventListener("resize", updateWorkArea);
  }, []);

  useEffect(() => {
    if (sessionState !== "boot") {
      return;
    }

    const start = window.setInterval(() => {
      setBootProgress((current) => Math.min(100, current + 11));
    }, 220);
    void playUiSound("startup", manager.preferences.soundEnabled);

    return () => window.clearInterval(start);
  }, [sessionState, manager.preferences.soundEnabled]);

  useEffect(() => {
    if (sessionState !== "boot") {
      return;
    }

    const timer = window.setTimeout(() => {
      setSessionState("desktop");
    }, 2400);

    return () => window.clearTimeout(timer);
  }, [sessionState]);

  useEffect(() => {
    if (sessionState !== "desktop" || !manager.preferences.screensaverEnabled) {
      return;
    }

    let timeoutId: number;
    const arm = () => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        setScreensaverVisible(true);
      }, 45000);
    };

    const dismiss = () => {
      setScreensaverVisible(false);
      arm();
    };

    arm();
    window.addEventListener("mousemove", dismiss);
    window.addEventListener("mousedown", dismiss);
    window.addEventListener("keydown", dismiss);
    window.addEventListener("touchstart", dismiss);

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("mousemove", dismiss);
      window.removeEventListener("mousedown", dismiss);
      window.removeEventListener("keydown", dismiss);
      window.removeEventListener("touchstart", dismiss);
    };
  }, [sessionState, manager.preferences.screensaverEnabled]);

  const startSession = () => {
    setScreensaverVisible(false);
    setSelectedIconId(undefined);
    setBootProgress(14);
    setSessionState(manager.preferences.showBootScreen ? "boot" : "desktop");
  };

  const triggerPower = (mode: "lock" | "restart" | "shutdown") => {
    setSelectedIconId(undefined);
    setScreensaverVisible(false);

    if (mode === "lock") {
      setSessionState("login");
      return;
    }

    manager.resetDesktop();
    setPowerMessage(
      mode === "restart" ? "Windows is restarting..." : "Windows is shutting down...",
    );
    setSessionState("shutdown");

    window.setTimeout(() => {
      if (mode === "restart") {
        startSession();
      } else {
        setSessionState("login");
      }
    }, 1500);
  };

  const openApp = (
    appId:
      | "media-player"
      | "msn"
      | "calculator"
      | "paint"
      | "minesweeper"
      | "control-panel"
      | "command-prompt",
  ) => {
    manager.openWindow(appId, undefined, { singleton: appId !== "calculator" && appId !== "paint" });
    void playUiSound("open", manager.preferences.soundEnabled);
  };

  const openFolder = (path: string) => {
    manager.setLastOpenedFolder(path);
    manager.openWindow("explorer", { path }, { title: path === "/" ? "My Computer" : path.split("/").filter(Boolean).pop() ?? "File Explorer" });
    void playUiSound("open", manager.preferences.soundEnabled);
  };

  useEffect(() => {
    if (sessionState !== "desktop" || welcomeExplorerOpenedRef.current || manager.windows.length > 0) {
      return;
    }

    welcomeExplorerOpenedRef.current = true;
    manager.setLastOpenedFolder("/My Documents");
    manager.openWindow("explorer", { path: "/My Documents" }, { title: "My Documents" });
  }, [manager, sessionState]);

  const openPage = (page: FavoritePage) => {
    manager.openWindow("internet-explorer", { page }, { title: `Internet Explorer - ${page}` });
    void playUiSound("open", manager.preferences.soundEnabled);
  };

  const openTrack = (track: MusicTrack) => {
    manager.openWindow("media-player", { trackId: track.id }, { singleton: true });
    void playUiSound("open", manager.preferences.soundEnabled);
  };

  const openEntry = (entry: FsEntry) => {
    switch (entry.type) {
      case "folder":
        openFolder(entry.path);
        break;
      case "text":
        manager.openWindow("notepad", { path: entry.path }, { title: entry.name });
        void playUiSound("open", manager.preferences.soundEnabled);
        break;
      case "image":
        manager.openWindow("image-viewer", { imageId: entry.id }, { title: entry.name });
        void playUiSound("open", manager.preferences.soundEnabled);
        break;
      case "audio":
        openTrack(entry.track);
        break;
      case "url":
        openPage(entry.page);
        break;
    }
  };

  const openDesktopItem = (item: (typeof runtime.fileSystem.desktopItems)[number]) => {
    switch (item.action.type) {
      case "folder":
        openFolder(item.action.path);
        break;
      case "app":
        openApp(
          item.action.appId as
            | "media-player"
            | "msn"
            | "calculator"
            | "paint"
            | "minesweeper"
            | "control-panel"
            | "command-prompt",
        );
        break;
      case "page":
        openPage(item.action.page);
        break;
      case "file": {
        const entry = findEntryByPath(runtime.fileSystem.root, item.action.path);
        if (entry) {
          openEntry(entry);
        }
        break;
      }
    }
  };

  const toggleTaskbarWindow = (id: string) => {
    const targetWindow = manager.windows.find((windowItem) => windowItem.id === id);
    if (!targetWindow) {
      return;
    }

    if (targetWindow.isMinimized) {
      manager.focusWindow(id);
    } else if (manager.visibleWindows.at(-1)?.id === id) {
      manager.minimizeWindow(id);
      void playUiSound("minimize", manager.preferences.soundEnabled);
    } else {
      manager.focusWindow(id);
    }
  };

  const focusedWindowId = manager.visibleWindows.at(-1)?.id;

  return (
    <div
      className="relative h-screen overflow-hidden bg-black"
      onClick={() => setSelectedIconId(undefined)}
    >
      <div
        className={`absolute inset-0 ${
          manager.preferences.wallpaperVariant === "day" ? "wallpaper-day" : "wallpaper-sunset"
        }`}
      />
      <DesktopIcons
        items={runtime.fileSystem.desktopItems}
        selectedId={selectedIconId}
        onSelect={setSelectedIconId}
        onOpen={openDesktopItem}
      />

      {sessionState === "desktop"
        ? manager.windows.map((windowItem) => {
        const active = focusedWindowId === windowItem.id;

        return (
          <WindowFrame
            key={windowItem.id}
            windowItem={windowItem}
            active={active}
            workArea={workArea}
            onFocus={manager.focusWindow}
            onClose={(id) => {
              manager.closeWindow(id);
              void playUiSound("close", manager.preferences.soundEnabled);
            }}
            onMinimize={(id) => {
              manager.minimizeWindow(id);
              void playUiSound("minimize", manager.preferences.soundEnabled);
            }}
            onMaximize={(id) => manager.maximizeWindow(id, workArea)}
            onChangeBounds={(id, bounds) => manager.updateBounds(id, bounds, workArea)}
          >
            {(() => {
              switch (windowItem.appId) {
                case "explorer": {
                  const payload = windowItem.payload as { path: string };
                  return (
                    <FileExplorerApp
                      root={runtime.fileSystem.root}
                      currentPath={payload.path}
                      quickAccess={runtime.fileSystem.quickAccess}
                      onNavigate={(path) => {
                        manager.setLastOpenedFolder(path);
                        manager.updateWindow(windowItem.id, {
                          title:
                            path === "/"
                              ? "My Computer"
                              : path.split("/").filter(Boolean).pop() ?? "Explorer",
                          payload: { path },
                        });
                      }}
                      onOpenEntry={openEntry}
                    />
                  );
                }
                case "media-player": {
                  const payload = windowItem.payload as { trackId?: string } | undefined;
                  return (
                    <MediaPlayerApp
                      tracks={runtime.content.music}
                      initialTrackId={payload?.trackId}
                    />
                  );
                }
                case "msn":
                  return (
                    <MsnMessengerApp
                      contacts={runtime.content.chats}
                      onOpenChat={(contactId) => {
                        const contact = runtime.content.chats.find((item) => item.id === contactId);
                        manager.openWindow("msn-chat", { contactId }, { title: contact ? contact.name : "Conversation" });
                        void playUiSound("open", manager.preferences.soundEnabled);
                      }}
                    />
                  );
                case "msn-chat": {
                  const payload = windowItem.payload as { contactId: string };
                  const contact = runtime.content.chats.find(
                    (item) => item.id === payload.contactId,
                  );
                  if (!contact) {
                    return null;
                  }
                  return (
                    <MsnChatWindow
                      contact={contact}
                      onNudge={() => void playUiSound("nudge", manager.preferences.soundEnabled)}
                    />
                  );
                }
                case "calculator":
                  return <CalculatorApp />;
                case "notepad": {
                  const payload = windowItem.payload as { path: string };
                  const entry = findEntryByPath(runtime.fileSystem.root, payload.path);
                  if (!entry || entry.type !== "text") {
                    return null;
                  }
                  return (
                    <NotepadApp
                      title={entry.name}
                      path={entry.path}
                      initialContent={entry.content}
                    />
                  );
                }
                case "internet-explorer": {
                  const payload = windowItem.payload as { page: FavoritePage };
                  return (
                    <InternetExplorerApp
                      page={payload.page}
                      profile={runtime.content.profile}
                      projects={runtime.content.projects}
                      blog={runtime.content.blog}
                      onNavigate={(page) =>
                        manager.updateWindow(windowItem.id, {
                          title: `Internet Explorer - ${page}`,
                          payload: { page },
                        })
                      }
                    />
                  );
                }
                case "image-viewer": {
                  const payload = windowItem.payload as { imageId: string };
                  return (
                    <ImageViewerApp
                      items={runtime.fileSystem.imageIndex}
                      selectedId={payload.imageId}
                      onSelect={(imageId) =>
                        manager.updateWindow(windowItem.id, {
                          title:
                            runtime.fileSystem.imageIndex.find((item) => item.id === imageId)?.title ??
                            "Image Viewer",
                          payload: { imageId },
                        })
                      }
                    />
                  );
                }
                case "paint":
                  return <PaintApp />;
                case "minesweeper":
                  return <MinesweeperApp />;
                case "control-panel":
                  return (
                    <ControlPanelApp
                      preferences={manager.preferences}
                      onTogglePreference={manager.togglePreference}
                      onCycleWallpaper={manager.cycleWallpaper}
                      onRestart={() => triggerPower("restart")}
                      onLock={() => triggerPower("lock")}
                      onShutdown={() => triggerPower("shutdown")}
                    />
                  );
                case "command-prompt":
                  return (
                    <CommandPromptApp
                      onOpenApp={openApp}
                      onOpenFolder={openFolder}
                      onOpenPage={openPage}
                    />
                  );
                default:
                  return null;
              }
            })()}
          </WindowFrame>
        );
      })
        : null}

      {sessionState === "desktop" ? (
        <Taskbar
        windows={manager.taskbarWindows}
        focusedWindowId={focusedWindowId}
        onToggleWindow={toggleTaskbarWindow}
        onOpenFolder={openFolder}
        onOpenPage={openPage}
        onOpenApp={openApp}
        onOpenAboutNote={() => {
          const entry = findEntryByPath(runtime.fileSystem.root, "/My Documents/Read Me First.txt");
          if (entry) {
            openEntry(entry);
          }
        }}
        onToggleSound={() => manager.togglePreference("soundEnabled")}
        onCycleWallpaper={manager.cycleWallpaper}
        onLock={() => triggerPower("lock")}
        onRestart={() => triggerPower("restart")}
        onShutdown={() => triggerPower("shutdown")}
        soundEnabled={manager.preferences.soundEnabled}
        ownerName={runtime.content.profile.name}
      />
      ) : null}

      {screensaverVisible && sessionState === "desktop" ? (
        <Screensaver name={runtime.content.profile.name} />
      ) : null}

      {sessionState === "login" ? (
        <LoginScreen
          name={runtime.content.profile.name}
          role={runtime.content.profile.role}
          onLogin={startSession}
        />
      ) : null}

      {sessionState === "boot" ? <BootScreen progress={bootProgress} /> : null}
      {sessionState === "shutdown" ? <PowerScreen message={powerMessage} /> : null}
    </div>
  );
}
