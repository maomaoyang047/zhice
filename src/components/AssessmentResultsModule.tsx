import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { UserCircle, Trophy, ChevronDown, Search } from 'lucide-react';

const assessmentData = [
  {
    org: 'M线',
    id: '00083561',
    name: '贺芳',
    position: '人力资源BP高级经理',
    startDate: '2025/8/16',
    tenure: '0.69',
    scores: {
      operational: { total: 0, revenue: 0, profit: 0 },
      professional: { total: 4.9, metrics: 4.9, delivery: 4.9 },
      collaborative: { total: 4.6, business: 0, frontline: 0, subordinate: 4.8, coe: 4.4 },
      keyEvents: { total: 0.3, hrProject: 0.2, atmosphere: 0.1, risk: 0 }
    },
    rank: 1
  },
  {
    org: '仓储',
    id: '00155119',
    name: '邓霞',
    position: '办公室负责人',
    startDate: '2026/1/5',
    tenure: '0.30',
    scores: {
      operational: { total: 0, revenue: 0, profit: 0 },
      professional: { total: 4.2, metrics: 4.1, delivery: 4.3 },
      collaborative: { total: 4.3, business: 0, frontline: 4.2, subordinate: 4.4, coe: 4.3 },
      keyEvents: { total: 0.4, hrProject: 0.2, atmosphere: 0.2, risk: 0 }
    },
    rank: 5
  },
  {
    org: '供应链',
    id: '00170105',
    name: '柴阳',
    position: '人力资源处代理负责人',
    startDate: '2026/3/26',
    tenure: '0.08',
    scores: {
      operational: { total: 0, revenue: 0, profit: 0 },
      professional: { total: 4.7, metrics: 4.6, delivery: 4.8 },
      collaborative: { total: 4.5, business: 0, frontline: 4.3, subordinate: 4.6, coe: 4.5 },
      keyEvents: { total: 0.3, hrProject: 0.1, atmosphere: 0.1, risk: 0 }
    },
    rank: 2
  },
  {
    org: '速运浙北区',
    id: '00174760',
    name: '刘杏叶',
    position: '人力资源部负责人',
    startDate: '2024/3/1',
    tenure: '2.15',
    scores: {
      operational: { total: 4.2, revenue: 4.5, profit: 4.0 },
      professional: { total: 4.4, metrics: 4.2, delivery: 4.6 },
      collaborative: { total: 4.4, business: 4.2, frontline: 4.3, subordinate: 4.6, coe: 4.5 },
      keyEvents: { total: 0.15, hrProject: 0.1, atmosphere: 0.15, risk: -0.1 }
    }
  },
  {
    org: '速运上海区',
    id: '00001939',
    name: '郑国英',
    position: '人力资源部负责人',
    startDate: '2020/10/15',
    tenure: '5.53',
    scores: {
      operational: { total: 4.5, revenue: 4.7, profit: 4.3 },
      professional: { total: 4.6, metrics: 4.5, delivery: 4.7 },
      collaborative: { total: 4.7, business: 4.6, frontline: 4.5, subordinate: 4.8, coe: 4.6 },
      keyEvents: { total: 0.2, hrProject: 0.1, atmosphere: 0.1, risk: 0 }
    }
  },
  {
    org: '速运广佛区',
    id: '00270618',
    name: '宋文婷',
    position: '人力资源部负责人',
    startDate: '2020/12/21',
    tenure: '5.34',
    scores: {
      operational: { total: 4.5, revenue: 4.6, profit: 4.4 },
      professional: { total: 4.7, metrics: 4.8, delivery: 4.6 },
      collaborative: { total: 4.5, business: 4.4, frontline: 4.5, subordinate: 4.6, coe: 4.5 },
      keyEvents: { total: 0.25, hrProject: 0.2, atmosphere: 0.05, risk: 0 }
    }
  },
  {
    org: '速运苏中区',
    id: '00090504',
    name: '吴伟琴',
    position: '人力资源部负责人',
    startDate: '2023/3/4',
    tenure: '3.14',
    scores: {
      operational: { total: 4.5, revenue: 4.4, profit: 4.6 },
      professional: { total: 4.7, metrics: 4.6, delivery: 4.8 },
      collaborative: { total: 4.6, business: 4.5, frontline: 4.6, subordinate: 4.7, coe: 4.6 },
      keyEvents: { total: 0.15, hrProject: 0.1, atmosphere: 0.05, risk: 0 }
    }
  },
  {
    org: '速运河南区',
    id: '00017394',
    name: '李军伟',
    position: '人力资源部负责人',
    startDate: '2021/6/2',
    tenure: '4.90',
    scores: {
      operational: { total: 4.4, revenue: 4.5, profit: 4.3 },
      professional: { total: 4.6, metrics: 4.5, delivery: 4.7 },
      collaborative: { total: 4.5, business: 4.4, frontline: 4.5, subordinate: 4.6, coe: 4.5 },
      keyEvents: { total: 0.2, hrProject: 0.1, atmosphere: 0.1, risk: 0 }
    }
  },
  {
    org: '速运内蒙古区',
    id: '00223591',
    name: '樊亮',
    position: '人力资源部负责人',
    startDate: '2022/1/1',
    tenure: '4.31',
    scores: {
      operational: { total: 4.3, revenue: 4.4, profit: 4.2 },
      professional: { total: 4.5, metrics: 4.4, delivery: 4.6 },
      collaborative: { total: 4.4, business: 4.3, frontline: 4.4, subordinate: 4.5, coe: 4.4 },
      keyEvents: { total: 0.2, hrProject: 0.1, atmosphere: 0.1, risk: 0 }
    }
  },
  {
    org: '速运福建区',
    id: '01446400',
    name: '王斌',
    position: '人力资源部负责人',
    startDate: '2025/6/26',
    tenure: '0.83',
    scores: {
      operational: { total: 4.1, revenue: 4.0, profit: 4.2 },
      professional: { total: 4.3, metrics: 4.2, delivery: 4.4 },
      collaborative: { total: 4.2, business: 4.1, frontline: 4.2, subordinate: 4.3, coe: 4.2 },
      keyEvents: { total: 0.05, hrProject: 0.05, atmosphere: 0, risk: 0 }
    }
  },
  {
    org: '华东分拨区',
    id: '00321145',
    name: '张毅',
    position: '人力资源部负责人',
    startDate: '2022/9/12',
    tenure: '3.62',
    scores: {
      operational: { total: 4.4, revenue: 4.5, profit: 4.3 },
      professional: { total: 4.6, metrics: 4.5, delivery: 4.7 },
      collaborative: { total: 4.5, business: 4.4, frontline: 4.5, subordinate: 4.6, coe: 4.5 },
      keyEvents: { total: 0.1, hrProject: 0.1, atmosphere: 0, risk: 0 }
    }
  },
  {
    org: '华南分拨区',
    id: '00455021',
    name: '陈美',
    position: '人力资源部负责人',
    startDate: '2024/1/20',
    tenure: '2.28',
    scores: {
      operational: { total: 4.3, revenue: 4.2, profit: 4.4 },
      professional: { total: 4.5, metrics: 4.4, delivery: 4.6 },
      collaborative: { total: 4.4, business: 4.3, frontline: 4.4, subordinate: 4.5, coe: 4.4 },
      keyEvents: { total: 0.15, hrProject: 0.1, atmosphere: 0.05, risk: 0 }
    }
  },
  {
    org: '鄂枢分拨区',
    id: '00122334',
    name: '刘勇',
    position: '人力资源部负责人',
    startDate: '2025/3/15',
    tenure: '1.12',
    scores: {
      operational: { total: 4.6, revenue: 4.7, profit: 4.5 },
      professional: { total: 4.8, metrics: 4.9, delivery: 4.7 },
      collaborative: { total: 4.6, business: 4.5, frontline: 4.6, subordinate: 4.7, coe: 4.6 },
      keyEvents: { total: 0.2, hrProject: 0.15, atmosphere: 0.05, risk: 0 }
    }
  },
  {
    org: '华北分拨区',
    id: '00299887',
    name: '王强',
    position: '人力资源部负责人',
    startDate: '2021/11/05',
    tenure: '4.48',
    scores: {
      operational: { total: 4.2, revenue: 4.1, profit: 4.3 },
      professional: { total: 4.4, metrics: 4.3, delivery: 4.5 },
      collaborative: { total: 4.3, business: 4.2, frontline: 4.3, subordinate: 4.4, coe: 4.3 },
      keyEvents: { total: 0.1, hrProject: 0.1, atmosphere: 0, risk: 0 }
    }
  },
  {
    org: '华西分拨区',
    id: '00388776',
    name: '王志刚',
    position: '人力资源部负责人',
    startDate: '2023/05/20',
    tenure: '2.95',
    scores: {
      operational: { total: 4.3, revenue: 4.4, profit: 4.2 },
      professional: { total: 4.5, metrics: 4.4, delivery: 4.6 },
      collaborative: { total: 4.4, business: 4.3, frontline: 4.4, subordinate: 4.5, coe: 4.4 },
      keyEvents: { total: 0.15, hrProject: 0.1, atmosphere: 0.05, risk: 0 }
    }
  }
];

