
import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  Cell
} from 'recharts';
import { Download, Calendar, FileBarChart, Table as TableIcon } from 'lucide-react';

const CASH_FLOW_DATA = [
  { month: '1月', inflow: 4000, outflow: 2400 },
  { month: '2月', inflow: 3000, outflow: 1398 },
  { month: '3月', inflow: 2000, outflow: 9800 },
  { month: '4月', inflow: 2780, outflow: 3908 },
  { month: '5月', inflow: 1890, outflow: 4800 },
  { month: '6月', inflow: 2390, outflow: 3800 },
  { month: '7月', inflow: 3490, outflow: 4300 },
];

const DEPT_EXPENSE_DATA = [
  { name: '研发部', amount: 12000 },
  { name: '市场部', amount: 8000 },
  { name: '销售部', amount: 15000 },
  { name: '人事部', amount: 5000 },
  { name: 'IT部', amount: 9000 },
];

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center bg-white p-4 rounded-sm border border-slate-200 shadow-sm">
        <div>
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <FileBarChart size={20} className="text-red-600" />
                报表中心 (Report Center)
            </h2>
            <p className="text-xs text-slate-500 mt-1">实时财务数据分析与报表生成</p>
        </div>
        <div className="flex gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-600">
                <Calendar size={14} />
                <span>2023 财年</span>
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white rounded-sm text-xs hover:bg-red-700 transition-colors shadow-sm">
                <Download size={14} /> 导出所有报表
            </button>
        </div>
       </div>

       {/* Financial Report Preview Table */}
       <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                <h3 className="font-bold text-slate-700 text-sm flex items-center gap-2">
                    <TableIcon size={16} className="text-slate-400" />
                    利润表预览 (Profit & Loss Statement)
                </h3>
                <span className="text-[10px] text-slate-400">单位：人民币元</span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 font-medium text-slate-500">
                        <tr>
                            <th className="px-5 py-2 w-1/2">项目 (Item)</th>
                            <th className="px-5 py-2 text-right">本期金额 (Current Period)</th>
                            <th className="px-5 py-2 text-right">上期金额 (Previous Period)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        <tr className="hover:bg-slate-50">
                            <td className="px-5 py-2 font-medium text-slate-700">一、营业收入</td>
                            <td className="px-5 py-2 text-right font-mono">1,245,000.00</td>
                            <td className="px-5 py-2 text-right font-mono text-slate-400">980,000.00</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="px-5 py-2 pl-8 text-slate-600">减：营业成本</td>
                            <td className="px-5 py-2 text-right font-mono text-slate-600">840,000.00</td>
                            <td className="px-5 py-2 text-right font-mono text-slate-400">620,000.00</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="px-5 py-2 pl-8 text-slate-600">税金及附加</td>
                            <td className="px-5 py-2 text-right font-mono text-slate-600">12,450.00</td>
                            <td className="px-5 py-2 text-right font-mono text-slate-400">9,800.00</td>
                        </tr>
                         <tr className="hover:bg-slate-50">
                            <td className="px-5 py-2 pl-8 text-slate-600">销售费用</td>
                            <td className="px-5 py-2 text-right font-mono text-slate-600">45,000.00</td>
                            <td className="px-5 py-2 text-right font-mono text-slate-400">42,000.00</td>
                        </tr>
                         <tr className="hover:bg-slate-50">
                            <td className="px-5 py-2 pl-8 text-slate-600">管理费用</td>
                            <td className="px-5 py-2 text-right font-mono text-slate-600">86,000.00</td>
                            <td className="px-5 py-2 text-right font-mono text-slate-400">80,000.00</td>
                        </tr>
                        <tr className="bg-red-50/50 font-bold hover:bg-red-50">
                            <td className="px-5 py-2 text-slate-800">二、营业利润 (Operating Profit)</td>
                            <td className="px-5 py-2 text-right font-mono text-red-600">261,550.00</td>
                            <td className="px-5 py-2 text-right font-mono text-slate-500">228,200.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Chart 1: Cash Flow Analysis */}
          <div className="bg-white p-5 rounded-sm shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-6">
                 <h3 className="font-bold text-slate-700 text-sm border-l-4 border-red-500 pl-2">现金流量趋势 (Cash Flow)</h3>
            </div>
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={CASH_FLOW_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorIn" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorOut" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} />
                        <Tooltip 
                            contentStyle={{ borderRadius: '4px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }} 
                            itemStyle={{ padding: 0 }}
                        />
                        <Area type="monotone" dataKey="inflow" stroke="#ef4444" fillOpacity={1} fill="url(#colorIn)" strokeWidth={2} name="流入" />
                        <Area type="monotone" dataKey="outflow" stroke="#3b82f6" fillOpacity={1} fill="url(#colorOut)" strokeWidth={2} name="流出" />
                        <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} iconType="circle" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Department Expenses */}
          <div className="bg-white p-5 rounded-sm shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-6">
                 <h3 className="font-bold text-slate-700 text-sm border-l-4 border-blue-500 pl-2">部门费用占比 (Expenses)</h3>
            </div>
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={DEPT_EXPENSE_DATA} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                        <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} />
                        <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 12, fontWeight: 500}} width={60} />
                        <Tooltip 
                            cursor={{fill: '#f8fafc'}} 
                            contentStyle={{ borderRadius: '4px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                        />
                        <Bar dataKey="amount" fill="#3b82f6" radius={[0, 4, 4, 0]} name="费用 (¥)" barSize={20}>
                            {
                                DEPT_EXPENSE_DATA.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#ef4444' : '#3b82f6'} />
                                ))
                            }
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
          </div>
       </div>
    </div>
  );
};

export default Analytics;
