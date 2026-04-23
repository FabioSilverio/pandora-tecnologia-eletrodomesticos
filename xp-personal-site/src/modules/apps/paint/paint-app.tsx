"use client";

import { useEffect, useRef, useState } from "react";

export function PaintApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState("#1357c8");
  const [size, setSize] = useState(4);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getPoint = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return null;
    }

    const rect = canvas.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * canvas.width,
      y: ((event.clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const draw = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing) {
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const point = getPoint(event);
    if (!canvas || !context || !point) {
      return;
    }

    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = color;
    context.lineWidth = size;
    context.lineTo(point.x, point.y);
    context.stroke();
    context.beginPath();
    context.moveTo(point.x, point.y);
  };

  const startDrawing = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const point = getPoint(event);
    if (!canvas || !context || !point) {
      return;
    }

    setDrawing(true);
    context.beginPath();
    context.moveTo(point.x, point.y);
  };

  const endDrawing = () => {
    const context = canvasRef.current?.getContext("2d");
    context?.beginPath();
    setDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) {
      return;
    }

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const link = document.createElement("a");
    link.download = "fabio-paint.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#ece9d8]">
      <div className="flex flex-wrap items-center gap-3 border-b border-[#d0c7b2] bg-[linear-gradient(180deg,#fefdf8,#ece2d0)] px-3 py-2">
        <label className="flex items-center gap-2 text-sm text-[#20406d]">
          Color
          <input type="color" value={color} onChange={(event) => setColor(event.target.value)} />
        </label>
        <label className="flex items-center gap-2 text-sm text-[#20406d]">
          Brush
          <input type="range" min="1" max="18" value={size} onChange={(event) => setSize(Number(event.target.value))} />
        </label>
        <button type="button" className="xp-button px-3 py-1 text-xs" onClick={clearCanvas}>
          Clear
        </button>
        <button type="button" className="xp-button px-3 py-1 text-xs" onClick={saveCanvas}>
          Save PNG
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-auto bg-[#bacfea] p-4">
        <canvas
          ref={canvasRef}
          width={1280}
          height={720}
          className="h-full min-h-[420px] w-full rounded border border-[#6f8bb5] bg-white shadow-[0_10px_24px_rgba(0,0,0,0.16)]"
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={endDrawing}
          onPointerLeave={endDrawing}
        />
      </div>
    </div>
  );
}
