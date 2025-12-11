import React, { useState } from 'react';
import { X, Check, Eye, EyeOff, ArrowLeft, ArrowRight } from 'lucide-react';
import loginIllustration from '../assets/login_illustration.png';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

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
        <div className="hidden lg:flex w-1/2 bg-white relative items-center justify-center p-12 overflow-hidden border-r border-gray-100">
             
             {/* Background Decoration */}
             <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-purple-50 rounded-full blur-3xl opacity-60"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
             </div>

             {/* Illustration Content */}
             <div className="relative z-10 w-full flex flex-col items-center justify-center h-full">
                {/* Optional Tagline or Logo could go here */}
                {/* <h3 className="text-3xl font-bold text-[#0A2540] mb-8 text-center leading-tight">
                    Master Your <br/> <span className="text-purple-600">Future Skills</span>
                </h3> */}
                
                <div className="relative w-full max-w-md aspect-square">
                    <img 
                      src={loginIllustration} 
                      alt="Education Illustration" 
                      className="w-full h-full object-contain hover:scale-[1.02] transition-transform duration-700 drop-shadow-2xl"
                    />
                    
                    {/* Floating Element Animation (CSS based) */}
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
        <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center px-8 md:px-16 py-10 overflow-y-auto">
            
            {/* Header */}
            <div className="mb-8">
               <h2 className="text-3xl font-bold text-gray-900 mb-2">
                 {isLogin ? 'Login' : 'Sign Up'}
               </h2>
               <p className="text-gray-500 text-sm">
                 {isLogin ? "Don't have an account?" : "Already have an account?"} {' '}
                 <button 
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-green-600 font-bold hover:underline"
                 >
                    {isLogin ? 'Signup' : 'Login'}
                 </button>
               </p>
            </div>

            {/* Google Button */}
            <button className="flex w-full items-center justify-center gap-3 border border-gray-300 rounded-lg py-2.5 hover:bg-gray-50 transition mb-6">
               <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
               <span className="text-gray-700 font-medium">
                 {isLogin ? 'Sign in with Google' : 'Sign up with Google'}
               </span>
            </button>

            {/* Divider */}
            <div className="relative mb-6">
               <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
               </div>
               <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-400">
                    {isLogin ? 'Or Login with Email' : 'Or Sign Up with Email'}
                  </span>
               </div>
            </div>

            {/* Form */}
            <form className="space-y-5">
               
               {/* Signup Specific Fields */}
               {!isLogin && (
                 <>
                   <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                        placeholder="John Doe"
                      />
                      <p className="text-[10px] text-green-600 mt-1">*This name will appear in certificates</p>
                   </div>
                 </>
               )}

               <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                    placeholder="john@example.com"
                  />
               </div>

               <div className="relative">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
                  <input 
                    type={showPassword ? "text" : "password"}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                    placeholder="••••••••"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[26px] text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
               </div>

                {/* Login Specifics */}
               {isLogin && (
                   <div className="flex items-center justify-between text-xs">
                      <label className="flex items-center text-gray-600 cursor-pointer">
                         <input type="checkbox" className="mr-2 rounded text-green-600 focus:ring-green-500" />
                         Keep me logged in
                      </label>
                      <a href="#" className="text-gray-500 hover:text-green-600 transition">Forgot password?</a>
                   </div>
               )}

               {/* Signup Mobile */}
               {!isLogin && (
                 <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Mobile number</label>
                    <div className="flex">
                       <select className="bg-gray-50 border border-gray-300 border-r-0 rounded-l-md px-2 py-2 text-sm focus:outline-none">
                          <option>+91</option>
                          <option>+1</option>
                       </select>
                       <input 
                          type="tel" 
                          className="w-full border border-gray-300 rounded-r-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                          placeholder="9876543210"
                        />
                    </div>
                 </div>
               )}

               <button 
                 type="submit" 
                 className="w-full bg-gradient-to-r from-[#1aa260] to-[#21c46b] text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
               >
                 {isLogin ? 'Login' : 'Sign Up'}
               </button>

            </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
