import React from 'react';

interface OverviewIntervalCardProps {
  label: string;
  count: number;
  percentage: string;
  dotColor: string;
  bgColor: string;
}

export default function OverviewIntervalCard({ label, count, percentage, dotColor, bgColor }: OverviewIntervalCardProps) {
  return (
    <div className={`p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between ${bgColor}`}>
      <div className="flex items-center gap-2">
        <div className={`w-2.5 h-2.5 rounded-full ${dotColor}`}></div>
        <span className="text-sm font-bold text-gray-700">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-black tracking-tight text-gray-900">{count}</span>
        <span className="text-[10px] text-gray-400">个</span>
        <span className="text-[10px] text-gray-400 ml-3">占比：</span>
        <span className="text-sm font-bold text-gray-800">{percentage}</span>
      </div>
    </div>
  );
}
