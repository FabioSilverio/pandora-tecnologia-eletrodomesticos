"use client";

interface TipBubbleProps {
  onDismiss: () => void;
}

export function TipBubble({ onDismiss }: TipBubbleProps) {
  return (
    <div className="absolute bottom-[54px] right-4 z-[110] w-[290px] rounded-[16px] border border-[#b9d2f8] bg-[linear-gradient(180deg,#fdfefe,#edf5ff)] p-4 shadow-[0_12px_24px_rgba(0,0,0,0.2)]">
      <div className="text-sm font-bold text-[#173b68]">Tip of the day</div>
      <p className="mt-2 text-sm leading-6 text-[#4b6684]">
        Double-click desktop icons, try the Command Prompt, and right-click in Minesweeper to place flags.
      </p>
      <button type="button" className="xp-button mt-3 px-3 py-1 text-xs" onClick={onDismiss}>
        Got it
      </button>
    </div>
  );
}
