import React from 'react';
import { motion } from 'motion/react';
import { AlertCircle, ShieldCheck, Sparkles } from 'lucide-react';

export default function RiskManagementModule() {
  return (
    <div className="space-y-4 pt-6 border-t border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-6 bg-brand-blue rounded-full"></div>
        <h2 className="text-lg font-bold text-gray-800 tracking-tight">风险管理提示</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 text-[10px] font-bold text-gray-400">1</span>
              <span className="text-sm font-bold text-gray-700 font-sans">重大异常的数量与处理</span>
            </div>
            <div className="min-h-[80px] bg-gray-50/50 rounded-xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400">
              <span className="text-xs font-medium">文关处提供</span>
              <div className="w-12 h-1 bg-gray-100 rounded-full mt-2"></div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 text-[10px] font-bold text-gray-400">2</span>
              <span className="text-sm font-bold text-gray-700 font-sans">人资工作合规性</span>
            </div>
            <div className="min-h-[80px] bg-gray-50/50 rounded-xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400">
              <span className="text-xs font-medium">灵渠提供</span>
              <div className="w-12 h-1 bg-gray-100 rounded-full mt-2"></div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-blue-50/30 p-4 rounded-xl border border-blue-100/50 flex items-start gap-3">
          <div className="p-1.5 bg-brand-blue/10 rounded-lg text-brand-blue">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="space-y-2">
            <span className="text-sm font-black text-gray-800">总结: AI生成风险提示</span>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              基于当前数据监测，该业务大区整体合规性处于可控范围，但需注意近期<span className="text-brand-blue font-bold">一线平台用工占比</span>的小幅波动，可能引发后续用工合规性走低，建议联动文关处加强日常巡检频率。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
