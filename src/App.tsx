/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  BarChart3, 
  ChevronDown, 
  Download, 
  HelpCircle, 
  LayoutDashboard, 
  LogOut, 
  Menu, 
  MessageSquare, 
  Settings, 
  User,
  Search,
  History,
  Share2,
  Table as TableIcon,
  Layout,
  TrendingUp,
  TrendingDown,
  Bell,
  ArrowUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import QuadrantChart from './components/QuadrantChart';
import SummaryCard from './components/SummaryCard';
import MetricsTable, { tableData } from './components/MetricsTable';
import GlobalOverview from './components/GlobalOverview';
import OperationalMetricCard from './components/OperationalMetricCard';
import MetricDetailModal from './components/MetricDetailModal';
import HRFiveDimensionChart from './components/HRFiveDimensionChart';
import AssessmentResultsModule from './components/AssessmentResultsModule';
import CollaborativeInfluenceModule from './components/CollaborativeInfluenceModule';
import KeyEventsModule from './components/KeyEventsModule';
import KeyWorkDeliveryModule from './components/KeyWorkDeliveryModule';
import RiskManagementModule from './components/RiskManagementModule';
import TeamStructureModule from './components/TeamStructureModule';
import HistoryLightingDrawer from './components/HistoryLightingDrawer';

