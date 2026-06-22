import React from 'react';
import { Link } from 'react-router-dom';
import useStore from '../store/useStore';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function VerificationList() {
  const { claims, fetchClaims, fetchItems } = useStore();
  const pendingClaims = claims.filter(c => c.claim_status === 'Pending');

  React.useEffect(() => {
    fetchClaims();
    fetchItems();
  }, []);

  return (
    <div className="font-body-md text-on-surface bg-[#f7f9fb] min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 md:p-12 overflow-y-auto">
          {/* Header Section */}
          <header className="mb-12">
            <div className="flex flex-col gap-4">
              <span className="bg-[#B11226] text-white px-3 py-1 font-bold uppercase tracking-widest text-xs inline-block self-start">Identity Protocol</span>
              <h1 className="font-display-lg text-6xl uppercase tracking-tighter text-[#111111] font-black leading-none">
                Verification <span className="text-[#B11226]">Process</span>
              </h1>
              <p className="text-slate-500 font-medium max-w-2xl text-lg">Secure proof submission required for active asset retrieval. Select a pending claim to initiate the multi-factor verification sequence.</p>
            </div>
            <div className="h-2 w-full bg-[#111111] mt-8"></div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content: Pending Verifications */}
            <div className="lg:col-span-8 space-y-6">
              <h2 className="font-black text-2xl uppercase tracking-tighter text-[#111111] border-b-4 border-[#111111] pb-2 inline-block">Active Verification Queue</h2>
              
              {pendingClaims.map((claim) => {
                return (
                  <div key={claim.claim_id} className="bg-white border-2 border-[#111111] p-6 hard-shadow flex flex-col md:flex-row gap-8 group hover:bg-slate-50 transition-all">
                    <div className="w-full md:w-48 h-48 bg-slate-100 border-2 border-[#111111] flex-shrink-0 flex items-center justify-center overflow-hidden relative">
                      <span className="material-symbols-outlined text-6xl text-slate-300 group-hover:scale-110 transition-transform">image</span>
                      <div className="absolute top-0 left-0 bg-[#B11226] text-white px-2 py-1 text-[10px] font-black uppercase">Pending Proof</div>
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-black text-2xl uppercase tracking-tighter text-[#111111]">{claim.category || 'Unknown Item'}</h3>
                          <span className="font-bold text-[#B11226] text-sm">REF: #CLM-{claim.claim_id}</span>
                        </div>
                        <p className="text-slate-500 font-bold uppercase text-xs mb-4">Found ID: {claim.found_id} • Reported {new Date(claim.created_at).toLocaleDateString()}</p>
                        <div className="flex gap-2 mb-6">
                          <span className="bg-slate-100 px-2 py-1 text-[10px] font-black uppercase border border-slate-200">Biometric Required</span>
                          <span className="bg-slate-100 px-2 py-1 text-[10px] font-black uppercase border border-slate-200">Visual DNA Check</span>
                        </div>
                      </div>
                      <Link 
                        to={`/verification/${claim.claim_id}`} 
                        className="bg-[#111111] text-white py-4 px-8 font-black uppercase text-center hover:bg-[#B11226] transition-colors"
                      >
                        PROCEED TO VERIFICATION
                      </Link>
                    </div>
                  </div>
                );
              })}

              {pendingClaims.length === 0 && (
                <div className="bg-white border-2 border-[#111111] p-20 text-center hard-shadow">
                  <span className="material-symbols-outlined text-6xl text-slate-200 mb-4 block">task_alt</span>
                  <p className="text-slate-400 font-black uppercase text-xl">All verifications completed</p>
                </div>
              )}
            </div>

            {/* Sidebar Stats / Info */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-[#111111] p-8 text-white hard-shadow-red relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="font-black text-2xl uppercase tracking-tighter mb-4 italic">Security Status</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <span className="text-white/60 font-bold uppercase text-[10px]">Verification Nodes</span>
                      <span className="text-green-500 font-black">ACTIVE</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <span className="text-white/60 font-bold uppercase text-[10px]">Encryption Level</span>
                      <span className="font-black">AES-256</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/60 font-bold uppercase text-[10px]">Officer ID</span>
                      <span className="font-black">#LO-ROOT-01</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 opacity-10">
                  <span className="material-symbols-outlined text-9xl">security</span>
                </div>
              </div>

              <div className="bg-white border-2 border-[#111111] p-8 hard-shadow">
                <h3 className="font-black text-xl uppercase tracking-tighter mb-6 border-b-2 border-[#111111] pb-2 inline-block">Required Proofs</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#B11226]">check_box</span>
                    <span className="text-xs font-bold uppercase text-slate-600 leading-relaxed">Original purchase documentation or digital receipts.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#B11226]">check_box</span>
                    <span className="text-xs font-bold uppercase text-slate-600 leading-relaxed">Photographic evidence of unique identifiers (wear/tear).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#B11226]">check_box</span>
                    <span className="text-xs font-bold uppercase text-slate-600 leading-relaxed">Government-issued identity verification token.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
