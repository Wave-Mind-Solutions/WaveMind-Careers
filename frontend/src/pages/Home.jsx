import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ChevronRight, 
  Zap, 
  ShieldCheck, 
  BarChart3, 
  ArrowRight,
  MousePointer2
} from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen gradient-mesh selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between glass-card px-8 py-4 rounded-3xl border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20">
              W
            </div>
            <span className="font-bold text-white tracking-tight text-lg hidden sm:block">WAVE MIND</span>
          </div>
          
          <div className="flex items-center gap-8">
            <Link to="/careers" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">Jobs</Link>
            <Link to="/careers" className="bg-white text-indigo-950 px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide hover:bg-indigo-400 hover:text-white transition-all shadow-xl shadow-indigo-500/10">
              Apply Now
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-8">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border-indigo-500/30 text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-12 animate-bounce">
            <Sparkles size={14} /> The Future of Hiring is Here
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tight leading-tight">
            AI-Driven Talent <br />
            <span className="gradient-text">Acquisition</span> for Visionaries
          </h1>
          
          <p className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed mb-16 font-normal">
            Wave Mind Talent Hub uses cognitive intelligence to automate your entire hiring pipeline. 
            From sourcing to offer letters, experience the speed of thought.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/careers" className="group relative px-10 py-5 bg-indigo-600 text-white rounded-2xl font-bold uppercase tracking-wide overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-indigo-500/40">
              <span className="relative z-10 flex items-center gap-3">
                Explore Opportunities <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
            
            <Link to="/login" className="px-10 py-5 glass-card border-white/10 text-white rounded-2xl font-bold uppercase tracking-wide hover:bg-white/5 transition-all">
              Launch Dashboard
            </Link>
          </div>
        </div>

        {/* Hero Background Elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none animate-pulse"></div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap size={32} className="text-indigo-400" />,
                title: "Cognitive ATS",
                desc: "Smart parsing and ranking of candidates based on deep skill-mapping and cultural fit indicators."
              },
              {
                icon: <ShieldCheck size={32} className="text-violet-400" />,
                title: "Automated Interviews",
                desc: "Seamless scheduling and integrated meeting links with automated feedback loops for interviewers."
              },
              {
                icon: <BarChart3 size={32} className="text-blue-400" />,
                title: "Smart Offer Flow",
                desc: "Generate professional offer letters instantly with AI-suggested compensation benchmarks."
              }
            ].map((f, i) => (
              <div key={i} className="glass-card p-12 rounded-[2.5rem] border-white/5 hover:border-indigo-500/30 transition-all group">
                <div className="w-16 h-16 glass-card rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  {f.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed font-normal">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / Interactive Section */}
      <section className="py-32 px-8">
        <div className="max-w-7xl mx-auto glass-card rounded-[3rem] p-16 md:p-24 border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-600/10 to-transparent"></div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter leading-none">
                Hiring, <br />
                <span className="text-indigo-400">Simplified.</span>
              </h2>
              <div className="space-y-6">
                {[
                  "90% reduction in time-to-hire",
                  "Automated source tracking & ROI",
                  "Collaborative interview scorecards",
                  "Single-click candidate onboarding"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-slate-400 font-semibold">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <ArrowRight size={14} />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Applicants', value: '12k+' },
                { label: 'Companies', value: '450+' },
                { label: 'Positions', value: '890' },
                { label: 'Offers Sent', value: '3.4k' }
              ].map((stat, i) => (
                <div key={i} className="glass-card p-8 rounded-3xl border-white/5 text-center">
                  <div className="text-3xl font-bold text-white mb-1 tracking-tight">{stat.value}</div>
                  <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl shadow-indigo-500/20">
              W
            </div>
            <div>
              <div className="font-bold text-white tracking-tight text-xl">WAVE MIND</div>
              <div className="text-[10px] font-bold text-indigo-400 tracking-widest uppercase">Talent Hub</div>
            </div>
          </div>
          
          <div className="flex gap-12 text-sm font-semibold text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Platform</a>
            <Link to="/login" className="hover:text-white transition-colors">Admin Login</Link>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
          
          <div className="text-slate-600 text-xs font-normal">
            © 2026 Wave Mind Solutions. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
