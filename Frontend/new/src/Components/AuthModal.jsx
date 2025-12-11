import React, { useState } from 'react';
import { X, Check, Eye, EyeOff, ArrowLeft, ArrowRight } from 'lucide-react';
import loginIllustration from '../assets/login_illustration.png';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  // Signup Form State
  const [formData, setFormData] = useState({
     name: '',
     email: '',
     password: '',
     confirmPassword: '',
  });

  const handleChange = (e) => {
     setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmailAuth = async (e) => {
     e.preventDefault();
     if (!isLogin) {
         // Signup Logic
         if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match"); return;
         }
         
         try {
            const res = await axios.post('http://localhost:8000/api/v1/auth/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            
            // On register success
            setVerificationSent(true);
            setFormData({ ...formData, password: '', confirmPassword: ''});

         } catch (error) {
             console.error("Signup Failed", error);
             alert(error.response?.data?.message || "Signup Failed");
         }

     } else {
         // Login Logic
         try {
             const res = await axios.post('http://localhost:8000/api/v1/auth/login', {
                 email: formData.email,
                 password: formData.password
             });
             
             if (res.data.data.verified) {
                localStorage.setItem('token', res.data.data.token);
                onClose();
                window.location.reload(); 
             } else {
                 setVerificationSent(true); 
                 alert("Please verify your email first.");
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
      try {
        const res = await axios.post('http://localhost:8000/api/v1/auth/google', {
          token: tokenResponse.credential || tokenResponse.access_token 
        });

        if (res.data.data.verified) {
           localStorage.setItem('token', res.data.data.token);
           onClose();
           window.location.reload(); 
        } else {
           setVerificationSent(true);
        }

      } catch (error) {
        console.error("Login Failed", error);
      }
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
                    <div className="absolute top-1/4 right-0 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center animate-bounce delay-700">
                        <span className="text-2xl">🎓</span>
                    </div>
                     <div className="absolute bottom-1/4 left-0 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center animate-bounce delay-1000">
                        <span className="text-2xl">🚀</span>
                    </div>
                </div>
             </div>
        </div>

        {/* RIGHT SIDE - Forms */}
        <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center px-8 md:px-16 py-10 overflow-y-auto relative">
            
            {/* Top Toggle - Moved left to avoid X button overlap */}
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
                   <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                       <Check size={32} className="text-green-600" />
                   </div>
                   <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Inbox</h2>
                   <p className="text-gray-600 text-sm mb-6">
                       We've sent a verification link to your email.<br/>
                       Please verify to continue.
                   </p>
                   <button onClick={() => setVerificationSent(false)} className="text-sm text-indigo-600 font-medium hover:underline">
                       Back to Login
                   </button>
               </div>
            ) : (
             <>
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        {isLogin ? 'Welcome Back!' : 'Create Account'}
                    </h2>
                    <p className="text-gray-500 text-sm">
                        {isLogin ? 'Enter your details to access your courses.' : 'Start your learning journey today.'}
                    </p>
                </div>

                {/* Google Button */}
                <button 
                    onClick={() => login()}
                    className="flex w-full items-center justify-center gap-3 bg-white border border-gray-200 rounded-xl py-3 hover:shadow-md hover:border-gray-300 transition-all duration-300 mb-6 group"
                >
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5 group-hover:scale-110 transition-transform" alt="Google" />
                    <span className="text-gray-700 font-bold text-sm">
                        {isLogin ? 'Sign in with Google' : 'Sign up with Google'}
                    </span>
                </button>

                {/* Divider */}
                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase tracking-wider">
                        <span className="px-4 bg-white text-gray-400 font-medium">
                            {isLogin ? 'Or Login with Email' : 'Or Sign Up with Email'}
                        </span>
                    </div>
                </div>

                {/* Form */}
                <form className="space-y-4" onSubmit={handleEmailAuth}>
                
                {!isLogin && (
                    <div className="animate-fade-in-up">
                        <label className="block text-xs font-bold text-gray-700 mb-1 ml-1 uppercase tracking-wide">Full Name</label>
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

                {isLogin && (
                    <div className="flex items-center justify-between text-xs mt-2">
                        <label className="flex items-center text-gray-600 cursor-pointer hover:text-gray-900">
                            <input type="checkbox" className="mr-2 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                            Keep me logged in
                        </label>
                        <a href="#" className="text-indigo-600 hover:text-indigo-800 font-semibold transition">Forgot password?</a>
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
