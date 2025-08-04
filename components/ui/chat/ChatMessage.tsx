"use client";

import { forwardRef } from "react";
import TypingText from "./TypingText";
import ProjectShowcase from "../../ProjectShowcase";
import ContactCard from "../../ContactCard";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
  index: number;
  typingMessageIndex: number | null;
  onTypingComplete: () => void;
  onProjectTrigger: (index: number) => void;
}

const ChatMessage = forwardRef<HTMLDivElement, ChatMessageProps>(
  (
    { message, index, typingMessageIndex, onTypingComplete, onProjectTrigger },
    ref
  ) => {
    const isTyping = typingMessageIndex === index;
    const isUser = message.role === "user";
    const hasProjectTrigger = message.content.includes("CHECK_OUT_MY_PROJECTS");
    const hasContactTrigger = message.content.includes("SHOW_CONTACT_CARD");

    const cleanContent = message.content
      .replace("CHECK_OUT_MY_PROJECTS", "")
      .replace("SHOW_CONTACT_CARD", "")
      .trim();

    return (
      <div
        ref={ref}
        className={`flex animate-fadeInUp ${
          isUser ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`max-w-[85%] p-4 backdrop-blur-md border shadow-lg relative transition-all duration-300 hover:shadow-xl ${
            isUser
              ? "bg-blue-500 text-white border-blue-400 ml-auto shadow-blue-500/20 rounded-3xl rounded-br-lg"
              : "bg-slate-100 text-slate-800 border-slate-200 shadow-slate-200/50 rounded-3xl rounded-bl-lg"
          }`}
        >
          <p className="text-sm whitespace-pre-wrap">
            {message.role === "assistant" && isTyping ? (
              <TypingText
                text={cleanContent}
                onComplete={() => {
                  onTypingComplete();
                  // Show projects after typing completes if this message has the trigger
                  if (hasProjectTrigger) {
                    onProjectTrigger(index);
                  }
                }}
              />
            ) : (
              cleanContent
            )}
          </p>

          {/* Show ProjectShowcase inline when message contains the trigger AND typing is complete */}
          {hasProjectTrigger && !isTyping && (
            <div className="mt-4 animate-fadeIn">
              <ProjectShowcase />
            </div>
          )}

          {/* Show ContactCard inline when message contains the contact trigger AND typing is complete */}
          {hasContactTrigger && !isTyping && (
            <div className="mt-4 animate-fadeIn">
              <ContactCard />
            </div>
          )}

          <span
            className={`text-xs opacity-70 mt-1 block ${
              isUser ? "text-blue-100" : "text-slate-500"
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
    );
  }
);

ChatMessage.displayName = "ChatMessage";

export default ChatMessage;
