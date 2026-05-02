import React, { useState, useEffect } from 'react';
import { getCandidates, updateCandidateStatus } from '../api';
import { 
  User, 
  Mail, 
  Phone, 
  ExternalLink, 
  FileText, 
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Clock,
  Briefcase
} from 'lucide-react';

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const { data } = await getCandidates();
      setCandidates(data.candidates || []);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateCandidateStatus(id, { status });
      fetchCandidates();
    } catch (error) {
      alert('Error updating status');
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Selected': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'Rejected': return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
      case 'Interview': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'Shortlisted': return 'text-sky-400 bg-sky-400/10 border-sky-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">Talent <span className="gradient-text">Pipeline</span></h1>
          <p className="text-slate-500 font-medium">Monitor and manage applicant progress across stages.</p>
        </div>
        
        <div className="flex gap-4">
          <input 
            type="text" 
            placeholder="Search candidates..."
            className="bg-white/5 border border-white/10 rounded-xl px-6 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all w-64"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="glass-card rounded-[2.5rem] border-white/5 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 bg-white/5">
              <th className="px-10 py-6 text-[10px] font-black text-indigo-400 uppercase tracking-widest">Candidate</th>
              <th className="px-10 py-6 text-[10px] font-black text-indigo-400 uppercase tracking-widest">Role Applied</th>
              <th className="px-10 py-6 text-[10px] font-black text-indigo-400 uppercase tracking-widest">Experience</th>
              <th className="px-10 py-6 text-[10px] font-black text-indigo-400 uppercase tracking-widest">Status</th>
              <th className="px-10 py-6 text-[10px] font-black text-indigo-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr><td colSpan="5" className="px-10 py-20 text-center text-slate-500 font-bold">Loading talent data...</td></tr>
            ) : candidates.length === 0 ? (
              <tr><td colSpan="5" className="px-10 py-20 text-center text-slate-500 font-bold">No candidates found in pipeline.</td></tr>
            ) : candidates.map((c) => (
              <tr key={c._id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-10 py-8">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center text-indigo-400 font-black text-xl border-indigo-500/20">
                      {c.name[0]}
                    </div>
                    <div>
                      <div className="font-black text-white text-lg">{c.name}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                        <Mail size={12} /> {c.email}
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                        <Phone size={12} /> {c.phone}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-8">
                  <div className="text-sm font-bold text-slate-300 flex items-center gap-2">
                    <Briefcase size={14} className="text-indigo-500" /> {c.roleType || 'Full-Time'}
                  </div>
                  <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-1">
                    Source: {c.source}
                  </div>
                </td>
                <td className="px-10 py-8 text-sm font-bold text-slate-400">{c.experience} Years</td>
                <td className="px-10 py-8">
                  <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${getStatusColor(c.status)}`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-10 py-8">
                  <div className="flex items-center gap-3">
                    {c.resumeUrl && (
                      <a 
                        href={c.resumeUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-3 glass-card rounded-xl text-slate-400 hover:text-indigo-400 hover:scale-110 transition-all border-white/5"
                        title="View Resume"
                      >
                        <FileText size={18} />
                      </a>
                    )}
                    <button 
                      onClick={() => handleStatusUpdate(c._id, 'Shortlisted')}
                      className="p-3 glass-card rounded-xl text-slate-400 hover:text-sky-400 hover:scale-110 transition-all border-white/5"
                      title="Shortlist"
                    >
                      <CheckCircle2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleStatusUpdate(c._id, 'Rejected')}
                      className="p-3 glass-card rounded-xl text-slate-400 hover:text-rose-400 hover:scale-110 transition-all border-white/5"
                      title="Reject"
                    >
                      <XCircle size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Candidates;
