import React from 'react';
import { motion } from 'motion/react';
import { AlertCircle, Star } from 'lucide-react';

const keyEventsData = [
  {
    org: '速运福建区',
    name: '王斌',
    position: '人力资源部负责人',
    tenure: '0.83',
    category: '集团人资项目参与',
    content: '灵渠项目、丰云再启项目、人资工作诊断项目、聚力攻坚项目、知识场景共创项目、全网大型活动、自驱发展与人才标签等',
    rule: '参与1次+0.05分（上限不超过0.3分）',
    weight: '加分项',
    source: 'CHO办公室',
    score: 0.25
  },
  { org: '速运浙北区', name: '刘杏叶', position: '人力资源部负责人', tenure: '2.15', category: '项目参与', content: '灵渠项目二期核心组', rule: '+0.1', weight: '加分', source: '集团项目组', score: 0.1 },
  { org: '速运上海区', name: '郑国英', position: '人力资源部负责人', tenure: '5.53', category: '管理创新', content: '超级网点赋能试点', rule: '+0.2', weight: '加分', source: '上海区经委', score: 0.2 },
  { org: '速运广佛区', name: '宋文婷', position: '人力资源部负责人', tenure: '5.34', category: '数字化建设', content: '区部HR系统优化模板被全网采纳', rule: '+0.25', weight: '加分', source: '人资数字化办', score: 0.25 },
  { org: '速运河南区', name: '李军伟', position: '人力资源部负责人', tenure: '4.90', category: '劳动关系', content: '连续三年零重大风险案件', rule: '+0.2', weight: '加分', source: '风控办', score: 0.2 },
  { org: '速运苏中区', name: '吴伟琴', position: '人力资源部负责人', tenure: '3.14', category: '技能竞赛', content: '全区技能大赛组织圆满', rule: '+0.15', weight: '加分', source: '培训中心', score: 0.15 },
  { org: '速运内蒙古区', name: '樊亮', position: '人力资源部负责人', tenure: '4.31', category: '行业荣誉', content: '内蒙古优秀HR管理奖', rule: '+0.2', weight: '加分', source: '自治区人社厅', score: 0.2 },
  {
    org: '华西分拨区',
    name: '王志刚',
    position: '人力资源部负责人',
    tenure: '1.31',
    category: '组织氛围',
    content: '2025年度组织氛围调研结果位列分拨区前三',
    rule: '+0.2分',
    weight: '加减分项',
    source: '文化与员工关系处',
    score: 0.20
  },
  {
    org: '华西分拨区',
    name: '王志刚',
    position: '人力资源部负责人',
    tenure: '1.31',
    category: '行业奖项',
    content: '获得省级先进物流集体称号',
    rule: '加0.5分',
    weight: '加分项',
    source: '政务平台',
    score: 0.30
  },
  {
    org: '华东分拨区',
    name: '阙枫',
    position: '人力资源部负责人',
    tenure: '4.00',
    category: '集团项目参与',
    content: '灵渠项目核心贡献者',
    rule: '+0.1分',
    weight: '加分项',
    source: 'CHO办公室',
    score: 0.10
  },
  {
    org: '华南分拨区',
    name: '陈美',
    position: '人力资源部负责人',
    tenure: '2.28',
    category: '管理创新',
    content: '末端网点薪酬弹性化方案试点成功',
    rule: '+0.15',
    weight: '加分项',
    source: '华南枢纽',
    score: 0.15
  },
  {
    org: '鄂枢分拨区',
    name: '刘勇',
    position: '人力资源部负责人',
    tenure: '1.12',
    category: '荣誉奖项',
    content: '获得鄂州基地年度先锋个人称号',
    rule: '+0.2',
    weight: '加分项',
    source: '事业部',
    score: 0.20
  },
  {
    org: '华北分拨区',
    name: '王强',
    position: '人力资源部负责人',
    tenure: '4.48',
    category: '数字化应用',
    content: '全区HR报表自动化率达95%',
    rule: '+0.1',
    weight: '加分项',
    source: '共享中心',
    score: 0.10
  },
  {
    org: 'M线',
    name: '贺芳',
    position: '人力资源BP高级经理',
    tenure: '0.69',
    category: '管理创新',
    content: '职能效率优化方案被集团采纳',
    rule: '加0.3分',
    weight: '加分项',
    source: 'CHO办公室',
    score: 0.30
  },
  {
    org: '仓储',
    name: '邓霞',
    position: '办公室负责人',
    tenure: '0.30',
    category: '重大项目',
    content: '华中智慧仓储投产如期交付',
    rule: '加0.4分',
    weight: '加分项',
    source: 'BU总办',
    score: 0.40
  },
  {
    org: '数智供应链',
    name: '柴阳',
    position: '人力资源处代理负责人',
    tenure: '0.08',
    category: '高端人才引进',
    content: '成功引进行业专家级人才3名',
    rule: '每名加0.1分',
    weight: '加分项',
    source: '招聘处',
    score: 0.30
  }
];

