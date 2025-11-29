
import React, { useState } from 'react';
import { Plus, Download, Filter, Trash2, Save, Printer, Search, RefreshCw, ChevronLeft, ChevronRight, X, Calculator, CheckCircle } from 'lucide-react';
import { VoucherEntry } from '../types';

const INITIAL_DATA: VoucherEntry[] = [
  { id: 'V-20231001-01', date: '2023-10-25', description: '支付服务器租赁费用 (阿里云)', accountCode: '6602', accountName: '管理费用-办公费', debit: 12500.00, credit: 0, status: 'Posted' },
  { id: 'V-20231001-01', date: '2023-10-25', description: '支付服务器租赁费用 (阿里云)', accountCode: '1002', accountName: '银行存款-招商银行', debit: 0, credit: 12500.00, status: 'Posted' },
  { id: 'V-20231002-05', date: '2023-10-26', description: '销售电子元器件收入', accountCode: '1122', accountName: '应收账款-华东区', debit: 45000.00, credit: 0, status: 'Review' },
  { id: 'V-20231002-05', date: '2023-10-26', description: '销售电子元器件收入', accountCode: '6001', accountName: '主营业务收入', debit: 0, credit: 45000.00, status: 'Review' },
];

const VoucherManager: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'editor'>('list');
  const [vouchers, setVouchers] = useState<VoucherEntry[]>(INITIAL_DATA);

  // Editor State
  const [voucherRows, setVoucherRows] = useState([
    { id: 1, summary: '提现备用金', subject: '1001 库存现金', debit: 5000, credit: 0 },
    { id: 2, summary: '提现备用金', subject: '1002 银行存款-工行', debit: 0, credit: 5000 },
    { id: 3, summary: '', subject: '', debit: 0, credit: 0 },
    { id: 4, summary: '', subject: '', debit: 0, credit: 0 },
  ]);

  const totalDebit = voucherRows.reduce((acc, row) => acc + Number(row.debit || 0), 0);
  const totalCredit = voucherRows.reduce((acc, row) => acc + Number(row.credit || 0), 0);
  const isBalanced = totalDebit === totalCredit && totalDebit > 0;

  const handleRowChange = (id: number, field: string, value: string | number) => {
    setVoucherRows(prev => prev.map(row => row.id === id ? { ...row, [field]: value } : row));
  };

  // --- EDITOR VIEW (Entry Form) ---
  if (viewMode === 'editor') {
    return (
      <div className="h-full flex flex-col space-y-4 animate-fadeIn">
        {/* Editor Toolbar */}
        <div className="flex justify-between items-center bg-white p-3 rounded-sm border border-slate-200 shadow-sm">
           <div className="flex items-center gap-4">
              <button onClick={() => setViewMode('list')} className="text-slate-500 hover:text-slate-800 flex items-center gap-1 text-xs">
                 <ChevronLeft size={14} /> 返回列表
              </button>
              <div className="h-4 w-[1px] bg-slate-300"></div>
              <h2 className="text-base font-bold text-slate-800">新增记账凭证</h2>
           </div>
           <div className="flex gap-2">
              <button className="flex items-center gap-1 px-4 py-1.5 bg-white border border-slate-300 text-slate-700 rounded-sm text-xs hover:bg-slate-50 shadow-sm">
                <Calculator size={14} /> 流量分析
              </button>
              <button className="flex items-center gap-1 px-4 py-1.5 bg-white border border-slate-300 text-slate-700 rounded-sm text-xs hover:bg-slate-50 shadow-sm">
                <Printer size={14} /> 打印
              </button>
              <button className="flex items-center gap-1 px-4 py-1.5 bg-red-600 text-white rounded-sm text-xs hover:bg-red-700 shadow-sm font-medium">
                <Save size={14} /> 保存凭证
              </button>
           </div>
        </div>

        {/* VOUCHER PAPER UI */}
        <div className="flex-1 bg-slate-100 overflow-auto flex justify-center p-4">
            <div className="w-full max-w-[1000px] bg-white shadow-lg border border-slate-300 flex flex-col min-h-[600px] relative">
                {/* Decorative Top Holes for "Paper" feel */}
                <div className="absolute top-[-10px] left-0 w-full h-4 flex justify-between px-10">
                   {Array.from({length: 8}).map((_, i) => <div key={i} className="w-3 h-3 rounded-full bg-slate-200 shadow-inner"></div>)}
                </div>

                {/* Header Info */}
                <div className="px-8 py-6 border-b border-double border-slate-200">
                    <h1 className="text-center text-2xl font-black text-red-600 tracking-[0.5em] mb-6 border-b-2 border-red-600 pb-2 inline-block relative left-1/2 -translate-x-1/2">
                        记账凭证
                    </h1>
                    
                    <div className="flex justify-between items-end text-xs font-medium text-slate-600 mt-2">
                        <div className="flex gap-4">
                            <div className="flex items-center gap-1">
                                <span>凭证字:</span>
                                <select className="border-b border-slate-300 bg-transparent outline-none font-bold text-slate-800">
                                    <option>记</option>
                                    <option>收</option>
                                    <option>付</option>
                                    <option>转</option>
                                </select>
                                <input type="number" defaultValue={24} className="w-12 border-b border-slate-300 text-center outline-none font-bold text-slate-800"/>
                                <span>号</span>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <span>日期:</span>
                            <input type="date" className="border-b border-slate-300 outline-none bg-transparent font-mono" defaultValue="2023-10-28" />
                        </div>

                        <div className="flex items-center gap-1">
                            <span>附单据:</span>
                            <input type="number" defaultValue={0} className="w-8 border-b border-slate-300 text-center outline-none"/>
                            <span>张</span>
                        </div>
                    </div>
                </div>

                {/* Grid Body */}
                <div className="flex-1 px-8 py-4">
                    <table className="w-full border-collapse border border-red-200">
                        <thead>
                            <tr className="bg-red-50 text-red-800 text-xs font-bold text-center h-10">
                                <td className="border border-red-300 w-1/4">摘要 (Summary)</td>
                                <td className="border border-red-300 w-1/4">会计科目 (Subject)</td>
                                <td className="border border-red-300 w-1/6 relative">
                                    <span className="z-10 relative">借方金额 (Debit)</span>
                                    {/* Grid Lines Overlay */}
                                    <div className="absolute top-0 left-0 w-full h-full flex opacity-20 pointer-events-none">
                                        <div className="flex-1 border-r border-red-800"></div>
                                        <div className="flex-1 border-r border-red-800"></div>
                                        <div className="flex-1 border-r border-red-800"></div>
                                        <div className="flex-1 border-r border-red-800"></div>
                                        <div className="flex-1 border-r border-red-800"></div>
                                        <div className="flex-1 border-r border-red-800"></div>
                                    </div>
                                </td>
                                <td className="border border-red-300 w-1/6 relative">
                                    <span className="z-10 relative">贷方金额 (Credit)</span>
                                </td>
                                <td className="border border-red-300 w-12">操作</td>
                            </tr>
                        </thead>
                        <tbody>
                            {voucherRows.map((row) => (
                                <tr key={row.id} className="h-10 text-sm hover:bg-red-50/30 transition-colors">
                                    <td className="border border-red-200 p-0">
                                        <input 
                                            value={row.summary}
                                            onChange={(e) => handleRowChange(row.id, 'summary', e.target.value)}
                                            className="w-full h-full px-2 outline-none border-none bg-transparent placeholder:text-slate-300"
                                            placeholder="请输入摘要..."
                                        />
                                    </td>
                                    <td className="border border-red-200 p-0">
                                        <select 
                                            value={row.subject}
                                            onChange={(e) => handleRowChange(row.id, 'subject', e.target.value)}
                                            className="w-full h-full px-2 outline-none border-none bg-transparent text-slate-700"
                                        >
                                            <option value="">请选择科目...</option>
                                            <option value="1001 库存现金">1001 库存现金</option>
                                            <option value="1002 银行存款-工行">1002 银行存款-工行</option>
                                            <option value="6602 管理费用">6602 管理费用</option>
                                            <option value="2202 应付账款">2202 应付账款</option>
                                        </select>
                                    </td>
                                    <td className="border border-red-200 p-0 relative overflow-hidden">
                                        <input 
                                            type="number"
                                            value={row.debit || ''}
                                            onChange={(e) => handleRowChange(row.id, 'debit', parseFloat(e.target.value))}
                                            className="w-full h-full px-2 text-right outline-none border-none bg-transparent font-mono font-medium tracking-wider relative z-10"
                                        />
                                         {/* Vertical Money Lines */}
                                         <div className="absolute top-0 left-0 w-full h-full flex pointer-events-none">
                                            {[...Array(10)].map((_, i) => (
                                                <div key={i} className={`flex-1 border-r ${i === 2 || i === 5 || i === 8 ? 'border-red-200' : 'border-red-100'}`}></div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="border border-red-200 p-0 relative">
                                        <input 
                                            type="number"
                                            value={row.credit || ''}
                                            onChange={(e) => handleRowChange(row.id, 'credit', parseFloat(e.target.value))}
                                            className="w-full h-full px-2 text-right outline-none border-none bg-transparent font-mono font-medium tracking-wider relative z-10"
                                        />
                                        {/* Vertical Money Lines */}
                                        <div className="absolute top-0 left-0 w-full h-full flex pointer-events-none">
                                            {[...Array(10)].map((_, i) => (
                                                <div key={i} className={`flex-1 border-r ${i === 2 || i === 5 || i === 8 ? 'border-red-200' : 'border-red-100'}`}></div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="border border-red-200 text-center">
                                        <button className="text-slate-400 hover:text-red-600"><Trash2 size={12} /></button>
                                    </td>
                                </tr>
                            ))}
                            {/* Total Row */}
                            <tr className="h-10 bg-red-50 font-bold text-sm">
                                <td colSpan={2} className="border border-red-300 px-4 text-slate-700">合计 (Total): <span className="ml-4 font-normal text-xs uppercase">{isBalanced ? '人民币(大写): 伍仟元整' : ''}</span></td>
                                <td className="border border-red-300 text-right px-2 font-mono">{totalDebit > 0 ? totalDebit.toFixed(2) : ''}</td>
                                <td className="border border-red-300 text-right px-2 font-mono">{totalCredit > 0 ? totalCredit.toFixed(2) : ''}</td>
                                <td className="border border-red-300"></td>
                            </tr>
                        </tbody>
                    </table>
                    
                    {!isBalanced && (
                         <div className="mt-2 text-red-500 text-xs flex items-center gap-1">
                            <X size={12} /> 借贷不平衡 (Unbalanced): 差额 {Math.abs(totalDebit - totalCredit).toFixed(2)}
                         </div>
                    )}
                    {isBalanced && (
                         <div className="mt-2 text-green-600 text-xs flex items-center gap-1">
                            <CheckCircle size={12} /> 试算平衡 (Balanced)
                         </div>
                    )}
                </div>

                {/* Footer Signatures */}
                <div className="px-8 pb-8 pt-4 flex justify-between text-xs text-slate-500 mt-auto">
                    <div className="flex gap-2"><span>会计主管:</span> <span className="underline decoration-slate-300 decoration-dotted w-16 inline-block text-center text-slate-800">王总监</span></div>
                    <div className="flex gap-2"><span>记账:</span> <span className="underline decoration-slate-300 decoration-dotted w-16 inline-block text-center text-slate-800">系统自动</span></div>
                    <div className="flex gap-2"><span>出纳:</span> <span className="underline decoration-slate-300 decoration-dotted w-16 inline-block text-center text-slate-800"></span></div>
                    <div className="flex gap-2"><span>制单:</span> <span className="underline decoration-slate-300 decoration-dotted w-16 inline-block text-center text-slate-800">张会计</span></div>
                </div>
            </div>
        </div>
      </div>
    );
  }

  // --- LIST VIEW ---
  return (
    <div className="space-y-4 h-full flex flex-col">
      {/* Action Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-sm border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
             <span className="w-1 h-4 bg-red-600"></span>
             凭证管理 (Voucher Management)
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-300 text-slate-600 rounded-sm text-xs hover:bg-slate-50 transition-colors">
            <Printer size={14} />
            打印列表
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-300 text-slate-600 rounded-sm text-xs hover:bg-slate-50 transition-colors">
            <Download size={14} />
            导出 Excel
          </button>
          <button 
            onClick={() => setViewMode('editor')}
            className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded-sm text-xs hover:bg-red-700 transition-colors shadow-sm"
          >
            <Plus size={14} />
            新增凭证
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
                 <option>2023年 08月</option>
             </select>
        </div>
        
        <div className="w-[1px] h-4 bg-slate-200"></div>

        <div className="flex items-center gap-2">
            <span className="text-slate-500">状态:</span>
            <div className="flex bg-slate-100 rounded p-0.5">
                <button className="px-3 py-0.5 bg-white text-slate-800 shadow-sm rounded-sm font-medium">全部</button>
                <button className="px-3 py-0.5 text-slate-500 hover:text-slate-700">已记账</button>
                <button className="px-3 py-0.5 text-slate-500 hover:text-slate-700">审核中</button>
                <button className="px-3 py-0.5 text-slate-500 hover:text-slate-700">草稿</button>
            </div>
        </div>

        <div className="flex-1"></div>

        <div className="relative">
            <input type="text" placeholder="搜索摘要、科目代码..." className="pl-8 pr-3 py-1.5 border border-slate-300 rounded-sm w-64 focus:border-red-500 outline-none transition-colors" />
            <Search size={14} className="absolute left-2.5 top-2 text-slate-400" />
        </div>
        <button className="p-1.5 border border-slate-300 rounded-sm text-slate-600 hover:bg-slate-50" title="刷新">
            <RefreshCw size={14} />
        </button>
      </div>

      {/* Voucher Table */}
      <div className="bg-white rounded-sm shadow-sm border border-slate-300 flex-1 flex flex-col overflow-hidden">
        <div className="overflow-auto flex-1">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="sticky top-0 z-10">
              <tr className="bg-slate-100 border-b border-slate-300 text-slate-600">
                <th className="px-4 py-3 font-bold border-r border-slate-200 w-12 text-center">#</th>
                <th className="px-4 py-3 font-bold border-r border-slate-200">凭证字号 (ID)</th>
                <th className="px-4 py-3 font-bold border-r border-slate-200">日期 (Date)</th>
                <th className="px-4 py-3 font-bold border-r border-slate-200 w-1/4">摘要 (Description)</th>
                <th className="px-4 py-3 font-bold border-r border-slate-200">会计科目 (Account)</th>
                <th className="px-4 py-3 font-bold border-r border-slate-200 text-right bg-slate-50">借方金额 (Debit)</th>
                <th className="px-4 py-3 font-bold border-r border-slate-200 text-right bg-slate-50">贷方金额 (Credit)</th>
                <th className="px-4 py-3 font-bold border-r border-slate-200 text-center">状态</th>
                <th className="px-4 py-3 font-bold text-center">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {vouchers.map((v, i) => (
                <tr key={i} className="hover:bg-blue-50/30 transition-colors group text-slate-700">
                  <td className="px-4 py-2 border-r border-slate-100 text-center text-slate-400">{i + 1}</td>
                  <td className="px-4 py-2 border-r border-slate-100 font-mono text-slate-600">{v.id}</td>
                  <td className="px-4 py-2 border-r border-slate-100">{v.date}</td>
                  <td className="px-4 py-2 border-r border-slate-100 font-medium">{v.description}</td>
                  <td className="px-4 py-2 border-r border-slate-100">
                    <div className="flex flex-col">
                        <span>{v.accountName}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{v.accountCode}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 border-r border-slate-100 text-right font-mono font-medium">
                    {v.debit > 0 ? `¥ ${v.debit.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : ''}
                  </td>
                  <td className="px-4 py-2 border-r border-slate-100 text-right font-mono font-medium">
                    {v.credit > 0 ? `¥ ${v.credit.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : ''}
                  </td>
                  <td className="px-4 py-2 border-r border-slate-100 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] border
                        ${v.status === 'Posted' ? 'bg-green-50 text-green-700 border-green-200' : 
                          v.status === 'Review' ? 'bg-orange-50 text-orange-700 border-orange-200' : 
                          'bg-slate-50 text-slate-600 border-slate-200'}`}>
                      {v.status === 'Posted' ? '已记账' : v.status === 'Review' ? '审核中' : '草稿'}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex items-center justify-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setViewMode('editor')} className="text-blue-600 hover:text-blue-800 text-xs font-medium">编辑</button>
                        <div className="w-[1px] h-3 bg-slate-300"></div>
                        <button className="text-red-600 hover:text-red-800 text-xs font-medium">删除</button>
                    </div>
                  </td>
                </tr>
              ))}
              {[1, 2, 3].map((_, i) => (
                 <tr key={`empty-${i}`} className="h-10">
                    <td className="border-r border-slate-100"></td>
                    <td className="border-r border-slate-100"></td>
                    <td className="border-r border-slate-100"></td>
                    <td className="border-r border-slate-100"></td>
                    <td className="border-r border-slate-100"></td>
                    <td className="border-r border-slate-100 bg-slate-50/30"></td>
                    <td className="border-r border-slate-100 bg-slate-50/30"></td>
                    <td className="border-r border-slate-100"></td>
                    <td></td>
                 </tr>
              ))}
            </tbody>
            <tfoot className="sticky bottom-0 bg-slate-50 border-t border-slate-300 shadow-inner font-bold text-slate-800">
               <tr>
                <td colSpan={5} className="px-4 py-3 text-right border-r border-slate-200">合计 (Total):</td>
                <td className="px-4 py-3 text-right font-mono text-red-700 border-r border-slate-200">¥ 213,000.00</td>
                <td className="px-4 py-3 text-right font-mono text-red-700 border-r border-slate-200">¥ 213,000.00</td>
                <td colSpan={2}></td>
               </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VoucherManager;
