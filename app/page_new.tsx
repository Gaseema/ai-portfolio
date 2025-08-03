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
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-slate-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-blue-200/50"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8b5cf6_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf6_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.03]"></div>

      <AnimatePresence mode="wait">
        {!showChat ? (
          // Landing Page
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col min-h-screen"
          >
            {/* Navigation */}
            <motion.nav
              className="flex justify-between items-center p-6 md:p-8"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">G</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Gaseema
                </span>
              </motion.div>

              <motion.div
                className="flex items-center gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <a
                  href="#about"
                  className="text-slate-600 hover:text-slate-900 transition-colors duration-300 font-medium"
                >
                  About
                </a>
                <a
                  href="#work"
                  className="text-slate-600 hover:text-slate-900 transition-colors duration-300 font-medium"
                >
                  Work
                </a>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-lg"
                >
                  Contact
                </motion.button>
              </motion.div>
            </motion.nav>

            {/* Hero Section */}
            <div className="flex-1 flex items-center justify-center px-6 md:px-8">
              <div className="max-w-6xl mx-auto text-center">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                      Building Apps That
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      Scale & Succeed
                    </span>
                  </h1>

                  <motion.p
                    className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed font-medium"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  >
                    Senior Mobile Developer crafting high-performance apps for
                    fintech, crypto, and enterprise clients.
                    <span className="text-blue-700 font-semibold">
                      {" "}
                      100K+ users, millions in transactions.
                    </span>
                  </motion.p>

                  {/* Stats */}
                  <motion.div
                    className="flex flex-wrap justify-center gap-8 mb-12"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  >
                    {[
                      {
                        value: "100K+",
                        label: "App Users",
                        color: "text-blue-600",
                      },
                      {
                        value: "$1M+",
                        label: "Transactions",
                        color: "text-indigo-600",
                      },
                      {
                        value: "5+",
                        label: "Years Experience",
                        color: "text-blue-600",
                      },
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/60"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                      >
                        <div
                          className={`text-3xl font-bold ${stat.color} mb-1`}
                        >
                          {stat.value}
                        </div>
                        <div className="text-slate-500 text-sm font-medium">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* CTA Buttons */}
                  <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.0, duration: 0.8 }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowChat(true)}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl"
                    >
                      Start a Conversation
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        handleQuestionSelect(
                          "What projects have you worked on?"
                        )
                      }
                      className="bg-white/70 backdrop-blur-sm border border-slate-300 hover:border-slate-400 text-slate-800 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white/90 shadow-lg"
                    >
                      View My Work
                    </motion.button>
                  </motion.div>
                </motion.div>

                {/* Quick Questions */}
                <motion.div
                  className="mt-8"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                >
                  <p className="text-slate-500 mb-6 font-medium">
                    Or ask me about:
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {suggestedQuestions.map((question, index) => (
                      <motion.button
                        key={question}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.3 + index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleQuestionSelect(question)}
                        className="bg-white/60 backdrop-blur-sm border border-white/80 hover:border-slate-300 hover:bg-white/80 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 shadow-md"
                      >
                        {question}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Footer */}
            <motion.footer
              className="p-6 md:p-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <p className="text-slate-400 text-sm">
                © 2025 Gaseema. Built with Next.js, TypeScript & Framer Motion
              </p>
            </motion.footer>
          </motion.div>
        ) : (
          // Chat Page
          <motion.div
            key="chat"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen p-4 md:p-6 flex items-center justify-center relative z-10"
          >
            <div className="w-full max-w-5xl h-[90vh] relative">
              <AIAssistant
                className="h-full"
                initialQuestion={initialQuestion}
              />

              {/* Back Button */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05, x: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowChat(false);
                  setInitialQuestion("");
                }}
                className="absolute -top-16 left-0 flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors duration-300 font-medium"
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
                Back to Home
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
