import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        if (token) {
            // Test Protected Route
            axios.get('http://localhost:5000/api/profile', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => setMessage(res.data.message))
            .catch(err => setMessage("Failed to access protected route"));
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/'; // Or reload
    };

    if (!user) {
        return <div className="p-10"><h1>Please Login</h1></div>;
    }

    return (
        <div className="p-10 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-xl">Welcome, <span className="font-bold text-indigo-600">{user.full_name}</span></p>
                <p className="text-gray-600">Email: {user.email}</p>
                
                <div className="mt-6 p-4 bg-green-50 text-green-700 border border-green-200 rounded">
                    <strong>Backend Status:</strong> {message || "Loading..."}
                </div>

                <button 
                    onClick={logout}
                    className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
