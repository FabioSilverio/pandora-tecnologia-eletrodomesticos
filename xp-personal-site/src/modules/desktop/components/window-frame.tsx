"use client";

import type { WindowBounds, WindowInstance } from "@/modules/window-manager/types";

type ResizeEdge = "top" | "right" | "bottom" | "left" | "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface WindowFrameProps {
  windowItem: WindowInstance;
  active: boolean;
  workArea: { width: number; height: number };
  onFocus: (id: string) => void;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onChangeBounds: (id: string, bounds: WindowBounds) => void;
  children: React.ReactNode;
}

function clampSize(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function WindowFrame({
  windowItem,
  active,
  workArea,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onChangeBounds,
  children,
}: WindowFrameProps) {
  const startMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (windowItem.isMaximized) {
      return;
    }

    event.preventDefault();
    onFocus(windowItem.id);

    const originX = event.clientX;
    const originY = event.clientY;
    const startBounds = windowItem.bounds;

    const move = (moveEvent: PointerEvent) => {
      const nextBounds = {
        ...startBounds,
        x: startBounds.x + (moveEvent.clientX - originX),
        y: startBounds.y + (moveEvent.clientY - originY),
      };

      onChangeBounds(windowItem.id, nextBounds);
    };

    const stop = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", stop);
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", stop, { once: true });
  };

  const startResize =
    (edge: ResizeEdge) => (event: React.PointerEvent<HTMLDivElement>) => {
      if (windowItem.isMaximized) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      onFocus(windowItem.id);

      const originX = event.clientX;
      const originY = event.clientY;
      const startBounds = windowItem.bounds;

      const move = (moveEvent: PointerEvent) => {
        const deltaX = moveEvent.clientX - originX;
        const deltaY = moveEvent.clientY - originY;
        const nextBounds = { ...startBounds };

        if (edge.includes("right")) {
          nextBounds.width = clampSize(
            startBounds.width + deltaX,
            windowItem.minWidth,
            workArea.width - nextBounds.x,
          );
        }

        if (edge.includes("bottom")) {
          nextBounds.height = clampSize(
            startBounds.height + deltaY,
            windowItem.minHeight,
            workArea.height - nextBounds.y,
          );
        }

        if (edge.includes("left")) {
          const nextX = Math.min(
            startBounds.x + deltaX,
            startBounds.x + startBounds.width - windowItem.minWidth,
          );
          nextBounds.width = startBounds.width - (nextX - startBounds.x);
          nextBounds.x = Math.max(0, nextX);
        }

        if (edge.includes("top")) {
          const nextY = Math.min(
            startBounds.y + deltaY,
            startBounds.y + startBounds.height - windowItem.minHeight,
          );
          nextBounds.height = startBounds.height - (nextY - startBounds.y);
          nextBounds.y = Math.max(0, nextY);
        }

        onChangeBounds(windowItem.id, nextBounds);
      };

      const stop = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", stop);
      };

      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", stop, { once: true });
    };

  const bounds = windowItem.bounds;

  return (
    <section
      className={`absolute flex flex-col overflow-hidden rounded-[8px] border-[3px] bg-[#ece9d8] shadow-[0_10px_24px_rgba(0,0,0,0.28)] ${
        active ? "border-[#0d54d7]" : "border-[#7f9dbf]"
      }`}
      style={{
        left: bounds.x,
        top: bounds.y,
        width: bounds.width,
        height: bounds.height,
        zIndex: windowItem.zIndex,
      }}
      onMouseDown={() => onFocus(windowItem.id)}
    >
      <div
        className={`flex h-[34px] items-center justify-between px-2 ${
          active
            ? "bg-[linear-gradient(180deg,#2b74ec,#1443b6)] text-white"
            : "bg-[linear-gradient(180deg,#98a9c5,#7f90b2)] text-[#eaf0fb]"
        }`}
        onPointerDown={startMove}
      >
        <div className="flex min-w-0 items-center gap-2">
          <span className="grid h-5 w-5 place-items-center rounded-[3px] bg-white/20 text-[11px] font-bold">
            {windowItem.title.charAt(0)}
          </span>
          <span className="truncate text-[13px] font-bold tracking-[0.01em]">
            {windowItem.title}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {[
            { label: "Minimize", color: "bg-[#ffd25b]", action: () => onMinimize(windowItem.id), glyph: "−" },
            { label: "Maximize", color: "bg-[#6aa4ff]", action: () => onMaximize(windowItem.id), glyph: "□" },
            { label: "Close", color: "bg-[#ff7f61]", action: () => onClose(windowItem.id), glyph: "×" },
          ].map((button) => (
            <button
              key={button.label}
              type="button"
              aria-label={button.label}
              className={`grid h-5 w-5 place-items-center rounded-[3px] border border-white/60 ${button.color} text-[13px] font-bold text-[#17386d] shadow-[inset_1px_1px_0_rgba(255,255,255,0.7)]`}
              onClick={(event) => {
                event.stopPropagation();
                button.action();
              }}
            >
              {button.glyph}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-hidden bg-[#f5f0e3]">{children}</div>
      {!windowItem.isMaximized ? (
        <>
          <div className="absolute inset-x-4 top-0 h-1 cursor-n-resize" onPointerDown={startResize("top")} />
          <div className="absolute inset-y-4 right-0 w-1 cursor-e-resize" onPointerDown={startResize("right")} />
          <div className="absolute inset-x-4 bottom-0 h-1 cursor-s-resize" onPointerDown={startResize("bottom")} />
          <div className="absolute inset-y-4 left-0 w-1 cursor-w-resize" onPointerDown={startResize("left")} />
          <div className="absolute left-0 top-0 h-3 w-3 cursor-nwse-resize" onPointerDown={startResize("top-left")} />
          <div className="absolute right-0 top-0 h-3 w-3 cursor-nesw-resize" onPointerDown={startResize("top-right")} />
          <div className="absolute bottom-0 left-0 h-3 w-3 cursor-nesw-resize" onPointerDown={startResize("bottom-left")} />
          <div className="absolute bottom-0 right-0 h-3 w-3 cursor-nwse-resize" onPointerDown={startResize("bottom-right")} />
        </>
      ) : null}
    </section>
  );
}
