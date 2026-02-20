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
    <div style={{ minHeight: '100vh' }}
      className="bg-gradient-to-br from-sky-100 via-white to-indigo-100"
    >
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-100 px-6 py-4" style={{ boxShadow: '0 1px 12px rgba(0,0,0,0.06)' }}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-sky-500 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-slate-800">LoginApp</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-red-500 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </nav>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Welcome card */}
        <div className="glass rounded-3xl p-12 text-center">
          <div className="w-20 h-20 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Welcome Home! 🎉</h1>
          <p className="mt-4 text-slate-500 text-base max-w-lg mx-auto leading-relaxed">
            You're successfully signed in. This is your personal dashboard.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button className="btn-primary" onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
            <button className="btn-secondary" onClick={handleLogout}>Sign Out</button>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          {[
            { icon: '👤', title: 'Profile', desc: 'Manage your personal details and preferences.' },
            { icon: '🔒', title: 'Security', desc: 'Update your password and security settings.' },
            { icon: '⚙️', title: 'Settings', desc: 'Customize your app experience and notifications.' },
          ].map((card) => (
            <div key={card.title} className="glass rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:scale-105"
              onClick={() => navigate('/dashboard')}
              style={{ transition: 'transform 0.2s, box-shadow 0.2s' }}>
              <div className="text-3xl mb-3">{card.icon}</div>
              <h3 className="font-bold text-slate-800 text-base">{card.title}</h3>
              <p className="text-slate-500 text-sm mt-1">{card.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home
