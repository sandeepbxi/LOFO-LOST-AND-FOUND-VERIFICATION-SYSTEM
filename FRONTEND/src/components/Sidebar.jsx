import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useStore from '../store/useStore';

export default function Sidebar() {
  const { user, userRole, logout } = useStore();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const initials = user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : '??';

  return (
    <aside className="hidden md:flex flex-col h-screen w-64 bg-white border-r-2 border-[#111111] font-inter font-black uppercase text-sm sticky top-0 z-50">
      <div className="p-8 border-b-2 border-[#111111] bg-white">
        <h1 className="text-xl font-black text-[#111111] tracking-tighter">LOFO Control</h1>
        <p className="text-[10px] text-[#B11226] font-bold mt-1">System Authenticated</p>
      </div>
      <nav className="flex-1 divide-y-2 divide-[#111111] overflow-y-auto">
        <Link to="/dashboard" className={`flex items-center gap-3 px-6 py-5 font-black transition-colors duration-75 ${isActive('/dashboard') ? 'bg-[#B11226] text-white' : 'text-[#111111] hover:bg-slate-100'}`}>
          <span className="material-symbols-outlined">dashboard</span>
          Dashboard
        </Link>
        <Link to="/discover" className={`flex items-center gap-3 px-6 py-4 font-bold transition-colors duration-75 ${isActive('/discover') ? 'bg-[#B11226] text-white' : 'text-[#111111] hover:bg-slate-100'}`}>
          <span className="material-symbols-outlined">search</span>
          Discover Items
        </Link>
        <Link to="/lost-reports" className={`flex items-center gap-3 px-6 py-4 font-bold transition-colors duration-75 ${isActive('/lost-reports') ? 'bg-[#B11226] text-white' : 'text-[#111111] hover:bg-slate-100'}`}>
          <span className="material-symbols-outlined">assignment_late</span>
          Lost Reports
        </Link>
        <Link to="/found-reports" className={`flex items-center gap-3 px-6 py-4 font-bold transition-colors duration-75 ${isActive('/found-reports') ? 'bg-[#B11226] text-white' : 'text-[#111111] hover:bg-slate-100'}`}>
          <span className="material-symbols-outlined">assignment_turned_in</span>
          Found Reports
        </Link>
        <Link to="/claims" className={`flex items-center gap-3 px-6 py-4 font-bold transition-colors duration-75 ${isActive('/claims') ? 'bg-[#B11226] text-white' : 'text-[#111111] hover:bg-slate-100'}`}>
          <span className="material-symbols-outlined">gavel</span>
          Claims
        </Link>
        <Link to="/verification" className={`flex items-center gap-3 px-6 py-4 font-bold transition-colors duration-75 ${isActive('/verification') ? 'bg-[#B11226] text-white' : 'text-[#111111] hover:bg-slate-100'}`}>
          <span className="material-symbols-outlined">verified_user</span>
          Verification
        </Link>
        <Link to="/analytics" className={`flex items-center gap-3 px-6 py-4 font-bold transition-colors duration-75 ${isActive('/analytics') ? 'bg-[#B11226] text-white' : 'text-[#111111] hover:bg-slate-100'}`}>
          <span className="material-symbols-outlined">analytics</span>
          System Analytics
        </Link>
        {userRole === 'admin' && (
          <Link to="/admin" className={`flex items-center gap-3 px-6 py-4 font-bold transition-colors duration-75 ${isActive('/admin') ? 'bg-[#B11226] text-white' : 'text-[#111111] hover:bg-slate-100'}`}>
            <span className="material-symbols-outlined">admin_panel_settings</span>
            Admin Panel
          </Link>
        )}
      </nav>
      <div className="p-6 border-t-2 border-[#111111] bg-slate-50 flex items-center gap-3">
        <div className="w-10 h-10 bg-[#111111] flex items-center justify-center text-white font-black text-xs">{initials}</div>
        <div className="flex flex-col flex-1">
          <span className="text-xs font-black truncate">{user?.name || 'Guest User'}</span>
          <span className="text-[10px] text-slate-500">Security Level {userRole === 'admin' ? 'MAX' : '4'}</span>
        </div>
        <button onClick={logout} className="p-2 hover:bg-[#B11226] hover:text-white transition-all rounded">
          <span className="material-symbols-outlined text-sm">logout</span>
        </button>
      </div>
    </aside>
  );
}
