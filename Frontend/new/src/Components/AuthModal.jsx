import React, { useState } from 'react';
import { X, Check, Eye, EyeOff, ArrowLeft, ArrowRight } from 'lucide-react';
import loginIllustration from '../assets/login_illustration.png';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('user'); // 'user', 'lecturer', 'admin'
  const [showPassword, setShowPassword] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  // Signup Form State
  const [formData, setFormData] = useState({
     name: '',
     email: '',
     password: '',
     confirmPassword: '',
     phone: '',
     expertise: '', // For Lecturer
  });

  const handleChange = (e) => {
     setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmailAuth = async (e) => {
     e.preventDefault();
     
     const apiBase = 'http://localhost:5000/api';
     let endpoint = '';
     let payload = {};

     if (!isLogin) {
         // --- SIGNUP LOGIC ---
         if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match"); return;
         }
         
         if (role === 'user') {
             endpoint = `${apiBase}/user/register`; // or /register if keeping legacy
             // Important: user explicit request said /api/user/register 
             // But my app.js mounts user routes at /api/user (which points to auth.routes.js containing /register)
             // So final path is /api/user/register
             payload = {
                 full_name: formData.name,
                 email: formData.email,
                 password: formData.password,
                 confirm_password: formData.confirmPassword,
                 phone: formData.phone
             };
         } else if (role === 'lecturer') {
             endpoint = `${apiBase}/lecturer/register`;
             payload = {
                 full_name: formData.name,
                 email: formData.email,
                 password: formData.password,
                 expertise: formData.expertise
             };
         } else if (role === 'admin') {
             // User Request: If trying to "Register" as Admin with valid credentials, just Log In.
             // We treat Admin Signup as Login for the Seeded Admin.
             endpoint = `${apiBase}/admin/login`;
             
             try {
                 const res = await axios.post(endpoint, {
                     email: formData.email,
                     password: formData.password
                 });
                 
                 if (res.status === 200 || res.data.token) {
                     alert("Admin Login Success");
                     localStorage.setItem('token', res.data.token);
                     localStorage.setItem('user', JSON.stringify(res.data.user));
                     onClose();
                     window.location.reload();
                     return; 
                 }
             } catch (e) {
                 // Log detailed error for debugging
                 // If specific mismatch, show cleaner error
                 if (e.response?.status === 400 || e.response?.status === 401) {
                    alert("Invalid Admin Credentials. Please check your password.");
                 } else {
                    const errorMsg = e.response?.data?.message || e.message || "Unknown Error";
                    alert(`Admin Access Error: ${errorMsg}`);
                 }
                 return;
             }
         }

        try {
            const res = await axios.post(endpoint, payload);
            
            // Check for success (message might vary slightly by controller)
            if (res.status === 201 || res.data.message.includes("Success")) {
                alert(`${role.charAt(0).toUpperCase() + role.slice(1)} Signup Success`);
                setIsLogin(true); 
                setFormData({ ...formData, password: '', confirmPassword: ''});
            } else {
                 alert(res.data.message);
            }

         } catch (error) {
             console.error("Signup Error:", error);
             if (error.response) {
                 alert(`Server Error: ${error.response.status} - ${error.response.data.message || JSON.stringify(error.response.data)}`);
             } else if (error.request) {
                 alert("Network Error: No response from server. Check port 5000.");
             } else {
                 alert(`Error: ${error.message}`);
             }
         }

     } else {
         // --- LOGIN LOGIC ---
         if (role === 'user') endpoint = `${apiBase}/user/login`;
         if (role === 'lecturer') endpoint = `${apiBase}/lecturer/login`;
         if (role === 'admin') endpoint = `${apiBase}/admin/login`;

         try {
             const res = await axios.post(endpoint, {
                 email: formData.email,
                 password: formData.password
             });
             
             if (res.status === 200) {
                 alert("Login Success");
                 
                 // Save to localStorage
                 localStorage.setItem('token', res.data.token);
                 localStorage.setItem('user', JSON.stringify(res.data.user)); // Save user info
                 
                 onClose();
                 window.location.reload(); 
             } else {
                 alert(res.data.message);
             }

         } catch(error) {
             console.error("Login Failed", error);
             alert(error.response?.data?.message || "Login Failed");
         }
     }
  };

  // Google Login Hook (Keep as is, mostly for Users)
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
        // ... existing google logic (assuming it defaults to user role)
    },
    onError: () => console.error("Google Login Failed"),
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-[1100px] h-[650px] bg-white rounded-3xl shadow-2xl flex overflow-hidden">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-gray-100/50 hover:bg-gray-200 rounded-full text-gray-600 hover:text-gray-900 transition"
        >
          <X size={20} />
        </button>

        {/* LEFT SIDE - Illustration Panel */}
        <div className="hidden lg:flex w-1/2 bg-[#F8FAFC] relative items-center justify-center p-12 overflow-hidden border-r border-gray-100">
             {/* ... (Keep existing illustration code) ... */}
             <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-purple-50 rounded-full blur-3xl opacity-60"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
             </div>
             <div className="relative z-10 w-full flex flex-col items-center justify-center h-full">
                <div className="relative w-full max-w-md aspect-square">
                    <img 
                      src={loginIllustration} 
                      alt="Education Illustration" 
                      className="w-full h-full object-contain hover:scale-[1.02] transition-transform duration-700 drop-shadow-2xl"
                    />
                </div>
             </div>
        </div>

        {/* RIGHT SIDE - Forms */}
        <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center px-8 md:px-16 py-10 overflow-y-auto relative">
            
            {/* Top Toggle */}
            <div className="absolute top-6 right-24 text-sm z-40">
                <span className="text-gray-500">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                </span>
                <button 
                    onClick={() => { setIsLogin(!isLogin); setVerificationSent(false); }}
                    className="ml-2 font-bold text-indigo-600 hover:text-indigo-700 transition"
                >
                    {isLogin ? 'Signup' : 'Login'}
                </button>
            </div>

            <div className="max-w-sm mx-auto w-full pt-8"> 
            
            {/* ROLE TABS */}
            <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
                {['user', 'lecturer', 'admin'].map((r) => (
                    <button
                        key={r}
                        onClick={() => setRole(r)}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg capitalize transition-all ${
                            role === r 
                            ? 'bg-white text-indigo-600 shadow-sm' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        {r}
                    </button>
                ))}
            </div>

            {verificationSent ? (
               <div className="text-center animate-fade-in-up">
                   {/* ... (Keep verification UI) ... */}
               </div>
            ) : (
             <>
                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        {isLogin ? `Login as ${role.charAt(0).toUpperCase() + role.slice(1)}` : `Join as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
                    </h2>
                </div>

                {/* Form */}
                <form className="space-y-4" onSubmit={handleEmailAuth}>
                
                {!isLogin && (
                    <div className="animate-fade-in-up">
                        <label className="block text-xs font-bold text-gray-700 mb-1 ml-1 uppercase tracking-wide">
                            {role === 'lecturer' ? 'Full Name' : 'Full Name'}
                        </label>
                        <input 
                            name="name"
                            type="text" 
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-[#F3F4F6] border border-transparent rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium"
                            placeholder="John Doe"
                        />
                    </div>
                )}
                
                {/* Lecturer Expertise Field */}
                {!isLogin && role === 'lecturer' && (
                    <div className="animate-fade-in-up">
                        <label className="block text-xs font-bold text-gray-700 mb-1 ml-1 uppercase tracking-wide">Expertise</label>
                        <input 
                            name="expertise"
                            type="text" 
                            required
                            value={formData.expertise}
                            onChange={handleChange}
                            className="w-full bg-[#F3F4F6] border border-transparent rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium"
                            placeholder="e.g. Web Development"
                        />
                    </div>
                )}

                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1 ml-1 uppercase tracking-wide">Email Address</label>
                    <input 
                        name="email"
                        type="email" 
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-[#F3F4F6] border border-transparent rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium"
                        placeholder="john@example.com"
                    />
                </div>

                {!isLogin && role === 'user' && (
                    <div className="animate-fade-in-up">
                        <label className="block text-xs font-bold text-gray-700 mb-1 ml-1 uppercase tracking-wide">Phone Number</label>
                        <input 
                            name="phone"
                            type="tel" 
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-[#F3F4F6] border border-transparent rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium"
                            placeholder="+1 234 567 8900"
                        />
                    </div>
                )}

                <div className="relative">
                    <label className="block text-xs font-bold text-gray-700 mb-1 ml-1 uppercase tracking-wide">Password</label>
                    <input 
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full bg-[#F3F4F6] border border-transparent rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium"
                        placeholder="••••••••"
                    />
                    <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-[34px] text-gray-400 hover:text-indigo-600 transition"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>

                {!isLogin && (
                    <div className="relative animate-fade-in-up">
                        <label className="block text-xs font-bold text-gray-700 mb-1 ml-1 uppercase tracking-wide">Confirm Password</label>
                        <input 
                            name="confirmPassword"
                            type="password"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full bg-[#F3F4F6] border border-transparent rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium"
                            placeholder="••••••••"
                        />
                    </div>
                )}
                
                {!isLogin && (
                    <div className="flex items-center gap-2 mt-2" >
                        <input type="checkbox" required className="rounded text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                        <span className="text-xs text-gray-500">I agree to the <a href="#" className="underline hover:text-indigo-600">Terms & Conditions</a></span>
                    </div>
                )}

                <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-[#16A34A] to-[#22C55E] text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-green-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 mt-6 text-sm tracking-wide uppercase"
                >
                    {isLogin ? 'Login' : 'Create Account'}
                </button>

                </form>
             </>
            )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
