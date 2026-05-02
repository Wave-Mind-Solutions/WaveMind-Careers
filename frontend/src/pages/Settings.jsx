import React, { useState, useEffect } from 'react';
import { getSettings, updateSettings } from '../api';
import { Save, Mail, Shield, Bell, Briefcase, Sparkles, CheckCircle } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('email');
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data } = await getSettings();
      setSettings(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSettings(settings);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      alert('Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'email', name: 'Templates', icon: <Mail size={18} /> },
    { id: 'auth', name: 'Security', icon: <Shield size={18} /> },
    { id: 'notifications', name: 'System', icon: <Bell size={18} /> },
  ];

  if (loading) return <div className="flex justify-center py-20 animate-pulse text-indigo-400">Loading configurations...</div>;

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">System <span className="gradient-text">Settings</span></h1>
          <p className="text-slate-500 font-medium">Configure recruitment workflows and automation triggers.</p>
        </div>
        {showSuccess && (
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 text-xs font-bold animate-in fade-in slide-in-from-right-5">
            <CheckCircle size={16} /> Configuration Saved Successfully
          </div>
        )}
      </div>

      <div className="glass-card rounded-[2.5rem] border-white/5 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        {/* Tab Sidebar */}
        <div className="w-full md:w-72 bg-white/5 border-r border-white/5 p-8 space-y-3">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${
                activeTab === tab.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 scale-105' 
                  : 'text-slate-500 hover:bg-white/5 hover:text-white'
              }`}
            >
              {tab.icon} {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-12 relative">
          {activeTab === 'email' && (
            <div className="space-y-10 animate-in fade-in duration-500">
              <div className="flex items-center gap-3">
                <Mail size={24} className="text-indigo-400" />
                <h3 className="text-2xl font-black text-white tracking-tight">Email Templates</h3>
              </div>
              
              <div className="space-y-8">
                <div>
                  <label className="block text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">Application Confirmation Subject</label>
                  <input 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all" 
                    value={settings.emailTemplates.applicationConfirmation.subject}
                    onChange={(e) => setSettings({
                      ...settings, 
                      emailTemplates: {
                        ...settings.emailTemplates,
                        applicationConfirmation: { ...settings.emailTemplates.applicationConfirmation, subject: e.target.value }
                      }
                    })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">Application Confirmation Body</label>
                  <textarea 
                    rows="4"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-mono text-sm" 
                    value={settings.emailTemplates.applicationConfirmation.body}
                    onChange={(e) => setSettings({
                      ...settings, 
                      emailTemplates: {
                        ...settings.emailTemplates,
                        applicationConfirmation: { ...settings.emailTemplates.applicationConfirmation, body: e.target.value }
                      }
                    })}
                  />
                  <p className="text-[10px] text-slate-600 mt-2 font-bold italic">Variables: {'{{name}}'}, {'{{job_title}}'}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'auth' && (
            <div className="space-y-10 animate-in fade-in duration-500">
              <div className="flex items-center gap-3">
                <Shield size={24} className="text-violet-400" />
                <h3 className="text-2xl font-black text-white tracking-tight">Security & Auth</h3>
              </div>
              <div className="p-8 glass-card border-white/5 rounded-3xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-white font-black">Multi-Factor Authentication</p>
                    <p className="text-xs text-slate-500 font-medium">Add an extra layer of security to admin accounts.</p>
                  </div>
                  <div className="w-12 h-6 bg-slate-800 rounded-full relative">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-slate-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-10 animate-in fade-in duration-500">
              <div className="flex items-center gap-3">
                <Bell size={24} className="text-emerald-400" />
                <h3 className="text-2xl font-black text-white tracking-tight">System Notifications</h3>
              </div>
              <p className="text-slate-500 font-medium">Configure which events trigger internal alerts.</p>
            </div>
          )}

          {/* Save Button */}
          <div className="absolute bottom-12 right-12">
            <button 
              onClick={handleSave}
              disabled={saving}
              className="bg-white text-indigo-950 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-400 hover:text-white transition-all shadow-2xl shadow-indigo-500/20 flex items-center gap-3 disabled:opacity-50"
            >
              {saving ? 'Synchronizing...' : <><Save size={20} /> Save Configuration</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
