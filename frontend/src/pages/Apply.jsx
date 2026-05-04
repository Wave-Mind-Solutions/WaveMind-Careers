import React, { useState } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { applyJob } from '../api';
import { Upload, CheckCircle, ArrowLeft, Sparkles, Send, FileText, User, Mail, Phone, Code, Globe, Briefcase, Award, Shield } from 'lucide-react';

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
      <div className="min-h-screen bg-black selection:bg-cyan-500/30 flex items-center justify-center p-6">
        {/* Animated Background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:80px_80px]"></div>
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-cyan-500/20 blur-[120px] rounded-full animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-2xl w-full">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 p-12 text-center backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 blur-3xl rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 blur-3xl rounded-full"></div>

            <div className="relative z-10">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center mb-8 border border-cyan-500/30">
                <CheckCircle className="text-cyan-400" size={48} />
              </div>
              <h2 className="text-4xl font-black text-white mb-4 tracking-tighter">Application Received!</h2>
              <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                Your application has been successfully submitted to our AI-powered talent hub.
                Our recruitment engine will analyze your profile and get back to you shortly.
              </p>
              <div className="bg-cyan-500/10 rounded-xl p-4 mb-8 border border-cyan-500/20">
                <p className="text-cyan-400 text-sm font-medium">✨ What happens next?</p>
                <p className="text-gray-400 text-xs mt-1">Our AI will review your application within 48 hours. You'll receive updates via email.</p>
              </div>
              <button
                onClick={() => navigate('/careers')}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold hover:shadow-xl hover:shadow-cyan-500/30 transition-all"
              >
                Explore More Opportunities
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black selection:bg-cyan-500/30 overflow-x-hidden">

      {/* Animated Background Grid */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:80px_80px]"></div>
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/20 blur-[150px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full animate-pulse delay-1000"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 px-6 py-3 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-cyan-500/30 rotate-3">
                  W
                </div>
                <div className="absolute -inset-1 bg-cyan-500/20 blur-xl rounded-full -z-10"></div>
              </div>
              <span className="font-black text-white tracking-tighter text-xl">WAVEMIND</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Home</Link>
              <Link to="/careers" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Careers</Link>
            </div>

            {/* <div className="flex items-center gap-4">
              <Link to="/login" className="hidden sm:block px-5 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Sign In
              </Link>
              <Link to="/" className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all hover:scale-105">
                Dashboard
              </Link>
            </div> */}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto pt-40 pb-24 px-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-3 text-gray-500 hover:text-white mb-8 font-medium text-sm transition-all"
        >
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/10 transition-all">
            <ArrowLeft size={16} className="group-hover:text-cyan-400" />
          </div>
          Back to Opportunities
        </button>

        {/* Application Form */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 p-8 md:p-12 backdrop-blur-sm">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-[100px] -mr-40 -mt-40"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 blur-[100px] -ml-40 -mb-40"></div>

          <div className="relative z-10">
            {/* Header */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                <Sparkles size={12} className="text-cyan-400" />
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{roleType || 'Professional'} Position</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <Shield size={12} className="text-gray-400" />
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">AI-Powered Review</span>
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">
              Join the <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Revolution</span>
            </h2>
            <p className="text-gray-400 mb-12 leading-relaxed">
              Fill out the form below to apply for this position. Our cognitive recruitment engine will analyze your profile and match you with the perfect opportunity.
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name and Email */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    <User size={14} className="text-cyan-400" /> Full Name
                  </label>
                  <input
                    required name="name" onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    <Mail size={14} className="text-cyan-400" /> Email Address
                  </label>
                  <input
                    required type="email" name="email" onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              {/* Phone and Portfolio */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    <Phone size={14} className="text-cyan-400" /> Phone Number
                  </label>
                  <input
                    required name="phone" onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
                    placeholder="+1 234 567 8900"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    <Globe size={14} className="text-cyan-400" /> Portfolio / LinkedIn (Optional)
                  </label>
                  <input
                    name="portfolioUrl" onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <Code size={14} className="text-cyan-400" /> Core Competencies
                </label>
                <input
                  required name="skills" onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
                  placeholder="React, Python, AI/ML, Product Management, UI/UX Design..."
                />
                <p className="text-gray-500 text-xs mt-1">Separate skills with commas</p>
              </div>

              {/* Experience */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <Briefcase size={14} className="text-cyan-400" /> Professional Experience
                </label>
                <textarea
                  name="experience" onChange={handleChange} rows="4"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all resize-none"
                  placeholder="Tell us about your background, key achievements, and what makes you unique..."
                />
              </div>

              {/* Resume Upload */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <FileText size={14} className="text-cyan-400" /> Resume / CV
                </label>
                <div className="relative group">
                  <input
                    required type="file" accept=".pdf" onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-full py-10 bg-white/5 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center group-hover:border-cyan-500/50 transition-all group-hover:bg-white/10">
                    <div className="w-14 h-14 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-3 group-hover:bg-cyan-500/20 transition-colors">
                      <Upload size={22} className="text-cyan-400" />
                    </div>
                    <span className="text-sm text-gray-400 group-hover:text-white font-medium">
                      {resume ? resume.name : 'Upload your resume (PDF only)'}
                    </span>
                    <span className="text-xs text-gray-500 mt-1">Max file size: 5MB</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit" disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Processing Application...
                  </>
                ) : (
                  <>
                    Submit Application <Send size={18} />
                  </>
                )}
              </button>

              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <Award size={14} className="text-gray-500" />
                  <span className="text-gray-500 text-xs">100% Secure</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-gray-600"></div>
                <div className="flex items-center gap-2">
                  <Shield size={14} className="text-gray-500" />
                  <span className="text-gray-500 text-xs">AI Encrypted</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-gray-600"></div>
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-gray-500" />
                  <span className="text-gray-500 text-xs">Instant Review</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apply;