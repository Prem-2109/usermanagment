import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({ username: '', password: '' });

  // Admin credentials - only this user can access the dashboard
  const ADMIN_USER = {
    username: 'admin',
    password: 'Admin@21'
  };

  const ProceedLogin = (e) => {
    e.preventDefault();

    if (!values.username || !values.password) {
      toast.warning('Please fill in all fields');
      return;
    }

    // Check if logging in as admin
    if (values.username === ADMIN_USER.username && values.password === ADMIN_USER.password) {
      toast.success('Admin login successful');
      sessionStorage.setItem('username', values.username);
      sessionStorage.setItem('isAdmin', 'true');
      navigate('/dashboard');
      return;
    }

    // Access denied for all other users
    toast.error('Access denied. Only admin can login to the system.');
  };


  return (
    <div className="relative min-height-[100vh] flex items-center justify-center bg-slate-50 overflow-hidden p-4 py-12">
      {/* Decorative Orbs */}
      <div className="orb w-[500px] h-[500px] bg-emerald-100 -top-20 -left-20"></div>
      <div className="orb w-[400px] h-[400px] bg-sky-100 -bottom-20 -right-20"></div>

      <div className="w-full max-w-4xl relative z-10">
        <div className="glass rounded-[2.5rem] overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Sidebar/Branding */}
            <div className="bg-emerald-600 p-12 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-10 shadow-xl shadow-emerald-900/10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
                    <path d="M12 7v10" />
                    <path d="M7 12h10" />
                  </svg>
                </div>
                <h1 className="text-4xl font-black tracking-tight mb-6">VitalCare</h1>
                <p className="text-emerald-50/70 text-base leading-relaxed mb-10 max-w-sm">
                  Access your personal health portal to manage checkups, view results, and connect with specialists.
                </p>
                <div className="space-y-6">
                  {[
                    { title: 'Secure Access', desc: 'End-to-end encrypted health records' },
                    { title: 'Live Support', desc: 'Connect with medical assistants' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-[10px] mt-1 shrink-0">✓</div>
                      <div>
                        <h4 className="font-bold text-sm">{item.title}</h4>
                        <p className="text-emerald-100/60 text-xs mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/5 rounded-full pointer-events-none"></div>
            </div>

            {/* Login Form */}
            <div className="p-12 lg:p-16 bg-white/40">
              <div className="mb-12">
                <h2 className="text-3xl font-extrabold text-slate-800">Welcome Back</h2>
                <p className="text-slate-500 mt-2 font-medium">Please enter your credentials</p>
              </div>

              <form className="space-y-7" onSubmit={ProceedLogin}>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1" htmlFor="username">Username</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    </span>
                    <input
                      id="username"
                      type="text"
                      className="input-modern pl-12"
                      placeholder="Username"
                      value={values.username}
                      onChange={e => setValues({ ...values, username: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest" htmlFor="password">Password</label>
                    <a href="#" className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 transition-colors">Forgot Pwd?</a>
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                    </span>
                    <input
                      id="password"
                      type="password"
                      className="input-modern pl-12"
                      placeholder="••••••••"
                      value={values.password}
                      onChange={e => setValues({ ...values, password: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button type="submit" className="btn-premium w-full py-4 text-base group">
                    <span>Sign In to Portal</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                  </button>
                </div>

                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                  <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em] font-bold text-slate-300 bg-transparent px-4">New Patient?</div>
                </div>

                <div className="text-center">
                  <Link to="/register" className="inline-flex items-center text-sm font-bold text-slate-600 hover:text-emerald-600 transition-all group">
                    Create your health account
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-1.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        <footer className="mt-12 text-center text-slate-400 text-xs font-semibold tracking-wide">
          &copy; {new Date().getFullYear()} VitalCare · Secure Clinical Gateway
          <span className="mx-2 opacity-30">|</span>
          v2.4.0
        </footer>
      </div>
    </div>
  );
};

export default Login;
