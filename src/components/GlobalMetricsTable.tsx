import React from 'react';
import { History, Search, Layout } from 'lucide-react';

const globalTableData = [
  {
    module: '组效',
    dimension: '组织效率',
    items: [
      { name: '人均创收(一二三线整体)', type: '评价项', time: '4月', avg: '4.17', green: '38.64', yellowGreen: '18.18', yellow: '11.36', orange: '20.00', red: '11.82', org: '速运广佛区、速运上海区' },
      { name: '人工成本占收入比(一二三线整体)', type: '评价项', time: '4月', avg: '92.5%', green: '45.00', yellowGreen: '20.00', yellow: '15.00', orange: '10.00', red: '10.00', org: '速运福建区、速运浙北区' },
      { name: '不满4人小组数量', type: '评价项', time: 'Q1', avg: '12个', green: '30.00', yellowGreen: '15.00', yellow: '20.00', orange: '15.00', red: '20.00', org: '华南分拨区、华北分拨区' },
    ]
  },
  {
    module: '组效',
    dimension: '薪酬竞争力',
    items: [
      { name: '经营三线网点管理队伍薪酬竞争力', type: '评价项', time: '3月', avg: '3.50', green: '42.00', yellowGreen: '25.00', yellow: '10.00', orange: '15.00', red: '8.00', org: '速运苏中区、速运河南区' },
      { name: '职能三线绩优员工薪酬竞争力', type: '评价项', time: '3月', avg: '2.73', green: '20.00', yellowGreen: '10.00', yellow: '20.00', orange: '20.00', red: '30.00', org: '华西分拨区' },
      { name: '一线收派薪酬竞争力', type: '评价项', time: '3月', avg: '4.20', green: '50.00', yellowGreen: '10.00', yellow: '15.00', orange: '15.00', red: '10.00', org: '鄂枢分拨区、速运上海区' },
    ]
  },
  {
    module: '组效',
    dimension: '价值贡献',
    items: [
      { name: '线上化人员覆盖率', type: '评价项', time: '4月', avg: '88.4%', green: '40.00', yellowGreen: '20.00', yellow: '15.00', orange: '15.00', red: '10.00', org: '速运内蒙古区' },
      { name: '多元价值的应用率', type: '评价项', time: 'Q1', avg: '75.2%', green: '35.00', yellowGreen: '15.00', yellow: '25.00', orange: '15.00', red: '10.00', org: '华东分拨区' },
    ]
  },
  {
    module: '人才',
    dimension: '生态建设',
    items: [
      { name: '人才生态组织积分', type: '评价项', time: '4月', avg: '85', green: '32.00', yellowGreen: '23.00', yellow: '15.00', orange: '15.00', red: '15.00', org: '速运广佛区' },
      { name: 'SCA认证完成率', type: '评价项', time: 'Q1', avg: '92.0%', green: '40.00', yellowGreen: '20.00', yellow: '10.00', orange: '20.00', red: '10.00', org: '速运上海区' },
    ]
  },
  {
    module: '人才',
    dimension: '队伍建设',
    items: [
      { name: '大学生队伍建设', type: '评价项', time: '4月', avg: '4.33', green: '35.00', yellowGreen: '20.00', yellow: '15.00', orange: '15.00', red: '15.00', org: '速运河南区' },
      { name: '店经理高绩高潜人才占比', type: '评价项', time: '4月', avg: '15.4%', green: '28.00', yellowGreen: '22.00', yellow: '25.00', orange: '10.00', red: '15.00', org: '速运福建区' },
      { name: '专业队伍高绩高潜人才占比', type: '评价项', time: 'Q1', avg: '12.8%', green: '30.00', yellowGreen: '20.00', yellow: '20.00', orange: '15.00', red: '15.00', org: '华南分拨区' },
      { name: '绩优发展指数', type: '评价项', time: '4月', avg: '4.10', green: '35.00', yellowGreen: '25.00', yellow: '15.00', orange: '15.00', red: '10.00', org: '速运上海区' },
    ]
  },
  {
    module: '文关',
    dimension: '人员保有',
    items: [
      { name: '一线面客群体流失率', type: '评价项', time: '4月', avg: '4.5%', green: '25.00', yellowGreen: '15.00', yellow: '20.00', orange: '20.00', red: '20.00', org: '华北分拨区' },
      { name: '客户经理岗流失率', type: '评价项', time: '4月', avg: '1.2%', green: '45.00', yellowGreen: '25.00', yellow: '15.00', orange: '10.00', red: '5.00', org: '速运浙北区' },
      { name: '运作岗流失率', type: '评价项', time: '4月', avg: '2.4%', green: '50.00', yellowGreen: '20.00', yellow: '15.00', orange: '10.00', red: '5.00', org: '华东分拨区' },
      { name: '网点经营管理队伍稳定率', type: '评价项', time: 'Q1', avg: '98.5%', green: '60.00', yellowGreen: '10.00', yellow: '10.00', orange: '10.00', red: '10.00', org: '华西分拨区' },
      { name: '职能三线绩优流失率', type: '评价项', time: '4月', avg: '0.8%', green: '65.00', yellowGreen: '15.00', yellow: '10.00', orange: '5.00', red: '5.00', org: '速运广佛区' },
    ]
  },
  {
    module: '文关',
    dimension: '组织氛围',
    items: [
      { name: '奖罚比', type: '监测项', time: 'Q1', avg: '1.2', green: '40.00', yellowGreen: '20.00', yellow: '20.00', orange: '10.00', red: '10.00', org: '速运上海区' },
    ]
  },
  {
    module: '文关',
    dimension: '用工与风险',
    items: [
      { name: '人员风险健康度', type: '监测项', time: '4月', avg: '4.96', green: '48.00', yellowGreen: '15.00', yellow: '12.00', orange: '15.00', red: '10.00', org: '鄂枢分拨区' },
      { name: '政策性人均收益', type: '监测项', time: '4月', avg: '1250', green: '35.00', yellowGreen: '25.00', yellow: '20.00', orange: '10.00', red: '10.00', org: '速运浙北区' },
    ]
  }
];

