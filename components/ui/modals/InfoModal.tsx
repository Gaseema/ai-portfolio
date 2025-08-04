"use client";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InfoModal({ isOpen, onClose }: InfoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-4 md:p-8 max-w-lg w-full shadow-2xl animate-fadeIn">
        <div className="flex justify-between items-start mb-4 md:mb-6">
          <h2 className="text-lg md:text-2xl font-bold text-slate-800">
            🚀 Not Your Boring Portfolio
          </h2>
          <button
            onClick={onClose}
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

        <div className="space-y-3 md:space-y-4 text-slate-600">
          <p className="text-sm md:text-lg">
            Why settle for static when you can have an{" "}
            <strong>AI-powered conversation</strong> about my journey? 🤖
          </p>

          <p className="text-sm md:text-base">
            This isn't just another portfolio - it's your personal gateway to
            discovering what makes me tick as a developer!
          </p>

          <div className="space-y-2 md:space-y-3">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-xs md:text-sm">
                <strong>Next.js 14 & TypeScript</strong> - Because I love type
                safety ✨
              </span>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs md:text-sm">
                <strong>Groq AI Assistant</strong> - Ask me anything, literally!
                🧠
              </span>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-xs md:text-sm">
                <strong>Live GitHub Stars</strong> - Watch the magic happen ⭐
              </span>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-xs md:text-sm">
                <strong>Tailwind CSS</strong> - Making pretty things fast 🎨
              </span>
            </div>
          </div>

          <div className="mt-4 md:mt-6 p-3 md:p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
            <p className="text-xs md:text-sm text-slate-700">
              <strong>Pro tip:</strong> Try asking the AI about my crypto
              projects, fintech experience, or that time I handled $1M+ in
              transactions! 💰
            </p>
          </div>

          <div className="mt-4 md:mt-6">
            <a
              href="https://github.com/Gaseema/ai-portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white py-2 md:py-3 px-4 md:px-6 rounded-xl font-medium transition-all duration-200 text-center flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 text-xs md:text-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
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
  );
}
