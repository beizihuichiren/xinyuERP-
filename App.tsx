
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  PieChart, 
  Briefcase, 
  Landmark, 
  Settings, 
  Bell, 
  Search,
  UserCircle,
  Menu,
  ChevronDown,
  ChevronRight,
  Globe,
  BookOpen,
  ClipboardList,
  Star,
  Layers
} from 'lucide-react';
import { NavItem, ModuleType } from './types';
import Dashboard from './components/Dashboard';
import VoucherManager from './components/VoucherManager';
import Analytics from './components/Analytics';
import AccountingEvents from './components/AccountingEvents';
import GeneralLedger from './components/GeneralLedger';

// Navigation Structure
const NAV_ITEMS: NavItem[] = [
  // Common Functions - The "Quick Access" folder
  { 
    id: 'common', 
    label: '常用功能', 
    icon: Star, 
    module: ModuleType.COMMON, 
    subItems: [
      { label: '会计事件列表', targetModule: ModuleType.EVENTS },
      { label: '凭证审核与录入', targetModule: ModuleType.VOUCHER },
      { label: '总账查询', targetModule: ModuleType.LEDGER },
      { label: '报表预览', targetModule: ModuleType.REPORTS }
    ] 
  },
  { id: '1', label: '工作台 (Dashboard)', icon: LayoutDashboard, module: ModuleType.DASHBOARD },
  { id: '2', label: '财务服务', icon: Briefcase, module: ModuleType.ASSETS, subItems: [{ label: '固定资产' }, { label: '应收管理' }, { label: '应付管理' }, { label: '存货核算' }] },
  { id: '3', label: '会计事件', icon: ClipboardList, module: ModuleType.EVENTS, subItems: [{ label: '业务单据' }, { label: '事件生成' }] },
  { id: '4', label: '会计事务', icon: Landmark, module: ModuleType.VOUCHER, subItems: [{ label: '凭证录入' }, { label: '凭证审核' }, { label: '期末处理' }] },
  { id: '5', label: '总账管理', icon: BookOpen, module: ModuleType.LEDGER, subItems: [{ label: '科目余额' }, { label: '试算平衡' }, { label: '明细账' }] },
  { id: '6', label: '报表中心', icon: PieChart, module: ModuleType.REPORTS, subItems: [{ label: '财务报表' }, { label: '管理会计' }, { label: '税务申报' }] },
];

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // Track which menu items are expanded. Default 'common' to open.
  const [expandedItems, setExpandedItems] = useState<string[]>(['common']);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleNavClick = (item: NavItem) => {
    if (item.subItems && item.subItems.length > 0) {
      toggleExpand(item.id);
    } else {
      setActiveModule(item.module);
    }
  };

  const handleSubNavClick = (e: React.MouseEvent, target?: ModuleType) => {
    e.stopPropagation(); // Prevent triggering parent toggle
    if (target) {
      setActiveModule(target);
    }
  };

  const getActiveLabel = () => {
    // Check main modules
    const item = NAV_ITEMS.find(n => n.module === activeModule);
    if (item) return item.label;
    
    // Check subitems in Common or others
    for (const n of NAV_ITEMS) {
        const sub = n.subItems?.find(s => s.targetModule === activeModule);
        if (sub) return `${n.label} / ${sub.label}`;
    }
    return '系统';
  };

  const renderContent = () => {
    switch (activeModule) {
      case ModuleType.DASHBOARD:
        return <Dashboard onNavigate={setActiveModule} />;
      case ModuleType.EVENTS:
        return <AccountingEvents />;
      case ModuleType.VOUCHER:
        return <VoucherManager />;
      case ModuleType.LEDGER:
        return <GeneralLedger />;
      case ModuleType.REPORTS:
        return <Analytics />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
            <Briefcase size={64} className="mb-4 opacity-20" />
            <h2 className="text-xl font-medium text-slate-600">模块建设中</h2>
            <p className="text-slate-500 mt-2">该功能模块正在接入 Spring Cloud 微服务后端...</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-[#f0f2f5] overflow-hidden text-sm font-sans">
      {/* Sidebar - Dark Enterprise Theme */}
      <aside 
        className={`bg-[#001529] text-slate-300 flex-shrink-0 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'w-64' : 'w-16'
        } flex flex-col shadow-xl z-20`}
      >
        {/* Brand Logo */}
        <div className="h-14 flex items-center justify-center bg-[#002140] border-b border-slate-800/50 shadow-sm relative overflow-hidden flex-shrink-0">
             {/* Red accent line for branding */}
             <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>
            {isSidebarOpen ? (
              <div className="flex items-center gap-3 font-bold text-lg tracking-tight text-white animate-fadeIn">
                <div className="w-7 h-7 bg-red-600 rounded-sm flex items-center justify-center text-white text-xs shadow-lg font-bold">YU</div>
                <span>XINYU ERP</span>
              </div>
            ) : (
              <div className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center text-white font-bold shadow-lg text-xs">YU</div>
            )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          <ul className="space-y-1 px-2">
            {NAV_ITEMS.map((item) => {
               const isActive = activeModule === item.module;
               const isExpanded = expandedItems.includes(item.id);
               const hasSubItems = item.subItems && item.subItems.length > 0;
               const isCommon = item.id === 'common';

               return (
              <li key={item.id} className="mb-1">
                <button
                  onClick={() => handleNavClick(item)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded transition-all group duration-200 relative overflow-hidden
                    ${isActive && !hasSubItems
                      ? 'bg-red-600 text-white shadow-md' 
                      : 'hover:text-white hover:bg-white/5'
                    }
                    ${isCommon && 'mb-2'} 
                  `}
                >
                  {/* Highlight bar for active parent or common folder */}
                  {isActive && !hasSubItems && <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/20"></div>}
                  
                  <item.icon size={18} className={`flex-shrink-0 ${!isActive && 'text-slate-400 group-hover:text-white'} ${isCommon && 'text-yellow-500'}`} />
                  
                  {isSidebarOpen && (
                    <>
                        <span className={`flex-1 text-left font-medium tracking-wide text-[13px] ${isCommon && 'text-yellow-500 font-bold'}`}>{item.label}</span>
                        {hasSubItems && (
                            <ChevronDown 
                                size={14} 
                                className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''} opacity-50`} 
                            />
                        )}
                    </>
                  )}
                </button>

                {/* Sub Menu */}
                {isSidebarOpen && hasSubItems && (
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <ul className="bg-[#000c17] rounded-b-sm py-1">
                            {item.subItems?.map((sub, idx) => {
                                const isSubActive = sub.targetModule === activeModule;
                                return (
                                <li key={idx}>
                                    <button 
                                        onClick={(e) => handleSubNavClick(e, sub.targetModule)}
                                        className={`w-full text-left pl-10 pr-4 py-2 text-xs transition-colors flex items-center justify-between
                                            ${isSubActive ? 'text-red-500 font-medium bg-blue-900/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}
                                        `}
                                    >
                                        <span>{sub.label}</span>
                                        {isSubActive && <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>}
                                    </button>
                                </li>
                            )})}
                        </ul>
                    </div>
                )}
              </li>
            )})}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="p-3 border-t border-slate-800 bg-[#001529] flex-shrink-0">
            <div className={`flex items-center gap-3 ${!isSidebarOpen && 'justify-center'}`}>
                <div className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center border border-slate-600 cursor-pointer hover:border-slate-400 transition-colors">
                    <UserCircle size={20} className="text-slate-300"/>
                </div>
                {isSidebarOpen && (
                    <div className="overflow-hidden">
                        <p className="font-medium text-slate-200 text-xs">管理员 (Admin)</p>
                        <p className="text-[10px] text-slate-500 truncate">财务总监权限</p>
                    </div>
                )}
            </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 shadow-sm z-10 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 hover:bg-slate-100 rounded text-slate-500 transition-colors"
            >
              <Menu size={18} />
            </button>
            
            {/* Breadcrumbs */}
            <div className="hidden md:flex items-center text-xs text-slate-500 gap-2">
                <span className="hover:text-slate-800 cursor-pointer">首页</span>
                <ChevronRight size={12} />
                <span className="font-medium text-slate-800">{getActiveLabel()}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center text-slate-500 bg-slate-50 hover:bg-slate-100 transition-colors px-3 py-1.5 rounded border border-slate-200 w-64">
                <Search size={14} className="mr-2 opacity-50" />
                <input 
                    type="text" 
                    placeholder="全站搜索..." 
                    className="bg-transparent border-none outline-none text-xs w-full placeholder:text-slate-400"
                />
            </div>

            <div className="h-5 w-[1px] bg-slate-200 mx-1"></div>

            <div className="flex items-center gap-3">
               <div className="flex items-center gap-1.5 px-2 py-1 bg-green-50 text-green-700 rounded border border-green-200 text-[10px] font-medium cursor-help">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  运行正常
               </div>
               <button className="p-1.5 relative hover:bg-slate-100 rounded text-slate-500 transition-colors">
                 <Bell size={18} />
                 <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
               </button>
               <button className="p-1.5 hover:bg-slate-100 rounded text-slate-500 transition-colors">
                 <Globe size={18} />
               </button>
               <button className="p-1.5 hover:bg-slate-100 rounded text-slate-500 transition-colors">
                 <Settings size={18} />
               </button>
            </div>
          </div>
        </header>

        {/* Tabs Bar (Simulating multi-tab ERP interface) */}
        <div className="h-9 bg-white border-b border-slate-200 flex items-center px-4 gap-2 overflow-x-auto no-scrollbar flex-shrink-0">
            <div className="px-3 py-1 bg-red-50 text-red-700 border border-red-200 rounded-t-sm text-xs font-medium flex items-center gap-2 border-b-0 relative top-[1px] bg-white z-10">
                <span>{getActiveLabel()}</span>
            </div>
             <div className="px-3 py-1 bg-slate-50 text-slate-500 hover:bg-slate-100 border border-transparent hover:border-slate-200 rounded-sm text-xs cursor-pointer flex items-center gap-2">
                <span>配置中心</span>
            </div>
        </div>

        {/* Dynamic View Content */}
        <div className="flex-1 overflow-auto p-4 md:p-6 bg-[#f0f2f5] relative">
             {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
