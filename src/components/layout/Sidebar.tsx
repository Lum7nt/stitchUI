import React from 'react';
import { LayoutDashboard, BarChart2, Radio, Wallet, Terminal, Settings2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-full w-20 flex flex-col items-center py-6 bg-[#06070a] border-r border-[#2a2b31]/30 z-50">
      <div className="mb-10 text-center">
        <span className="font-bold text-[#00f2ff] text-xl tracking-tighter block leading-none">K</span>
        <div className="text-[7px] mt-1 opacity-30 font-mono tracking-widest uppercase">V2.0.4</div>
      </div>

      <nav className="flex flex-col gap-4 flex-1">
        <NavItem icon={<LayoutDashboard size={20} />} active />
        <NavItem icon={<BarChart2 size={20} />} />
        <NavItem icon={<Radio size={20} />} />
        <NavItem icon={<Wallet size={20} />} />
        <NavItem icon={<Terminal size={20} />} />
      </nav>

      <div className="mt-auto flex flex-col items-center gap-6">
        <div className="rotate-[-90deg] whitespace-nowrap text-[8px] font-black tracking-[0.3em] text-[#ffb950]/40 mb-8">
          PAPER SYSTEM
        </div>
        <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#2a2b31]/30 p-0.5">
          <img 
            src="https://picsum.photos/seed/trader/100/100" 
            alt="User" 
            className="w-full h-full object-cover rounded-lg grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>
      </div>
    </aside>
  );
};

const NavItem = ({ icon, active = false }: { icon: React.ReactNode; active?: boolean }) => (
  <button className={cn(
    "w-12 h-12 flex items-center justify-center rounded-xl transition-all border",
    active 
      ? "text-[#00f2ff] bg-[#00f2ff]/5 border-[#00f2ff]/20" 
      : "text-[#8e919e]/40 hover:text-[#e3e1e9] border-transparent"
  )}>
    {icon}
  </button>
);
