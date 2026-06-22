import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-gutter py-xl bg-hero overflow-hidden">
          <div className="absolute top-[22%] left-[10%] floating-icon hidden lg:block" style={{ '--rot': '-15deg' }}>
            <div className="icon-card">
              <img alt="key icon" className="w-14" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7XONrqMfMRc02Vo4S7rb2JpwHl4ZkcTNOGa8t4Q4y_eJg_WikoM-aPPXVQR-Nd6yvaBcgdTyp8E9BRdstKMsI25FzWfY90a-7wF-M1kjXGteCXe8QxYuP3BWP_8e6jZ1fY8JpiaGjO08kzi675yyyQ_QwHA2pfE6SESXvqB4AlF3ow4-WuOianMRDXHVQ3OdSHElSpnjanJDFj4kcvGVPIR1PDQ5rY4oZfKRZ40XSnrcTvwNW5fgKdi50rgKZYa7RjfI8EErh-FU"/>
            </div>
          </div>
          <div className="absolute top-[18%] right-[10%] floating-icon hidden lg:block" style={{ '--rot': '5deg' }}>
            <div className="icon-card">
              <img alt="laptop icon" className="w-20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCf76RiyjkRHrbXxV50GXEZ8ivMfQZyH5fmak-N0QRqduwVbgqEW3QVS2pFg75RxdU-AOEx0HW00gcNzBw-qwO1oJun58bjeWaot0tsmaVliaRmJr-jSJk_HXOqdifP6hU4MqNmNuAVnsqUDI0Sdln6Yp9oe9tMne2yM9VIn5oIKIOjGlSnM9ThVbGAtWx4H_X7Xfp2Guc08PcrK03llQ0rs34fELMMc9qcLzZT3rR06UCffnKNQjMEZG5F2cWiR_8kycKcmqyzz1M"/>
            </div>
          </div>
          <div className="absolute bottom-[20%] left-[5%] floating-icon-delayed hidden lg:block" style={{ '--rot': '-5deg' }}>
            <div className="icon-card">
              <img alt="bag icon" className="w-14" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKxwOFPDf-dnYfmmYS45pueroCUDt5IRF4yBMVYV3X0rO59UnewKif00zVTQv0cyFy1IJj7lt5ijenQAfsIw8XSuye_oFwt17WMokyXdmkedSJ3LPk1AE_zl5A849WWShcwyUEdcbeK5R1DsGx6FLoGXDawhDf12xvuLrLD3iP825C-LRmupKrX3N_3O5atPk2xOE6wYJZRrHIP8I7qidu95r0z2Mn-HqBWsTO9b4Rj9YY_uby0aTfc3YrIOptNf-nvuur26NnvJ4"/>
            </div>
          </div>
          <div className="absolute bottom-[22%] left-[16%] floating-icon hidden lg:block" style={{ '--rot': '0deg' }}>
            <div className="icon-card bg-[#2170e4] border-white">
              <img alt="backpack icon" className="w-10 invert brightness-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAY7zXGt1IgzEkwNTwDUuoIIayyx05aYPE8yOF8sb6rD6SQm9S4dQFRdRjZ56FxoZzR6j-RkHGbAbVKBgKhgz-EGiZgu70tfcAOog8xbwxJBt_R90L_Ep1hBI8RQpWx02-kOKLF8c1XCnlLVHWG6ToBmz8HdfNvLm_5M3-2FKdObma-jYgPaDG5hIo9metwGyQ6-j3APXibThDoLzrmeYvs6LVtAOdFt8jOP0pV7H7sTa2SMWAdtDktaGMUlUqGr_Q3Mr1cwLgDCaE"/>
            </div>
          </div>
          <div className="absolute top-[45%] right-[15%] floating-icon-delayed hidden lg:block" style={{ '--rot': '15deg' }}>
            <div className="icon-card-dark">
              <img alt="glasses icon" className="w-12 invert" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUcy75VXRDBrS1OnQhb4KxBLIh-hC_Cz6D1_f474_xpGiZSW99SQcasHtSGLqjsKcytEoe4XWm-UChD20Q9oAkgdSZgRsRBuC20VJCOQ3yNrhfPb4bAvMBqkrmdX9yc8wl1CcM3UDvRNVdKsnKCL45qMQlL7zaU_LTreTgLr2p0NdEh24f_D8CtOTQ9DVhQXw4mnvQ4HjJcusYdtN0HCD0OkrhuhhJhthKJm_XMFPLp7Tpdh-P9ZT_RYhRGFg-D5P7qQDZEf5MZvA"/>
            </div>
          </div>
          <div className="absolute bottom-[10%] right-[12%] floating-icon hidden lg:block" style={{ '--rot': '-10deg' }}>
            <div className="icon-card-dark">
              <img alt="phone icon" className="w-10 invert" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAslC00gLCSBj6zEcW3pKN6McPJeKTVYHETlI65Nn_OQBzy3XPLUoaAiG3ExwuNV5uJ0UdiUmc141tR6o7bpcgnlB_vOftcf7OsdIO87VHXUxaNjah2Qmbmu0O4hYl1LkYMbGjxh0l6GPvuYhngLdq0-skLy-9lKOO35xsUbeMCvfm9o7iqE5JXdXwqiAMUk9jevBwOBzAYr8Utsrh5SWZHML6OJeyWD-NGJjl3Zc3f8QyEDY-USA2Hvs5C6O2wg7KOE6b-ZFc0ces"/>
            </div>
          </div>
          <div className="z-10 max-w-5xl mx-auto flex flex-col items-center">
            <h1 className="font-display-xl text-[90px] md:text-[140px] hero-title uppercase mb-2 tracking-tighter leading-[0.85] flex flex-col items-center font-black">
              <span>LOST IT?</span>
              <span>FOUND IT.</span>
              <span>PROVE IT.</span>
              <span className="text-[#B11226] lofo-italic drop-shadow-sm">LOFO.</span>
            </h1>
            <p className="font-body-md text-[#424754] mt-10 mb-14 max-w-xl mx-auto tracking-tight font-medium opacity-90 leading-relaxed">
              The world's most precise proof-based lost and found system. Every claim verified. Every item recovered.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center w-full">
              <Link to="/report" className="w-[260px] flex justify-center items-center bg-[#B11226] text-white py-6 px-10 font-inter font-black text-xl uppercase tracking-widest transition-all border-2 border-[#111111] hard-shadow hover:-translate-y-1 hover:brightness-110 active:translate-y-0.5 active:shadow-none">
                REPORT ITEM
              </Link>
              <Link to="/discover" className="w-[260px] flex justify-center items-center bg-white text-[#111111] border-2 border-[#111111] py-6 px-10 font-inter font-black text-xl uppercase tracking-widest transition-all hard-shadow hover:-translate-y-1 hover:bg-[#111111] hover:text-white active:translate-y-0.5 active:shadow-none">
                BROWSE ITEMS
              </Link>
            </div>
          </div>
        </section>

        {/* Secure Proof Section */}
        <section className="dark-gradient py-xl px-gutter text-white relative border-y-2 border-[#111111]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-20 border-b-4 border-[#B11226]/30 pb-12">
              <div>
                <h2 className="font-display-lg text-6xl md:text-8xl uppercase leading-[0.9] tracking-tighter font-black">SECURE PROOF<br/>SYSTEMS</h2>
                <p className="font-body-lg text-slate-400 mt-6 max-w-xl opacity-80">
                  Traditional lost and found relies on honesty. LOFO relies on cryptographic proof and multi-factor ownership verification.
                </p>
              </div>
              <div className="hidden lg:block text-right">
                <span className="text-9xl font-black text-[#B11226]/40 leading-none">01/03</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
              <div className="md:col-span-8 bg-white text-[#111111] p-16 flex flex-col justify-between min-h-[480px] border-2 border-[#111111] hard-shadow relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rotate-45 translate-x-16 -translate-y-16 group-hover:bg-[#B11226]/5 transition-colors"></div>
                <span className="material-symbols-outlined text-7xl text-[#B11226] font-bold">verified</span>
                <div className="relative z-10">
                  <h3 className="font-display-lg text-5xl uppercase mb-6 tracking-tight font-black">IDENTITY ANCHOR</h3>
                  <p className="font-body-lg text-slate-600 max-w-2xl leading-relaxed">
                    Every claim requires a government-verified identity token. No anonymous claiming, no fraud, complete accountability for every found item.
                  </p>
                </div>
              </div>
              <div className="md:col-span-4 bg-[#B11226] p-10 flex flex-col justify-center items-center text-center border-2 border-[#111111] hard-shadow kinetic-hover">
                <div className="bg-white text-[#B11226] p-8 mb-8 border-2 border-[#111111]">
                  <span className="material-symbols-outlined text-7xl">photo_camera</span>
                </div>
                <h3 className="font-display-lg text-4xl uppercase text-white mb-6 font-black leading-tight">VISUAL DNA</h3>
                <p className="font-body-md text-white/90 leading-relaxed font-medium">
                  Proprietary computer vision compares unique wear patterns and serial numbers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Marquee */}
        <section className="py-14 bg-white overflow-hidden whitespace-nowrap border-b-8 border-[#111111]">
          <div className="flex animate-marquee gap-16 items-center">
            <span className="font-display-lg text-7xl uppercase text-[#111111] tracking-tighter font-black">99.8% RECOVERY RATE</span>
            <span className="text-[#B11226] text-7xl">•</span>
            <span className="font-display-lg text-7xl uppercase text-[#111111] tracking-tighter font-black">12.4M ITEMS PROVEN</span>
            <span className="text-[#B11226] text-7xl">•</span>
            <span className="font-display-lg text-7xl uppercase text-[#111111] tracking-tighter font-black">GLOBAL PROOF NETWORK</span>
            <span className="text-[#B11226] text-7xl">•</span>
            <span className="font-display-lg text-7xl uppercase text-[#111111] tracking-tighter font-black">ZERO FRAUD GUARANTEE</span>
            <span className="text-[#B11226] text-7xl">•</span>
            <span className="font-display-lg text-7xl uppercase text-[#111111] tracking-tighter font-black">99.8% RECOVERY RATE</span>
          </div>
        </section>

        {/* Active Items Stream */}
        <section className="py-xl px-gutter bg-[#f0f2f5]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20">
              <h2 className="font-display-lg text-7xl md:text-9xl uppercase text-[#111111] leading-[0.85] tracking-tighter font-black">LATEST<br/><span className="text-[#B11226]">RECOVERIES</span></h2>
              <div className="flex gap-4 mb-2">
                <button className="bg-[#111111] text-white p-6 border-2 border-[#111111] hover:bg-[#B11226] transition-colors active:translate-y-1">
                  <span className="material-symbols-outlined text-3xl">arrow_back</span>
                </button>
                <button className="bg-[#111111] text-white p-6 border-2 border-[#111111] hover:bg-[#B11226] transition-colors active:translate-y-1">
                  <span className="material-symbols-outlined text-3xl">arrow_forward</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="bg-white border-2 border-[#111111] hard-shadow group cursor-pointer overflow-hidden kinetic-hover">
                <div className="h-96 relative overflow-hidden bg-[#000]">
                  <img alt="MacBook Pro 16" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBenl1NNO8EQ_gaYSj661uLX24pveJKqPpeIt5O3upY63TVKWPxn-AUEq8QuKpbeh9D9AC3lAl0pZPHSl4C7XRvhUQY9lHX8DQyvqUKFHxoBsbUQi-Rv3drfn7lMtu81LO4rN2LOLHvfVPJEhKkXYxkcl1n-MkG6hjUzTJ_5jM5GCEfXq_Znv1FN2Fy48GhhqRjJw5lDYAcTfpWS7ep0adOIe5N9bsGzsCegETwfDYn9CxDslDzdcnfzqHS3QqUHUIKNFy9gXiVZNw"/>
                  <div className="absolute top-6 left-6 bg-[#B11226] text-white px-4 py-1.5 font-inter font-black uppercase text-xs tracking-widest border border-[#111111]">Awaiting Proof</div>
                </div>
                <div className="p-10">
                  <h4 className="font-display-lg text-4xl uppercase mb-3 font-black tracking-tight">MacBook Pro 16"</h4>
                  <div className="flex items-center gap-2 text-slate-500 mb-8 font-inter font-bold text-xs uppercase tracking-wider">
                    <span className="material-symbols-outlined text-lg">location_on</span>
                    Central Station, Berlin
                  </div>
                  <Link to="/claims/1" className="w-full py-5 flex justify-center border-2 border-[#111111] font-inter font-black uppercase tracking-widest hover:bg-[#111111] hover:text-white transition-all text-sm">Submit Claim</Link>
                </div>
              </div>
              <div className="bg-white border-2 border-[#111111] hard-shadow group cursor-pointer overflow-hidden kinetic-hover">
                <div className="h-96 relative overflow-hidden bg-slate-100">
                  <img alt="Ray-Ban Aviators" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBopwnnTjyeJm2BdwghFOr2tuEPjm4iMcZ0-X4QyXX6LSnhj5DnCgKkE9Qrla5S1g7i4FCOZGAYBmQQZy4RYJH7DIOgjpt-hk4LUccYr8c-Tw3aTRq_zrR34f_WZztgMyYA-Q138T7QAXLr-jHE4aOiNhNjmWvEgIqCT-WccBCR9ddUK9PIVByQPkItwbpgsRmdWZY8TcW0JK1pJcxzUM5twVyvsFFb6ytT--xWAGvDHc2R-688ILZDUExQMb0pVvWZqQZ-gYgfMAo"/>
                  <div className="absolute top-6 left-6 bg-green-600 text-white px-4 py-1.5 font-inter font-black uppercase text-xs tracking-widest border border-[#111111]">Identified</div>
                </div>
                <div className="p-10">
                  <h4 className="font-display-lg text-4xl uppercase mb-3 font-black tracking-tight">Ray-Ban Aviators</h4>
                  <div className="flex items-center gap-2 text-slate-500 mb-8 font-inter font-bold text-xs uppercase tracking-wider">
                    <span className="material-symbols-outlined text-lg">location_on</span>
                    Sky Lounge, Dubai
                  </div>
                  <Link to="/claims/2" className="w-full py-5 flex justify-center border-2 border-[#111111] font-inter font-black uppercase tracking-widest hover:bg-[#111111] hover:text-white transition-all text-sm">Verify Ownership</Link>
                </div>
              </div>
              <div className="bg-white border-2 border-[#111111] hard-shadow group cursor-pointer overflow-hidden kinetic-hover">
                <div className="h-96 relative overflow-hidden bg-slate-200">
                  <img alt="House Key Set" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBH8kLDTk9EqTlvFG_bWeol0zIDcKzFGdIj_iVAaV-7UiG219xh8nmC0EANEzgb0_bxE6uDC1_GE-fncnDs77A2zjH2qcbpSbWk6t30WygOLAcFu8rxvQXVyuu78LvkGyKyVlFjguDmlIEHRuv6ADvjbP324lmOYdscgf4jXnzJNdU98J5DwDifFBtcSszQalnXWtnldetpzBEChA98p36uOQp9F-0wt5kqcdCOuJf9V3LUcURJAp6aH8jpNbU8vGWgwp10DFS0wV0"/>
                  <div className="absolute top-6 left-6 bg-[#111111] text-white px-4 py-1.5 font-inter font-black uppercase text-xs tracking-widest border border-white">Safe Custody</div>
                </div>
                <div className="p-10">
                  <h4 className="font-display-lg text-4xl uppercase mb-3 font-black tracking-tight">House Key Set</h4>
                  <div className="flex items-center gap-2 text-slate-500 mb-8 font-inter font-bold text-xs uppercase tracking-wider">
                    <span className="material-symbols-outlined text-lg">location_on</span>
                    Grand Hotel, NYC
                  </div>
                  <Link to="/claims/3" className="w-full py-5 flex justify-center border-2 border-[#111111] font-inter font-black uppercase tracking-widest hover:bg-[#111111] hover:text-white transition-all text-sm">Recover Now</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#B11226] py-32 text-center px-gutter border-b-8 border-[#111111] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0px, #000 2px, transparent 2px, transparent 20px)' }}></div>
          <div className="max-w-5xl mx-auto relative z-10">
            <h2 className="font-display-xl text-6xl md:text-9xl text-white uppercase mb-10 leading-none tracking-tighter font-black drop-shadow-lg">YOUR PROPERTY IS WAITING.</h2>
            <p className="font-display-lg text-2xl md:text-4xl text-white/90 uppercase mb-16 font-bold tracking-tight">Stop searching, start proving. Secure your claim in seconds.</p>
            <div className="flex flex-col md:flex-row gap-10 justify-center">
              <Link to="/signup" className="bg-[#111111] text-white px-20 py-8 font-inter font-black text-2xl uppercase border-4 border-[#111111] hard-shadow transition-all hover:-translate-y-2 hover:bg-white hover:text-[#111111] active:translate-y-0 active:shadow-none">
                GET STARTED
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
