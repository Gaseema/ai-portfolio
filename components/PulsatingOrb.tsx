"use client";

interface PulsatingOrbProps {
  isActive?: boolean;
  isListening?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function PulsatingOrb({
  isActive = false,
  isListening = false,
  className = "",
  size = "md",
}: PulsatingOrbProps) {
  const sizeClasses = {
    sm: "w-10 h-10 text-sm",
    md: "w-16 h-16 text-2xl",
    lg: "w-32 h-32 text-5xl",
  };

  const baseClasses = `${sizeClasses[size]} rounded-full flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-blue-100 border border-white/50 shadow-lg transition-all duration-300`;

  // Determine animation state
  const getAnimationState = () => {
    if (isActive || isListening) {
      return "animate-pulse scale-110 shadow-2xl ring-4 ring-blue-400/30 ring-offset-2 ring-offset-transparent";
    }
    return "hover:scale-105";
  };

  return (
    <div className={`${baseClasses} ${getAnimationState()} ${className}`}>
      🤖
    </div>
  );
}
