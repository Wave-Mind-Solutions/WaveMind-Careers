import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ChevronRight,
  Zap,
  ShieldCheck,
  BarChart3,
  ArrowRight,
  MousePointer2,
  Star,
  Rocket,
  Users,
  Globe,
  Briefcase,
  Target,
  CheckCircle2,
  TrendingUp,
  Award,
  Clock
} from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-black selection:bg-cyan-500/30 overflow-x-hidden">

      {/* Animated Background Grid */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:80px_80px]"></div>
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-cyan-500/20 blur-[150px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/20 blur-[130px] rounded-full animate-pulse delay-1000"></div>
      </div>

      {/* Navigation - Neo Brutalist Style */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden shadow-lg shadow-cyan-500/30 rotate-3">
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -inset-1 bg-cyan-500/20 blur-xl rounded-full -z-10"></div>
              </div>
              <span className="font-black text-white tracking-tighter text-xl">WAVEMIND</span>
            </div>


            <div className="flex items-center gap-4">
              <Link to="/careers" className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all hover:scale-105 active:scale-95">
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Cyberpunk Style */}
      <section className="relative pt-44 pb-28 px-6 z-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-8 backdrop-blur-sm">
            <Sparkles size={14} className="animate-pulse" />
            <span>THE FUTURE OF HIRING IS HERE</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[1.1]">
            Find Talent
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              at Light Speed
            </span>
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed mb-12">
            Wave Mind uses next-gen AI to automate your hiring pipeline. Source, screen, and hire top talent with intelligent automation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link to="/careers" className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold uppercase tracking-wide overflow-hidden transition-all hover:shadow-xl hover:shadow-cyan-500/30 hover:scale-105">
              <span className="relative z-10 flex items-center gap-2">
                Find Your Role <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link to="/login" className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-xl font-bold uppercase tracking-wide hover:bg-white/10 transition-all">
              Launch Dashboard
            </Link>
          </div>

          {/* Floating Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-20">
            {[
              { value: '98%', label: 'Faster Hiring', icon: <Clock size={18} className="text-cyan-400" /> },
              { value: '15k+', label: 'Talent Pool', icon: <Users size={18} className="text-cyan-400" /> },
              { value: '4.9', label: 'User Rating', icon: <Star size={18} className="text-cyan-400" /> }
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full border border-white/5">
                {stat.icon}
                <div>
                  <span className="text-white font-bold">{stat.value}</span>
                  <span className="text-gray-400 text-sm ml-1">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid - Glassmorphism Style */}
      <section id="features" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
              Supercharged <span className="text-cyan-400">Features</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Everything you need to build a world-class team, powered by AI.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Zap size={28} />,
                title: "Cognitive ATS",
                desc: "AI-powered candidate ranking based on skills, experience, and cultural fit.",
                color: "from-cyan-500/20 to-blue-500/20",
                iconColor: "text-cyan-400"
              },
              {
                icon: <ShieldCheck size={28} />,
                title: "Smart Interviews",
                desc: "Automated scheduling with intelligent feedback collection and scoring.",
                color: "from-blue-500/20 to-indigo-500/20",
                iconColor: "text-blue-400"
              },
              {
                icon: <BarChart3 size={28} />,
                title: "Analytics Hub",
                desc: "Real-time metrics on hiring velocity, source effectiveness, and quality.",
                color: "from-indigo-500/20 to-purple-500/20",
                iconColor: "text-indigo-400"
              }
            ].map((f, i) => (
              <div key={i} className="group relative p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all duration-500 hover:-translate-y-2">
                <div className={`absolute inset-0 bg-gradient-to-br ${f.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-6 ${f.iconColor} group-hover:scale-110 transition-transform duration-500`}>
                    {f.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Timeline Style */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
              How It <span className="text-cyan-400">Works</span>
            </h2>
            <p className="text-gray-400">Three simple steps to smarter hiring</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Post & Source', desc: 'Create your job posting and let AI source the best candidates from our talent network.', icon: <Briefcase size={24} /> },
              { step: '02', title: 'AI Screening', desc: 'Our system automatically screens, ranks, and schedules interviews with top matches.', icon: <Target size={24} /> },
              { step: '03', title: 'Hire & Onboard', desc: 'Generate offer letters, collect signatures, and onboard new hires with one click.', icon: <CheckCircle2 size={24} /> }
            ].map((item, i) => (
              <div key={i} className="relative">
                {i < 2 && <div className="hidden md:block absolute top-16 left-full w-full h-[2px] bg-gradient-to-r from-cyan-500/30 to-transparent"></div>}
                <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-black text-2xl mb-6">
                    {item.icon}
                  </div>
                  <div className="text-sm font-bold text-cyan-400 mb-2 tracking-wider">{item.step}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Bold Numbers */}
      <section id="stats" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { value: '10x', label: 'Faster Screening', trend: '+340%' },
              { value: '86%', label: 'Better Matches', trend: '+56%' },
              { value: '24/7', label: 'AI Operation', trend: 'Always On' },
              { value: '0%', label: 'Bias Rate', trend: 'Certified Fair' }
            ].map((stat, i) => (
              <div key={i} className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl p-8 text-center hover:border-cyan-500/30 transition-all">
                <div className="text-5xl font-black text-white mb-2 tracking-tighter">{stat.value}</div>
                <div className="text-gray-400 font-medium mb-2">{stat.label}</div>
                <div className="text-xs font-bold text-cyan-400 tracking-wider">{stat.trend}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Gradient Style */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-purple-600/20 border border-white/10 p-12 text-center backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/30 blur-3xl rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/30 blur-3xl rounded-full"></div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter">
                Ready to Transform Your Hiring?
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto mb-10">
                Join hundreds of companies using Wave Mind to build amazing teams faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/careers" className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-white hover:shadow-xl hover:shadow-cyan-500/30 transition-all">
                  View Open Positions
                </Link>
                <Link to="/login" className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-bold text-white hover:bg-white/20 transition-all">
                  Talk to Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Minimal Dark */}
      <footer id="footer" className="py-16 px-6 border-t border-white/5 relative z-10">
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

export default Home;