"use client";

import { motion } from "framer-motion";

const technologies = {
  "Frontend": {
    icon: "🎨",
    color: "from-blue-500 to-purple-600",
    items: ["Flutter", "React.js", "Next.js", "TypeScript", "Dart", "HTML5/CSS3", "Tailwind CSS"]
  },
  "Backend": {
    icon: "⚡",
    color: "from-green-500 to-emerald-600",
    items: ["Node.js", "Express.js", "Python", "PostgreSQL", "MongoDB", "Firebase", "REST APIs"]
  },
  "DevOps & Tools": {
    icon: "🛠️",
    color: "from-orange-500 to-red-600",
    items: ["Docker", "CI/CD", "GitHub Actions", "Codemagic", "Git", "AWS", "Linux"]
  },
  "Specializations": {
    icon: "🚀",
    color: "from-purple-500 to-pink-600",
    items: ["Fintech", "Crypto/Blockchain", "Mobile Development", "AI Integration", "Real-time Systems"]
  }
};

export default function TechStackShowcase() {
  return (
    <motion.div
      className="space-y-6 p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border border-slate-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-6">
        <motion.h3 
          className="text-2xl font-bold text-slate-900 mb-2 flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span className="text-3xl">⚡</span>
          My Tech Stack
        </motion.h3>
        <motion.p 
          className="text-slate-600 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          6+ years of experience building scalable, secure applications
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(technologies).map(([category, data], categoryIndex) => (
          <motion.div
            key={category}
            className="space-y-3"
            initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + categoryIndex * 0.1 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{data.icon}</span>
              <h4 className="font-semibold text-slate-800 text-sm">{category}</h4>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {data.items.map((tech, index) => (
                <motion.span
                  key={tech}
                  className={`px-3 py-1.5 bg-gradient-to-r ${data.color} text-white text-xs font-medium rounded-full shadow-sm hover:shadow-md transition-all duration-300 cursor-default`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: 0.5 + categoryIndex * 0.1 + index * 0.05,
                    type: "spring",
                    stiffness: 300
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -2,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-6 p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <p className="text-sm font-medium">
          💡 <strong>Always learning:</strong> Staying current with the latest technologies and best practices
        </p>
      </motion.div>
    </motion.div>
  );
}
