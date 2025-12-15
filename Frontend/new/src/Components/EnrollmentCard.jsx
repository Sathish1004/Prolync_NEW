import React, { useState, useEffect } from 'react';
import { ChevronDown, CheckCircle, Gift, Loader2, ArrowRight, ShieldCheck, Timer } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { sendOtp, verifyOtp, createOrder, verifyPayment, loadRazorpayScript } from '../services/registrationService';
import { fullCourseData } from '../data/fullCourseData';

const EnrollmentCard = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Form, 2: OTP, 3: Payment Summary
    const [loading, setLoading] = useState(false);
    
    // Form State
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        couponCode: ''
    });
    
    // OTP State
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(300); // 5 mins
    const [otpSent, setOtpSent] = useState(false);
    
    // Payment State
    const [course, setCourse] = useState(null);
    const [user, setUser] = useState(null); // Stores verified user data

    const [errors, setErrors] = useState({});
    const [showCouponInput, setShowCouponInput] = useState(false);
    const [couponApplied, setCouponApplied] = useState(false);

    useEffect(() => {
        const found = fullCourseData.find(c => c.id === parseInt(id)) || fullCourseData[0];
        setCourse(found);
        loadRazorpayScript(); 

        // Timer countdown
        let interval;
        if (step === 2 && timer > 0) {
            interval = setInterval(() => setTimer(prev => prev - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [id, step, timer]);

    const formatTime = (s) => {
        const min = Math.floor(s / 60);
        const sec = s % 60;
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
        // Removed mobile validation

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // --- Actions ---

    const handleApply = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            await sendOtp(formData.email); // Changed to email
            setStep(2);
            setTimer(300);
            setOtpSent(true);
        } catch (error) {
            console.error(error);
            alert("Failed to send OTP. Please check your email and try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if (otp.length !== 6) return alert("Please enter a valid 6-digit OTP");

        setLoading(true);
        try {
            const data = await verifyOtp(formData.email, otp, formData); // Changed to email
            if (data.verified) {
                // Store token/user (optional: context)
                // localStorage.setItem('token', data.token); // If token returned
                // setUser(data.user); // If user returned
                // Since api just returns verified: true, we simulate user object for payment step
                setUser({
                    name: formData.fullName,
                    email: formData.email,
                    id: 999 // Placeholder ID or should come from backend if user created
                });
                setStep(3); // Go to Payment
            } else {
                alert("Invalid OTP");
            }
        } catch (error) {
            console.error(error);
            alert("OTP Verification Failed. Please check the code.");
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = async () => {
        if (!user || !course) return;
        setLoading(true);

        try {
            // 1. Create Order
            const orderData = await createOrder(user.id, course.id, course.newPrice);
            
            // 2. Open Razorpay
            const options = {
                key: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder', // Should come from API or env
                amount: orderData.amount,
                currency: orderData.currency,
                name: "Prolync Education",
                description: `Purchase ${course.title}`,
                order_id: orderData.id, // Razorpay Order ID
                handler: async function (response) {
                    // 3. Verify Payment
                    try {
                        const verifyRes = await verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            userId: user.id,
                            courseId: course.id
                        });
                        
                        if (verifyRes.success) {
                            alert("Payment successful! Enrollment confirmation has been sent to your email.");
                            navigate('/dashboard'); 
                        }
                    } catch (verifyErr) {
                        alert("Payment Verification Failed!");
                        console.error(verifyErr);
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email
                },
                theme: {
                    color: "#4f46e5"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error("Payment Error:", error);
            alert("Could not initiate payment. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setTimer(300);
        await sendOtp(formData.email);
        alert("OTP Resent to your Email!");
    };

    const years = Array.from({ length: 15 }, (_, i) => 2026 - i);

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 w-full font-sans transition-all duration-300 hover:shadow-2xl relative overflow-hidden">
            
            {/* Step 1: Application Form */}
            {step === 1 && (
                <>
                <div className="text-center mb-6">
                    <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">Apply now to Unlock!</h3>
                    <p className="text-sm text-gray-500 mt-2">Our team will send enrollment details to your registered email.</p>
                </div>

                <form onSubmit={handleApply} className="space-y-4">
                     {/* Name */}
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" 
                        className={`w-full px-4 py-3 rounded-lg border focus:ring-2 outline-none ${errors.fullName ? 'border-red-500' : 'border-gray-300 focus:border-indigo-500'}`} />
                    
                    {/* Email */}
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" 
                        className={`w-full px-4 py-3 rounded-lg border focus:ring-2 outline-none ${errors.email ? 'border-red-500' : 'border-gray-300 focus:border-indigo-500'}`} />
                    
                    {Object.keys(errors).length > 0 && <p className="text-red-500 text-xs text-center">*Please fill all fields.</p>}

                     <button type="submit" disabled={loading} className="w-full bg-[#10B981] text-white font-bold text-lg py-3 rounded-lg hover:bg-green-600 transition-all shadow-lg shadow-green-200 mt-2 flex items-center justify-center gap-2">
                        {loading ? <Loader2 className="animate-spin" /> : 'Apply Now'} <ArrowRight size={20} />
                    </button>
                    <p className="text-[10px] text-gray-400 text-center px-4">By applying, you agree to our Terms & Conditions.</p>
                </form>
                </>
            )}

            {/* Step 2: OTP Verification */}
            {step === 2 && (
                <div className="animate-fade-in py-4">
                    <div className="text-center mb-6">
                        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ShieldCheck className="text-green-600" size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Verify Email Address</h3>
                        <p className="text-sm text-gray-500 mt-2">Enter the 6-digit code sent to <br/><span className="font-bold text-gray-800">{formData.email}</span></p>
                        <button onClick={() => setStep(1)} className="text-xs text-indigo-500 hover:underline mt-1">Change Email</button>
                    </div>

                    <form onSubmit={handleVerifyOtp} className="space-y-6">
                        <input 
                            type="text" 
                            value={otp} 
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g,'').slice(0,6))}
                            placeholder="Enter 6-Digit OTP"
                            className="w-full text-center text-3xl tracking-[0.5em] font-bold py-3 border-b-2 border-indigo-200 focus:border-indigo-600 outline-none transition-colors"
                        />
                        
                        <div className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-1 text-gray-500">
                                <Timer size={14} /> {formatTime(timer)}
                            </div>
                            <button type="button" onClick={handleResendOtp} disabled={timer > 0} className={`font-medium ${timer > 0 ? 'text-gray-300' : 'text-indigo-600 hover:underline'}`}>
                                Resend OTP
                            </button>
                        </div>

                        <button type="submit" disabled={loading || otp.length < 6} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                            {loading ? <Loader2 className="animate-spin" /> : 'Verify & Proceed'}
                        </button>
                    </form>
                </div>
            )}

            {/* Step 3: Payment Summary */}
            {step === 3 && course && (
                <div className="animate-fade-in py-2">
                    <div className="text-center mb-6">
                        <CheckCircle className="text-green-500 w-12 h-12 mx-auto mb-3" />
                        <h3 className="text-xl font-bold text-gray-900">Registration Successful!</h3>
                        <p className="text-sm text-gray-500">Complete payment to unlock course access.</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-3 mb-6">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Course</span>
                            <span className="font-bold text-gray-900 text-right w-1/2 truncate">{course.title}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                             <span className="text-gray-600">User</span>
                             <span className="font-bold text-gray-900">{user?.name}</span>
                        </div>
                        <div className="border-t border-dashed border-gray-300 my-2"></div>
                        <div className="flex justify-between text-lg font-bold">
                            <span className="text-gray-900">Total</span>
                            <span className="text-indigo-600">₹{course.newPrice}</span>
                        </div>
                    </div>

                    <button onClick={handlePayment} disabled={loading} className="w-full bg-[#2563EB] text-white font-bold text-lg py-4 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transform active:scale-[0.98] transition-all">
                        {loading ? <Loader2 className="animate-spin" /> : 'Pay Now Securely'}
                    </button>
                    <div className="flex justify-center gap-2 mt-4 opacity-50">
                         {/* Payment Icons Placeholder */}
                         <div className="h-4 w-8 bg-gray-300 rounded"></div>
                         <div className="h-4 w-8 bg-gray-300 rounded"></div>
                         <div className="h-4 w-8 bg-gray-300 rounded"></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EnrollmentCard;
