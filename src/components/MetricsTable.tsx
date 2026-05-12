import React from 'react';
import { HelpCircle, History, SignalHigh, Sun, Zap } from 'lucide-react';

interface MetricsTableProps {
  hideEmpty: boolean;
  viewMode?: 'district' | 'global';
  viewType?: 'module' | 'team';
  onDetailClick?: (title: string) => void;
  filters?: {
    module: string;
    dimension: string;
    type: string;
    light: string;
  };
}

export const tableData = [
  // 组效
  {
    module: '组效',
    dimension: '组织效率',
    items: [
      { type: '评价项', lightStatus: '黄灯', name: '人均创收(一二三线整体)', value: '4.17', time: '4月', status: 'orange', definition: '统计周期内，一二三线整体总收入除以平均在职人数。' },
      { type: '评价项', lightStatus: '绿灯', name: '人工成本占收入比(一二三线整体)', value: '92.5%', time: '4月', status: 'green', definition: '统计周期内，一二三线整体人工总成本除以同期总收入。' },
      { type: '评价项', lightStatus: '红灯', name: '不满4人小组数量', value: '12个', time: 'Q1', status: 'red', definition: '统计周期末，正式成员数量少于4人的独立运作小组总数。' },
    ]
  },
  {
    module: '组效',
    dimension: '薪酬竞争力',
    items: [
      { type: '评价项', lightStatus: '黄绿灯', name: '经营三线网点管理队伍薪酬竞争力', value: '3.50', time: '3月', status: 'green', definition: '通过外部调研及内部对标，评估经营三线网点管理层的薪酬市场分位。' },
      { type: '评价项', lightStatus: '红灯', name: '职能三线绩优员工薪酬竞争力', value: '2.73', time: '3月', status: 'red', definition: '针对职能三线绩效排名靠前的员工，对比同行业薪酬水平的竞争力指数。' },
      { type: '评价项', lightStatus: '绿灯', name: '一线收派薪酬竞争力', value: '4.20', time: '3月', status: 'green', definition: '评估一线收派员的基础及绩效总薪酬在当地快递市场的竞争水平。' },
    ]
  },
  {
    module: '组效',
    dimension: '价值贡献',
    items: [
      { type: '评价项', lightStatus: '红黄灯', name: '线上化人员覆盖率', value: '88.4%', time: '4月', status: 'orange', definition: '已实现线上化数字化系统覆盖的人员数量占应覆盖总人数的比例。' },
      { type: '评价项', lightStatus: '黄灯', name: '多元价值的应用率', value: '75.2%', time: 'Q1', status: 'orange', definition: '指人力资源多元价值管理模型在实际业务场景中的应用覆盖面。' },
    ]
  },
  // 人才
  {
    module: '人才',
    dimension: '生态建设',
    items: [
      { type: '评价项', lightStatus: '绿灯', name: '人才生态组织积分', value: '85', time: '4月', status: 'green', definition: '根据人才引进、培养、晋升及保留等环节综合评分。' },
      { type: '评价项', lightStatus: '绿灯', name: 'SCA认证完成率', value: '92.0%', time: 'Q1', status: 'green', definition: '通过SCA专业技能认证人数占应认证人数的百分比。' },
    ]
  },
  {
    module: '人才',
    dimension: '队伍建设',
    items: [
      { type: '评价项', lightStatus: '绿灯', name: '大学生队伍建设', value: '4.33', time: '4月', status: 'green', definition: '针对校招大学生及高学历人才在队伍中的留存与成长综合评价。' },
      { type: '评价项', lightStatus: '绿灯', name: '店经理高绩高潜人才占比', value: '15.4%', time: '4月', status: 'green', definition: '店经理层级中绩效评估为S/A且潜质评估高的人才占比。' },
      { type: '评价项', lightStatus: '黄灯', name: '专业队伍高绩高潜人才占比', value: '12.8%', time: 'Q1', status: 'orange', definition: '专业技术序列中绩效及潜力双优人才的比率。' },
      { type: '评价项', lightStatus: '绿灯', name: '绩优发展指数', value: '4.10', time: '4月', status: 'green', definition: '综合衡量绩优人才的晋升速度、职责扩大及跨序列发展的指数。' },
    ]
  },
  // 文关
  {
    module: '文关',
    dimension: '人员保有',
    items: [
      { type: '评价项', lightStatus: '红灯', name: '一线面客群体流失率', value: '4.5', time: '4月', status: 'red', definition: '周期内一线业务员、收派员因离职而流失的比例（按月折算）。' },
      { type: '评价项', lightStatus: '绿灯', name: '客户经理岗流失率', value: '1.2%', time: '4月', status: 'green', definition: '客户经理序列岗位的员工离职流失比率。' },
      { type: '评价项', lightStatus: '绿灯', name: '运作岗流失率', value: '2.4%', time: '4月', status: 'green', definition: '中转场、转运中心等运作类岗位的员工离职比例。' },
      { type: '评价项', lightStatus: '绿灯', name: '网点经营管理队伍稳定率', value: '98.5%', time: 'Q1', status: 'green', definition: '网点经理及以上管理层的留存稳定性评估（反向流失指标）。' },
      { type: '评价项', lightStatus: '绿灯', name: '职能三线绩优流失率', value: '0.8%', time: '4月', status: 'green', definition: '职能三线绩效S/A级员工的离职率，体现对核心人才的锁定能力。' },
      { type: '评价项', lightStatus: '绿灯', name: '转运三线绩优流失率', value: '1.5%', time: 'Q1', status: 'green', definition: '转运环节关键绩优人才的流失情况统计。' },
      { type: '监测项', lightStatus: '不亮灯', name: '仓管岗绩优主动流失率', value: '3.2%', time: '4月', status: 'orange', definition: '仓储管理岗位中绩优员工因个人原因主动提报离职的比例。' },
      { type: '监测项', lightStatus: '不亮灯', name: '司机岗主动流失率', value: '2.8%', time: 'Q1', status: 'green', definition: '重卡及支线司机主动离职的人数占比。' },
    ]
  },
  {
    module: '文关',
    dimension: '组织氛围',
    items: [
      { type: '监测项', lightStatus: '不亮灯', name: '文化入制程度', value: '95', time: '4月', status: 'green', definition: '核心文化理念进入制度及规章流程的转化率评估。' },
      { type: '监测项', lightStatus: '不亮灯', name: '文化重点工作落地', value: '88%', time: '4月', status: 'green', definition: '年度文化建设重点项目的实际执行及完成度结果。' },
      { type: '监测项', lightStatus: '不亮灯', name: '奖罚比', value: '1.2', time: 'Q1', status: 'green', definition: '统计周期内非负励占比与处罚占比的关系指标。' },
    ]
  },
  {
    module: '文关',
    dimension: '用工与风险',
    items: [
      { type: '监测项', lightStatus: '不亮灯', name: '人员风险健康度', value: '4.96', time: '4月', status: 'green', definition: '综合离职预警、劳动争议、合规用工等多个维度计算的健康分值。' },
      { type: '监测项', lightStatus: '不亮灯', name: '政策性人均收益', value: '1250', time: '4月', status: 'green', definition: '通过各项用工补贴、特殊岗优待等政策争取为人均带来的额外收益。' },
      { type: '监测项', lightStatus: '不亮灯', name: '政策性收益同比涨幅', value: '12.4%', time: 'Q1', status: 'green', definition: '较去年同期政策性落地收益的增长百分比。' },
      { type: '监测项', lightStatus: '不亮灯', name: '重点推进项目收益同比涨幅', value: '15.8%', time: '4月', status: 'green', definition: '关键人力资源改革项目产生的各维度收益同比增加额。' },
      { type: '监测项', lightStatus: '不亮灯', name: '残保金缴纳额', value: '24.5万', time: 'Q1', status: 'orange', definition: '实际缴纳的残疾人就业保障金金额统计。' },
      { type: '监测项', lightStatus: '不亮灯', name: '业务外包-非全(益+)各模式占比', value: '35%', time: '4月', status: 'green', definition: '当前非全日制及益+新模式用工在业务外包整体中的应用比例。' },
    ]
  }
];

