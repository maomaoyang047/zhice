import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  ChevronDown, 
  Download, 
  HelpCircle, 
  History, 
  Layout, 
  Search, 
  Table as TableIcon,
  TrendingDown,
  TrendingUp,
  LayoutDashboard,
  ArrowUp
} from 'lucide-react';
import OverviewIntervalCard from './OverviewIntervalCard';
import GlobalQuadrantChart from './GlobalQuadrantChart';
import GlobalMetricsSummary from './GlobalMetricsSummary';
import GlobalMetricsTable from './GlobalMetricsTable';
import KeyWorkDeliveryModule from './KeyWorkDeliveryModule';
import OperationalMetricCard from './OperationalMetricCard';
import AssessmentResultsModule from './AssessmentResultsModule';
import CollaborativeInfluenceModule from './CollaborativeInfluenceModule';
import KeyEventsModule from './KeyEventsModule';
import HRFiveDimensionChart from './HRFiveDimensionChart';

interface GlobalOverviewProps {
  isHideEmpty: boolean;
  setIsHideEmpty: (val: boolean) => void;
  selectedTime: string;
  onViewDistrictDetail?: () => void;
  onMetricClick?: (title: string) => void;
  initialRegion?: string;
  availableRegions?: string[];
  onRegionChange?: (region: string) => void;
}

