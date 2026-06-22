import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useStore from '../store/useStore';
import api from '../utils/api';
import Footer from '../components/Footer';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser, setToken, addToast } = useStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      addToast('Please enter both email and password', 'error');
      return;
    }
    
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token, user } = res.data;
      
      setToken(token);
      setUser(user);
      
      addToast(`Welcome back, ${user.name}`, 'success');
      
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="flex min-h-screen flex-col md:flex-row">
        {/* Left Side: Visual & Branding */}
        <section className="relative w-full md:w-1/2 flex items-center justify-center p-md md:p-xl bg-split-gradient overflow-hidden">
          {/* Decorative Element */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #B11226 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
          </div>
          <div className="relative z-10 flex flex-col items-start gap-sm">
            <div className="bg-brand-red text-white p-xs mb-sm">
              <span className="font-display-lg text-display-lg tracking-tighter uppercase leading-none">LOFO</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-white max-w-lg">
              LOST IT? FOUND IT. <span className="text-brand-red">SECURED.</span>
            </h1>
            <p className="font-body-lg text-body-lg text-slate-400 max-w-md mt-sm">
              The world's most advanced proof-of-ownership network for high-value items and personal assets.
            </p>
            <div className="mt-xl flex items-center gap-md">
              <div className="flex -space-x-4">
                <img alt="User profile 1" className="w-12 h-12 rounded-full border-2 border-brand-red object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCax_Zm6Z8GmH-1ibmTUE1L3B2rAsET2mHdeBpLCEg5S-CyHsG2P9k34tuNq1dr_jt0jqClpSyTOi76NxWuNVsRA0rv4TxQ9MXtSL9EMwlwMdZiAq42otBI4YhREV6ESfO0a7j5XoLfu3OULPJ0w13hklSo5nFs6Ce0BwxG3KZi5jTq175Z_nWeJkwbkMu_VfudblO80vjeC7vKVpBVYe4sHmSXBMjIifezIRf79IY1WFpwwo7vOg3bYJNlgQTIIGaqteniD9d1qes"/>
                <img alt="User profile 2" className="w-12 h-12 rounded-full border-2 border-brand-red object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbaWy2ZcggI9dHbqtDwCaJGnM_enyeuDiYlz6mfJ6u2DBilUDJ6jXMkdQsuyGPpE6iys4D-smvMG2CEoJFx6Fe4YWHKreAiP1GBvRKdJRjhEPk5NWbtAXfONjEcfNVwSkZI_PMt4LMUpgTfi4XE3gkOmsCUyn5-TEXjXkjpqYz-wOn9TKS5ZDih3Peu4helpIEgu0YD_JHrECwd2EV8Z8uyPMY8SBpFNad2Iq8dtF90sR5JEcADuP5KiDjI4MJYOY5gAfTuBs7TXo"/>
              </div>
              <div className="text-white font-label-bold text-label-bold uppercase tracking-widest">
                Trusted by 10k+ <br/> Secure Handlers
              </div>
            </div>
          </div>
          {/* Kinetic Background Graphic */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-red opacity-10 rounded-full blur-3xl"></div>
        </section>

        {/* Right Side: Interaction Area */}
        <section className="w-full md:w-1/2 flex items-center justify-center p-md md:p-xl bg-white">
          <div className="w-full max-w-md">
            {/* Toggle Header */}
            <div className="mb-xl">
              <h2 className="font-display-lg text-headline-lg text-on-background tracking-tighter uppercase mb-xs">Command Center</h2>
              <p className="font-body-md text-body-md text-secondary uppercase font-bold tracking-widest">System Authentication Required</p>
            </div>
            
            {/* Form Section */}
            <form className="space-y-gutter" onSubmit={handleLogin}>
              {/* Email Input */}
              <div className="flex flex-col gap-xs">
                <label className="font-label-bold text-label-bold text-on-background uppercase tracking-tight" htmlFor="email">Identity (Email)</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-brand-red transition-colors">
                    <span className="material-symbols-outlined">fingerprint</span>
                  </div>
                  <input 
                    className="w-full pl-12 pr-4 py-4 bg-surface border-2 border-secondary focus:border-brand-red focus:ring-0 transition-all font-body-md text-on-background outline-none" 
                    id="email" 
                    placeholder="agent@lofo.network" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Password Input */}
              <div className="flex flex-col gap-xs">
                <label className="font-label-bold text-label-bold text-on-background uppercase tracking-tight" htmlFor="password">Encrypted Key (Password)</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-brand-red transition-colors">
                    <span className="material-symbols-outlined">lock</span>
                  </div>
                  <input 
                    className="w-full pl-12 pr-4 py-4 bg-surface border-2 border-secondary focus:border-brand-red focus:ring-0 transition-all font-body-md text-on-background outline-none" 
                    id="password" 
                    placeholder="••••••••••••" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex flex-col gap-md pt-sm">
                <button 
                  className="w-full bg-brand-red text-white font-label-bold text-label-bold uppercase py-5 flex items-center justify-center gap-sm hover:bg-black transition-colors active:translate-y-1 disabled:opacity-50" 
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Authenticating...' : 'Authorize Access'}
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
                <div className="flex items-center justify-between font-label-bold text-label-bold uppercase tracking-tight">
                  <a className="text-secondary hover:text-brand-red transition-colors" href="#">Forgot Key?</a>
                  <Link className="text-brand-red hover:underline" to="/signup">Request Account</Link>
                </div>
              </div>
            </form>

            {/* Social/Alternate Access */}
            <div className="mt-xl">
              <div className="relative flex items-center justify-center py-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t-2 border-surface-container-highest"></div></div>
                <span className="relative bg-white px-4 font-label-bold text-label-bold text-secondary uppercase">Secure SSO</span>
              </div>
              <div className="grid grid-cols-2 gap-gutter mt-gutter">
                <button className="flex items-center justify-center gap-xs border-2 border-secondary py-3 font-label-bold text-label-bold uppercase hover:bg-surface-container transition-all">
                  <span className="material-symbols-outlined text-xl">shield</span>
                  Google
                </button>
                <button className="flex items-center justify-center gap-xs border-2 border-secondary py-3 font-label-bold text-label-bold uppercase hover:bg-surface-container transition-all">
                  <span className="material-symbols-outlined text-xl">verified</span>
                  Apple
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
