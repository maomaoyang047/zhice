import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ClipboardList } from 'lucide-react';

const keyWorkData = [
  {
    org: '速运浙北区',
    name: '刘杏叶',
    position: '人力资源部负责人',
    tenure: '2.15',
    taskName: '人才精准盘点',
    content: '完成全区关键岗位人才盘点，建立人才画像库',
    requirement: '盘点覆盖率100%',
    score: 4.6,
    rule: '按标准赋分'
  },
  {
    org: '速运上海区',
    name: '郑国英',
    position: '人力资源部负责人',
    tenure: '5.53',
    taskName: '组织变阵优化',
    content: '配合全网变阵，完成上海区末端网点组织架构调整',
    requirement: '结构调整到位',
    score: 4.7,
    rule: '按标准赋分'
  },
  {
    org: '速运广佛区',
    name: '宋文婷',
    position: '人力资源部负责人',
    tenure: '5.34',
    taskName: '人才储备库建设',
    content: '建立广佛区高潜人才库，完成首批20名干部的专项培养',
    requirement: '培养达标率90%',
    score: 4.8,
    rule: '按标准赋分'
  },
  {
    org: '速运苏中区',
    name: '吴伟琴',
    position: '人力资源部负责人',
    tenure: '3.14',
    taskName: '校招人才落地',
    content: '完成2024届大学生入职培训及定岗分配，满意度90分',
    requirement: '定岗及时率100%',
    score: 4.8,
    rule: '按标准赋分'
  },
  {
    org: '速运河南区',
    name: '李军伟',
    position: '人力资源部负责人',
    tenure: '4.90',
    taskName: '末端激励改革',
    content: '优化全区网点负责人考核激励方案，提升经营活力',
    requirement: '激励满意度提升5%',
    score: 4.7,
    rule: '按标准赋分'
  },
  {
    org: '速运内蒙古区',
    name: '樊亮',
    position: '人力资源部负责人',
    tenure: '4.31',
    taskName: '业务伙伴融合',
    content: '建立HRBP下沉网点工作机制，解决业务一线痛点问题',
    requirement: '解决率>80%',
    score: 4.5,
    rule: '按标准赋分'
  },
  {
    org: '速运福建区',
    name: '王斌',
    position: '人力资源部负责人',
    tenure: '0.83',
    taskName: '组织韧性提升',
    content: '完成核心管理岗梯队盘点，核心人才储备率提升15%',
    requirement: '储备人选覆盖率>80%',
    rule: '按标准赋分',
    score: 4.5
  },
  {
    org: '华东分拨区',
    name: '张毅',
    position: '人力资源部负责人',
    tenure: '3.62',
    taskName: '自动化人才盘点',
    content: '配合场地自动化升级，完成人员架构优化与转岗培训',
    requirement: '转岗成功率90%',
    score: 4.6,
    rule: '按标准赋分'
  },
  {
    org: '华南分拨区',
    name: '陈美',
    position: '人力资源部负责人',
    tenure: '2.28',
    taskName: '灵活用工优化',
    content: '优化华南枢纽临时用工配置方案，降低人力成本5%',
    requirement: '成本达标',
    score: 4.5,
    rule: '按标准赋分'
  },
  {
    org: '鄂枢分拨区',
    name: '刘勇',
    position: '人力资源部负责人',
    tenure: '1.12',
    taskName: '核心人才保留',
    content: '针对核心技术岗位开展定项激励，流失率同比下降10%',
    requirement: '流失率达标',
    score: 4.7,
    rule: '按标准赋分'
  },
  {
    org: '华北分拨区',
    name: '王强',
    position: '人力资源部负责人',
    tenure: '4.48',
    taskName: '标准化作业培训',
    content: '推行华北区标准化操作室，提升人均效能10%',
    requirement: '效能达成率100%',
    score: 4.5,
    rule: '按标准赋分'
  },
  {
    org: '华西分拨区',
    name: '王志刚',
    position: '人力资源部负责人',
    tenure: '2.95',
    taskName: '分拨管理标准化',
    content: '配合全网作业标准化，完成华西区核心分拨点人力配置优化',
    requirement: '配置达标率100%',
    score: 4.5,
    rule: '按标准赋分'
  },
  {
    org: 'M线',
    name: '贺芳',
    position: '人力资源BP高级经理',
    tenure: '0.69',
    taskName: '职能增效项目',
    content: '完成M线职能集约化整合方案及人员分流计划',
    requirement: '方案获批',
    score: 4.7,
    rule: '按标准赋分'
  },
  {
    org: '仓储',
    name: '邓霞',
    position: '办公室负责人',
    tenure: '0.30',
    taskName: '库存管理支撑',
    content: '配合事业部完成仓储人员精益管理，下浮人员缺口5%',
    requirement: '人效提升到位',
    score: 4.3,
    rule: '按标准赋分'
  },
  {
    org: '供应链',
    name: '柴阳',
    position: '人力资源处代理负责人',
    tenure: '0.08',
    taskName: '集成供应链人才培养',
    content: '完成供应链第一期领航人才训练营，满意度4.8',
    requirement: '培训参与率100%',
    score: 4.6,
    rule: '按标准赋分'
  }
];

