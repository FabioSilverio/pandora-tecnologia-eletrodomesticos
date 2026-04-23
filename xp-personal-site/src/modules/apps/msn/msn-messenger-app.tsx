"use client";

import type { ChatContact } from "@/types/content";

interface MsnMessengerAppProps {
  contacts: ChatContact[];
  onOpenChat: (contactId: string) => void;
}

function statusColor(status: ChatContact["status"]) {
  switch (status) {
    case "online":
      return "#61d85d";
    case "away":
      return "#f2c24d";
    case "busy":
      return "#f57070";
    default:
      return "#7b93bb";
  }
}

export function MsnMessengerApp({ contacts, onOpenChat }: MsnMessengerAppProps) {
  return (
    <div className="flex h-full min-h-0 bg-[#eef4ff]">
      <aside className="flex w-[250px] min-h-0 flex-col border-r border-[#b7caea] bg-[linear-gradient(180deg,#d9eaff,#bdd4ff)]">
        <div className="border-b border-[#a7c1ee] px-4 py-4">
          <div className="text-[11px] uppercase tracking-[0.24em] text-[#446389]">MSN Messenger</div>
          <div className="mt-1 text-lg font-bold text-[#163a68]">alexxp@passport.com</div>
          <div className="text-sm text-[#537297]">Status: Online and a little nostalgic</div>
        </div>
        <div className="min-h-0 flex-1 overflow-auto px-2 py-3">
          {contacts.map((contact) => (
            <button
              key={contact.id}
              type="button"
              className="flex w-full items-center gap-3 rounded px-2 py-2 text-left hover:bg-white/55"
              onDoubleClick={() => onOpenChat(contact.id)}
              onClick={() => onOpenChat(contact.id)}
            >
              <div
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/70 text-sm font-bold text-white"
                style={{ backgroundColor: contact.avatarColor }}
              >
                {contact.name.slice(0, 2).toUpperCase()}
              </div>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: statusColor(contact.status) }}
                  />
                  <span className="truncate font-semibold text-[#173c6c]">{contact.name}</span>
                </span>
                <span className="block truncate text-xs text-[#567393]">{contact.headline}</span>
              </span>
            </button>
          ))}
        </div>
      </aside>
      <div className="flex flex-1 flex-col justify-between bg-white p-5">
        <div>
          <div className="text-[11px] uppercase tracking-[0.24em] text-[#6a83a4]">
            Messenger Tips
          </div>
          <h2 className="mt-2 text-2xl font-bold text-[#1b3a68]">
            Double-click a contact to open a conversation window
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#4e6787]">
            The chat scripts are stored in <code>content/msn-chats.json</code>. That makes it easy to turn the contact list into a playful biography, project tour, or hidden easter egg channel later.
          </p>
        </div>
        <div className="rounded-[18px] border border-[#cbd9f0] bg-[#f4f8ff] p-4 text-sm text-[#466381]">
          Features in this mock: online states, separate conversation windows, a fake nudge button, and scripted messages that help tell your story.
        </div>
      </div>
    </div>
  );
}
