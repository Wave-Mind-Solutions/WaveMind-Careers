import React, { useState, useEffect } from 'react';
import { getJobs } from '../api';
import { Briefcase, MapPin, DollarSign, Clock, ChevronRight, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await getJobs();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = filter === 'All' ? jobs : jobs.filter(job => job.type === filter);

  return (
    <div className="min-h-screen gradient-mesh">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between glass-card px-8 py-4 rounded-3xl border-white/5">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20">
                W
              </div>
              <span className="font-bold text-white tracking-tight text-lg hidden sm:block uppercase">Wave Mind</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-8">
            <Link to="/" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">Home</Link>
            <Link to="/careers" className="text-sm font-semibold text-white transition-colors">Jobs</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 pt-48 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-indigo-500/30 text-indigo-300 text-[10px] font-bold uppercase tracking-widest mb-6 animate-pulse">
          <Sparkles size={14} /> Intelligence Synchronized
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
          Join the <span className="gradient-text">Elite</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-normal mb-16">
          Your career, accelerated by cognitive intelligence. Explore our open visionary positions.
        </p>

        <div className="flex justify-center gap-4 mb-16">
          {['All', 'Full-Time', 'Internship'].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-8 py-3 rounded-2xl font-bold transition-all duration-300 ${
                filter === t 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/40 scale-105' 
                  : 'glass-card text-slate-400 hover:text-white hover:border-indigo-500/50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Jobs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {loading ? (
            <div className="col-span-full py-20 text-center text-slate-500 font-semibold">
              <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4"></div>
              Synchronizing with talent cloud...
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="col-span-full py-20 text-center text-slate-500 font-semibold">No positions available at the moment.</div>
          ) : filteredJobs.map((job) => (
            <div key={job._id} className="glass-card p-10 rounded-[2.5rem] border-white/5 group hover:border-indigo-500/30 transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 blur-3xl -mr-16 -mt-16"></div>
              
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="bg-indigo-500/10 text-indigo-400 px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wide border border-indigo-500/20">
                  {job.type}
                </div>
                <div className="w-10 h-10 glass-card rounded-xl flex items-center justify-center text-slate-500 group-hover:text-indigo-400 transition-colors">
                  <Zap size={20} />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors relative z-10">
                {job.title}
              </h3>
              
              <div className="flex flex-wrap gap-2 mb-8 relative z-10">
                {job.skills?.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold text-slate-500 border border-white/10 uppercase tracking-wide">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-10 text-xs font-bold text-slate-500 uppercase tracking-wide relative z-10">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-indigo-500" /> {job.location}
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign size={14} className="text-indigo-500" /> {job.salary}
                </div>
              </div>

              <Link 
                to={`/apply/${job._id}?role=${job.title}`}
                className="w-full flex items-center justify-center gap-3 bg-white text-indigo-950 py-4 rounded-2xl font-bold uppercase tracking-wide hover:bg-indigo-400 hover:text-white transition-all duration-300 transform group-hover:translate-y-[-4px] relative z-10"
              >
                Apply Now <ArrowRight size={18} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Careers;
