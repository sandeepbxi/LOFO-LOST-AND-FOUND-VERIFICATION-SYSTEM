import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import useStore from '../store/useStore';

export default function Dashboard() {
  const { items, claims, fetchItems, fetchClaims } = useStore();

  React.useEffect(() => {
    fetchItems();
    fetchClaims();
  }, []);

  const lostItemsCount = items.length; // Simplified for demo
  const foundItemsCount = items.filter(i => i.status === 'Open').length;
  const pendingClaimsCount = claims.filter(c => c.claim_status === 'Pending').length;
  const approvedClaimsCount = claims.filter(c => c.claim_status === 'Approved').length;

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex overflow-x-hidden">
      <Sidebar />
      {/* Main Content Canvas */}
      <main className="flex-1 min-w-0">
        {/* Top Navigation Bar */}
        <header className="flex justify-between items-center w-full px-8 py-4 bg-white border-b-2 border-[#111111] sticky top-0 z-40">
          <div className="flex items-center gap-6">
            <div className="md:hidden text-2xl font-black text-[#111111]">LOFO</div>
            <div className="relative hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input className="bg-surface-container-low border-2 border-[#111111] pl-10 pr-4 py-2 font-label-bold text-xs focus:ring-0 focus:border-[#B11226] w-64 uppercase" placeholder="SEARCH DATABASE..." type="text"/>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/report" className="bg-[#B11226] text-white px-6 py-2 font-label-bold text-xs tracking-widest hover:bg-[#111111] transition-all active:translate-y-1">
              REPORT ITEM
            </Link>
            <div className="flex items-center gap-2 border-l-2 border-[#111111] ml-2 pl-4">
              <button className="p-2 hover:bg-[#B11226] hover:text-white transition-all">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="p-2 hover:bg-[#B11226] hover:text-white transition-all">
                <span className="material-symbols-outlined">account_circle</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="p-8 lg:p-12 space-y-12">
          {/* Hero Header */}
          <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b-8 border-[#111111] pb-8">
            <div>
              <h2 className="font-display-lg text-on-background tracking-tighter uppercase leading-none text-4xl">Command Center</h2>
              <p className="font-headline-md text-[#B11226] mt-2 italic text-xl">STATUS: ALL SYSTEMS OPTIMAL</p>
            </div>
            <div className="bg-[#111111] text-white p-4 font-label-bold text-sm">
              LAST SYNC: 14:02:44 GMT
            </div>
          </section>

          {/* Bento Grid Stats */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Lost Items Card */}
            <div className="bg-white border-2 border-[#111111] p-8 flex flex-col justify-between group hover:bg-[#111111] transition-colors duration-200">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-4xl group-hover:text-[#B11226]">error</span>
                <span className="font-label-bold text-xs text-slate-400 group-hover:text-white uppercase">Active Recovery</span>
              </div>
              <div className="mt-8">
                <div className="font-display-xl text-[60px] text-on-background group-hover:text-white leading-none">{lostItemsCount}</div>
                <h3 className="font-headline-md text-xl text-[#111111] group-hover:text-[#B11226] uppercase">Lost Items</h3>
              </div>
            </div>

            {/* Found Items Card */}
            <div className="bg-white border-2 border-[#111111] p-8 flex flex-col justify-between group hover:bg-[#111111] transition-colors duration-200">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-4xl group-hover:text-[#B11226]">check_circle</span>
                <span className="font-label-bold text-xs text-slate-400 group-hover:text-white uppercase">In Repository</span>
              </div>
              <div className="mt-8">
                <div className="font-display-xl text-[60px] text-on-background group-hover:text-white leading-none">{foundItemsCount}</div>
                <h3 className="font-headline-md text-xl text-[#111111] group-hover:text-[#B11226] uppercase">Found Items</h3>
              </div>
            </div>

            {/* Pending Claims Card */}
            <div className="bg-white border-2 border-[#111111] p-8 flex flex-col justify-between group hover:bg-[#111111] transition-colors duration-200">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-4xl group-hover:text-[#B11226]">pending</span>
                <span className="font-label-bold text-xs text-slate-400 group-hover:text-white uppercase">Awaiting Proof</span>
              </div>
              <div className="mt-8">
                <div className="font-display-xl text-[60px] text-on-background group-hover:text-white leading-none">0{pendingClaimsCount}</div>
                <h3 className="font-headline-md text-xl text-[#111111] group-hover:text-[#B11226] uppercase">Pending</h3>
              </div>
            </div>

            {/* Approved Claims Card */}
            <div className="bg-[#B11226] text-white border-2 border-[#111111] p-8 flex flex-col justify-between hover:bg-[#111111] transition-colors duration-200 shadow-[8px_8px_0px_0px_#111111]">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <span className="font-label-bold text-xs text-white uppercase">Verified Returns</span>
              </div>
              <div className="mt-8">
                <div className="font-display-xl text-[60px] text-white leading-none">{approvedClaimsCount}</div>
                <h3 className="font-headline-md text-xl text-white uppercase">Approved</h3>
              </div>
            </div>
          </section>

          {/* Main Layout: List & Visualization */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Recent Activity List (High-Contrast) */}
            <div className="lg:col-span-1 space-y-6">
              <h4 className="font-headline-md text-2xl uppercase border-b-4 border-[#111111] pb-2">Activity Stream</h4>
              <div className="space-y-4">
                <div className="bg-surface-container-low border-l-8 border-[#B11226] p-4 group hover:bg-white hover:shadow-[4px_4px_0px_0px_#B11226] transition-all">
                  <p className="font-label-bold text-[10px] text-[#B11226]">10 MINUTES AGO</p>
                  <p className="font-body-md font-bold text-[#111111] mt-1">Claim approved for "Black Leather Wallet"</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="bg-[#111111] text-white text-[10px] px-2 py-0.5 font-bold">SECURE</span>
                  </div>
                </div>
                <div className="bg-surface-container-low border-l-8 border-[#111111] p-4 group hover:bg-white hover:shadow-[4px_4px_0px_0px_#111111] transition-all">
                  <p className="font-label-bold text-[10px] text-slate-500">2 HOURS AGO</p>
                  <p className="font-body-md font-bold text-[#111111] mt-1">New "Lost Item" report: iPhone 15 Pro</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="bg-slate-300 text-[#111111] text-[10px] px-2 py-0.5 font-bold">TRACKING</span>
                  </div>
                </div>
                <div className="bg-surface-container-low border-l-8 border-[#111111] p-4 group hover:bg-white hover:shadow-[4px_4px_0px_0px_#111111] transition-all">
                  <p className="font-label-bold text-[10px] text-slate-500">4 HOURS AGO</p>
                  <p className="font-body-md font-bold text-[#111111] mt-1">Database sync completed with Central Repository</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="bg-slate-300 text-[#111111] text-[10px] px-2 py-0.5 font-bold">SYSTEM</span>
                  </div>
                </div>
                <div className="bg-surface-container-low border-l-8 border-[#B11226] p-4 group hover:bg-white hover:shadow-[4px_4px_0px_0px_#B11226] transition-all">
                  <p className="font-label-bold text-[10px] text-[#B11226]">6 HOURS AGO</p>
                  <p className="font-body-md font-bold text-[#111111] mt-1">Suspicious claim flagged by verification engine</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="bg-[#B11226] text-white text-[10px] px-2 py-0.5 font-bold">URGENT</span>
                  </div>
                </div>
              </div>
              <button className="w-full py-4 border-2 border-[#111111] font-label-bold text-sm uppercase hover:bg-[#111111] hover:text-white transition-all">
                View Audit Log
              </button>
            </div>

            {/* Statistics and Visualization */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              <div className="bg-white border-4 border-[#111111] p-8 flex flex-col">
                <div className="flex justify-between items-center mb-12">
                  <h4 className="font-headline-md text-2xl uppercase">Claim Statistics</h4>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#B11226]"></div>
                      <span className="text-[10px] font-bold uppercase">Volume</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#111111]"></div>
                      <span className="text-[10px] font-bold uppercase">Success %</span>
                    </div>
                  </div>
                </div>
                {/* Simple Visual Graph Placeholder */}
                <div className="h-64 flex items-end gap-2 sm:gap-4 border-b-2 border-[#111111] pb-2">
                  <div className="flex-1 bg-[#111111] h-[20%] relative group"></div>
                  <div className="flex-1 bg-[#B11226] h-[45%] relative group"></div>
                  <div className="flex-1 bg-[#111111] h-[30%] relative group"></div>
                  <div className="flex-1 bg-[#B11226] h-[85%] relative group"></div>
                  <div className="flex-1 bg-[#111111] h-[55%] relative group"></div>
                  <div className="flex-1 bg-[#B11226] h-[70%] relative group"></div>
                  <div className="flex-1 bg-[#111111] h-[40%] relative group"></div>
                </div>
                <div className="mt-4 flex justify-between text-[10px] font-bold uppercase text-slate-500">
                  <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
                </div>
              </div>

              {/* Featured Quick Action Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative overflow-hidden group border-2 border-[#111111] h-48">
                  <img className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDShdEFnQ8c6UZfpCOxcaf9QLivGuAEZ3bt6Zv8svxOHuD_K_QOwwEoZT8hgDHGwo7FK8214TIapsQj6xtIUQtRElzoWF2trBiqM16Dl-RKA3MDD3tVSMEvkeR2lNW1RH_DPSLKlUASCWkWZ-StN6S24zMY-ggZEyEwKIemvacca8Arjv0bgRQwX9cP7ecd7s2s5bdG9nEF2jO9tGrgrZcxFQ1moc1FqJY1sfnGa20oAuoT1-XqTVZ7Z1Yyy8XfidpefM5LdCFgDxc" alt="Sensor"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent opacity-60"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h5 className="text-white font-headline-md text-xl uppercase tracking-tighter leading-none">Verify New Proof</h5>
                    <p className="text-white text-xs font-label-bold mt-2 opacity-80 uppercase">Run verification algorithms now</p>
                  </div>
                </div>
                <div className="relative overflow-hidden group border-2 border-[#111111] h-48">
                  <img className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFbvbZkwZuydlK9yF3tRwK4evhdK1UrnBkPOZ6g9k6t-0EzrvD-jlXFzYLQw-3kkZ0ui_8aE5KRmkaw66e0028yftOOD8rpSGe3hUTV4LSHE4X5a524meyvirQAWAWsxCMhYSzYgjFEny0vB-_KxhdxTVxP-rtorwgZQxrEUAYJ_FIcFQqtaN5neWD_W250VhaSlg-CrqcP3VbqufXvVC_4QffhOjo3eT72OkC9iA-lgB5qNd51JB52HAG2dbwQHd5vEyBZMfRWuM" alt="Vault"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#B11226] to-transparent opacity-60"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h5 className="text-white font-headline-md text-xl uppercase tracking-tighter leading-none">Security Audit</h5>
                    <p className="text-white text-xs font-label-bold mt-2 opacity-80 uppercase">Review system integrity logs</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="w-full py-12 px-8 bg-[#111111] border-t-4 border-[#B11226] text-white flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2">
            <div className="text-lg font-black tracking-tighter">LOFO</div>
            <p className="font-inter font-bold tracking-tight text-xs uppercase text-slate-500">© 2024 LOFO - SECURE PROOF SYSTEMS</p>
          </div>
          <nav className="flex gap-8">
            <a className="font-inter font-bold tracking-tight text-xs uppercase text-slate-500 hover:text-[#B11226] transition-opacity duration-200" href="#">Terms</a>
            <a className="font-inter font-bold tracking-tight text-xs uppercase text-slate-500 hover:text-[#B11226] transition-opacity duration-200" href="#">Privacy</a>
            <a className="font-inter font-bold tracking-tight text-xs uppercase text-slate-500 hover:text-[#B11226] transition-opacity duration-200" href="#">Security</a>
            <a className="font-inter font-bold tracking-tight text-xs uppercase text-slate-500 hover:text-[#B11226] transition-opacity duration-200" href="#">Contact</a>
          </nav>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-[#B11226]">shield</span>
            <span className="material-symbols-outlined text-white">terminal</span>
          </div>
        </footer>
      </main>
      
      {/* Floating Action Button */}
      <Link to="/report" className="fixed bottom-12 right-12 w-16 h-16 bg-[#B11226] text-white flex items-center justify-center shadow-[8px_8px_0px_0px_#111111] active:translate-x-2 active:translate-y-2 active:shadow-none transition-all z-50">
        <span className="material-symbols-outlined text-4xl">add</span>
      </Link>
    </div>
  );
}