export default function GlobalOverview({ 
  isHideEmpty, 
  setIsHideEmpty, 
  selectedTime, 
  onViewDistrictDetail, 
  onMetricClick,
  initialRegion = '业务区整体',
  availableRegions = ['业务区整体', '速运福建区'],
  onRegionChange
}: GlobalOverviewProps) {
  const [selectedRegion, setSelectedRegion] = useState(initialRegion);

  useEffect(() => {
    setSelectedRegion(initialRegion);
  }, [initialRegion]);
  const [dataDetailMode, setDataDetailMode] = useState<'current' | 'trend'>('current');
  const [tableToggleView, setTableToggleView] = useState<'module' | 'team'>('module');
  const [quadrantGroup, setQuadrantGroup] = useState('全部');
  const [activeFilters, setActiveFilters] = useState({
    module: '全部',
    dimension: '全部',
    type: '全部'
  });
  const [openFilterDropdown, setOpenFilterDropdown] = useState<string | null>(null);

  const professionalData = useMemo(() => {
    if (selectedRegion === 'M线' || selectedRegion === '仓储' || selectedRegion === '供应链') {
      return {
        lights: {
          green: ['职能三线绩优薪酬竞争力', '大学生队伍建设及培养质量', 'BU负责人齐备率', '职能关键岗位储备率', '关键职能人员素质占比'],
          yellow: ['职能预算管控率', '绩效强制分布执行率', '重点项目贡献度得分'],
          greenCount: 5,
          yellowCount: 3,
          total: 8,
          statusText: '核心指标表现平稳，职能专业化程度持续提升'
        },
        dimensions: [
          { 
            name: '组织效率', good: ['职能线上化覆盖率'], needsImprove: ['职能预算管控率'], 
            icon: <BarChart3 className="w-4 h-4 text-blue-500" /> 
          },
          { 
            name: '薪酬竞争力', good: ['绩优人员薪酬竞争力'], needsImprove: ['职能三线整体薪酬比率'], 
            icon: <TrendingUp className="w-4 h-4 text-purple-500" /> 
          },
          { 
            name: '队伍建设', good: ['大学生队伍建设', '核心储备率'], needsImprove: ['关键岗齐备率'], 
            icon: <LayoutDashboard className="w-4 h-4 text-orange-500" /> 
          },
          { 
            name: '人员保有', good: ['核心绩优流失率'], needsImprove: ['职能人员流动率'], 
            icon: <History className="w-4 h-4 text-emerald-500" /> 
          }
        ],
        chart: [
          { axis: '组织效率', value: 3.8 },
          { axis: '薪酬竞争力', value: 4.5 },
          { axis: '队伍建设', value: 4.2 },
          { axis: '人员保有', value: 4.1 },
          { axis: '组织氛围与风险', value: 4.4 },
        ],
        riskDimension: {
          good: ['合规管理', '强制分布执行'],
          needsImprove: ['人员流动预警']
        }
      };
    }
    
    if (selectedRegion.includes('分拨')) {
      return {
        lights: {
          green: ['一线中级及以上技能占比', '关键职能队伍高素质青年化占比', '关键队伍负责人齐备率', '分拨操作岗全流量流失率', '分拨操作岗周期内需求满足率', '自动场资源利用率'],
          yellow: ['枢纽技术人才保有量', '新任班组长半年内未存活占比', '运作岗全流量流失率'],
          greenCount: 6,
          yellowCount: 3,
          total: 9,
          statusText: '技能化水平稳步提升，自动化韧性显著增强'
        },
        dimensions: [
          { 
            name: '组织效率', good: ['自动场利用率', '分拨效能'], needsImprove: ['非核心时段冗余比'], 
            icon: <BarChart3 className="w-4 h-4 text-blue-500" /> 
          },
          { 
            name: '薪酬竞争力', good: ['技能等级津贴影响力'], needsImprove: ['关键岗薪酬对标'], 
            icon: <TrendingUp className="w-4 h-4 text-purple-500" /> 
          },
          { 
            name: '队伍建设', good: ['中高级技能占比', '班组长储备率'], needsImprove: ['枢纽技术人才保有'], 
            icon: <LayoutDashboard className="w-4 h-4 text-orange-500" /> 
          },
          { 
            name: '人员保有', good: ['操作岗流失率'], needsImprove: ['运作岗全流量流失'], 
            icon: <History className="w-4 h-4 text-emerald-500" /> 
          }
        ],
        chart: [
          { axis: '组织效率', value: 4.1 },
          { axis: '薪酬竞争力', value: 3.8 },
          { axis: '队伍建设', value: 4.5 },
          { axis: '人员保有', value: 3.9 },
          { axis: '组织氛围与风险', value: 4.2 },
        ],
        riskDimension: {
          good: ['安全作业规范性', '班组氛围指数'],
          needsImprove: ['运作岗流失预警']
        }
      };
    }

    return {
      lights: {
        green: ['一线月薪增长达成率', '关键职能队伍高素质青年化占比', '关键队伍负责人齐备率', '收派岗全流量流失率', '收派岗周期内需求满足率', '网点负责人社招占比'],
        yellow: ['人类类政策性收益得分', '新任网点负责人半年内未存活占比', '动作岗全流流失率'],
        greenCount: 6,
        yellowCount: 3,
        total: 9,
        statusText: '所有指标综合亮灯得分排序 高于 地区均值'
      },
      dimensions: [
        { 
          name: '组织效率', good: ['人均创收', '线上化人员覆盖率'], needsImprove: ['人工成本占收入比', '不满4人小组数量'],
          icon: <BarChart3 className="w-4 h-4 text-blue-500" />
        },
        { 
          name: '薪酬竞争力', good: ['经营三线薪酬影响力', '一线收派薪酬竞争力'], needsImprove: ['职能三线绩优薪酬竞争力'],
          icon: <TrendingUp className="w-4 h-4 text-purple-500" />
        },
        { 
          name: '队伍建设', good: ['大学生队伍建设', '店经理高绩高潜占比'], needsImprove: ['专业队伍高绩高潜占比', '新任网点负责人存活率'],
          icon: <LayoutDashboard className="w-4 h-4 text-orange-500" />
        },
        { 
          name: '人员保有', good: ['收派岗全流量流失率', '网点经营管理队伍稳定率'], needsImprove: ['动作岗全流量流失率', '职能三线绩优流失率'],
          icon: <History className="w-4 h-4 text-emerald-500" />
        }
      ],
      chart: [
        { axis: '组织效率', value: 4.2 },
        { axis: '薪酬竞争力', value: 3.5 },
        { axis: '队伍建设', value: 4.1 },
        { axis: '人员保有', value: 4.3 },
        { axis: '组织氛围与风险', value: 4.6 },
      ],
      riskDimension: {
        good: ['政策性人均收益', '奖罚比'],
        needsImprove: ['人员风险健康度']
      }
    };
  }, [selectedRegion]);

  const showOperationalMetrics = !['M线', '仓储', '供应链'].includes(selectedRegion);

  const modules = ['全部', '组效', '人才', '文关'];
  const dimensionsByModule: Record<string, string[]> = {
    '全部': ['全部', '组织效率', '薪酬竞争力', '价值贡献', '生态建设', '队伍建设', '人员保有', '组织氛围', '用工与风险'],
    '组效': ['全部', '组织效率', '薪酬竞争力', '价值贡献'],
    '人才': ['全部', '生态建设', '队伍建设'],
    '文关': ['全部', '人员保有', '组织氛围', '用工与风险']
  };

  const teams = ['全部', 'HRBP队伍', '大学生队伍', '底盘能力', '联动队伍'];
  const groupsByTeam: Record<string, string[]> = {
    '全部': ['全部', 'HRBP', '专业队伍', '底盘', '收派队伍'],
    'HRBP队伍': ['全部', 'HRBP'],
    '大学生队伍': ['全部', '专业队伍'],
    '底盘能力': ['全部', '底盘'],
    '联动队伍': ['全部', '收派队伍']
  };

  const types = ['全部', '评价项', '监测项'];

  const currentOptions1 = tableToggleView === 'module' ? modules : teams;
  const currentOptions2 = tableToggleView === 'module' 
    ? (dimensionsByModule[activeFilters.module] || ['全部'])
    : (groupsByTeam[activeFilters.module] || ['全部']);

  const label1 = tableToggleView === 'module' ? '模块' : '队伍';
  const label2 = tableToggleView === 'module' ? '维度' : '群体';

  // Reset filters when changing view
  useEffect(() => {
    setActiveFilters({ module: '全部', dimension: '全部', type: '全部' });
  }, [tableToggleView]);

  return (
    <motion.div 
      key="global-view"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-12 relative"
    >
      {/* Assessment Results Section */}
      <div id="assessment-section" className="scroll-mt-48">
        <AssessmentResultsModule restrictedOrg={selectedRegion} />
      </div>

      {/* Module 1: Operational Metrics */}
      {showOperationalMetrics && (
        <div id="operational-section" className="space-y-4 scroll-mt-24">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-6 bg-brand-blue rounded-full"></div>
            <h2 className="text-lg font-bold text-gray-800 tracking-tight">经营/关键任务达成</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <OperationalMetricCard 
              title="收入达成率"
              value="102.3"
              unit="%"
              yoy={{ value: '11.2%', isUp: true }}
              mom={{ value: '8.4%', isUp: true }}
              status="green"
              onClick={() => onMetricClick?.('收入达成率')}
            />
            <OperationalMetricCard 
              title="核心税前利润额达成率"
              value="98.5"
              unit="%"
              yoy={{ value: '6.5%', isUp: true }}
              mom={{ value: '4.2%', isUp: true }}
              status="yellow"
              onClick={() => onMetricClick?.('核心税前利润额达成率')}
            />
          </div>
        </div>
      )}

      {/* Module 2: Professional Value Dashboard */}
      <div id="professional-section" className="space-y-4 scroll-mt-24">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-6 bg-brand-blue rounded-full"></div>
          <h2 className="text-lg font-bold text-gray-800 tracking-tight">专业价值</h2>
        </div>
        
        {/* Interval Statistics relocated here */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-3.5 bg-blue-400 rounded-full"></div>
          <span className="text-sm font-bold text-gray-700">四象限落位</span>
        </div>
        
        <div className="grid grid-cols-4 gap-4 mb-2">
          <OverviewIntervalCard 
            label="绿色区间" 
            count={17} 
            percentage="38.64%" 
            dotColor="bg-success-green" 
            bgColor="bg-[#e7f9ed]"
          />
          <OverviewIntervalCard 
            label="黄色区间" 
            count={8} 
            percentage="18.18%" 
            dotColor="bg-warning-yellow" 
            bgColor="bg-[#fefce8]"
          />
          <OverviewIntervalCard 
            label="紫色区间" 
            count={5} 
            percentage="11.36%" 
            dotColor="bg-info-purple" 
            bgColor="bg-[#f5f3ff]"
          />
          <OverviewIntervalCard 
            label="红色区间" 
            count={14} 
            percentage="31.82%" 
            dotColor="bg-danger-red" 
            bgColor="bg-[#fff1f1]"
          />
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8 bg-white rounded-lg shadow-sm p-4 border border-gray-100 min-h-[460px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">数据表现分布落位</span>
                <HelpCircle className="w-4 h-4 text-blue-400 cursor-pointer" />
                <div className="relative group/logic">
                  <span className="text-xs text-blue-500 cursor-pointer font-medium hover:underline">逻辑说明</span>
                  <div className="absolute left-0 top-full mt-2 hidden group-hover/logic:block z-50 w-48 p-4 bg-white rounded-lg shadow-2xl border border-gray-100 pointer-events-none">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-success-green"></div>
                        <span className="text-[11px] font-bold text-gray-700">绿色区间：优秀地区</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-warning-yellow"></div>
                        <span className="text-[11px] font-bold text-gray-700">黄色区间：潜力地区</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-info-purple"></div>
                        <span className="text-[11px] font-bold text-gray-700">紫色区间：保持地区</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-danger-red"></div>
                        <span className="text-[11px] font-bold text-gray-700">红色区间：关注地区</span>
                      </div>
                    </div>
                    <div className="absolute top-[-8px] left-6 border-8 border-transparent border-b-white"></div>
                  </div>
                </div>
                <span className="text-xs text-gray-400 font-normal ml-2">选择散点可查看右侧数据详情</span>
              </div>
              {selectedRegion === '业务区整体' && (
                <div className="bg-gray-100/50 rounded p-0.5 flex border border-gray-200">
                  {['全部', 'A组', 'B组', 'C组', 'D组', 'E组'].map((group, i) => (
                    <button 
                      key={group}
                      onClick={() => setQuadrantGroup(group)}
                      className={`px-3 py-0.5 rounded text-[10px] font-bold transition-all ${quadrantGroup === group ? 'bg-white shadow-sm text-brand-blue border border-gray-100' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                      {group}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex-1 flex items-center justify-center relative overflow-hidden">
              <GlobalQuadrantChart selectedGroup={quadrantGroup} selectedRegion={selectedRegion} />
            </div>
            <div className="flex items-center justify-center gap-4 mt-2">
               <div className="flex items-center gap-2">
                 <div className="w-px h-2 bg-gray-300"></div>
                 <span className="text-[10px] text-gray-400">排序低 → 排序高</span>
               </div>
               <span className="text-[10px] font-bold text-gray-600">当月指标亮灯结果汇总得分排序</span>
            </div>
          </div>
          
          <div className="col-span-4 bg-white rounded-lg shadow-sm p-4 border border-gray-100 min-h-[460px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-800">数据详情—</span>
                <select 
                  value={selectedRegion}
                  onChange={(e) => {
                    setSelectedRegion(e.target.value);
                    onRegionChange?.(e.target.value);
                  }}
                  className="bg-blue-100 text-brand-blue px-2 py-0.8 rounded text-xs font-black border border-blue-200 outline-none cursor-pointer"
                >
                  {availableRegions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                <ChevronDown className="w-3 h-3 text-gray-400 -ml-6 pointer-events-none" />
              </div>
              <div className="flex items-center gap-2.5">
                <span 
                  onClick={onViewDistrictDetail}
                  className="text-[11px] text-brand-blue font-bold flex items-center gap-1 cursor-pointer hover:underline"
                >
                  <Layout className="w-3.5 h-3.5" /> 查看地区详情
                </span>
                <div className="h-4 w-px bg-gray-200"></div>
                <div className="bg-gray-100/50 rounded p-0.5 flex border border-gray-100">
                  <button 
                    onClick={() => setDataDetailMode('current')}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${dataDetailMode === 'current' ? 'bg-white shadow-sm text-brand-blue' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    看当月
                  </button>
                  <button 
                    onClick={() => setDataDetailMode('trend')}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${dataDetailMode === 'trend' ? 'bg-white shadow-sm text-brand-blue' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    看趋势
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
              {dataDetailMode === 'current' ? (
                <div className="space-y-4">
                  <div className="bg-gray-50/50 p-6 rounded-lg border border-gray-100 text-center shadow-inner">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-sm text-gray-600 font-medium">当月亮灯指标共</span>
                      <span className="text-4xl font-black text-gray-900">{professionalData.lights.total}</span>
                      <span className="text-sm text-gray-600">个</span>
                    </div>
                    <div className="text-[11px] text-gray-400 mt-3 font-medium">
                      {professionalData.lights.statusText}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:border-brand-blue/30 transition-all">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-3 h-3 bg-success-green rounded-full shadow-sm shadow-green-200"></div>
                        <span className="text-sm font-black text-gray-800 tracking-tight">绿灯指标</span>
                        <span className="text-2xl font-black ml-auto tabular-nums">{professionalData.lights.greenCount}</span>
                      </div>
                      <div className="text-[10px] text-gray-500 leading-relaxed font-medium">
                        {professionalData.lights.green.join('、')}
                      </div>
                    </div>
                    
                    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:border-brand-blue/30 transition-all">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-3 h-3 bg-warning-yellow rounded-full shadow-sm shadow-yellow-200"></div>
                        <span className="text-sm font-black text-gray-800 tracking-tight">黄绿/黄灯指标</span>
                        <span className="text-2xl font-black ml-auto tabular-nums">{professionalData.lights.yellowCount}</span>
                      </div>
                      <div className="text-[10px] text-gray-500 leading-relaxed font-medium">
                        {professionalData.lights.yellow.join('、')}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-sm text-gray-600 font-bold">当月指标较上期</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">整体呈</span>
                      <span className="text-2xl font-black text-brand-blue">持平</span>
                      <span className="text-sm text-gray-600">趋势</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[13px] font-bold text-gray-800">趋势<span className="text-success-green mx-1">上升</span>指标</span>
                        <span className="text-xl font-black text-gray-900">2</span>
                        <span className="text-sm text-gray-400">↑</span>
                      </div>
                      <div className="text-[11px] text-gray-500 leading-relaxed font-medium">
                        人类类政策性收益得分 <span className="text-gray-400 mx-1">黄绿灯升为绿灯</span>，运作岗全量流失率 <span className="text-gray-400 mx-1">红灯升为黄灯</span>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[13px] font-bold text-gray-800">趋势<span className="text-danger-red mx-1">下降</span>指标</span>
                        <span className="text-xl font-black text-gray-900">2</span>
                        <span className="text-sm text-gray-400">↓</span>
                      </div>
                      <div className="text-[11px] text-gray-500 leading-relaxed font-medium">
                        人员风险管理健康度 <span className="text-gray-400 mx-1">黄绿灯降为黄灯</span>，新任网点负责人半年内未存活占比 <span className="text-gray-400 mx-1">绿灯降为黄灯</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Module 2.5: HR Dimensions */}
      <div id="hr-dimensions-section" className="space-y-6 pt-6 border-t border-gray-100">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-1 h-3.5 bg-blue-400 rounded-full"></div>
            <span className="text-sm font-bold text-gray-700">五维表现</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-4 flex flex-col items-center justify-center border-r border-gray-100">
              <HRFiveDimensionChart 
                data={professionalData.chart} 
              />
              <div className="mt-4 flex gap-4 text-[10px]">
                <div className="flex items-center gap-1.5">
                   <div className="w-2 h-2 bg-brand-blue rounded-sm"></div>
                   <span className="text-gray-500">{selectedRegion.includes('分拨') ? '分拨区均值' : '业务区均值'}</span>
                </div>
              </div>
            </div>
            <div className="col-span-8 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                {professionalData.dimensions.map((dim) => (
                  <div key={dim.name} className="bg-gray-50/50 rounded-xl p-4 border border-gray-100 hover:shadow-md transition-all group">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                        {dim.icon}
                      </div>
                      <span className="text-sm font-bold text-gray-800">{dim.name}</span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold">健康 (≥60%绿)</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {dim.good.map(tag => (
                            <span key={tag} className="text-[11px] text-gray-600 bg-white border border-gray-100 px-2 py-0.5 rounded shadow-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold">提能 (≥20%红)</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {dim.needsImprove.map(tag => (
                            <span key={tag} className="text-[11px] text-gray-600 bg-white border border-red-50 px-2 py-0.5 rounded shadow-sm border-dashed">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Bottom full width for the 5th dimension */}
              <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100 flex items-start gap-6">
                <div className="flex items-center gap-2 shrink-0">
                  <div className="p-1.5 bg-white rounded-lg shadow-sm">
                    <Search className="w-4 h-4 text-cyan-500" />
                  </div>
                  <span className="text-sm font-bold text-gray-800 whitespace-nowrap">组织氛围与风险</span>
                </div>
                <div className="flex gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold">健康度较好指标</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {professionalData.riskDimension.good.map(tag => (
                        <span key={tag} className="text-[11px] text-gray-600 bg-white border border-gray-100 px-2 py-0.5 rounded shadow-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold">需重点关注指标</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {professionalData.riskDimension.needsImprove.map(tag => (
                        <span key={tag} className="text-[11px] text-gray-600 bg-white border border-red-50 px-2 py-0.5 rounded shadow-sm border-dashed">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Module 3: Metrics Detail / Specific Performance */}
      <div className="space-y-4 pt-4 border-t border-gray-100">
        {/* Global Metrics Table */}
        <div id="details-section" className="space-y-4 font-sans">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-3.5 bg-blue-400 rounded-full"></div>
            <h2 className="text-sm font-bold text-gray-700">具体指标表现对比</h2>
            <div className="flex gap-4 ml-6">
              <button 
                onClick={() => setTableToggleView('module')}
                className={`text-sm font-bold border-b-2 pb-1 transition-all ${tableToggleView === 'module' ? 'border-brand-blue text-brand-blue' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
              >
                按模块看
              </button>
              <button 
                onClick={() => setTableToggleView('team')}
                className={`text-sm font-bold border-b-2 pb-1 transition-all ${tableToggleView === 'team' ? 'border-brand-blue text-brand-blue' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
              >
                按队伍看
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50/30 flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-gray-500 font-bold">{label1}:</span>
                <div className="relative">
                  <div 
                    onClick={() => setOpenFilterDropdown(openFilterDropdown === 'module' ? null : 'module')}
                    className="flex items-center gap-2 border border-gray-300 rounded px-2 py-1 min-w-[100px] bg-white cursor-pointer hover:border-brand-blue"
                  >
                    <span className="text-[11px]">{activeFilters.module}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-auto" />
                  </div>
                  {openFilterDropdown === 'module' && (
                    <div className="absolute top-full left-0 mt-1 w-32 bg-white border border-gray-200 rounded shadow-xl z-50 py-1">
                      {currentOptions1.map(m => (
                        <div 
                          key={m} 
                          onClick={() => {
                            setActiveFilters({...activeFilters, module: m, dimension: '全部'});
                            setOpenFilterDropdown(null);
                          }}
                          className={`px-3 py-1.5 text-[11px] cursor-pointer hover:bg-gray-50 ${activeFilters.module === m ? 'text-brand-blue font-bold bg-blue-50' : 'text-gray-600'}`}
                        >
                          {m}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-gray-500 font-bold">{label2}:</span>
                <div className="relative">
                  <div 
                    onClick={() => setOpenFilterDropdown(openFilterDropdown === 'dimension' ? null : 'dimension')}
                    className="flex items-center gap-2 border border-gray-300 rounded px-2 py-1 min-w-[120px] bg-white cursor-pointer hover:border-brand-blue"
                  >
                    <span className="text-[11px] text-gray-900 truncate max-w-[100px]">{activeFilters.dimension}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-auto" />
                  </div>
                  {openFilterDropdown === 'dimension' && (
                    <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded shadow-xl z-50 py-1 max-h-60 overflow-y-auto">
                      {currentOptions2.map(d => (
                        <div 
                          key={d} 
                          onClick={() => {
                            setActiveFilters({...activeFilters, dimension: d});
                            setOpenFilterDropdown(null);
                          }}
                          className={`px-3 py-1.5 text-[11px] cursor-pointer hover:bg-gray-50 ${activeFilters.dimension === d ? 'text-brand-blue font-bold bg-blue-50' : 'text-gray-600'}`}
                        >
                          {d}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-gray-500 font-bold">指标类型:</span>
                <div className="relative">
                  <div 
                    onClick={() => setOpenFilterDropdown(openFilterDropdown === 'type' ? null : 'type')}
                    className="flex items-center gap-2 border border-gray-300 rounded px-2 py-1 min-w-[100px] bg-white cursor-pointer hover:border-brand-blue"
                  >
                    <span className="text-[11px]">{activeFilters.type}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-auto" />
                  </div>
                  {openFilterDropdown === 'type' && (
                    <div className="absolute top-full left-0 mt-1 w-32 bg-white border border-gray-200 rounded shadow-xl z-50 py-1">
                      {types.map(t => (
                        <div 
                          key={t} 
                          onClick={() => {
                            setActiveFilters({...activeFilters, type: t});
                            setOpenFilterDropdown(null);
                          }}
                          className={`px-3 py-1.5 text-[11px] cursor-pointer hover:bg-gray-50 ${activeFilters.type === t ? 'text-brand-blue font-bold bg-blue-50' : 'text-gray-600'}`}
                        >
                          {t}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold">指标详情清单</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 text-xs text-brand-blue font-medium">
                  <span className="flex items-center gap-1 cursor-pointer"><HelpCircle className="w-4 h-4" /> 逻辑说明</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">隐藏空值</span>
                  <button 
                    onClick={() => setIsHideEmpty(!isHideEmpty)}
                    className={`w-10 h-5 rounded-full p-0.5 transition-colors ${isHideEmpty ? 'bg-brand-blue' : 'bg-gray-300'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isHideEmpty ? 'translate-x-5' : 'translate-x-0'}`}></div>
                  </button>
                </div>
              </div>
            </div>
            <GlobalMetricsTable filters={activeFilters} viewType={tableToggleView} />
          </div>

          {/* Key Work Delivery Section */}
          <div id="key-work-section" className="scroll-mt-48">
            <KeyWorkDeliveryModule restrictedOrg={selectedRegion} />
          </div>
        </div>
      </div>

      {/* Collaborative Influence Section */}
      <div id="collaborative-section" className="scroll-mt-48">
        <CollaborativeInfluenceModule restrictedOrg={selectedRegion} />
      </div>

      {/* Key Events Section */}
      <div id="key-events-section" className="scroll-mt-48">
        <KeyEventsModule restrictedOrg={selectedRegion} />
      </div>
    </motion.div>
  );
}
