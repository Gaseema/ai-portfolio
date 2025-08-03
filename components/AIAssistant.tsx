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
import { motion, AnimatePresence } from "framer-motion";
import ProjectShowcase from "./ProjectShowcase";
import { expandSpring } from "./animations";

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
function TypingText({ text, onComplete }: { text: string; onComplete?: () => void }) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 30); // Adjust speed here (lower = faster)

      return () => clearTimeout(timer);
    } else if (onComplete) {
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
  const [typingMessageIndex, setTypingMessageIndex] = useState<number | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showProjectsAfterTyping, setShowProjectsAfterTyping] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const initialQuestionSentRef = useRef<string>("");

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      setLoading(true);
      
      // Add user message first
      setMessages((prev) => [...prev, userMessage]);

      try {
        // Get current messages for API call
        const currentMessages = messages.concat(userMessage);
        
        const response = await fetch("/api/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: currentMessages.map(({ role, content }) => ({
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
        const projectKeywords = ['project', 'portfolio', 'built', 'app', 'developed', 'show me', 'expertise'];
        const contactKeywords = ['contact', 'reach', 'email', 'phone', 'connect', 'hire'];
        const generalKeywords = ['experience', 'work', 'background'];
        
        const userAskedAboutProjects = projectKeywords.some(keyword => 
          text.toLowerCase().includes(keyword)
        );
        
        const userAskedAboutContact = contactKeywords.some(keyword => 
          text.toLowerCase().includes(keyword)
        );
        
        // Only show projects if specifically asking about projects/portfolio AND not asking about contact
        const shouldShowProjects = userAskedAboutProjects && !userAskedAboutContact;

        console.log("User text:", text);
        console.log("User asked about projects:", userAskedAboutProjects);
        console.log("User asked about contact:", userAskedAboutContact);
        console.log("Should show projects:", shouldShowProjects);
        console.log("AI response:", data.result);
        console.log("Response includes trigger:", data.result.includes("CHECK_OUT_MY_PROJECTS"));

        // Check if response indicates to show projects OR user asked specifically about projects
        if (data.result.includes("CHECK_OUT_MY_PROJECTS") || shouldShowProjects) {
          // Keep the original response with trigger for project showcase detection
          // But show clean response to user
          const finalContent = data.result.includes("CHECK_OUT_MY_PROJECTS") 
            ? data.result 
            : data.result + " CHECK_OUT_MY_PROJECTS";
          
          console.log("Final content with trigger:", finalContent);
          
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
            return newMessages;
          });
          
          // Project showcase is now handled inline with the message
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
          return newMessages;
        });
      } finally {
        setLoading(false);
      }
    },
    [input, loading, messages]
  );

  // Focus input on mount and handle initial question
  useEffect(() => {
    inputRef.current?.focus();

    // If there's an initial question and it hasn't been sent yet
    if (initialQuestion && initialQuestion.trim() && initialQuestionSentRef.current !== initialQuestion) {
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
    setInput(suggestion);
    inputRef.current?.focus();
  };

  return (
    <div
      className={`flex flex-col h-full bg-gray-900 rounded-lg border border-gray-800 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">GA</span>
          </div>
          <div>
            <h3 className="font-semibold text-white">Gaseema's AI Assistant</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-xs text-gray-400">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-100"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">
                  {message.role === "assistant" && typingMessageIndex === index ? (
                    <TypingText 
                      text={message.content.replace('CHECK_OUT_MY_PROJECTS', '').trim()} 
                      onComplete={() => {
                        setTypingMessageIndex(null);
                        // Show projects after typing completes if this message has the trigger
                        if (message.content.includes("CHECK_OUT_MY_PROJECTS")) {
                          setShowProjectsAfterTyping(index);
                        }
                      }}
                    />
                  ) : (
                    message.content.replace('CHECK_OUT_MY_PROJECTS', '').trim()
                  )}
                </p>
                
                {/* Show ProjectShowcase inline when message contains the trigger AND typing is complete */}
                {(() => {
                  const shouldShow = message.role === "assistant" && 
                                   message.content.includes("CHECK_OUT_MY_PROJECTS") &&
                                   (typingMessageIndex !== index); // Only show if not currently typing this message
                  console.log("Message:", message.content);
                  console.log("Should show projects:", shouldShow);
                  console.log("Typing message index:", typingMessageIndex, "Current index:", index);
                  return shouldShow;
                })() && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 150,
                      damping: 20,
                      delay: 0.8,
                      duration: 0.8
                    }}
                    className="mt-4"
                  >
                    <ProjectShowcase />
                  </motion.div>
                )}
                
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading Animation */}
        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-gray-800 text-gray-100 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <span className="text-sm text-gray-400">Thinking...</span>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions - Always show with toggle */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-t border-gray-800 px-4 py-3"
      >
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-gray-400">Quick questions:</p>
          <button
            onClick={() => setShowSuggestions(!showSuggestions)}
            className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
          >
            {showSuggestions ? (
              <>
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Hide
              </>
            ) : (
              <>
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Show
              </>
            )}
          </button>
        </div>
        
        <AnimatePresence>
          {showSuggestions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSuggestionClick(question)}
                    className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-3 py-2 rounded-full transition-all duration-200 border border-gray-700 hover:border-blue-500"
                  >
                    {question}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Input Area */}
      <div className="border-t border-gray-800 p-4">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about Gaseema..."
            disabled={loading}
            className="flex-1 bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors disabled:cursor-not-allowed"
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
          </motion.button>
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-500">
            Press Enter to send, Shift+Enter for new line
          </span>
          <span className="text-xs text-gray-500">{input.length}/500</span>
        </div>
      </div>
    </div>
  );
}
