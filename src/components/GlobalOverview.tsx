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
  ArrowUp,
  ExternalLink
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
  orgType?: string;
}

export default function GlobalOverview({ 
  isHideEmpty, 
  setIsHideEmpty, 
  selectedTime, 
  onViewDistrictDetail, 
  onMetricClick,
  initialRegion = '业务区整体',
  availableRegions = ['业务区整体', '速运福建区'],
  onRegionChange,
  orgType = '业务区'
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

  const showOperationalMetrics = !['M线', '仓储', '供应链'].includes(selectedRegion) && orgType !== '职能条线';
  const showProfessionalMetrics = orgType !== '职能条线';

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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-6 bg-brand-blue rounded-full"></div>
              <h2 className="text-lg font-bold text-gray-800 tracking-tight">经营达成</h2>
            </div>
            <a href="#" className="flex items-center gap-1.5 text-xs text-brand-blue border border-brand-blue hover:bg-blue-50 transition-colors px-3 py-1.5 rounded">
              <span>查看经营五维看板</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <OperationalMetricCard 
              title="经营五维-收入"
              value="4.5"
              unit="分"
              yoy={{ value: '11.2%', isUp: true }}
              mom={{ value: '8.4%', isUp: true }}
              status="green"
              onClick={() => onMetricClick?.('经营五维-收入')}
            />
            <OperationalMetricCard 
              title="经营五维-利润"
              value="4.2"
              unit="分"
              yoy={{ value: '6.5%', isUp: true }}
              mom={{ value: '4.2%', isUp: true }}
              status="yellow"
              onClick={() => onMetricClick?.('经营五维-利润')}
            />
          </div>
        </div>
      )}

      {/* Module 2: Professional Value Dashboard & Metrics Detail */}
      {showProfessionalMetrics && (
      <div id="professional-section" className="space-y-4 pt-4 border-t border-gray-100 scroll-mt-24">
        {/* Global Metrics Table Container */}
        <div className="space-y-4 font-sans">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-6 bg-brand-blue rounded-full"></div>
            <h2 className="text-lg font-bold text-gray-800 tracking-tight">专业价值</h2>
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

          <div className="bg-gray-50/50 p-3 rounded-lg border border-gray-100 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 font-bold">{label1}:</span>
              <div className="relative">
                <div 
                  onClick={() => setOpenFilterDropdown(openFilterDropdown === 'module' ? null : 'module')}
                  className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1.5 min-w-[120px] bg-white cursor-pointer hover:border-brand-blue transition-colors"
                >
                  <span className="text-xs text-gray-800 font-medium">{activeFilters.module}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-auto" />
                </div>
                {openFilterDropdown === 'module' && (
                  <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded shadow-xl z-50 py-1 max-h-60 overflow-y-auto">
                    {currentOptions1.map(m => (
                      <div 
                        key={m} 
                        onClick={() => {
                          setActiveFilters({...activeFilters, module: m, dimension: '全部'});
                          setOpenFilterDropdown(null);
                        }}
                        className={`px-3 py-2 text-xs cursor-pointer hover:bg-gray-50 ${activeFilters.module === m ? 'text-brand-blue font-bold bg-blue-50' : 'text-gray-600'}`}
                      >
                        {m}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 font-bold">{label2}:</span>
              <div className="relative">
                <div 
                  onClick={() => setOpenFilterDropdown(openFilterDropdown === 'dimension' ? null : 'dimension')}
                  className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1.5 min-w-[160px] bg-white cursor-pointer hover:border-brand-blue transition-colors"
                >
                  <span className="text-xs text-gray-800 font-medium truncate max-w-[120px]">{activeFilters.dimension}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-auto" />
                </div>
                {openFilterDropdown === 'dimension' && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded shadow-xl z-50 py-1 max-h-60 overflow-y-auto">
                    {currentOptions2.map(d => (
                      <div 
                        key={d} 
                        onClick={() => {
                          setActiveFilters({...activeFilters, dimension: d});
                          setOpenFilterDropdown(null);
                        }}
                        className={`px-3 py-2 text-xs cursor-pointer hover:bg-gray-50 ${activeFilters.dimension === d ? 'text-brand-blue font-bold bg-blue-50' : 'text-gray-600'}`}
                      >
                        {d}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mt-4">
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
        </div>
      </div>
      )}

      {/* Key Work Delivery Section */}
      <div id="key-work-section" className="scroll-mt-48">
        <KeyWorkDeliveryModule restrictedOrg={selectedRegion} />
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