interface KeyEventsModuleProps {
  restrictedOrg?: string;
}

export default function KeyEventsModule({ restrictedOrg }: KeyEventsModuleProps) {
  const [selectedOrgFilter, setSelectedOrgFilter] = React.useState('全部');

  // Specified lists for overall views
  const businessDistricts = ['速运浙北区', '速运广佛区', '速运苏中区', '速运河南区', '速运内蒙古区', '速运上海区', '速运福建区'];
  const sortingCenters = ['华东分拨区', '华南分拨区', '鄂枢分拨区', '华北分拨区', '华西分拨区'];

  // Sync selectedOrgFilter if restrictedOrg changes
  React.useEffect(() => {
    if (restrictedOrg) {
      if (restrictedOrg.includes('整体')) {
        setSelectedOrgFilter('全部');
      } else {
        setSelectedOrgFilter(restrictedOrg);
      }
    } else {
      setSelectedOrgFilter('全部');
    }
  }, [restrictedOrg]);

  const filteredData = React.useMemo(() => {
    let data = keyEventsData;

    if (restrictedOrg && !restrictedOrg.includes('整体')) {
      data = keyEventsData.filter(item => item.org === restrictedOrg);
    } else if (restrictedOrg === '业务区整体') {
      data = keyEventsData.filter(item => businessDistricts.includes(item.org));
    } else if (restrictedOrg === '分拨区整体') {
      data = keyEventsData.filter(item => sortingCenters.includes(item.org));
    }

    if (selectedOrgFilter !== '全部' && (!restrictedOrg || restrictedOrg.includes('整体'))) {
      data = data.filter(item => item.org === selectedOrgFilter);
    }

    return data;
  }, [restrictedOrg, selectedOrgFilter]);

  // Update local filter options based on filtered view
  const orgOptions = React.useMemo(() => {
    const baseData = restrictedOrg === '业务区整体' 
      ? keyEventsData.filter(i => businessDistricts.includes(i.org))
      : restrictedOrg === '分拨区整体'
        ? keyEventsData.filter(i => sortingCenters.includes(i.org))
        : keyEventsData;
    
    return ['全部', ...new Set(baseData.map(item => item.org))];
  }, [restrictedOrg]);

  const totalScore = (filteredData.reduce((acc, curr) => acc + curr.score, 0)).toFixed(2);

  const getRowSpans = (data: any[], key: string) => {
    const spans: number[] = [];
    let currentSpan = 0;
    for (let i = 0; i < data.length; i++) {
      if (i > 0 && data[i][key] === data[i - 1][key] && data[i].name === data[i-1].name) {
        spans.push(0);
        spans[currentSpan]++;
      } else {
        spans.push(1);
        currentSpan = i;
      }
    }
    return spans;
  };

  const orgSpans = getRowSpans(filteredData, 'org');

  return (
    <div className="space-y-4 pt-6 border-t border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-6 bg-orange-500 rounded-full"></div>
          <h2 className="text-lg font-bold text-gray-800 tracking-tight">关键事件</h2>
          <span className="text-[10px] text-gray-400 font-normal ml-2">（该模块仅人力资源部负责人可见）</span>
        </div>

        <div className="flex items-center gap-2 bg-gray-100/80 rounded-lg px-3 py-1.5 border border-gray-200">
          <span className="text-xs text-gray-500 font-bold">组织筛选:</span>
          <select 
            className="text-xs bg-transparent border-none focus:ring-0 text-gray-700 font-medium cursor-pointer"
            value={selectedOrgFilter}
            onChange={(e) => setSelectedOrgFilter(e.target.value)}
          >
            {orgOptions.map(org => (
              <option key={org} value={org}>{org}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full border-collapse border-spacing-0 text-[11px] table-fixed">
          <thead>
            <tr className="bg-gray-100/80 text-gray-500 border-b border-gray-200">
              <th className="px-4 py-3 font-bold text-left w-[110px]">组织</th>
              <th className="px-4 py-3 font-bold text-center w-[70px]">姓名</th>
              <th className="px-4 py-3 font-bold text-left w-[120px]">职位</th>
              <th className="px-4 py-3 font-bold text-center w-[80px]">岗龄(任期)</th>
              <th className="px-4 py-3 font-bold text-left w-[120px]">考评项</th>
              <th className="px-4 py-3 font-bold text-left">考评内容</th>
              <th className="px-4 py-3 font-bold text-center w-[150px]">赋分规则</th>
              <th className="px-4 py-3 font-bold text-center w-[80px]">赋分权重</th>
              <th className="px-4 py-3 font-bold text-left w-[130px]">数据来源</th>
              <th className="px-4 py-3 font-bold text-center w-[80px] bg-orange-50/50 text-orange-600">得分</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredData.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                {orgSpans[idx] > 0 && (
                  <>
                    <td rowSpan={orgSpans[idx]} className="px-4 py-3 font-bold text-gray-800 border-r border-gray-100 align-middle text-center bg-white">{item.org}</td>
                    <td rowSpan={orgSpans[idx]} className="px-4 py-3 text-center text-gray-700 border-r border-gray-100 align-middle bg-white">{item.name}</td>
                    <td rowSpan={orgSpans[idx]} className="px-4 py-3 text-gray-500 border-r border-gray-100 align-middle text-center bg-white">{item.position}</td>
                    <td rowSpan={orgSpans[idx]} className="px-4 py-3 text-center text-gray-500 font-mono border-r border-gray-100 align-middle bg-white">{item.tenure}</td>
                  </>
                )}
                <td className="px-4 py-3 font-bold text-gray-800">{item.category}</td>
                <td className="px-4 py-3 text-gray-600 leading-relaxed text-[10px]">{item.content}</td>
                <td className="px-4 py-3 text-center text-gray-600">{item.rule}</td>
                <td className="px-4 py-3 text-center text-gray-600">{item.weight}</td>
                <td className="px-4 py-3 text-gray-500">{item.source}</td>
                <td className={`px-4 py-3 text-center font-black bg-orange-50/10 ${item.score >= 0 ? 'text-success-green' : 'text-danger-red'}`}>
                  {item.score > 0 ? `+${item.score.toFixed(2)}` : item.score.toFixed(2)}
                </td>
              </tr>
            ))}
            {filteredData.length > 0 ? (
              <tr className="bg-gray-50/30">
                <td colSpan={9} className="px-4 py-3 text-right font-bold text-gray-500">关键事件累计得分:</td>
                <td className={`px-4 py-3 text-center font-black text-lg bg-orange-50/30 ${parseFloat(totalScore) >= 0 ? 'text-orange-600' : 'text-danger-red'}`}>
                  {parseFloat(totalScore) > 0 ? `+${totalScore}` : totalScore}
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan={10} className="px-4 py-10 text-center text-gray-400 italic">暂无匹配的组织数据</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