interface AssessmentResultsModuleProps {
  restrictedOrg?: string;
}

export default function AssessmentResultsModule({ restrictedOrg }: AssessmentResultsModuleProps) {
  const [selectedOrg, setSelectedOrg] = useState('全部');

  // Specified lists for overall views
  const businessDistricts = ['速运浙北区', '速运广佛区', '速运苏中区', '速运河南区', '速运内蒙古区', '速运上海区', '速运福建区'];
  const sortingCenters = ['华东分拨区', '华南分拨区', '鄂枢分拨区', '华北分拨区', '华西分拨区'];

  const uniqueOrgs = useMemo(() => {
    let orgs = assessmentData.map(item => item.org);
    
    // If restricted to a specific Overall view, filter the dropdown too
    if (restrictedOrg === '业务区整体') {
      orgs = assessmentData.filter(i => businessDistricts.includes(i.org)).map(i => i.org);
    } else if (restrictedOrg === '分拨区整体') {
      orgs = assessmentData.filter(i => sortingCenters.includes(i.org)).map(i => i.org);
    }

    const options = ['全部', ...Array.from(new Set(orgs))];
    if (restrictedOrg && !restrictedOrg.includes('整体')) {
      return [restrictedOrg];
    }
    return options;
  }, [restrictedOrg]);

  const viewType = useMemo(() => {
    const org = restrictedOrg || selectedOrg;
    if (org === 'M线') return 'M-LINE';
    if (org === '仓储') return 'BU';
    if (org === '供应链') return 'BG';
    return 'STANDARD';
  }, [restrictedOrg, selectedOrg]);

  const calculateTotal = (item: any) => {
    const weights = 
      viewType === 'STANDARD' ? { op: 0.2, prof: 0.6, coll: 0.2 } :
      { op: 0, prof: 0.6, coll: 0.4 }; // M-LINE, BU, BG all have 60/40 split between professional and collaborative
    
    const weighted = (item.scores.operational.total * weights.op) + (item.scores.professional.total * weights.prof) + (item.scores.collaborative.total * weights.coll);
    return (weighted + (item.scores.keyEvents.total || 0)).toFixed(2);
  };

  const filteredData = useMemo(() => {
    let data = assessmentData;
    
    if (restrictedOrg && !restrictedOrg.includes('整体')) {
      data = assessmentData.filter(item => item.org === restrictedOrg);
    } else if (restrictedOrg === '业务区整体') {
      data = assessmentData.filter(item => businessDistricts.includes(item.org));
    } else if (restrictedOrg === '分拨区整体') {
      data = assessmentData.filter(item => sortingCenters.includes(item.org));
    }
    
    // Apply local filter if it's not "全部" and we're not pinpointed to one org
    if (selectedOrg !== '全部' && (!restrictedOrg || restrictedOrg.includes('整体'))) {
      data = data.filter(item => item.org === selectedOrg);
    }
    
    return [...data].sort((a, b) => {
      const scoreA = parseFloat(calculateTotal(a));
      const scoreB = parseFloat(calculateTotal(b));
      return scoreB - scoreA;
    });
  }, [selectedOrg, restrictedOrg, viewType]);

  // Sync selectedOrg if restricted
  React.useEffect(() => {
    if (restrictedOrg) {
      if (restrictedOrg.includes('整体')) {
        setSelectedOrg('全部');
      } else {
        setSelectedOrg(restrictedOrg);
      }
    } else {
      setSelectedOrg('全部');
    }
  }, [restrictedOrg]);

  const weightDescription = 
    viewType === 'M-LINE' || viewType === 'BU' ? '专业价值 60% (指标30%, 交付30%) | 协同影响 20% (下级10%, COE 30%) | 关键事件 ±分' :
    viewType === 'BG' ? '专业价值 60% (指标40%, 交付20%) | 协同影响 20% (前线10%, 下级10%, COE 20%) | 关键事件 ±分' :
    '经营关联 20% | 专业价值 60% | 协同影响 20% | 关键事件 ±分';

  return (
    <div className="space-y-4 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-6 bg-brand-blue rounded-full"></div>
          <h2 className="text-lg font-bold text-gray-800 tracking-tight">评价结果</h2>
          <span className="text-[10px] text-gray-400 font-normal ml-2">（该模块仅人力资源部负责人可见）</span>
          
          <div className="ml-6 flex items-center gap-2 bg-gray-100/80 rounded-lg px-3 py-1.5 border border-gray-200">
            <span className="text-xs text-gray-500 font-bold">组织筛选:</span>
            <select 
              value={selectedOrg}
              onChange={(e) => setSelectedOrg(e.target.value)}
              className="bg-transparent text-xs font-bold text-gray-700 outline-none cursor-pointer"
            >
              {uniqueOrgs.map(org => (
                <option key={org} value={org}>{org}</option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <span className="w-2 h-2 rounded-full bg-brand-blue"></span>
            <span>权重说明: {weightDescription}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto no-scrollbar">
        <table className="w-full border-collapse border-spacing-0 text-[10px] min-w-[1400px]">
          <thead>
            {/* Level 1 Header */}
            <tr className="bg-gray-50 text-gray-500 border-b border-gray-200">
              <th rowSpan={3} className="px-3 py-3 border-r border-gray-200 font-bold text-left w-[110px]">组织</th>
              <th rowSpan={3} className="px-3 py-3 border-r border-gray-200 font-bold text-center w-[70px]">姓名</th>
              <th rowSpan={3} className="px-3 py-3 border-r border-gray-200 font-bold text-left w-[130px]">职位</th>
              <th rowSpan={3} className="px-3 py-3 border-r border-gray-200 font-bold text-center w-[80px]">岗龄(任期)</th>
              {viewType === 'STANDARD' && (
                <th colSpan={3} className="px-3 py-2 border-r border-gray-200 font-bold text-center bg-blue-50/30 text-brand-blue">经营关联(20%)</th>
              )}
              <th colSpan={3} className="px-3 py-2 border-r border-gray-200 font-bold text-center bg-purple-50/30 text-purple-600">专业价值(60%)</th>
              <th colSpan={viewType === 'STANDARD' ? 5 : (viewType === 'M-LINE' || viewType === 'BU' ? 3 : 4)} className="px-3 py-2 border-r border-gray-200 font-bold text-center bg-teal-50/30 text-teal-600">协同影响(20%)</th>
              <th colSpan={4} className="px-3 py-2 border-r border-gray-200 font-bold text-center bg-orange-50/30 text-orange-600">关键事件(±)</th>
              <th rowSpan={3} className="px-3 py-3 border-r border-gray-200 font-bold text-center w-[70px] bg-blue-50 text-brand-blue">总得分</th>
              <th rowSpan={3} className="px-3 py-3 font-bold text-center w-[60px] bg-blue-50 text-brand-blue">排名</th>
            </tr>
            {/* Level 2 Subtotal Headers */}
            <tr className="bg-gray-100/50 text-gray-400 border-b border-gray-200">
              {viewType === 'STANDARD' && (
                <>
                  <th rowSpan={2} className="px-2 py-2 border-r border-gray-200 font-bold text-center text-brand-blue/70 bg-blue-50/10">整体得分</th>
                  <th colSpan={2} className="px-2 py-1 border-r border-gray-200 font-bold text-center">分项明细</th>
                </>
              )}
              <th rowSpan={2} className="px-2 py-2 border-r border-gray-200 font-bold text-center text-purple-600/70 bg-purple-50/10">整体得分</th>
              <th colSpan={2} className="px-2 py-1 border-r border-gray-200 font-bold text-center">分项明细</th>
              <th rowSpan={2} className="px-2 py-2 border-r border-gray-200 font-bold text-center text-teal-600/70 bg-teal-50/10">整体得分</th>
              <th colSpan={viewType === 'STANDARD' ? 4 : (viewType === 'M-LINE' || viewType === 'BU' ? 2 : 3)} className="px-2 py-1 border-r border-gray-200 font-bold text-center">分项明细</th>
              <th rowSpan={2} className="px-2 py-2 border-r border-gray-200 font-bold text-center text-orange-600/70 bg-orange-50/10">整体得分</th>
              <th colSpan={3} className="px-2 py-1 border-r border-gray-200 font-bold text-center">事件明细</th>
            </tr>
            {/* Level 3 Specific Metrics */}
            <tr className="bg-gray-50/50 text-gray-400 border-b border-gray-200">
              {viewType === 'STANDARD' && (
                <>
                  <th className="px-1 py-1 border-r border-gray-200 font-medium text-center w-[75px]">收入达成(10%)</th>
                  <th className="px-1 py-1 border-r border-gray-200 font-medium text-center w-[75px]">利润达成(10%)</th>
                </>
              )}
              <th className="px-1 py-1 border-r border-gray-200 font-medium text-center w-[75px]">{viewType === 'BG' ? '指标达成(40%)' : '指标达成(30%)'}</th>
              <th className="px-1 py-1 border-r border-gray-200 font-medium text-center w-[75px]">{viewType === 'BG' ? '工作交付(20%)' : '工作交付(30%)'}</th>
              {viewType === 'STANDARD' && (
                <>
                  <th className="px-1 py-1 border-r border-gray-200 font-medium text-center w-[55px]">业务评价(5%)</th>
                  <th className="px-1 py-1 border-r border-gray-200 font-medium text-center w-[55px]">前线评价(5%)</th>
                  <th className="px-1 py-1 border-r border-gray-200 font-medium text-center w-[55px]">下级评价(5%)</th>
                  <th className="px-1 py-1 border-r border-gray-200 font-medium text-center w-[55px]">COE评价(5%)</th>
                </>
              )}
              {(viewType === 'M-LINE' || viewType === 'BU') && (
                <>
                  <th className="px-1 py-1 border-r border-gray-200 font-medium text-center w-[80px]">下级评价(10%)</th>
                  <th className="px-1 py-1 border-r border-gray-200 font-medium text-center w-[80px]">COE评价(30%)</th>
                </>
              )}
              {viewType === 'BG' && (
                <>
                  <th className="px-1 py-1 border-r border-gray-200 font-medium text-center w-[70px]">前线评价(10%)</th>
                  <th className="px-1 py-1 border-r border-gray-200 font-medium text-center w-[70px]">下级评价(10%)</th>
                  <th className="px-1 py-1 border-r border-gray-200 font-medium text-center w-[70px]">COE评价(20%)</th>
                </>
              )}
              <th className="px-1 py-1 border-r border-gray-200 font-medium text-center w-[65px]">项目参与(+)</th>
              <th className="px-1 py-1 border-r border-gray-200 font-medium text-center w-[65px]">组织氛围(±)</th>
              <th className="px-1 py-1 border-r border-gray-200 font-medium text-center w-[65px]">异常风险(-)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredData.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-3 py-3 border-r border-gray-100 font-bold text-gray-800">{item.org}</td>
                <td className="px-3 py-3 border-r border-gray-100 text-center font-medium text-gray-700">{item.name}</td>
                <td className="px-3 py-3 border-r border-gray-100 text-gray-500">{item.position}</td>
                <td className="px-3 py-3 border-r border-gray-100 text-center text-gray-500 font-mono">{item.tenure}</td>
                
                {viewType === 'STANDARD' && (
                  <>
                    <td className="px-2 py-3 border-r border-gray-100 text-center font-black text-brand-blue bg-blue-50/5">{item.scores.operational.total}</td>
                    <td className="px-1 py-3 border-r border-gray-100 text-center text-gray-500">{item.scores.operational.revenue}</td>
                    <td className="px-1 py-3 border-r border-gray-100 text-center text-gray-500">{item.scores.operational.profit}</td>
                  </>
                )}
                
                <td className="px-2 py-3 border-r border-gray-100 text-center font-black text-purple-600 bg-purple-50/5">{item.scores.professional.total}</td>
                <td className="px-1 py-3 border-r border-gray-100 text-center text-gray-500">{item.scores.professional.metrics}</td>
                <td className="px-1 py-3 border-r border-gray-100 text-center text-gray-500">{item.scores.professional.delivery}</td>
                
                <td className="px-2 py-3 border-r border-gray-100 text-center font-black text-teal-600 bg-teal-50/5">{item.scores.collaborative.total}</td>
                {viewType === 'STANDARD' && (
                  <>
                    <td className="px-1 py-3 border-r border-gray-100 text-center text-gray-400">{item.scores.collaborative.business}</td>
                    <td className="px-1 py-3 border-r border-gray-100 text-center text-gray-400">{item.scores.collaborative.frontline}</td>
                    <td className="px-1 py-3 border-r border-gray-100 text-center text-gray-400">{item.scores.collaborative.subordinate}</td>
                    <td className="px-1 py-3 border-r border-gray-100 text-center text-gray-400">{item.scores.collaborative.coe}</td>
                  </>
                )}
                {(viewType === 'M-LINE' || viewType === 'BU') && (
                  <>
                    <td className="px-1 py-3 border-r border-gray-100 text-center text-gray-400">{item.scores.collaborative.subordinate}</td>
                    <td className="px-1 py-3 border-r border-gray-100 text-center text-gray-400">{item.scores.collaborative.coe}</td>
                  </>
                )}
                {viewType === 'BG' && (
                  <>
                    <td className="px-1 py-3 border-r border-gray-100 text-center text-gray-400">{item.scores.collaborative.frontline}</td>
                    <td className="px-1 py-3 border-r border-gray-100 text-center text-gray-400">{item.scores.collaborative.subordinate}</td>
                    <td className="px-1 py-3 border-r border-gray-100 text-center text-gray-400">{item.scores.collaborative.coe}</td>
                  </>
                )}
                
                <td className={`px-2 py-3 border-r border-gray-100 text-center font-black bg-orange-50/5 ${item.scores.keyEvents.total >= 0 ? 'text-success-green' : 'text-danger-red'}`}>
                  {item.scores.keyEvents.total > 0 ? `+${item.scores.keyEvents.total}` : (item.scores.keyEvents.total === 0 ? '0' : item.scores.keyEvents.total)}
                </td>
                <td className="px-1 py-3 border-r border-gray-100 text-center text-success-green">{item.scores.keyEvents.hrProject > 0 ? `+${item.scores.keyEvents.hrProject}` : '-'}</td>
                <td className={`px-1 py-3 border-r border-gray-100 text-center ${item.scores.keyEvents.atmosphere >= 0 ? 'text-success-green' : 'text-danger-red'}`}>
                  {item.scores.keyEvents.atmosphere === 0 ? '-' : (item.scores.keyEvents.atmosphere > 0 ? `+${item.scores.keyEvents.atmosphere}` : item.scores.keyEvents.atmosphere)}
                </td>
                <td className="px-1 py-3 border-r border-gray-100 text-center text-danger-red">{item.scores.keyEvents.risk < 0 ? item.scores.keyEvents.risk : '-'}</td>

                <td className="px-3 py-3 border-r border-gray-100 text-center font-black text-brand-blue bg-blue-50 text-[12px]">
                  {calculateTotal(item)}
                </td>
                
                <td className="px-3 py-3 text-center">
                  <div className="flex items-center justify-center">
                    {idx < 3 ? (
                      <div className="flex items-center gap-1 text-orange-500 font-bold">
                        <Trophy className="w-3 h-3 text-orange-400" />
                        <span>{idx + 1}</span>
                      </div>
                    ) : (
                      <span className="text-gray-500 font-bold">{idx + 1}</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
