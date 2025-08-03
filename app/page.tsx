// app/page.tsx
"use client";

import { useState } from "react";
import ChatInput from "@/components/ChatInput";
import ChatBubble from "@/components/ChatBubble";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (message: string) => {
    const userMessage: Message = { role: "user", content: message };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [...messages, userMessage] }),
    });

    const data = await res.json();
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: data.result },
    ]);
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-between min-h-screen bg-black text-white px-4 pt-10 pb-24">
      <div className="w-full max-w-3xl mx-auto flex-1 flex flex-col">
        <h1 className="text-3xl font-bold text-center mb-4">
          👋 Hi, I'm Gaseema
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Welcome to my AI-powered portfolio. Ask me anything — about my skills,
          experience, or projects.
        </p>

        <div className="flex flex-col gap-4 overflow-y-auto flex-1 mb-6">
          {messages.map((msg, index) => (
            <ChatBubble key={index} message={msg} />
          ))}
          {loading && (
            <ChatBubble message={{ role: "assistant", content: "Thinking…" }} />
          )}
        </div>

        <ChatInput onSend={handleSend} />
      </div>
    </main>
  );
}
