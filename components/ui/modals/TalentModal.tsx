"use client";

import { useState } from "react";
import CVViewer from "../../CVViewer";

interface TalentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TalentModal({ isOpen, onClose }: TalentModalProps) {
  const [showCVViewer, setShowCVViewer] = useState(false);

  if (!isOpen) return null;

  const handleCVClick = () => {
    setShowCVViewer(true);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-4 md:p-8 max-w-lg w-full shadow-2xl animate-fadeIn">
        <div className="flex justify-between items-start mb-4 md:mb-6">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="relative">
              <div className="text-xl md:text-3xl animate-bounce">🚀</div>
              <div className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full animate-ping"></div>
            </div>
            <h2 className="text-lg md:text-2xl font-bold text-slate-800">
              Ready to Launch Together?
            </h2>
          </div>
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

        <div className="space-y-6 text-slate-600">
          <div className="text-center">
            <div className="inline-flex items-center gap-1 md:gap-2 bg-green-100/80 text-green-800 px-2 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium border border-green-200 mb-3 md:mb-4 animate-pulse">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-ping"></div>
              Available for hire NOW!
            </div>
            <p className="text-sm md:text-lg text-slate-700">
              I'm not just another developer - I'm your next{" "}
              <strong>secret weapon</strong> for building fintech products that
              users love! 💪
            </p>
          </div>

          <div className="space-y-3 md:space-y-4">
            <div
              className="flex items-center gap-3 md:gap-4 p-2 md:p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200 transform hover:scale-105 transition-all duration-300 animate-fadeInUp"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="text-lg md:text-2xl animate-spin-slow">⚡</div>
              <div>
                <div className="font-semibold text-slate-800 text-sm md:text-base">
                  6+ Years of Flutter Mastery
                </div>
                <div className="text-xs md:text-sm text-slate-600">
                  Building apps that handle millions in transactions
                </div>
              </div>
            </div>

            <div
              className="flex items-center gap-3 md:gap-4 p-2 md:p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 transform hover:scale-105 transition-all duration-300 animate-fadeInUp"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="text-lg md:text-2xl animate-bounce">💰</div>
              <div>
                <div className="font-semibold text-slate-800 text-sm md:text-base">
                  Fintech & Crypto Expert
                </div>
                <div className="text-xs md:text-sm text-slate-600">
                  Secured $1M+ in real-world transactions
                </div>
              </div>
            </div>

            <div
              className="flex items-center gap-3 md:gap-4 p-2 md:p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-200 transform hover:scale-105 transition-all duration-300 animate-fadeInUp"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="text-lg md:text-2xl animate-pulse">🌍</div>
              <div>
                <div className="font-semibold text-slate-800 text-sm md:text-base">
                  Remote-First Mindset
                </div>
                <div className="text-xs md:text-sm text-slate-600">
                  Timezone flexible, collaboration ready
                </div>
              </div>
            </div>

            <div
              className="flex items-center gap-3 md:gap-4 p-2 md:p-3 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-200 transform hover:scale-105 transition-all duration-300 animate-fadeInUp"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="text-lg md:text-2xl animate-wiggle">🚀</div>
              <div>
                <div className="font-semibold text-slate-800 text-sm md:text-base">
                  Startup Speed, Enterprise Quality
                </div>
                <div className="text-xs md:text-sm text-slate-600">
                  Move fast, break nothing important
                </div>
              </div>
            </div>
          </div>

          <div
            className="text-center p-3 md:p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white animate-fadeInUp"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="text-base md:text-lg font-semibold mb-1 md:mb-2">
              🎯 Ready to build something amazing?
            </div>
            <div className="text-xs md:text-sm opacity-90">
              Let's turn your vision into reality!
            </div>
          </div>

          <div
            className="grid grid-cols-2 gap-2 md:gap-3 animate-fadeInUp"
            style={{ animationDelay: "0.6s" }}
          >
            <a
              href="mailto:gaseema.n@gmail.com"
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-2 md:py-3 px-4 md:px-6 rounded-xl font-medium transition-all duration-300 text-center shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 text-xs md:text-sm"
            >
              💬 Let's Chat!
            </a>
            <button
              onClick={handleCVClick}
              className="bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-slate-700 py-2 md:py-3 px-4 md:px-6 rounded-xl font-medium transition-all duration-300 text-center shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 text-xs md:text-sm"
            >
              📄 Resume
            </button>
          </div>
        </div>
      </div>
      </div>

      {/* CV Viewer Integration */}
      {showCVViewer && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]">
          <CVViewer />
          <button
            onClick={() => setShowCVViewer(false)}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-all z-[70]"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
