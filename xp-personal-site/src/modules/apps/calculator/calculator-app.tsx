"use client";

import { useState } from "react";

const keys = [
  ["MC", "MR", "MS", "M+"],
  ["7", "8", "9", "/"],
  ["4", "5", "6", "*"],
  ["1", "2", "3", "-"],
  ["0", ".", "=", "+"],
  ["C", "⌫"],
];

export function CalculatorApp() {
  const [display, setDisplay] = useState("0");

  const handleKey = (key: string) => {
    if (key === "C") {
      setDisplay("0");
      return;
    }

    if (key === "⌫") {
      setDisplay((current) => (current.length <= 1 ? "0" : current.slice(0, -1)));
      return;
    }

    if (["MC", "MR", "MS", "M+"].includes(key)) {
      return;
    }

    if (key === "=") {
      try {
        const expression = display.replace(/×/g, "*");
        const result = Function(`"use strict"; return (${expression})`)();
        setDisplay(String(result));
      } catch {
        setDisplay("Error");
      }
      return;
    }

    setDisplay((current) => {
      if (current === "0" && /[0-9.]/.test(key)) {
        return key;
      }

      if (current === "Error") {
        return key;
      }

      return `${current}${key}`;
    });
  };

  return (
    <div className="flex h-full flex-col bg-[#ece9d8] p-4">
      <div className="rounded border border-[#889cbd] bg-white px-3 py-3 text-right font-mono text-3xl text-[#17355f] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.12)]">
        {display}
      </div>
      <div className="mt-4 grid flex-1 grid-cols-4 gap-2">
        {keys.flat().map((key) => (
          <button
            key={key}
            type="button"
            className="xp-button px-2 py-3 text-lg font-semibold"
            onClick={() => handleKey(key)}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
}
