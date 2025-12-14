import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLoginPage = ({ role = 'admin' }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
     e.preventDefault();
     const apiBase = 'http://localhost:5001/api';
     const endpoint = role === 'admin' ? `${apiBase}/admin/login` : `${apiBase}/lecturer/login`;

     try {
         const res = await axios.post(endpoint, formData);
         if (res.status === 200) {
             localStorage.setItem('token', res.data.token);
             localStorage.setItem('user', JSON.stringify(res.data.user));
             navigate(role === 'admin' ? '/admin/dashboard' : '/lecturer/dashboard'); 
             window.location.reload(); 
         } else {
             alert(res.data.message);
         }
     } catch(error) {
         console.error("Login Failed", error);
         alert(error.response?.data?.message || "Login Failed");
     }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center capitalize">{role} Login</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                    name="email"
                    type="email" 
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="name@example.com"
                />
            </div>
            <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input 
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="••••••••"
                />
                <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[34px] text-gray-400 hover:text-indigo-600"
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
            <button 
                type="submit" 
                className="w-full bg-indigo-600 text-white font-bold py-2.5 rounded-lg hover:bg-indigo-700 transition"
            >
                Login
            </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
