import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { Signal, DecisionFactor } from '../../types/trading';
import { cn } from '../../lib/utils';

interface DecisionBreakdownProps {
  signal: Signal;
}

export const DecisionBreakdown = ({ signal }: DecisionBreakdownProps) => {
  return (
    <div className="glass-panel rounded-2xl p-6 flex flex-col h-full">
      <h3 className="text-[10px] font-black text-[#8e919e] tracking-[0.25em] mb-6 uppercase flex items-center gap-2">
        <span className="w-1 h-1 rounded-full bg-[#00f2ff]"></span> Decision Breakdown
      </h3>

      <div className="space-y-4 flex-1">
        {signal.breakdown.map((factor, index) => (
          <motion.div 
            key={factor.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <div className="flex items-start gap-3">
              <div className={cn(
                "mt-0.5",
                factor.impact === 'positive' ? "text-[#00f2ff]" : 
                factor.impact === 'negative' ? "text-red-500" : "text-[#8e919e]"
              )}>
                {factor.impact === 'positive' ? <CheckCircle2 size={14} /> : 
                 factor.impact === 'negative' ? <XCircle size={14} /> : <AlertCircle size={14} />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[11px] font-bold text-[#e3e1e9]">{factor.label}</span>
                  <span className={cn(
                    "text-[10px] font-mono font-bold",
                    factor.impact === 'positive' ? "text-[#00f2ff]" : 
                    factor.impact === 'negative' ? "text-red-500" : "text-[#8e919e]"
                  )}>
                    {factor.value}
                  </span>
                </div>
                <p className="text-[10px] text-[#8e919e]/60 leading-relaxed group-hover:text-[#8e919e] transition-colors">
                  {factor.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {signal.type === 'BLOCKED' && (
        <div className="mt-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
          <div className="text-[9px] font-black text-red-500 tracking-widest uppercase mb-1">REJECTION REASON</div>
          <p className="text-[10px] text-red-500/80 font-medium">{signal.rejectionReason}</p>
        </div>
      )}
    </div>
  );
};
