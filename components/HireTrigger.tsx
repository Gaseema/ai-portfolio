"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TalentModal from "./ui/modals/TalentModal";

export default function HireTrigger() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <motion.div
        className="flex flex-col gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <div className="text-2xl animate-bounce">📄</div>
          <div>
            <h3 className="font-semibold text-slate-800">View My Resume</h3>
            <p className="text-sm text-slate-600">Check out my full credentials and experience</p>
          </div>
        </div>
        
        <motion.button
          onClick={() => setShowModal(true)}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-lg">🚀</span>
          View Resume & Hire Me!
        </motion.button>
      </motion.div>

      <TalentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
