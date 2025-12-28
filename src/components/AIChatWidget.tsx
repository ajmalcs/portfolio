import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";

export const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button - Vibrant Orange/Coral accent */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-5 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 via-orange-400 to-amber-400 text-white shadow-2xl shadow-orange-500/40 flex items-center justify-center ${
          isOpen ? "hidden" : ""
        }`}
      >
        <Sparkles className="w-7 h-7" />

        {/* Animated ring pulse */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-orange-400"
          animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-orange-400"
          animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
        />

        {/* "Ask AI" label */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute right-full mr-3 bg-background border border-border px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap"
        >
          <span className="text-sm font-medium text-foreground">Ask AI</span>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-background border-r border-t border-border rotate-45" />
        </motion.div>
      </motion.button>

      {/* Floating Chat Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed z-50 right-5 bottom-[100px] w-[400px] max-w-[calc(100vw-40px)] h-[620px] rounded-2xl overflow-hidden flex flex-col"
            style={{
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)",
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-1 right-2 z-10 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>

            {/* Chatbase Iframe */}
            <iframe
              src="https://www.chatbase.co/chatbot-iframe/1f2U33TGuTtyJOnWBmR4o"
              width="100%"
              className="h-full"
              style={{ border: "none" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
