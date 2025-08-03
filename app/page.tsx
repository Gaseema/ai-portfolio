"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AIAssistant from "@/components/AIAssistant";

export default function HomePage() {
  const [showChat, setShowChat] = useState(false);
  const [initialQuestion, setInitialQuestion] = useState<string>("");
  const [showTalentModal, setShowTalentModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

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
    { text: "Tell me about your experience", icon: "👨‍💻" },
    { text: "What projects have you worked on?", icon: "🚀" },
    { text: "What technologies do you use?", icon: "⚡" },
    { text: "How can I contact you?", icon: "📧" },
    { text: "What's your background in Flutter?", icon: "📱" },
    { text: "Show me your best work", icon: "⭐" },
  ];

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
        <div className="flex flex-col items-center justify-center min-h-screen px-4 relative z-10">
          {/* Top Navigation - Only visible on landing page */}
          <motion.div
            className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Left side - Looking for talent button */}
            <motion.button
              onClick={() => setShowTalentModal(true)}
              className="bg-white hover:bg-gray-50 text-slate-700 hover:text-slate-900 px-4 py-2 rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 border border-slate-200 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Looking for talent
            </motion.button>

            {/* Right side - Info button */}
            <motion.button
              onClick={() => setShowInfoModal(true)}
              className="bg-white hover:bg-gray-50 text-slate-700 hover:text-slate-900 p-2 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 border border-slate-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, rotate: -10 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </motion.button>
          </motion.div>
          {/* Hero Section */}
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.h1
              className="text-6xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-blue-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                type: "spring",
                stiffness: 100,
              }}
            >
              {getGreeting()}, I'm Gaseema
            </motion.h1>
            <motion.p
              className="text-xl text-slate-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              Flutter Developer with 6+ years building fintech apps.
            </motion.p>
          </motion.div>

          {/* Input Section */}
          <motion.div
            className="mt-12 space-y-6 w-full max-w-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <input
                type="text"
                placeholder="Ask me anything..."
                className="w-full px-6 py-4 bg-white/90 border border-slate-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-slate-800 placeholder-slate-500 shadow-lg"
                onChange={(e) => {
                  const value = e.target.value;
                  setIsTyping(value.length > 0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleInputSubmit(e.currentTarget);
                    e.currentTarget.value = "";
                    setIsTyping(false);
                  }
                }}
                onBlur={(e) => {
                  // Small delay to allow for potential submission
                  setTimeout(() => {
                    const input = e.currentTarget;
                    if (input && input.value.length === 0) {
                      setIsTyping(false);
                    }
                  }, 100);
                }}
              />
              <motion.button
                onClick={() => {
                  const input = document.querySelector(
                    "input"
                  ) as HTMLInputElement;
                  if (input) {
                    handleInputSubmit(input);
                    input.value = "";
                    setIsTyping(false);
                  }
                }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
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
              </motion.button>
            </motion.div>

            {/* Suggested Questions */}
            <div className="space-y-4">
              <motion.p
                className="text-sm text-slate-600 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.3 }}
              >
                Or try one of these:
              </motion.p>

              {/* Pill Layout - Flexible width pills */}
              <motion.div
                className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.5 }}
              >
                {suggestedQuestions.map((question, index) => (
                  <motion.button
                    key={question.text}
                    onClick={() => handleQuestionClick(question.text)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-gray-50 text-slate-700 hover:text-slate-900 rounded-full transition-all duration-200 border border-slate-200 hover:border-slate-300 text-sm font-medium shadow-sm hover:shadow-md transform hover:scale-105"
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 1.7 + index * 0.1,
                      type: "spring",
                      stiffness: 100,
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-base">{question.icon}</span>
                    <span>{question.text}</span>
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </motion.div>
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

      {/* Looking for Talent Modal */}
      {showTalentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl animate-fadeIn">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="text-3xl animate-bounce">🚀</div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                </div>
                <h2 className="text-2xl font-bold text-slate-800">
                  Ready to Launch Together?
                </h2>
              </div>
              <button
                onClick={() => setShowTalentModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-6 text-slate-600">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-green-100/80 text-green-800 px-4 py-2 rounded-full text-sm font-medium border border-green-200 mb-4 animate-pulse">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                  Available for hire NOW!
                </div>
                <p className="text-lg text-slate-700">
                  I'm not just another developer - I'm your next{" "}
                  <strong>secret weapon</strong> for building fintech products
                  that users love! 💪
                </p>
              </div>

              <div className="space-y-4">
                <div
                  className="flex items-center gap-4 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200 transform hover:scale-105 transition-all duration-300 animate-fadeInUp"
                  style={{ animationDelay: "0.1s" }}
                >
                  <div className="text-2xl animate-spin-slow">⚡</div>
                  <div>
                    <div className="font-semibold text-slate-800">
                      6+ Years of Flutter Mastery
                    </div>
                    <div className="text-sm text-slate-600">
                      Building apps that handle millions in transactions
                    </div>
                  </div>
                </div>

                <div
                  className="flex items-center gap-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 transform hover:scale-105 transition-all duration-300 animate-fadeInUp"
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className="text-2xl animate-bounce">💰</div>
                  <div>
                    <div className="font-semibold text-slate-800">
                      Fintech & Crypto Expert
                    </div>
                    <div className="text-sm text-slate-600">
                      Secured $1M+ in real-world transactions
                    </div>
                  </div>
                </div>

                <div
                  className="flex items-center gap-4 p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-200 transform hover:scale-105 transition-all duration-300 animate-fadeInUp"
                  style={{ animationDelay: "0.3s" }}
                >
                  <div className="text-2xl animate-pulse">🌍</div>
                  <div>
                    <div className="font-semibold text-slate-800">
                      Remote-First Mindset
                    </div>
                    <div className="text-sm text-slate-600">
                      Timezone flexible, collaboration ready
                    </div>
                  </div>
                </div>

                <div
                  className="flex items-center gap-4 p-3 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-200 transform hover:scale-105 transition-all duration-300 animate-fadeInUp"
                  style={{ animationDelay: "0.4s" }}
                >
                  <div className="text-2xl animate-wiggle">🚀</div>
                  <div>
                    <div className="font-semibold text-slate-800">
                      Startup Speed, Enterprise Quality
                    </div>
                    <div className="text-sm text-slate-600">
                      Move fast, break nothing important
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="text-center p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white animate-fadeInUp"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="text-lg font-semibold mb-2">
                  🎯 Ready to build something amazing?
                </div>
                <div className="text-sm opacity-90">
                  Let's turn your vision into reality!
                </div>
              </div>

              <div
                className="grid grid-cols-2 gap-3 animate-fadeInUp"
                style={{ animationDelay: "0.6s" }}
              >
                <a
                  href="mailto:your-email@example.com"
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 text-center shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                >
                  💬 Let's Chat!
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  className="bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-slate-700 py-3 px-6 rounded-xl font-medium transition-all duration-300 text-center shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                >
                  📄 Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl animate-fadeIn">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-slate-800">
                🚀 Not Your Boring Portfolio
              </h2>
              <button
                onClick={() => setShowInfoModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4 text-slate-600">
              <p className="text-lg">
                Why settle for static when you can have an{" "}
                <strong>AI-powered conversation</strong> about my journey? 🤖
              </p>

              <p>
                This isn't just another portfolio - it's your personal gateway
                to discovering what makes me tick as a developer!
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span>
                    <strong>Next.js 14 & TypeScript</strong> - Because I love
                    type safety ✨
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>
                    <strong>Groq AI Assistant</strong> - Ask me anything,
                    literally! 🧠
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>
                    <strong>Live GitHub Stars</strong> - Watch the magic happen
                    ⭐
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span>
                    <strong>Tailwind CSS</strong> - Making pretty things fast 🎨
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                <p className="text-sm text-slate-700">
                  <strong>Pro tip:</strong> Try asking the AI about my crypto
                  projects, fintech experience, or that time I handled $1M+ in
                  transactions! 💰
                </p>
              </div>

              <div className="mt-6">
                <a
                  href="https://github.com/Gaseema/ai-portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 text-center flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Peek Behind the Code Magic ✨
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
