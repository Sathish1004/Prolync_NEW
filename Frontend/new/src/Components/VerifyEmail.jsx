import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Check, X } from 'lucide-react';

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState('verifying'); // verifying, success, error
    const navigate = useNavigate();
    const token = searchParams.get('token');

    useEffect(() => {
        if (!token) {
            setStatus('error');
            return;
        }

        const verify = async () => {
            try {
                const res = await axios.post('http://localhost:8000/api/v1/auth/verify-email', { token });
                if (res.data.success) {
                    localStorage.setItem('token', res.data.data.token);
                    setStatus('success');
                    setTimeout(() => {
                        navigate('/'); // Redirect to Dashboard/Home
                    }, 3000);
                }
            } catch (error) {
                console.error("Verification failed", error);
                setStatus('error');
            }
        };

        verify();
    }, [token, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
                {status === 'verifying' && (
                    <div className="animate-pulse">
                        <div className="w-16 h-16 bg-indigo-100 rounded-full mx-auto mb-4"></div>
                        <h2 className="text-2xl font-bold text-gray-900">Verifying your email...</h2>
                    </div>
                )}

                {status === 'success' && (
                    <div>
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Check size={32} className="text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h2>
                        <p className="text-gray-600 mb-6">Welcome to Prolync. Redirecting you to the dashboard...</p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full animate-[width_3s_ease-in-out]"></div>
                        </div>
                    </div>
                )}

                {status === 'error' && (
                    <div>
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <X size={32} className="text-red-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h2>
                        <p className="text-gray-600 mb-6">The link is invalid or has expired.</p>
                        <button 
                            onClick={() => navigate('/')}
                            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 transition"
                        >
                            Return Home
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;
