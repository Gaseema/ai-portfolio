"use client";

import { useState } from "react";
import AIAssistant from "@/components/AIAssistant";

export default function HomePage() {
  const [showChat, setShowChat] = useState(false);
  const [initialQuestion, setInitialQuestion] = useState<string>("");

  const handleQuestionClick = (question: string) => {
    setInitialQuestion(question);
    setShowChat(true);
  };

  const handleInputSubmit = (inputElement: HTMLInputElement) => {
    const question = inputElement.value.trim();
    if (question) {
      setInitialQuestion(question);
      setShowChat(true);
    }
  };

  const suggestedQuestions = [
    "Tell me about your experience",
    "What projects have you worked on?",
    "What technologies do you use?",
    "How can I contact you?",
    "What's your background in Flutter?",
    "Show me your best work",
  ];

  return (
    <>
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <main
        className="min-h-screen text-slate-800 overflow-hidden font-inter relative"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgb(253, 252, 251) 0%, rgb(226, 209, 195) 100%)",
        }}
      >
        {/* Light Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-200/20 via-transparent to-orange-200/20"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#d97706_1px,transparent_1px),linear-gradient(to_bottom,#d97706_1px,transparent_1px)] bg-[size:60px_60px] opacity-[0.02]"></div>

        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl z-10 animate-float-1" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl z-10 animate-float-2" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-yellow-200/20 rounded-full blur-2xl animate-float-3" />

        {!showChat ? (
          // Landing Page
          <div className="flex flex-col items-center justify-center min-h-screen px-4 relative z-10">
            {/* Hero Section */}
            <div className="text-center space-y-8 animate-fadeInUp">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-blue-600 bg-clip-text text-transparent">
                Hi, I'm Gaseema
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl">
                Ask me anything about my experience, projects, or skills. I'm an
                AI-powered assistant that knows everything about Gaseema's work.
              </p>
            </div>

            {/* Input Section */}
            <div className="mt-12 space-y-6 w-full max-w-md animate-fadeInUp animate-delay-200">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ask me anything..."
                  className="w-full px-6 py-4 bg-white/90 border border-slate-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-slate-800 placeholder-slate-500 shadow-lg"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleInputSubmit(e.currentTarget);
                      e.currentTarget.value = "";
                    }
                  }}
                />
                <button
                  onClick={() => {
                    const input = document.querySelector(
                      "input"
                    ) as HTMLInputElement;
                    if (input) {
                      handleInputSubmit(input);
                      input.value = "";
                    }
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg"
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
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>

              {/* Suggested Questions */}
              <div className="space-y-3">
                <p className="text-sm text-slate-600 text-center">
                  Or try one of these:
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuestionClick(question)}
                      className="w-full text-left px-4 py-3 bg-white/80 hover:bg-white/95 text-slate-700 hover:text-slate-900 rounded-2xl transition-all duration-200 border border-slate-300/50 hover:border-slate-400 text-sm font-medium shadow-sm hover:shadow-md animate-fadeInUp"
                      style={{ animationDelay: `${(index + 3) * 0.1}s` }}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Chat Interface
          <div className="h-screen relative z-10 animate-fadeIn">
            <AIAssistant initialQuestion={initialQuestion} className="h-full" />

            {/* Back Button */}
            <button
              onClick={() => {
                setShowChat(false);
                setInitialQuestion("");
              }}
              className="fixed top-6 left-6 z-50 bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 p-3 rounded-2xl transition-all duration-200 border border-slate-300/50 hover:border-slate-400 shadow-lg hover:shadow-xl backdrop-blur-sm"
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
          </div>
        )}
      </main>
    </>
  );
}
