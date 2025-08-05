"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AIAssistant from "@/components/AIAssistant";
import PulsatingOrb from "@/components/PulsatingOrb";

function ChatContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuestion = searchParams.get("q") || "";
  const [isOrbActive] = useState(false);
  const [isOrbListening] = useState(false);

  return (
    <main
      className="min-h-screen text-slate-800 overflow-hidden font-inter relative"
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgb(253, 252, 251) 0%, rgb(226, 209, 195) 100%)",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-200/20 via-transparent to-orange-200/20"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#d97706_1px,transparent_1px),linear-gradient(to_bottom,#d97706_1px,transparent_1px)] bg-[size:60px_60px] opacity-[0.02]"></div>

      <div className="absolute top-20 left-20 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl z-10 animate-float-1" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl z-10 animate-float-2" />
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-yellow-200/20 rounded-full blur-2xl animate-float-3" />

      <div className="h-screen relative z-10 animate-fadeIn">
        {/* Transparent App Bar */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white/30 backdrop-blur-md border-b border-white/20 p-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            {/* Left - Back Button */}
            <button
              onClick={() => router.push("/")}
              className="bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 p-3 rounded-2xl transition-all duration-200 border border-slate-300/50 hover:border-slate-400 shadow-lg hover:shadow-xl backdrop-blur-sm"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Right - Gaseema's Assistant Online Logo */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl border border-slate-300/50 shadow-lg">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-800">
                    Gaseema's Assistant
                  </span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse opacity-80"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Content with top padding to account for app bar */}
        <div className="pt-20 h-full">
          <AIAssistant initialQuestion={initialQuestion} className="h-full" />
        </div>
      </div>
    </main>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatContent />
    </Suspense>
  );
}
