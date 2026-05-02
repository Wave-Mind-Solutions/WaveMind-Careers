import React, { useState, useEffect } from 'react';
import { getStats } from '../api';
import { 
  Users, 
  Briefcase, 
  CheckCircle, 
  XCircle, 
  TrendingUp,
  PieChart as PieIcon,
  BarChart as BarIcon,
  Sparkles
} from 'lucide-react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await getStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-40 gap-4">
      <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
      <p className="text-indigo-400 font-bold tracking-widest text-xs uppercase">Syncing Real-time Data...</p>
    </div>
  );

  const statCards = [
    { title: 'Total Applicants', value: stats?.total, icon: <Users size={20} />, color: 'text-blue-400' },
    { title: 'Internships', value: stats?.internship, icon: <Briefcase size={20} />, color: 'text-indigo-400' },
    { title: 'Full-Time', value: stats?.fullTime, icon: <TrendingUp size={20} />, color: 'text-violet-400' },
    { title: 'Selected', value: stats?.selected, icon: <CheckCircle size={20} />, color: 'text-emerald-400' },
    { title: 'Rejected', value: stats?.rejected, icon: <XCircle size={20} />, color: 'text-rose-400' },
  ];

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#94a3b8',
          font: { weight: 'bold', size: 10 }
        }
      }
    },
    scales: {
      y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
      x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
    }
  };

  const sourceData = {
    labels: stats?.sourceStats.map(s => s._id),
    datasets: [{
      data: stats?.sourceStats.map(s => s.count),
      backgroundColor: ['#3b82f6', '#6366f1', '#8b5cf6', '#ec4899', '#10b981'],
      borderWidth: 0,
    }]
  };

  const statusData = {
    labels: stats?.statusStats.map(s => s._id),
    datasets: [{
      label: 'Applicants',
      data: stats?.statusStats.map(s => s.count),
      backgroundColor: 'rgba(99, 102, 241, 0.5)',
      borderColor: '#6366f1',
      borderWidth: 2,
      borderRadius: 12,
    }]
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">System <span className="gradient-text">Intelligence</span></h1>
          <p className="text-slate-500 font-medium">Real-time recruitment analytics and performance metrics.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 glass-card border-indigo-500/30 rounded-2xl text-[10px] font-black text-indigo-400 uppercase tracking-widest animate-pulse">
          <Sparkles size={14} /> AI Insights Active
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {statCards.map((card, i) => (
          <div key={i} className="glass-card p-8 rounded-3xl border-white/5 hover:border-indigo-500/30 transition-all group">
            <div className={`w-12 h-12 glass-card rounded-2xl flex items-center justify-center mb-6 ${card.color} group-hover:scale-110 transition-transform`}>
              {card.icon}
            </div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{card.title}</p>
            <h3 className="text-3xl font-black text-white tracking-tight">{card.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-10 rounded-[2.5rem] border-white/5">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <PieIcon size={20} className="text-indigo-400" />
              <h3 className="text-lg font-black text-white uppercase tracking-tighter">Source Distribution</h3>
            </div>
          </div>
          <div className="h-72">
            <Pie data={sourceData} options={{ ...chartOptions, scales: {} }} />
          </div>
        </div>

        <div className="glass-card p-10 rounded-[2.5rem] border-white/5">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <BarIcon size={20} className="text-indigo-400" />
              <h3 className="text-lg font-black text-white uppercase tracking-tighter">Hiring Pipeline</h3>
            </div>
          </div>
          <div className="h-72">
            <Bar data={statusData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
