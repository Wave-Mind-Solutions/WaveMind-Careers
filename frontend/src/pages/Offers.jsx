import React, { useState, useEffect } from 'react';
import { getCandidates, updateCandidateStatus, getSettings } from '../api';
import { FileText, Wand2, Download, Send, CheckCircle, Search, Mail, Loader2 } from 'lucide-react';

const Offers = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSelectedCandidates();
  }, []);

  const fetchSelectedCandidates = async () => {
    try {
      const { data } = await getCandidates({ status: 'Selected' });
      setCandidates(data.candidates || []);
    } catch (error) {
      console.error('Error fetching selected candidates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const { data: settings } = await getSettings();
      const templateContent = settings?.offerLetterTemplate?.content;

      if (templateContent) {
        // Use the custom template from settings
        const generated = templateContent
          .replace(/{{name}}/g, selectedCandidate.name)
          .replace(/{{role}}/g, selectedCandidate.roleApplied || 'the role you applied for')
          .replace(/{{date}}/g, new Date().toLocaleDateString())
          .replace(/{{current_date}}/g, new Date().toLocaleDateString());
        setPreview(generated);
      } else {
        // Fallback to default if no template is set
        setPreview(`
OFFER LETTER

Date: ${new Date().toLocaleDateString()}

Dear ${selectedCandidate.name},

Following our recent interviews and evaluations, we are delighted to offer you the position of ${selectedCandidate.roleApplied || 'the role you applied for'} at Wave Mind. We were very impressed with your background and skills, and we believe you will be a valuable addition to our team.

Position: ${selectedCandidate.roleApplied || 'N/A'}
Type: ${selectedCandidate.roleType || 'Full-Time'}
Location: Remote / As discussed

Your joining date will be communicated shortly after your acceptance. We are excited about the possibility of you joining us and contributing to our collective success.

Best regards,
The Recruitment Team
Wave Mind Solutions
        `);
      }
    } catch (error) {
      console.error('Error fetching settings for template:', error);
      alert('Failed to load offer letter template');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendEmail = async () => {
    if (!selectedCandidate) return;
    setIsSending(true);
    try {
      // Update status to 'Offer Sent' which triggers the email in backend
      await updateCandidateStatus(selectedCandidate._id, { 
        status: 'Offer Sent',
        offerContent: preview, // Send the generated content
        comment: 'Offer letter generated and sent via dashboard.' 
      });
      alert('Offer letter sent successfully to ' + selectedCandidate.email);
      setPreview('');
      setSelectedCandidate(null);
      fetchSelectedCandidates();
    } catch (error) {
      alert('Failed to send offer letter');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-black text-white tracking-tight">Offer <span className="gradient-text">Generator</span></h1>
        <p className="text-slate-500 font-medium">Create and distribute professional offer letters to selected talent.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Selected Talent</h3>
            <span className="px-2 py-0.5 bg-indigo-500/10 rounded-md text-[10px] font-black text-indigo-400">{candidates.length}</span>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="p-10 text-center text-slate-500 font-bold animate-pulse">Syncing selected talent...</div>
            ) : candidates.length === 0 ? (
              <div className="p-10 glass-card rounded-3xl border-white/5 text-center text-slate-500 font-medium text-sm italic">
                No candidates are currently marked as 'Selected'.
              </div>
            ) : candidates.map(c => (
              <button
                key={c._id}
                onClick={() => { setSelectedCandidate(c); setPreview(''); }}
                className={`w-full p-6 rounded-[2rem] border transition-all text-left group ${
                  selectedCandidate?._id === c._id 
                    ? 'bg-indigo-600 border-indigo-400 shadow-xl shadow-indigo-500/20 scale-[1.02]' 
                    : 'bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/[0.07]'
                }`}
              >
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl transition-colors ${
                    selectedCandidate?._id === c._id ? 'bg-white text-indigo-600' : 'bg-white/10 text-slate-400 group-hover:text-white'
                  }`}>
                    {c.name[0]}
                  </div>
                  <div>
                    <p className={`font-black tracking-tight ${selectedCandidate?._id === c._id ? 'text-white' : 'text-slate-300'}`}>{c.name}</p>
                    <p className={`text-xs font-medium ${selectedCandidate?._id === c._id ? 'text-indigo-200' : 'text-slate-500'}`}>{c.roleApplied}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedCandidate ? (
            <div className="glass-card rounded-[3rem] border-white/5 overflow-hidden min-h-[650px] flex flex-col animate-in fade-in slide-in-from-bottom-5 duration-500">
              <div className="p-8 border-b border-white/5 bg-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
                    <FileText size={20} />
                  </div>
                  <div>
                    <span className="block text-white font-black tracking-tight uppercase text-sm">Preview: Official Offer</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Candidate: {selectedCandidate.name}</span>
                  </div>
                </div>
                {!preview && (
                  <button 
                    onClick={handleGenerate} disabled={isGenerating}
                    className="bg-white text-indigo-950 px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-indigo-400 hover:text-white transition-all disabled:opacity-50"
                  >
                    {isGenerating ? <><Loader2 size={16} className="animate-spin" /> Analyzing...</> : <><Wand2 size={16} /> Generate AI Offer</>}
                  </button>
                )}
              </div>

              <div className="flex-1 p-12 md:p-16 font-serif text-slate-300 whitespace-pre-line leading-loose text-sm overflow-y-auto max-h-[500px]">
                {preview || (
                  <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-6 opacity-40 italic">
                    <Wand2 size={64} strokeWidth={1} />
                    <p className="text-center max-w-xs font-medium">Configure and click generate to create a bespoke offer letter for this candidate.</p>
                  </div>
                )}
              </div>

              {preview && (
                <div className="p-8 bg-white/5 border-t border-white/5 flex flex-col sm:flex-row gap-6">
                  <button className="flex-1 bg-white/5 border border-white/10 text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/10 transition-all">
                    <Download size={20} /> Local Export (PDF)
                  </button>
                  <button 
                    onClick={handleSendEmail}
                    disabled={isSending}
                    className="flex-1 bg-indigo-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/20 disabled:opacity-50"
                  >
                    {isSending ? <><Loader2 size={20} className="animate-spin" /> Delivering...</> : <><Send size={20} /> Send via Official Email</>}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center glass-card border-2 border-dashed border-white/10 rounded-[3rem] text-slate-600 py-32 space-y-8">
              <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center text-slate-700">
                <FileText size={48} strokeWidth={1} />
              </div>
              <div className="text-center space-y-2">
                <p className="text-xl font-black text-slate-400">Decision Gateway Ready</p>
                <p className="text-sm font-medium text-slate-600">Please select a talent from the pipeline to begin the offer generation workflow.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Offers;
