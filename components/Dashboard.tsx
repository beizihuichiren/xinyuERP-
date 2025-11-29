
import React from 'react';
import { 
  ArrowRight, 
  ClipboardList, 
  Building2, 
  Truck, 
  BarChart3,
  Server,
  Database,
  Layers,
  Activity,
  Cpu,
  Network
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ModuleType } from '../types';

interface DashboardProps {
  onNavigate?: (module: ModuleType) => void;
}

const ProcessNode: React.FC<{
  title: string;
  icon: React.ElementType;
  colorClass: string;
  items: string[];
  delay?: number;
}> = ({ title, icon: Icon, colorClass, items, delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="bg-white rounded-sm border border-slate-300 hover:border-red-400 hover:shadow-md transition-all duration-300 flex flex-col h-full overflow-hidden"
  >
    <div className={`flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50/50`}>
      <Icon size={16} className={colorClass} />
      <h3 className="font-bold text-slate-800 text-sm tracking-wide">{title}</h3>
    </div>
    <div className="p-3 bg-white flex-1">
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 px-2.5 py-2 rounded-sm border border-slate-200 hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-colors cursor-pointer group">
            {item}
            <div className={`w-1 h-3 rounded-full bg-slate-300 group-hover:bg-red-500 transition-colors`}></div>
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-10">
      
      {/* Introduction Header - Compact Enterprise Style */}
      <div className="bg-white p-5 rounded-sm border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h1 className="text-xl font-bold text-slate-800 mb-1">总账管理驾驶舱 (General Ledger Hub)</h1>
           <p className="text-slate-500 text-xs">基于 Spring Cloud Alibaba 微服务架构 | Kubernetes 容器化部署 | 实时核算引擎</p>
        </div>
        <div className="flex gap-4 md:gap-8">
            <div className="text-right">
                <p className="text-slate-400 text-[10px] uppercase">本月凭证数</p>
                <p className="text-lg font-bold text-slate-800 font-mono">1,284</p>
            </div>
            <div className="text-right">
                <p className="text-slate-400 text-[10px] uppercase">待处理任务</p>
                <p className="text-lg font-bold text-red-600 font-mono">12</p>
            </div>
             <div className="text-right">
                <p className="text-slate-400 text-[10px] uppercase">系统状态</p>
                <div className="flex items-center justify-end gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <p className="text-sm font-medium text-green-600">正常</p>
                </div>
            </div>
        </div>
      </div>

      {/* Main Diagram Area */}
      <div className="bg-slate-100 rounded-sm border border-slate-300 p-6 overflow-x-auto">
        <div className="min-w-[1000px]">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-bold text-slate-800 flex items-center gap-2 border-l-4 border-red-600 pl-3">
                    业务模型架构视图
                </h2>
                <div className="flex gap-2">
                    <span className="px-2 py-1 bg-white border border-slate-200 text-xs text-slate-500 rounded shadow-sm flex items-center gap-1">
                        <Activity size={10} className="text-green-500"/> Kafka 消息队列
                    </span>
                    <span className="px-2 py-1 bg-white border border-slate-200 text-xs text-slate-500 rounded shadow-sm flex items-center gap-1">
                        <Database size={10} className="text-blue-500"/> MySQL 集群
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-4 relative">
            
            {/* Inputs Column - Left */}
            <div className="col-span-3 flex flex-col gap-4">
                <div className="flex-1">
                    <ProcessNode 
                    title="财务服务 (Financial Services)" 
                    icon={Building2} 
                    colorClass="text-blue-600"
                    items={['固定资产', '应收管理', '应付管理', '存货核算', '...']}
                    delay={0.1}
                    />
                </div>
                <div className="flex-1">
                    <ProcessNode 
                    title="第三方业务系统" 
                    icon={Truck} 
                    colorClass="text-indigo-600"
                    items={['物流系统', '电子商务']}
                    delay={0.2}
                    />
                </div>
            </div>

            {/* Middle Connection Arrows */}
            <div className="col-span-1 flex flex-col justify-center items-center gap-12 text-slate-400">
                <div className="flex flex-col items-center">
                    <ArrowRight size={20} />
                    <span className="text-[10px] mt-1 text-slate-500 bg-white px-1 border border-slate-200 rounded">业务事项</span>
                </div>
                 <div className="flex flex-col items-center">
                    <ArrowRight size={20} />
                </div>
            </div>

            {/* Core Processing - Center (Accounting Hub) */}
            <div className="col-span-5 flex flex-col">
                <motion.div 
                    initial={{ scale: 0.98, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-white rounded-sm border-2 border-red-600 shadow-md flex-1 p-1 relative overflow-hidden"
                >
                    {/* Inner Container */}
                    <div className="h-full border border-dashed border-red-200 bg-slate-50/50 p-4 flex items-center gap-4">
                        
                        {/* Center Hub Icon */}
                        <div className="flex flex-col items-center gap-3 min-w-[100px]">
                            <div className="w-14 h-14 bg-red-600 shadow-lg shadow-red-200 text-white rounded-full flex items-center justify-center border-4 border-white">
                                <ClipboardList size={24} />
                            </div>
                            <div className="text-center">
                                <h3 className="font-bold text-slate-800 text-sm">会计事务</h3>
                                <div className="h-4 w-[1px] bg-slate-300 mx-auto my-1"></div>
                                <div className="w-8 h-8 mx-auto bg-red-100 text-red-600 rounded-full flex items-center justify-center border border-red-200">
                                    <Layers size={14}/>
                                </div>
                                <p className="text-xs font-medium text-slate-600 mt-1">凭证</p>
                            </div>
                        </div>

                        {/* Processing Grid */}
                        <div className="flex-1 grid grid-cols-2 gap-2">
                            {['现金流量分析', '凭证单', '规则凭证', '银行对账', '账簿折算', '内部交易', '汇兑损益', '科目核销', '期末处理', '账表查询'].map((item, i) => (
                                <div key={i} className="text-xs font-medium text-center py-2 px-1 bg-white rounded border border-slate-200 text-slate-700 shadow-sm hover:border-red-400 hover:text-red-700 cursor-pointer transition-all">
                                    {item}
                                </div>
                            ))}
                        </div>

                    </div>
                </motion.div>
            </div>

            {/* Middle Connection Arrows */}
            <div className="col-span-1 flex flex-col justify-center items-center text-slate-400">
                <ArrowRight size={20} />
            </div>

            {/* Outputs Column - Right */}
            <div className="col-span-2">
                <ProcessNode 
                title="报表与输出" 
                icon={BarChart3} 
                colorClass="text-red-600"
                items={['财务报表', '合并报表', '管会', '管理会计', '归档', '电子会计档案', '报税', '税务数据上传', '监管', '审计信息导出']}
                delay={0.4}
                />
            </div>

            </div>
        </div>
      </div>
      
      {/* Infrastructure Monitoring Section - Technical Detail */}
      <div className="mt-8">
        <h2 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
            <Server size={16} />
            基础设施监控 (Infrastructure)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Nacos Status */}
            <div className="bg-white p-3 rounded-sm border border-slate-200 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Network size={40} className="text-blue-600" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <h4 className="font-bold text-xs text-slate-600">Nacos 注册中心</h4>
                </div>
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-[10px] text-slate-400">服务实例数</p>
                        <p className="text-lg font-mono font-bold text-slate-700">42</p>
                    </div>
                     <div>
                        <p className="text-[10px] text-slate-400">健康状态</p>
                        <p className="text-xs font-medium text-green-600">100% Healthy</p>
                    </div>
                </div>
            </div>

            {/* Kubernetes Status */}
             <div className="bg-white p-3 rounded-sm border border-slate-200 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Cpu size={40} className="text-blue-600" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <h4 className="font-bold text-xs text-slate-600">Kubernetes 集群</h4>
                </div>
                <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-500">
                        <span>CPU Usage</span>
                        <span>45%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-[45%]"></div>
                    </div>
                     <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                        <span>Memory</span>
                        <span>62%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 w-[62%]"></div>
                    </div>
                </div>
            </div>

            {/* Database Status */}
             <div className="bg-white p-3 rounded-sm border border-slate-200 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Database size={40} className="text-orange-600" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <h4 className="font-bold text-xs text-slate-600">MySQL Cluster</h4>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div className="bg-slate-50 p-1 rounded border border-slate-100 text-center">
                        <p className="text-slate-400">QPS</p>
                        <p className="font-mono font-bold text-slate-700">2,405</p>
                    </div>
                    <div className="bg-slate-50 p-1 rounded border border-slate-100 text-center">
                        <p className="text-slate-400">主从延迟</p>
                        <p className="font-mono font-bold text-green-600">0ms</p>
                    </div>
                </div>
            </div>

             {/* Middleware Status */}
             <div className="bg-white p-3 rounded-sm border border-slate-200 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Activity size={40} className="text-red-600" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <h4 className="font-bold text-xs text-slate-600">RocketMQ / Kafka</h4>
                </div>
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-[10px] text-slate-400">消息积压</p>
                        <p className="text-lg font-mono font-bold text-slate-700">0</p>
                    </div>
                     <div className="text-right">
                        <p className="text-[10px] text-slate-400">TPS</p>
                        <p className="text-xs font-mono font-bold text-slate-700">850/s</p>
                    </div>
                </div>
            </div>

        </div>
      </div>

    </div>
  );
};

export default Dashboard;
