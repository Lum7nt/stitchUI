import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';
import { ExecutionState, OrderBookEntry } from '../../types/trading';
import { OrderBookPanel } from './OrderBookPanel';
import { cn } from '../../lib/utils';

interface ExecutionPanelProps {
  execution: ExecutionState;
  orderBook: { bids: OrderBookEntry[], asks: OrderBookEntry[] };
}

export const ExecutionPanel = ({ execution, orderBook }: ExecutionPanelProps) => {
  return (
    <div className="glass-panel rounded-2xl flex flex-col overflow-hidden h-full">
      <div className="p-5 border-b border-white/5 bg-white/5 flex justify-between items-center">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8e919e]">Execution State</span>
        <div className="flex items-center gap-2">
          <span className={cn(
            "w-1.5 h-1.5 rounded-full",
            execution.quoteStatus === 'LIVE' ? "bg-[#00f2ff] animate-pulse" : "bg-red-500"
          )}></span>
          <span className="text-[8px] font-black text-[#8e919e] tracking-widest uppercase">{execution.quoteStatus} QUOTE</span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Execution Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="text-[8px] text-[#8e919e] font-black tracking-widest uppercase mb-1">ACTIVE ORDERS</div>
            <div className="text-xl font-bold text-[#e3e1e9]">{execution.activeOrders}</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="text-[8px] text-[#8e919e] font-black tracking-widest uppercase mb-1">LAST FILL</div>
            <div className="flex items-center gap-2">
              {execution.lastFill?.side === 'BUY' ? <ArrowUpRight size={14} className="text-[#00f2ff]" /> : <ArrowDownRight size={14} className="text-red-500" />}
              <div className="text-sm font-bold text-[#e3e1e9]">{execution.lastFill?.price.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Order Book */}
        <div className="pt-2">
          <OrderBookPanel bids={orderBook.bids} asks={orderBook.asks} />
        </div>

        {/* Last Fill Details */}
        {execution.lastFill && (
          <div className="p-4 rounded-xl bg-[#00f2ff]/5 border border-[#00f2ff]/10">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[9px] font-black text-[#00f2ff] tracking-widest uppercase">LAST FILL DETAILS</span>
              <span className="text-[9px] font-mono text-[#8e919e]">{execution.lastFill.time}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[8px] text-[#8e919e] font-black uppercase mb-0.5">SIZE</span>
                <span className="text-xs font-bold text-[#e3e1e9]">{execution.lastFill.size} ETH</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[8px] text-[#8e919e] font-black uppercase mb-0.5">PRICE</span>
                <span className="text-xs font-bold text-[#e3e1e9]">{execution.lastFill.price.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
