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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      className="bg-gradient-to-br from-sky-100 via-white to-indigo-100 p-4"
    >
      <div className="w-full max-w-md">
        <div className="glass rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-sky-500 px-8 pt-10 pb-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h1>
            <p className="mt-2 text-sky-100 text-sm">Sign in to your account to continue</p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            <form className="space-y-5" onSubmit={ProceedLogin}>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="username">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  id="username"
                  type="text"
                  className="input-modern"
                  placeholder="Enter your username"
                  value={values.username}
                  onChange={e => setValues({ ...values, username: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="password">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  id="password"
                  type="password"
                  className="input-modern"
                  placeholder="••••••••"
                  value={values.password}
                  onChange={e => setValues({ ...values, password: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="btn-primary w-full mt-2">
                Sign In
              </button>

              <div className="flex items-center gap-3 my-2">
                <div className="flex-1 border-t border-slate-200"></div>
                <span className="text-xs text-slate-400 uppercase tracking-widest">or</span>
                <div className="flex-1 border-t border-slate-200"></div>
              </div>

              <p className="text-center text-sm text-slate-500">
                Don't have an account?{' '}
                <Link to="/register" className="text-sky-600 font-bold hover:text-sky-700 hover:underline transition-colors">
                  Sign up free
                </Link>
              </p>
            </form>
          </div>
        </div>
        <p className="text-center text-xs text-slate-400 mt-6">
          © {new Date().getFullYear()} LoginApp · All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Login;
