import React from 'react';
import useStore from '../store/useStore';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function SystemAnalytics() {
  const { claims, items } = useStore();

  return (
    <div className="font-body-md text-on-surface bg-[#f7f9fb] min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1">
          {/* Hero Section / Analytics Intro */}
          <section className="p-8 md:p-12 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b-8 border-[#111111] pb-8">
              <div className="max-w-3xl">
                <span className="bg-[#B11226] text-white px-3 py-1 font-bold uppercase mb-4 inline-block tracking-widest text-xs">Live Feed: Secure Protocol</span>
                <h2 className="font-display-lg text-6xl uppercase tracking-tighter leading-none mb-4 font-black text-[#111111]">Analytics Engine</h2>
                <p className="font-body-lg text-lg text-slate-500 max-w-xl font-medium">Deep-stream validation metrics for lost and found assets. High-fidelity oversight of global retrieval operations.</p>
              </div>
              <div className="bg-[#111111] p-6 text-white hard-shadow-red w-full md:w-auto">
                <p className="font-bold uppercase text-xs opacity-60 mb-2">System Uptime</p>
                <p className="font-display-lg text-5xl text-white font-black">99.98%</p>
                <p className="font-bold text-[#B11226] uppercase text-xs mt-1">Operational</p>
              </div>
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Main Stat: Total Claims */}
              <div className="md:col-span-8 bg-white p-8 border-2 border-[#111111] relative overflow-hidden group hard-shadow">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <span className="material-symbols-outlined text-[160px]">gavel</span>
                </div>
                <div className="relative z-10">
                  <h3 className="font-bold uppercase text-[#111111] border-l-4 border-[#B11226] pl-3 mb-6 text-sm">Total Active Claims</h3>
                  <div className="flex items-baseline gap-4">
                    <span className="font-display-lg text-7xl tracking-tighter leading-none font-black text-[#111111]">{claims.length * 1234}</span>
                    <span className="text-[#B11226] font-bold text-2xl font-black">+12%</span>
                  </div>
                  <div className="mt-8 h-48 w-full flex items-end gap-2">
                    {/* Mock Bar Chart */}
                    <div className="bg-slate-200 w-full h-[20%] transition-all hover:bg-[#B11226]"></div>
                    <div className="bg-slate-200 w-full h-[35%] transition-all hover:bg-[#B11226]"></div>
                    <div className="bg-slate-200 w-full h-[45%] transition-all hover:bg-[#B11226]"></div>
                    <div className="bg-[#B11226] w-full h-[65%] transition-all hover:bg-[#111111]"></div>
                    <div className="bg-slate-200 w-full h-[55%] transition-all hover:bg-[#B11226]"></div>
                    <div className="bg-slate-200 w-full h-[80%] transition-all hover:bg-[#B11226]"></div>
                    <div className="bg-slate-200 w-full h-[70%] transition-all hover:bg-[#B11226]"></div>
                    <div className="bg-slate-200 w-full h-[90%] transition-all hover:bg-[#B11226]"></div>
                    <div className="bg-[#111111] w-full h-[100%]"></div>
                  </div>
                  <div className="flex justify-between mt-4 font-bold text-[10px] text-slate-400 uppercase">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                  </div>
                </div>
              </div>

              {/* Secondary Stat: Approval Rate */}
              <div className="md:col-span-4 bg-[#B11226] p-8 text-white flex flex-col justify-between hard-shadow">
                <div>
                  <h3 className="font-bold uppercase border-l-4 border-white pl-3 mb-6 text-sm">Trust Score / Approval</h3>
                  <span className="font-display-lg text-6xl tracking-tighter leading-none block font-black">94.2%</span>
                </div>
                <div className="space-y-4">
                  <div className="h-2 w-full bg-white/20">
                    <div className="h-full bg-white w-[94.2%]"></div>
                  </div>
                  <p className="font-medium text-sm text-white/80">Verification protocols cleared {claims.length * 42} items this cycle with zero false positives detected.</p>
                  <button className="w-full border-2 border-white py-3 font-bold uppercase hover:bg-white hover:text-[#B11226] transition-colors text-xs tracking-widest">Audit Logs</button>
                </div>
              </div>

              {/* Activity Trends Visual */}
              <div className="md:col-span-5 bg-[#111111] text-white p-8 hard-shadow-red relative min-h-[400px] flex flex-col justify-between">
                <div>
                  <h3 className="font-bold uppercase text-[#B11226] mb-4 text-sm tracking-widest">Activity Heatmap</h3>
                  <p className="text-sm font-medium text-white/60 max-w-xs">Global load distribution across all LOFO regional nodes.</p>
                </div>
                
                <div className="absolute inset-0 opacity-20 mix-blend-screen overflow-hidden pointer-events-none">
                  <div className="absolute top-10 right-10 w-64 h-64 bg-[#B11226] rounded-full blur-3xl"></div>
                  <div className="absolute bottom-10 left-10 w-48 h-48 bg-[#B11226] rounded-full blur-2xl opacity-50"></div>
                </div>

                <div className="relative z-10">
                  <p className="text-3xl font-black leading-none mb-2 uppercase tracking-tighter">Peak Pulse: 03:00 GMT</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Maximum server load detected in Northern Hub</p>
                </div>
              </div>

              {/* Verification Stream */}
              <div className="md:col-span-7 bg-white p-8 border-2 border-[#111111] hard-shadow">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-black text-2xl uppercase tracking-tighter text-[#111111]">Live Verification Stream</h3>
                  <span className="material-symbols-outlined text-[#B11226] animate-pulse">sensors</span>
                </div>
                <div className="space-y-4">
                  {claims.slice(0, 4).map((claim, idx) => (
                    <div key={claim.id} className={`flex items-center justify-between p-4 bg-slate-50 border-l-8 ${idx % 2 === 0 ? 'border-[#B11226]' : 'border-slate-300'}`}>
                      <div>
                        <p className="font-bold uppercase text-[10px] text-slate-400">Asset ID: LO-{9000 + claim.id}</p>
                        <p className="font-black text-[#111111] uppercase">{items.find(i => i.id === claim.itemId)?.title || 'Unknown Item'}</p>
                      </div>
                      <span className={`px-3 py-1 font-bold text-[10px] uppercase tracking-widest ${claim.status === 'Pending' ? 'bg-[#111111] text-white' : 'bg-[#B11226] text-white'}`}>
                        {claim.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}
