import React from 'react';
import { X, Download, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { tableData } from './MetricsTable';

interface HistoryLightingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HistoryLightingDrawer({ isOpen, onClose }: HistoryLightingDrawerProps) {
  const [viewType, setViewType] = React.useState<'module' | 'team'>('module');
  const months = Array.from({ length: 10 }, (_, i) => `${i + 1}月`);

  const getLightColor = (status: string) => {
    switch (status) {
      case '绿灯': return 'text-success-green';
      case '黄绿灯': return 'text-emerald-400';
      case '黄灯': return 'text-warning-yellow';
      case '红黄灯': return 'text-orange-400';
      case '红灯': return 'text-danger-red';
      default: return 'text-gray-300';
    }
  };

  const getTeamName = (module: string) => {
    if (module === '组效') return 'HRBP队伍';
    if (module === '人才') return '大学生队伍';
    if (module === '文关') return '底盘能力';
    return '联动队伍';
  };

  const getAssociatedGroup = (module: string) => {
    if (module === '组效') return 'HRBP';
    if (module === '人才') return '专业队伍';
    if (module === '文关') return '底盘';
    return '收派队伍';
  };

  // Filter data helper
  const getModuleSpan = (moduleName: string) => {
    return tableData
      .filter(d => d.module === moduleName)
      .reduce((acc, curr) => acc + curr.items.length, 0);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[100]"
          />
          
          {/* Drawer Content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[95%] md:w-[90%] bg-white shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white sticky top-0">
              <div className="flex items-center gap-4">
                <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-6 h-6 text-gray-500" />
                </button>
                <h3 className="text-xl font-bold text-gray-800">历史灯种明细</h3>
              </div>
              <button className="flex items-center gap-1.5 text-brand-blue font-bold text-sm hover:underline transition-all">
                <Download className="w-4 h-4" />
                <span>下载表格</span>
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50/30">
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-4 bg-brand-blue rounded-full"></div>
                    <span className="font-bold text-gray-800 text-sm">历史灯种明细</span>
                  </div>
                  <div className="flex items-center gap-1 bg-gray-100/50 p-0.5 rounded border border-gray-200">
                    <button 
                      onClick={() => setViewType('module')}
                      className={`px-3 py-1 text-[10px] rounded transition-all ${
                        viewType === 'module' ? 'bg-white shadow-sm text-brand-blue font-bold' : 'text-gray-500 font-medium hover:text-gray-900'
                      }`}
                    >
                      按模块看
                    </button>
                    <button 
                      onClick={() => setViewType('team')}
                      className={`px-3 py-1 text-[10px] rounded transition-all ${
                        viewType === 'team' ? 'bg-white shadow-sm text-brand-blue font-bold' : 'text-gray-500 font-medium hover:text-gray-900'
                      }`}
                    >
                      按队伍看
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[11px] border-collapse table-fixed">
                    <thead>
                      <tr className="bg-gray-50/80 text-gray-400 font-medium border-b border-gray-200">
                        {viewType === 'module' ? (
                          <>
                            <th className="px-4 py-3 border-r border-gray-200 text-center w-[70px]">模块</th>
                            <th className="px-4 py-3 border-r border-gray-200 text-center w-[100px]">维度</th>
                          </>
                        ) : (
                          <>
                            <th className="px-4 py-3 border-r border-gray-200 text-center w-[110px]">队伍名称</th>
                            <th className="px-4 py-3 border-r border-gray-200 text-center w-[110px]">关联群体</th>
                          </>
                        )}
                        <th className="px-4 py-3 border-r border-gray-200 text-left w-[200px]">指标名称</th>
                        <th className="px-4 py-3 border-r border-gray-200 text-center w-[60px]">频率</th>
                        {months.map(m => (
                          <th key={m} className="px-1 py-3 border-r border-gray-200 text-center w-[50px]">{m}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y divide-gray-100">
                      {tableData.flatMap((dim, dimIdx) => 
                        dim.items.map((item, itemIdx) => {
                          const moduleSpan = getModuleSpan(dim.module);
                          const sameModuleSections = tableData.filter(d => d.module === dim.module);
                          const isFirstDimensionOfModule = sameModuleSections[0].dimension === dim.dimension;
                          const showModuleColumn = isFirstDimensionOfModule && itemIdx === 0;

                          return (
                            <tr key={`${dimIdx}-${itemIdx}`} className="hover:bg-blue-50/10 transition-colors divide-x divide-gray-100">
                              {viewType === 'module' ? (
                                <>
                                  {showModuleColumn && (
                                    <td 
                                      className="px-4 py-3 text-center align-middle font-bold bg-gray-50/10 text-gray-900" 
                                      rowSpan={moduleSpan}
                                    >
                                      {dim.module}
                                    </td>
                                  )}
                                  {itemIdx === 0 && (
                                    <td 
                                      className="px-4 py-3 text-center align-middle font-medium" 
                                      rowSpan={dim.items.length}
                                    >
                                      {dim.dimension}
                                    </td>
                                  )}
                                </>
                              ) : (
                                <>
                                  {showModuleColumn && (
                                    <td 
                                      className="px-4 py-3 text-center align-middle font-bold bg-gray-50/10 text-gray-900" 
                                      rowSpan={moduleSpan}
                                    >
                                      {getTeamName(dim.module)}
                                    </td>
                                  )}
                                  {showModuleColumn && (
                                    <td 
                                      className="px-4 py-3 text-center align-middle font-medium" 
                                      rowSpan={moduleSpan}
                                    >
                                      {getAssociatedGroup(dim.module)}
                                    </td>
                                  )}
                                </>
                              )}
                              <td className="px-4 py-3 font-medium text-gray-900">
                                {item.name}
                              </td>
                              <td className="px-4 py-3 text-center text-gray-400">
                                {item.time === '4月' ? '月度' : '季度'}
                              </td>
                              {months.map((m, idx) => {
                                const isTargetMonth = m === '4月';
                                const status = isTargetMonth ? item.lightStatus : (idx < 5 ? (idx % 2 === 0 ? '绿灯' : '黄灯') : '-');
                                
                                return (
                                  <td key={idx} className="px-1 py-3 text-center">
                                    {status !== '-' ? (
                                      <div className="flex flex-col items-center gap-0.5">
                                        <div className={`text-sm leading-none ${getLightColor(status)}`}>●</div>
                                        <span className="text-[9px] scale-90 text-gray-400 whitespace-nowrap">{status}</span>
                                      </div>
                                    ) : (
                                      <span className="text-gray-300">-</span>
                                    )}
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
