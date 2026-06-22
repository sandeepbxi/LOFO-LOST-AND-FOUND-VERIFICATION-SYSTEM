import React, { useState } from 'react';
import useStore from '../store/useStore';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import api from '../utils/api';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

export default function Report() {
  const [type, setType] = useState('lost'); // 'lost' or 'found'
  const [category, setCategory] = useState('Personal Electronics');
  const [color, setColor] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  const { addToast } = useStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!color || !description || !date || !location) {
      addToast('Please fill out all fields', 'error');
      return;
    }
    
    setLoading(true);
    try {
      await api.post('/items/report', {
        category,
        color,
        description: `${description} | Location: ${location} | Date: ${date}`,
        type
      });
      
      addToast(`${type === 'lost' ? 'Lost' : 'Found'} report submitted successfully!`, 'success');
      navigate('/dashboard');
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to submit report', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-body-md text-on-background bg-[#f7f9fb] min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        {/* Main Content Canvas */}
        <main className="flex-1 p-gutter md:p-xl">
          <header className="mb-lg max-w-4xl">
            <h2 className="font-display-lg text-display-lg text-[#111111] mb-2 uppercase tracking-tighter text-5xl">REPORT ITEM</h2>
            <div className="h-2 w-32 bg-[#B11226] mb-gutter"></div>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Initialize a new secure record in the LOFO proof system. Precision in visual evidence is mandatory for claim verification.</p>
          </header>

          <div className="max-w-4xl bg-white border-2 border-[#111111] p-margin md:p-gutter relative">
            {/* Hard Shadow Effect */}
            <div className="absolute -right-2 -bottom-2 w-full h-full bg-[#111111] -z-10"></div>
            <form className="space-y-gutter" onSubmit={handleSubmit}>
              {/* Lost/Found Toggle */}
              <div className="grid grid-cols-2 gap-4">
                <button 
                  className={`border-2 border-[#111111] py-4 px-6 flex items-center justify-center gap-2 font-label-bold text-label-bold transition-colors ${type === 'lost' ? 'bg-[#B11226] text-white hover:opacity-90' : 'text-[#111111] hover:bg-slate-50'}`}
                  type="button"
                  onClick={() => setType('lost')}
                >
                  <span className="material-symbols-outlined">search_off</span>
                  I LOST SOMETHING
                </button>
                <button 
                  className={`border-2 border-[#111111] py-4 px-6 flex items-center justify-center gap-2 font-label-bold text-label-bold transition-colors ${type === 'found' ? 'bg-[#B11226] text-white hover:opacity-90' : 'text-[#111111] hover:bg-slate-50'}`}
                  type="button"
                  onClick={() => setType('found')}
                >
                  <span className="material-symbols-outlined">fact_check</span>
                  I FOUND SOMETHING
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                {/* Category Field */}
                <div className="space-y-xs mt-4">
                  <label className="font-label-bold text-label-bold text-[#111111] uppercase tracking-wider block">Category</label>
                  <select 
                    className="w-full border-2 border-[#111111] p-4 font-body-md text-body-md focus:ring-0 focus:border-[#B11226] appearance-none bg-white outline-none"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>Personal Electronics</option>
                    <option>Wallet / Identity</option>
                    <option>Keys / Security</option>
                    <option>Jewelry / Valuables</option>
                    <option>Bags / Luggage</option>
                    <option>Other</option>
                  </select>
                </div>
                {/* Color Field */}
                <div className="space-y-xs mt-4">
                  <label className="font-label-bold text-label-bold text-[#111111] uppercase tracking-wider block">Primary Color</label>
                  <input 
                    className="w-full border-2 border-[#111111] p-4 font-body-md text-body-md focus:ring-0 focus:border-[#B11226] outline-none" 
                    placeholder="e.g. Matte Black, Deep Red" 
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  />
                </div>
              </div>

              {/* Description Field */}
              <div className="space-y-xs mt-4">
                <label className="font-label-bold text-label-bold text-[#111111] uppercase tracking-wider block">Detailed Description</label>
                <textarea 
                  className="w-full border-2 border-[#111111] p-4 font-body-md text-body-md focus:ring-0 focus:border-[#B11226] resize-none outline-none" 
                  placeholder="Include serial numbers, unique markings, or specific damage..." 
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              {/* Visual Evidence Upload */}
              <div className="space-y-xs mt-4">
                <label className="font-label-bold text-label-bold text-[#111111] uppercase tracking-wider block">Visual Evidence</label>
                <div className="border-2 border-dashed border-[#111111] p-xl bg-slate-50 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-slate-100 transition-colors relative">
                  <span className="material-symbols-outlined text-4xl mb-4 text-[#111111]">cloud_upload</span>
                  <p className="font-headline-md text-headline-md text-[#111111] mb-2 uppercase text-2xl">Drop evidence files</p>
                  <p className="font-label-bold text-label-bold text-slate-500 uppercase">High resolution JPEG or PNG only (Max 10MB)</p>
                  <input className="absolute inset-0 opacity-0 cursor-pointer" type="file" />
                </div>
              </div>

              {/* Additional Details Bento Area */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mt-4">
                <div className="border-2 border-[#111111] p-4 bg-surface-container-low">
                  <label className="font-label-bold text-label-bold text-[#111111] uppercase mb-2 block">Date {type === 'lost' ? 'Lost' : 'Found'}</label>
                  <input 
                    className="w-full border-0 bg-transparent p-0 font-body-md focus:ring-0 outline-none" 
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="md:col-span-2 border-2 border-[#111111] p-4 bg-surface-container-low">
                  <label className="font-label-bold text-label-bold text-[#111111] uppercase mb-2 block">Last Known Location</label>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#B11226]">location_on</span>
                    <input 
                      className="w-full border-0 bg-transparent p-0 font-body-md focus:ring-0 outline-none" 
                      placeholder="Enter building, floor, or cross-streets" 
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-gutter mt-8">
                <button 
                  className="w-full bg-[#B11226] text-white py-6 font-display-xl text-headline-lg text-2xl font-black uppercase tracking-tighter hover:bg-[#111111] transition-all duration-300 transform active:translate-y-1 disabled:opacity-50" 
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'SUBMITTING...' : 'SUBMIT REPORT'}
                </button>
                <p className="mt-4 text-center font-label-bold text-label-bold text-slate-400 uppercase tracking-widest text-xs">Digital fingerprint will be generated upon submission</p>
              </div>
            </form>
          </div>

          {/* Contextual Info Section */}
          <div className="mt-xl grid grid-cols-1 md:grid-cols-2 gap-gutter max-w-4xl mt-16">
            <div className="p-gutter border-2 border-[#111111] bg-white relative p-6">
              <div className="absolute -right-2 -bottom-2 w-full h-full bg-[#B11226] -z-10 border-2 border-[#111111]"></div>
              <span className="material-symbols-outlined text-[#B11226] text-4xl mb-4">shield</span>
              <h4 className="font-headline-md text-headline-md text-[#111111] text-xl uppercase mb-2">SECURE STORAGE</h4>
              <p className="font-body-md text-body-md text-on-surface-variant">Your report is encrypted and matched against our global database using proprietary visual recognition algorithms.</p>
            </div>
            <div className="p-gutter border-2 border-[#111111] bg-white relative p-6">
              <div className="absolute -right-2 -bottom-2 w-full h-full bg-[#111111] -z-10 border-2 border-[#111111]"></div>
              <span className="material-symbols-outlined text-[#B11226] text-4xl mb-4">gavel</span>
              <h4 className="font-headline-md text-headline-md text-[#111111] text-xl uppercase mb-2">PROOF OF OWNER</h4>
              <p className="font-body-md text-body-md text-on-surface-variant">Claims are strictly verified. Ensure your description contains details only the owner would know to speed up recovery.</p>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
