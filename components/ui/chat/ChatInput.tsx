"use client";

import { forwardRef, useEffect } from "react";

interface ChatInputProps {
  input: string;
  loading: boolean;
  onInputChange: (value: string) => void;
  onSend: () => void;
}

const ChatInput = forwardRef<HTMLTextAreaElement, ChatInputProps>(
  ({ input, loading, onInputChange, onSend }, ref) => {
    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onSend();
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      onInputChange(value);

      // Reset height to auto to get the scroll height
      e.target.style.height = "auto";

      // Set height based on scroll height, with min/max constraints
      const scrollHeight = e.target.scrollHeight;
      const minHeight = window.innerWidth >= 768 ? 56 : 48; // responsive min height
      const maxHeight = 128; // max-h-32 (32 * 4 = 128px)

      e.target.style.height =
        Math.min(Math.max(scrollHeight, minHeight), maxHeight) + "px";
    };

    return (
      <div className="p-4 md:p-6 border-t border-white/10">
        <div className="relative">
          <textarea
            ref={ref}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="Ask me anything about Gaseema..."
            disabled={loading}
            rows={1}
            className="flex-1 w-full bg-white/90 text-slate-800 placeholder-slate-500 border border-slate-300 rounded-3xl px-4 py-3 md:px-6 md:py-4 pr-12 md:pr-16 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 disabled:opacity-50 transition-all duration-300 shadow-sm focus:scale-[1.01] resize-none min-h-[48px] md:min-h-[56px] max-h-32 overflow-y-auto text-sm md:text-base"
          />
          <button
            onClick={onSend}
            disabled={!input.trim() || loading}
            className="absolute right-1 md:right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-slate-400 disabled:to-slate-500 disabled:text-slate-300 text-white p-2 md:p-3 rounded-xl transition-all duration-300 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 disabled:hover:scale-100 font-medium"
          >
            {loading ? (
              <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
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
            )}
          </button>
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-slate-700 font-medium">
            Press Enter to send, Shift+Enter for new line
          </span>
          <span className="text-xs text-slate-700 font-medium">
            {input.length}/500
          </span>
        </div>
      </div>
    );
  }
);

ChatInput.displayName = "ChatInput";

export default ChatInput;
