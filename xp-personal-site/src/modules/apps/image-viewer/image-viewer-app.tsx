"use client";

import Image from "next/image";

import type { ImageIndexItem } from "@/modules/file-system/types";

interface ImageViewerAppProps {
  items: ImageIndexItem[];
  selectedId: string;
  onSelect: (imageId: string) => void;
}

export function ImageViewerApp({ items, selectedId, onSelect }: ImageViewerAppProps) {
  const selectedImage = items.find((item) => item.id === selectedId) ?? items[0];

  return (
    <div className="grid h-full min-h-0 grid-cols-[220px_1fr] bg-[#efe8d6]">
      <aside className="min-h-0 overflow-auto border-r border-[#cbbfa5] bg-[linear-gradient(180deg,#fffbf1,#eee2cc)] p-3">
        <div className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#587092]">Gallery</div>
        <div className="space-y-2">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`flex w-full items-center gap-3 rounded border px-2 py-2 text-left ${
                item.id === selectedImage.id
                  ? "border-[#95baf2] bg-[#e8f2ff]"
                  : "border-transparent hover:border-[#d7d1c0] hover:bg-white/60"
              }`}
              onClick={() => onSelect(item.id)}
            >
              <Image
                src={item.src}
                alt=""
                width={56}
                height={56}
                className="h-14 w-14 rounded border border-[#c1d3ee] bg-white object-cover"
              />
              <span className="text-sm font-semibold text-[#20406d]">{item.title}</span>
            </button>
          ))}
        </div>
      </aside>
      <div className="flex min-h-0 flex-col bg-white">
        <div className="border-b border-[#ddd1b7] px-4 py-3">
          <div className="text-lg font-bold text-[#163864]">{selectedImage.title}</div>
          <div className="text-sm text-[#577290]">{selectedImage.description}</div>
        </div>
        <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto bg-[radial-gradient(circle_at_top,#f7fbff,#d7e7ff_38%,#a9caef_100%)] p-6">
          <Image
            src={selectedImage.src}
            alt={selectedImage.title}
            width={1200}
            height={900}
            className="max-h-full w-auto max-w-full rounded-[18px] border border-[#7ea6de] bg-white shadow-[0_14px_24px_rgba(0,0,0,0.18)]"
          />
        </div>
      </div>
    </div>
  );
}
