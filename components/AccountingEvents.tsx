
import React from 'react';
import { Filter, Search, FileText, ArrowRight, RefreshCw, MoreHorizontal } from 'lucide-react';

const EVENTS_DATA = [
  { id: 'EV-20231028-001', type: '采购入库', category: '原材料', batch: 'B20231028A', amount: 56000.00, status: '待生成' },
  { id: 'EV-20231028-002', type: '销售出库', category: '产成品', batch: 'S20231028B', amount: 12400.00, status: '待生成' },
  { id: 'EV-20231028-003', type: '费用报销', category: '差旅费', batch: '-', amount: 2450.00, status: '已生成' },
  { id: 'EV-20231028-004', type: '资产折旧', category: '固定资产', batch: '-', amount: 8900.00, status: '待生成' },
  { id: 'EV-20231028-005', type: '薪资计提', category: '人力成本', batch: '2023-10', amount: 340000.00, status: '待生成' },
];

const AccountingEvents: React.FC = () => {
  return (
    <div className="space-y-4 h-full flex flex-col">
       {/* Header */}
       <div className="flex justify-between items-center bg-white p-4 rounded-sm border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
             <FileText size={20} className="text-blue-600" />
             会计事件列表 (Accounting Events)
          </h2>
          <p className="text-xs text-slate-500 mt-1">业务系统数据流向会计核算中心的中间态事件管理</p>
        </div>
        <div className="flex gap-2">
            <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-sm text-xs hover:bg-blue-700 transition-colors shadow-sm">
                <RefreshCw size={14} /> 同步业务数据
            </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-3 rounded-sm border border-slate-200 flex flex-wrap gap-3 items-center text-xs">
        <div className="flex items-center gap-2 bg-slate-50 px-2 py-1 rounded border border-slate-200">
             <span className="text-slate-500">会计期间:</span>
             <select className="bg-transparent font-medium text-slate-700 outline-none cursor-pointer">
                 <option>2023年 10月</option>
                 <option>2023年 09月</option>
             </select>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 px-2 py-1 rounded border border-slate-200">
             <span className="text-slate-500">业务类型:</span>
             <select className="bg-transparent font-medium text-slate-700 outline-none cursor-pointer">
                 <option>全部类型</option>
                 <option>采购业务</option>
                 <option>销售业务</option>
                 <option>费用类</option>
             </select>
        </div>
        <div className="relative">
            <input type="text" placeholder="搜索事件编号..." className="pl-8 pr-3 py-1 border border-slate-300 rounded-sm w-48 focus:border-blue-500 outline-none transition-colors" />
            <Search size={14} className="absolute left-2.5 top-1.5 text-slate-400" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-sm shadow-sm border border-slate-300 flex-1 overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-100 text-slate-600 font-bold">
                <tr>
                    <th className="px-4 py-3 border-b border-slate-300 border-r border-slate-200 w-12 text-center"><input type="checkbox"/></th>
                    <th className="px-4 py-3 border-b border-slate-300 border-r border-slate-200">事件编号 (ID)</th>
                    <th className="px-4 py-3 border-b border-slate-300 border-r border-slate-200">业务类型 (Type)</th>
                    <th className="px-4 py-3 border-b border-slate-300 border-r border-slate-200">品类 (Category)</th>
                    <th className="px-4 py-3 border-b border-slate-300 border-r border-slate-200">批次号 (Batch)</th>
                    <th className="px-4 py-3 border-b border-slate-300 border-r border-slate-200 text-right">金额 (Amount)</th>
                    <th className="px-4 py-3 border-b border-slate-300 border-r border-slate-200 text-center">状态 (Status)</th>
                    <th className="px-4 py-3 border-b border-slate-300 text-center">操作</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
                {EVENTS_DATA.map((item, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/50 transition-colors group">
                        <td className="px-4 py-3 border-r border-slate-100 text-center"><input type="checkbox"/></td>
                        <td className="px-4 py-3 border-r border-slate-100 font-mono text-slate-600">{item.id}</td>
                        <td className="px-4 py-3 border-r border-slate-100">{item.type}</td>
                        <td className="px-4 py-3 border-r border-slate-100">{item.category}</td>
                        <td className="px-4 py-3 border-r border-slate-100 font-mono text-slate-500">{item.batch}</td>
                        <td className="px-4 py-3 border-r border-slate-100 text-right font-bold text-slate-700">¥ {item.amount.toLocaleString()}</td>
                        <td className="px-4 py-3 border-r border-slate-100 text-center">
                            <span className={`px-2 py-0.5 rounded text-[10px] border ${item.status === '已生成' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                                {item.status}
                            </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                            {item.status !== '已生成' ? (
                                <button className="text-blue-600 hover:text-blue-800 flex items-center justify-center gap-1 mx-auto font-medium text-[11px] border border-blue-200 bg-blue-50 px-2 py-0.5 rounded hover:bg-blue-100 transition-colors">
                                    生成凭证 <ArrowRight size={10} />
                                </button>
                            ) : (
                                <span className="text-slate-400 text-[11px]">查看凭证</span>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountingEvents;
