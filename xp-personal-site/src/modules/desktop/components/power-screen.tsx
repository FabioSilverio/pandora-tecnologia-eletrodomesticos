"use client";

interface PowerScreenProps {
  message: string;
}

export function PowerScreen({ message }: PowerScreenProps) {
  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center bg-[#0a2f5c] text-white">
      <div className="text-center">
        <div className="text-4xl font-bold">Windows XP</div>
        <div className="mt-4 text-lg text-blue-100">{message}</div>
      </div>
    </div>
  );
}
