"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { openSpring, closeSpring, cardSpring, expandSpring } from "./animations";

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  achievements: string[];
  image: string;
  category: "fintech" | "crypto" | "enterprise" | "mobile";
  year: string;
  users?: string;
  impact?: string;
}

const projects: Project[] = [
  {
    id: "wizglobal",
    title: "WizGlobal Banking Apps",
    description: "Senior Mobile Developer for major banking clients including CIC Bank, OldMutual, Kuza, and Enwealth",
    tech: ["Flutter", "Firebase", "CI/CD", "Codemagic"],
    achievements: [
      "Boosted app downloads by 35%",
      "Reduced crashes by 30%",
      "Implemented Flutter flavors",
      "Setup automated CI/CD pipeline"
    ],
    image: "🏦",
    category: "fintech",
    year: "2023-Now",
    users: "50K+",
    impact: "+35% downloads"
  },
  {
    id: "bitlipa",
    title: "BitLipa Crypto Platform",
    description: "Tech Lead for crypto payment system handling millions in transactions",
    tech: ["Flutter", "Node.js", "MongoDB", "Crypto APIs"],
    achievements: [
      "Handled $1M+ in transactions",
      "Led development team",
      "Built secure payment systems",
      "Implemented crypto wallet features"
    ],
    image: "₿",
    category: "crypto",
    year: "2020-2021",
    users: "10K+",
    impact: "$1M+ transactions"
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
      "Enhanced app performance"
    ],
    image: "🚀",
    category: "mobile",
    year: "2022",
    users: "25K+",
    impact: "+27% UX improvement"
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
      "Real-time location tracking"
    ],
    image: "🛍️",
    category: "enterprise",
    year: "2017-2019",
    users: "5K+",
    impact: "Retail innovation"
  }
];

interface ProjectShowcaseProps {
  // No props needed for inline display
}

export default function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 25,
        mass: 0.8,
        duration: 0.8
      }
    }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 100
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
        mass: 0.8
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 100,
      transition: {
        duration: 0.2
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const getCategoryColor = (category: Project["category"]) => {
    switch (category) {
      case "fintech": return "bg-green-500";
      case "crypto": return "bg-orange-500";
      case "mobile": return "bg-blue-500";
      case "enterprise": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="w-full max-w-[80%] bg-gray-800 rounded-lg p-4 border border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-md font-bold text-white">My Featured Projects</h3>
          <p className="text-xs text-gray-400">Apps serving 100K+ users & handling millions in transactions</p>
        </div>
      </div>

      {/* Project Cards - Horizontal Scroll */}
      <motion.div 
        className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            variants={cardVariants}
            className="min-w-[220px] flex-shrink-0"
          >
            {/* Project Card */}
            <motion.div
              whileHover={{ 
                scale: 1.05,
                y: -4,
                boxShadow: "0 12px 30px rgba(0,0,0,0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedProject(project)}
              transition={cardSpring}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-4 cursor-pointer border border-gray-600 hover:border-blue-400 transition-colors duration-300 group"
            >
              {/* Project Icon & Category */}
              <div className="flex items-center justify-between mb-3">
                <motion.div 
                  className="text-2xl"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={cardSpring}
                >
                  {project.image}
                </motion.div>
                <motion.span 
                  className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(project.category)}`}
                  whileHover={{ scale: 1.05 }}
                  transition={cardSpring}
                >
                  {project.category}
                </motion.span>
              </div>

              {/* Project Info */}
              <motion.h4 
                className="font-bold text-white text-sm mb-2 group-hover:text-blue-300 transition-colors"
                layout
              >
                {project.title}
              </motion.h4>
              <motion.p 
                className="text-xs text-gray-400 mb-3 line-clamp-2"
                layout
              >
                {project.description}
              </motion.p>

              {/* Quick Stats */}
              <motion.div 
                className="flex justify-between text-xs mb-2"
                layout
              >
                <span className="text-gray-500">{project.year}</span>
                <span className="text-green-400 font-medium">{project.users}</span>
              </motion.div>

              {/* Impact Badge */}
              <motion.div 
                className="text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded text-center"
                whileHover={{ backgroundColor: "rgb(30 58 138)" }}
                transition={cardSpring}
                layout
              >
                {project.impact}
              </motion.div>

              {/* Expand hint */}
                            <motion.p 
                className="text-xs text-blue-400 mt-2 font-medium"
                layout
              >
                Click for details
              </motion.p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-600 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-full p-2 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              {/* Project Header */}
              <div className="flex items-start gap-4 mb-6">
                <motion.div 
                  className="text-4xl"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {selectedProject.image}
                </motion.div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-white">{selectedProject.title}</h2>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getCategoryColor(selectedProject.category)}`}>
                      {selectedProject.category}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-3">{selectedProject.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>{selectedProject.year}</span>
                    {selectedProject.users && <span>• {selectedProject.users} users</span>}
                    {selectedProject.impact && <span>• {selectedProject.impact}</span>}
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-lg font-semibold text-white mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((tech, index) => (
                    <motion.span 
                      key={tech} 
                      className="px-3 py-2 bg-gray-800 text-gray-300 rounded-lg text-sm border border-gray-700 hover:border-blue-400 transition-colors"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + (index * 0.05) }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Achievements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-lg font-semibold text-white mb-3">Key Achievements</h3>
                <div className="space-y-3">
                  {selectedProject.achievements.map((achievement, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg border border-gray-700"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + (index * 0.1) }}
                      whileHover={{ scale: 1.02, borderColor: "rgb(59 130 246)" }}
                    >
                      <span className="text-green-400 mt-1">✓</span>
                      <span className="text-gray-300 text-sm">{achievement}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Additional Info */}
      <div className="mt-4 text-xs text-gray-500 text-center">
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
