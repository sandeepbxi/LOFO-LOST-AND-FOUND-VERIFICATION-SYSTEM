import React, { useState } from 'react';
import useStore from '../store/useStore';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ReportsInventory({ type = 'Lost' }) {
  const { items, fetchItems } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  React.useEffect(() => {
    fetchItems();
  }, []);

  const filteredItems = items.filter(item => {
    // In our simplified schema, we join found_reports for items in /items API.
    // If found_id exists, it's a 'Found' item. Otherwise 'Lost'.
    const itemType = item.found_id ? 'Found' : 'Lost';
    return itemType === type && 
    (item.category.toLowerCase().includes(searchTerm.toLowerCase()) || 
     item.description.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  return (
    <div className="font-body-md text-on-surface bg-[#f7f9fb] min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 md:p-12 overflow-y-auto">
          {/* Header Section */}
          <header className="mb-12">
            <div className="flex justify-between items-end mb-4">
              <h1 className="font-display-lg text-6xl uppercase tracking-tighter text-[#111111] font-black">
                {type} <span className="text-[#B11226]">Reports</span>
              </h1>
              <div className="flex gap-4">
                <button className="bg-[#111111] text-white px-8 py-4 font-bold uppercase active:translate-y-1 transition-transform hard-shadow">
                  Filter Results
                </button>
                <button className="bg-[#B11226] text-white px-8 py-4 font-bold uppercase active:translate-y-1 transition-transform hard-shadow">
                  + File New Report
                </button>
              </div>
            </div>
            <div className="h-2 w-full bg-[#111111]"></div>
          </header>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white border-2 border-[#111111] p-6 hard-shadow">
              <div className="text-slate-400 font-bold uppercase text-xs mb-2">Total Active Cases</div>
              <div className="font-display-lg text-4xl text-[#111111] font-black">{filteredItems.length}</div>
            </div>
            <div className="bg-[#B11226] border-2 border-[#111111] p-6 text-white hard-shadow">
              <div className="text-white/70 font-bold uppercase text-xs mb-2">High Priority</div>
              <div className="font-display-lg text-4xl font-black">12</div>
            </div>
            <div className="col-span-1 md:col-span-2 bg-slate-200 border-2 border-[#111111] p-6 relative overflow-hidden hard-shadow">
              <div className="relative z-10">
                <div className="text-slate-500 font-bold uppercase text-xs mb-2">Recovery Rate</div>
                <div className="font-display-lg text-4xl text-[#111111] font-black">68.4%</div>
              </div>
              <div className="absolute bottom-0 right-0 w-24 h-24 opacity-10">
                <span className="material-symbols-outlined text-8xl">trending_up</span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-8 flex gap-4">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">search</span>
              <input 
                type="text" 
                placeholder={`SEARCH ${type.toUpperCase()} REPORTS...`}
                className="w-full bg-white border-2 border-[#111111] pl-12 pr-4 py-4 font-bold uppercase focus:outline-none focus:border-[#B11226]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Reports Table */}
          <div className="bg-white border-2 border-[#111111] overflow-hidden hard-shadow">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#111111] text-white">
                <tr>
                  <th className="px-6 py-4 font-bold uppercase text-xs tracking-widest border-r-2 border-white/10">ID / Status</th>
                  <th className="px-6 py-4 font-bold uppercase text-xs tracking-widest border-r-2 border-white/10">Item Description</th>
                  <th className="px-6 py-4 font-bold uppercase text-xs tracking-widest border-r-2 border-white/10">Reporter</th>
                  <th className="px-6 py-4 font-bold uppercase text-xs tracking-widest border-r-2 border-white/10">Location</th>
                  <th className="px-6 py-4 font-bold uppercase text-xs tracking-widest border-r-2 border-white/10">Date Reported</th>
                  <th className="px-6 py-4 font-bold uppercase text-xs tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-[#111111]">
                {filteredItems.map((item, index) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-6 border-r-2 border-slate-100">
                      <div className="font-black text-sm mb-1">#LR-90{index + 21}</div>
                      <span className={`px-2 py-0.5 text-[10px] font-black uppercase rounded-full ${index % 3 === 0 ? 'bg-[#B11226] text-white' : 'bg-slate-200 text-slate-600'}`}>
                        {index % 3 === 0 ? 'Priority' : 'Standard'}
                      </span>
                    </td>
                    <td className="px-6 py-6 border-r-2 border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 border border-slate-200 flex-shrink-0 flex items-center justify-center">
                          <span className="material-symbols-outlined text-slate-400">image</span>
                        </div>
                        <div>
                          <div className="font-bold text-lg text-[#111111]">{item.title}</div>
                          <div className="text-xs text-slate-500 font-bold uppercase">{item.category} • {item.color}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 border-r-2 border-slate-100">
                      <div className="font-bold text-[#111111]">User #{item.id}</div>
                      <div className="text-xs text-slate-400 uppercase">auth: verified_092</div>
                    </td>
                    <td className="px-6 py-6 font-bold text-[#111111] uppercase text-xs border-r-2 border-slate-100">{item.location}</td>
                    <td className="px-6 py-6 font-bold text-[#111111] uppercase text-xs border-r-2 border-slate-100">OCT {24 - index}, 2024</td>
                    <td className="px-6 py-6 text-right">
                      <button className="p-2 hover:bg-[#B11226] hover:text-white transition-all">
                        <span className="material-symbols-outlined">visibility</span>
                      </button>
                      <button className="p-2 hover:bg-[#B11226] hover:text-white transition-all">
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredItems.length === 0 && (
                  <tr>
                    <td colSpan="6" className="p-12 text-center text-slate-400 font-black uppercase">No reports found</td>
                  </tr>
                )}
              </tbody>
            </table>
            {/* Pagination */}
            <div className="p-6 bg-slate-50 border-t-2 border-[#111111] flex justify-between items-center">
              <div className="text-xs font-black uppercase text-slate-500">Showing 1-{filteredItems.length} of {filteredItems.length} results</div>
              <div className="flex gap-2">
                <button className="w-10 h-10 border-2 border-[#111111] flex items-center justify-center font-black bg-white">1</button>
                <button className="w-10 h-10 border-2 border-[#111111] flex items-center justify-center font-black hover:bg-[#111111] hover:text-white transition-all">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
