"use client";

import { startTransition, useEffect, useMemo, useState } from "react";

import type {
  AppId,
  DesktopPreferences,
  DesktopRuntime,
  DesktopSnapshot,
  WindowBounds,
  WindowInstance,
  WindowPayloadMap,
} from "@/modules/window-manager/types";
import {
  bringToFront,
  clampWindow,
  getAppTitle,
  getDefaultWindowGeometry,
  isSamePayload,
  makeWindowId,
} from "@/modules/window-manager/utils";

const STORAGE_KEY = "xp-personal-site:desktop-state";

const defaultPreferences: DesktopPreferences = {
  soundEnabled: true,
  showBootScreen: true,
  wallpaperVariant: "day",
  screensaverEnabled: true,
};

function getInitialSnapshot(): DesktopSnapshot {
  if (typeof window === "undefined") {
    return {
      preferences: defaultPreferences,
      windows: [],
      lastOpenedFolder: "/Portfolio",
    };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        preferences: defaultPreferences,
        windows: [],
        lastOpenedFolder: "/Portfolio",
      };
    }

    const parsed = JSON.parse(raw) as DesktopSnapshot;
    return {
      preferences: { ...defaultPreferences, ...parsed.preferences },
      windows: parsed.windows ?? [],
      lastOpenedFolder: parsed.lastOpenedFolder ?? "/Portfolio",
    };
  } catch {
    return {
      preferences: defaultPreferences,
      windows: [],
      lastOpenedFolder: "/Portfolio",
    };
  }
}

export function useWindowManager(runtime: DesktopRuntime) {
  const initialSnapshot = useMemo(() => getInitialSnapshot(), []);
  const [preferences, setPreferences] = useState(initialSnapshot.preferences);
  const [windows, setWindows] = useState<WindowInstance[]>(initialSnapshot.windows);
  const [lastOpenedFolder, setLastOpenedFolder] = useState(initialSnapshot.lastOpenedFolder);
  const [bootVisible, setBootVisible] = useState(initialSnapshot.preferences.showBootScreen);

  const visibleWindows = windows
    .filter((windowItem) => !windowItem.isMinimized)
    .sort((a, b) => a.zIndex - b.zIndex);

  const taskbarWindows = [...windows].sort((a, b) => a.zIndex - b.zIndex);

  useEffect(() => {
    const snapshot: DesktopSnapshot = {
      preferences,
      windows,
      lastOpenedFolder,
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  }, [preferences, windows, lastOpenedFolder]);

  useEffect(() => {
    if (!bootVisible) {
      return;
    }

    const timer = window.setTimeout(() => {
      setBootVisible(false);
    }, 2400);

    return () => window.clearTimeout(timer);
  }, [bootVisible]);

  const focusWindow = (id: string) => {
    setWindows((current) => bringToFront(current, id));
  };

  const closeWindow = (id: string) => {
    startTransition(() => {
      setWindows((current) => current.filter((windowItem) => windowItem.id !== id));
    });
  };

  const minimizeWindow = (id: string) => {
    setWindows((current) =>
      current.map((windowItem) =>
        windowItem.id === id ? { ...windowItem, isMinimized: true } : windowItem,
      ),
    );
  };

  const maximizeWindow = (id: string, workArea: { width: number; height: number }) => {
    setWindows((current) =>
      current.map((windowItem) => {
        if (windowItem.id !== id) {
          return windowItem;
        }

        if (windowItem.isMaximized && windowItem.previousBounds) {
          return {
            ...windowItem,
            isMaximized: false,
            bounds: windowItem.previousBounds,
            previousBounds: undefined,
          };
        }

        return {
          ...windowItem,
          isMaximized: true,
          previousBounds: windowItem.bounds,
          bounds: {
            x: 0,
            y: 0,
            width: workArea.width,
            height: workArea.height,
          },
        };
      }),
    );
  };

  const updateBounds = (id: string, nextBounds: WindowBounds, workArea: { width: number; height: number }) => {
    setWindows((current) =>
      current.map((windowItem) =>
        windowItem.id === id
          ? {
              ...windowItem,
              bounds: clampWindow(nextBounds, workArea),
            }
          : windowItem,
      ),
    );
  };

  const updateWindow = <T extends AppId>(
    id: string,
    updates: Partial<Pick<WindowInstance<T>, "title" | "payload" | "bounds">>,
  ) => {
    setWindows((current) =>
      current.map((windowItem) =>
        windowItem.id === id
          ? {
              ...windowItem,
              ...updates,
            }
          : windowItem,
      ),
    );
  };

  const openWindow = <T extends AppId>(
    appId: T,
    payload: WindowPayloadMap[T],
    options?: { title?: string; singleton?: boolean; forceNew?: boolean },
  ) => {
    const singleton = options?.singleton ?? false;

    setWindows((current) => {
      const existing = current.find(
        (windowItem) =>
          windowItem.appId === appId &&
          (singleton || isSamePayload(windowItem.payload as WindowPayloadMap[T], payload)),
      );

      if (existing && !options?.forceNew) {
        return bringToFront(
          current.map((windowItem) =>
            windowItem.id === existing.id
              ? {
                  ...windowItem,
                  isMinimized: false,
                  title: options?.title ?? windowItem.title,
                  payload: singleton ? payload : windowItem.payload,
                }
              : windowItem,
          ),
          existing.id,
        );
      }

      const topZ = current.reduce((max, windowItem) => Math.max(max, windowItem.zIndex), 0);
      const geometry = getDefaultWindowGeometry(appId, current.length);

      const nextWindow: WindowInstance<T> = {
        id: makeWindowId(),
        appId,
        title: options?.title ?? getAppTitle(appId),
        bounds: geometry.bounds,
        minWidth: geometry.minWidth,
        minHeight: geometry.minHeight,
        zIndex: topZ + 1,
        isMinimized: false,
        isMaximized: false,
        payload,
      };

      return [...current, nextWindow];
    });
  };

  const togglePreference = (key: keyof DesktopPreferences) => {
    setPreferences((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const cycleWallpaper = () => {
    setPreferences((current) => ({
      ...current,
      wallpaperVariant: current.wallpaperVariant === "day" ? "sunset" : "day",
    }));
  };

  const resetDesktop = () => {
    setWindows([]);
    setLastOpenedFolder("/Portfolio");
  };

  return {
    runtime,
    preferences,
    windows,
    visibleWindows,
    taskbarWindows,
    bootVisible,
    lastOpenedFolder,
    setBootVisible,
    setLastOpenedFolder,
    setPreferences,
    togglePreference,
    cycleWallpaper,
    resetDesktop,
    openWindow,
    updateWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateBounds,
  };
}
