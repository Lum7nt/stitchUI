import React from 'react';
import { motion } from 'framer-motion';
import { Signal } from '../../types/trading';
import { cn } from '../../lib/utils';

interface DecisionPanelProps {
  signal: Signal;
}

export const DecisionPanel = ({ signal }: DecisionPanelProps) => {
  return (
    <div className="glass-panel rounded-2xl p-6 relative group flex flex-col justify-between h-full">
      <div>
        <h3 className="text-[10px] font-black text-[#8e919e] tracking-[0.25em] mb-6 uppercase flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-[#0231de]"></span> Inference Target
        </h3>
        <div className="flex items-baseline gap-3">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={signal.type}
            className={cn(
              "text-6xl font-black leading-none",
              signal.type === 'BUY' ? "text-[#0231de] glow-buy" : "text-red-500"
            )}
          >
            {signal.type}
          </motion.span>
          <span className="text-5xl font-light text-[#00f2ff]/40 leading-none italic">YES</span>
        </div>
      </div>

      <div className="space-y-3 mt-8">
        <div className="flex justify-between items-center text-[11px]">
          <span className="text-[#8e919e] font-medium">Distance from entry</span>
          <span className="font-mono font-black text-[#00f2ff]">+{signal.distanceFromEntry} bps</span>
        </div>
        <div className="h-1 bg-[#282931] rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '65%' }}
            className="h-full bg-[#00f2ff] shadow-[0_0_8px_rgba(0,242,255,0.4)]"
          />
        </div>
      </div>
    </div>
  );
};
