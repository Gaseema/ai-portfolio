"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

// Modal for viewing achievement screenshots
type AchievementModalProps = {
  open: boolean;
  onClose: () => void;
  screenshots?: string[];
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  title: string;
};

function AchievementModal({
  open,
  onClose,
  screenshots,
  index,
  setIndex,
  title,
}: AchievementModalProps) {
  if (!open || !screenshots || screenshots.length === 0) return null;
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-xs sm:max-w-md md:max-w-lg w-full p-2 sm:p-4 flex flex-col items-center">
        <button
          className="absolute top-2 right-2 bg-black/10 hover:bg-black/20 rounded-full p-1.5 text-slate-700"
          onClick={onClose}
          aria-label="Close"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex items-center gap-2 mb-2">
          <button
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 disabled:opacity-40"
            onClick={() => setIndex((i) => Math.max(i - 1, 0))}
            disabled={index === 0}
            aria-label="Previous"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <span className="text-xs text-slate-500">{title}</span>
          <button
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 disabled:opacity-40"
            onClick={() =>
              setIndex((i) => Math.min(i + 1, screenshots.length - 1))
            }
            disabled={index === screenshots.length - 1}
            aria-label="Next"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        <img
          src={screenshots[index]}
          alt={title + " screenshot"}
          className="rounded-xl max-h-[60vh] w-auto object-contain border border-slate-200 shadow"
        />
      </div>
    </div>
  );
}

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  achievements: string[];
  image: string;
  backgroundImage: string;
  screenshots?: string[];
  category: "fintech" | "crypto" | "personal" | "social";
  year: string;
  users?: string;
  impact?: string;
}

const projects: Project[] = [
  // Personal Apps Category
  {
    id: "agentbay",
    title: "AgentBay",
    description:
      "AI-powered real estate platform connecting agents with clients through intelligent matching",
    tech: [
      "Flutter",
      "AI/ML",
      "Firebase",
      "Google Maps API",
      "Push Notifications",
    ],
    achievements: [
      "Built AI property matching algorithm",
      "Integrated real-time chat system",
      "Implemented geolocation features",
      "Achieved 95% user satisfaction",
    ],
    image: "🏠",
    backgroundImage: "/projects/agentbay/banner.png",
    screenshots: [
      "/projects/agentbay/screenshot-01.png",
      "/projects/agentbay/screenshot-02.png",
      "/projects/agentbay/screenshot-03.png",
    ],
    category: "personal",
    year: "2024",
    users: "5K+",
    impact: "95% satisfaction",
  },
  {
    id: "kuza",
    title: "Kuza Banking App",
    description:
      "Digital investment solution with modern UI/UX and comprehensive financial services",
    tech: ["Flutter", "Node.js", "PostgreSQL", "Firebase"],
    achievements: [
      "Reduced transaction time by 60%",
      "Implemented smart notifications",
      "Built cross-platform compatibility",
      "Enhanced security protocols",
    ],
    image: "💳",
    backgroundImage: "/projects/kuza/banner.png",
    screenshots: [
      "/projects/kuza/screenshot-01-wallet.jpg",
      "/projects/kuza/screenshot-02-transactions.jpg",
      "/projects/kuza/screenshot-03-exchange.webp",
    ],
    category: "fintech",
    year: "2023",
    users: "15K+",
    impact: "60% faster transactions",
  },
  {
    id: "mvest",
    title: "Mvest Investment",
    description:
      "Personal investment tracking app with portfolio analytics and market insights",
    tech: [
      "Flutter",
      "Firebase",
      "Chart.js",
      "Market APIs",
      "Push Notifications",
    ],
    achievements: [
      "Built comprehensive portfolio tracker",
      "Integrated multiple market data sources",
      "Created custom analytics dashboard",
      "Implemented smart investment alerts",
    ],
    image: "💰",
    backgroundImage: "/projects/mvest/banner.png",
    screenshots: [
      "/projects/mvest/screenshot-01-wallet.jpg",
      "/projects/mvest/screenshot-02-transactions.jpg",
      "/projects/mvest/screenshot-03-exchange.webp",
    ],
    category: "personal",
    year: "2023-2024",
    users: "3K+",
    impact: "Smart alerts system",
  },

  // Fintech Apps Category
  {
    id: "oldmutual",
    title: "OldMutual Mobile App",
    description:
      "Premium banking and investment app for OldMutual clients with advanced portfolio management",
    tech: ["Flutter", "Firebase", "CI/CD", "Codemagic", "REST APIs"],
    achievements: [
      "Implemented secure biometric authentication",
      "Built real-time portfolio tracking",
      "Optimized app performance by 40%",
      "Integrated with core banking systems",
    ],
    image: "🏦",
    backgroundImage: "/projects/oldmutual/banner.png",
    screenshots: [
      "/projects/oldmutual/screenshot-01-dashboard.jpg",
      "/projects/oldmutual/screenshot-02-profile.jpg",
      "/projects/oldmutual/screenshot-03-features.webp",
    ],
    category: "fintech",
    year: "2023-2024",
    users: "25K+",
    impact: "40% performance boost",
  },

  {
    id: "lofty-corban",
    title: "Lofty Corban Investment",
    description:
      "Investment management platform with portfolio analytics and trading capabilities",
    tech: ["Flutter", "Firebase", "Real-time APIs", "Chart.js"],
    achievements: [
      "Built advanced analytics dashboard",
      "Implemented real-time market data",
      "Created portfolio optimization tools",
      "Achieved 99.8% uptime",
    ],
    image: "📈",
    backgroundImage: "/projects/lofty-corban/banner.png",
    screenshots: [
      "/projects/lofty-corban/screenshot-01-dashboard.jpg",
      "/projects/lofty-corban/screenshot-02-profile.jpg",
      "/projects/lofty-corban/screenshot-03-features.webp",
    ],
    category: "fintech",
    year: "2024",
    users: "8K+",
    impact: "99.8% uptime",
  },
];

