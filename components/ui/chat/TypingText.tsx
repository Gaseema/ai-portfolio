"use client";

import { useState, useEffect } from "react";

interface TypingTextProps {
  text: string;
  onComplete?: () => void;
}

export default function TypingText({ text, onComplete }: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      // Calculate delay to make entire text take 1.5 seconds
      const totalDuration = 1500; // 1.5 seconds in milliseconds
      const charDelay = totalDuration / text.length;

      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, charDelay);

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
