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
  ArrowUp,
  ExternalLink
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
              'collaborative-section': '协同影响',
              'key-events-section': '关键事件'
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
              { name: '关键事件', id: 'key-events' }
            ].filter(section => {
              if (activeTab === '职能条线' && (section.id === 'operational' || section.id === 'professional')) {
                return false;
              }
              return true;
            }).map((section) => (
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

            {activeTab !== '职能条线' && (
              <>
                {/* Module 1: Operational Metrics */}
                <div id="operational-section" className="space-y-3">
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
                  onClick={() => handleMetricClick('经营五维-收入')}
                />
                <OperationalMetricCard 
                  title="经营五维-利润"
                  value="4.2"
                  unit="分"
                  yoy={{ value: '6.5%', isUp: true }}
                  mom={{ value: '4.2%', isUp: true }}
                  status="yellow"
                  onClick={() => handleMetricClick('经营五维-利润')}
                />
              </div>
            </div>
            </>
            )}

            {/* Detailed Metrics Table Container */}
            <div id="professional-section" className="space-y-4 pt-4 border-t border-gray-100 mt-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-6 bg-brand-blue rounded-full"></div>
                <h2 className="text-lg font-bold text-gray-800 tracking-tight">专业价值</h2>
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

              <div className="bg-gray-50/50 p-3 rounded-lg border border-gray-100 flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-bold">{tableToggleView === 'module' ? '模块' : '队伍'}:</span>
                  <div className="relative">
                    <select 
                      className="text-xs bg-white border border-gray-300 rounded px-3 py-1.5 min-w-[120px] focus:ring-0 focus:border-brand-blue text-gray-800 font-medium cursor-pointer appearance-none"
                      style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                      value={activeFilters.module}
                      onChange={(e) => setActiveFilters(prev => ({ ...prev, module: e.target.value, dimension: '全部' }))}
                    >
                      {(tableToggleView === 'module' ? modules : teams).map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-bold">{tableToggleView === 'module' ? '维度' : '群体'}:</span>
                  <div className="relative">
                    <select 
                      className="text-xs bg-white border border-gray-300 rounded px-3 py-1.5 min-w-[160px] focus:ring-0 focus:border-brand-blue text-gray-800 font-medium cursor-pointer appearance-none truncate pr-8"
                      style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                      value={activeFilters.dimension}
                      onChange={(e) => setActiveFilters(prev => ({ ...prev, dimension: e.target.value }))}
                    >
                      {(tableToggleView === 'module' ? dimensions : groups).map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                
                {/* Light Filter */}
                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-xs text-gray-500 font-bold">亮灯:</span>
                  <div className="relative">
                    <select 
                      className="text-xs bg-white border border-gray-300 rounded px-3 py-1.5 min-w-[120px] focus:ring-0 focus:border-brand-blue text-gray-800 font-medium cursor-pointer appearance-none truncate pr-8"
                      style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                      value={activeFilters.light}
                      onChange={(e) => setActiveFilters(prev => ({ ...prev, light: e.target.value }))}
                    >
                      {lights.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-gray-800">指标详情清单</span>
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
            </div>

            {/* Key Work Delivery Module added here */}
            <div id="key-work-section">
              <KeyWorkDeliveryModule restrictedOrg={selectedOrg} />
            </div>

            {/* Collaborative Influence */}
            <div id="collaborative-section">
              <CollaborativeInfluenceModule restrictedOrg={selectedOrg} />
            </div>

            {/* Key Events */}
            <div id="key-events-section">
              <KeyEventsModule restrictedOrg={selectedOrg} />
            </div>
        </motion.div>
      ) : (
          <GlobalOverview 
            isHideEmpty={isHideEmpty} 
            setIsHideEmpty={setIsHideEmpty} 
            selectedTime={selectedTime} 
            onMetricClick={handleMetricClick}
            initialRegion={selectedOrg}
            orgType={activeTab}
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
