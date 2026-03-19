import React from 'react';
import { motion } from 'framer-motion';

interface ProbabilityGaugeProps {
  value: number;
  label: string;
  subLabel: string;
  color?: string;
  size?: number;
}

export const ProbabilityGauge = ({ 
  value, 
  label, 
  subLabel, 
  color = "#00f2ff",
  size = 128 
}: ProbabilityGaugeProps) => {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <svg className="w-full h-full -rotate-90 drop-shadow-2xl" viewBox="0 0 100 100">
        <circle 
          className="text-white/5" 
          cx="50" cy="50" r={radius} 
          fill="none" stroke="currentColor" strokeWidth="4" 
        />
        <motion.circle 
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
          cx="50" cy="50" r={radius} 
          fill="none" 
          stroke={color} 
          strokeWidth="4" 
          strokeDasharray={circumference}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 8px ${color}80)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-1">
        <span className="text-3xl font-bold text-[#e3e1e9]">{value}%</span>
        <span className="text-[8px] text-[#8e919e] font-black tracking-widest uppercase opacity-60">{subLabel}</span>
      </div>
    </div>
  );
};
