import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const username = sessionStorage.getItem('username');
    if (!username) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <div className="relative min-h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Background Decorations */}
      <div className="orb w-[600px] h-[600px] bg-emerald-100 -top-40 -left-20"></div>
      <div className="orb w-[500px] h-[500px] bg-sky-100 -bottom-40 -right-20"></div>

      {/* Navbar */}
      <nav className="relative z-20 px-8 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center glass rounded-2xl px-6 py-4 border-white/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
                <path d="M12 7v10" />
                <path d="M7 12h10" />
              </svg>
            </div>
            <span className="text-xl font-black text-slate-800 tracking-tight">VitalCare</span>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={handleLogout}
              className="group flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-red-600 transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-red-50 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-12 text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-6 animate-fade-in">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700">Patient Verification Active</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-8">
              Your Premium <br />
              <span className="text-emerald-600">Health Gateway</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-slate-500 font-medium leading-relaxed mb-10">
              Welcome to VitalCare. You are now securely connected to our advanced clinical management system. Manage your records and portal preferences from one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="btn-premium px-10 py-4 text-base group"
                onClick={() => navigate('/dashboard')}
              >
                <span>Access Management Portal</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
              <button
                className="btn-secondary px-10 py-4 rounded-xl font-bold bg-white/50 backdrop-blur-md border-white/80 hover:bg-white hover:border-emerald-300 transition-all flex items-center justify-center gap-2"
                onClick={handleLogout}
              >
                Sign Out Securely
              </button>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '👤', title: 'Portal Profile', desc: 'Securely manage your personal clinical identification and preferences.', color: 'emerald' },
              { icon: '🔒', title: 'Data Security', desc: 'Enterprise-grade encryption protecting your medical records 24/7.', color: 'sky' },
              { icon: '⚙️', title: 'Interface Settings', desc: 'Customize your clinical dashboard experience for maximum efficiency.', color: 'slate' },
            ].map((card, i) => (
              <div
                key={card.title}
                className="glass p-8 rounded-[2rem] hover:-translate-y-2 transition-all duration-500 cursor-pointer group"
                onClick={() => navigate('/dashboard')}
              >
                <div className={`w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-xl shadow-slate-200/50 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300`}>
                  {card.icon}
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-2 tracking-tight group-hover:text-emerald-600 transition-colors uppercase text-sm">{card.title}</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer Decoration */}
      <footer className="mt-20 border-t border-slate-100 pt-8 pb-12 text-center relative z-10 px-8">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-4">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
            &copy; {new Date().getFullYear()} VitalCare Clinical Hub · Platinum Edition
          </p>
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400 opacity-60">
            <span>Terms</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
            <span>Privacy</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
            <span>v2.4.0 Live</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home
