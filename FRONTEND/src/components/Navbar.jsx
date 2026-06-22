import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useStore from '../store/useStore';

export default function Navbar() {
  const { userRole } = useStore();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white flex justify-between items-center w-full px-8 py-4 docked full-width top-0 border-b-2 border-[#111111] sticky z-50 shadow-sm">
      <Link to="/" className="text-3xl font-black text-[#111111] font-inter tracking-tighter uppercase cursor-pointer">
        LOFO
      </Link>
      <nav className="hidden lg:flex gap-10 items-center">
        <Link 
          to="/discover" 
          className={`pb-1 font-inter font-black tracking-tighter uppercase text-sm transition-colors duration-200 ${isActive('/discover') ? 'text-[#B11226] border-b-4 border-[#B11226]' : 'text-[#111111] hover:text-[#B11226]'}`}
        >
          Discover
        </Link>
        <Link 
          to="/report" 
          className={`pb-1 font-inter font-black tracking-tighter uppercase text-sm transition-colors duration-200 ${isActive('/report') ? 'text-[#B11226] border-b-4 border-[#B11226]' : 'text-[#111111] hover:text-[#B11226]'}`}
        >
          Report
        </Link>
        <Link 
          to="/claims" 
          className={`pb-1 font-inter font-black tracking-tighter uppercase text-sm transition-colors duration-200 ${isActive('/claims') ? 'text-[#B11226] border-b-4 border-[#B11226]' : 'text-[#111111] hover:text-[#B11226]'}`}
        >
          Claims
        </Link>
        {userRole === 'admin' && (
          <Link 
            to="/admin" 
            className={`pb-1 font-inter font-black tracking-tighter uppercase text-sm transition-colors duration-200 ${isActive('/admin') ? 'text-[#B11226] border-b-4 border-[#B11226]' : 'text-[#111111] hover:text-[#B11226]'}`}
          >
            Mission Control
          </Link>
        )}
      </nav>
      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center bg-surface-container-low px-4 py-2 border-2 border-[#111111] rounded-none focus-within:ring-2 ring-[#B11226] transition-all">
          <span className="material-symbols-outlined text-on-surface-variant text-sm">search</span>
          <input className="bg-transparent border-none focus:ring-0 text-xs font-label-bold w-32 placeholder-slate-400 focus:outline-none" placeholder="QUICK FIND..." type="text"/>
        </div>
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-[#111111] hover:text-[#B11226] transition-colors">notifications</button>
          <Link to="/login" className="material-symbols-outlined text-[#111111] hover:text-[#B11226] transition-colors">account_circle</Link>
        </div>
        <Link to="/report" className="bg-[#B11226] text-white px-6 py-2.5 font-inter font-black tracking-tighter uppercase text-sm active:translate-y-0.5 transition-all border-2 border-[#111111] hard-shadow hover:bg-[#92002a]">
          REPORT ITEM
        </Link>
      </div>
    </header>
  );
}
