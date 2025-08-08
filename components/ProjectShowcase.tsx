"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  openSpring,
  closeSpring,
  cardSpring,
  expandSpring,
} from "./animations";

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  achievements: string[];
  image: string;
  backgroundImage: string;
  screenshots?: string[];
  category: "fintech" | "crypto" | "enterprise" | "mobile";
  year: string;
  users?: string;
  impact?: string;
}

const projects: Project[] = [
  {
    id: "wizglobal",
    title: "WizGlobal Banking Apps",
    description:
      "Senior Mobile Developer for major banking clients including CIC Bank, OldMutual, Kuza, and Enwealth",
    tech: ["Flutter", "Firebase", "CI/CD", "Codemagic"],
    achievements: [
      "Boosted app downloads by 35%",
      "Reduced crashes by 30%",
      "Implemented Flutter flavors",
      "Setup automated CI/CD pipeline",
    ],
    image: "🏦",
    backgroundImage: "/projects/wizglobal/banner.png",
    screenshots: [
      "/projects/wizglobal/screenshot-01-dashboard.jpg",
      "/projects/wizglobal/screenshot-02-profile.jpg",
      "/projects/wizglobal/screenshot-03-features.webp"
    ],
    category: "fintech",
    year: "2023-Now",
    users: "50K+",
    impact: "+35% downloads",
  },
  {
    id: "bitlipa",
    title: "BitLipa Crypto Platform",
    description:
      "Tech Lead for crypto payment system handling millions in transactions",
    tech: ["Flutter", "Node.js", "MongoDB", "Crypto APIs"],
    achievements: [
      "Handled $1M+ in transactions",
      "Led development team",
      "Built secure payment systems",
      "Implemented crypto wallet features",
    ],
    image: "₿",
    backgroundImage: "/projects/bitlipa/banner.png",
    screenshots: [
      "/projects/bitlipa/screenshot-01-wallet.jpg",
      "/projects/bitlipa/screenshot-02-transactions.jpg",
      "/projects/bitlipa/screenshot-03-exchange.webp"
    ],
    category: "crypto",
    year: "2020-2021",
    users: "10K+",
    impact: "$1M+ transactions",
  },
  {
    id: "mash",
    title: "Mash Social App",
    description: "Improved UX and performance for social engagement platform",
    tech: ["Flutter", "Provider", "GitHub Actions"],
    achievements: [
      "Improved UX by 27%",
      "Setup CI/CD pipeline",
      "Implemented state management",
      "Enhanced app performance",
    ],
    image: "🚀",
    backgroundImage: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    category: "mobile",
    year: "2022",
    users: "25K+",
    impact: "+27% UX improvement",
  },
  {
    id: "bitsoko",
    title: "Bitsoko Mall Platform",
    description: "Beacon-based mall engagement platform for retail businesses",
    tech: ["React", "Node.js", "Beacon Technology", "MongoDB"],
    achievements: [
      "Built beacon integration",
      "Created mall engagement system",
      "Developed merchant dashboard",
      "Real-time location tracking",
    ],
    image: "🛍️",
    backgroundImage: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    category: "enterprise",
    year: "2017-2019",
    users: "5K+",
    impact: "Retail innovation",
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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
      case "mobile":
        return "bg-blue-100 text-blue-800";
      case "enterprise":
        return "bg-blue-100 text-blue-800";
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
      case "mobile":
        return "rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.1) 100%";
      case "enterprise":
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
          <span className="text-xs font-medium text-slate-700">4 Projects</span>
        </motion.div>
      </div>

      {/* Project Cards Container with Scrolling - Extra padding for hover effects */}
      <div className="relative">
        <motion.div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto py-4 px-2 scrollbar-animated scroll-smooth"
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
              className="min-w-[280px] max-w-[280px] flex-shrink-0"
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
                className="relative bg-white backdrop-blur-sm rounded-2xl cursor-pointer border border-slate-200/60 hover:border-slate-300/80 hover:shadow-xl transition-all duration-500 group overflow-hidden aspect-[9/16] w-64"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: project.backgroundImage.startsWith('/')
                      ? `url('${project.backgroundImage}')`
                      : project.backgroundImage
                  }}
                />

                {/* Black Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Content Container */}
                <div className="relative z-10 h-full flex flex-col p-6">
                  {/* Header: Icon & Category */}
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      className="text-4xl filter drop-shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {project.image}
                    </motion.div>
                    <motion.span
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border backdrop-blur-md bg-black/20 text-white border-white/30`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.15 }}
                    >
                      {project.category}
                    </motion.span>
                  </div>

                  {/* Project Title & Description */}
                  <div className="flex-grow">
                    <motion.h4
                      className="font-bold text-white text-lg mb-2 group-hover:text-gray-100 transition-colors duration-300 leading-tight drop-shadow-lg"
                      layout
                    >
                      {project.title}
                    </motion.h4>
                    <motion.p
                      className="text-sm text-gray-200 mb-4 line-clamp-2 leading-relaxed drop-shadow-md"
                      layout
                    >
                      {project.description}
                    </motion.p>
                  </div>

                  {/* Stats & CTA */}
                  <div className="mt-auto">
                    <motion.div
                      className="flex justify-between items-center text-xs mb-3"
                      layout
                    >
                      <span className="text-gray-200 font-medium bg-black/40 px-2 py-1 rounded-lg backdrop-blur-md border border-white/20">
                        {project.year}
                      </span>
                      {project.impact && (
                        <span className="text-white font-semibold bg-black/50 px-2 py-1 rounded-lg backdrop-blur-md border border-white/30">
                          {project.impact}
                        </span>
                      )}
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                      className="flex items-center gap-2 text-sm text-blue-300 font-semibold group-hover:text-blue-200 transition-colors duration-300 bg-black/40 px-3 py-2 rounded-xl backdrop-blur-md border border-white/20"
                      layout
                    >
                      <span>View Details</span>
                      <motion.svg
                        className="w-4 h-4"
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
                className="bg-white rounded-3xl max-w-6xl w-full modal-compact overflow-hidden border border-slate-200 relative shadow-2xl mx-auto"
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: "relative",
                  zIndex: 100000,
                  maxWidth: "min(95vw, 1200px)",
                  maxHeight: "min(85vh, 900px)",
                }}
              >
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedProject(null)}
                  transition={{ duration: 0.15 }}
                  className="absolute top-6 right-6 z-50 text-white hover:text-gray-200 bg-black/20 hover:bg-black/40 rounded-full p-3 transition-all duration-300 backdrop-blur-md border border-white/20"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>

                {/* Banner Section */}
                <div className="relative h-64 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: selectedProject.backgroundImage.startsWith('/')
                        ? `url('${selectedProject.backgroundImage}')`
                        : selectedProject.backgroundImage
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                  
                  {/* Project Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <motion.div
                        className="text-5xl filter drop-shadow-lg"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        {selectedProject.image}
                      </motion.div>
                      <div>
                        <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                          {selectedProject.title}
                        </h1>
                        <div className="flex items-center gap-4 text-white/90">
                          <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border border-white/30">
                            {selectedProject.category}
                          </span>
                          <span>{selectedProject.year}</span>
                          {selectedProject.users && <span>• {selectedProject.users} users</span>}
                          {selectedProject.impact && <span>• {selectedProject.impact}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="modal-content overflow-y-auto max-h-[calc(85vh-12rem)] scrollbar-custom" style={{ padding: "1.5rem" }}>
                  {/* Description */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-8"
                  >
                    <p className="text-lg text-slate-700 leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </motion.div>

                  {/* Tech Stack */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                  >
                    <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🛠️</span>
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.tech.map((tech, index) => (
                        <motion.span
                          key={tech}
                          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + index * 0.05 }}
                          whileHover={{ scale: 1.05, y: -2 }}
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
                    className="mb-8"
                  >
                    <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🎯</span>
                      Key Achievements
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedProject.achievements.map((achievement, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:border-green-300 hover:shadow-md transition-all duration-300"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          whileHover={{ scale: 1.02, x: 4 }}
                        >
                          <span className="text-green-600 text-lg font-bold mt-0.5">✓</span>
                          <span className="text-slate-700 font-medium">{achievement}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Screenshots Gallery */}
                  {selectedProject.screenshots && selectedProject.screenshots.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <span className="text-xl">📱</span>
                        Screenshots
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {selectedProject.screenshots.map((screenshot, index) => (
                          <motion.div
                            key={index}
                            className="relative group cursor-pointer rounded-lg overflow-hidden bg-slate-100 aspect-[9/16] border border-slate-200 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md"
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ 
                              delay: 0.7 + index * 0.05,
                              type: "spring",
                              stiffness: 300,
                              damping: 20
                            }}
                            whileHover={{ 
                              scale: 1.1, 
                              y: -8,
                              zIndex: 10,
                              transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <img
                              src={screenshot}
                              alt={`${selectedProject.title} screenshot ${index + 1}`}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute inset-0 ring-2 ring-blue-500/50 ring-opacity-0 group-hover:ring-opacity-100 transition-all duration-300 rounded-lg" />
                          </motion.div>
                        ))}
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
