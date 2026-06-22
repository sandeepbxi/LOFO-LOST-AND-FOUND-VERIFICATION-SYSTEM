import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import api from '../utils/api';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Verification() {
  const { id } = useParams();
  const { claims, addToast } = useStore();
  const navigate = useNavigate();

  const [serial, setSerial] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!serial || !purchaseDate || !description) {
      addToast('Please fill out all verification fields', 'error');
      return;
    }
    
    setLoading(true);
    try {
      // 1. Upload Text Evidence
      await api.post('/verification/evidence', {
        claim_id: id,
        evidence_type: 'Ownership Details',
        text_value: `Serial: ${serial} | Purchase Date: ${purchaseDate} | Description: ${description}`
      });

      // 2. Upload File if exists
      if (file) {
        const formData = new FormData();
        formData.append('claim_id', id);
        formData.append('evidence_type', 'Document/Image');
        formData.append('file', file);
        await api.post('/verification/evidence', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      // 3. Mark Step as Completed (Assume step ID is 1 for demo or fetched)
      // For this demo, we'll just add a new step and mark it
      await api.post('/verification/step', { claim_id: id, step_type: 'Ownership Proof' });
      
      addToast('Proof submitted successfully! Awaiting admin review.', 'success');
      navigate('/dashboard');
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to submit proof', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-body-md text-on-background bg-[#f7f9fb] min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        {/* Main Content Area */}
        <main className="flex-1 bg-background">
          {/* Verification Stepper & Content */}
          <div className="max-w-6xl mx-auto px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Rail: Progress & Status */}
              <div className="lg:col-span-4 flex flex-col gap-8">
                <div className="border-l-4 border-[#B11226] pl-6 py-2">
                  <h1 className="font-display-lg text-display-lg uppercase text-[#111111] leading-none text-5xl tracking-tighter">VERIFY<br/>IDENTITY</h1>
                  <p className="font-body-md text-body-md mt-4 text-secondary">Step-by-step verification protocol for lost item claims and reporting.</p>
                </div>

                {/* Progress Indicators */}
                <div className="flex flex-col gap-4 mt-8">
                  {/* Step 1 */}
                  <div className="bg-white p-6 border-l-8 border-[#B11226] flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 flex items-center justify-center bg-[#B11226] text-white font-black text-sm">01</div>
                      <div>
                        <div className="font-label-bold text-label-bold uppercase text-[#111111]">Describe Item</div>
                        <div className="text-[10px] font-bold text-[#B11226] uppercase">Completed</div>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-green-600" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-white p-6 border-l-8 border-[#B11226] flex items-center justify-between ring-2 ring-[#B11226] ring-inset">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 flex items-center justify-center bg-[#B11226] text-white font-black text-sm">02</div>
                      <div>
                        <div className="font-label-bold text-label-bold uppercase text-[#111111]">Upload Proof</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase">In Progress</div>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#B11226]">pending</span>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-slate-100 p-6 border-l-8 border-slate-300 flex items-center justify-between grayscale opacity-60">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 flex items-center justify-center bg-slate-300 text-white font-black text-sm">03</div>
                      <div>
                        <div className="font-label-bold text-label-bold uppercase text-[#111111]">Additional Verification</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase">Pending</div>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-slate-400">lock</span>
                  </div>
                </div>

                {/* Info Card */}
                <div className="bg-[#111111] p-8 text-white mt-4 relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="font-headline-md text-headline-md text-white uppercase italic leading-tight text-xl">WHY VERIFY?</h3>
                    <p className="text-sm mt-4 text-slate-400 font-bold uppercase tracking-tight">Our SECURE PROOF SYSTEMS ensure that lost items are returned to their rightful owners with 99.8% accuracy.</p>
                  </div>
                  <div className="absolute -right-4 -bottom-4 opacity-10">
                    <span className="material-symbols-outlined text-[120px]">security</span>
                  </div>
                </div>
              </div>

              {/* Right Rail: Input Form */}
              <div className="lg:col-span-8">
                <div className="bg-white p-8 md:p-12 border-2 border-[#111111] shadow-[12px_12px_0px_0px_#B11226]">
                  <div className="mb-12">
                    <span className="bg-[#B11226] text-white px-3 py-1 font-black text-[10px] uppercase tracking-[0.2em] mb-4 inline-block">Current Action</span>
                    <h2 className="font-headline-lg text-headline-lg text-4xl uppercase text-[#111111] font-black tracking-tighter">Upload Proof of Ownership</h2>
                    <p className="font-body-lg text-body-lg text-slate-500 mt-2">Submit high-resolution documentation or photos of the item before it was lost. Claim ID: #{id}</p>
                  </div>

                  <form className="space-y-10" onSubmit={handleSubmit}>
                    {/* File Upload Area */}
                    <div className="space-y-4">
                      <label className="font-label-bold text-label-bold uppercase text-[#111111] tracking-wider block">Documentation Image (JPEG/PNG)</label>
                      <div className="border-4 border-dashed border-slate-200 p-12 text-center hover:border-[#B11226] transition-colors cursor-pointer group bg-slate-50 relative">
                        <span className="material-symbols-outlined text-slate-300 text-6xl group-hover:text-[#B11226]">cloud_upload</span>
                        <div className="mt-4 font-headline-md text-[#111111] uppercase text-xl font-bold">{file ? file.name : 'Drag & Drop Files'}</div>
                        <div className="font-label-bold text-label-bold text-slate-400 uppercase mt-2">{file ? 'File selected' : 'or browse your system files'}</div>
                        <input className="absolute inset-0 opacity-0 cursor-pointer" type="file" onChange={(e) => setFile(e.target.files[0])} />
                      </div>
                    </div>

                    {/* Text Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="font-label-bold text-label-bold uppercase text-[#111111]">Serial Number / Unique ID</label>
                        <input 
                          className="w-full border-2 border-[#111111] p-4 font-bold focus:ring-0 focus:border-[#B11226] outline-none placeholder:text-slate-300" 
                          placeholder="E.G. SN-9982-AX" 
                          type="text"
                          value={serial}
                          onChange={(e) => setSerial(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="font-label-bold text-label-bold uppercase text-[#111111]">Purchase Date (Approx)</label>
                        <input 
                          className="w-full border-2 border-[#111111] p-4 font-bold focus:ring-0 focus:border-[#B11226] outline-none" 
                          type="date"
                          value={purchaseDate}
                          onChange={(e) => setPurchaseDate(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="font-label-bold text-label-bold uppercase text-[#111111]">Detailed Evidence Description</label>
                      <textarea 
                        className="w-full border-2 border-[#111111] p-4 font-bold focus:ring-0 focus:border-[#B11226] outline-none placeholder:text-slate-300 resize-none" 
                        placeholder="Describe distinct marks, internal repairs, or unique identifiers that prove ownership..." 
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>

                    {/* Checklist */}
                    <div className="bg-surface-container-low p-6 space-y-4">
                      <div className="flex items-start gap-3">
                        <input className="mt-1 w-5 h-5 rounded-none border-2 border-[#111111] text-[#B11226] focus:ring-[#B11226]" type="checkbox" required />
                        <label className="text-sm font-bold uppercase text-slate-600">I confirm that all uploaded documents are authentic and represent the item accurately.</label>
                      </div>
                      <div className="flex items-start gap-3">
                        <input className="mt-1 w-5 h-5 rounded-none border-2 border-[#111111] text-[#B11226] focus:ring-[#B11226]" type="checkbox" required />
                        <label className="text-sm font-bold uppercase text-slate-600">I agree to the LOFO secure proof verification terms of service and penalty for false reporting.</label>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col md:flex-row gap-4 pt-6">
                      <button 
                        className="flex-1 bg-[#111111] text-white py-6 font-black uppercase text-lg tracking-widest hover:bg-[#B11226] transition-colors flex items-center justify-center gap-3 disabled:opacity-50" 
                        type="submit"
                        disabled={loading}
                      >
                        <span>{loading ? 'SUBMITTING...' : 'Proceed to Next Step'}</span>
                        <span className="material-symbols-outlined">arrow_forward</span>
                      </button>
                      <button className="px-8 py-6 border-2 border-[#111111] font-black uppercase text-lg tracking-widest hover:bg-slate-100 transition-colors" type="button">
                        Save Draft
                      </button>
                    </div>
                  </form>
                </div>

                {/* Proof Grid (Asymmetric Bento) */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 relative h-64 overflow-hidden border-2 border-[#111111]">
                    <img alt="Identity Verification" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUtrmZdb-1wpgmEeIWRNfuuEuU_s8RDw-qTokFVkmeLfbaTcB012rLHmUrhETTNTWsFK4GZUkQl_QrVQ_3voz8sayyF6Jl1HBZTACPU1Ncc61Azmsw8D85ONFyESbVOUDfYKISKozZNrjZBp2lyKzQ7oW7wooD552Ttv-rTfvwpVJXjiWGXZtMORWh6hEXNlX2Zk7lFn11ml4kaagDvuJWGuUrAnakYtgWISarZYwW-UNAY7vziVerqJJI40L1cZXskYRrpfjmNgQ" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                      <span className="text-white font-black uppercase text-xs tracking-widest border-b-2 border-[#B11226]">Identity Match: 98% Confirmed</span>
                    </div>
                  </div>
                  <div className="bg-[#B11226] p-8 flex flex-col justify-center border-2 border-[#111111]">
                    <span className="material-symbols-outlined text-white text-5xl mb-4">policy</span>
                    <div className="text-white font-black uppercase text-xl leading-tight">Fraud Prevention Active</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
