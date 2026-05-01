import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { FettiLogo } from './FettiLogo';

interface EntryGateProps {
  onEnter: () => void;
}

export default function EntryGate({ onEnter }: EntryGateProps) {
  return (
    <div className="fixed inset-0 bg-[#1a0f0a] z-50 flex items-center justify-center p-6 overflow-hidden">
      {/* Background Luxury Gradient */}
      <motion.div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_rgba(197,160,89,0.08)_0%,_transparent_50%)]" 
        />
        <div className="absolute inset-0 bg-[#1a0f0a]/40 backdrop-blur-[100px]" />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-md w-full text-center space-y-3 relative z-10"
      >
        <div className="space-y-8 mt-12 pb-12 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
            className="w-20 h-20 text-[#c5a059]"
          >
            <FettiLogo />
          </motion.div>

          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-7xl md:text-8xl font-black tracking-tighter text-[#c5a059] leading-none"
            >
              FETTI
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              animate={{ opacity: 0.5, letterSpacing: '0.4em' }}
              transition={{ delay: 0.5, duration: 1.5 }}
              className="text-xs uppercase text-[#d4b9a8] font-bold"
            >
              Nightlife made perfect
            </motion.div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onEnter}
          className="group relative inline-flex items-center justify-center w-full py-4 bg-transparent border border-[#c5a059]/20 hover:border-[#c5a059]/60 transition-colors text-[#c5a059] overflow-hidden mt-32"
        >
          <span className="text-sm uppercase tracking-widest font-bold">Reserve Now</span>
          <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </motion.div>
    </div>
  );
}
