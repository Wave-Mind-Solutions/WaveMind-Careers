import React, { useState } from 'react';
import { FileText, Wand2, Download, Send, CheckCircle } from 'lucide-react';

const Offers = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [preview, setPreview] = useState('');

  const candidates = [
    { id: 1, name: 'Rahul Sharma', role: 'Full Stack Intern', salary: '₹20,000' },
    { id: 2, name: 'Sneha Kapur', role: 'UI Designer', salary: '₹85,000' }
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setPreview(`
        OFFER LETTER
        
        Dear ${selectedCandidate.name},
        
        We are pleased to offer you the position of ${selectedCandidate.role} at Wave Mind. 
        We were impressed with your skills and believe you will be a great addition to our team.
        
        Position: ${selectedCandidate.role}
        Stipend/Salary: ${selectedCandidate.salary}
        Joining Date: 15th May 2026
        
        We look forward to working with you.
      `);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">AI Offer Letter System</h1>
        <p className="text-slate-500">Generate professional offer letters dynamically based on candidate role.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="space-y-4">
          <h3 className="font-bold text-slate-700 uppercase text-xs tracking-widest">Select Candidate</h3>
          {candidates.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCandidate(c)}
              className={`w-full p-4 rounded-2xl border text-left transition-all ${
                selectedCandidate?.id === c.id 
                  ? 'bg-primary-50 border-primary-500 ring-2 ring-primary-100 shadow-lg' 
                  : 'bg-white border-slate-100 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500">
                  {c.name[0]}
                </div>
                <div>
                  <p className="font-bold text-slate-800">{c.name}</p>
                  <p className="text-xs text-slate-500">{c.role}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-2">
          {selectedCandidate ? (
            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden min-h-[500px] flex flex-col">
              <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-700">
                  <FileText size={18} />
                  <span className="font-bold">Preview: Offer Letter</span>
                </div>
                {!preview && (
                  <button 
                    onClick={handleGenerate} disabled={isGenerating}
                    className="bg-primary-600 text-white px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary-700 transition-all disabled:opacity-50"
                  >
                    {isGenerating ? 'Generating...' : <><Wand2 size={16} /> Generate AI Offer</>}
                  </button>
                )}
              </div>

              <div className="flex-1 p-10 font-serif text-slate-700 whitespace-pre-line leading-relaxed">
                {preview || (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                    <Wand2 size={40} className="opacity-20" />
                    <p>Click generate to create an offer letter for {selectedCandidate.name}</p>
                  </div>
                )}
              </div>

              {preview && (
                <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-4">
                  <button className="flex-1 bg-white border border-slate-200 text-slate-700 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-100 transition-all">
                    <Download size={18} /> Download PDF
                  </button>
                  <button className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all">
                    <Send size={18} /> Send via Email
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 py-20">
              <FileText size={48} className="opacity-20 mb-4" />
              <p className="font-medium">Please select a candidate to start generating an offer</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Offers;
