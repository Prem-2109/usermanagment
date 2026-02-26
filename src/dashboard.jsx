import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Detect environment - use localhost API locally, Vercel API in production
    const isLocalhost = typeof window !== 'undefined' &&
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    const apiUrl = isLocalhost ? 'http://localhost:3000/user' : '/api/users';

    useEffect(() => {
        const username = sessionStorage.getItem('username');
        if (!username) {
            toast.warning('Please login to access the dashboard');
            navigate('/login');
            return;
        }

        fetchAllUsers();
    }, [navigate]);

    const fetchAllUsers = () => {
        setLoading(true);
        console.log('Fetching from:', apiUrl);
        fetch(apiUrl)
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch user records');
                return res.json();
            })
            .then((data) => {
                console.log('Users data:', data);
                setUserList(data);
            })
            .catch((err) => {
                toast.error('Error loading user data: ' + err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-slate-50 overflow-hidden font-sans">
            {/* Background Decorations */}
            <div className="orb w-[600px] h-[600px] bg-emerald-100 -top-40 -right-20"></div>
            <div className="orb w-[500px] h-[500px] bg-sky-100 -bottom-40 -left-20"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-emerald-600 rounded-[1.25rem] flex items-center justify-center shadow-lg shadow-emerald-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
                                <path d="M12 7v10" />
                                <path d="M7 12h10" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-slate-800 tracking-tight">Patient Portal</h1>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                                <p className="text-slate-500 font-medium text-sm">VitalCare Management System Hub</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link to="/" className="btn-secondary px-6 py-3 rounded-xl border-slate-200 text-slate-600 font-bold hover:bg-white hover:border-emerald-200 hover:text-emerald-600 transition-all flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                            Home
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="btn-premium bg-slate-800 hover:bg-slate-900 border-none px-6 py-3 flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                            Sign Out
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 gap-8">
                    {/* Insights Bar */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { label: 'Total Patients', value: userList.length, color: 'emerald', icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></> },
                            { label: 'System Health', value: 'Active', color: 'sky', icon: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /> },
                            { label: 'Secure Buffer', value: '128-bit', color: 'slate', icon: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></> }
                        ].map((stat, i) => (
                            <div key={i} className="glass p-6 rounded-3xl flex items-center justify-between py-8">
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-slate-400 mb-1">{stat.label}</p>
                                    <h3 className="text-3xl font-black text-slate-800">{stat.value}</h3>
                                </div>
                                <div className={`w-14 h-14 bg-${stat.color}-50 text-${stat.color}-500 rounded-2xl flex items-center justify-center`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{stat.icon}</svg>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Records Table */}
                    <div className="glass rounded-[2rem] overflow-hidden border border-white/40 shadow-2xl">
                        <div className="p-8 border-b border-slate-100/50 bg-white/40 flex items-center justify-between">
                            <h2 className="text-xl font-black text-slate-800 flex items-center gap-3">
                                <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
                                Patient Records
                            </h2>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                                Live Sync Active
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-emerald-600/5 text-emerald-700/70 text-[10px] uppercase tracking-[0.2em] font-black">
                                        <th className="px-8 py-5">Patient ID</th>
                                        <th className="px-8 py-5">Clinical Name</th>
                                        <th className="px-8 py-5">Contact Details</th>
                                        <th className="px-8 py-5">Region</th>
                                        <th className="px-8 py-5">Status / Gender</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 text-slate-700 font-medium">
                                    {userList.length > 0 ? (
                                        userList.map((user, index) => (
                                            <tr key={user.id || index} className="group hover:bg-emerald-50/30 transition-all duration-300">
                                                <td className="px-8 py-6">
                                                    <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 border border-slate-200/50 px-3 py-1.5 rounded-lg">
                                                        #{user.id}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-sm font-black shadow-inner">
                                                            {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                                                        </div>
                                                        <div>
                                                            <p className="font-extrabold text-slate-800 group-hover:text-emerald-700 transition-colors uppercase text-sm tracking-tight">{user.name}</p>
                                                            <p className="text-[10px] text-slate-400 font-bold">REGULAR CHECKUP</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <p className="text-sm font-bold text-slate-600">{user.email}</p>
                                                    <p className="text-[10px] text-slate-400 mt-0.5">{user.phone || 'No Contact Info'}</p>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-1.5">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                                        <span className="text-xs font-black uppercase text-slate-400 tracking-wider font-mono">{user.country}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className={`
                                                        inline-flex items-center px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider
                                                        ${user.gender === 'male' ? 'bg-sky-50 text-sky-600 border border-sky-100' : 'bg-pink-50 text-pink-600 border border-pink-100'}
                                                    `}>
                                                        {user.gender}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-8 py-20 text-center">
                                                <div className="flex flex-col items-center gap-4">
                                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                                                    </div>
                                                    <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No active patient records found</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-8 bg-slate-50/50 border-t border-slate-100/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                Displaying {userList.length} global entities from VitalCare database
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-sky-400 rounded-full"></span>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">v2.4.0 Engine</p>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="mt-12 flex flex-col md:flex-row md:items-center justify-between text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
                    <p>&copy; {new Date().getFullYear()} VitalCare Clinical Services</p>
                    <p>Secured via 256-bit Healthcare Standard Encryption</p>
                </footer>
            </div>
        </div>
    );
};

export default Dashboard
