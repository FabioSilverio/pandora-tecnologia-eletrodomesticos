"use client";

import type { ChatContact } from "@/types/content";

interface MsnChatWindowProps {
  contact: ChatContact;
  onNudge: () => void;
}

export function MsnChatWindow({ contact, onNudge }: MsnChatWindowProps) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-[#edf5ff]">
      <div className="border-b border-[#bad0f2] bg-[linear-gradient(180deg,#f8fbff,#dce9ff)] px-4 py-3">
        <div className="flex items-center gap-3">
          <div
            className="grid h-10 w-10 place-items-center rounded-full border border-white/70 text-sm font-bold text-white"
            style={{ backgroundColor: contact.avatarColor }}
          >
            {contact.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="font-bold text-[#143b6d]">{contact.name}</div>
            <div className="text-xs text-[#5b7699]">{contact.email}</div>
          </div>
          <button type="button" className="xp-button ml-auto px-3 py-1 text-xs" onClick={onNudge}>
            Send Nudge
          </button>
        </div>
      </div>
      <div className="min-h-0 flex-1 space-y-3 overflow-auto bg-white p-4">
        {contact.messages.map((message, index) => {
          const isMine = message.from === "me";
          return (
            <div key={`${message.time}-${index}`} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-[14px] border px-3 py-2 text-sm ${
                  isMine
                    ? "border-[#7fb0ff] bg-[#dbeaff] text-[#123b6d]"
                    : "border-[#d7dbe7] bg-[#f6f7fb] text-[#35516f]"
                }`}
              >
                <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#6b85a8]">
                  {isMine ? "You" : contact.name} · {message.time}
                </div>
                <p className="leading-6">{message.text}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="border-t border-[#d3d8e6] bg-[#f4f6fb] p-3">
        <div className="rounded border border-[#c5cee1] bg-white px-3 py-2 text-sm text-[#6c7d99]">
          Type here... except this mock conversation is deliberately scripted.
        </div>
      </div>
    </div>
  );
}
