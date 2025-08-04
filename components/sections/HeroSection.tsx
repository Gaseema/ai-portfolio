"use client";

import { motion } from "framer-motion";
import { VoiceOrb } from "../ui/orbs";

interface HeroSectionProps {
  isOrbActive: boolean;
  isOrbListening: boolean;
  onQuestionClick: (question: string) => void;
  onInputSubmit: (inputElement: HTMLInputElement) => void;
  onOrbClick: () => void;
}

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
};

const suggestedQuestions = [
  { text: "Tell me about your experience", icon: "👨‍💻" },
  { text: "What projects have you worked on?", icon: "🚀" },
  { text: "What technologies do you use?", icon: "⚡" },
  { text: "How can I contact you?", icon: "📧" },
  { text: "What's your background in Flutter?", icon: "📱" },
  { text: "Show me your best work", icon: "⭐" },
];

export default function HeroSection({
  isOrbActive,
  isOrbListening,
  onQuestionClick,
  onInputSubmit,
  onOrbClick,
}: HeroSectionProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 relative z-10">
      <motion.div
        className="mt-16 md:mt-8 flex justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div onClick={onOrbClick}>
          <VoiceOrb
            isActive={isOrbActive}
            isListening={isOrbListening}
            className="cursor-pointer hover:scale-105 transition-transform duration-200"
          />
        </div>
      </motion.div>

      <motion.div
        className="text-center space-y-4 md:space-y-6 mt-6 md:mt-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        <motion.h1
          className="text-3xl md:text-5xl font-semibold text-slate-800 leading-tight px-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 1.2,
            type: "spring",
            stiffness: 100,
          }}
        >
          {getGreeting()}, I'm Gaseema
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-medium px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          Flutter Developer with 6+ years building fintech apps
        </motion.p>
      </motion.div>

      <motion.div
        className="mt-8 md:mt-12 space-y-4 md:space-y-6 w-full max-w-md px-4"
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
            className="w-full px-4 py-3 md:px-6 md:py-4 pr-12 md:pr-16 bg-white/90 border border-slate-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-slate-800 placeholder-slate-500 shadow-lg text-sm md:text-base truncate"
            onFocus={() => {}}
            onBlur={() => {}}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onInputSubmit(e.currentTarget);
                e.currentTarget.value = "";
                e.currentTarget.blur();
              }
            }}
          />
          <motion.button
            onClick={() => {
              const input = document.querySelector("input") as HTMLInputElement;
              if (input) {
                onInputSubmit(input);
                input.value = "";
              }
            }}
            className="absolute right-1.5 md:right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-2 md:p-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5"
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

        <div className="space-y-3 md:space-y-4">
          <motion.p
            className="text-xs md:text-sm text-slate-600 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            Or try one of these:
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            {suggestedQuestions.map((question, index) => (
              <motion.button
                key={question.text}
                onClick={() => onQuestionClick(question.text)}
                className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-2 md:px-4 md:py-2.5 bg-white hover:bg-gray-50 text-slate-700 hover:text-slate-900 rounded-full transition-all duration-200 border border-slate-200 hover:border-slate-300 text-xs md:text-sm font-medium shadow-sm hover:shadow-md transform hover:scale-105"
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
                <span className="text-sm md:text-base">{question.icon}</span>
                <span className="leading-tight">{question.text}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
