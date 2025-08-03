"use client";

import { useState } from "react";
import AIAssistant from "@/components/AIAssistant";

export default function HomePage() {
  const [showChat, setShowChat] = useState(false);
  const [initialQuestion, setInitialQuestion] = useState<string>("");

  const suggestedQuestions = [
    "Tell me about your experience",
    "What projects have you worked on?",
    "What technologies do you use?",
    "How can I contact you?",
    "What's your background in Flutter?",
    "Show me your best work",
  ];

  const handleQuestionSelect = (question: string) => {
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

  return (
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
        <div className="flex flex-col items-center justify-center min-h-screen px-4 relative z-10 animate-fadeIn">
          <div className="text-center space-y-8 animate-fadeInUp">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-blue-600 bg-clip-text text-transparent">
              Hi, I'm Gaseema
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl">
              Ask me anything about my experience, projects, or skills. I'm an AI-powered assistant that knows everything about Gaseema's work.
            </p>
          </div>

          <div className="mt-12 space-y-6 w-full max-w-md animate-fadeInUp animate-delay-200">
    </main>
  );
}
