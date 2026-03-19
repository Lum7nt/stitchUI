import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ReferenceLine,
  ReferenceArea
} from 'recharts';
import { ChartDataPoint, Thresholds, Signal } from '../../types/trading';

interface ChartPanelProps {
  data: ChartDataPoint[];
  thresholds: Thresholds;
  signal: Signal;
}

export const ChartPanel = ({ data, thresholds, signal }: ChartPanelProps) => {
  return (
    <div className="flex-1 min-h-[440px] glass-panel rounded-2xl flex flex-col relative overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
        <div className="flex gap-1.5 p-1 bg-black/40 rounded-lg border border-white/5">
          <button className="px-4 py-1.5 text-[10px] font-black rounded-md bg-[#00f2ff] text-[#00363a] shadow-sm uppercase tracking-wider">Distance</button>
          <button className="px-4 py-1.5 text-[10px] font-black rounded-md text-[#8e919e]/60 hover:text-[#e3e1e9] transition-colors uppercase tracking-wider">Probability</button>
          <button className="px-4 py-1.5 text-[10px] font-black rounded-md text-[#8e919e]/60 hover:text-[#e3e1e9] transition-colors uppercase tracking-wider">Volatility</button>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00f2ff] shadow-[0_0_8px_#00f2ff]"></div>
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#8e919e]">Neural Net Path</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#0231de]"></div>
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#8e919e]">Baseline Flow</span>
          </div>
        </div>
      </div>

      <div className="flex-1 relative p-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorNeural" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#00f2ff" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
            <XAxis dataKey="timestamp" hide />
            <YAxis 
              orientation="right" 
              domain={[-2.5, 10]} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#8e919e40', fontSize: 9, fontWeight: 700 }}
            />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-[#1c1d24]/90 backdrop-blur-xl border border-[#00f2ff]/30 px-4 py-3 rounded-xl shadow-2xl">
                      <div className="text-[8px] text-[#8e919e] font-black tracking-widest uppercase mb-1.5 opacity-60">Real-time Node</div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-[#e3e1e9]">+{payload[0].value?.toFixed(3)}</span>
                        <span className="text-[10px] text-[#00f2ff] font-mono font-bold">bps</span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />

            {/* No-Trade Zone */}
            <ReferenceArea 
              y1={thresholds.noTradeZone[0]} 
              y2={thresholds.noTradeZone[1]} 
            />

            {/* Entry Threshold */}
            <ReferenceLine 
              y={thresholds.entry} 
              stroke="#00f2ff" 
              strokeDasharray="5 5" 
              strokeOpacity={0.3}
              label={{ 
                value: 'ENTRY THRESHOLD', 
                position: 'insideLeft', 
                fill: '#00f2ff', 
                fontSize: 8, 
                fontWeight: 900,
                letterSpacing: 1
              }} 
            />

            {/* Current Decision Point */}
            <ReferenceLine 
              y={signal.distanceFromEntry} 
              stroke={signal.type === 'BUY' ? "#00f2ff" : "#8e919e"} 
              strokeWidth={1}
              strokeOpacity={0.5}
              label={{ 
                value: `DECISION: ${signal.type}`, 
                position: 'insideRight', 
                fill: signal.type === 'BUY' ? "#00f2ff" : "#8e919e", 
                fontSize: 8, 
                fontWeight: 900,
                letterSpacing: 1
              }} 
            />

            <Area 
              type="monotone" 
              dataKey="neuralPath" 
              stroke="#00f2ff" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorNeural)" 
              animationDuration={1000}
            />
            <Area 
              type="monotone" 
              dataKey="baselineFlow" 
              stroke="#0231de" 
              strokeWidth={2}
              strokeOpacity={0.4}
              fill="transparent" 
              animationDuration={1000}
            />
            <ReferenceLine y={0} stroke="#ffffff10" strokeDasharray="3 3" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
