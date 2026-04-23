"use client";

import type { FolderEntry, FsEntry } from "@/modules/file-system/types";
import { getBreadcrumbs, getFolderChildren } from "@/modules/mock-data/file-system";
import { SystemIcon } from "@/modules/desktop/components/system-icons";

interface FileExplorerAppProps {
  root: FolderEntry;
  currentPath: string;
  quickAccess: Array<{ label: string; path: string; description: string }>;
  onNavigate: (path: string) => void;
  onOpenEntry: (entry: FsEntry) => void;
}

function iconForEntry(entry: FsEntry) {
  if (entry.type === "folder") {
    return "folder";
  }

  switch (entry.type) {
    case "text":
      return "text";
    case "image":
      return "image";
    case "audio":
      return "music";
    case "url":
      return "url";
    default:
      return "folder";
  }
}

export function FileExplorerApp({
  root,
  currentPath,
  quickAccess,
  onNavigate,
  onOpenEntry,
}: FileExplorerAppProps) {
  const children = getFolderChildren(root, currentPath);
  const breadcrumbs = getBreadcrumbs(currentPath);

  return (
    <div className="flex h-full flex-col bg-[#f5f0e3]">
      <div className="border-b border-[#d6cdb7] bg-[linear-gradient(180deg,#fffdf9,#e8deca)] px-3 py-2">
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className="xp-button px-3 py-1 text-xs" onClick={() => onNavigate("/")}>
            Back To My Computer
          </button>
          <button type="button" className="xp-button px-3 py-1 text-xs" onClick={() => onNavigate("/Portfolio")}>
            Portfolio
          </button>
          <button type="button" className="xp-button px-3 py-1 text-xs" onClick={() => onNavigate("/My Music")}>
            My Music
          </button>
        </div>
        <div className="mt-2 rounded border border-[#b8b09a] bg-white px-3 py-2 text-sm text-[#1d3f6f]">
          {breadcrumbs.map((crumb, index) => (
            <span key={crumb.path}>
              <button
                type="button"
                className="font-semibold hover:underline"
                onClick={() => onNavigate(crumb.path)}
              >
                {crumb.label}
              </button>
              {index < breadcrumbs.length - 1 ? " > " : ""}
            </span>
          ))}
        </div>
      </div>
      <div className="flex min-h-0 flex-1">
        <aside className="w-[230px] border-r border-[#c9c1ad] bg-[linear-gradient(180deg,#fbf9f4,#f2ead8)] px-3 py-3">
          <div className="rounded-[10px] border border-[#7ba0dd] bg-[linear-gradient(180deg,#3e8bf6,#225ec0)] p-3 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]">
            <div className="text-xs uppercase tracking-[0.2em] text-white/70">Explorer Bar</div>
            <div className="mt-1 text-xl font-bold">Common Tasks</div>
            <p className="mt-2 text-xs text-white/80">
              Double-click folders and files to open them in the matching app.
            </p>
          </div>
          <div className="mt-4 space-y-1">
            {quickAccess.map((shortcut) => (
              <button
                key={shortcut.path}
                type="button"
                className="flex w-full items-start gap-2 rounded px-2 py-2 text-left text-[13px] text-[#214370] hover:bg-[#d8e8ff]"
                onClick={() => onNavigate(shortcut.path)}
              >
                <SystemIcon name="folder" className="mt-0.5 h-6 w-6 shrink-0" />
                <span>
                  <span className="block font-semibold">{shortcut.label}</span>
                  <span className="block text-[11px] text-[#536d90]">{shortcut.description}</span>
                </span>
              </button>
            ))}
          </div>
        </aside>
        <div className="min-h-0 flex-1 overflow-auto bg-white">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-4 p-5">
            {children.map((entry) => (
              <button
                key={entry.path}
                type="button"
                className="flex min-h-[120px] flex-col items-center justify-start rounded border border-transparent p-3 text-center hover:border-[#9dbff2] hover:bg-[#edf5ff]"
                onDoubleClick={() => onOpenEntry(entry)}
                onClick={() => onOpenEntry(entry)}
              >
                <SystemIcon name={iconForEntry(entry)} className="h-12 w-12" />
                <span className="mt-2 text-[13px] font-semibold text-[#203c68]">{entry.name}</span>
                <span className="mt-1 text-[11px] text-[#6b7f98]">
                  {entry.type === "folder"
                    ? "Folder"
                    : entry.type === "audio"
                    ? "MP3 Audio"
                    : entry.type === "image"
                    ? "Image"
                    : entry.type === "url"
                    ? "Shortcut"
                    : "Text Document"}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
