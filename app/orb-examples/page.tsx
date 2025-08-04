"use client";

import { useState } from "react";
import SmartVoiceOrb from "@/components/SmartVoiceOrb";
import InteractiveVoiceOrb from "@/components/InteractiveVoiceOrb";
import { useVoiceOrb } from "@/hooks/useVoiceOrb";

export default function OrbExamplePage() {
  const [messages, setMessages] = useState<string[]>([]);

  // Example 1: Using SmartVoiceOrb (simplest approach)
  const handleQuestionSelect = (question: string) => {
    setMessages((prev) => [...prev, `Selected: ${question}`]);
  };

  const handleInputSubmit = (value: string) => {
    setMessages((prev) => [...prev, `Submitted: ${value}`]);
  };

  // Example 2: Using the hook directly for full control
  const {
    isOrbActive,
    isOrbListening,
    orbPulse,
    orbRef,
    handleQuestionClick,
    activateOrb,
    pulseOrb,
  } = useVoiceOrb({
    onQuestionSelect: (question) => {
      setMessages((prev) => [...prev, `Hook: ${question}`]);
    },
    onInputSubmit: (value) => {
      setMessages((prev) => [...prev, `Hook Input: ${value}`]);
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-800">
            Reusable Voice Orb Examples
          </h1>
          <p className="text-lg text-slate-600">
            Different ways to use the Interactive Voice Orb component
          </p>
        </div>

        {/* Messages Display */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Activity Log</h2>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {messages.length === 0 ? (
              <p className="text-slate-500 italic">No interactions yet...</p>
            ) : (
              messages.map((message, index) => (
                <div key={index} className="p-2 bg-slate-50 rounded-lg text-sm">
                  {message}
                </div>
              ))
            )}
          </div>
          <button
            onClick={() => setMessages([])}
            className="mt-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg text-sm transition-colors"
          >
            Clear Log
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Example 1: SmartVoiceOrb - Easiest to use */}
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center space-y-6">
            <h3 className="text-xl font-semibold text-slate-800">
              SmartVoiceOrb
            </h3>
            <p className="text-slate-600 text-sm">
              Complete orb with all features built-in. Just pass callbacks!
            </p>

            <SmartVoiceOrb
              size="medium"
              showFrequencyBars={true}
              showParticles={true}
              onQuestionSelect={handleQuestionSelect}
              onInputSubmit={handleInputSubmit}
              withMotion={true}
              motionProps={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5 },
              }}
            />

            <div className="space-y-2">
              <p className="text-xs text-slate-500">Features enabled:</p>
              <div className="flex flex-wrap gap-1 justify-center">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  Keyboard Reactive
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  Frequency Bars
                </span>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                  Particles
                </span>
                <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                  Motion
                </span>
              </div>
            </div>
          </div>

          {/* Example 2: Hook + InteractiveVoiceOrb - Full control */}
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center space-y-6">
            <h3 className="text-xl font-semibold text-slate-800">
              Hook + InteractiveVoiceOrb
            </h3>
            <p className="text-slate-600 text-sm">
              Use the hook for custom logic with the orb component
            </p>

            <InteractiveVoiceOrb
              ref={orbRef}
              isActive={isOrbActive}
              isListening={isOrbListening}
              isPulsing={orbPulse}
              size="medium"
              showFrequencyBars={isOrbListening}
              showParticles={isOrbActive}
              onClick={() => {
                const question = `Random question ${Math.floor(
                  Math.random() * 100
                )}`;
                handleQuestionClick(question);
              }}
            />

            <div className="space-y-2">
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => activateOrb(3000)}
                  className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs transition-colors"
                >
                  Activate
                </button>
                <button
                  onClick={() => pulseOrb()}
                  className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs transition-colors"
                >
                  Pulse
                </button>
              </div>
              <p className="text-xs text-slate-500">
                Custom controls for orb state
              </p>
            </div>
          </div>

          {/* Example 3: Different sizes and configurations */}
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center space-y-6">
            <h3 className="text-xl font-semibold text-slate-800">
              Size Variations
            </h3>
            <p className="text-slate-600 text-sm">
              Different sizes and configurations
            </p>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-500 mb-2">Small</p>
                <SmartVoiceOrb
                  size="small"
                  onQuestionSelect={handleQuestionSelect}
                  className="mx-auto"
                />
              </div>

              <div>
                <p className="text-xs text-slate-500 mb-2">Medium (Active)</p>
                <InteractiveVoiceOrb
                  size="medium"
                  isActive={true}
                  showParticles={true}
                  onClick={() =>
                    setMessages((prev) => [...prev, "Medium orb clicked!"])
                  }
                />
              </div>

              <div>
                <p className="text-xs text-slate-500 mb-2">Large (Listening)</p>
                <InteractiveVoiceOrb
                  size="large"
                  isListening={true}
                  showFrequencyBars={true}
                  onClick={() =>
                    setMessages((prev) => [...prev, "Large orb clicked!"])
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-xl font-semibold mb-6">Usage Examples</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-slate-800 mb-3">
                SmartVoiceOrb (Recommended)
              </h4>
              <pre className="bg-slate-100 p-4 rounded-lg text-xs overflow-x-auto">
                {`<SmartVoiceOrb
  size="medium"
  showFrequencyBars={true}
  showParticles={true}
  onQuestionSelect={(q) => console.log(q)}
  onInputSubmit={(v) => console.log(v)}
  withMotion={true}
/>`}
              </pre>
            </div>

            <div>
              <h4 className="font-medium text-slate-800 mb-3">
                Hook + Component
              </h4>
              <pre className="bg-slate-100 p-4 rounded-lg text-xs overflow-x-auto">
                {`const orb = useVoiceOrb({
  onQuestionSelect: handleQuestion,
  onInputSubmit: handleInput,
});

<InteractiveVoiceOrb
  ref={orb.orbRef}
  isActive={orb.isOrbActive}
  isListening={orb.isOrbListening}
  isPulsing={orb.orbPulse}
  size="medium"
/>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
