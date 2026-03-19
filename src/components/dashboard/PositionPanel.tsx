import React from 'react';
import { Position } from '../../types/trading';
import { cn } from '../../lib/utils';

interface PositionPanelProps {
  position: Position;
}

export const PositionPanel = ({ position }: PositionPanelProps) => {
  return (
    <div className="glass-panel rounded-2xl flex flex-col overflow-hidden">
      <div className="p-5 border-b border-white/5 bg-white/5 flex justify-between items-center">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8e919e]">Live Portfolio</span>
        <span className="px-2 py-0.5 rounded-full bg-[#00f2ff]/10 border border-[#00f2ff]/20 text-[8px] font-black text-[#00f2ff] tracking-widest uppercase">
          {position.status}
        </span>
      </div>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-[9px] text-[#8e919e] font-black uppercase tracking-widest mb-1">PnL Session</span>
            <span className="text-2xl font-bold text-[#00f2ff]">
              +${position.pnl.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[9px] text-[#8e919e] font-black uppercase tracking-widest mb-1 text-right">Market Position</span>
            <span className={cn(
              "text-sm font-black tracking-widest px-2 py-1 rounded bg-white/5 border",
              position.activeMarketPosition === 'LONG' ? "text-[#00f2ff] border-[#00f2ff]/20" : 
              position.activeMarketPosition === 'SHORT' ? "text-red-500 border-red-500/20" : "text-[#8e919e] border-white/10"
            )}>
              {position.activeMarketPosition}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="text-[8px] text-[#8e919e] font-black tracking-widest uppercase mb-1">YES EXPOSURE</div>
            <div className="text-lg font-bold text-[#e3e1e9]">{position.exposureYes.toLocaleString()} <span className="text-[10px] font-normal text-[#8e919e]">{position.asset}</span></div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="text-[8px] text-[#8e919e] font-black tracking-widest uppercase mb-1">NO EXPOSURE</div>
            <div className="text-lg font-bold text-[#e3e1e9]">{position.exposureNo.toLocaleString()} <span className="text-[10px] font-normal text-[#8e919e]">{position.asset}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};