export default function MetricsTable({ hideEmpty, onDetailClick, filters, viewType = 'module' }: MetricsTableProps) {
  // Apply filters to data
  const filteredData = tableData
    .map(moduleData => ({
      ...moduleData,
      items: moduleData.items.filter(item => {
        if (item.type === '监测项') return false;
        if (filters) {
          if (viewType === 'module') {
            if (filters.module !== '全部' && moduleData.module !== filters.module) return false;
            if (filters.dimension !== '全部' && moduleData.dimension !== filters.dimension) return false;
          } else {
            if (filters.module !== '全部' && getTeamName(moduleData.module) !== filters.module) return false;
            if (filters.dimension !== '全部' && getAssociatedGroup(moduleData.module) !== filters.dimension) return false;
          }
          if (filters.type !== '全部' && item.type !== filters.type) return false;
          if (filters.light !== '全部' && item.lightStatus !== filters.light) return false;
        }
        return true;
      })
    }))
    .filter(moduleData => moduleData.items.length > 0);

  // Helper to count total rows for a module to handle rowspan
  const getModuleSpan = (moduleName: string) => {
    return filteredData
      .filter(d => d.module === moduleName)
      .reduce((acc, curr) => acc + curr.items.length, 0);
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

  // Track which modules and dimensions have already rendered their rowspan cell
  const renderedModules = new Set<string>();
  const renderedDimensions = new Set<string>();

  const getLightStatusColor = (status: string) => {
    switch (status) {
      case '绿灯': return 'bg-success-green text-white';
      case '黄绿灯': return 'bg-emerald-400 text-white';
      case '黄灯': return 'bg-warning-yellow text-white';
      case '红黄灯': return 'bg-orange-400 text-white';
      case '红灯': return 'bg-danger-red text-white';
      default: return 'bg-gray-100 text-gray-400';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border-spacing-0 text-[11px] table-fixed">
        <thead>
          <tr className="bg-gray-100/80 text-gray-500 uppercase tracking-wider text-[10px]">
            {viewType === 'module' ? (
              <>
                <th rowSpan={2} className="px-3 py-3 border-r border-gray-200 font-bold w-[75px] text-center">模块</th>
                <th rowSpan={2} className="px-3 py-3 border-r border-gray-200 font-bold w-[95px] text-center">维度</th>
              </>
            ) : (
              <>
                <th rowSpan={2} className="px-3 py-3 border-r border-gray-200 font-bold w-[100px] text-center">队伍名称</th>
                <th rowSpan={2} className="px-3 py-3 border-r border-gray-200 font-bold w-[100px] text-center">关联群体</th>
              </>
            )}
            <th rowSpan={2} className="px-3 py-3 border-r border-gray-200 font-bold text-left w-[240px]">指标名称</th>
            <th rowSpan={2} className="px-3 py-3 border-r border-gray-200 font-bold w-[80px] text-center">取数时间</th>
            <th colSpan={2} className="px-3 py-2 border-r border-b border-gray-200 font-bold text-center">当前表现</th>
            <th colSpan={2} className="px-3 py-2 border-r border-b border-gray-200 font-bold text-center">对比三个月历史改善情况</th>
            <th colSpan={2} className="px-3 py-2 border-r border-b border-gray-200 font-bold text-center">对比组织</th>
            <th rowSpan={2} className="px-3 py-3 font-bold w-[80px] text-center">趋势</th>
          </tr>
          <tr className="bg-gray-100/80 text-gray-500 uppercase tracking-wider text-[10px]">
            <th className="px-3 py-2 border-r border-gray-200 font-bold w-[80px] text-right">结果值</th>
            <th className="px-3 py-2 border-r border-gray-200 font-bold w-[80px] text-center">亮灯结果</th>
            <th className="px-3 py-2 border-r border-gray-200 font-bold w-[80px] text-right">三个月前结果值</th>
            <th className="px-3 py-2 border-r border-gray-200 font-bold w-[80px] text-center">改善情况</th>
            <th className="px-3 py-2 border-r border-gray-200 font-bold w-[80px] text-right">同组均值</th>
            <th className="px-3 py-2 border-r border-gray-200 font-bold w-[80px] text-right">集团值</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {filteredData.flatMap((dim, dimIndex) => 
            dim.items.map((item, itemIndex) => {
              // Track rendered sets to handle rowspan correctly
              const isFirstInModule = !renderedModules.has(dim.module);
              if (isFirstInModule) renderedModules.add(dim.module);

              const isFirstInDimension = !renderedDimensions.has(dim.dimension);
              if (isFirstInDimension) renderedDimensions.add(dim.dimension);

              // Mock values for new columns
              const currentValue = parseFloat(item.value);
              const monthsAgoRaw = currentValue * (1 - (Math.random() * 0.1 - 0.05));
              const threeMonthsAgoVal = monthsAgoRaw.toFixed(2) + (item.value.includes('%') ? '%' : '');
              const isImproved = currentValue > monthsAgoRaw;
              const diffValue = Math.abs(currentValue - monthsAgoRaw).toFixed(2) + (item.value.includes('%') ? '%' : '');
              const groupAvg = (currentValue * (1 - (Math.random() * 0.05))).toFixed(2) + (item.value.includes('%') ? '%' : '');
              const groupCorpVal = (currentValue * (1 + (Math.random() * 0.05))).toFixed(2) + (item.value.includes('%') ? '%' : '');

              return (
                <tr key={`${dim.module}-${dim.dimension}-${item.name}-${itemIndex}`} className="divide-x divide-gray-100 hover:bg-blue-50/20 transition-colors text-gray-700">
                  {viewType === 'module' ? (
                    <>
                      {isFirstInModule && (
                        <td 
                          className="px-3 py-4 text-center align-middle font-bold bg-gray-50/10 text-gray-900 border-r border-gray-100" 
                          rowSpan={getModuleSpan(dim.module)}
                        >
                          {dim.module}
                        </td>
                      )}
                      {isFirstInDimension && (
                        <td 
                          className="px-3 py-4 text-center align-middle font-medium border-r border-gray-100" 
                          rowSpan={dim.items.length}
                        >
                          <div className="break-words w-full px-1">{dim.dimension}</div>
                        </td>
                      )}
                    </>
                  ) : (
                    <>
                      {isFirstInModule && (
                        <td 
                          className="px-3 py-4 text-center align-middle font-bold bg-gray-50/10 text-gray-900 border-r border-gray-100" 
                          rowSpan={getModuleSpan(dim.module)}
                        >
                          {getTeamName(dim.module)}
                        </td>
                      )}
                      {isFirstInModule && (
                        <td 
                          className="px-3 py-4 text-center align-middle font-medium border-r border-gray-100" 
                          rowSpan={getModuleSpan(dim.module)}
                        >
                          <div className="break-words w-full px-1">{getAssociatedGroup(dim.module)}</div>
                        </td>
                      )}
                    </>
                  )}
                  <td className="px-3 py-3 border-r border-gray-100">
                    <div className="flex items-center gap-1.5 overflow-visible">
                      <span className="leading-relaxed break-words line-clamp-2">{item.name}</span>
                      <div className="relative group flex-shrink-0">
                        <HelpCircle className="w-3.5 h-3.5 text-gray-300 cursor-help" />
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 hidden group-hover:block z-50 w-[420px] p-5 bg-white text-gray-800 text-[11px] rounded-lg shadow-2xl border border-gray-100 pointer-events-none">
                          <div className="text-sm font-black mb-3 text-gray-900 border-b border-gray-100 pb-2">指标口径</div>
                          <div className="space-y-2.5">
                            <div className="grid grid-cols-12 gap-1 align-start">
                              <span className="col-span-3 text-gray-400">所属科室:</span>
                              <span className="col-span-9 font-medium">人才生态与供应链处</span>
                            </div>
                            <div className="grid grid-cols-12 gap-1 align-start">
                              <span className="col-span-3 text-gray-400">业务Owner:</span>
                              <span className="col-span-9 font-medium">刘艳 / 方丽涵</span>
                            </div>
                            <div className="grid grid-cols-12 gap-1 align-start">
                              <span className="col-span-3 text-gray-400">来源方式:</span>
                              <span className="col-span-9 font-medium">系统自动计算 / 线下提供数据</span>
                            </div>
                            <div className="grid grid-cols-12 gap-1 align-start">
                              <span className="col-span-3 text-gray-400">业务说明:</span>
                              <span className="col-span-9 font-medium">反映{item.name}在统计周期内的效能表现及资源利用率。</span>
                            </div>
                            <div className="grid grid-cols-12 gap-1 align-start">
                              <span className="col-span-3 text-gray-400">指标口径:</span>
                              <span className="col-span-9 font-medium leading-relaxed text-xs">
                                {item.definition || '根据业务需求定义的标准化计算指标。'}
                                <br />
                                <span className="text-gray-400 block mt-2 text-[10px]">剔除岗位：不含区总、储备网点负责人、储备中转场负责人等。</span>
                                <span className="text-gray-400 block text-[10px]">时间周期：单季度内累计，如1-3月，4-6月。</span>
                              </span>
                            </div>
                          </div>
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white drop-shadow-sm"></div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-center font-medium text-gray-500 border-r border-gray-100">
                    {item.time}
                  </td>
                  <td className="px-3 py-3 text-right font-black border-r border-gray-100 text-gray-900">
                    {item.value}
                  </td>
                  <td className="px-3 py-3 text-center border-r border-gray-100">
                    <span className={`px-2 py-0.5 rounded-[2px] text-[10px] font-medium min-w-[56px] inline-block shadow-sm ${getLightStatusColor(item.lightStatus)}`}>
                      {item.lightStatus}
                    </span>
                  </td>
                  {/* Historical columns */}
                  <td className="px-3 py-3 text-right text-gray-500 border-r border-gray-100">
                    {threeMonthsAgoVal}
                  </td>
                  <td className={`px-3 py-3 text-center border-r border-gray-100`}>
                    <div className={`flex flex-col items-center justify-center font-bold ${isImproved ? 'text-green-600' : 'text-red-500'}`}>
                      <span>{isImproved ? '改善' : '恶化'}</span>
                      <span className="text-[9px] font-medium opacity-80">{isImproved ? '+' : '-'}{diffValue}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-right font-medium text-gray-900 border-r border-gray-100">
                    {groupAvg}
                  </td>
                  <td className="px-3 py-3 text-right font-medium text-gray-900 border-r border-gray-100">
                    {groupCorpVal}
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span 
                      onClick={() => onDetailClick?.(item.name)}
                      className="text-brand-blue cursor-pointer hover:text-blue-800 flex items-center justify-center gap-1.5 font-medium group"
                    >
                      <History className="w-3.5 h-3.5 group-hover:rotate-[-45deg] transition-transform" /> 
                      <span className="group-hover:underline">详情</span>
                    </span>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      
      {/* Table Footer / Pagination or legend might go here */}
      <div className="p-4 bg-gray-50 flex items-center justify-between border-t border-gray-200">
        <div className="flex items-center gap-6">
          {/* Legend removed per user request */}
        </div>
        <div className="flex items-center gap-4 text-gray-400">
           <span className="text-[10px]">显示 1 到 10 条，共 45 条数据</span>
        </div>
      </div>
    </div>
  );
}
