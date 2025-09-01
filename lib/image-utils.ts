// Utility functions for image optimization

/**
 * Generate a simple blur data URL for image placeholders
 * This creates a tiny 1x1 pixel image that serves as a blur placeholder
 */
export function generateBlurDataURL(color = "#f1f5f9"): string {
  // Convert hex color to RGB
  const hex = color.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Create a simple 4x4 pixel blur placeholder
  const svg = `
    <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="4" height="4" fill="rgb(${r},${g},${b})"/>
    </svg>
  `;

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

/**
 * Generate category-specific blur colors
 */
export function getCategoryBlurColor(category: string): string {
  switch (category) {
    case "fintech":
      return "#dcfce7"; // green-100
    case "crypto":
      return "#fed7aa"; // orange-100
    case "personal":
      return "#dbeafe"; // blue-100
    case "social":
      return "#e9d5ff"; // purple-100
    default:
      return "#f1f5f9"; // slate-100
  }
}

/**
 * Optimize image sizes based on container
 */
export function getImageSizes(context: "card" | "modal" | "banner"): string {
  switch (context) {
    case "card":
      return "(max-width: 768px) 182px, 196px";
    case "modal":
      return "(max-width: 768px) 90vw, 550px";
    case "banner":
      return "(max-width: 768px) 100vw, 1200px";
    default:
      return "100vw";
  }
}