interface ProjectShowcaseProps {
  // No props needed for inline display
}

// Portal Modal Component for full-screen modal rendering
function PortalModal({
  children,
  isOpen,
}: {
  children: React.ReactNode;
  isOpen: boolean;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted || !isOpen) return null;

  return createPortal(children, document.body);
}

export default function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [achievementModalOpen, setAchievementModalOpen] = useState(false);
  const [achievementModalIndex, setAchievementModalIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState<Set<string>>(new Set());

  // Preload images with priority for first few images
  useEffect(() => {
    const preloadImages = () => {
      projects.forEach((project, index) => {
        if (project.backgroundImage.startsWith("/")) {
          const img = document.createElement("img");

          // Add priority loading for first 3 images (likely visible in viewport)
          if (index < 3) {
            img.loading = "eager";
            img.fetchPriority = "high";
          }

          img.onload = () => {
            setImagesLoaded((prev) =>
              new Set(prev).add(project.backgroundImage)
            );
          };
          img.onerror = () => {
            console.warn(`Failed to preload image: ${project.backgroundImage}`);
          };
          img.src = project.backgroundImage;
        }

        // Also preload screenshots (lower priority)
        if (project.screenshots) {
          project.screenshots.forEach((screenshot) => {
            const img = document.createElement("img");
            img.loading = "lazy";
            img.src = screenshot;
          });
        }
      });
    };

    // Delay preloading slightly to not block initial render
    const timer = setTimeout(preloadImages, 100);
    return () => clearTimeout(timer);
  }, []);

  // Check scroll position
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      return () => container.removeEventListener("scroll", checkScrollPosition);
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.15,
        ease: [0.4, 0, 0.2, 1] as const, // easeOut
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.1,
        ease: [0.4, 0, 1, 1] as const, // easeIn
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.15 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.1 },
    },
  };

  const getCategoryColor = (category: Project["category"]) => {
    switch (category) {
      case "fintech":
        return "bg-green-100 text-green-800";
      case "crypto":
        return "bg-orange-100 text-orange-800";
      case "personal":
        return "bg-blue-100 text-blue-800";
      case "social":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getCategoryGradient = (category: Project["category"]) => {
    switch (category) {
      case "fintech":
        return "rgba(34, 197, 94, 0.2) 0%, rgba(22, 163, 74, 0.1) 100%";
      case "crypto":
        return "rgba(249, 115, 22, 0.2) 0%, rgba(234, 88, 12, 0.1) 100%";
      case "personal":
        return "rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.1) 100%";
      case "social":
        return "rgba(147, 51, 234, 0.2) 0%, rgba(126, 34, 206, 0.1) 100%";
      default:
        return "rgba(107, 114, 128, 0.2) 0%, rgba(75, 85, 99, 0.1) 100%";
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-slate-800 mb-1 tracking-tight">
            Featured Work
          </h3>
          <p className="text-sm text-slate-600 font-medium">
            Apps serving 100K+ users & handling millions in transactions
          </p>
        </div>

        <motion.div
          className="px-4 py-2 bg-slate-200/60 rounded-full border border-slate-300/60"
          whileHover={{ scale: 1.05, backgroundColor: "rgb(226 232 240)" }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <span className="text-xs font-medium text-slate-700">7 Projects</span>
        </motion.div>
      </div>

      {/* Project Cards Container with Scrolling - Extra padding for hover effects */}
      <div className="relative">
        <motion.div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto py-4 pl-4 pr-16 md:px-2 scrollbar-animated scroll-smooth"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onScroll={checkScrollPosition}
          style={{ marginBottom: "3rem", paddingBottom: "1rem" }} // Extra space for hover effects and shadows
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className="min-w-[182px] max-w-[182px] md:min-w-[196px] md:max-w-[196px] flex-shrink-0"
            >
              {/* Project Card with Background Image */}
              <motion.div
                whileHover={{
                  scale: 1.02,
                  y: -4,
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedProject(project)}
                transition={{ duration: 0.2 }}
                className="relative bg-white backdrop-blur-sm rounded-2xl cursor-pointer border border-slate-200/60 hover:border-slate-300/80 hover:shadow-xl transition-all duration-500 group overflow-hidden aspect-[9/16] w-full"
              >
                {/* Background Image */}
                <div
                  className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500 group-hover:scale-105 ${
                    imagesLoaded.has(project.backgroundImage)
                      ? "opacity-100"
                      : "opacity-0 bg-gradient-to-br from-slate-100 to-slate-200"
                  }`}
                  style={{
                    backgroundImage: project.backgroundImage.startsWith("/")
                      ? `url('${project.backgroundImage}')`
                      : project.backgroundImage,
                  }}
                />

                {/* Loading skeleton for background image */}
                {!imagesLoaded.has(project.backgroundImage) && (
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 animate-pulse" />
                )}

                {/* Black Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Content Container */}
                <div className="relative z-10 h-full flex flex-col p-4">
                  {/* Header: Category only, logo hidden */}
                  <div className="flex items-center justify-end mb-3">
                    <motion.span
                      className="px-2 py-0.5 rounded-md text-[10px] font-semibold border backdrop-blur-md bg-white/10 text-white/60 border-white/20 tracking-wide uppercase"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.15 }}
                    >
                      {project.category}
                    </motion.span>
                  </div>

                  {/* Project Content - Restructured Layout */}
                  <div className="flex-grow flex flex-col">
                    {/* Spacer to push content to bottom */}
                    <div className="flex-grow"></div>

                    {/* App Name */}
                    <motion.h4
                      className="font-bold text-white text-base mb-1.5 group-hover:text-gray-100 transition-colors duration-300 leading-tight drop-shadow-lg"
                      layout
                    >
                      {project.title}
                    </motion.h4>

                    {/* Description - Right under title */}
                    <motion.p
                      className="text-xs text-gray-200 mb-1.5 line-clamp-2 leading-relaxed drop-shadow-md"
                      layout
                    >
                      {project.description}
                    </motion.p>

                    {/* Impact Metrics - Right below description */}
                    {project.impact && (
                      <motion.div className="mb-3" layout>
                        <span className="text-xs text-white font-semibold bg-black/50 px-1.5 py-0.5 rounded-md backdrop-blur-md border border-white/30">
                          {project.impact}
                        </span>
                      </motion.div>
                    )}
                  </div>

                  {/* CTA Button - At Bottom */}
                  <div className="mt-auto">
                    <motion.div
                      className="flex items-center justify-between text-xs font-semibold transition-colors duration-300 bg-white/90 hover:bg-white px-2.5 py-1.5 rounded-lg border border-white/30 text-slate-800"
                      layout
                    >
                      <span>View Details</span>
                      <motion.svg
                        className="w-3 h-3 ml-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.15 }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </motion.svg>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile gradient indicator to show more content */}
        <div
          className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white/80 to-transparent pointer-events-none md:hidden"
          style={{ marginBottom: "3rem" }}
        />

        {/* Navigation Arrows - Below the list */}
        <div className="flex justify-end gap-2 mt-4">
          <motion.button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`p-3 rounded-full border transition-all duration-300 backdrop-blur-md ${
              canScrollLeft
                ? "bg-white/90 hover:bg-white border-slate-300 text-slate-700 hover:text-slate-900 shadow-lg hover:shadow-xl"
                : "bg-slate-200/70 border-slate-200 text-slate-400 cursor-not-allowed"
            }`}
            whileHover={canScrollLeft ? { scale: 1.05, y: -2 } : {}}
            whileTap={canScrollLeft ? { scale: 0.95 } : {}}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </motion.button>
          <motion.button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`p-3 rounded-full border transition-all duration-300 backdrop-blur-md ${
              canScrollRight
                ? "bg-white/90 hover:bg-white border-slate-300 text-slate-700 hover:text-slate-900 shadow-lg hover:shadow-xl"
                : "bg-slate-200/70 border-slate-200 text-slate-400 cursor-not-allowed"
            }`}
            whileHover={canScrollRight ? { scale: 1.05, y: -2 } : {}}
            whileTap={canScrollRight ? { scale: 0.95 } : {}}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Portal Modal for full-screen positioning */}
      <PortalModal isOpen={!!selectedProject}>
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-[99999]"
              onClick={() => setSelectedProject(null)}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 99999,
              }}
            >
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white rounded-2xl w-full overflow-hidden border border-slate-200 relative shadow-xl mx-auto flex flex-col"
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: "relative",
                  zIndex: 100000,
                  maxWidth: "min(90vw, 550px)",
                  maxHeight: "min(85vh, 650px)",
                  height: "auto",
                }}
              >
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedProject(null)}
                  transition={{ duration: 0.15 }}
                  className="absolute top-2 right-2 md:top-3 md:right-3 z-50 text-white hover:text-gray-200 bg-black/20 hover:bg-black/40 rounded-full p-1.5 md:p-2 transition-all duration-300 backdrop-blur-md border border-white/20"
                >
                  <svg
                    className="w-3 h-3 md:w-4 md:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>

                {/* Banner Section */}
                <div className="relative h-32 md:h-40 overflow-hidden flex-shrink-0">
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage:
                        selectedProject.backgroundImage.startsWith("/")
                          ? `url('${selectedProject.backgroundImage}')`
                          : selectedProject.backgroundImage,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

                  {/* Project Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                    <div className="flex items-center gap-2 md:gap-3 mb-2">
                      <motion.div
                        className="text-2xl md:text-3xl filter drop-shadow-lg"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        {selectedProject.image}
                      </motion.div>
                      <div>
                        <h1 className="text-lg md:text-xl font-bold text-white mb-1 drop-shadow-lg">
                          {selectedProject.title}
                        </h1>
                        <div className="flex items-center gap-1 md:gap-2 text-white/90 text-xs md:text-sm">
                          <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs font-medium backdrop-blur-sm border border-white/30">
                            {selectedProject.category}
                          </span>
                          <span>{selectedProject.year}</span>
                          {selectedProject.users && (
                            <span>• {selectedProject.users} users</span>
                          )}
                          {selectedProject.impact && (
                            <span>• {selectedProject.impact}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-3 md:p-4 overflow-y-auto scrollbar-custom">
                  {/* Description */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-4"
                  >
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </motion.div>

                  {/* Tech Stack */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-4"
                  >
                    <h3 className="text-base font-semibold text-slate-900 mb-2 flex items-center gap-1.5">
                      <span className="text-lg">🛠️</span>
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((tech, index) => (
                        <motion.span
                          key={tech}
                          className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-xs font-medium shadow-md hover:shadow-lg transition-all duration-300"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + index * 0.05 }}
                          whileHover={{ scale: 1.05, y: -1 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Key Achievements */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-4"
                  >
                    <h3 className="text-base font-semibold text-slate-900 mb-2 flex items-center gap-1.5">
                      <span className="text-lg">🎯</span>
                      Key Achievements
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedProject.achievements.map(
                        (achievement, index) => (
                          <motion.button
                            key={index}
                            type="button"
                            className="flex items-start gap-2 p-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 hover:border-green-300 hover:shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            whileHover={{ scale: 1.01, x: 2 }}
                            onClick={() => {
                              if (
                                selectedProject.screenshots &&
                                selectedProject.screenshots[index]
                              ) {
                                setAchievementModalIndex(index);
                                setAchievementModalOpen(true);
                              }
                            }}
                            disabled={
                              !(
                                selectedProject.screenshots &&
                                selectedProject.screenshots[index]
                              )
                            }
                            title={
                              selectedProject.screenshots &&
                              selectedProject.screenshots[index]
                                ? "View screenshot"
                                : "No screenshot available"
                            }
                          >
                            <span className="text-green-600 text-sm font-bold mt-0.5">
                              ✓
                            </span>
                            <span className="text-slate-700 font-medium text-sm">
                              {achievement}
                            </span>
                            {selectedProject.screenshots &&
                              selectedProject.screenshots[index] && (
                                <svg
                                  className="ml-auto w-4 h-4 text-green-400 opacity-70"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 10l4.553 2.276A2 2 0 0121 14.118V17a2 2 0 01-2 2H5a2 2 0 01-2-2v-2.882a2 2 0 01.447-1.842L8 10"
                                  />
                                </svg>
                              )}
                          </motion.button>
                        )
                      )}
                    </div>
                  </motion.div>

                  {/* Achievement Screenshot Modal */}
                  {achievementModalOpen && (
                    <AchievementModal
                      open={achievementModalOpen}
                      onClose={() => setAchievementModalOpen(false)}
                      screenshots={selectedProject.screenshots}
                      index={achievementModalIndex}
                      setIndex={setAchievementModalIndex}
                      title={
                        selectedProject.achievements[achievementModalIndex]
                      }
                    />
                  )}

                  {/* Screenshots Gallery */}
                  {selectedProject.screenshots &&
                    selectedProject.screenshots.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <h3 className="text-base font-semibold text-slate-900 mb-2 flex items-center gap-1.5">
                          <span className="text-lg">📱</span>
                          Screenshots
                        </h3>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
                          {selectedProject.screenshots.map(
                            (screenshot, index) => (
                              <motion.div
                                key={index}
                                className="relative group cursor-pointer rounded-md overflow-hidden bg-slate-100 aspect-[9/16] border border-slate-200 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md"
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{
                                  delay: 0.7 + index * 0.05,
                                  type: "spring",
                                  stiffness: 300,
                                  damping: 20,
                                }}
                                whileHover={{
                                  scale: 1.05,
                                  y: -4,
                                  zIndex: 10,
                                  transition: { duration: 0.2 },
                                }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <img
                                  src={screenshot}
                                  alt={`${selectedProject.title} screenshot ${
                                    index + 1
                                  }`}
                                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute inset-0 ring-2 ring-blue-500/50 ring-opacity-0 group-hover:ring-opacity-100 transition-all duration-300 rounded-lg" />
                              </motion.div>
                            )
                          )}
                        </div>
                      </motion.div>
                    )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </PortalModal>

      {/* Additional Info */}
      <div className="mt-4 text-xs text-slate-600 text-center">
        💼 Currently open to new opportunities • 🌍 Available globally
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
