"use client";

import { useState } from "react";

interface CommandPromptAppProps {
  onOpenApp: (appId: "msn" | "media-player" | "paint" | "control-panel" | "minesweeper") => void;
  onOpenFolder: (path: string) => void;
  onOpenPage: (page: "about" | "portfolio" | "blog" | "contact") => void;
}

export function CommandPromptApp({
  onOpenApp,
  onOpenFolder,
  onOpenPage,
}: CommandPromptAppProps) {
  const [history, setHistory] = useState<string[]>([
    "Microsoft Windows XP [Version 5.1.2600]",
    "(C) Copyright 1985-2001 Microsoft Corp.",
    "",
    "Type HELP to see available commands.",
  ]);
  const [value, setValue] = useState("");

  const execute = () => {
    const command = value.trim();
    if (!command) {
      return;
    }

    const lower = command.toLowerCase();
    const output: string[] = [`C:\\Fabio>${command}`];

    switch (lower) {
      case "help":
        output.push(
          "HELP",
          "WHOAMI",
          "SKILLS",
          "PROJECTS",
          "CONTACT",
          "OPEN EXPLORER",
          "OPEN MSN",
          "OPEN MEDIA",
          "OPEN PAINT",
          "OPEN CONTROL",
          "OPEN MINESWEEPER",
          "CLEAR",
        );
        break;
      case "whoami":
        output.push("Fabio", "Designer and AI Designer.");
        break;
      case "skills":
        output.push("Brand systems", "Interface design", "Creative direction", "AI-assisted design workflows");
        break;
      case "projects":
        onOpenPage("portfolio");
        output.push("Opening portfolio...");
        break;
      case "contact":
        onOpenPage("contact");
        output.push("Opening contact page...");
        break;
      case "open explorer":
        onOpenFolder("/Portfolio");
        output.push("Opening File Explorer...");
        break;
      case "open msn":
        onOpenApp("msn");
        output.push("Opening MSN Messenger...");
        break;
      case "open media":
        onOpenApp("media-player");
        output.push("Opening Windows Media Player...");
        break;
      case "open paint":
        onOpenApp("paint");
        output.push("Opening Paint...");
        break;
      case "open control":
        onOpenApp("control-panel");
        output.push("Opening Control Panel...");
        break;
      case "open minesweeper":
        onOpenApp("minesweeper");
        output.push("Opening Minesweeper...");
        break;
      case "clear":
        setHistory([]);
        setValue("");
        return;
      default:
        output.push(`'${command}' is not recognized as an internal or external command.`);
        break;
    }

    setHistory((current) => [...current, ...output]);
    setValue("");
  };

  return (
    <div className="flex h-full flex-col bg-[#0c1015] text-[#ddf1ff]">
      <div className="border-b border-[#1e2d3d] bg-[#132234] px-4 py-2 text-xs text-[#9ab7d5]">
        C:\Fabio\portfolio\system32
      </div>
      <div className="flex-1 overflow-auto p-4 font-mono text-[14px] leading-6">
        {history.map((line, index) => (
          <div key={`${line}-${index}`}>{line || "\u00A0"}</div>
        ))}
      </div>
      <div className="flex items-center gap-2 border-t border-[#1e2d3d] bg-[#0f1721] px-4 py-3 font-mono text-sm">
        <span className="text-[#7ec8ff]">C:\Fabio&gt;</span>
        <input
          className="min-w-0 flex-1 bg-transparent text-[#ddf1ff] outline-none"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              execute();
            }
          }}
        />
      </div>
    </div>
  );
}