export default function GlobalMetricsTable({ filters, viewType = 'module' }: { filters?: any, viewType?: 'module' | 'team' }) {
  // Apply filters
  const filteredData = globalTableData
    .map(mod => ({
      ...mod,
      items: mod.items.filter(item => {
        if (item.type === '监测项') return false;
        if (!filters) return true;
        
        if (viewType === 'module') {
          if (filters.module !== '全部' && mod.module !== filters.module) return false;
          if (filters.dimension !== '全部' && mod.dimension !== filters.dimension) return false;
        } else {
          // In team view, 'module' filter carries team name, 'dimension' filter carries group name
          if (filters.module !== '全部' && getTeamName(mod.module) !== filters.module) return false;
          if (filters.dimension !== '全部' && getAssociatedGroup(mod.module) !== filters.dimension) return false;
        }
        
        if (filters.type && filters.type !== '全部' && item.type !== filters.type) return false;
        
        return true;
      })
    }))
    .filter(mod => mod.items.length > 0);

  // Re-group if viewing by team
  const displayData = viewType === 'module' 
    ? filteredData 
    : (() => {
        const teamGroups: Record<string, any> = {};
        filteredData.forEach(mod => {
          const teamName = getTeamName(mod.module);
          if (!teamGroups[teamName]) {
            teamGroups[teamName] = { module: teamName, items: [] };
          }
          teamGroups[teamName].items.push(...mod.items.map(i => ({ 
            ...i, 
            originalModule: mod.module,
            associatedGroup: getAssociatedGroup(mod.module)
          })));
        });
        return Object.values(teamGroups);
      })();

  const getModuleSpan = (moduleName: string) => {
    return displayData
      .filter(d => d.module === moduleName)
      .reduce((acc, curr) => acc + curr.items.length, 0);
  };

  const renderedModules = new Set<string>();

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border-spacing-0 text-[11px] table-fixed min-w-[1200px]">
        <thead>
          <tr className="bg-gray-100 text-gray-500 border-b border-gray-200">
            <th className="px-3 py-2 border-r border-gray-200 font-bold text-left w-[80px]">
              {viewType === 'module' ? '模块名称' : '队伍名称'}
            </th>
            <th className="px-3 py-2 border-r border-gray-200 font-bold text-left w-[110px]">
              {viewType === 'module' ? '维度' : '关联群体'}
            </th>
            <th className="px-3 py-2 border-r border-gray-200 font-bold text-left min-w-[200px]">指标名称</th>
            <th className="px-3 py-2 border-r border-gray-200 font-bold text-center w-[75px]">取数时间</th>
            <th className="px-3 py-2 border-r border-gray-200 font-bold text-center w-[100px]">地区整体均值</th>
            <th className="px-2 py-2 border-r border-gray-200 font-bold text-center bg-green-50/50 w-[92px] text-success-green">绿灯占比(%)</th>
            <th className="px-2 py-2 border-r border-gray-200 font-bold text-center bg-emerald-50/30 w-[92px] text-emerald-600">黄绿灯占比(%)</th>
            <th className="px-2 py-2 border-r border-gray-200 font-bold text-center bg-yellow-50/50 w-[92px] text-warning-yellow">黄灯占比(%)</th>
            <th className="px-2 py-2 border-r border-gray-200 font-bold text-center bg-orange-50/50 w-[92px] text-orange-500">红黄灯占比(%)</th>
            <th className="px-2 py-2 border-r border-gray-200 font-bold text-center bg-red-50/50 w-[92px] text-danger-red">红灯占比(%)</th>
            <th className="px-3 py-2 border-r border-gray-200 font-bold text-center w-[130px]">红灯组织</th>
            <th className="px-3 py-2 font-bold text-center w-[85px] whitespace-nowrap">关联报表</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {displayData.flatMap((mod, modIdx) => (
            mod.items.map((item, itemIdx) => {
              const isFirstInModule = !renderedModules.has(mod.module);
              if (isFirstInModule) renderedModules.add(mod.module);

              return (
                <tr key={`${mod.module}-${item.originalModule || mod.dimension}-${item.name}`} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  {isFirstInModule && itemIdx === 0 && (
                    <td 
                      rowSpan={getModuleSpan(mod.module)} 
                      className="px-3 py-2 border-r border-gray-200 font-bold text-gray-900 align-middle bg-gray-50/30 text-center"
                    >
                      {mod.module}
                    </td>
                  )}
                  {viewType === 'module' ? (
                    itemIdx === 0 && (
                      <td 
                        rowSpan={mod.items.length} 
                        className="px-3 py-2 border-r border-gray-200 text-gray-700 font-medium align-middle text-center"
                      >
                        {mod.dimension}
                      </td>
                    )
                  ) : (
                    itemIdx === 0 && (
                      <td 
                        rowSpan={mod.items.length} 
                        className="px-3 py-2 border-r border-gray-200 text-gray-700 font-medium align-middle text-center"
                        style={{ 
                          // Finding how many items belong to the same associated group within this team group is complex
                          // But in displayData construction I can grouping further if needed.
                          // For simplicity, showing associated group for each indicator if they differ,
                          // or simplify the aggregation. In MetricsTable they used getAssociatedGroup(dim.module).
                        }}
                      >
                        {item.associatedGroup}
                      </td>
                    )
                  )}
                  <td className="px-3 py-2 border-r border-gray-200 text-gray-700 font-medium">{item.name}</td>
                  <td className="px-3 py-2 border-r border-gray-200 text-center text-gray-500">{item.time}</td>
                  <td className="px-3 py-2 border-r border-gray-200 text-center font-black text-gray-900">{item.avg}</td>
                  <td className={`px-3 py-2 border-r border-gray-200 text-center font-bold bg-green-50/10 ${parseFloat(item.green) >= 60 ? 'text-success-green' : 'text-gray-900'}`}>{item.green}%</td>
                  <td className="px-3 py-2 border-r border-gray-200 text-center text-gray-900 font-bold bg-emerald-50/10">{item.yellowGreen}%</td>
                  <td className="px-3 py-2 border-r border-gray-200 text-center text-gray-900 font-bold bg-yellow-50/10">{item.yellow}%</td>
                  <td className="px-3 py-2 border-r border-gray-200 text-center text-gray-900 font-bold bg-orange-50/10">{item.orange}%</td>
                  <td className={`px-3 py-2 border-r border-gray-200 text-center font-bold bg-red-50/10 ${parseFloat(item.red) >= 20 ? 'text-danger-red' : 'text-gray-900'}`}>{item.red}%</td>
                  <td className="px-3 py-2 border-r border-gray-200 text-center text-gray-500">{item.org}</td>
                  <td className="px-3 py-2 text-center text-brand-blue cursor-pointer hover:font-bold">
                    <div className="flex items-center justify-center gap-1.5 font-bold">
                      <Layout className="w-3.5 h-3.5" />
                      <span>查看</span>
                    </div>
                  </td>
                </tr>
              );
            })
          ))}
        </tbody>
      </table>
      
      <div className="p-4 bg-gray-50 flex items-center justify-end border-t border-gray-200">
        <div className="flex items-center gap-4 text-gray-400">
           <span className="text-[10px]">共 {displayData.reduce((acc, curr) => acc + curr.items.length, 0)} 条数据</span>
        </div>
      </div>
    </div>
  );
}

// Helpers
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
