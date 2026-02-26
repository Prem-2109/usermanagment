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

    // Detect environment
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const apiUrl = isLocalhost
        ? 'http://localhost:3000/user'
        : '/api/users';

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
            // Use localhost API for local, /api/users for Vercel
            console.log('API URL:', apiUrl);

            // Generate username from email prefix
            const username = email.split('@')[0];

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
        <div className="relative min-height-[100vh] flex items-center justify-center bg-slate-50 overflow-hidden p-4 py-12">
            {/* Decorative Orbs */}
            <div className="orb w-[500px] h-[500px] bg-emerald-200 -top-20 -left-20"></div>
            <div className="orb w-[400px] h-[400px] bg-sky-200 -bottom-20 -right-20"></div>

            <div className="w-full max-w-3xl relative z-10">
                <div className="glass rounded-[2rem] overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-5">
                        {/* Sidebar/Branding */}
                        <div className="lg:col-span-2 bg-emerald-600 p-10 text-white flex flex-col justify-between relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-8">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
                                        <path d="M12 7v10" />
                                        <path d="M7 12h10" />
                                    </svg>
                                </div>
                                <h1 className="text-3xl font-extrabold tracking-tight mb-4">VitalCare</h1>
                                <p className="text-emerald-50/80 text-sm leading-relaxed mb-8">
                                    Join our health network and experience premium healthcare services tailored for you.
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        { icon: '✓', text: 'Expert Consultations' },
                                        { icon: '✓', text: 'Personalized Plans' },
                                        { icon: '✓', text: '24/7 Digital Support' }
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-sm font-medium">
                                            <span className="w-5 h-5 bg-white/10 rounded-full flex items-center justify-center text-[10px]">{item.icon}</span>
                                            {item.text}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-12 pt-8 border-t border-white/10 relative z-10">
                                <p className="text-xs text-emerald-100/60">Already registered?</p>
                                <Link to="/login" className="text-white font-bold text-sm hover:underline mt-1 inline-block">Sign in to your dashboard</Link>
                            </div>

                            {/* Decorative background pattern */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20"></div>
                        </div>

                        {/* Form Content */}
                        <div className="lg:col-span-3 p-10 bg-white/40">
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-slate-800">Book Checkup</h2>
                                <p className="text-slate-500 text-sm mt-1">Please provide your details for registration.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1" htmlFor="r-name">Full Name</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                            </span>
                                            <input id="r-name" className="input-modern pl-11" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1" htmlFor="r-email">Email Address</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                                            </span>
                                            <input id="r-email" type="email" className="input-modern pl-11" value={email} onChange={e => setEmail(e.target.value)} placeholder="john@care.com" />
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1" htmlFor="r-phone">Phone</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                            </span>
                                            <input id="r-phone" className="input-modern pl-11" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210" />
                                        </div>
                                    </div>

                                    {/* Country */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1" htmlFor="r-country">Country</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                            </span>
                                            <select id="r-country" className="input-modern pl-11 appearance-none" value={country} onChange={e => setCountry(e.target.value)}>
                                                <option value="india">India</option>
                                                <option value="usa">USA</option>
                                                <option value="singapore">Singapore</option>
                                            </select>
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                                            </span>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div className="md:col-span-2 space-y-1.5">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1" htmlFor="r-address">Medical Notes / Message</label>
                                        <textarea
                                            id="r-address"
                                            className="input-modern min-h-[100px] py-4"
                                            value={address}
                                            onChange={e => setAddress(e.target.value)}
                                            placeholder="Mention any specific concerns or medical history..."
                                        />
                                    </div>

                                    {/* Gender */}
                                    <div className="md:col-span-2 space-y-3">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Gender</label>
                                        <div className="flex gap-4">
                                            {['male', 'female', 'other'].map(g => (
                                                <label key={g} className={`
                                                    flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all duration-300
                                                    ${gender === g ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'}
                                                `}>
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        value={g}
                                                        checked={gender === g}
                                                        onChange={e => setGender(e.target.value)}
                                                        className="hidden"
                                                    />
                                                    <span className="text-sm font-bold capitalize">{g}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button type="submit" className="btn-premium w-full group">
                                        <span>Join the Health Network</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                                    </button>
                                    <p className="text-center text-[10px] text-slate-400 mt-4 px-4 leading-relaxed">
                                        By clicking "Join", you agree to our Terms of Service and Privacy Policy regarding your health data.
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <footer className="mt-8 text-center text-slate-400 text-xs font-medium">
                    &copy; {new Date().getFullYear()} Vitalcare Systems · Secured Healthcare Solutions
                </footer>
            </div>
        </div>
    )
}

export default Register
