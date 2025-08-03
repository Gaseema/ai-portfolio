"use client";

import { useEffect, useState } from "react";

interface AnimatedOrbProps {
  size?: "sm" | "md" | "lg";
  isActive?: boolean;
  className?: string;
}

export default function AnimatedOrb({
  size = "md",
  isActive = false,
  className = "",
}: AnimatedOrbProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const baseClasses = `${sizeClasses[size]} rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 border border-slate-200 ${className}`;

  const animationClasses = mounted
    ? `animate-spin transition-all duration-500 ${
        isActive
          ? "shadow-[0_0_30px_rgba(59,130,246,0.6),0_0_50px_rgba(147,51,234,0.8)] scale-105"
          : "shadow-[0_0_20px_rgba(59,130,246,0.4),0_0_40px_rgba(147,51,234,0.6)] hover:scale-110"
      }`
    : "";

  return (
    <div
      className={`${baseClasses} ${animationClasses}`}
      style={{
        animationDuration: isActive ? "10s" : "20s",
        animationTimingFunction: "linear",
        animationIterationCount: "infinite",
      }}
    />
  );
}
