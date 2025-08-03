"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <AnimatePresence mode="wait">
        {!showChat ? (
          // Landing Page
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center min-h-screen px-4"
          >
            <div className="max-w-4xl mx-auto text-center">
              {/* Welcome Message */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                  👋 Hi, I'm <span className="text-blue-400">Gaseema</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
                  Senior Flutter & Full-Stack Engineer with 6+ years of
                  experience building secure, high-performing fintech and crypto
                  applications.
                </p>
              </motion.div>

              {/* Big Emoji Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.4,
                  duration: 0.6,
                  type: "spring",
                  bounce: 0.4,
                }}
                className="mb-12"
              >
                <div className="w-32 h-32 md:w-40 md:h-40 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-6xl md:text-7xl shadow-2xl">
                  🤖
                </div>
              </motion.div>

              {/* Input with Suggestions */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="max-w-2xl mx-auto"
              >
                {/* Main Input */}
                <div className="relative mb-8">
                  <input
                    id="landing-input"
                    type="text"
                    placeholder="Ask me anything about my experience, skills, or projects..."
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && e.currentTarget.value.trim()) {
                        handleInputSubmit(e.currentTarget);
                      }
                    }}
                    className="w-full bg-gray-900 border border-gray-700 rounded-2xl px-6 py-4 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const input = document.getElementById(
                        "landing-input"
                      ) as HTMLInputElement;
                      if (input && input.value.trim()) {
                        handleInputSubmit(input);
                      }
                    }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition-colors"
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
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </motion.button>
                </div>

                {/* Suggestions */}
                <div className="space-y-4">
                  <p className="text-gray-500 text-sm">Or try one of these:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {suggestedQuestions.map((question, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                        whileHover={{
                          scale: 1.02,
                          backgroundColor: "rgb(55, 65, 81)",
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleQuestionSelect(question)}
                        className="bg-gray-800 hover:bg-gray-700 text-left p-4 rounded-xl border border-gray-700 transition-all text-sm md:text-base"
                      >
                        <span className="text-gray-300">{question}</span>
                        <svg
                          className="w-4 h-4 inline-block ml-2 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Fun Stats */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
                >
                  <div className="text-center p-4 bg-gray-900 rounded-lg border border-gray-800">
                    <div className="text-2xl font-bold text-blue-400">6+</div>
                    <div className="text-xs text-gray-500">
                      Years Experience
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gray-900 rounded-lg border border-gray-800">
                    <div className="text-2xl font-bold text-green-400">
                      100K+
                    </div>
                    <div className="text-xs text-gray-500">Users Reached</div>
                  </div>
                  <div className="text-center p-4 bg-gray-900 rounded-lg border border-gray-800">
                    <div className="text-2xl font-bold text-purple-400">
                      $1M+
                    </div>
                    <div className="text-xs text-gray-500">Transactions</div>
                  </div>
                  <div className="text-center p-4 bg-gray-900 rounded-lg border border-gray-800">
                    <div className="text-2xl font-bold text-yellow-400">🇰🇪</div>
                    <div className="text-xs text-gray-500">Based in Kenya</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          // Chat Page
          <motion.div
            key="chat"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen"
          >
            <div className="container mx-auto px-4 py-8">
              {/* Header with back button */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-between mb-6"
              >
                <div className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setShowChat(false);
                      setInitialQuestion(""); // Clear the initial question when going back
                    }}
                    className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors"
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
                  </motion.button>
                  <div>
                    <h1 className="text-2xl font-bold">Chat with Gaseema</h1>
                    <p className="text-gray-400 text-sm">Ask me anything!</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Online
                  </div>
                </div>
              </motion.div>

              {/* Chat Interface */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                <div className="h-[calc(100vh-200px)]">
                  <AIAssistant initialQuestion={initialQuestion} />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
