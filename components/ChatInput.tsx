"use client";

import { useState } from "react";

export default function ChatInput({
  onSend,
}: {
  onSend: (msg: string) => void;
}) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 border border-gray-700 p-2 rounded bg-gray-900"
    >
      <input
        type="text"
        className="flex-1 bg-transparent outline-none text-white placeholder-gray-500"
        placeholder="Ask me anything..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="text-sm px-3 py-1 bg-white text-black rounded hover:bg-gray-200"
      >
        Send
      </button>
    </form>
  );
}
