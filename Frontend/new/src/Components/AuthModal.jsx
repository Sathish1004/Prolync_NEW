import React, { useState } from 'react';
import { X, Check, Eye, EyeOff, ArrowLeft, ArrowRight } from 'lucide-react';
import loginIllustration from '../assets/login_illustration.png';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const role = 'user'; // Hardcode strictly to user
  const [showPassword, setShowPassword] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  // Signup Form State
  const [formData, setFormData] = useState({
     name: '',
     email: '',
     password: '',
     confirmPassword: '',
     phone: '',
  });

  const handleChange = (e) => {
     setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmailAuth = async (e) => {
     e.preventDefault();
     
     const apiBase = 'http://localhost:5001/api';
     let endpoint = '';
     let payload = {};

     if (!isLogin) {
         // --- SIGNUP LOGIC ---
         if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match"); return;
         }
         
         endpoint = `${apiBase}/user/register`; 
         payload = {
             full_name: formData.name,
             email: formData.email,
             password: formData.password,
             confirm_password: formData.confirmPassword,
             phone: formData.phone
         };

        try {
            const res = await axios.post(endpoint, payload);
            
            if (res.status === 201 || res.data.message.includes("Success")) {
                alert("Signup Success");
                setIsLogin(true); 
                setFormData({ ...formData, password: '', confirmPassword: ''});
            } else {
                 alert(res.data.message);
            }

         } catch (error) {
             console.error("Signup Error:", error);
             alert(error.response?.data?.message || "Signup Failed");
         }

     } else {
         // --- LOGIN LOGIC ---
         endpoint = `${apiBase}/user/login`;

         try {
             const res = await axios.post(endpoint, {
                 email: formData.email,
                 password: formData.password
             });
             
             if (res.status === 200) {
                 localStorage.setItem('token', res.data.token);
                 localStorage.setItem('user', JSON.stringify(res.data.user)); // Save user info
                 
                 if (onLoginSuccess) onLoginSuccess();
                 else onClose(); 
             } else {
                 alert(res.data.message);
             }

         } catch(error) {
             console.error("Login Failed", error);
             alert(error.response?.data?.message || "Login Failed");
         }
     }
  };

  // Google Login Hook
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
        // ... existing google logic 
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
            
            {verificationSent ? (
               <div className="text-center animate-fade-in-up">
                   {/* Verification Sent UI would go here if needed */}
               </div>
            ) : (
             <>
                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        {isLogin ? 'Login' : 'Sign Up'}
                    </h2>
                </div>

                {/* Form */}
                <form className="space-y-4" onSubmit={handleEmailAuth}>
                
                {!isLogin && (
                    <div className="animate-fade-in-up">
                        <label className="block text-xs font-bold text-gray-700 mb-1 ml-1 uppercase tracking-wide">
                            Full Name
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

                {!isLogin && (
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

                <div className="relative flex py-5 items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink-0 mx-4 text-gray-400 text-xs">OR</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <button 
                    type="button"
                    onClick={() => window.location.href = "http://localhost:5001/auth/google"}
                    className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 font-bold py-3.5 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                            fill="#EA4335"
                            d="M24 12.276c0-1.084-.09-2.008-.275-2.909H12.21v5.52h6.636c-.287 1.554-1.127 2.853-2.395 3.696v3.072h3.864C22.614 20.064 24 16.273 24 12.276Z"
                        />
                        <path
                            fill="#34A853"
                            d="M12.21 24c3.24 0 5.957-1.063 7.935-2.895l-3.864-3.072c-1.08.729-2.472 1.164-4.071 1.164-3.141 0-5.805-2.124-6.756-4.992H1.47v3.084C3.477 21.084 7.575 24 12.21 24Z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.454 14.205c-.244-.729-.381-1.503-.381-2.205s.138-1.476.381-2.205V6.711H1.47C.528 8.448 0 10.323 0 12.276s.528 3.828 1.47 5.565l3.984-3.636Z"
                        />
                        <path
                            fill="#4285F4"
                            d="M12.21 4.764c1.761 0 3.321.603 4.569 1.776l3.414-3.468C18.156 1.119 15.441 0 12.21 0 7.575 0 3.477 2.916 1.47 6.711l3.984 3.636c.951-2.868 3.615-4.992 6.756-4.992Z"
                        />
                    </svg>
                    Continue with Google
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