export default function App() {
  const [activeTab, setActiveTab] = useState('业务区');
  const [activeSection, setActiveSection] = useState('经营达成');
  const [isHideEmpty, setIsHideEmpty] = useState(true);

  const tabConfig: Record<string, string[]> = {
    '业务区': ['业务区整体', '速运福建区'],
    '分拨区': ['分拨区整体', '华西分拨区'],
    '职能条线': ['M线'],
    'BU': ['仓储'],
    'BG': ['供应链']
  };

  const [selectedOrg, setSelectedOrg] = useState('业务区整体');

  // Sync selectedOrg when activeTab changes
  useEffect(() => {
    setSelectedOrg(tabConfig[activeTab][0]);
  }, [activeTab]);

  useEffect(() => {
    if (selectedOrg !== '速运福建区') return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            const tabMap: Record<string, string> = {
              'assessment-section': '评价结果',
              'operational-section': '经营达成',
              'professional-section': '专业价值',
              'key-work-section': '重点工作',
              'hr-dimensions-section': '专业价值',
              'details-section': '专业价值',
              'collaborative-section': '协同影响',
              'key-events-section': '关键事件',
              'risk-section': '风险管理',
              'team-structure-section': '队伍结构'
            };
            if (tabMap[sectionId]) {
              setActiveSection(tabMap[sectionId]);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '-180px 0px -60% 0px' }
    );

    const sections = [
      'assessment-section',
      'operational-section',
      'professional-section',
      'key-work-section',
      'hr-dimensions-section',
      'details-section',
      'collaborative-section',
      'key-events-section',
      'risk-section',
      'team-structure-section'
    ];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [selectedOrg]);
  const [isOrgDropdownOpen, setIsOrgDropdownOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState('2026年4月');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [detailTab, setDetailTab] = useState<'current' | 'trend'>('current');
  const [tableToggleView, setTableToggleView] = useState<'module' | 'team'>('module');
  const [scatterFilter, setScatterFilter] = useState<'all' | 'groupC'>('all');
  const [isLogicOpen, setIsLogicOpen] = useState(false);

  // New filter states
  const [activeFilters, setActiveFilters] = useState({
    module: '全部',
    dimension: '全部',
    type: '全部',
    light: '全部'
  });
  const [openFilterDropdown, setOpenFilterDropdown] = useState<string | null>(null);

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

  // Extract unique filter options from tableData
  const modules = ['全部', ...new Set(tableData.map(d => d.module))];
  const dimensions = ['全部', ...new Set(tableData.map(d => d.dimension))];
  
  const teams = ['全部', ...new Set(tableData.map(d => getTeamName(d.module)))];
  const groups = ['全部', ...new Set(tableData.map(d => getAssociatedGroup(d.module)))];
  
  const types = ['全部', ...new Set(tableData.flatMap(d => d.items.map(item => item.type)))];
  const lightResults = ['全部', ...new Set(tableData.flatMap(d => d.items.map(item => item.lightStatus)))];

  const handleMetricClick = (title: string) => {
    setModalTitle(title);
    setIsModalOpen(true);
  };

  const orgs = tabConfig[activeTab] || [];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <header className="bg-brand-blue text-white h-12 flex items-center px-4 justify-between sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <LayoutDashboard className="w-6 h-6 fill-white" />
            <span>智策平台</span>
          </div>
          <nav className="flex items-center gap-6 text-sm font-medium text-white/80">
            <a href="#" className="hover:text-white transition-colors">智策首页</a>
            <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
              <span>综合分析</span>
              <ChevronDown className="w-4 h-4 opacity-50" />
            </div>
            <div className="flex items-center gap-1 cursor-pointer text-white border-b-2 border-white pb-1 mt-1 transition-colors">
              <span>主题分析</span>
              <ChevronDown className="w-4 h-4 opacity-50" />
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
              <span>数据服务</span>
              <ChevronDown className="w-4 h-4 opacity-50" />
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
              <span>后台配置</span>
              <ChevronDown className="w-4 h-4 opacity-50" />
            </div>
          </nav>
        </div>
        <div className="flex items-center gap-4 text-sm whitespace-nowrap">
          <div className="flex items-center gap-1 cursor-pointer hover:bg-white/10 px-2 py-1 rounded">
            <span>工具</span>
            <ChevronDown className="w-4 h-4 opacity-50" />
          </div>
          <a href="#" className="hover:text-white transition-colors">权限中心</a>
          <a href="#" className="hover:text-white transition-colors">下载任务</a>
          <div className="flex items-center gap-3 ml-4 border-l border-white/20 pl-4">
            <HelpCircle className="w-5 h-5 opacity-70 cursor-pointer hover:opacity-100" />
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center cursor-pointer">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </header>

      {/* Sub Header / Breadcrumbs */}
      <div className="bg-white border-b border-gray-200 h-10 flex items-center px-4 gap-4 shadow-sm sticky top-12 z-40">
        <div className="flex items-center text-xs text-gray-500 gap-1 hover:text-brand-blue cursor-pointer">
          <ChevronDown className="w-4 h-4 rotate-90" />
          <span>智策首页</span>
        </div>
        <div className="h-full flex items-center border-b-2 border-brand-blue px-2 gap-2 text-brand-blue text-xs font-semibold">
          <span>HRBP关键监测指标</span>
          <span className="text-gray-400 font-normal hover:text-red-500 cursor-pointer">×</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border-b border-gray-200 h-12 px-4 flex items-center justify-between sticky top-[88px] z-30 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex border-b border-transparent">
            {['业务区', '分拨区', '职能条线', 'BU', 'BG'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1 text-sm font-medium transition-all relative ${
                  activeTab === tab ? 'text-brand-blue' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="underline" 
                    className="absolute bottom-[-9px] left-0 right-0 h-0.5 bg-brand-blue" 
                  />
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 relative">
            <span className="text-xs text-gray-500">组织：</span>
            <div 
              onClick={() => setIsOrgDropdownOpen(!isOrgDropdownOpen)}
              className="flex items-center gap-1 border border-gray-300 rounded px-3 py-1 bg-gray-50 cursor-pointer hover:border-brand-blue min-w-[120px]"
            >
              <span className="text-xs">{selectedOrg}</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOrgDropdownOpen ? 'rotate-180' : ''}`} />
            </div>
            {isOrgDropdownOpen && (
              <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
                {orgs.map(org => (
                  <div 
                    key={org}
                    onClick={() => {
                      setSelectedOrg(org);
                      setIsOrgDropdownOpen(false);
                    }}
                    className={`px-4 py-2 text-xs cursor-pointer hover:bg-gray-100 ${selectedOrg === org ? 'text-brand-blue font-bold bg-blue-50' : ''}`}
                  >
                    {org}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">时间：</span>
            <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1 bg-gray-50 cursor-pointer hover:border-brand-blue min-w-[120px]">
              <span className="text-xs">{selectedTime}</span>
              <BarChart3 className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          <button className="bg-brand-blue text-white px-6 py-1 rounded text-sm hover:bg-blue-800 transition-colors">查询</button>
          <button className="flex items-center gap-2 text-brand-blue text-xs font-medium border border-transparent hover:border-brand-blue rounded px-2 py-1 transition-all">
            <Download className="w-4 h-4" />
            <span>图片下载</span>
          </button>
        </div>
      </div>

      {/* Module Navigation Tabs */}
      <div className="bg-white border-b border-gray-100 py-2 px-4 sticky top-[136px] z-20 shadow-sm overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-3">
            {[
              { name: '评价结果', id: 'assessment' },
              { name: '经营达成', id: 'operational' },
              { name: '专业价值', id: 'professional' },
              { name: '重点工作', id: 'key-work' },
              { name: '协同影响', id: 'collaborative' },
              { name: '关键事件', id: 'key-events' },
              { name: '风险管理', id: 'risk' },
              { name: '队伍结构', id: 'team-structure' }
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.name);
                  const el = document.getElementById(`${section.id}-section`);
                  if (el) {
                    const headerOffset = 190;
                    const elementPosition = el.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
                className={`px-4 py-2 rounded text-xs font-bold transition-all whitespace-nowrap ${
                  activeSection === section.name 
                    ? 'bg-blue-50 text-brand-blue' 
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {section.name}
              </button>
            ))}
          </div>
        </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 space-y-6 pb-20">
        {(selectedOrg === '速运福建区' || selectedOrg === '华西分拨区' || selectedOrg === 'M线' || selectedOrg === '仓储' || selectedOrg === '供应链') ? (
          <motion.div 
            key="district-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div id="assessment-section">
              <AssessmentResultsModule restrictedOrg={selectedOrg} />
            </div>

            {/* Module 1: Operational Metrics */}
            <div id="operational-section" className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-6 bg-brand-blue rounded-full"></div>
                <h2 className="text-lg font-bold text-gray-800 tracking-tight">经营/关键任务达成</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <OperationalMetricCard 
                  title="收入达成率"
                  value="102.3"
                  unit="%"
                  groupAvg="98.5%"
                  yoy={{ value: '13.94%', isUp: true }}
                  mom={{ value: '11.45%', isUp: false }}
                  status="green"
                  onClick={() => handleMetricClick('收入达成率')}
                />
                <OperationalMetricCard 
                  title="核心税前利润额达成率"
                  value="98.5"
                  unit="%"
                  groupAvg="95.2%"
                  yoy={{ value: '8.22%', isUp: true }}
                  mom={{ value: '5.10%', isUp: true }}
                  status="yellow"
                  onClick={() => handleMetricClick('核心税前利润额达成率')}
                />
              </div>
            </div>

            {/* Module 2: Professional Value Dashboard */}
            <div id="professional-section" className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-6 bg-brand-blue rounded-full"></div>
                <h2 className="text-lg font-bold text-gray-800 tracking-tight">专业价值</h2>
              </div>

              {/* Submodule: Quadrant Placement */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-3.5 bg-blue-400 rounded-full"></div>
                  <span className="text-sm font-bold text-gray-700">四象限落位</span>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <SummaryCard 
                    title="四象限区间" 
                    value="黄色区间" 
                    valueColor="text-warning-yellow"
                  />
                  <SummaryCard 
                    title="当月表现对比各区" 
                    value="低于均值" 
                    highlight="低于"
                    highlightColor="text-danger-red"
                    valueColor="text-gray-900"
                  />
                  <SummaryCard 
                    title="对比三个月历史趋势" 
                    value="上升" 
                    highlight="上升"
                    highlightColor="text-success-green"
                    valueColor="text-gray-900"
                  />
                </div>

                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-8 bg-white rounded-xl border border-gray-100 p-4 shadow-sm min-h-[460px] flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 relative">
                        <span className="text-sm font-bold text-gray-800">数据表现</span>
                        <HelpCircle className="w-4 h-4 text-blue-400 cursor-pointer" />
                        <span 
                          onClick={() => setIsLogicOpen(!isLogicOpen)}
                          className="text-xs text-brand-blue cursor-pointer hover:underline font-medium"
                        >
                          逻辑说明
                        </span>
                        
                        <AnimatePresence>
                          {isLogicOpen && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 p-5"
                            >
                               <div className="flex items-center justify-between mb-4">
                                 <h3 className="text-lg font-black text-gray-900 tracking-tight">逻辑说明</h3>
                                 <button onClick={() => setIsLogicOpen(false)} className="text-gray-400 hover:text-gray-900">×</button>
                               </div>
                               <div className="space-y-3">
                                 {[
                                   { color: 'bg-success-green', text: '绿色区间：优秀地区' },
                                   { color: 'bg-warning-yellow', text: '黄色区间：潜力地区' },
                                   { color: 'bg-info-purple', text: '紫色区间：保持地区' },
                                   { color: 'bg-danger-red', text: '红色区间：关注地区' }
                                 ].map((item, idx) => (
                                   <div key={idx} className="flex items-center gap-3">
                                     <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                                     <span className="text-sm text-gray-600 font-medium">{item.text}</span>
                                   </div>
                                 ))}
                               </div>
                               <div className="absolute -top-2 left-10 w-4 h-4 bg-white border-t border-l border-gray-100 transform rotate-45"></div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className="bg-gray-100/50 rounded p-0.5 flex border border-gray-200">
                        <button 
                          onClick={() => setScatterFilter('all')}
                          className={`${scatterFilter === 'all' ? 'bg-white shadow-sm text-brand-blue' : 'text-gray-500 hover:text-gray-900'} px-3 py-0.5 rounded text-[10px] font-bold transition-all`}
                        >
                          全部
                        </button>
                        <button 
                          onClick={() => setScatterFilter('groupC')}
                          className={`${scatterFilter === 'groupC' ? 'bg-white shadow-sm text-brand-blue' : 'text-gray-500 hover:text-gray-900'} px-3 py-0.5 rounded text-[10px] font-bold transition-all`}
                        >
                          C组
                        </button>
                      </div>
                    </div>
                    <div className="flex-1 flex items-center justify-center relative overflow-hidden">
                      <QuadrantChart viewMode="district" filter={scatterFilter} />
                    </div>
                  </div>
                  
                  <div className="col-span-4 bg-white rounded-xl border border-gray-100 p-4 flex flex-col shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-bold text-gray-800">数据详情</span>
                      <div className="bg-gray-100/50 rounded p-0.5 flex border border-gray-200">
                        <button 
                          onClick={() => setDetailTab('current')}
                          className={`${detailTab === 'current' ? 'bg-white shadow-sm text-brand-blue' : 'text-gray-500 hover:text-gray-900'} px-3 py-0.5 rounded text-[10px] font-bold transition-all`}
                        >
                          看当月
                        </button>
                        <button 
                          onClick={() => setDetailTab('trend')}
                          className={`${detailTab === 'trend' ? 'bg-white shadow-sm text-brand-blue' : 'text-gray-500 hover:text-gray-900'} px-3 py-0.5 rounded text-[10px] font-bold transition-all`}
                        >
                          看趋势
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-4 h-full flex flex-col">
                      {detailTab === 'current' ? (
                        <div className="space-y-4 h-full flex flex-col">
                          <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm">
                            <div className="flex items-baseline gap-2 mb-2">
                              <span className="text-sm text-gray-600 font-medium">当月亮灯指标共</span>
                              <span className="text-3xl font-black text-gray-900">10</span>
                              <span className="text-sm text-gray-600">个</span>
                              <ArrowUp className="w-4 h-4 text-gray-300" />
                            </div>
                            <div className="text-xs text-gray-400 font-medium">
                              所有指标综合亮灯得分排序 <span className="text-danger-red font-bold">低于</span> 地区值
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm relative overflow-hidden">
                              <div className="flex items-center gap-2 mb-3">
                                <Bell className="w-4 h-4 text-red-400" />
                                <span className="text-sm font-bold text-gray-800">红灯指标</span>
                                <span className="text-2xl font-black text-gray-900 ml-auto leading-none">2</span>
                                <span className="text-[10px] text-gray-400 self-end mb-1">个</span>
                              </div>
                              <div className="text-[10px] text-gray-400 space-y-2 leading-relaxed">
                                <p>一线平台用工占比：<span className="font-bold text-gray-700">8.13%</span></p>
                                <p>一线月薪增长达成率：<span className="font-bold text-gray-700">50.18%</span></p>
                              </div>
                            </div>
                            
                            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                              <div className="flex items-center gap-2 mb-3">
                                <Bell className="w-4 h-4 text-orange-400" />
                                <span className="text-sm font-bold text-gray-800">红黄灯指标</span>
                                <span className="text-2xl font-black text-gray-900 ml-auto leading-none">0</span>
                                <span className="text-[10px] text-gray-400 self-end mb-1">个</span>
                              </div>
                              <div className="text-[10px] text-gray-400 font-medium pt-2">
                                无
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4 h-full flex flex-col">
                          <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm">
                            <div className="flex items-baseline gap-2 mb-2">
                              <span className="text-sm text-gray-600 font-bold">当月指标较上期</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                              <span className="text-sm text-gray-600">整体呈</span>
                              <span className="text-2xl font-black text-success-green">改善</span>
                              <span className="text-sm text-gray-600">趋势</span>
                            </div>
                          </div>
                          
                          <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm h-full">
                            <div className="flex items-baseline gap-1 mb-4">
                              <span className="text-sm font-bold text-gray-800">趋势</span>
                              <span className="text-sm font-bold text-success-green">上升</span>
                              <span className="text-sm font-bold text-gray-800 ml-1">指标</span>
                              <span className="text-2xl font-black text-gray-900 ml-1">1</span>
                              <span className="text-xs text-gray-400 ml-1">个</span>
                              <TrendingUp className="w-4 h-4 text-success-green ml-auto" />
                            </div>
                            <div className="text-xs text-gray-400 leading-relaxed space-y-1">
                              <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-success-green rounded-full"></div>
                                <span>一线月薪增长达成率：<span className="text-danger-red font-bold">红灯</span> 升为 <span className="text-success-green font-bold">绿灯</span></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Merged Module: Overall Achievement & HR Dimensions */}
              <div id="hr-dimensions-section" className="space-y-6 pt-6 border-t border-gray-100">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-3.5 bg-blue-400 rounded-full"></div>
                    <span className="text-sm font-bold text-gray-700">五维表现</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                  <div className="grid grid-cols-3 gap-6 divide-x divide-gray-50">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-1 mb-2">
                        <span className="text-xs text-gray-400 font-medium">整体平均分</span>
                        <div className="relative group/tooltip">
                          <HelpCircle className="w-3 h-3 text-gray-300 cursor-help" />
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover/tooltip:block z-50 w-56 p-2 bg-gray-900/95 backdrop-blur-md text-white text-[10px] rounded shadow-xl pointer-events-none border border-white/10">
                            <div className="font-bold text-blue-400 border-b border-white/10 pb-1 mb-1">计算逻辑</div>
                            <p className="leading-relaxed opacity-90">整体平均分为所有指标的得分均值，绿灯为5分，黄绿灯4分，黄灯3分，红黄灯2分，红灯1分，不亮灯指标不计分</p>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900/95"></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-brand-blue">4.6</span>
                        <span className="text-[10px] text-gray-400">分</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-1 mb-2">
                        <span className="text-xs text-gray-400 font-medium">全网排名</span>
                        <div className="relative group/tooltip">
                          <HelpCircle className="w-3 h-3 text-gray-300 cursor-help" />
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover/tooltip:block z-50 w-48 p-2 bg-gray-900/95 backdrop-blur-md text-white text-[10px] rounded shadow-xl pointer-events-none border border-white/10">
                            <div className="font-bold text-blue-400 border-b border-white/10 pb-1 mb-1">计算逻辑</div>
                            <p className="leading-relaxed opacity-90">整体平均分在全网35个业务区中排名</p>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900/95"></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-black text-gray-800">19</span>
                          <span className="text-[10px] text-gray-400 inline-block px-1 font-bold">/ 35名</span>
                        </div>
                        <div className="flex items-center gap-0.5 text-[10px] font-bold text-green-500">
                          环比趋势 <TrendingUp className="w-2.5 h-2.5" /> 2名
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-1 mb-2">
                        <span className="text-xs text-gray-400 font-medium">分组排名</span>
                        <div className="relative group/tooltip">
                          <HelpCircle className="w-3 h-3 text-gray-300 cursor-help" />
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover/tooltip:block z-50 w-48 p-2 bg-gray-900/95 backdrop-blur-md text-white text-[10px] rounded shadow-xl pointer-events-none border border-white/10">
                            <div className="font-bold text-blue-400 border-b border-white/10 pb-1 mb-1">计算逻辑</div>
                            <p className="leading-relaxed opacity-90">整体平均分在同组业务区中排名</p>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900/95"></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-black text-gray-800">3</span>
                          <span className="text-[10px] text-gray-400 inline-block px-1 font-bold">/ 6名</span>
                        </div>
                        <div className="flex items-center gap-0.5 text-[10px] font-bold text-red-500">
                          环比趋势 <TrendingDown className="w-2.5 h-2.5" /> 1名
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-4 bg-white rounded-xl border border-gray-100 p-4 shadow-sm h-[400px] flex flex-col items-center relative overflow-hidden">
                    <div className="w-full flex items-center gap-2 mb-4">
                      <div className="w-1 h-3 bg-blue-400 rounded-full"></div>
                      <span className="text-xs font-bold text-gray-700">五维表现分布</span>
                    </div>
                    <div className="flex-1 flex items-center justify-center w-full">
                      <HRFiveDimensionChart 
                      data={[
                        { axis: '组织效率', value: 4.17 },
                        { axis: '薪酬竞争力', value: 2.73 },
                        { axis: '队伍建设', value: 4.33 },
                        { axis: '人员保有', value: 4.5 },
                        { axis: '组织氛围与风险', value: 4.96 },
                      ]} 
                      avgData={[
                        { axis: '组织效率', value: 3.8 },
                        { axis: '薪酬竞争力', value: 3.2 },
                        { axis: '队伍建设', value: 4.0 },
                        { axis: '人员保有', value: 4.2 },
                        { axis: '组织氛围与风险', value: 4.5 },
                      ]}
                    />
                  </div>
                </div>
                  
                <div className="col-span-8 bg-white rounded-xl border border-gray-100 p-4 shadow-sm h-[400px] overflow-y-auto">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="bg-red-50 p-1.5 rounded-lg">
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      </div>
                      <span className="text-sm font-bold text-gray-800">需关注</span>
                    </div>
                    
                    <div className="space-y-6 px-2">
                      {/* 组织效率 */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-warning-yellow"></div>
                          <span className="text-sm font-bold text-gray-700">组织效率：<span className="font-medium text-gray-500 ml-1">弱项维度为</span>人均创收</span>
                        </div>
                        <div className="pl-6 space-y-2">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-warning-yellow"></div>
                              <span className="text-xs text-gray-600">人均创收(一二三线整体)：累计<span className="font-bold text-gray-900 mx-1">4.17分</span></span>
                            </div>
                            <span className="text-[10px] text-green-500 font-bold flex items-center gap-0.5">同比 +3.5% <TrendingUp className="w-2.5 h-2.5" /></span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-warning-yellow"></div>
                              <span className="text-xs text-gray-600">人工成本占收入比：累计<span className="font-bold text-gray-900 mx-1">92.5%</span></span>
                            </div>
                            <span className="text-[10px] text-green-500 font-bold flex items-center gap-0.5">改善 <ArrowUp className="w-2.5 h-2.5 rotate-180" /></span>
                          </div>
                        </div>
                      </div>

                      {/* 薪酬竞争力 */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-warning-yellow"></div>
                          <span className="text-sm font-bold text-gray-700">薪酬竞争力：<span className="font-medium text-gray-500 ml-1">弱项维度为</span>职能三线绩优员工</span>
                        </div>
                        <div className="pl-6 space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-danger-red"></div>
                              <span className="text-xs text-gray-600">职能三线绩优员工薪酬竞争力：<span className="font-bold text-gray-900 mx-1">2.73分</span></span>
                            </div>
                            <span className="text-[10px] text-red-500 font-bold flex items-center gap-0.5">同比 -1.45% <TrendingDown className="w-2.5 h-2.5" /></span>
                          </div>
                        </div>
                      </div>

                      {/* 队伍建设 */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-warning-yellow"></div>
                          <span className="text-sm font-bold text-gray-700">队伍建设：<span className="font-medium text-gray-500 ml-1">弱项维度为</span>大学生队伍建设</span>
                        </div>
                        <div className="pl-6 space-y-2">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-warning-yellow"></div>
                              <span className="text-xs text-gray-600">大学生队伍建设：累计<span className="font-bold text-gray-900 mx-1">4.33分</span></span>
                            </div>
                            <span className="text-[10px] text-green-500 font-bold flex items-center gap-0.5">同比 +5.2% <TrendingUp className="w-2.5 h-2.5" /></span>
                          </div>
                        </div>
                      </div>

                      {/* 人员保有 */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-warning-yellow"></div>
                          <span className="text-sm font-bold text-gray-700">人员保有：<span className="font-medium text-gray-500 ml-1">弱项维度为</span>一线流失率</span>
                        </div>
                        <div className="pl-6 space-y-2">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-danger-red"></div>
                              <span className="text-xs text-gray-600">一线面客群体流失率：累计<span className="font-bold text-gray-900 mx-1">4.5分</span></span>
                            </div>
                            <span className="text-[10px] text-red-500 font-bold flex items-center gap-0.5">异动明显 <Bell className="w-2.5 h-2.5" /></span>
                          </div>
                        </div>
                      </div>

                      {/* 组织氛围与风险 */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-warning-yellow"></div>
                          <span className="text-sm font-bold text-gray-700">组织氛围与风险：<span className="font-medium text-gray-500 ml-1">弱项维度为</span>人员风险健康度</span>
                        </div>
                        <div className="pl-6 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-warning-yellow"></div>
                              <span className="text-xs text-gray-600">人员风险健康度：累计<span className="font-bold text-gray-900 mx-1">4.96分</span></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            {/* Detailed Metrics Table Container */}
            <div id="details-section" className="space-y-4 pt-4 border-t border-gray-100 mt-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-3.5 bg-blue-400 rounded-full"></div>
                <h2 className="text-sm font-bold text-gray-700">具体指标表现对比</h2>
                <div className="flex gap-4 ml-6">
                  <button 
                    onClick={() => {
                      setTableToggleView('module');
                      setActiveFilters(prev => ({ ...prev, module: '全部', dimension: '全部' }));
                    }}
                    className={`text-sm font-bold pb-1 transition-all ${
                      tableToggleView === 'module' ? 'border-b-2 border-brand-blue text-brand-blue' : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    按模块看
                  </button>
                  <button 
                    onClick={() => {
                      setTableToggleView('team');
                      setActiveFilters(prev => ({ ...prev, module: '全部', dimension: '全部' }));
                    }}
                    className={`text-sm font-bold pb-1 transition-all ${
                      tableToggleView === 'team' ? 'border-b-2 border-brand-blue text-brand-blue' : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    按队伍看
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-gray-800">指标详情清单</span>
                    
                    {/* Module Filter (Team Filter) */}
                    <div className="relative">
                      <div 
                         onClick={() => setOpenFilterDropdown(openFilterDropdown === 'module' ? null : 'module')}
                         className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5 min-w-[140px] bg-gray-50 hover:border-brand-blue cursor-pointer transition-colors"
                      >
                        <span className="text-xs text-gray-400 mr-auto font-medium">{tableToggleView === 'module' ? '模块' : '队伍'} | <span className="text-gray-900">{activeFilters.module}</span></span>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openFilterDropdown === 'module' ? 'rotate-180' : ''}`} />
                      </div>
                      <AnimatePresence>
                        {openFilterDropdown === 'module' && (
                          <motion.div 
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded shadow-xl z-50 py-1"
                          >
                            {(tableToggleView === 'module' ? modules : teams).map(opt => (
                              <div 
                                key={opt}
                                onClick={() => {
                                  setActiveFilters(prev => ({ ...prev, module: opt }));
                                  setOpenFilterDropdown(null);
                                }}
                                className={`px-4 py-2 text-xs cursor-pointer hover:bg-gray-50 ${activeFilters.module === opt ? 'text-brand-blue bg-blue-50 font-bold' : 'text-gray-600'}`}
                              >
                                {opt}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Dimension Filter (Group Filter) */}
                    <div className="relative">
                      <div 
                        onClick={() => setOpenFilterDropdown(openFilterDropdown === 'dimension' ? null : 'dimension')}
                        className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5 min-w-[140px] bg-gray-50 hover:border-brand-blue cursor-pointer transition-colors"
                      >
                        <span className="text-xs text-gray-400 mr-auto font-medium">{tableToggleView === 'module' ? '维度' : '群体'} | <span className="text-gray-900">{activeFilters.dimension}</span></span>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openFilterDropdown === 'dimension' ? 'rotate-180' : ''}`} />
                      </div>
                      <AnimatePresence>
                        {openFilterDropdown === 'dimension' && (
                          <motion.div 
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded shadow-xl z-50 py-1 max-h-60 overflow-y-auto"
                          >
                            {(tableToggleView === 'module' ? dimensions : groups).map(opt => (
                              <div 
                                key={opt}
                                onClick={() => {
                                  setActiveFilters(prev => ({ ...prev, dimension: opt }));
                                  setOpenFilterDropdown(null);
                                }}
                                className={`px-4 py-2 text-xs cursor-pointer hover:bg-gray-50 ${activeFilters.dimension === opt ? 'text-brand-blue bg-blue-50 font-bold' : 'text-gray-600'}`}
                              >
                                {opt}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Type Filter */}
                    <div className="relative">
                      <div 
                        onClick={() => setOpenFilterDropdown(openFilterDropdown === 'type' ? null : 'type')}
                        className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5 min-w-[140px] bg-gray-50 hover:border-brand-blue cursor-pointer transition-colors"
                      >
                        <span className="text-xs text-gray-400 mr-auto font-medium">类型 | <span className="text-gray-900">{activeFilters.type}</span></span>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openFilterDropdown === 'type' ? 'rotate-180' : ''}`} />
                      </div>
                      <AnimatePresence>
                        {openFilterDropdown === 'type' && (
                          <motion.div 
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded shadow-xl z-50 py-1"
                          >
                            {types.map(opt => (
                              <div 
                                key={opt}
                                onClick={() => {
                                  setActiveFilters(prev => ({ ...prev, type: opt }));
                                  setOpenFilterDropdown(null);
                                }}
                                className={`px-4 py-2 text-xs cursor-pointer hover:bg-gray-50 ${activeFilters.type === opt ? 'text-brand-blue bg-blue-50 font-bold' : 'text-gray-600'}`}
                              >
                                {opt}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Light Filter */}
                    <div className="relative">
                      <div 
                        onClick={() => setOpenFilterDropdown(openFilterDropdown === 'light' ? null : 'light')}
                        className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5 min-w-[140px] bg-gray-50 hover:border-brand-blue cursor-pointer transition-colors"
                      >
                        <span className="text-xs text-gray-400 mr-auto font-medium">亮灯 | <span className="text-gray-900">{activeFilters.light}</span></span>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openFilterDropdown === 'light' ? 'rotate-180' : ''}`} />
                      </div>
                      <AnimatePresence>
                        {openFilterDropdown === 'light' && (
                          <motion.div 
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded shadow-xl z-50 py-1"
                          >
                            {lightResults.map(opt => (
                              <div 
                                key={opt}
                                onClick={() => {
                                  setActiveFilters(prev => ({ ...prev, light: opt }));
                                  setOpenFilterDropdown(null);
                                }}
                                className={`px-4 py-2 text-xs cursor-pointer hover:bg-gray-50 ${activeFilters.light === opt ? 'text-brand-blue bg-blue-50 font-bold' : 'text-gray-600'}`}
                              >
                                {opt}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-4 text-xs font-black text-brand-blue">
                      <button 
                        onClick={() => setIsHistoryDrawerOpen(true)}
                        className="flex items-center gap-1.5 hover:underline transition-all active:scale-95"
                      >
                        <History className="w-4 h-4" /> 查看历史灯种
                      </button>
                      <button className="flex items-center gap-1.5 bg-brand-blue text-white px-3 py-1.5 rounded-lg shadow-sm hover:bg-blue-800 transition-all active:scale-95"><Download className="w-4 h-4" /> 导出报表</button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 font-bold">隐藏空值</span>
                      <button 
                        onClick={() => setIsHideEmpty(!isHideEmpty)}
                        className={`w-11 h-6 rounded-full p-1 transition-colors duration-300 ${isHideEmpty ? 'bg-brand-blue' : 'bg-gray-300'}`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${isHideEmpty ? 'translate-x-5' : 'translate-x-0'}`}></div>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-1">
                  <MetricsTable 
                    viewMode="district" 
                    viewType={tableToggleView}
                    hideEmpty={isHideEmpty} 
                    onDetailClick={handleMetricClick}
                    filters={activeFilters}
                  />
                </div>
              </div>

              {/* Key Work Delivery Module added here */}
              <div id="key-work-section">
                <KeyWorkDeliveryModule restrictedOrg={selectedOrg} />
              </div>
            </div>

            {/* Collaborative Influence */}
            <div id="collaborative-section">
              <CollaborativeInfluenceModule restrictedOrg={selectedOrg} />
            </div>

            {/* Key Events */}
            <div id="key-events-section">
              <KeyEventsModule restrictedOrg={selectedOrg} />
            </div>

            {/* Module 3: Risk Management */}
            <div id="risk-section">
              <RiskManagementModule />
            </div>

            {/* Module 4: Team Structure Status */}
            <div id="team-structure-section">
              <TeamStructureModule />
            </div>
          </div>
        </motion.div>
      ) : (
          <GlobalOverview 
            isHideEmpty={isHideEmpty} 
            setIsHideEmpty={setIsHideEmpty} 
            selectedTime={selectedTime} 
            onMetricClick={handleMetricClick}
            initialRegion={selectedOrg}
            availableRegions={orgs}
            onRegionChange={setSelectedOrg}
            onViewDistrictDetail={() => {
              if (activeTab === '业务区') setSelectedOrg('速运福建区');
              else if (activeTab === '分拨区') setSelectedOrg('华西分拨区');
              else setSelectedOrg(orgs[0]);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      <MetricDetailModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={modalTitle} 
      />

      <HistoryLightingDrawer 
        isOpen={isHistoryDrawerOpen}
        onClose={() => setIsHistoryDrawerOpen(false)}
      />

      {/* Footer / Floating Action */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3">
        <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-100 cursor-pointer hover:bg-gray-50 transition-all text-brand-blue">
          <MessageSquare className="w-6 h-6" />
        </div>
        <div className="w-12 h-12 bg-brand-blue rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-blue-800 transition-all text-white relative">
          <Settings className="w-6 h-6" />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold">2</div>
        </div>
      </div>
    </div>
  );
}
