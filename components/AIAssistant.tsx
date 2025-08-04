// Build an AI-powered assistant component for my portfolio site.
// The assistant should allow users to ask questions like:
// - "Tell me about your experience"
// - "What projects have you worked on?"
// - "What technologies do you use?"
// - "How can I contact you?"
// The assistant should:
// - Be chat-based with a text input and a response area
// - Use a mock groq API function for now
// - Show loading animation while fetching answer
// - Auto-scroll to latest message
// - Use a clean, responsive design with Tailwind CSS
// - Optional: Support speech-to-text and/or text-to-speech in the future
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import ProjectShowcase from "./ProjectShowcase";
import ContactCard from "./ContactCard";
import VoiceOrb from "./VoiceOrb";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AIAssistantProps {
  className?: string;
  initialQuestion?: string;
}

// Typing animation component
function TypingText({
  text,
  onComplete,
}: {
  text: string;
  onComplete?: () => void;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);

        // Removed auto-scrolling during typing to let users scroll manually
      }, 30); // Adjust speed here (lower = faster)

      return () => clearTimeout(timer);
    } else if (onComplete) {
      // Removed final scroll when typing completes - let user control scrolling
      onComplete();
    }
  }, [currentIndex, text, onComplete]);

  useEffect(() => {
    setDisplayedText("");
    setCurrentIndex(0);
  }, [text]);

  return <span>{displayedText}</span>;
}

