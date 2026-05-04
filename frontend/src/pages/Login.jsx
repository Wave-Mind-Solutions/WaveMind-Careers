import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Lock, Mail, ChevronRight, ArrowLeft, Sparkles } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login({ email, password });
    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center gradient-mesh p-8">
      <div className="max-w-md w-full relative">
        {/* Back to Home */}
        <Link 
          to="/" 
          className="absolute -top-20 left-0 group flex items-center gap-3 text-slate-500 hover:text-white transition-all font-black uppercase tracking-widest text-[10px]"
        >
          <div className="w-10 h-10 glass-card rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <ArrowLeft size={16} />
          </div>
          Return to Hub
        </Link>

        <div className="text-center mb-12 animate-in fade-in slide-in-from-top-10 duration-700">
          <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center overflow-hidden shadow-2xl shadow-indigo-500/40 mx-auto mb-6 hover:scale-105 transition-transform cursor-pointer">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 glass-card border-indigo-500/30 rounded-full text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">
            <Sparkles size={12} /> Restricted Access
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter">Admin <span className="gradient-text">Portal</span></h1>
          <p className="text-slate-500 mt-3 font-medium">Synchronize with the talent hub dashboard.</p>
        </div>

        <div className="glass-card p-10 rounded-[3rem] border-white/5 shadow-2xl animate-in zoom-in-95 duration-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 blur-3xl -mr-16 -mt-16"></div>
          
          {error && (
            <div className="bg-rose-500/10 text-rose-400 p-4 rounded-2xl text-xs font-bold mb-8 border border-rose-500/20 animate-in shake duration-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-1">Identity (Email)</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                <input 
                  required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 pl-14 pr-6 py-4 rounded-2xl text-white focus:outline-none focus:border-indigo-500 transition-all font-medium"
                  placeholder="admin@wavemind.com"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-1">Access Key (Password)</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                <input 
                  required type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 pl-14 pr-6 py-4 rounded-2xl text-white focus:outline-none focus:border-indigo-500 transition-all font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit" disabled={loading}
              className="w-full bg-white text-indigo-950 py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-indigo-400 hover:text-white transition-all shadow-2xl shadow-indigo-500/20 flex items-center justify-center gap-3 disabled:opacity-70 group"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-indigo-950"></div>
              ) : (
                <>Establish Connection <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
              Secured by WaveMind Cognitive Security
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
