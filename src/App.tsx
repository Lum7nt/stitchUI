/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { TopHeader } from './components/layout/TopHeader';
import { DecisionPanel } from './components/dashboard/DecisionPanel';
import { DecisionBreakdown } from './components/dashboard/DecisionBreakdown';
import { ProbabilityGauge } from './components/dashboard/ProbabilityGauge';
import { ChartPanel } from './components/dashboard/ChartPanel';
import { PositionPanel } from './components/dashboard/PositionPanel';
import { ExecutionPanel } from './components/dashboard/ExecutionPanel';
import { EventLog } from './components/dashboard/EventLog';
import { useDashboardData } from './hooks/useDashboardData';

export default function App() {
  const { 
    marketState, 
    signal, 
    position, 
    execution,
    thresholds,
    orderBook, 
    events, 
    chartData 
  } = useDashboardData();

  return (
    <div className="bg-[#0a0b0f] text-[#e3e1e9] font-body min-h-screen overflow-hidden selection:bg-[#00f2ff]/20">
      <Sidebar />
      
      <main className="ml-20 flex flex-col h-screen relative">
        <TopHeader market={marketState} />

        <section className="flex-1 p-8 grid grid-cols-12 gap-8 overflow-hidden bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#00f2ff]/5 via-transparent to-transparent">
          {/* Left Column */}
          <div className="col-span-9 flex flex-col gap-8 overflow-y-auto no-scrollbar">
            
            {/* Intelligence Row */}
            <div className="grid grid-cols-12 gap-6 h-[240px]">
              <div className="col-span-4">
                <DecisionPanel signal={signal} />
              </div>
              
              <div className="col-span-4">
                <DecisionBreakdown signal={signal} />
              </div>

              <div className="col-span-4 glass-panel rounded-2xl p-6 flex flex-col justify-between">
                <div className="flex justify-around items-center flex-1">
                  <ProbabilityGauge 
                    value={signal.strength} 
                    label="Neural Model" 
                    subLabel="Neural Model" 
                    size={110}
                  />
                  <ProbabilityGauge 
                    value={signal.marketAgg} 
                    label="Market Agg" 
                    subLabel="Market Agg" 
                    color="#8e919e60"
                    size={110}
                  />
                </div>
                
                <div className="space-y-3 mt-4">
                  <MetricRow label="CONFIDENCE" value={signal.confidence} color="#00f2ff" />
                  <MetricRow label="FLIP RISK" value={signal.flipRisk * 100} color="#ffb950" displayValue={signal.flipRisk.toFixed(3)} />
                </div>
              </div>
            </div>

            {/* Chart */}
            <ChartPanel data={chartData} thresholds={thresholds} signal={signal} />
          </div>

          {/* Right Column */}
          <div className="col-span-3 flex flex-col gap-8">
            <div className="flex flex-col gap-8 h-full">
              <div className="flex flex-col gap-4">
                <PositionPanel position={position} />
                <ExecutionPanel execution={execution} orderBook={orderBook} />
              </div>
              <EventLog events={events} />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="h-10 bg-[#06070a] border-t border-[#2a2b31]/20 flex items-center justify-between px-8 text-[9px] font-bold tracking-[0.15em] text-[#8e919e]/50">
          <div className="flex gap-10">
            <div className="flex items-center gap-3">
              <span className="opacity-40">ENVIRONMENT:</span>
              <span className="text-[#ffb950]/80 uppercase">{marketState.mode} MODE</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="opacity-40">API LATENCY:</span>
              <span className="text-[#00f2ff]/80">{marketState.latency} MS</span>
            </div>
          </div>
          <div className="flex gap-10">
            <div className="flex items-center gap-3">
              <span className="opacity-40">PROCESSOR UPTIME:</span>
              <span className="text-[#e3e1e9]">{marketState.uptime}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="opacity-40">STATUS:</span>
              <span className="text-[#00f2ff]/80">NOMINAL</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

const MetricRow = ({ label, value, color, displayValue }: { label: string; value: number; color: string; displayValue?: string }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between items-center text-[9px] font-black tracking-widest text-[#8e919e]">
      <span>{label}</span>
      <span style={{ color }}>{displayValue || `${value}%`}</span>
    </div>
    <div className="h-1 bg-white/5 rounded-full">
      <div 
        className="h-full rounded-full transition-all duration-1000" 
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  </div>
);
