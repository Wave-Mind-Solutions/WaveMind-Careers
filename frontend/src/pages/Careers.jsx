import React, { useState, useEffect } from 'react';
import { getJobs } from '../api';
import { Briefcase, MapPin, DollarSign, Clock, ChevronRight, Sparkles, Zap, ArrowRight, Filter, Search, TrendingUp, Award, Users, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredJobs = jobs.filter(job => {
    const matchesType = filter === 'All' || job.type === filter;
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesType && matchesSearch;
  });

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
              <Link to="/careers" className="text-sm font-medium text-white transition-colors">Careers</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 pt-44 pb-20 px-6">
        <div className="max-w-7xl mx-auto">



          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search by role, location, or skill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
            </div>
            <div className="flex gap-3">
              {['All', 'Full-Time', 'Internship'].map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${filter === t
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-cyan-500/30'
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="relative z-10 px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32">
              <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-400 font-medium">Loading opportunities...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-32">
              <div className="w-24 h-24 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-4">
                <Briefcase size={40} className="text-gray-600" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No positions found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <div key={job._id} className="group relative bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-500 hover:-translate-y-2">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${job.type === 'Full-Time'
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                        : 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                        }`}>
                        {job.type}
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors">
                        <Briefcase size={18} className="text-gray-500 group-hover:text-cyan-400 transition-colors" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                      {job.title}
                    </h3>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {job.skills?.slice(0, 3).map(skill => (
                        <span key={skill} className="px-2 py-0.5 bg-white/5 rounded-md text-[10px] font-medium text-gray-400 border border-white/5">
                          {skill}
                        </span>
                      ))}
                      {job.skills?.length > 3 && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-medium text-gray-500">
                          +{job.skills.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Details */}
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <MapPin size={14} className="text-cyan-400" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <DollarSign size={14} className="text-cyan-400" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Clock size={14} className="text-cyan-400" />
                        <span>Immediate</span>
                      </div>
                    </div>

                    {/* Apply Button */}
                    <Link
                      to={`/apply/${job._id}?role=${job.title}`}
                      className="w-full flex items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-xl py-3 font-bold text-sm text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:border-transparent transition-all group-hover:shadow-lg group-hover:shadow-cyan-500/25"
                    >
                      Apply Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>




      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-black">
                  W
                </div>
                <span className="font-black text-white text-lg">WAVEMIND</span>
              </div>
              <p className="text-gray-500 text-sm">AI-powered recruitment platform for modern teams.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Pricing</a></li>
                <li><Link to="/careers" className="hover:text-cyan-400 transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms</a></li>
                <li><Link to="/login" className="hover:text-cyan-400 transition-colors">Admin Login</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 text-center text-gray-500 text-sm border-t border-white/5">
            © 2026 Wave Mind Solutions. Built for the future of work.
          </div>
        </div>
      </footer>
    </div>
  );
};

// Helper component for globe icon
const GlobeIcon = ({ size, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export default Careers;