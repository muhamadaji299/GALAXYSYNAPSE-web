import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import GalaxyBackground from '../components/GalaxyBackground';
const LandingPage = () => {
  const [showBanner, setShowBanner] = useState(true);
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      <Navbar />
      <GalaxyBackground />

      {/* Modern Black & White Alert Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-28 z-20 w-full max-w-lg"
          >
            <div className="mx-4 p-4 bg-black/60 backdrop-blur-3xl border border-white/10 rounded-2xl flex items-center justify-between gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group hover:border-white/20 transition-all relative">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white/5 rounded-xl border border-white/10 group-hover:bg-white/10 transition-colors">
                  <Sparkles className="w-5 h-5 text-white animate-pulse" />
                </div>
                <div className="text-left">
                  <h4 className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Mission Authorization</h4>
                  <p className="text-gray-500 text-[10px] md:text-xs font-medium">Access your galactic dashboard now.</p>
                </div>
              </div>

              <div className="flex items-center gap-2 pr-8">
                <a href="/login" className="px-4 py-2 bg-white text-black text-[10px] font-bold rounded-lg hover:scale-105 active:scale-95 transition-all">LOGIN</a>
                <a href="/register" className="px-4 py-2 bg-white/5 text-white text-[10px] font-bold rounded-lg border border-white/10 hover:bg-white/10 transition-all">JOIN</a>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowBanner(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl"
      >
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
          Learn About Galaxy.
        </h1>
        <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-xl mx-auto">
          The ultimate authentication experience for modern explorers.
          Built with precision, styled with elegance.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 text-xs text-gray-500 uppercase tracking-widest"
      >
        Powered by GalaxyAuth Engine
      </motion.div>
    </div>
  );
};

export default LandingPage;
