import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Briefcase,
  Users, 
  Calendar, 
  FileText, 
  Settings, 
  LogOut,
  Menu,
  X,
  Sparkles
} from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin/dashboard' },
    { name: 'Jobs', icon: <Briefcase size={20} />, path: '/admin/jobs' },
    { name: 'Candidates', icon: <Users size={20} />, path: '/admin/candidates' },
    { name: 'Interviews', icon: <Calendar size={20} />, path: '/admin/interviews' },
    { name: 'Offers', icon: <FileText size={20} />, path: '/admin/offers' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/admin/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#060e20] flex text-[#dae2fd] gradient-mesh">
      {/* Sidebar */}
      <aside className={`glass-card border-r-0 border-y-0 rounded-none transition-all duration-500 z-30 ${isSidebarOpen ? 'w-72' : 'w-24'}`}>
        <div className="p-8 flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center overflow-hidden shadow-lg shadow-indigo-500/20">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
          {isSidebarOpen && (
            <div className="flex flex-col">
              <span className="font-black text-white tracking-tighter text-xl">WAVE MIND</span>
              <span className="text-[10px] font-bold text-indigo-400 tracking-[0.3em] uppercase">Talent Hub</span>
            </div>
          )}
        </div>

        <nav className="mt-12 px-6 space-y-3">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group ${
                location.pathname === item.path 
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' 
                  : 'text-slate-500 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className={`${location.pathname === item.path ? 'text-indigo-400' : 'group-hover:text-indigo-400'} transition-colors`}>
                {item.icon}
              </span>
              {isSidebarOpen && <span className="font-bold tracking-wide text-sm">{item.name}</span>}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-10 left-0 right-0 px-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-4 text-slate-500 hover:text-red-400 transition-all group glass-card border-white/5"
          >
            <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
            {isSidebarOpen && <span className="font-bold text-sm">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-24 px-12 flex items-center justify-between z-20">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
              className="p-3 glass-card rounded-xl text-indigo-400 hover:scale-110 transition-all border-white/5"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="hidden md:flex items-center gap-2 px-4 py-1.5 glass-card border-indigo-500/20 rounded-full text-[10px] font-black text-indigo-400 uppercase tracking-widest">
              <Sparkles size={12} /> System Status: Operational
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black text-white">{user?.name}</p>
              <p className="text-[10px] font-bold text-indigo-400 tracking-widest uppercase">{user?.role}</p>
            </div>
            <div className="w-14 h-14 glass-card rounded-2xl flex items-center justify-center text-indigo-400 font-black text-xl border-indigo-500/30 shadow-lg shadow-indigo-500/10">
              {user?.name?.[0]}
            </div>
          </div>
        </header>

        <section className="p-12 overflow-auto relative">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="relative z-10">
            {children}
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardLayout;
