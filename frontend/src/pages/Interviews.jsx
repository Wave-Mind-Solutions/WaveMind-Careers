import React, { useState, useEffect } from 'react';
import { getInterviews } from '../api';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  User, 
  Briefcase,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

const Interviews = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const { data } = await getInterviews();
      setInterviews(data);
    } catch (error) {
      console.error('Error fetching interviews:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-black text-white tracking-tight">Interview <span className="gradient-text">Schedule</span></h1>
        <p className="text-slate-500 font-medium">Keep track of upcoming talent assessments and meetings.</p>
      </div>

      <div className="grid gap-6">
        {loading ? (
          <div className="text-center py-20 text-slate-500 font-bold">Synchronizing calendar...</div>
        ) : interviews.length === 0 ? (
          <div className="glass-card p-20 rounded-[2.5rem] border-white/5 text-center">
            <CalendarIcon size={48} className="mx-auto text-slate-700 mb-6" />
            <p className="text-slate-500 font-bold">No interviews scheduled yet.</p>
          </div>
        ) : interviews.map((interview) => (
          <div key={interview._id} className="glass-card p-10 rounded-[2.5rem] border-white/5 group hover:border-indigo-500/30 transition-all flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex items-center gap-8">
              <div className="flex flex-col items-center justify-center w-24 h-24 glass-card rounded-3xl border-indigo-500/20 text-indigo-400">
                <span className="text-[10px] font-black uppercase tracking-widest">{new Date(interview.date).toLocaleString('default', { month: 'short' })}</span>
                <span className="text-3xl font-black">{new Date(interview.date).getDate()}</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-black text-white">{interview.candidate?.name}</h3>
                  <div className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-black text-slate-500 uppercase tracking-widest border border-white/10">
                    {interview.job?.title}
                  </div>
                </div>
                <div className="flex items-center gap-6 text-slate-500 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-indigo-500" /> {interview.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-indigo-500" /> Interviewer: {interview.interviewer?.name}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 w-full md:w-auto">
              <a 
                href={interview.meetingLink}
                target="_blank"
                rel="noreferrer"
                className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all group/btn"
              >
                <Video size={18} /> Join Meeting <ExternalLink size={14} className="opacity-0 group-hover/btn:opacity-100 transition-opacity" />
              </a>
              <button className="p-4 glass-card rounded-2xl text-slate-500 hover:text-white transition-all border-white/5">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Interviews;
