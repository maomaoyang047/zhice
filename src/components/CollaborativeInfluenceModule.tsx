import React from 'react';
import { motion } from 'motion/react';
import { Users2, ClipboardCheck } from 'lucide-react';

const collaborativeData = [
  {
    org: '速运福建区',
    name: '王斌',
    position: '人力资源部负责人',
    tenure: '0.83',
    category: '业务评价',
    content: '季度项目组调研',
    rule: '调研得分',
    weight: '5%',
    source: 'CHO办公室',
    score: 4.5
  },
  {
    org: '速运福建区',
    name: '王斌',
    position: '人力资源部负责人',
    tenure: '0.83',
    category: '前线评价',
    content: '服务满意度调研',
    rule: '调研得分',
    weight: '5%',
    source: '组织与效能处',
    score: 4.2
  },
  {
    org: '速运福建区',
    name: '王斌',
    position: '人力资源部负责人',
    tenure: '0.83',
    category: '下级评价',
    content: '团队领导力评价',
    rule: '得分比重',
    weight: '10%',
    source: '考核小组',
    score: 4.8
  },
  {
    org: '速运福建区',
    name: '王斌',
    position: '人力资源部负责人',
    tenure: '0.83',
    category: 'COE评价',
    content: '专业支撑响应速度',
    rule: '量化得分',
    weight: '5%',
    source: 'CHO-COE',
    score: 4.8
  },
  { org: '速运浙北区', name: '刘杏叶', position: '人力资源部负责人', tenure: '2.15', category: '评价得分', content: '年度满意度', rule: '综分', weight: '10%', source: '区部办公室', score: 4.4 },
  { org: '速运浙北区', name: '刘杏叶', position: '人力资源部负责人', tenure: '2.15', category: '下级评价', content: '团队氛围打分', rule: '综分', weight: '10%', source: '考核小组', score: 4.5 },
  { org: '速运浙北区', name: '刘杏叶', position: '人力资源部负责人', tenure: '2.15', category: 'COE评价', content: '政委政策执行度', rule: '量化得分', weight: '10%', source: 'CHO-COE', score: 4.6 },
  { org: '速运上海区', name: '郑国英', position: '人力资源部负责人', tenure: '5.53', category: '评价得分', content: '季度协同分', rule: '平分', weight: '10%', source: '上海区经委', score: 4.6 },
  { org: '速运广佛区', name: '宋文婷', position: '人力资源部负责人', tenure: '5.34', category: '评价得分', content: '员工关怀指数', rule: '综分', weight: '10%', source: '广佛区部', score: 4.7 },
  { org: '速运河南区', name: '李军伟', position: '人力资源部负责人', tenure: '4.90', category: '评价得分', content: '效能评估得分', rule: '综分', weight: '10%', source: '河南区部', score: 4.6 },
  { org: '速运苏中区', name: '吴伟琴', position: '人力资源部负责人', tenure: '3.14', category: '评价得分', content: '政企关系得分', rule: '综分', weight: '10%', source: '苏中区部', score: 4.8 },
  { org: '速运内蒙古区', name: '樊亮', position: '人力资源部负责人', tenure: '4.31', category: '评价得分', content: '员工稳定度', rule: '综分', weight: '10%', source: '内蒙区部', score: 4.5 },
  {
    org: '华西分拨区',
    name: '王志刚',
    position: '人力资源部负责人',
    tenure: '1.31',
    category: '下级评价',
    content: '团队领导力评价',
    rule: '得分比重',
    weight: '10%',
    source: '考核小组',
    score: 4.5
  },
  {
    org: '华东分拨区',
    name: '阙枫',
    position: '人力资源部负责人',
    tenure: '4.00',
    category: 'COE评价',
    content: '专业支撑响应速度',
    rule: '量化得分',
    weight: '5%',
    source: 'CHO-COE',
    score: 4.7
  },
  {
    org: '华南分拨区',
    name: '陈美',
    position: '人力资源部负责人',
    tenure: '2.28',
    category: '下级评价',
    content: '团队沟通氛围调研',
    rule: '得分比重',
    weight: '10%',
    source: '考核小组',
    score: 4.6
  },
  {
    org: '鄂枢分拨区',
    name: '刘勇',
    position: '人力资源部负责人',
    tenure: '1.12',
    category: 'COE评价',
    content: '专业支撑响应速度',
    rule: '量化得分',
    weight: '5%',
    source: 'CHO-COE',
    score: 4.4
  },
  {
    org: '华北分拨区',
    name: '王强',
    position: '人力资源部负责人',
    tenure: '4.48',
    category: '赋能评价',
    content: '基层管理者赋能满意度',
    rule: '调研得分',
    weight: '10%',
    source: '培训部',
    score: 4.5
  },
  {
    org: 'M线',
    name: '贺芳',
    position: '人力资源BP高级经理',
    tenure: '0.69',
    category: '下级评价',
    content: 'BP团队赋能评价',
    rule: '满意度得分',
    weight: '10%',
    source: 'M线人力团队',
    score: 4.8
  },
  {
    org: 'M线',
    name: '贺芳',
    position: '人力资源BP高级经理',
    tenure: '0.69',
    category: 'COE评价',
    content: '专业方案落地质量',
    rule: '闭环评价',
    weight: '30%',
    source: 'COE各处室',
    score: 4.4
  },
  {
    org: '仓储',
    name: '邓霞',
    position: '办公室负责人',
    tenure: '0.30',
    category: '前线评价',
    content: '仓库管理人员满意度',
    rule: '调研得分',
    weight: '10%',
    source: '仓储营运处',
    score: 4.2
  },
  {
    org: '仓储',
    name: '邓霞',
    position: '办公室负责人',
    tenure: '0.30',
    category: 'COE评价',
    content: '薪酬核算准确率',
    rule: '系统扣分项',
    weight: '20%',
    source: '共享中心',
    score: 4.5
  },
  {
    org: '数智供应链',
    name: '柴阳',
    position: '人力资源处代理负责人',
    tenure: '0.08',
    category: '下级评价',
    content: '处室氛围调研',
    rule: '调研得分',
    weight: '10%',
    source: 'CHO办公室',
    score: 4.6
  }
];

