import React from 'react';
import { TrendingUp, TrendingDown, HelpCircle } from 'lucide-react';

interface OperationalMetricCardProps {
  title: string;
  value: string;
  unit: string;
  groupAvg?: string;
  yoy: { value: string; isUp: boolean };
  mom: { value: string; isUp: boolean };
  status?: 'green' | 'yellowGreen' | 'yellow' | 'redYellow' | 'red';
  onClick: () => void;
}

export default function OperationalMetricCard({ 
  title, value, unit, groupAvg, yoy, mom, status, onClick 
}: OperationalMetricCardProps) {
  const getStatusInfo = (status?: string) => {
    switch (status) {
      case 'green': return { label: '绿灯', color: 'bg-success-green text-white' };
      case 'yellowGreen': return { label: '黄绿灯', color: 'bg-emerald-400 text-white' };
      case 'yellow': return { label: '黄灯', color: 'bg-warning-yellow text-white' };
      case 'redYellow': return { label: '红黄灯', color: 'bg-orange-400 text-white' };
      case 'red': return { label: '红灯', color: 'bg-danger-red text-white' };
      default: return null;
    }
  };

  const statusInfo = getStatusInfo(status);

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-1 h-4 bg-brand-blue rounded-full"></div>
          <span className="text-sm font-bold text-gray-700">{title}</span>
          <div className="relative group/tooltip" onClick={(e) => e.stopPropagation()}>
            <HelpCircle className="w-3.5 h-3.5 text-gray-300 group-hover/tooltip:text-blue-400 transition-colors cursor-help" />
            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 hidden group-hover/tooltip:block z-[60] w-56 p-3 bg-gray-900/95 backdrop-blur-md text-white text-[10px] rounded-lg shadow-2xl pointer-events-none border border-white/10">
              <div className="font-bold text-blue-400 border-b border-white/10 pb-1.5 mb-1.5 flex items-center gap-1.5">
                <HelpCircle className="w-3 h-3" />
                指标口径
              </div>
              <p className="leading-relaxed text-gray-200">
                该指标反映了<span className="text-white font-bold">{title}</span>在统计周期内的核心指标达成情况。
              </p>
              <p className="mt-2 text-gray-400">
                计算逻辑：统计周期内对应业务维度的实际发生额汇总。
              </p>
              <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-gray-900/95"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-black tracking-tight text-gray-900">{value}</span>
          <span className="text-xs text-gray-400 font-medium">{unit}</span>
        </div>
        {statusInfo && (
          <span className={`px-2 py-0.5 rounded-[2px] text-[10px] font-medium min-w-[56px] text-center shadow-sm ${statusInfo.color}`}>
            {statusInfo.label}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-gray-50 pt-4">
        <div className={`grid ${groupAvg ? 'grid-cols-3' : 'grid-cols-2'} gap-4 flex-1`}>
          {groupAvg && (
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 mb-1">同组均值</span>
              <span className="text-sm font-bold text-gray-700">{groupAvg}</span>
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 mb-1">同比</span>
            <div className={`flex items-center gap-0.5 text-sm font-bold ${yoy.isUp ? 'text-green-500' : 'text-red-500'}`}>
              {yoy.isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              {yoy.value}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 mb-1">环比</span>
            <div className={`flex items-center gap-0.5 text-sm font-bold ${mom.isUp ? 'text-green-500' : 'text-red-500'}`}>
              {mom.isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              {mom.value}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
