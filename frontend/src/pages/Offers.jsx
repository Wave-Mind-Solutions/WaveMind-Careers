import React, { useState, useEffect, useRef } from 'react';
import { getCandidates, updateCandidateStatus, getSettings } from '../api';
import {
  FileText, Download, Send, Loader2, User, Briefcase,
  CheckCircle, AlertCircle, Printer, Eye, ChevronRight
} from 'lucide-react';
import OfferLetter from './OfferLetter';

// ── Print / PDF Export helper ─────────────────────────────────────────────────
const printOfferLetter = (ref) => {
  if (!ref?.current) return;
  const printWindow = window.open('', '_blank', 'width=900,height=1100');
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Internship Offer Letter – WaveMind Solutions</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { background: #fff; }
          @page { size: A4; margin: 0; }
          @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
        </style>
      </head>
      <body>
        ${ref.current.outerHTML}
      </body>
    </html>
  `);
  printWindow.document.close();
  setTimeout(() => { printWindow.focus(); printWindow.print(); }, 500);
};

// ── Main Offers Page ──────────────────────────────────────────────────────────
const Offers = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [offerDetails, setOfferDetails] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [toast, setToast] = useState(null);
  const letterRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const fetchData = async () => {
    try {
      const [candidatesRes, settingsRes] = await Promise.all([
        getCandidates({ status: 'Selected' }),
        getSettings().catch(() => ({ data: {} })),
      ]);
      setCandidates(candidatesRes.data?.candidates || []);
      // Pre-fill offerDetails from settings if available
      const tmpl = settingsRes.data?.offerLetterTemplate;
      if (tmpl?.duration) setOfferDetails(d => ({ ...d, duration: tmpl.duration }));
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCandidate = (c) => {
    setSelectedCandidate(c);
    setShowPreview(false);
    setOfferDetails(prev => ({
      ...prev,
      role: c.roleApplied || 'Software Development Intern',
    }));
  };

  const handleSendEmail = async () => {
    if (!selectedCandidate) return;
    setIsSending(true);
    try {
      await updateCandidateStatus(selectedCandidate._id, {
        status: 'Offer Sent',
        offerContent: `Internship Offer Letter for ${selectedCandidate.name} — Role: ${offerDetails.role || selectedCandidate.roleApplied}`,
        comment: 'Offer letter generated and sent via dashboard.',
      });
      setToast({ type: 'success', message: `Offer letter sent to ${selectedCandidate.email}` });
      setCandidates(curr => curr.filter(c => c._id !== selectedCandidate._id));
      setSelectedCandidate(null);
      setShowPreview(false);
    } catch (err) {
      setToast({ type: 'error', message: 'Failed to send offer letter. Please try again.' });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-[200] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border font-bold text-sm animate-in slide-in-from-top-3 duration-300 ${
          toast.type === 'success'
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
            : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
        }`}>
          {toast.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          {toast.message}
        </div>
      )}

      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-black text-white tracking-tight">
          Offer <span className="gradient-text">Generator</span>
        </h1>
        <p className="text-slate-500 font-medium mt-1">
          Create and dispatch professional internship offer letters.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-10 items-start">
        {/* ── LEFT PANEL: Candidate List ──────────────────────────────── */}
        <div className="space-y-5">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Selected Talent</h3>
            <span className="px-2 py-0.5 bg-indigo-500/10 rounded-md text-[10px] font-black text-indigo-400">{candidates.length}</span>
          </div>

          {loading ? (
            <div className="p-10 text-center text-slate-500 font-bold animate-pulse text-sm">Syncing talent...</div>
          ) : candidates.length === 0 ? (
            <div className="p-8 glass-card rounded-3xl border-white/5 text-center">
              <User size={32} className="mx-auto text-slate-700 mb-3" />
              <p className="text-slate-500 text-sm font-medium">No candidates marked as <span className="text-emerald-400 font-bold">Selected</span> yet.</p>
            </div>
          ) : candidates.map(c => (
            <button
              key={c._id}
              onClick={() => handleSelectCandidate(c)}
              className={`w-full p-5 rounded-[1.5rem] border transition-all text-left group ${
                selectedCandidate?._id === c._id
                  ? 'bg-indigo-600 border-indigo-400 shadow-xl shadow-indigo-500/20 scale-[1.02]'
                  : 'bg-white/5 border-white/5 hover:border-indigo-500/30 hover:bg-white/[0.07]'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-lg transition-colors ${
                  selectedCandidate?._id === c._id ? 'bg-white text-indigo-600' : 'bg-white/10 text-slate-400'
                }`}>
                  {c.name?.[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-black truncate ${selectedCandidate?._id === c._id ? 'text-white' : 'text-slate-300'}`}>{c.name}</p>
                  <p className={`text-xs truncate flex items-center gap-1 mt-0.5 ${selectedCandidate?._id === c._id ? 'text-indigo-200' : 'text-slate-500'}`}>
                    <Briefcase size={10} />{c.roleApplied || 'Role'}
                  </p>
                </div>
                <ChevronRight size={16} className={`shrink-0 transition-transform group-hover:translate-x-0.5 ${selectedCandidate?._id === c._id ? 'text-indigo-300' : 'text-slate-600'}`} />
              </div>
            </button>
          ))}
        </div>

        {/* ── RIGHT PANEL ─────────────────────────────────────────────── */}
        <div className="lg:col-span-2">
          {!selectedCandidate ? (
            /* Empty state */
            <div className="h-full flex flex-col items-center justify-center glass-card border-2 border-dashed border-white/10 rounded-[3rem] text-slate-600 py-32 space-y-6">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
                <FileText size={40} strokeWidth={1} className="text-slate-700" />
              </div>
              <div className="text-center space-y-1">
                <p className="text-lg font-black text-slate-400">Ready to Generate</p>
                <p className="text-sm font-medium text-slate-600 max-w-xs">Select a candidate from the left panel to preview and send their offer letter.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in duration-400">
              {/* Control Bar */}
              <div className="glass-card rounded-2xl border-white/5 p-5 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-white font-black text-sm">Offer for <span className="text-indigo-400">{selectedCandidate.name}</span></p>
                  <p className="text-slate-500 text-xs mt-0.5">{selectedCandidate.email}</p>
                </div>
                <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={() => setShowPreview(p => !p)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-all"
                  >
                    <Eye size={14} /> {showPreview ? 'Hide' : 'Preview'}
                  </button>
                  <button
                    onClick={() => printOfferLetter(letterRef)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-all"
                  >
                    <Printer size={14} /> Print / PDF
                  </button>
                  <button
                    onClick={handleSendEmail}
                    disabled={isSending}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest bg-indigo-600 text-white hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50"
                  >
                    {isSending ? <><Loader2 size={14} className="animate-spin" /> Sending...</> : <><Send size={14} /> Send Email</>}
                  </button>
                </div>
              </div>

              {/* Offer Details Config */}
              <div className="glass-card rounded-2xl border-white/5 p-6">
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">Offer Details</p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Role / Designation', key: 'role', placeholder: 'Software Development Intern' },
                    { label: 'Duration', key: 'duration', placeholder: '3 Months' },
                    { label: 'Start Date', key: 'startDate', placeholder: 'e.g. 1st July 2026' },
                    { label: 'Mode', key: 'mode', placeholder: 'Remote / On-site / Hybrid' },
                    { label: 'Stipend', key: 'stipend', placeholder: 'Unpaid (Learning-Based)' },
                    { label: 'Founder Name', key: 'founderName', placeholder: 'Harshit Tripathi' },
                  ].map(({ label, key, placeholder }) => (
                    <div key={key} className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</label>
                      <input
                        type="text"
                        placeholder={placeholder}
                        value={offerDetails[key] || ''}
                        onChange={e => setOfferDetails(d => ({ ...d, [key]: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Offer Letter Preview */}
              {showPreview && (
                <div className="rounded-2xl overflow-auto border border-white/10 shadow-2xl" style={{ background: '#f3f4f6', padding: '24px' }}>
                  <OfferLetter
                    ref={letterRef}
                    candidate={selectedCandidate}
                    offerDetails={offerDetails}
                  />
                </div>
              )}

              {/* Hidden render for print (always in DOM) */}
              {!showPreview && (
                <div style={{ position: 'absolute', left: '-9999px', top: 0, pointerEvents: 'none' }}>
                  <OfferLetter
                    ref={letterRef}
                    candidate={selectedCandidate}
                    offerDetails={offerDetails}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Offers;
