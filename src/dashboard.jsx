import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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
        fetch('http://localhost:3000/user')
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch user records');
                return res.json();
            })
            .then((data) => {
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
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-slate-50 to-indigo-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">User Management</h1>
                        <p className="text-slate-500 mt-1">Viewing all registered user records</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link to="/" className="btn-secondary">
                            Back to Home
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Sign Out
                        </button>
                    </div>
                </div>

                {/* Users Table */}
                <div className="glass rounded-3xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-sky-500 text-white text-sm uppercase tracking-wider font-bold">
                                    <th className="px-6 py-4">User ID</th>
                                    <th className="px-6 py-4">Full Name</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">Phone</th>
                                    <th className="px-6 py-4">Country</th>
                                    <th className="px-6 py-4">Gender</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {userList.length > 0 ? (
                                    userList.map((user, index) => (
                                        <tr key={user.id || index} className="bg-white/40 hover:bg-white/80 transition-colors group">
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded">
                                                    #{user.id}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-sky-100 text-sky-600 rounded-lg flex items-center justify-center text-xs font-bold">
                                                        {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                                                    </div>
                                                    <span className="text-slate-800 font-semibold group-hover:text-sky-600 transition-colors">
                                                        {user.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600 text-sm italic">{user.email}</td>
                                            <td className="px-6 py-4 text-slate-600 text-sm">{user.phone || 'N/A'}</td>
                                            <td className="px-6 py-4 capitalize">
                                                <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded">
                                                    {user.country}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.gender === 'male' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
                                                    }`}>
                                                    {user.gender}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-slate-400 italic bg-white/40">
                                            No user records found in the system.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-between text-xs text-slate-400">
                    <p>Total logged records: {userList.length}</p>
                    <p>Last updated: {new Date().toLocaleTimeString()}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
