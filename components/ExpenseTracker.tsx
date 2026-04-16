
import React, { useState, useEffect, useMemo } from 'react';
import { TRANSLATIONS } from '../constants';
import { Language, FarmingActivity, ExpenseCategory } from '../types';
import { 
  Wallet, Plus, Trash2, IndianRupee, PieChart as PieChartIcon, 
  TrendingUp, Calendar, Tag, Filter, Download, AlertCircle,
  Sprout, Droplets, UserCheck, Settings, ShieldAlert, Tractor
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend 
} from 'recharts';

interface ExpenseTrackerProps {
  lang: Language;
}

const CATEGORIES: { name: ExpenseCategory; icon: any; color: string }[] = [
  { name: 'Seeds', icon: Sprout, color: '#10b981' },
  { name: 'Fertilizer', icon: Droplets, color: '#3b82f6' },
  { name: 'Pesticides', icon: ShieldAlert, color: '#ef4444' },
  { name: 'Labor', icon: UserCheck, color: '#f59e0b' },
  { name: 'Machinery', icon: Tractor, color: '#6366f1' },
  { name: 'Irrigation', icon: Droplets, color: '#06b6d4' },
  { name: 'Others', icon: Settings, color: '#94a3b8' },
];

const ExpenseTracker: React.FC<ExpenseTrackerProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  
  // Load from local storage
  const [activities, setActivities] = useState<FarmingActivity[]>(() => {
    const saved = localStorage.getItem('kisan_sight_expenses');
    return saved ? JSON.parse(saved) : [];
  });

  const [newActivity, setNewActivity] = useState({ 
    category: 'Seeds' as ExpenseCategory,
    type: '', 
    cost: '', 
    notes: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [filter, setFilter] = useState<ExpenseCategory | 'All'>('All');
  const [budget, setBudget] = useState<number>(() => {
    const saved = localStorage.getItem('kisan_sight_budget');
    return saved ? parseFloat(saved) : 50000;
  });

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('kisan_sight_expenses', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('kisan_sight_budget', budget.toString());
  }, [budget]);

  const addActivity = () => {
    if (!newActivity.type || !newActivity.cost) return;
    const activity: FarmingActivity = {
      id: Date.now().toString(),
      category: newActivity.category,
      type: newActivity.type,
      date: newActivity.date,
      cost: parseFloat(newActivity.cost),
      notes: newActivity.notes
    };
    setActivities([activity, ...activities]);
    setNewActivity({ 
      category: 'Seeds',
      type: '', 
      cost: '', 
      notes: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const removeActivity = (id: string) => {
    setActivities(activities.filter(a => a.id !== id));
  };

  const filteredActivities = useMemo(() => {
    return filter === 'All' 
      ? activities 
      : activities.filter(a => a.category === filter);
  }, [activities, filter]);

  const totalCost = useMemo(() => activities.reduce((sum, a) => sum + a.cost, 0), [activities]);
  
  const chartData = useMemo(() => {
    const data = CATEGORIES.map(cat => ({
      name: cat.name,
      value: activities.filter(a => a.category === cat.name).reduce((sum, a) => sum + a.cost, 0),
      color: cat.color
    })).filter(d => d.value > 0);
    return data;
  }, [activities]);

  const monthlyData = useMemo(() => {
    const months: Record<string, number> = {};
    activities.forEach(a => {
      const month = new Date(a.date).toLocaleString('default', { month: 'short' });
      months[month] = (months[month] || 0) + a.cost;
    });
    return Object.entries(months).map(([name, value]) => ({ name, value }));
  }, [activities]);

  const budgetProgress = (totalCost / budget) * 100;

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header & Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Wallet size={120} />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl">
                  <Wallet size={24} />
                </div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                  {t.nav.expenses}
                </h2>
              </div>
              <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
                <Download size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Total Spent</p>
                <div className="text-5xl font-black text-gray-900 flex items-center gap-2">
                  <IndianRupee size={32} className="text-indigo-500" />
                  {totalCost.toLocaleString()}
                </div>
                
                <div className="mt-6">
                  <div className="flex justify-between items-end mb-2">
                    <p className="text-sm font-bold text-gray-500">Budget Progress</p>
                    <p className="text-sm font-black text-indigo-600">{budgetProgress.toFixed(1)}%</p>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${budgetProgress > 90 ? 'bg-red-500' : 'bg-indigo-600'}`}
                      style={{ width: `${Math.min(budgetProgress, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <p className="text-xs text-gray-400">Budget: ₹{budget.toLocaleString()}</p>
                    {budgetProgress > 100 && (
                      <p className="text-xs text-red-500 font-bold flex items-center gap-1">
                        <AlertCircle size={10} /> Over Budget
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-3xl shadow-xl text-white">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-indigo-400" /> Quick Stats
          </h3>
          <div className="space-y-6">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Daily Average</p>
              <p className="text-2xl font-black">₹{(totalCost / (activities.length || 1)).toFixed(0)}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Highest Category</p>
              <p className="text-2xl font-black text-indigo-400">
                {chartData.sort((a, b) => b.value - a.value)[0]?.name || 'None'}
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Set Season Budget</label>
              <div className="flex items-center gap-2 bg-slate-800 p-2 rounded-xl">
                <IndianRupee size={16} className="text-slate-500" />
                <input 
                  type="number" 
                  value={budget}
                  onChange={(e) => setBudget(parseFloat(e.target.value) || 0)}
                  className="bg-transparent border-none outline-none text-white font-bold w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add & List Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Expense Form */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 h-fit sticky top-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Plus size={20} className="text-green-500" /> Add New Expense
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Category</label>
              <div className="grid grid-cols-4 gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.name}
                    onClick={() => setNewActivity({ ...newActivity, category: cat.name })}
                    className={`p-3 rounded-xl flex flex-col items-center justify-center transition-all ${
                      newActivity.category === cat.name 
                        ? 'bg-indigo-600 text-white shadow-lg scale-105' 
                        : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                    }`}
                  >
                    <cat.icon size={18} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Description</label>
              <input
                type="text"
                placeholder="e.g. 50kg Urea, Labor for sowing"
                value={newActivity.type}
                onChange={(e) => setNewActivity({ ...newActivity, type: e.target.value })}
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Amount (₹)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={newActivity.cost}
                  onChange={(e) => setNewActivity({ ...newActivity, cost: e.target.value })}
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-indigo-600"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Date</label>
                <input
                  type="date"
                  value={newActivity.date}
                  onChange={(e) => setNewActivity({ ...newActivity, date: e.target.value })}
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Notes (Optional)</label>
              <textarea
                placeholder="Add any extra details..."
                value={newActivity.notes}
                onChange={(e) => setNewActivity({ ...newActivity, notes: e.target.value })}
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none h-24 resize-none"
              />
            </div>

            <button
              onClick={addActivity}
              disabled={!newActivity.type || !newActivity.cost}
              className="w-full bg-indigo-600 disabled:bg-indigo-300 text-white font-black py-4 rounded-2xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 mt-4"
            >
              <Plus size={20} /> Save Expense
            </button>
          </div>
        </div>

        {/* Expense List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-2xl font-black text-gray-900">Recent Transactions</h3>
            <div className="flex items-center gap-2 bg-white p-1 rounded-xl shadow-sm border border-gray-100">
              <Filter size={14} className="ml-2 text-gray-400" />
              <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="bg-transparent border-none outline-none text-sm font-bold text-gray-600 py-1 pr-4"
              >
                <option value="All">All Categories</option>
                {CATEGORIES.map(cat => (
                  <option key={cat.name} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredActivities.length === 0 ? (
              <div className="bg-white p-20 rounded-3xl border border-dashed border-gray-200 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                  <Wallet size={32} />
                </div>
                <p className="text-gray-400 font-medium">No expenses found for this filter.</p>
              </div>
            ) : (
              filteredActivities.map((a) => {
                const catInfo = CATEGORIES.find(c => c.name === a.category) || CATEGORIES[6];
                return (
                  <div key={a.id} className="bg-white p-6 rounded-3xl shadow-md border border-gray-50 flex items-center gap-6 group hover:border-indigo-100 transition-all">
                    <div className="p-4 rounded-2xl" style={{ backgroundColor: `${catInfo.color}15`, color: catInfo.color }}>
                      <catInfo.icon size={24} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-black text-gray-900">{a.type}</h4>
                        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 bg-gray-100 text-gray-500 rounded-md">
                          {a.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-400 font-medium">
                        <span className="flex items-center gap-1"><Calendar size={12} /> {a.date}</span>
                        {a.notes && <span className="flex items-center gap-1"><Tag size={12} /> {a.notes}</span>}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xl font-black text-gray-900 flex items-center justify-end gap-1">
                        <IndianRupee size={16} className="text-indigo-500" />
                        {a.cost.toLocaleString()}
                      </div>
                      <button
                        onClick={() => removeActivity(a.id)}
                        className="text-xs font-bold text-red-400 hover:text-red-600 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
