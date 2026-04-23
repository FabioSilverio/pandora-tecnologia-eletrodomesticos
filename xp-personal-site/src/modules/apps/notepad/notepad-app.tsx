"use client";

import { useEffect, useState } from "react";

interface NotepadAppProps {
  title: string;
  path: string;
  initialContent: string;
}

export function NotepadApp({ title, path, initialContent }: NotepadAppProps) {
  const storageKey = `xp-personal-site:notepad:${path}`;
  const [content, setContent] = useState(() => {
    if (typeof window === "undefined") {
      return initialContent;
    }

    return window.localStorage.getItem(storageKey) ?? initialContent;
  });

  useEffect(() => {
    window.localStorage.setItem(storageKey, content);
  }, [content, storageKey]);

  return (
    <div className="flex h-full flex-col bg-[#ece9d8]">
      <div className="border-b border-[#d2c9b5] bg-[linear-gradient(180deg,#fefdf7,#eee4d2)] px-3 py-2 text-xs text-[#44607f]">
        Editing {title}
      </div>
      <textarea
        className="flex-1 resize-none border-none bg-white p-4 font-mono text-[14px] leading-6 text-[#14345a] outline-none"
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />
    </div>
  );
}
