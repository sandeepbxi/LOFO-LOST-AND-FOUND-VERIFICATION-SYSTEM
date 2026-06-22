import React, { useState } from 'react';
import useStore from '../store/useStore';
import api from '../utils/api';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Admin() {
  const { claims, items, fetchClaims, addToast } = useStore();
  const pendingClaims = claims.filter(c => c.claim_status === 'Pending');
  const [selectedClaimId, setSelectedClaimId] = useState(null);
  const [justification, setJustification] = useState('');
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    fetchClaims();
  }, []);

  // Update selected claim if not set and there are pending claims
  React.useEffect(() => {
    if (!selectedClaimId && pendingClaims.length > 0) {
      setSelectedClaimId(pendingClaims[0].claim_id);
    }
  }, [pendingClaims, selectedClaimId]);

  const handleDecision = async (status) => {
    if (!selectedClaimId) return;
    if (!justification && status === 'Rejected') {
      addToast('Mandatory reason input required for rejection', 'error');
      return;
    }
    
    setLoading(true);
    try {
      await api.post('/admin/decision', {
        claim_id: selectedClaimId,
        decision: status,
        reason: justification || 'Approved after review'
      });
      
      addToast(`Claim #${selectedClaimId} ${status.toLowerCase()}ed successfully`, 'success');
      setJustification('');
      fetchClaims(); // Refresh list
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to process claim', 'error');
    } finally {
      setLoading(false);
    }
  };

  const selectedClaim = claims.find(c => c.claim_id === selectedClaimId);
  const selectedItem = selectedClaim ? items.find(i => i.id === selectedClaim.itemId) : null;

  return (
    <div className="font-body-md text-on-background bg-[#f7f9fb] min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        {/* Main Canvas */}
        <main className="flex-grow flex flex-col">
          {/* Dashboard Content */}
          <div className="p-8 lg:p-12 xl:px-16 flex flex-col gap-12">
            {/* Hero Header */}
            <section className="flex flex-col md:flex-row justify-between items-end gap-12">
              <div className="max-w-2xl">
                <h2 className="font-display-lg text-display-lg text-[#111111] uppercase leading-none text-6xl tracking-tighter">MISSION<br/><span className="text-[#B11226]">CONTROL</span></h2>
                <p className="font-body-lg text-body-lg mt-4 border-l-4 border-[#111111] pl-6 text-slate-600 font-bold uppercase tracking-tight">
                  Critical Review Protocol Initiated. Secure Proof Verification Required for all {pendingClaims.length} pending assets.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                <div className="bg-white border-2 border-[#111111] p-4 hard-shadow-black">
                  <p className="text-xs font-black uppercase text-slate-500">System Status</p>
                  <p className="text-2xl font-black uppercase text-green-600">Active</p>
                </div>
                <div className="bg-[#111111] p-4 text-white hard-shadow-red">
                  <p className="text-xs font-black uppercase text-[#B11226]">Risk Level</p>
                  <p className="text-2xl font-black uppercase">Elevated</p>
                </div>
              </div>
            </section>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-12 gap-8 items-start">
              {/* High Priority Queue */}
              <div className="col-span-12 lg:col-span-7 flex flex-col gap-4">
                <div className="flex justify-between items-center bg-[#111111] text-white p-4">
                  <h3 className="font-headline-md text-headline-md text-xl uppercase tracking-tighter">CLAIM QUEUE</h3>
                  <span className="bg-[#B11226] text-white px-3 py-1 font-black text-xs">{pendingClaims.length} PENDING</span>
                </div>

                {/* Claim Cards */}
                {pendingClaims.map((claim) => {
                  const item = items.find(i => i.id === claim.itemId);
                  const isSelected = selectedClaimId === claim.id;
                  
                  return (
                    <div 
                      key={claim.claim_id} 
                      className={`bg-white border-2 border-[#111111] flex flex-col md:flex-row group transition-all duration-100 ${isSelected ? 'ring-4 ring-[#B11226] ring-offset-2' : 'hover:bg-slate-50 cursor-pointer'}`}
                      onClick={() => setSelectedClaimId(claim.claim_id)}
                    >
                      <div className="w-full md:w-48 h-48 bg-slate-200 shrink-0 relative overflow-hidden flex items-center justify-center">
                        <span className="material-symbols-outlined text-6xl text-slate-400">image</span>
                        <div className="absolute top-0 left-0 bg-[#B11226] text-white px-2 py-1 text-[10px] font-black uppercase">High Fidelity</div>
                      </div>
                      <div className="p-6 flex flex-col justify-between grow">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-headline-md text-xl uppercase tracking-tighter text-[#111111]">{claim.category || 'Unknown Item'}</h4>
                            <span className="font-label-bold text-[#B11226]">REF: #CLM-{claim.claim_id}</span>
                          </div>
                          <p className="text-xs font-bold text-slate-500 uppercase mt-1">Claimant: {claim.claimant_name} • ID Verified</p>
                          <div className="mt-4 flex gap-2">
                            <span className="bg-surface-container-high bg-slate-100 px-2 py-1 text-[10px] font-black uppercase">Found ID: {claim.found_id}</span>
                            <span className="bg-surface-container-high bg-slate-100 px-2 py-1 text-[10px] font-black uppercase">Date: {new Date(claim.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="mt-6 flex gap-4">
                          <button className="bg-[#111111] text-white px-6 py-2 font-black font-inter uppercase text-xs hover:bg-[#B11226] transition-colors">REVIEW EVIDENCE</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {pendingClaims.length === 0 && (
                  <div className="bg-white border-2 border-[#111111] p-12 text-center text-slate-500 font-black uppercase">
                    No pending claims. All caught up.
                  </div>
                )}
              </div>

              {/* Decision Protocol Panel */}
              <div className="col-span-12 lg:col-span-5 sticky top-24">
                <div className="bg-white border-4 border-[#B11226] p-8 hard-shadow-black">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="material-symbols-outlined text-[#B11226] text-3xl">security</span>
                    <h3 className="font-headline-md text-2xl uppercase tracking-tighter text-[#111111]">DECISION PROTOCOL</h3>
                  </div>
                  
                  {selectedClaim ? (
                    <div className="space-y-6">
                      <div>
                        <label className="block font-label-bold text-[#111111] uppercase mb-2 text-sm font-bold">TARGET ASSET</label>
                        <div className="bg-slate-100 p-4 border-l-4 border-[#111111]">
                          <p className="font-black uppercase text-sm">#{selectedClaim.id} {selectedItem?.title}</p>
                          <p className="text-[10px] font-bold text-slate-500 uppercase">AWAITING ADJUDICATION</p>
                        </div>
                      </div>
                      <div>
                        <label className="block font-label-bold text-[#111111] uppercase mb-2 text-sm font-bold">MANDATORY REASON INPUT</label>
                        <textarea 
                          className="w-full border-2 border-[#111111] p-4 font-body-md focus:ring-0 focus:border-[#B11226] uppercase text-xs font-bold outline-none resize-none" 
                          placeholder="PROVIDE JUSTIFICATION FOR SYSTEM LOG..." 
                          rows="4"
                          value={justification}
                          onChange={(e) => setJustification(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="flex flex-col gap-4 pt-4">
                        <button 
                          className="w-full bg-[#111111] text-white py-6 text-xl font-black uppercase tracking-widest hover:bg-[#B11226] transition-colors duration-200 disabled:opacity-50"
                          onClick={() => handleDecision('Approved')}
                          disabled={loading}
                        >
                          {loading ? 'PROCESSING...' : 'APPROVE CLAIM'}
                        </button>
                        <button 
                          className="w-full border-2 border-[#111111] text-[#111111] py-4 text-sm font-black uppercase tracking-widest hover:bg-slate-100 transition-colors disabled:opacity-50"
                          onClick={() => handleDecision('Rejected')}
                          disabled={loading}
                        >
                          REJECT & LOCK
                        </button>
                      </div>
                      <div className="border-t-2 border-slate-200 pt-6">
                        <div className="flex items-center gap-4 text-[#B11226]">
                          <span className="material-symbols-outlined">warning</span>
                          <p className="text-[10px] font-black uppercase">Decisions are final and logged to the immutable blockchain ledger under officer #8821.</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-slate-400 py-8 font-black uppercase">
                      Select a claim from the queue to review
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* System Stats Section */}
            <section className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12 mb-16">
              <div className="bg-slate-100 border-b-8 border-[#111111] p-6">
                <p className="text-xs font-black uppercase text-slate-500">Processing Speed</p>
                <p className="text-4xl font-black text-[#111111]">1.2s</p>
              </div>
              <div className="bg-slate-100 border-b-8 border-[#B11226] p-6">
                <p className="text-xs font-black uppercase text-slate-500">Security Nodes</p>
                <p className="text-4xl font-black text-[#111111]">14/14</p>
              </div>
              <div className="bg-slate-100 border-b-8 border-[#111111] p-6">
                <p className="text-xs font-black uppercase text-slate-500">Queue Depth</p>
                <p className="text-4xl font-black text-[#111111]">{pendingClaims.length}</p>
              </div>
              <div className="bg-[#B11226] border-b-8 border-[#111111] p-6 text-white">
                <p className="text-xs font-black uppercase opacity-70">Uptime</p>
                <p className="text-4xl font-black">99.9%</p>
              </div>
            </section>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
