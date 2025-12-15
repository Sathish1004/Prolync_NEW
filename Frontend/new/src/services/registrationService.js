import axios from 'axios';

const API_URL = 'http://localhost:5001/api'; // Adjust if needed

export const sendOtp = async (email) => {
    const response = await axios.post(`${API_URL}/otp/send`, { email });
    return response.data;
};

export const verifyOtp = async (email, otp, userData) => {
    const response = await axios.post(`${API_URL}/otp/verify`, { email, otp, userData });
    return response.data;
};

export const createOrder = async (userId, courseId, amount) => {
    const response = await axios.post(`${API_URL}/payment/create-order`, { userId, courseId, amount });
    return response.data;
};

export const verifyPayment = async (data) => {
    const response = await axios.post(`${API_URL}/payment/verify`, data);
    return response.data;
};

// Utilities
export const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};
