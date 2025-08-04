"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useGitHubStars } from "@/hooks/useGitHubStars";
import { TalentModal, InfoModal } from "@/components/ui/modals";
import { Header } from "@/components/layout";
import { HeroSection } from "@/components/sections";

export default function HomePage() {
  const [showTalentModal, setShowTalentModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [isOrbActive, setIsOrbActive] = useState(false);
  const [isOrbListening, setIsOrbListening] = useState(false);
  const [orbPulse, setOrbPulse] = useState(false);
  const orbRef = useRef<HTMLDivElement>(null);
  const { totalStars, repoCount, loading } = useGitHubStars();
  const router = useRouter();

  const handleQuestionClick = (question: string) => {
    setOrbPulse(true);
    setTimeout(() => {
      router.push(`/chat?q=${encodeURIComponent(question)}`);
      setOrbPulse(false);
    }, 600);
  };

  const handleInputSubmit = (inputElement: HTMLInputElement) => {
    const question = inputElement.value.trim();
    if (question) {
      setOrbPulse(true);
      setTimeout(() => {
        router.push(`/chat?q=${encodeURIComponent(question)}`);
        setOrbPulse(false);
      }, 800);
    }
  };

  // Add keyboard event listener for orb reaction
  useEffect(() => {
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
  }, []);

  return (
    <main
      className="min-h-screen text-slate-800 overflow-hidden font-inter relative"
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgb(253, 252, 251) 0%, rgb(226, 209, 195) 100%)",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-200/20 via-transparent to-orange-200/20"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#d97706_1px,transparent_1px),linear-gradient(to_bottom,#d97706_1px,transparent_1px)] bg-[size:60px_60px] opacity-[0.02]"></div>

      <div className="absolute top-20 left-20 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl z-10 animate-float-1" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl z-10 animate-float-2" />
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-yellow-200/20 rounded-full blur-2xl animate-float-3" />

      <div className="flex flex-col items-center justify-center min-h-screen px-4 relative z-10">
        <Header
          loading={loading}
          totalStars={totalStars}
          repoCount={repoCount}
          onTalentClick={() => setShowTalentModal(true)}
          onInfoClick={() => setShowInfoModal(true)}
        />

        <HeroSection
          isOrbActive={isOrbActive}
          isOrbListening={isOrbListening}
          onQuestionClick={handleQuestionClick}
          onInputSubmit={handleInputSubmit}
          onOrbClick={() => {
            const input = document.querySelector("input") as HTMLInputElement;
            if (input) {
              input.focus();
            }
          }}
        />
      </div>

      <TalentModal
        isOpen={showTalentModal}
        onClose={() => setShowTalentModal(false)}
      />

      <InfoModal
        isOpen={showInfoModal}
        onClose={() => setShowInfoModal(false)}
      />
    </main>
  );
}
