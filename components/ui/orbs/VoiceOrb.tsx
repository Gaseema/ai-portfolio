"use client";

interface VoiceOrbProps {
  isActive?: boolean;
  isListening?: boolean;
  className?: string;
}

export default function VoiceOrb({ 
  isActive = false, 
  isListening = false, 
  className = "" 
}: VoiceOrbProps) {

  return (
    <div className={`voice-orb-container-3d ${className}`}>
      <div 
        className={`voice-orb-3d ${isActive ? 'active' : ''} ${isListening ? 'listening' : ''}`}
      >
        {/* Main 3D sphere */}
        <div className="orb-sphere">
          <div className="orb-inner-glow"></div>
          <div className="orb-surface"></div>
          <div className="orb-highlight"></div>
        </div>
        
        {/* Wavy border rings for active state */}
        {isActive && (
          <div className="wavy-border-rings">
            <div className="wavy-border-ring ring-1"></div>
            <div className="wavy-border-ring ring-2"></div>
            <div className="wavy-border-ring ring-3"></div>
          </div>
        )}
      </div>

      <style jsx>{`
        .voice-orb-container-3d {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 150px;
          height: 150px;
          perspective: 1000px;
          perspective-origin: center center;
        }

        .voice-orb-3d {
          position: relative;
          width: 120px;
          height: 120px;
          transform-style: preserve-3d;
          transition: transform 0.1s ease-out;
          cursor: pointer;
        }

        .orb-sphere {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          transform-style: preserve-3d;
          animation: orbRotate 20s linear infinite;
        }

        .orb-inner-glow {
          position: absolute;
          inset: 10px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, 
            rgba(102, 126, 234, 0.8) 0%,
            rgba(118, 75, 162, 0.6) 40%,
            rgba(64, 224, 208, 0.4) 70%,
            transparent 100%);
          animation: glowPulse 3s ease-in-out infinite;
          z-index: 1;
        }

        .orb-surface {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: linear-gradient(135deg, 
            #667eea 0%, 
            #764ba2 25%, 
            #667eea 50%, 
            #40e0d0 75%, 
            #667eea 100%);
          box-shadow: 
            0 0 30px rgba(102, 126, 234, 0.4),
            0 0 60px rgba(118, 75, 162, 0.3),
            inset 0 0 30px rgba(255, 255, 255, 0.1),
            inset 20px 20px 40px rgba(255, 255, 255, 0.05),
            inset -20px -20px 40px rgba(0, 0, 0, 0.1);
          animation: surfaceShimmer 4s ease-in-out infinite;
          z-index: 2;
        }

        .orb-highlight {
          position: absolute;
          top: 15px;
          left: 25px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: radial-gradient(circle at center,
            rgba(255, 255, 255, 0.8) 0%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 100%);
          filter: blur(2px);
          animation: highlightFloat 3s ease-in-out infinite;
          z-index: 3;
        }

        .particles {
          position: absolute;
          inset: -20px;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: linear-gradient(45deg, #40e0d0, #667eea);
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(64, 224, 208, 0.8);
          animation: particleOrbit 8s linear infinite;
          animation-delay: var(--delay);
          transform-origin: 80px 80px;
        }

        .frequency-visualizer {
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: end;
          gap: 3px;
          height: 30px;
          z-index: 4;
        }

        .freq-bar {
          width: 3px;
          background: linear-gradient(to top, 
            #fa709a 0%, 
            #fee140 50%, 
            #40e0d0 100%);
          border-radius: 2px;
          animation: freqBarDance 0.5s ease-in-out infinite alternate;
          animation-delay: var(--bar-delay);
          height: var(--bar-height);
          box-shadow: 0 0 5px rgba(250, 112, 154, 0.6);
        }

        .particles {
          position: absolute;
          inset: -20px;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: linear-gradient(45deg, #40e0d0, #667eea);
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(64, 224, 208, 0.8);
          animation: particleOrbit 8s linear infinite;
          animation-delay: var(--delay);
          transform-origin: 80px 80px;
        }

        .frequency-visualizer {
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: end;
          gap: 3px;
          height: 30px;
          z-index: 4;
        }

        .freq-bar {
          width: 3px;
          background: linear-gradient(to top, 
            #fa709a 0%, 
            #fee140 50%, 
            #40e0d0 100%);
          border-radius: 2px;
          animation: freqBarDance 0.5s ease-in-out infinite alternate;
          animation-delay: var(--bar-delay);
          height: var(--bar-height);
          box-shadow: 0 0 5px rgba(250, 112, 154, 0.6);
        }

        .wavy-border-rings {
          position: absolute;
          inset: -30px;
          pointer-events: none;
        }

        .wavy-border-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid transparent;
          animation: wavyBorder 3s ease-in-out infinite;
        }

        .ring-1 { 
          inset: 0;
          border-color: rgba(79, 172, 254, 0.4);
          animation-delay: 0s;
          filter: blur(0.5px);
          box-shadow: 
            0 0 10px rgba(79, 172, 254, 0.3),
            inset 0 0 10px rgba(79, 172, 254, 0.2);
        }
        
        .ring-2 { 
          inset: -15px;
          border-color: rgba(0, 242, 254, 0.3);
          animation-delay: 1s;
          filter: blur(1px);
          box-shadow: 
            0 0 15px rgba(0, 242, 254, 0.25),
            inset 0 0 15px rgba(0, 242, 254, 0.15);
        }
        
        .ring-3 { 
          inset: -30px;
          border-color: rgba(64, 224, 208, 0.25);
          animation-delay: 2s;
          filter: blur(1.5px);
          box-shadow: 
            0 0 20px rgba(64, 224, 208, 0.2),
            inset 0 0 20px rgba(64, 224, 208, 0.1);
        }

        /* Active state enhancements */
        .voice-orb-3d.active .orb-surface {
          background: linear-gradient(135deg, 
            #4facfe 0%, 
            #00f2fe 25%, 
            #4facfe 50%, 
            #40e0d0 75%, 
            #4facfe 100%);
          box-shadow: 
            0 0 30px rgba(79, 172, 254, 0.5),
            0 0 60px rgba(0, 242, 254, 0.3),
            0 0 90px rgba(64, 224, 208, 0.2),
            inset 0 0 30px rgba(255, 255, 255, 0.2),
            inset 20px 20px 40px rgba(255, 255, 255, 0.1),
            inset -20px -20px 40px rgba(0, 0, 0, 0.1);
          animation: surfaceShimmerActive 2s ease-in-out infinite;
        }

        .voice-orb-3d.active .orb-inner-glow {
          background: radial-gradient(circle at 30% 30%, 
            rgba(79, 172, 254, 0.8) 0%,
            rgba(0, 242, 254, 0.6) 40%,
            rgba(64, 224, 208, 0.4) 70%,
            transparent 100%);
          animation: glowPulseActive 2s ease-in-out infinite;
        }

        /* Listening state enhancements - just add glow */
        .voice-orb-3d.listening .orb-surface {
          box-shadow: 
            0 0 50px rgba(102, 126, 234, 0.8),
            0 0 100px rgba(118, 75, 162, 0.6),
            inset 0 0 30px rgba(255, 255, 255, 0.2),
            inset 20px 20px 40px rgba(255, 255, 255, 0.1),
            inset -20px -20px 40px rgba(0, 0, 0, 0.1);
        }

        .voice-orb-3d.listening .orb-inner-glow {
          animation: glowPulseListening 2s ease-in-out infinite;
        }

        /* Keyframe Animations */
        @keyframes orbRotate {
          from { transform: rotateZ(0deg); }
          to { transform: rotateZ(360deg); }
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }

        @keyframes glowPulseActive {
          0%, 100% { opacity: 0.6; transform: scale(1.1); }
          50% { opacity: 0.9; transform: scale(1.3); }
        }

        @keyframes glowPulseListening {
          0%, 100% { opacity: 0.7; transform: scale(1.1); }
          50% { opacity: 0.9; transform: scale(1.3); }
        }

        @keyframes surfaceShimmer {
          0%, 100% { filter: brightness(1) saturate(1); }
          50% { filter: brightness(1.2) saturate(1.3); }
        }

        @keyframes surfaceShimmerActive {
          0%, 100% { filter: brightness(1.2) saturate(1.2); }
          50% { filter: brightness(1.5) saturate(1.5); }
        }

        @keyframes highlightFloat {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.8; }
          50% { transform: translate(5px, -3px) scale(1.1); opacity: 1; }
        }

        @keyframes wavyBorder {
          0%, 100% { 
            border-radius: 50%;
            transform: scale(1) rotate(0deg);
            opacity: 0.8;
          }
          25% { 
            border-radius: 48% 52% 47% 53%;
            transform: scale(1.05) rotate(90deg);
            opacity: 0.6;
          }
          50% { 
            border-radius: 45% 55% 52% 48%;
            transform: scale(1.1) rotate(180deg);
            opacity: 0.4;
          }
          75% { 
            border-radius: 53% 47% 48% 52%;
            transform: scale(1.05) rotate(270deg);
            opacity: 0.6;
          }
        }

        @keyframes pulseWave3D {
          0% {
            transform: scale(1) rotateX(0deg) rotateY(0deg);
            opacity: 0.8;
          }
          100% {
            transform: scale(2.5) rotateX(180deg) rotateY(180deg);
            opacity: 0;
          }
        }

        /* Hover effects */
        .voice-orb-3d:hover {
          transform: rotateX(5deg) rotateY(5deg) scale(1.05);
        }

        .voice-orb-3d:hover .orb-surface {
          box-shadow: 
            0 0 50px rgba(102, 126, 234, 0.6),
            0 0 100px rgba(118, 75, 162, 0.4),
            inset 0 0 30px rgba(255, 255, 255, 0.2),
            inset 20px 20px 40px rgba(255, 255, 255, 0.1),
            inset -20px -20px 40px rgba(0, 0, 0, 0.1);
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .voice-orb-container-3d {
            width: 120px;
            height: 120px;
          }
          
          .voice-orb-3d {
            width: 100px;
            height: 100px;
          }
        }
      `}</style>
    </div>
  );
}
