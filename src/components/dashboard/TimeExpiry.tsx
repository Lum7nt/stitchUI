import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { cn } from '../../lib/utils';

interface TimeExpiryProps {
  nextTick: string;
}

export const TimeExpiry = ({ nextTick }: TimeExpiryProps) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    // Mock progress calculation based on nextTick string (e.g., "02:45.32")
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev <= 0) return 100;
        return prev - 0.5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const isUrgent = progress < 20;

  return (
    <div className="flex flex-col gap-1.5 min-w-[120px]">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          <Clock size={10} className={cn(isUrgent ? "text-red-500" : "text-[#8e919e]")} />
          <span className="text-[9px] text-[#8e919e] font-black tracking-[0.2em] uppercase opacity-60">Next Tick</span>
        </div>
        <span className={cn(
          "text-xs font-mono font-bold",
          isUrgent ? "text-red-500" : "text-[#e3e1e9]"
        )}>
          {nextTick}
        </span>
      </div>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={false}
          animate={{ 
            width: `${progress}%`,
            backgroundColor: isUrgent ? "#ef4444" : "#00f2ff"
          }}
          className="h-full shadow-[0_0_8px_rgba(0,242,255,0.4)]"
        />
      </div>
      {isUrgent && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="text-[8px] text-red-500 font-black tracking-widest uppercase text-right"
        >
          Urgency High
        </motion.div>
      )}
    </div>
  );
};