export default function AIAssistant({
  className = "",
  initialQuestion = "",
}: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey! I'm Gaseema, I build apps that handle millions in transactions 💪 What brings you here?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typingMessageIndex, setTypingMessageIndex] = useState<number | null>(
    null
  );
  const [isOrbActive, setIsOrbActive] = useState(false);
  const [isOrbListening, setIsOrbListening] = useState(false);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showProjectsAfterTyping, setShowProjectsAfterTyping] = useState<
    number | null
  >(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const initialQuestionSentRef = useRef<string>("");

  // Auto-scroll to latest message (optimized)
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Enhanced scrolling function for real-time updates (optimized)
  const smoothScrollToBottom = useCallback(() => {
    const messagesContainer = document.querySelector(".messages-container");
    if (messagesContainer) {
      messagesContainer.scrollTo({
        top: messagesContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    // Only auto-scroll when user sends a message, not during AI responses
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "user") {
        scrollToBottom();
      }
    }
  }, [messages.length, scrollToBottom]); // Only trigger on message count change

  // Remove auto-scroll when loading changes - let user control scroll during AI responses
  // useEffect(() => {
  //   if (loading) {
  //     const timeoutId = setTimeout(smoothScrollToBottom, 100);
  //     return () => clearTimeout(timeoutId);
  //   }
  // }, [loading, smoothScrollToBottom]);

  const handleSend = useCallback(
    async (messageText?: string) => {
      const text = messageText || input.trim();
      if (!text || loading) return;

      const userMessage: Message = {
        role: "user",
        content: text,
        timestamp: new Date(),
      };

      // Update messages and input immediately
      setInput("");
      setIsUserTyping(false);
      setLoading(true);
      setIsOrbListening(true);

      // Add user message first
      setMessages((prev) => [...prev, userMessage]);

      try {
        // Get current messages for API call - use functional update to get latest state
        const response = await fetch("/api/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...messages, userMessage].map(({ role, content }) => ({
              role,
              content,
            })),
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to get response");
        }

        const data = await response.json();

        // Check if user asked specifically about projects/portfolio/experience (not general questions)
        const projectKeywords = [
          "project",
          "portfolio",
          "built",
          "app",
          "developed",
          "show me",
          "expertise",
        ];
        const contactKeywords = [
          "contact",
          "reach",
          "email",
          "phone",
          "connect",
          "hire",
        ];

        const userAskedAboutProjects = projectKeywords.some((keyword) =>
          text.toLowerCase().includes(keyword)
        );

        const userAskedAboutContact = contactKeywords.some((keyword) =>
          text.toLowerCase().includes(keyword)
        );

        // Only show projects if specifically asking about projects/portfolio AND not asking about contact
        const shouldShowProjects =
          userAskedAboutProjects && !userAskedAboutContact;

        const shouldShowContact = userAskedAboutContact;

        // Check if response indicates to show projects OR user asked specifically about projects
        if (
          data.result.includes("CHECK_OUT_MY_PROJECTS") ||
          shouldShowProjects
        ) {
          // Keep the original response with trigger for project showcase detection
          // But show clean response to user
          const finalContent = data.result.includes("CHECK_OUT_MY_PROJECTS")
            ? data.result
            : data.result + " CHECK_OUT_MY_PROJECTS";

          setMessages((prev) => {
            const newMessages: Message[] = [
              ...prev,
              {
                role: "assistant" as const,
                content: finalContent,
                timestamp: new Date(),
              },
            ];
            setTypingMessageIndex(newMessages.length - 1);
            // Switch to listening mode for typing animation and stop loading
            setIsOrbActive(false);
            setIsOrbListening(true);
            setLoading(false); // Stop loading when typing starts
            return newMessages;
          });

          // Project showcase is now handled inline with the message
        } else if (shouldShowContact) {
          // Add contact response with contact card trigger
          const contactContent = data.result + " SHOW_CONTACT_CARD";

          setMessages((prev) => {
            const newMessages: Message[] = [
              ...prev,
              {
                role: "assistant" as const,
                content: contactContent,
                timestamp: new Date(),
              },
            ];
            setTypingMessageIndex(newMessages.length - 1);
            // Switch to listening mode for typing animation and stop loading
            setIsOrbActive(false);
            setIsOrbListening(true);
            setLoading(false); // Stop loading when typing starts
            return newMessages;
          });
        } else {
          // Add regular assistant response with typing animation
          setMessages((prev) => {
            const newMessages: Message[] = [
              ...prev,
              {
                role: "assistant" as const,
                content: data.result,
                timestamp: new Date(),
              },
            ];
            // Trigger typing animation for the last message (assistant response)
            setTypingMessageIndex(newMessages.length - 1);
            // Switch to listening mode for typing animation and stop loading
            setIsOrbActive(false);
            setIsOrbListening(true);
            setLoading(false); // Stop loading when typing starts
            return newMessages;
          });
        }
      } catch (error) {
        console.error("Error:", error);
        setMessages((prev) => {
          const newMessages: Message[] = [
            ...prev,
            {
              role: "assistant" as const,
              content:
                "Sorry, I'm having trouble connecting right now. Please try again! 😅",
              timestamp: new Date(),
            },
          ];
          // Trigger typing animation for error message too
          setTypingMessageIndex(newMessages.length - 1);
          // Switch to listening mode for typing animation and stop loading
          setIsOrbActive(false);
          setIsOrbListening(true);
          setLoading(false); // Stop loading when typing starts
          return newMessages;
        });
      }
    },
    [input, loading, messages]
  );

  // Handle initial question without auto-focusing input
  useEffect(() => {
    // Only auto-focus on desktop, not on mobile
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768;

    if (!isMobile) {
      inputRef.current?.focus();
    }

    // If there's an initial question and it hasn't been sent yet
    if (
      initialQuestion &&
      initialQuestion.trim() &&
      initialQuestionSentRef.current !== initialQuestion
    ) {
      initialQuestionSentRef.current = initialQuestion;
      setTimeout(() => {
        handleSend(initialQuestion.trim());
      }, 500); // Small delay for smooth transition
    }
  }, [initialQuestion, handleSend]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-resize textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);

    // Track user typing for orb animation
    setIsUserTyping(value.length > 0);

    // Reset height to auto to get the scroll height
    e.target.style.height = "auto";

    // Set height based on scroll height, with min/max constraints
    const scrollHeight = e.target.scrollHeight;
    const minHeight = 56; // min-h-[56px]
    const maxHeight = 128; // max-h-32 (32 * 4 = 128px)

    e.target.style.height =
      Math.min(Math.max(scrollHeight, minHeight), maxHeight) + "px";
  };

  const suggestedQuestions = [
    "What projects have you worked on?",
    "Tell me about your experience",
    "What technologies do you use?",
    "Show me your Flutter expertise",
    "How can I contact you?",
    "What's your background in fintech?",
    "Tell me about your crypto projects",
    "What's your biggest achievement?",
  ];

  const handleSuggestionClick = (suggestion: string) => {
    // Automatically send the suggestion instead of just filling the input
    handleSend(suggestion);
  };

  return (
    <div className="flex justify-center w-full h-full">
      {/* Chat Container with max width */}
      <div
        className={`flex flex-col h-full bg-white/5 backdrop-blur-xl rounded-3xl ${className} relative overflow-hidden max-w-4xl w-full mx-4`}
      >
        {/* Messages Area - with bottom padding for fixed input and quick questions */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-[230px] messages-container">
          {/* Increased bottom padding to prevent overlap with quick questions and input */}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex animate-fadeInUp ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] p-4 backdrop-blur-md border shadow-lg relative transition-all duration-300 hover:shadow-xl ${
                  message.role === "user"
                    ? "bg-blue-500 text-white border-blue-400 ml-auto shadow-blue-500/20 rounded-3xl rounded-br-lg"
                    : "bg-slate-100 text-slate-800 border-slate-200 shadow-slate-200/50 rounded-3xl rounded-bl-lg"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">
                  {message.role === "assistant" &&
                  typingMessageIndex === index ? (
                    <TypingText
                      text={message.content
                        .replace("CHECK_OUT_MY_PROJECTS", "")
                        .replace("SHOW_CONTACT_CARD", "")
                        .trim()}
                      onComplete={() => {
                        setTypingMessageIndex(null);
                        setLoading(false);
                        setIsOrbActive(false);
                        setIsOrbListening(false);
                        // Show projects after typing completes if this message has the trigger
                        if (message.content.includes("CHECK_OUT_MY_PROJECTS")) {
                          setShowProjectsAfterTyping(index);
                        }
                      }}
                    />
                  ) : (
                    message.content
                      .replace("CHECK_OUT_MY_PROJECTS", "")
                      .replace("SHOW_CONTACT_CARD", "")
                      .trim()
                  )}
                </p>

                {/* Show ProjectShowcase inline when message contains the trigger AND typing is complete */}
                {(() => {
                  const shouldShow =
                    message.role === "assistant" &&
                    message.content.includes("CHECK_OUT_MY_PROJECTS") &&
                    typingMessageIndex !== index; // Only show if not currently typing this message
                  return shouldShow;
                })() && (
                  <div className="mt-4 animate-fadeIn">
                    <ProjectShowcase />
                  </div>
                )}

                {/* Show ContactCard inline when message contains the contact trigger AND typing is complete */}
                {(() => {
                  const shouldShow =
                    message.role === "assistant" &&
                    message.content.includes("SHOW_CONTACT_CARD") &&
                    typingMessageIndex !== index; // Only show if not currently typing this message
                  return shouldShow;
                })() && (
                  <div className="mt-4 animate-fadeIn">
                    <ContactCard />
                  </div>
                )}

                <span
                  className={`text-xs opacity-70 mt-1 block ${
                    message.role === "user" ? "text-blue-100" : "text-slate-500"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </span>
              </div>
            </div>
          ))}

          {/* Loading Animation with Wave Ellipsis */}
          {loading && (
            <div className="flex justify-start animate-fadeInUp">
              <div className="bg-slate-100/80 backdrop-blur-sm text-slate-800 p-4 rounded-3xl rounded-bl-lg border border-slate-200/50 shadow-lg">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600 font-medium">
                    Thinking
                  </span>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} data-messages-end />
        </div>

        {/* Fixed Bottom Section: Quick Questions + Input */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/40 backdrop-blur-[50px] border-t border-white/30 z-50 rounded-3xl mb-5">
          {/* Compact Quick Questions */}
          {showSuggestions && (
            <div className="px-6 py-2 border-b border-white/20">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-xs text-slate-700 font-medium flex-shrink-0">
                  Quick questions:
                </p>
                <button
                  onClick={() => setShowSuggestions(false)}
                  className="w-5 h-5 flex items-center justify-center ml-auto bg-slate-200/60 hover:bg-slate-300/60 rounded-full transition-all duration-200 hover:scale-110"
                >
                  <svg
                    className="w-2.5 h-2.5 text-slate-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="overflow-x-auto pb-1">
                <div
                  className="flex gap-2 scrollbar-hide"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(question)}
                      className="text-xs bg-white/80 hover:bg-white/95 text-slate-700 hover:text-slate-900 px-3 py-2 rounded-full transition-all duration-200 border border-slate-300/50 hover:border-slate-400 font-medium shadow-sm flex-shrink-0 whitespace-nowrap hover:scale-105 active:scale-95"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Show Quick Questions Button (when hidden) */}
          {!showSuggestions && (
            <div className="px-6 py-1.5 border-b border-white/20 bg-white/20 flex justify-center">
              <button
                onClick={() => setShowSuggestions(true)}
                className="w-6 h-6 flex items-center justify-center bg-slate-200/60 hover:bg-slate-300/60 rounded-full transition-all duration-200 hover:scale-110"
              >
                <svg
                  className="w-3 h-3 text-slate-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* Input Area */}
          <div className="p-6 border-t border-white/10">
            <div className="flex gap-3">
              <textarea
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                placeholder="Ask me anything about Gaseema..."
                disabled={loading}
                rows={1}
                className="flex-1 bg-white/90 text-slate-800 placeholder-slate-500 border border-slate-300 rounded-3xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 disabled:opacity-50 transition-all duration-300 shadow-sm focus:scale-[1.01] resize-none min-h-[56px] max-h-32 overflow-y-auto"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-slate-400 disabled:to-slate-500 disabled:text-slate-300 text-white px-6 py-4 rounded-3xl transition-all duration-300 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 disabled:hover:scale-100 font-medium"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
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
        </div>
      </div>
    </div>
  );
}
