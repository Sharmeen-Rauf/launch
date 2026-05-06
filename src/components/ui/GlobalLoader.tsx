"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GlobalLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 120);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="global-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="fixed inset-0 z-[9999] bg-[#050508] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Ambient purple glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-electric/8 blur-[120px] pointer-events-none" />
          <div className="absolute top-1/4 right-1/4 w-[200px] h-[200px] rounded-full bg-purple-400/5 blur-[80px] pointer-events-none animate-float" />

          {/* Orbiting dots */}
          <div className="absolute w-40 h-40 flex items-center justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-electric"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 2 + i * 0.8,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.3,
                }}
                style={{
                  translateX: `${40 + i * 14}px`,
                  opacity: 0.4 + i * 0.2,
                  boxShadow: "0 0 8px rgba(139,97,194,0.9)",
                }}
              />
            ))}
          </div>

          <div className="flex flex-col items-center relative z-10">
            {/* Logo spinner */}
            <div className="w-20 h-20 relative flex items-center justify-center">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                className="absolute inset-0 border-2 border-electric rounded-tl-2xl rounded-br-2xl"
                style={{ boxShadow: "0 0 20px rgba(139,97,194,0.7)" }}
              />
              <motion.span
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                className="absolute inset-2 border border-electric/30 rounded-tl-xl rounded-br-xl"
              />
              <span className="relative z-10 text-electric font-black text-3xl">B</span>
            </div>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-7 flex flex-col items-center"
            >
              <div className="text-white text-sm font-black tracking-[0.4em] uppercase">
                CODE <span className="text-electric">BRECK</span>
              </div>
              <div className="text-white/30 text-xs tracking-widest mt-1.5 uppercase">
                Initializing Environment
              </div>
            </motion.div>

            {/* Progress bar */}
            <div className="w-40 h-[2px] bg-white/8 mt-8 rounded-full overflow-hidden relative">
              <motion.div
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: "easeOut", duration: 0.2 }}
                className="h-full bg-electric rounded-full"
                style={{ boxShadow: "0 0 12px rgba(139,97,194,1)" }}
              />
            </div>
            <div className="text-white/20 text-[10px] mt-2 font-mono">
              {Math.round(Math.min(progress, 100))}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
