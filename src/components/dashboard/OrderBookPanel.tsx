import React from 'react';
import { OrderBookEntry } from '../../types/trading';

interface OrderBookPanelProps {
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
}

export const OrderBookPanel = ({ bids, asks }: OrderBookPanelProps) => {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[9px] font-black text-[#8e919e]/40 mb-3 uppercase tracking-widest">
        <span>Limit Price</span>
        <span>Depth (ETH)</span>
      </div>
      
      {asks.map((ask, i) => (
        <div key={i} className="relative flex justify-between text-[10px] font-mono py-1.5 group cursor-crosshair">
          <div 
            className="absolute inset-y-0 right-0 bg-red-500/10 rounded-l-sm transition-all group-hover:bg-red-500/20" 
            style={{ width: `${Math.min(ask.depth * 50, 100)}%` }}
          />
          <span className="text-red-500 font-bold z-10">{ask.price.toLocaleString()}</span>
          <span className="text-[#8e919e] z-10">{ask.depth.toFixed(5)}</span>
        </div>
      ))}

      <div className="py-3 flex justify-center">
        <div className="flex items-center gap-3 w-full">
          <div className="h-px flex-1 bg-white/5"></div>
          <span className="text-[9px] font-black font-mono text-[#74f5ff] tracking-[0.25em]">0.08 SPREAD</span>
          <div className="h-px flex-1 bg-white/5"></div>
        </div>
      </div>

      {bids.map((bid, i) => (
        <div key={i} className="relative flex justify-between text-[10px] font-mono py-1.5 group cursor-crosshair">
          <div 
            className="absolute inset-y-0 left-0 bg-[#00f2ff]/10 rounded-r-sm transition-all group-hover:bg-[#00f2ff]/20" 
            style={{ width: `${Math.min(bid.depth * 50, 100)}%` }}
          />
          <span className="text-[#00f2ff] font-bold z-10">{bid.price.toLocaleString()}</span>
          <span className="text-[#8e919e] z-10">{bid.depth.toFixed(5)}</span>
        </div>
      ))}
    </div>
  );
};
