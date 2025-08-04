"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import InteractiveVoiceOrb from "./InteractiveVoiceOrb";
import { useVoiceOrb, UseVoiceOrbOptions } from "@/hooks/useVoiceOrb";

interface SmartVoiceOrbProps extends UseVoiceOrbOptions {
  size?: "small" | "medium" | "large";
  className?: string;
  showFrequencyBars?: boolean;
  showParticles?: boolean;
  enableHover?: boolean;
  withMotion?: boolean;
  motionProps?: any;
  onClick?: () => void;
  activeByDefault?: boolean;
}

export default function SmartVoiceOrb({
  size = "medium",
  className = "",
  showFrequencyBars = false,
  showParticles = false,
  enableHover = true,
  withMotion = false,
  motionProps = {},
  onClick,
  activeByDefault = true,
  ...hookOptions
}: SmartVoiceOrbProps) {
  const {
    isOrbActive,
    isOrbListening,
    orbPulse,
    orbRef,
    handleInputFocus,
    setIsOrbActive,
  } = useVoiceOrb(hookOptions);

  // Set orb as active by default to show wavy borders and full animations
  useEffect(() => {
    if (activeByDefault) {
      setIsOrbActive(true);
    }
  }, [setIsOrbActive, activeByDefault]);

  const handleClick = () => {
    handleInputFocus();
    onClick?.();
  };

  const OrbComponent = (
    <InteractiveVoiceOrb
      ref={orbRef}
      isActive={isOrbActive}
      isListening={isOrbListening}
      isPulsing={orbPulse}
      size={size}
      className={className}
      showFrequencyBars={showFrequencyBars}
      showParticles={showParticles}
      enableHover={enableHover}
      onClick={handleClick}
      disabled={hookOptions.disabled}
    />
  );

  if (withMotion) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        {...motionProps}
      >
        {OrbComponent}
      </motion.div>
    );
  }

  return OrbComponent;
}
