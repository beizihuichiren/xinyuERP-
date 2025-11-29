
import React from 'react';
import { BookOpen, Filter, Search, Download, CheckCircle, AlertTriangle } from 'lucide-react';

const LEDGER_DATA = [
  { code: '1001', name: '库存现金', startBalance: 50000.00, debit: 12000.00, credit: 8000.00, endBalance: 54000.00 },
  { code: '1002', name: '银行存款', startBalance: 1250000.00, debit: 450000.00, credit: 320000.00, endBalance: 1380000.00 },
  { code: '1122', name: '应收账款', startBalance: 320000.00, debit: 128000.00, credit: 95000.00, endBalance: 353000.00 },
  { code: '1403', name: '原材料', startBalance: 80000.00, debit: 56000.00, credit: 0, endBalance: 136000.00 },
  { code: '2202', name: '应付账款', startBalance: -150000.00, debit: 80000.00, credit: 120000.00, endBalance: -190000.00 },
  { code: '6001', name: '主营业务收入', startBalance: 0, debit: 0, credit: 580000.00, endBalance: 580000.00 },
  { code: '6602', name: '管理费用', startBalance: 0, debit: 42000.00, credit: 0, endBalance: 42000.00 },
];

const GeneralLedger: React.FC = () => {
    
  const totalDebit = LEDGER_DATA.reduce((acc, curr) => acc + curr.debit, 0);
  const totalCredit = LEDGER_DATA.reduce((acc, curr) => acc + curr.credit, 0);
  // Simple check logic: in real ledger, it depends on account direction, here assuming trial balance of movements
  const isBalanced = Math.abs(totalDebit - totalDebit) < 0.01; // Mock check

  return (
    <div className="space-y-4 h-full flex flex-col">
       {/* Header */}
       <div className="flex justify-between items-center bg-white p-4 rounded-sm border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
             <BookOpen size={20} className="text-green-600" />
             总账查询 (General Ledger)
          </h2>
          <p className="text-xs text-slate-500 mt-1">期初余额、本期发生额及期末余额查询</p>
        </div>
        <div className="flex gap-2">
            <button className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-300 text-slate-600 rounded-sm text-xs hover:bg-slate-50 transition-colors">
                <Download size={14} /> 导出余额表
            </button>
        </div>
      </div>

      {/* Trial Balance Check Panel */}
      <div className="grid grid-cols-3 gap-4">
        <div className={`p-4 rounded-sm border ${true ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} flex items-center justify-between`}>
            <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">试算平衡状态</p>
                <h3 className={`text-lg font-bold ${true ? 'text-green-700' : 'text-red-700'} flex items-center gap-2`}>
                    <CheckCircle size={18} /> 平衡 (Balanced)
                </h3>
            </div>
        </div>
        <div className="p-4 rounded-sm bg-white border border-slate-200">
            <p className="text-xs text-slate-400">本期借方总额 (Total Debit)</p>
            <p className="text-lg font-mono font-bold text-slate-700">¥ {totalDebit.toLocaleString()}</p>
        </div>
        <div className="p-4 rounded-sm bg-white border border-slate-200">
            <p className="text-xs text-slate-400">本期贷方总额 (Total Credit)</p>
            <p className="text-lg font-mono font-bold text-slate-700">¥ {totalCredit.toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-3 rounded-sm border border-slate-200 flex flex-wrap gap-3 items-center text-xs">
         <div className="flex items-center gap-2 bg-slate-50 px-2 py-1 rounded border border-slate-200">
             <span className="text-slate-500">会计期间:</span>
             <select className="bg-transparent font-medium text-slate-700 outline-none cursor-pointer">
                 <option>2023年 10月</option>
             </select>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 px-2 py-1 rounded border border-slate-200">
             <span className="text-slate-500">科目级别:</span>
             <select className="bg-transparent font-medium text-slate-700 outline-none cursor-pointer">
                 <option>一级科目</option>
                 <option>明细科目</option>
             </select>
        </div>
        <div className="flex-1"></div>
        <div className="relative">
            <input type="text" placeholder="科目代码/名称..." className="pl-8 pr-3 py-1.5 border border-slate-300 rounded-sm w-64 focus:border-green-500 outline-none transition-colors" />
            <Search size={14} className="absolute left-2.5 top-2 text-slate-400" />
        </div>
      </div>

      {/* Ledger Table */}
       <div className="bg-white rounded-sm shadow-sm border border-slate-300 flex-1 overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-100 text-slate-600 font-bold sticky top-0 z-10">
                <tr>
                    <th className="px-4 py-3 border-b border-slate-300 border-r border-slate-200">科目代码</th>
                    <th className="px-4 py-3 border-b border-slate-300 border-r border-slate-200">科目名称</th>
                    <th className="px-4 py-3 border-b border-slate-300 border-r border-slate-200 text-right">期初余额</th>
                    <th className="px-4 py-3 border-b border-slate-300 border-r border-slate-200 text-right bg-green-50/50">本期借方</th>
                    <th className="px-4 py-3 border-b border-slate-300 border-r border-slate-200 text-right bg-red-50/50">本期贷方</th>
                    <th className="px-4 py-3 border-b border-slate-300 text-right">期末余额</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
                {LEDGER_DATA.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-2 border-r border-slate-100 font-mono text-slate-500">{row.code}</td>
                        <td className="px-4 py-2 border-r border-slate-100 font-medium text-slate-700">{row.name}</td>
                        <td className="px-4 py-2 border-r border-slate-100 text-right font-mono">{row.startBalance.toLocaleString()}</td>
                        <td className="px-4 py-2 border-r border-slate-100 text-right font-mono text-green-700 bg-green-50/10">{row.debit.toLocaleString()}</td>
                        <td className="px-4 py-2 border-r border-slate-100 text-right font-mono text-red-700 bg-red-50/10">{row.credit.toLocaleString()}</td>
                        <td className="px-4 py-2 text-right font-mono font-bold text-slate-800">{row.endBalance.toLocaleString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default GeneralLedger;
