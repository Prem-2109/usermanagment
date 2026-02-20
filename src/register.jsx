import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('india');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('male');
    const navigate = useNavigate();

    const Isvalidate = () => {
        let isproceed = true;
        let msg = 'Please enter value for: ';
        if (!name) { isproceed = false; msg += 'Full Name '; }
        if (!email) { isproceed = false; msg += 'Email'; }
        if (!isproceed) {
            toast.warning(msg);
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            toast.warning('Please enter a valid email');
            isproceed = false;
        }
        return isproceed;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Isvalidate()) {
            // Use environment variable for API URL
            // For localhost: http://localhost:3000/user (from .env.development)
            // For Vercel: /api/users (from .env.production)
            const apiUrl = import.meta.env.VITE_API_URL || '/api/users';
            
            // Generate username from email prefix
            const username = email.split('@')[0];
            
            console.log('API URL:', apiUrl);
            
            fetch(apiUrl, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ username, name, email, phone, country, address, gender })
            })
                .then(res => {
                    const status = res.status;
                    console.log('Response status:', status);
                    return res.json().then(data => ({ status, data })).catch(() => ({ status, data: { success: false, message: 'Invalid response' } }));
                })
                .then(({ status, data }) => {
                    console.log('Response data:', data);
                    // Handle both json-server (201 with user object) and Vercel API (success: true)
                    const isJsonServer = data && data.username && !data.success;
                    if (status === 201 || isJsonServer) {
                        toast.success('Registered Successfully');
                        navigate('/login');
                    } else if (data.success === true || data.success === 'true') {
                        toast.success(data.message || 'Registered Successfully');
                        navigate('/login');
                    } else {
                        toast.error(data.message || 'Registration failed');
                    }
                })
                .catch((err) => {
                    console.error('Fetch error:', err);
                    toast.error('Failed: ' + err.message);
                });
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            className="bg-gradient-to-br from-sky-100 via-white to-indigo-100 p-4 py-10"
        >
            <div className="w-full max-w-2xl">
                <div className="glass rounded-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-sky-500 px-8 py-6 text-center">
                        <h1 className="text-2xl font-bold text-white tracking-tight">Create an Account</h1>
                        <p className="mt-1 text-sky-100 text-sm">Book your check-up today and take the first step toward better health.</p>
                    </div>

                    {/* Form */}
                    <div className="px-8 py-8">
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="r-name">
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <input id="r-name" className="input-modern" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="r-email">
                                        Email Address <span className="text-red-500">*</span>
                                    </label>
                                    <input id="r-email" type="email" className="input-modern" value={email} onChange={e => setEmail(e.target.value)} placeholder="john@example.com" />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="r-phone">
                                        Phone Number
                                    </label>
                                    <input id="r-phone" className="input-modern" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210" />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="r-country">
                                        Country <span className="text-red-500">*</span>
                                    </label>
                                    <select id="r-country" className="input-modern" value={country} onChange={e => setCountry(e.target.value)}>
                                        <option value="india">India</option>
                                        <option value="usa">USA</option>
                                        <option value="singapore">Singapore</option>
                                    </select>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="r-address">
                                        Message
                                    </label>
                                    <textarea
                                        id="r-address"
                                        className="input-modern"
                                        style={{ minHeight: '90px', resize: 'vertical' }}
                                        value={address}
                                        onChange={e => setAddress(e.target.value)}
                                        placeholder="Enter your message"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Gender</label>
                                    <div className="flex gap-6">
                                        {['male', 'female'].map(g => (
                                            <label key={g} className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value={g}
                                                    checked={gender === g}
                                                    onChange={e => setGender(e.target.value)}
                                                    className="w-4 h-4 accent-sky-500"
                                                />
                                                <span className="text-sm text-slate-600 font-medium capitalize">{g}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-slate-100">
                                <button type="submit" className="btn-primary flex-1">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <p className="text-center text-xs text-slate-400 mt-6">
                    © {new Date().getFullYear()} LoginApp · All rights reserved
                </p>
            </div>
        </div>
    )
}

export default Register
