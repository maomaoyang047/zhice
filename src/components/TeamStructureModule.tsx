import React from 'react';
import { Users, LayoutGrid, ChevronRight, BarChart2 } from 'lucide-react';

export default function TeamStructureModule() {
  const subTeams = [
    { name: '职能队伍', label: '看板' },
    { name: '销售队伍', label: '看板' },
    { name: 'HRBP队伍', label: '看板' },
    { name: '网点队伍', label: '看板' },
    { name: '转运中心负责人', label: '看板' },
    { name: '待确认', label: '是否有看板' },
  ];

  return (
    <div className="space-y-4 pt-6 border-t border-gray-100">
      {/* Module Title */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-6 bg-brand-blue rounded-full"></div>
        <h2 className="text-lg font-bold text-gray-800 tracking-tight">队伍结构现状</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {/* Main Grid Section */}
        <div className="space-y-4">
          {/* Top Headers */}
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-1 bg-blue-50 text-brand-blue text-xs font-black flex items-center justify-center py-2 rounded-lg border border-blue-100 shadow-sm">
              队伍
            </div>
            <div className="col-span-3 bg-indigo-50/50 text-indigo-600 text-xs font-black flex items-center justify-center py-2 rounded-lg border border-indigo-100 hover:bg-indigo-50 transition-colors cursor-pointer">
              三线职能
            </div>
            <div className="col-span-4 bg-pink-50/30 text-pink-600 text-xs font-black flex items-center justify-center py-2 rounded-lg border border-pink-100 hover:bg-pink-50/50 transition-colors cursor-pointer">
              三线经营
            </div>
            <div className="col-span-4 bg-orange-50/30 text-orange-600 text-xs font-black flex items-center justify-center py-2 rounded-lg border border-orange-100 hover:bg-orange-50/50 transition-colors cursor-pointer">
              一二线
            </div>
          </div>

          {/* Content Box */}
          <div className="grid grid-cols-12 gap-3 min-h-[220px]">
            {/* Left Label */}
            <div className="col-span-1 bg-blue-50 text-gray-700 text-xs font-black flex flex-col items-center justify-center gap-2 rounded-xl border border-blue-100 shadow-sm p-2 text-center leading-relaxed">
              <BarChart2 className="w-5 h-5 text-brand-blue/60" />
              <span>整体情况</span>
            </div>

            {/* Middle Content (Placeholder for real charts/data) */}
            <div className="col-span-11 bg-gray-50/30 border border-gray-100 rounded-xl relative overflow-hidden flex items-center justify-center p-8">
               <div className="absolute inset-0 opacity-20 pointer-events-none">
                 <div className="absolute top-0 left-0 w-32 h-32 bg-gray-200 rotate-45 -translate-x-16 -translate-y-16"></div>
                 <div className="absolute bottom-0 right-0 w-32 h-32 bg-gray-200 rotate-45 translate-x-16 translate-y-16"></div>
               </div>
               <div className="grid grid-cols-2 gap-x-16 gap-y-6 w-full max-w-xl">
                 {[
                   { label: '在职人数', value: '742', sub: '人' },
                   { label: '平均年龄（对比）', value: '32.5', sub: '岁' },
                   { label: '学历分布', value: '本科及以上 65%', sub: '' },
                   { label: '职级分布', value: '7-9级占比 42%', sub: '' },
                   { label: '多元化情况', value: '女性占比 38%', sub: '' },
                   { label: '流失情况', value: '5.2%', sub: '季度流失率' }
                 ].map((item, idx) => (
                   <div key={idx} className="flex flex-col items-center text-center p-3 hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-100 hover:shadow-sm group">
                     <span className="text-[11px] text-gray-400 font-bold mb-1 group-hover:text-brand-blue transition-colors">{item.label}</span>
                     <div className="flex items-baseline gap-1">
                       <span className="text-xl font-black text-gray-800">{item.value}</span>
                       <span className="text-[10px] text-gray-400 font-medium">{item.sub}</span>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          {/* Bottom Sub-teams row */}
          <div className="grid grid-cols-12 gap-3 pt-1">
            <div className="col-span-1 bg-blue-50 text-gray-700 text-xs font-black flex flex-col items-center justify-center p-2 rounded-xl border border-blue-100 shadow-sm text-center leading-relaxed">
              <span>队伍细分</span>
            </div>
            
            {/* 三线职能 Sub-teams */}
            <div className="col-span-3 grid grid-cols-3 gap-3">
              {subTeams.slice(0, 3).map((team, idx) => (
                <div 
                  key={idx} 
                  className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border border-gray-100 shadow-sm transition-all hover:scale-105 hover:shadow-md cursor-pointer bg-indigo-50/20"
                >
                  <span className="text-[11px] font-black text-gray-700 leading-tight text-center">{team.name}</span>
                  <div className="flex items-center gap-1 bg-white/60 px-2 py-0.5 rounded-full border border-white/80 shadow-sm">
                    <span className="text-[9px] font-bold text-gray-400 whitespace-nowrap">{team.label}</span>
                    <ChevronRight className="w-2.5 h-2.5 text-gray-300" />
                  </div>
                </div>
              ))}
            </div>

            {/* 三线经营 Sub-teams */}
            <div className="col-span-4 grid grid-cols-2 gap-3">
              {subTeams.slice(3, 5).map((team, idx) => (
                <div 
                  key={idx} 
                  className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border border-gray-100 shadow-sm transition-all hover:scale-105 hover:shadow-md cursor-pointer bg-pink-50/20"
                >
                  <span className="text-[11px] font-black text-gray-700 leading-tight text-center">{team.name}</span>
                  <div className="flex items-center gap-1 bg-white/60 px-2 py-0.5 rounded-full border border-white/80 shadow-sm">
                    <span className="text-[9px] font-bold text-gray-400 whitespace-nowrap">{team.label}</span>
                    <ChevronRight className="w-2.5 h-2.5 text-gray-300" />
                  </div>
                </div>
              ))}
            </div>

            {/* 一二线 Sub-teams */}
            <div className="col-span-4 grid grid-cols-1 gap-3">
              {subTeams.slice(5, 6).map((team, idx) => (
                <div 
                  key={idx} 
                  className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border border-gray-100 shadow-sm transition-all hover:scale-105 hover:shadow-md cursor-pointer bg-orange-50/20"
                >
                  <span className="text-[11px] font-black text-gray-700 leading-tight text-center">{team.name}</span>
                  <div className="flex items-center gap-1 bg-white/60 px-2 py-0.5 rounded-full border border-white/80 shadow-sm">
                    <span className="text-[9px] font-bold text-gray-400 whitespace-nowrap">{team.label}</span>
                    <ChevronRight className="w-2.5 h-2.5 text-gray-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
