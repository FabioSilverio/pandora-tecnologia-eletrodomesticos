"use client";

import type { DesktopItem } from "@/modules/file-system/types";
import { SystemIcon } from "@/modules/desktop/components/system-icons";

interface DesktopIconsProps {
  items: DesktopItem[];
  selectedId?: string;
  onSelect: (id: string) => void;
  onOpen: (item: DesktopItem) => void;
}

export function DesktopIcons({ items, selectedId, onSelect, onOpen }: DesktopIconsProps) {
  return (
    <div className="desktop-icon-grid absolute inset-0 overflow-hidden p-4">
      {items.map((item) => {
        const featured = item.id === "documents" || item.id === "internet-explorer" || item.id === "portfolio";

        return (
          <button
            key={item.id}
            type="button"
            className={`desktop-icon group relative flex w-[74px] flex-col items-center gap-1 rounded p-1 text-white outline-none transition-colors hover:bg-white/10 focus:bg-white/10 ${
              selectedId === item.id ? "bg-white/15 ring-1 ring-white/40" : ""
            } ${featured ? "desktop-icon-featured" : ""}`}
            onDoubleClick={(event) => {
              event.stopPropagation();
              onOpen(item);
            }}
            onClick={(event) => {
              event.stopPropagation();
              onSelect(item.id);
            }}
          >
            <SystemIcon
              name={item.icon as Parameters<typeof SystemIcon>[0]["name"]}
              className="h-10 w-10 drop-shadow-[2px_3px_0_rgba(0,0,0,0.2)]"
            />
            <span className="text-center text-[11px] leading-[13px] [text-shadow:1px_1px_2px_rgba(0,0,0,0.95)]">
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
