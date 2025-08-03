// Smooth animation configurations
export const smoothSpring = {
  type: "spring" as const,
  stiffness: 120,
  damping: 20,
  mass: 0.8,
};

export const fastSpring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 25,
  mass: 0.5,
};

export const gentleSpring = {
  type: "spring" as const,
  stiffness: 80,
  damping: 15,
  mass: 1,
};

export const bounceSpring = {
  type: "spring" as const,
  stiffness: 400,
  damping: 10,
  mass: 0.3,
};

// Legacy animations (updated for smoothness)
export const openSpring = {
  type: "spring" as const,
  stiffness: 150,
  damping: 20,
  mass: 0.8,
};

export const closeSpring = {
  type: "spring" as const,
  stiffness: 200,
  damping: 25,
  mass: 0.6,
};

export const cardSpring = {
  type: "spring" as const,
  stiffness: 180,
  damping: 22,
  mass: 0.7,
};

export const expandSpring = {
  type: "spring" as const,
  stiffness: 140,
  damping: 18,
  mass: 0.9,
};

// Easing functions for smooth transitions
export const smoothEase = [0.4, 0, 0.2, 1];
export const bouncyEase = [0.68, -0.55, 0.265, 1.55];
export const snappyEase = [0.25, 0.46, 0.45, 0.94];
