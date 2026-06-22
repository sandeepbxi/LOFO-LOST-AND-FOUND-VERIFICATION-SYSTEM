import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useStore from '../store/useStore';
import api from '../utils/api';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser, setToken, addToast } = useStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      addToast('Please fill in all fields', 'error');
      return;
    }
    
    setLoading(true);
    try {
      const res = await api.post('/auth/signup', { name, email, password });
      const { token, user } = res.data;
      
      setToken(token);
      setUser(user);
      
      addToast('Account created successfully', 'success');
      navigate('/dashboard');
    } catch (err) {
      addToast(err.response?.data?.message || 'Signup failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-grow flex flex-col md:flex-row min-h-[92vh]">
        {/* Left Side: Visual Anchor */}
        <section className="hidden md:flex md:w-1/2 bg-black items-center justify-center p-xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-40">
            <img alt="Digital security landscape" className="w-full h-full object-cover grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDo-oybwEdGlsDWJtfPQnGR9OnaEww8r0U3gpymYoc3Rq1zkQgh-34sCgLv-PGD1kdCuGJjXusYxglULQbVZG2GIfd_TlP7GXhQMs5VQn1jm8HkUi8w81Ii80MLeqWrFOlHrl_DxNfMY3bW53ydf5bAvboRFYkcOwBlv358KIoUdMG4m1_0xl77dVUS7oJ85dYfPROHHtsgoXtQllKM1ps4tQQUDw1cwqkxXSNk1HTrt8R_DYKxp5wVZvJajTiW4sy4O-H4M3PKxxo"/>
          </div>
          <div className="relative z-10 text-white max-w-lg">
            <h2 className="font-display-lg text-display-lg mb-sm">SECURE BY DESIGN.</h2>
            <p className="font-body-lg text-body-lg text-surface-variant/80 border-l-4 border-red-600 pl-gutter">
              Join the most secure ecosystem for decentralized identity management. LOFO ensures your data remains yours through end-to-end cryptographic shielding.
            </p>
          </div>
        </section>

        {/* Right Side: Registration Form */}
        <section className="w-full md:w-1/2 flex items-center justify-center p-margin md:p-xl bg-surface">
          <div className="w-full max-w-md">
            <div className="mb-lg">
              <h1 className="font-display-lg text-headline-lg uppercase text-black leading-none mb-xs">CREATE ACCOUNT</h1>
              <div className="h-2 w-24 bg-red-600 mb-gutter"></div>
            </div>
            
            <form className="space-y-gutter" onSubmit={handleSignup}>
              {/* Full Name */}
              <div className="flex flex-col">
                <label className="font-label-bold text-label-bold uppercase mb-xs text-black" htmlFor="full_name">Full Name</label>
                <input 
                  className="w-full border-2 border-black p-sm font-body-md focus:ring-0 focus:border-red-600 bg-white placeholder:text-surface-dim uppercase outline-none transition-colors" 
                  id="full_name" 
                  placeholder="JOHN DOE" 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              {/* Email */}
              <div className="flex flex-col">
                <label className="font-label-bold text-label-bold uppercase mb-xs text-black" htmlFor="identity">Identity (Email)</label>
                <input 
                  className="w-full border-2 border-black p-sm font-body-md focus:ring-0 focus:border-red-600 bg-white placeholder:text-surface-dim uppercase outline-none transition-colors" 
                  id="identity" 
                  placeholder="USER@LOFO.SECURE" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              {/* Password */}
              <div className="flex flex-col">
                <label className="font-label-bold text-label-bold uppercase mb-xs text-black" htmlFor="encrypted_key">Encrypted Key (Password)</label>
                <div className="relative">
                  <input 
                    className="w-full border-2 border-black p-sm font-body-md focus:ring-0 focus:border-red-600 bg-white placeholder:text-surface-dim outline-none transition-colors" 
                    id="encrypted_key" 
                    placeholder="••••••••••••" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-black cursor-pointer">visibility</span>
                </div>
              </div>
              
              {/* CTA Button */}
              <div className="pt-gutter">
                <button 
                  className="w-full bg-[#B11226] text-white font-label-bold text-lg py-gutter px-gutter flex items-center justify-between border-2 border-black hard-shadow active:translate-y-1 active:translate-x-1 active:shadow-none transition-all group disabled:opacity-50" 
                  type="submit"
                  disabled={loading}
                >
                  <span className="uppercase font-extrabold tracking-widest">{loading ? 'Creating...' : 'CREATE SECURE ACCOUNT'}</span>
                  <span className="material-symbols-outlined font-bold group-hover:translate-x-2 transition-transform">arrow_forward</span>
                </button>
              </div>
              
              {/* Secondary Actions */}
              <div className="flex flex-col gap-sm pt-gutter border-t-2 border-surface-container-highest mt-8">
                <p className="font-body-md text-secondary">ALREADY HAVE A SECURED VAULT?</p>
                <Link className="font-label-bold text-black hover:text-red-600 underline decoration-2 underline-offset-4 uppercase inline-flex items-center gap-xs" to="/login">
                  SIGN IN
                  <span className="material-symbols-outlined text-sm">login</span>
                </Link>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
