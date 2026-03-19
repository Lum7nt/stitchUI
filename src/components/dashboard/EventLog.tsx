import React from 'react';
import { Terminal } from 'lucide-react';
import { TelemetryEvent } from '../../types/trading';
import { cn } from '../../lib/utils';

interface EventLogProps {
  events: TelemetryEvent[];
}

export const EventLog = ({ events }: EventLogProps) => {
  return (
    <div className="flex-1 glass-panel rounded-2xl flex flex-col overflow-hidden">
      <div className="p-5 border-b border-white/5 bg-white/5 flex justify-between items-center">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8e919e]">System Telemetry</span>
        <Terminal size={14} className="text-[#8e919e] opacity-40" />
      </div>
      <div className="flex-1 overflow-y-auto p-5 space-y-4 font-mono text-[10px] no-scrollbar">
        {events.map((event) => (
          <div key={event.id} className="flex gap-4">
            <span className="text-[#8e919e]/30 font-bold">{event.timestamp}</span>
            <div className={cn(
              "flex items-center gap-2 px-2 py-0.5 rounded border font-bold",
              event.type === 'success' && "bg-[#00f2ff]/5 border-[#00f2ff]/20 text-[#00f2ff]",
              event.type === 'warning' && "bg-[#ffb950]/5 border-[#ffb950]/20 text-[#ffb950]",
              event.type === 'info' && "bg-white/5 border-white/10 text-[#8e919e]",
              event.type === 'error' && "bg-red-500/5 border-red-500/20 text-red-500"
            )}>
              {event.type !== 'info' && <span className={cn("w-1 h-1 rounded-full", 
                event.type === 'success' ? "bg-[#00f2ff]" : "bg-[#ffb950]"
              )}></span>}
              {event.message}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
