import React from 'react';
import { LayoutDashboard, FileText } from 'lucide-react';

export default function GlobalMetricsSummary() {
  const sections = [
    {
      title: '人才发展',
      iconUrl: 'https://img.icons8.com/isometric/50/000000/document.png',
      metrics: [
        { label: '健康度较好指标（≥60%的地区亮绿灯）：', value: '关键队伍部负责人齐备率' },
        { label: '具备较大提升空间指标（≥20%的地区亮红灯）：', value: '关键职能队伍高素质青年化占比，收派岗周期内需求满足率' },
      ]
    },
    {
      title: '组织发展',
      metrics: [
        { label: '健康度较好指标（≥60%的地区亮绿灯）：', value: '一线月薪增长达成率' },
        { label: '具备较大提升空间指标（≥20%的地区亮红灯）：', value: '一线月薪增长达成率' }, // Image shows this repeat slightly or similar text
      ]
    },
    {
      title: '员工关系',
      metrics: [
        { label: '健康度较好指标（≥60%的地区亮绿灯）：', value: '收派岗全流量流失率' },
        { label: '具备较大提升空间指标（≥20%的地区亮红灯）：', value: '动作岗全流量流失率' },
      ]
    }
  ];

  return (
    <div className="bg-brand-light-blue rounded-lg p-6 border border-blue-100 flex items-start gap-6">
      <div className="w-12 h-12 flex-shrink-0 bg-brand-blue rounded-xl flex items-center justify-center shadow-lg transform rotate-[10deg]">
        <FileText className="w-7 h-7 text-white" />
      </div>
      <div className="flex-1 grid grid-cols-1 gap-4">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2">
               <div className="w-1 h-3 bg-brand-blue rounded-full"></div>
               <span className="text-sm font-bold text-gray-800">{section.title}</span>
            </div>
            {section.metrics.map((m, i) => (
              <div key={i} className="flex text-xs leading-relaxed">
                <span className="text-gray-500 font-medium whitespace-nowrap">{m.label}</span>
                <span className="text-gray-700 ml-1">{m.value}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
