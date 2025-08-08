"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import ProjectShowcase from "./ProjectShowcase";
import ContactCard from "./ContactCard";
import { VoiceOrb } from "./ui/orbs";
import { ChatMessage, ChatInput } from "./ui/chat";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AIAssistantProps {
  className?: string;
  initialQuestion?: string;
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
  const [showSuggestions, setShowSuggestions] = useState(
    // Hide quick questions by default on mobile
    !(typeof window !== "undefined" && window.innerWidth < 768)
  );
  const [showProjectsAfterTyping, setShowProjectsAfterTyping] = useState<
    number | null
  >(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const initialQuestionSentRef = useRef<string>("");
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const currentExchangeRef = useRef<HTMLDivElement>(null);

  // Simple scroll logic - scroll to show only current question and answer
  const scrollToCurrentExchange = useCallback(() => {
    if (currentExchangeRef.current) {
      currentExchangeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, []);

  // Trigger scroll when user sends a message or when response is complete
  useEffect(() => {
    if (messages.length > 1) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "user") {
        // User just sent a message, scroll after a short delay
        setTimeout(() => scrollToCurrentExchange(), 200);
      }
    }
  }, [messages.length, scrollToCurrentExchange]);

  // Remove the old auto-scroll effects
  // useEffect(() => {
  //   if (!loading && typingMessageIndex === null) {
  //     setTimeout(() => {
  //       scrollToBottom();
  //     }, 200);
  //   }
  // }, [loading, typingMessageIndex, scrollToBottom]); // Remove auto-scroll when loading changes - let user control scroll during AI responses
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

        const cvKeywords = [
          "cv",
          "resume",
          "curriculum",
          "qualifications",
          "credentials",
          "download resume",
          "see resume",
          "show resume",
          "view cv",
          "your cv",
          "your resume",
        ];

        const techKeywords = [
          "technology",
          "technologies",
          "tech stack",
          "programming languages",
          "what do you use",
          "tools",
          "frameworks",
          "languages",
          "skills",
          "technical skills",
          "development tools",
          "coding languages",
        ];

        const userAskedAboutProjects = projectKeywords.some((keyword) =>
          text.toLowerCase().includes(keyword)
        );

        const userAskedAboutContact = contactKeywords.some((keyword) =>
          text.toLowerCase().includes(keyword)
        );

        const userAskedAboutCV = cvKeywords.some((keyword) =>
          text.toLowerCase().includes(keyword)
        );

        const userAskedAboutTech = techKeywords.some((keyword) =>
          text.toLowerCase().includes(keyword)
        );

        // Only show projects if specifically asking about projects/portfolio AND not asking about contact, CV, or tech
        const shouldShowProjects =
          userAskedAboutProjects &&
          !userAskedAboutContact &&
          !userAskedAboutCV &&
          !userAskedAboutTech;

        const shouldShowContact =
          userAskedAboutContact && !userAskedAboutCV && !userAskedAboutTech;
        const shouldShowCV = userAskedAboutCV && !userAskedAboutTech;
        const shouldShowTech = userAskedAboutTech;

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
        } else if (shouldShowCV) {
          // Add CV/resume response with hire modal trigger
          const cvContent = data.result + " SHOW_HIRE_MODAL";

          setMessages((prev) => {
            const newMessages: Message[] = [
              ...prev,
              {
                role: "assistant" as const,
                content: cvContent,
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
        } else if (shouldShowTech) {
          // Add tech stack response with tech showcase trigger
          const techContent = data.result + " SHOW_TECH_STACK";

          setMessages((prev) => {
            const newMessages: Message[] = [
              ...prev,
              {
                role: "assistant" as const,
                content: techContent,
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
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-6 pb-[230px] messages-container scrollbar-animated"
        >
          {/* Increased bottom padding to prevent overlap with quick questions and input */}
          {messages.map((message, index) => {
            // Find if this is part of the current exchange (last user message + response)
            const isCurrentExchange = (() => {
              // Find the last user message index
              const lastUserIndex = messages
                .map((m, i) => (m.role === "user" ? i : -1))
                .filter((i) => i !== -1)
                .pop();

              // Current exchange includes the last user message and any messages after it
              return lastUserIndex !== undefined && index >= lastUserIndex;
            })();

            return (
              <ChatMessage
                key={index}
                ref={
                  isCurrentExchange && message.role === "user"
                    ? currentExchangeRef
                    : undefined
                }
                message={message}
                index={index}
                typingMessageIndex={typingMessageIndex}
                onTypingComplete={() => {
                  setTypingMessageIndex(null);
                  setLoading(false);
                  setIsOrbActive(false);
                  setIsOrbListening(false);
                  // Scroll to show the complete exchange after typing
                  setTimeout(() => scrollToCurrentExchange(), 100);
                }}
                onProjectTrigger={(index) => {
                  setShowProjectsAfterTyping(index);
                }}
              />
            );
          })}

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
              <div className="overflow-x-auto pb-1 scrollbar-minimal">
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
          <ChatInput
            ref={inputRef}
            input={input}
            loading={loading}
            onInputChange={(value) => {
              setInput(value);
              // Track user typing for orb animation
              setIsUserTyping(value.length > 0);
            }}
            onSend={() => handleSend()}
          />
        </div>
      </div>
    </div>
  );
}
