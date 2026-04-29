import { X, TrendingUp, TrendingDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MetricDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export default function MetricDetailModal({ isOpen, onClose, title }: MetricDetailModalProps) {
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
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-[2px]"
          />
          
          {/* Drawer Content */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-[101] w-[90%] md:w-[75%] bg-white shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white sticky top-0">
              <h3 className="text-xl font-bold text-gray-800">{title} 指标详情</h3>
              <button 
                onClick={onClose} 
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="关闭"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-gray-50/20">
              {/* Charts Row */}
              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-l-4 border-blue-600 pl-3">
                    <span className="text-base font-bold text-gray-800">当月趋势分析</span>
                    <span className="text-xs text-gray-400">单位: 亿元 / %</span>
                  </div>
                  <div className="h-64 bg-gray-50/50 rounded-xl border border-gray-100 p-6 relative flex items-end justify-around">
                    {[180, 150, 170, 190].map((h, i) => (
                      <div key={i} className="flex flex-col items-center gap-3 w-12 group relative">
                        <div className="w-full bg-blue-600 rounded-t-sm shadow-sm opacity-90 group-hover:opacity-100 transition-opacity" style={{ height: `${(h/200)*100}%` }}></div>
                        <span className="text-[11px] font-medium text-gray-500 whitespace-nowrap">26年0{i+1}月</span>
                      </div>
                    ))}
                    {/* SVG Line Overlay simulation */}
                    <svg className="absolute inset-x-0 bottom-16 h-64 w-full pointer-events-none px-6 overflow-visible">
                      <path d="M 50 120 Q 150 70 250 100 T 450 60" fill="none" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
                    </svg>
                  </div>
                  <div className="flex justify-center gap-6 pt-2">
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <div className="w-3 h-3 bg-blue-600 rounded-sm"></div> 当月实际
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <div className="w-4 h-0.5 bg-blue-400 rounded-full"></div> 同期对比
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between border-l-4 border-blue-800 pl-3">
                    <span className="text-base font-bold text-gray-800">年度累计趋势</span>
                    <span className="text-xs text-gray-400">单位: 亿元 / %</span>
                  </div>
                  <div className="h-64 bg-gray-50/50 rounded-xl border border-gray-100 p-6 relative flex items-end justify-around">
                    {[150, 300, 480, 650].map((h, i) => (
                      <div key={i} className="flex flex-col items-center gap-3 w-12 group relative">
                        <div className="w-full bg-blue-800 rounded-t-sm shadow-sm opacity-90 group-hover:opacity-100 transition-opacity" style={{ height: `${(h/700)*100}%` }}></div>
                        <span className="text-[11px] font-medium text-gray-500 whitespace-nowrap">26年0{i+1}月</span>
                      </div>
                    ))}
                    <svg className="absolute inset-x-0 bottom-16 h-64 w-full pointer-events-none px-6 overflow-visible">
                      <path d="M 50 150 C 150 120, 300 100, 450 40" fill="none" stroke="#1e40af" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
                    </svg>
                  </div>
                  <div className="flex justify-center gap-6 pt-2">
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <div className="w-3 h-3 bg-blue-800 rounded-sm"></div> 累计实际
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <div className="w-4 h-0.5 bg-blue-600 rounded-full"></div> 累计同比
                    </div>
                  </div>
                </div>
              </div>

              {/* Table Data */}
              <div className="space-y-5">
                <div className="flex items-center gap-2 border-l-4 border-brand-blue pl-3">
                  <h4 className="text-base font-bold text-gray-800">多维指标分析数据表</h4>
                </div>
                <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-[#f8fafc] text-gray-500 font-bold border-b border-gray-100">
                      <tr>
                        <th className="px-6 py-4 font-bold">指标细分项</th>
                        <th className="px-6 py-4 font-bold text-center">01月</th>
                        <th className="px-6 py-4 font-bold text-center">02月</th>
                        <th className="px-6 py-4 font-bold text-center">03月</th>
                        <th className="px-6 py-4 font-bold text-center">04月 (当前)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-gray-700">
                      <tr className="hover:bg-blue-50/30 transition-colors">
                        <td className="px-6 py-4 font-bold text-gray-900 bg-gray-50/20">当月 {title} 实际</td>
                        <td className="px-6 py-4 text-center">195.51</td>
                        <td className="px-6 py-4 text-center">156.20</td>
                        <td className="px-6 py-4 text-center">174.19</td>
                        <td className="px-6 py-4 text-center font-bold text-blue-600">192.35</td>
                      </tr>
                      <tr className="hover:bg-blue-50/30 transition-colors">
                        <td className="px-6 py-4 font-bold text-gray-900 bg-gray-50/20">当月同比增长 (%)</td>
                        <td className="px-6 py-4 text-center text-green-600 font-bold">6.95 ↑</td>
                        <td className="px-6 py-4 text-center text-green-600 font-bold">28.95 ↑</td>
                        <td className="px-6 py-4 text-center text-green-600 font-bold">10.50 ↑</td>
                        <td className="px-6 py-4 text-center text-green-600 font-bold">12.30 ↑</td>
                      </tr>
                      <tr className="hover:bg-blue-50/30 transition-colors">
                        <td className="px-6 py-4 font-bold text-gray-900 bg-gray-50/20">年度累计 {title}</td>
                        <td className="px-6 py-4 text-center">195.51</td>
                        <td className="px-6 py-4 text-center">351.71</td>
                        <td className="px-6 py-4 text-center">525.90</td>
                        <td className="px-6 py-4 text-center font-bold text-blue-800">718.25</td>
                      </tr>
                      <tr className="hover:bg-blue-50/30 transition-colors">
                        <td className="px-6 py-4 font-bold text-gray-900 bg-gray-50/20">年度累计同比 (%)</td>
                        <td className="px-6 py-4 text-center text-green-600 font-bold">6.95 ↑</td>
                        <td className="px-6 py-4 text-center text-green-600 font-bold">15.72 ↑</td>
                        <td className="px-6 py-4 text-center text-green-600 font-bold">13.94 ↑</td>
                        <td className="px-6 py-4 text-center text-green-600 font-bold">14.20 ↑</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Extra spacing at bottom */}
              <div className="h-10"></div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-[#f8fafc] border-t border-gray-100 flex justify-end gap-3">
              <button 
                onClick={onClose}
                className="px-8 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 active:scale-95 transition-all shadow-sm"
              >
                关闭详情
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