interface CollaborativeInfluenceModuleProps {
  restrictedOrg?: string;
}

export default function CollaborativeInfluenceModule({ restrictedOrg }: CollaborativeInfluenceModuleProps) {
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
    let data = collaborativeData;

    if (restrictedOrg && !restrictedOrg.includes('整体')) {
      data = collaborativeData.filter(item => item.org === restrictedOrg);
    } else if (restrictedOrg === '业务区整体') {
      data = collaborativeData.filter(item => businessDistricts.includes(item.org));
    } else if (restrictedOrg === '分拨区整体') {
      data = collaborativeData.filter(item => sortingCenters.includes(item.org));
    }

    if (selectedOrgFilter !== '全部' && (!restrictedOrg || restrictedOrg.includes('整体'))) {
      data = data.filter(item => item.org === selectedOrgFilter);
    }

    return data;
  }, [restrictedOrg, selectedOrgFilter]);

  const orgOptions = React.useMemo(() => {
    if (restrictedOrg && !restrictedOrg.includes('整体')) {
      return [restrictedOrg];
    }
    const baseData = restrictedOrg === '业务区整体' 
      ? collaborativeData.filter(i => businessDistricts.includes(i.org))
      : restrictedOrg === '分拨区整体'
        ? collaborativeData.filter(i => sortingCenters.includes(i.org))
        : collaborativeData;
    
    return ['全部', ...new Set(baseData.map(item => item.org))];
  }, [restrictedOrg]);

  const totalScore = (filteredData.length > 0 
    ? filteredData.reduce((acc, curr) => acc + curr.score, 0) / filteredData.length 
    : 0).toFixed(2);

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
          <div className="w-1.5 h-6 bg-brand-blue rounded-full"></div>
          <h2 className="text-lg font-bold text-gray-800 tracking-tight">协同影响</h2>
        </div>

        {(!restrictedOrg || restrictedOrg.includes('整体')) && (
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
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full border-collapse border-spacing-0 text-[11px] table-fixed">
          <thead>
            <tr className="bg-gray-100/80 text-gray-500 border-b border-gray-200">
              <th className="px-4 py-3 font-bold text-left w-[110px]">组织</th>
              <th className="px-4 py-3 font-bold text-center w-[70px]">姓名</th>
              <th className="px-4 py-3 font-bold text-left w-[120px]">职位</th>
              <th className="px-4 py-3 font-bold text-center w-[80px]">岗龄(任期)</th>
              <th className="px-4 py-3 font-bold text-left w-[100px]">考评项</th>
              <th className="px-4 py-3 font-bold text-left">考评内容</th>
              <th className="px-4 py-3 font-bold text-center w-[100px]">赋分规则 (5分)</th>
              <th className="px-4 py-3 font-bold text-center w-[80px]">赋分权重</th>
              <th className="px-4 py-3 font-bold text-left w-[150px]">数据来源</th>
              <th className="px-4 py-3 font-bold text-center w-[80px] bg-blue-50/50 text-brand-blue">得分</th>
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
                <td className="px-4 py-3 text-gray-600">{item.content}</td>
                <td className="px-4 py-3 text-center text-gray-600">{item.rule}</td>
                <td className="px-4 py-3 text-center text-gray-600">{item.weight}</td>
                <td className="px-4 py-3 text-gray-500">{item.source}</td>
                <td className="px-4 py-3 text-center font-black bg-blue-50/10 text-brand-blue">
                  {item.score.toFixed(1)}
                </td>
              </tr>
            ))}
            {filteredData.length > 0 ? (
              !['业务区整体', '分拨区整体'].includes(restrictedOrg || '') ? (
                <tr className="bg-gray-50/30">
                  <td colSpan={9} className="px-4 py-3 text-right font-bold text-gray-500">总分 (加权平均得分):</td>
                  <td className="px-4 py-3 text-center font-black text-brand-blue bg-blue-50/30 text-lg">
                    {totalScore}
                  </td>
                </tr>
              ) : null
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
