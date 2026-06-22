import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useStore from '../store/useStore';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ClaimDetails() {
  const { id } = useParams();
  const { claims, items } = useStore();
  
  const claim = claims.find(c => c.id === parseInt(id));
  const item = claim ? items.find(i => i.id === claim.itemId) : null;

  if (!claim) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f9fb] p-8">
        <div className="bg-white border-2 border-[#111111] p-12 hard-shadow text-center">
          <h1 className="text-4xl font-black uppercase text-[#111111] mb-4">Claim Not Found</h1>
          <Link to="/claims" className="text-[#B11226] font-bold uppercase hover:underline">Return to Claims</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="font-body-md text-on-background bg-[#f7f9fb] min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 md:p-12 overflow-y-auto">
          <header className="mb-12">
            <h2 className="font-display-lg text-4xl uppercase text-[#111111] font-black tracking-tighter mb-2">Claim Details</h2>
            <div className="h-2 w-24 bg-[#B11226]"></div>
          </header>
          
          <div className="max-w-4xl bg-white border-2 border-[#111111] p-8 md:p-12 hard-shadow">
            <div className="flex justify-between items-start mb-8 pb-8 border-b-2 border-slate-100">
              <div>
                <p className="text-sm font-bold text-[#B11226] uppercase tracking-widest mb-1">Claim Reference</p>
                <h3 className="text-3xl font-black text-[#111111] uppercase">#CLM-{claim.id.toString().padStart(5, '0')}</h3>
              </div>
              <span className={`px-4 py-2 text-xs font-black uppercase tracking-widest ${claim.status === 'Pending' ? 'bg-[#B11226] text-white' : claim.status === 'Approved' ? 'bg-[#0058be] text-white' : 'bg-slate-300 text-[#111111]'}`}>
                {claim.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h4 className="text-xl font-black text-[#111111] uppercase mb-6 border-b-2 border-[#111111] inline-block pb-1">Item Information</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase">Item Name</p>
                    <p className="font-bold text-lg text-[#111111]">{item ? item.title : 'Unknown Item'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase">Category</p>
                    <p className="font-bold text-[#111111]">{item ? item.category : 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase">Color</p>
                    <p className="font-bold text-[#111111]">{item ? item.color : 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase">Location Found</p>
                    <p className="font-bold text-[#111111]">{item ? item.location : 'N/A'}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-xl font-black text-[#111111] uppercase mb-6 border-b-2 border-[#111111] inline-block pb-1">Claimant Data</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase">User ID</p>
                    <p className="font-bold text-lg text-[#111111]">#{claim.userId}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase">Date Submitted</p>
                    <p className="font-bold text-[#111111]">{claim.dateSubmitted}</p>
                  </div>
                  {claim.status === 'Pending' && (
                    <div className="pt-6 mt-6 border-t-2 border-slate-100">
                      <Link to={`/verification/${claim.id}`} className="bg-[#111111] text-white px-6 py-3 font-black uppercase text-sm inline-block hover:bg-[#B11226] transition-colors">
                        Provide Verification Proof
                      </Link>
                    </div>
                  )}
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
