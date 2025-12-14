import React, { useState } from 'react';
import { Eye, EyeOff, ArrowLeft, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import loginIllustration from '../assets/login_illustration.png';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const SignupPage = () => {
  const navigate = useNavigate();
  // Role is always 'user' for public signup
  const role = 'user';
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
     name: '',
     email: '',
     password: '',
     phone: '',
  });

  const handleChange = (e) => {
     setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
     e.preventDefault();
     
     const apiBase = 'http://localhost:5001/api';
     const endpoint = `${apiBase}/user/register`;
     
     const payload = {
         full_name: formData.name,
         email: formData.email,
         password: formData.password,
         confirm_password: formData.password, 
         phone: formData.phone
     };

     try {
         const res = await axios.post(endpoint, payload);
         
         if (res.status === 201 || res.data.message.includes("Success")) {
             alert("Signup Success. Please Login.");
             navigate('/login');
         } else {
             alert(res.data.message);
         }

     } catch (error) {
         console.error("Signup Error:", error);
         alert(error.response?.data?.message || "Signup Failed");
     }
  };

  const signupWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
         console.log(tokenResponse);
    },
    onError: () => console.error("Google Signup Failed"),
  });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Back to Home */}
      <Link to="/" className="absolute top-6 left-6 flex items-center text-gray-600 hover:text-indigo-600 transition">
        <ArrowLeft size={20} className="mr-2" />
        Back to Home
      </Link>

      <div className="w-full max-w-[1100px] h-[750px] bg-white rounded-3xl shadow-2xl flex overflow-hidden relative">
        
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
        <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center px-8 md:px-16 py-10 overflow-y-auto relative scrollbar-hide">
            
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                   Sign Up
                </h2>
                <div className="text-sm">
                    <span className="text-gray-500">Already have an account?</span>
                    <Link to="/login" className="ml-1 font-medium text-green-600 hover:text-green-700 underline transition">
                        Login
                    </Link>
                </div>
            </div>

            {/* Google Button */}
            <button 
                onClick={() => signupWithGoogle()}
                className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-50 transition mb-6"
            >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                Sign up with Google
            </button>

            <div className="relative flex py-2 items-center mb-6">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase">Or Sign Up with Email</span>
                <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSignup}>
                
                <div>
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
                    <p className="text-[10px] text-green-600 mt-1 font-medium">*This name will appear in certificates</p>
                </div>

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

                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1 ml-1 uppercase tracking-wide">Mobile number</label>
                    <div className="flex">
                        <div className="flex items-center justify-center bg-[#F3F4F6] border border-transparent rounded-l-xl px-3 py-3 text-gray-900 font-medium">
                            <span className="mr-1">🇮🇳</span> +91
                        </div>
                        <input 
                            name="phone"
                            type="tel" 
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="flex-1 bg-[#F3F4F6] border border-transparent rounded-r-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium ml-1"
                            placeholder="123 456 7890"
                        />
                    </div>
                </div>
                
                <div className="flex items-center gap-2 mt-2" >
                    <input type="checkbox" required className="rounded text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                    <span className="text-xs text-gray-500">I agree to the <a href="#" className="underline hover:text-indigo-600">Terms & Conditions</a></span>
                </div>

                <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-[#16A34A] to-[#22C55E] text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-green-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 mt-6 text-sm tracking-wide uppercase"
                >
                    Create Account
                </button>

            </form>
        </div>
      </div>
    </div>
  );
};





export default SignupPage;
