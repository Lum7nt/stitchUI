import React from 'react';
import { Settings2, ShieldCheck, ShieldAlert, Zap } from 'lucide-react';
import { MarketState } from '../../types/trading';
import { TimeExpiry } from '../dashboard/TimeExpiry';
import { cn } from '../../lib/utils';

interface TopHeaderProps {
  market: MarketState;
}

export const TopHeader = ({ market }: TopHeaderProps) => {
  return (
    <header className="h-16 flex items-center justify-between px-8 bg-[#0a0b0f]/95 backdrop-blur-md border-b border-[#2a2b31]/20 z-40 ml-20">
      <div className="flex items-center gap-10">
        <div className="flex flex-col">
          <span className="text-[9px] text-[#8e919e] font-black tracking-[0.2em] uppercase mb-0.5 opacity-60">Ticker Asset</span>
          <span className="text-sm font-bold tracking-tight text-[#e3e1e9]">
            {market.ticker} <span className="text-[#00f2ff] font-mono opacity-80">{market.timeframe}</span>
          </span>
        </div>

        <div className="flex items-center gap-8 border-l border-[#2a2b31]/20 pl-8">
          <div className="flex flex-col">
            <span className="text-[9px] text-[#8e919e] font-black tracking-[0.2em] uppercase mb-0.5 opacity-60">Engine Health</span>
            <div className="flex items-center gap-2">
              <span className={cn(
                "w-1.5 h-1.5 rounded-full animate-pulse shadow-[0_0_8px_rgba(0,242,255,0.6)]",
                market.status === 'CONNECTED' ? "bg-[#00f2ff]" : "bg-red-500"
              )}></span>
              <span className="text-[11px] font-bold text-[#00f2ff] tracking-wider">{market.status}</span>
            </div>
          </div>

          <TimeExpiry nextTick={market.nextTick} />
        </div>

        <div className="flex items-center gap-3 border-l border-[#2a2b31]/20 pl-8">
          <div className={cn(
            "flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[9px] font-black tracking-widest uppercase",
            market.mode === 'LIVE' ? "bg-red-500/10 border-red-500/20 text-red-500" : "bg-[#ffb950]/10 border-[#ffb950]/20 text-[#ffb950]"
          )}>
            <Zap size={10} />
            {market.mode} DATA
          </div>
          <div className={cn(
            "flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[9px] font-black tracking-widest uppercase",
            market.executionEnabled ? "bg-[#00f2ff]/10 border-[#00f2ff]/20 text-[#00f2ff]" : "bg-red-500/10 border-red-500/20 text-red-500"
          )}>
            {market.executionEnabled ? <ShieldCheck size={10} /> : <ShieldAlert size={10} />}
            EXECUTION {market.executionEnabled ? 'ENABLED' : 'DISABLED'}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="px-5 py-2 rounded-lg bg-[#1e1f28] border border-[#2a2b31]/30 text-[10px] font-bold tracking-widest text-[#8e919e] hover:text-[#e3e1e9] hover:border-[#4a4c56] transition-all">
          TERMINATE SESSION
        </button>
        <button className="px-6 py-2 rounded-lg bg-[#0231de] text-white text-[10px] font-black tracking-[0.15em] hover:brightness-110 shadow-lg shadow-[#0231de]/20 transition-all uppercase">
          Pause Operation
        </button>
        <div className="w-px h-6 bg-[#2a2b31]/20 mx-2"></div>
        <button className="p-2 text-[#8e919e] hover:text-[#00f2ff] transition-all">
          <Settings2 size={20} />
        </button>
      </div>
    </header>
  );
};
