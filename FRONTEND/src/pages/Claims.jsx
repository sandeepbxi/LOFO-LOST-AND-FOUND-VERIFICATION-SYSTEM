import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Claims() {
  const { claims, fetchClaims } = useStore();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  React.useEffect(() => {
    fetchClaims();
  }, []);

  const filteredClaims = claims.filter(c => 
    c.claim_id.toString().includes(searchTerm) || 
    c.claim_status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingCount = claims.filter(c => c.claim_status === 'Pending').length;
  const approvedCount = claims.filter(c => c.claim_status === 'Approved').length;

  return (
    <div className="font-body-md text-on-background bg-[#f7f9fb] min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        {/* Main Content */}
        <main className="flex-1 p-8 md:p-12 overflow-y-auto">
          {/* Header Section */}
          <header className="mb-12">
            <div className="flex justify-between items-end">
              <div>
                <span className="font-label-bold text-[#B11226] uppercase mb-2 block tracking-widest text-sm">Global Protocol</span>
                <h2 className="font-display-lg text-[#111111] uppercase leading-none text-5xl tracking-tighter">Claims Oversight</h2>
              </div>
              <div className="flex gap-4">
                <button className="bg-[#111111] text-white font-label-bold px-8 py-4 uppercase hard-shadow-red hover:-translate-y-1 transition-all">
                  Export Report
                </button>
                <button className="bg-[#B11226] text-white font-label-bold px-8 py-4 uppercase hard-shadow hover:-translate-y-1 transition-all">
                  New Review
                </button>
              </div>
            </div>
            <div className="h-2 w-full bg-[#111111] mt-8"></div>
          </header>

          {/* Stats Grid (Bento Style) */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white p-8 border-2 border-[#111111] flex flex-col justify-between">
              <p className="font-label-bold uppercase text-slate-400">Total Claims</p>
              <h3 className="font-display-lg text-[60px] text-[#111111] leading-none mt-4">{claims.length}</h3>
            </div>
            <div className="bg-[#B11226] p-8 border-2 border-[#111111] flex flex-col justify-between text-white">
              <p className="font-label-bold uppercase text-white/60">Pending Review</p>
              <h3 className="font-display-lg text-[60px] leading-none mt-4">{pendingCount}</h3>
            </div>
            <div className="bg-white p-8 border-2 border-[#111111] flex flex-col justify-between">
              <p className="font-label-bold uppercase text-slate-400">Resolution Rate</p>
              <h3 className="font-display-lg text-[60px] text-[#111111] leading-none mt-4">{claims.length > 0 ? Math.round((approvedCount / claims.length) * 100) : 0}%</h3>
            </div>
            <div className="bg-[#111111] p-8 border-2 border-[#111111] flex flex-col justify-between text-white relative overflow-hidden">
              <div className="relative z-10">
                <p className="font-label-bold uppercase text-white/40">Critical Flags</p>
                <h3 className="font-display-lg text-[60px] leading-none mt-4">0</h3>
              </div>
              {/* Abstract Texture Placeholder */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#B11226] rotate-45 transform translate-x-16 -translate-y-16"></div>
              </div>
            </div>
          </section>

          {/* Claims Table Container */}
          <section className="bg-white border-2 border-[#111111]">
            <div className="p-6 border-b-2 border-[#111111] flex flex-wrap justify-between items-center bg-slate-50 gap-4">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-[#111111]">filter_list</span>
                <span className="font-label-bold uppercase text-[#111111]">Filter Results</span>
              </div>
              <div className="relative">
                <input 
                  className="bg-white border-2 border-[#111111] px-4 py-2 font-label-bold uppercase w-64 focus:ring-0 focus:border-[#B11226] outline-none" 
                  placeholder="SEARCH CLAIMS..." 
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white border-b-2 border-[#111111]">
                    <th className="p-6 font-black uppercase text-xs tracking-widest text-[#111111]">Claim ID</th>
                    <th className="p-6 font-black uppercase text-xs tracking-widest text-[#111111]">Item Asset</th>
                    <th className="p-6 font-black uppercase text-xs tracking-widest text-[#111111]">Claimant Entity</th>
                    <th className="p-6 font-black uppercase text-xs tracking-widest text-[#111111]">Verification Status</th>
                    <th className="p-6 font-black uppercase text-xs tracking-widest text-[#111111] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-slate-100">
                  {filteredClaims.map((claim) => {
                    return (
                      <tr key={claim.claim_id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-6 font-label-bold text-[#B11226]">#CLM-{claim.claim_id.toString().padStart(5, '0')}</td>
                        <td className="p-6">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-slate-200 border border-[#111111] overflow-hidden flex items-center justify-center">
                              <span className="material-symbols-outlined text-slate-400">image</span>
                            </div>
                            <div>
                              <p className="font-headline-md text-sm uppercase font-bold text-[#111111]">{claim.category || 'Unknown Asset'}</p>
                              <p className="text-[10px] text-slate-400 font-bold uppercase">Found ID: {claim.found_id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-6">
                          <p className="font-label-bold uppercase text-[#111111]">{claim.claimant_name}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Submitted: {new Date(claim.created_at).toLocaleDateString()}</p>
                        </td>
                        <td className="p-6">
                          {claim.claim_status === 'Pending' && <span className="bg-[#B11226] text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest">Pending</span>}
                          {claim.claim_status === 'Approved' && <span className="bg-[#0058be] text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest">Approved</span>}
                          {claim.claim_status === 'Rejected' && <span className="bg-slate-300 text-[#111111] px-3 py-1 text-[10px] font-black uppercase tracking-widest">Rejected</span>}
                        </td>
                        <td className="p-6 text-right">
                          <button 
                            className="border-2 border-[#111111] px-4 py-2 font-black uppercase text-xs hover:bg-[#111111] hover:text-white transition-all"
                            onClick={() => navigate(`/claims/${claim.claim_id}`)}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredClaims.length === 0 && (
                    <tr>
                      <td colSpan="5" className="p-6 text-center font-bold text-slate-400 uppercase">No claims found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="p-6 border-t-2 border-[#111111] flex justify-between items-center bg-slate-50">
              <p className="font-label-bold text-xs uppercase text-slate-400">Showing 1-{filteredClaims.length} entries</p>
              <div className="flex gap-2">
                <button className="w-10 h-10 border-2 border-[#111111] flex items-center justify-center hover:bg-[#111111] hover:text-white transition-all">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="w-10 h-10 border-2 border-[#111111] bg-[#111111] text-white font-black text-xs">1</button>
                <button className="w-10 h-10 border-2 border-[#111111] flex items-center justify-center hover:bg-[#111111] hover:text-white transition-all">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}