interface KeyWorkDeliveryModuleProps {
  restrictedOrg?: string;
}

export default function KeyWorkDeliveryModule({ restrictedOrg }: KeyWorkDeliveryModuleProps) {
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

  // Filtering data: 
  const filteredData = React.useMemo(() => {
    let data = keyWorkData;

    if (restrictedOrg && !restrictedOrg.includes('整体')) {
      data = keyWorkData.filter(item => item.org === restrictedOrg);
    } else if (restrictedOrg === '业务区整体') {
      data = keyWorkData.filter(item => businessDistricts.includes(item.org));
    } else if (restrictedOrg === '分拨区整体') {
      data = keyWorkData.filter(item => sortingCenters.includes(item.org));
    }

    if (selectedOrgFilter !== '全部' && (!restrictedOrg || restrictedOrg.includes('整体'))) {
      data = data.filter(item => item.org === selectedOrgFilter);
    }

    return data;
  }, [restrictedOrg, selectedOrgFilter]);

  // Update local filter options based on filtered view
  const orgOptions = React.useMemo(() => {
    const baseData = restrictedOrg === '业务区整体' 
      ? keyWorkData.filter(i => businessDistricts.includes(i.org))
      : restrictedOrg === '分拨区整体'
        ? keyWorkData.filter(i => sortingCenters.includes(i.org))
        : keyWorkData;
    
    return ['全部', ...new Set(baseData.map(item => item.org))];
  }, [restrictedOrg]);

  const averageScore = (filteredData.length > 0 
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
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-6 bg-purple-600 rounded-full"></div>
          <h2 className="text-lg font-bold text-gray-800 tracking-tight">重点工作交付</h2>
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
            <tr className="bg-gray-50 text-gray-500 border-b border-gray-200">
              <th className="px-4 py-3 font-bold text-left w-[110px]">组织</th>
              <th className="px-4 py-3 font-bold text-center w-[70px]">姓名</th>
              <th className="px-4 py-3 font-bold text-left w-[120px]">职位</th>
              <th className="px-4 py-3 font-bold text-center w-[80px]">岗龄(任期)</th>
              <th className="px-4 py-3 font-bold text-left w-[140px]">事项名称</th>
              <th className="px-4 py-3 font-bold text-left">重点内容</th>
              <th className="px-4 py-3 font-bold text-left w-[80px]">交付要求</th>
              <th className="px-4 py-3 font-bold text-center w-[100px]">赋分规则-5分</th>
              <th className="px-4 py-3 font-bold text-center w-[70px] bg-purple-50/50 text-purple-600">得分</th>
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

                <td className="px-4 py-3 text-gray-800 font-medium">{item.taskName}</td>
                <td className="px-4 py-3 text-gray-600 leading-relaxed text-[10px]">{item.content}</td>
                <td className="px-4 py-3 text-gray-500 underline decoration-dotted decoration-gray-300 underline-offset-4">{item.requirement}</td>
                <td className="px-4 py-3 text-center text-gray-500">{item.rule}</td>
                <td className="px-4 py-3 text-center font-black bg-purple-50/10 text-purple-600">
                  {item.score.toFixed(1)}
                </td>
              </tr>
            ))}
            {filteredData.length > 0 ? (
              <tr className="bg-purple-50/30">
                <td colSpan={8} className="px-4 py-3 text-right font-bold text-gray-500">总分 (加权平均得分):</td>
                <td className="px-4 py-3 text-center font-black text-purple-700 bg-purple-50/30 text-lg">
                  {averageScore}
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan={9} className="px-4 py-10 text-center text-gray-400 italic">暂无匹配的组织数据</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
