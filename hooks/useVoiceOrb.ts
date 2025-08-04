import { useState, useRef, useEffect, useCallback } from "react";

export interface UseVoiceOrbOptions {
  onInputFocus?: () => void;
  onInputBlur?: () => void;
  onQuestionSelect?: (question: string) => void;
  onInputSubmit?: (value: string) => void;
  enableKeyboardReaction?: boolean;
  disabled?: boolean;
}

export function useVoiceOrb({
  onInputFocus,
  onInputBlur,
  onQuestionSelect,
  onInputSubmit,
  enableKeyboardReaction = true,
  disabled = false,
}: UseVoiceOrbOptions = {}) {
  const [isOrbActive, setIsOrbActive] = useState(false);
  const [isOrbListening, setIsOrbListening] = useState(false);
  const [orbPulse, setOrbPulse] = useState(false);
  const orbRef = useRef<HTMLDivElement>(null);

  // Pulse animation for question selection
  const handleQuestionClick = useCallback(
    (question: string, delay: number = 600) => {
      if (disabled) return;

      setOrbPulse(true);
      setTimeout(() => {
        onQuestionSelect?.(question);
        setOrbPulse(false);
      }, delay);
    },
    [onQuestionSelect, disabled]
  );

  // Input submission with pulse animation
  const handleInputSubmit = useCallback(
    (inputElement: HTMLInputElement, delay: number = 800) => {
      if (disabled) return;

      const question = inputElement.value.trim();
      if (question) {
        setOrbPulse(true);
        setTimeout(() => {
          onInputSubmit?.(question);
          setOrbPulse(false);
        }, delay);
      }
    },
    [onInputSubmit, disabled]
  );

  // Focus handlers
  const handleInputFocus = useCallback(() => {
    if (disabled) return;

    setIsOrbListening(true);
    onInputFocus?.();
  }, [onInputFocus, disabled]);

  const handleInputBlur = useCallback(() => {
    if (disabled) return;

    setIsOrbListening(false);
    onInputBlur?.();
  }, [onInputBlur, disabled]);

  // Keyboard reaction effect
  useEffect(() => {
    if (!enableKeyboardReaction || disabled) return;

    const handleKeyPress = () => {
      setOrbPulse(true);
      if (orbRef.current) {
        orbRef.current.style.transform = "scale(1.2)";
        orbRef.current.style.boxShadow =
          "0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 0 30px rgba(59, 130, 246, 0.5)";
      }
      setTimeout(() => {
        setOrbPulse(false);
        if (orbRef.current) {
          orbRef.current.style.transform = "scale(1)";
          orbRef.current.style.boxShadow =
            "0 10px 25px -5px rgba(0, 0, 0, 0.15)";
        }
      }, 200);
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [enableKeyboardReaction, disabled]);

  // Method to manually trigger orb activation
  const activateOrb = useCallback(
    (duration: number = 2000) => {
      if (disabled) return;

      setIsOrbActive(true);
      setTimeout(() => setIsOrbActive(false), duration);
    },
    [disabled]
  );

  // Method to manually trigger pulse
  const pulseOrb = useCallback(
    (duration: number = 600) => {
      if (disabled) return;

      setOrbPulse(true);
      setTimeout(() => setOrbPulse(false), duration);
    },
    [disabled]
  );

  return {
    // State
    isOrbActive,
    isOrbListening,
    orbPulse,
    orbRef,

    // Setters for manual control
    setIsOrbActive,
    setIsOrbListening,
    setOrbPulse,

    // Handlers for common interactions
    handleQuestionClick,
    handleInputSubmit,
    handleInputFocus,
    handleInputBlur,

    // Manual trigger methods
    activateOrb,
    pulseOrb,
  };
}
