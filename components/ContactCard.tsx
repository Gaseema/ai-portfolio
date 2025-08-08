"use client";

import { motion } from "framer-motion";

export default function ContactCard() {
  const contactMethods = [
    {
      icon: "📧",
      label: "Email",
      value: "gaseema.n@gmail.com",
      href: "mailto:gaseema.n@gmail.com",
      description: "Best for project inquiries",
    },
    {
      icon: "💼",
      label: "LinkedIn",
      value: "linkedin.com/in/gaseema-ndung-u",
      href: "https://www.linkedin.com/in/gaseema-ndung-u-b99502b6/",
      description: "Professional networking",
    },
    {
      icon: "🌐",
      label: "Website",
      value: "gaseema.xyz",
      href: "http://gaseema.xyz/",
      description: "Visit my portfolio",
    },
    {
      icon: "💬",
      label: "WhatsApp",
      value: "+254 721 882 694",
      href: "https://wa.me/254721882694",
      description: "Quick chat & calls",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-2xl p-6 border border-blue-200/50 shadow-lg"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg"
        >
          <span className="text-2xl text-white">👋</span>
        </motion.div>
        <h3 className="text-lg font-bold text-slate-800 mb-1">
          Let's Connect!
        </h3>
        <p className="text-sm text-slate-600">
          Ready to build something amazing together?
        </p>
      </div>

      {/* Contact Methods */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {contactMethods.map((contact, index) => (
          <motion.a
            key={contact.label}
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-xl p-4 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl group-hover:scale-110 transition-transform duration-200">
                {contact.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">
                  {contact.label}
                </div>
                <div className="text-xs text-blue-600 hover:text-blue-800 truncate font-medium underline decoration-transparent group-hover:decoration-blue-600 transition-all">
                  {contact.value}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {contact.description}
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-4 shadow-lg">
          <div className="font-semibold text-sm mb-1">
            🚀 Open to Opportunities
          </div>
          <div className="text-xs opacity-90">
            Fintech • Mobile Apps • Flutter • React • Full-stack Development
          </div>
        </div>
      </motion.div>

      {/* Response Time */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex items-center justify-center gap-2 mt-4 text-xs text-slate-500"
      >
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span>Usually responds within 24 hours</span>
      </motion.div>
    </motion.div>
  );
}
