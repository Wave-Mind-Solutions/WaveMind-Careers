import React, { useState } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { applyJob } from '../api';
import { Upload, CheckCircle, ArrowLeft, Sparkles, Send } from 'lucide-react';

const Apply = () => {
  const { jobId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const source = searchParams.get('source') || 'website';
  const roleType = searchParams.get('role');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    experience: '',
    portfolioUrl: '',
  });
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    data.append('roleApplied', jobId);
    data.append('roleType', roleType);
    data.append('source', source);
    if (resume) data.append('resume', resume);

    try {
      await applyJob(data);
      setSubmitted(true);
    } catch (error) {
      console.error('Error applying:', error);
      const msg = error.response?.data?.message || 'Application failed. Please try again.';
      alert(`Error: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen gradient-mesh flex items-center justify-center p-8">
        <div className="max-w-2xl w-full glass-card p-16 rounded-[3rem] text-center border-white/5 animate-in zoom-in-95 duration-500">
          <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-10 border border-emerald-500/30">
            <CheckCircle className="text-emerald-400" size={48} />
          </div>
          <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">Intelligence Received!</h2>
          <p className="text-slate-400 mb-12 text-lg font-normal leading-relaxed">
            Your application has been successfully synchronized with our talent hub. 
            Check your inbox for a confirmation from our cognitive recruitment engine.
          </p>
          <button 
            onClick={() => navigate('/careers')}
            className="bg-white text-indigo-950 px-10 py-5 rounded-2xl font-bold uppercase tracking-wide hover:bg-indigo-400 hover:text-white transition-all shadow-2xl shadow-indigo-500/20"
          >
            Explore More Roles
          </button>
        </div>
      </div>
    );
  }

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
            <Link to="/careers" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">Jobs</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto pt-48 pb-24 px-8">
        <button 
          onClick={() => navigate(-1)} 
          className="group flex items-center gap-3 text-slate-500 hover:text-white mb-12 font-bold uppercase tracking-wide text-xs transition-all"
        >
          <div className="w-10 h-10 glass-card rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <ArrowLeft size={18} />
          </div>
          Back to Portal
        </button>

        <div className="glass-card rounded-[3rem] p-12 md:p-20 border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 blur-[100px] -mr-32 -mt-32"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-indigo-500/10 text-indigo-400 px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wide border border-indigo-500/20">
                {roleType} Position
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 glass-card border-indigo-500/20 rounded-full text-[10px] font-bold text-indigo-400 uppercase tracking-wide">
                <Sparkles size={12} /> AI Verified
              </div>
            </div>
            
            <h2 className="text-5xl font-bold text-white mb-12 tracking-tight">Application <span className="gradient-text">Gateway</span></h2>

            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <label className="block text-[10px] font-bold text-indigo-400 uppercase tracking-wide mb-4">Full Name</label>
                  <input 
                    required name="name" onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-medium"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-indigo-400 uppercase tracking-wide mb-4">Email Address</label>
                  <input 
                    required type="email" name="email" onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-medium"
                    placeholder="name@visionary.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <label className="block text-[10px] font-bold text-indigo-400 uppercase tracking-wide mb-4">Phone Number</label>
                  <input 
                    required name="phone" onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-medium"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-indigo-400 uppercase tracking-wide mb-4">Digital Portfolio (Optional)</label>
                  <input 
                    name="portfolioUrl" onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-medium"
                    placeholder="https://behance.net/you"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-indigo-400 uppercase tracking-wide mb-4">Core Competencies (Comma separated)</label>
                <input 
                  required name="skills" onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-medium"
                  placeholder="React, AI Agents, UI Design..."
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-indigo-400 uppercase tracking-wide mb-4">Candidate Intelligence / About You</label>
                <textarea 
                  name="experience" onChange={handleChange} rows="4"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-medium"
                  placeholder="Describe your visionary experience..."
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-indigo-400 uppercase tracking-wide mb-4">Resume Blueprint (PDF)</label>
                <div className="relative group">
                  <input 
                    required type="file" accept=".pdf" onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-full py-12 glass-card border-2 border-dashed border-white/10 rounded-[2rem] flex flex-col items-center justify-center group-hover:border-indigo-500 transition-all hover:bg-white/5">
                    <div className="w-16 h-16 glass-card rounded-2xl flex items-center justify-center mb-4 text-slate-500 group-hover:text-indigo-400 transition-colors">
                      <Upload size={24} />
                    </div>
                    <span className="text-sm text-slate-500 group-hover:text-white font-bold uppercase tracking-wide">
                      {resume ? resume.name : 'Upload Credentials'}
                    </span>
                  </div>
                </div>
              </div>

              <button 
                type="submit" disabled={loading}
                className="w-full bg-white text-indigo-950 py-6 rounded-3xl font-bold text-lg uppercase tracking-wide hover:bg-indigo-400 hover:text-white transition-all shadow-2xl shadow-indigo-500/20 flex items-center justify-center gap-4 disabled:opacity-70 group"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-indigo-950"></div>
                ) : (
                  <>Submit Application <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apply;
