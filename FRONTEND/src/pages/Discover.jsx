import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Discover() {
  const { items, fetchItems, addToast } = useStore();
  const navigate = useNavigate();
  const [category, setCategory] = useState('ALL CATEGORIES');

  React.useEffect(() => {
    fetchItems();
  }, []);

  const handleClaim = (id) => {
    navigate(`/claims/${id}`);
  };

  const filteredItems = items.filter(item => {
    if (category !== 'ALL CATEGORIES' && item.category.toUpperCase() !== category) {
      return false;
    }
    return true;
  });

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        {/* Main Content */}
        <main className="flex-1 p-8 md:p-xl">
          <header className="mb-lg">
            <h2 className="font-display-xl text-display-xl text-[#111111] uppercase text-4xl">Discover Items</h2>
            <div className="mt-sm w-32 h-4 bg-[#B11226]"></div>
          </header>

          {/* Filters */}
          <section className="flex flex-wrap gap-gutter mb-lg items-end">
            <div className="flex flex-col gap-xs">
              <label className="font-label-bold text-label-bold uppercase">Category</label>
              <select 
                className="border-2 border-[#111111] bg-white font-label-bold px-4 py-3 min-w-[200px] focus:ring-0 focus:border-[#B11226] outline-none"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>ALL CATEGORIES</option>
                <option>ELECTRONICS</option>
                <option>BAGS</option>
                <option>ACCESSORIES</option>
              </select>
            </div>
            <div className="flex flex-col gap-xs">
              <label className="font-label-bold text-label-bold uppercase">Color</label>
              <div className="flex gap-2">
                <button className="w-10 h-10 border-2 border-[#111111] bg-black hover:scale-110 transition-transform" title="Black"></button>
                <button className="w-10 h-10 border-2 border-[#111111] bg-slate-300 hover:scale-110 transition-transform" title="Silver"></button>
                <button className="w-10 h-10 border-2 border-[#111111] bg-[#B11226] hover:scale-110 transition-transform" title="Red"></button>
                <button className="w-10 h-10 border-2 border-[#111111] bg-blue-600 hover:scale-110 transition-transform" title="Blue"></button>
              </div>
            </div>
            <button className="bg-[#111111] text-white font-label-bold text-label-bold px-8 py-3.5 uppercase hover:bg-[#B11226] transition-colors">Apply Filters</button>
          </section>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
            {filteredItems.map((item, idx) => (
              <article key={item.id} className={`bg-surface-container-lowest border-2 border-[#111111] flex flex-col relative group ${item.status === 'Identified' ? 'opacity-75 grayscale' : ''}`}>
                <div className="relative aspect-video overflow-hidden bg-slate-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-6xl text-slate-300">image</span>
                  <span className={`absolute top-4 right-4 ${item.status === 'Identified' ? 'bg-[#111111]' : 'bg-[#B11226]'} text-white font-black text-[12px] px-3 py-1 uppercase`}>
                    {item.status === 'Identified' ? 'CLOSED' : 'OPEN'}
                  </span>
                </div>
                <div className="p-6 flex flex-col gap-4 flex-1 justify-between">
                  <div>
                    <span className="font-label-bold text-[#B11226] text-[12px] tracking-widest uppercase">{item.category}</span>
                    <h3 className="font-headline-md text-headline-md text-2xl text-[#111111] uppercase mt-1">{item.title}</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-2">Found at {item.location}. Added on {item.date}. Status: {item.status}.</p>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t-2 border-surface-container-highest mt-4">
                    <span className="font-label-bold text-[#111111] uppercase text-sm">Color: {item.color}</span>
                    <button 
                      className={`${item.status === 'Identified' ? 'bg-slate-300 text-slate-600 cursor-not-allowed' : 'bg-[#B11226] text-white hover:bg-[#111111] hover:shadow-[4px_4px_0px_#111111] transform group-hover:translate-x-1 group-hover:-translate-y-1'} font-black text-[14px] px-6 py-3 uppercase transition-all`}
                      disabled={item.status === 'Identified'}
                      onClick={() => handleClaim(item.id)}
                    >
                      {item.status === 'Identified' ? 'Claimed' : 'Claim Item'}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
