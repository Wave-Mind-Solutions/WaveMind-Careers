import React, { useState, useEffect } from 'react';
import { getCandidates, updateCandidateStatus, scheduleInterview as apiScheduleInterview } from '../api';
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
  Briefcase,
  Calendar,
  Video,
  X,
  Send,
  Loader2
} from 'lucide-react';

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  
  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [scheduling, setScheduling] = useState(false);
  const [interviewData, setInterviewData] = useState({
    date: '',
    time: '',
    meetingLink: 'https://meet.google.com/new',
    notes: ''
  });

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

  const openScheduleModal = (candidate) => {
    setSelectedCandidate(candidate);
    setShowModal(true);
  };

  const handleSchedule = async (e) => {
    e.preventDefault();
    setScheduling(true);
    try {
      await apiScheduleInterview({
        candidateId: selectedCandidate._id,
        jobId: selectedCandidate.roleAppliedId || '', // Assuming roleAppliedId is stored
        interviewerId: 'admin_id_placeholder', // Should be dynamic
        ...interviewData
      });
      alert('Interview scheduled and email sent!');
      setShowModal(false);
      fetchCandidates();
    } catch (error) {
      alert('Failed to schedule interview');
    } finally {
      setScheduling(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Selected': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'Rejected': return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
      case 'Interview': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'Shortlisted': return 'text-sky-400 bg-sky-400/10 border-sky-400/20';
      case 'Offer Sent': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
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
            ) : candidates.filter(c => c.name.toLowerCase().includes(filter.toLowerCase())).map((c) => (
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
                    </div>
                  </div>
                </td>
                <td className="px-10 py-8">
                  <div className="text-sm font-bold text-slate-300 flex items-center gap-2">
                    <Briefcase size={14} className="text-indigo-500" /> {c.roleApplied || 'Position'}
                  </div>
                  <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-1">
                    {c.roleType} • {c.source}
                  </div>
                </td>
                <td className="px-10 py-8 text-sm font-bold text-slate-400">{c.experience || 'Entry'}</td>
                <td className="px-10 py-8">
                  <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${getStatusColor(c.status)}`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-10 py-8">
                  <div className="flex items-center gap-3">
                    {c.resumeUrl && (
                      <a 
                        href={c.resumeUrl} target="_blank" rel="noreferrer"
                        className="p-3 glass-card rounded-xl text-slate-400 hover:text-indigo-400 hover:scale-110 transition-all border-white/5"
                        title="View Resume"
                      >
                        <FileText size={18} />
                      </a>
                    )}
                    {c.status === 'Shortlisted' && (
                      <button 
                        onClick={() => openScheduleModal(c)}
                        className="p-3 glass-card rounded-xl text-slate-400 hover:text-amber-400 hover:scale-110 transition-all border-white/5"
                        title="Schedule Interview"
                      >
                        <Calendar size={18} />
                      </button>
                    )}
                    {c.status === 'Interview' && (
                      <button 
                        onClick={() => handleStatusUpdate(c._id, 'Selected')}
                        className="p-3 glass-card rounded-xl text-slate-400 hover:text-emerald-400 hover:scale-110 transition-all border-white/5"
                        title="Mark Selected"
                      >
                        <CheckCircle2 size={18} />
                      </button>
                    )}
                    {(c.status !== 'Rejected' && c.status !== 'Selected' && c.status !== 'Offer Sent') && (
                      <button 
                        onClick={() => handleStatusUpdate(c._id, 'Rejected')}
                        className="p-3 glass-card rounded-xl text-slate-400 hover:text-rose-400 hover:scale-110 transition-all border-white/5"
                        title="Reject"
                      >
                        <XCircle size={18} />
                      </button>
                    )}
                    {c.status === 'Applied' && (
                      <button 
                        onClick={() => handleStatusUpdate(c._id, 'Shortlisted')}
                        className="p-3 glass-card rounded-xl text-slate-400 hover:text-sky-400 hover:scale-110 transition-all border-white/5"
                        title="Shortlist"
                      >
                        <CheckCircle2 size={18} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Schedule Interview Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="glass-card w-full max-w-xl rounded-[3rem] border-white/10 p-12 relative overflow-hidden animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-black uppercase tracking-widest mb-4">
                <Clock size={12} /> Schedule Talent Assessment
              </div>
              <h2 className="text-3xl font-black text-white tracking-tight">Interview <span className="text-amber-400">Sync</span></h2>
              <p className="text-slate-500 text-sm font-medium mt-1">Candidate: <span className="text-white font-bold">{selectedCandidate?.name}</span></p>
            </div>

            <form onSubmit={handleSchedule} className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Date</label>
                  <input 
                    type="date" required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-amber-500 transition-all"
                    value={interviewData.date}
                    onChange={(e) => setInterviewData({...interviewData, date: e.target.value})}
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Time</label>
                  <input 
                    type="time" required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-amber-500 transition-all"
                    value={interviewData.time}
                    onChange={(e) => setInterviewData({...interviewData, time: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Virtual Meeting Link</label>
                <div className="relative">
                  <Video size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600" />
                  <input 
                    type="url" required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-white focus:outline-none focus:border-amber-500 transition-all"
                    placeholder="https://meet.google.com/..."
                    value={interviewData.meetingLink}
                    onChange={(e) => setInterviewData({...interviewData, meetingLink: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Internal Notes (Optional)</label>
                <textarea 
                  rows="3"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-amber-500 transition-all resize-none"
                  placeholder="Focus on technical depth and cultural fit..."
                  value={interviewData.notes}
                  onChange={(e) => setInterviewData({...interviewData, notes: e.target.value})}
                />
              </div>

              <button 
                type="submit" disabled={scheduling}
                className="w-full bg-amber-500 text-amber-950 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {scheduling ? <><Loader2 size={20} className="animate-spin" /> Synchronizing...</> : <><Send size={18} /> Finalize Schedule & Notify</>}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Candidates;
