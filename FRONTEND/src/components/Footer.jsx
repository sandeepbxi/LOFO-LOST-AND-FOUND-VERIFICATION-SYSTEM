import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-[#B11226] font-inter font-bold tracking-tight text-xs uppercase w-full py-24 px-8 border-t-4 border-[#B11226]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-16 max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-4">
          <div className="text-4xl font-black text-white uppercase tracking-tighter">LOFO</div>
          <div className="text-slate-400 font-black tracking-widest text-sm">SECURE PROOF SYSTEMS — GLOBAL NETWORK</div>
        </div>
        <div className="flex gap-20">
          <div className="flex flex-col gap-4">
            <span className="text-white mb-2 font-black border-b-2 border-[#B11226] w-fit">NAVIGATION</span>
            <Link className="text-slate-400 hover:text-white transition-colors" to="/discover">Discover</Link>
            <Link className="text-slate-400 hover:text-white transition-colors" to="/report">Report</Link>
            <Link className="text-slate-400 hover:text-white transition-colors" to="/admin">Mission Control</Link>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-white mb-2 font-black border-b-2 border-[#B11226] w-fit">LEGAL</span>
            <a className="text-slate-500 hover:text-white transition-colors" href="#">Terms</a>
            <a className="text-slate-500 hover:text-white transition-colors" href="#">Privacy</a>
            <a className="text-slate-500 hover:text-white transition-colors" href="#">Security</a>
          </div>
        </div>
        <div className="text-slate-500 text-left md:text-right flex flex-col items-start md:items-end gap-6">
          <div className="font-black text-slate-400">© 2024 LOFO - SECURE PROOF SYSTEMS</div>
          <div className="flex gap-4">
            <button className="bg-[#1c1e20] p-4 text-white hover:bg-[#B11226] transition-all border border-slate-700"><span className="material-symbols-outlined">language</span></button>
            <button className="bg-[#1c1e20] p-4 text-white hover:bg-[#B11226] transition-all border border-slate-700"><span className="material-symbols-outlined">shield</span></button>
          </div>
        </div>
      </div>
    </footer>
  );
}
