"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface GlobeBackgroundProps {
  className?: string;
}

export default function GlobeBackground({
  className = "",
}: GlobeBackgroundProps) {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!vantaEffect) {
      // Dynamic import to avoid SSR issues
      import("vanta/dist/vanta.globe.min")
        .then((VantaGlobe) => {
          if (vantaRef.current) {
            try {
              const effect = VantaGlobe.default({
                el: vantaRef.current,
                THREE: THREE,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.0,
                minWidth: 200.0,
                scale: 1.0,
                scaleMobile: 0.8,
                color: 0x000000, // Black
                color2: 0x333333, // Dark gray
                backgroundColor: 0xf8f9fa, // Light background color for the globe
                size: 0.8,
                spacing: 20.0,
              });
              setVantaEffect(effect);
              setIsLoaded(true);
            } catch (error) {
              console.error("Error initializing Vanta Globe:", error);
            }
          }
        })
        .catch((error) => {
          console.error("Error loading Vanta Globe:", error);
        });
    }

    return () => {
      if (vantaEffect) {
        try {
          vantaEffect.destroy();
        } catch (error) {
          console.error("Error destroying Vanta effect:", error);
        }
      }
    };
  }, [vantaEffect]);

  useEffect(() => {
    return () => {
      if (vantaEffect) {
        try {
          vantaEffect.destroy();
        } catch (error) {
          console.error("Error destroying Vanta effect on unmount:", error);
        }
      }
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{
        zIndex: 1,
        pointerEvents: "none",
        opacity: isLoaded ? 1 : 0, // Full opacity since it's now the main background
        transition: "opacity 2s ease-in-out",
      }}
    />
  );
}
