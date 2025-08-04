"use client";

import { motion } from "framer-motion";

interface HeaderProps {
  loading: boolean;
  totalStars: number;
  repoCount: number;
  onTalentClick: () => void;
  onInfoClick: () => void;
}

export default function Header({
  loading,
  totalStars,
  repoCount,
  onTalentClick,
  onInfoClick,
}: HeaderProps) {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 md:p-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Left side - Looking for talent */}
      <motion.button
        onClick={onTalentClick}
        className="bg-white hover:bg-gray-50 text-slate-700 hover:text-slate-900 px-2 py-1.5 md:px-4 md:py-2 rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 border border-slate-200 flex items-center gap-1 md:gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-xs md:text-sm">Looking for talent</span>
      </motion.button>

      {/* Right side - GitHub Stars + Info icon */}
      <div className="flex items-center gap-1.5 md:gap-3">
        {/* GitHub Stars Counter */}
        <motion.div
          className="bg-white hover:bg-gray-50 text-slate-700 px-2 py-1.5 md:px-4 md:py-2 rounded-full font-medium transition-all duration-200 shadow-lg border border-slate-200 flex items-center gap-1 md:gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <svg
            className="w-3 h-3 md:w-4 md:h-4 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {loading ? (
            <span className="text-xs md:text-sm">Loading...</span>
          ) : (
            <span className="text-xs md:text-sm font-semibold">
              <span className="hidden sm:inline">
                {totalStars} stars • {repoCount} repos
              </span>
              <span className="sm:hidden">{totalStars}⭐</span>
            </span>
          )}
        </motion.div>

        {/* Info icon */}
        <motion.button
          onClick={onInfoClick}
          className="bg-white hover:bg-gray-50 text-slate-700 hover:text-slate-900 p-1.5 md:p-2 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 border border-slate-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
}
