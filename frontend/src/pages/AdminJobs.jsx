import React, { useState, useEffect } from 'react';
import { getJobs, createJob, updateJob, deleteJob } from '../api';
import { Plus, Briefcase, MapPin, DollarSign, Trash2, Edit3, X, Zap } from 'lucide-react';

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skills: '',
    salary: '',
    location: '',
    type: 'Full-Time'
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data } = await getJobs();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleEdit = (job) => {
    setEditingId(job._id);
    setFormData({
      title: job.title,
      description: job.description,
      skills: job.skills.join(', '),
      salary: job.salary,
      location: job.location,
      type: job.type
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job listing?')) {
      try {
        await deleteJob(id);
        fetchJobs();
      } catch (error) {
        alert('Error deleting job');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const jobData = {
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim())
      };

      if (editingId) {
        await updateJob(editingId, jobData);
      } else {
        await createJob(jobData);
      }

      setIsModalOpen(false);
      setEditingId(null);
      fetchJobs();
      setFormData({ title: '', description: '', skills: '', salary: '', location: '', type: 'Full-Time' });
    } catch (error) {
      alert(editingId ? 'Error updating job' : 'Error creating job');
    }
  };

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({ title: '', description: '', skills: '', salary: '', location: '', type: 'Full-Time' });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">Manage <span className="gradient-text">Jobs</span></h1>
          <p className="text-slate-500 font-medium">Create and manage your active job listings.</p>
        </div>
        <button 
          onClick={openCreateModal}
          className="flex items-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-wide hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/20"
        >
          <Plus size={20} /> Post New Job
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {jobs.map((job) => (
          <div key={job._id} className="glass-card p-8 rounded-3xl border-white/5 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 blur-3xl -mr-16 -mt-16"></div>
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="bg-indigo-500/10 text-indigo-400 px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wide border border-indigo-500/20">
                {job.type}
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(job)}
                  className="p-2.5 glass-card rounded-xl text-slate-400 hover:text-indigo-400 hover:scale-110 transition-all border-white/5"
                  title="Edit Job"
                >
                  <Edit3 size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(job._id)}
                  className="p-2.5 glass-card rounded-xl text-slate-400 hover:text-rose-400 hover:scale-110 transition-all border-white/5"
                  title="Delete Job"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 relative z-10">{job.title}</h3>
            <p className="text-slate-500 text-sm mb-6 line-clamp-2 font-normal relative z-10">{job.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-8 relative z-10">
              {job.skills?.map(skill => (
                <span key={skill} className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold text-slate-500 border border-white/10 uppercase tracking-wide">
                  {skill}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-bold text-slate-500 uppercase tracking-wide relative z-10">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-indigo-500" /> {job.location}
              </div>
              <div className="flex items-center gap-2">
                <DollarSign size={14} className="text-indigo-500" /> {job.salary}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-8 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-indigo-950/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative glass-card w-full max-w-2xl rounded-[2.5rem] p-12 border-white/10 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold text-white tracking-tight">
                {editingId ? 'Edit' : 'Post New'} <span className="gradient-text">Job</span>
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-500 hover:text-white transition-colors"><X size={24} /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-indigo-400 uppercase tracking-wide mb-3">Job Title</label>
                  <input
                    required
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-medium"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-indigo-400 uppercase tracking-wide mb-3">Type</label>
                  <select
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all appearance-none font-medium"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  >
                    <option value="Full-Time" className="bg-[#0b1326]">Full-Time</option>
                    <option value="Internship" className="bg-[#0b1326]">Internship</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-indigo-400 uppercase tracking-wide mb-3">Description</label>
                <textarea
                  required
                  rows="3"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-medium"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-indigo-400 uppercase tracking-wide mb-3">Skills (comma separated)</label>
                <input
                  required
                  type="text"
                  placeholder="React, Node.js, MongoDB..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-medium"
                  value={formData.skills}
                  onChange={(e) => setFormData({...formData, skills: e.target.value})}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-indigo-400 uppercase tracking-wide mb-3">Salary Range</label>
                  <input
                    required
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-medium"
                    value={formData.salary}
                    onChange={(e) => setFormData({...formData, salary: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-indigo-400 uppercase tracking-wide mb-3">Location</label>
                  <input
                    required
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-medium"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-white text-indigo-950 py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-indigo-400 hover:text-white transition-all shadow-xl shadow-indigo-500/10 mt-4"
              >
                {editingId ? 'Update Listing' : 'Create Listing'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminJobs;
