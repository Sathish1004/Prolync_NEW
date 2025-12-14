import React, { useState, useEffect } from 'react';
import { X, Loader2, ShieldCheck, Timer, CheckCircle, ArrowRight } from 'lucide-react';
import { sendOtp, verifyOtp, createOrder, verifyPayment, loadRazorpayScript } from '../services/registrationService';

const WorkshopEnrollment = ({ workshop, onClose }) => {
    const [step, setStep] = useState(1); // 1: Form, 2: OTP, 3: Payment
    const [loading, setLoading] = useState(false);
    
    // Form State
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: ''
    });

    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(300);
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        loadRazorpayScript();
        let interval;
        if (step === 2 && timer > 0) {
            interval = setInterval(() => setTimer(prev => prev - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [step, timer]);

    const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Required';
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid Email';
        if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile)) newErrors.mobile = 'Invalid Mobile';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleApply = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        try {
            await sendOtp(formData.mobile);
            setStep(2);
            setTimer(300);
        } catch (error) {
            alert("Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if (otp.length !== 6) return alert("Enter valid 6-digit OTP");
        setLoading(true);
        try {
            const data = await verifyOtp(formData.mobile, otp, formData);
            if (data.verified) {
                setUser(data.user);
                // If Free workshop, direct success
                if(workshop.price === 'Free' || workshop.price === 0) {
                     alert("Registration Successful!");
                     onClose();
                } else {
                    setStep(3);
                }
            } else {
                alert("Invalid OTP");
            }
        } catch (error) {
            alert("Verification Failed");
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = async () => {
        if (!user) return;
        setLoading(true);
        try {
            // Use dummy course ID logic or specific workshop backend logic
            // Assuming reusing createOrder which expects courseId:
            // Ideally backend supports workshop_id, but for now we pass workshop.id
            const orderData = await createOrder(user.id, `workshop_${workshop.id}`, parseFloat(workshop.price));
            
            const options = {
                key: "rzp_test_YourKeyHere",
                amount: orderData.amount,
                currency: orderData.currency,
                name: "Prolync Workshops",
                description: `Register for ${workshop.title}`,
                order_id: orderData.id,
                handler: async function (response) {
                    alert("Workshop Registration Successful!");
                    onClose();
                },
                prefill: { name: user.name, email: user.email, contact: user.mobile },
                theme: { color: "#9333ea" }
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error(error);
            alert("Payment Init Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors z-10">
                    <X size={24} />
                </button>

                {/* Header Image */}
                <div className="h-32 bg-gradient-to-r from-purple-600 to-indigo-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute bottom-4 left-6 text-white">
                        <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded backdrop-blur-sm mb-1 inline-block uppercase tracking-wider">Workshop</span>
                        <h3 className="font-bold text-lg leading-tight truncate w-64">{workshop.title}</h3>
                    </div>
                </div>

                <div className="p-6">
                    {step === 1 && (
                        <form onSubmit={handleApply} className="space-y-4">
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Secure Your Spot</h4>
                            <input 
                                type="text" placeholder="Full Name" 
                                value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 outline-none bg-gray-50 focus:bg-white transition-all"
                            />
                            <div className="flex gap-2">
                                <input 
                                    type="email" placeholder="Email Address" 
                                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 outline-none bg-gray-50 focus:bg-white transition-all"
                                />
                            </div> 
                            <input 
                                type="tel" placeholder="Mobile Number" 
                                value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value.replace(/\D/g,'').slice(0,10)})}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 outline-none bg-gray-50 focus:bg-white transition-all"
                            />
                            
                            {Object.values(errors).length > 0 && <p className="text-red-500 text-xs">{Object.values(errors)[0]}</p>}

                            <button type="submit" disabled={loading} className="w-full bg-black text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all">
                                {loading ? <Loader2 className="animate-spin" /> : 'Get OTP & Proceed'} <ArrowRight size={18} />
                            </button>
                        </form>
                    )}

                    {step === 2 && (
                        <div className="text-center space-y-4">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600"><ShieldCheck /></div>
                            <h4 className="font-bold text-lg">Verify Mobile</h4>
                            <p className="text-sm text-gray-500">OTP sent to +91 {formData.mobile}</p>
                            
                            <input 
                                type="text" value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g,'').slice(0,6))}
                                className="text-center text-2xl font-bold tracking-widest w-full py-2 border-b-2 border-purple-200 outline-none focus:border-purple-600"
                                placeholder="000000"
                            />
                            
                            <div className="flex justify-between text-xs text-gray-500 font-medium">
                                <span>Time left: {formatTime(timer)}</span>
                                <button type="button" onClick={handleApply} disabled={timer > 0} className={timer > 0 ? "opacity-50" : "text-purple-600"}>Resend OTP</button>
                            </div>

                            <button onClick={handleVerifyOtp} disabled={loading} className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition-all">
                                {loading ? <Loader2 className="animate-spin" /> : 'Verify Code'}
                            </button>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-4">
                             <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-100">
                                <div>
                                    <p className="text-xs text-purple-600 font-bold uppercase tracking-wider">Total Amount</p>
                                    <p className="text-2xl font-black text-gray-900">₹{workshop.price}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-gray-900">{workshop.duration}</p>
                                    <p className="text-xs text-gray-500">{workshop.mode}</p>
                                </div>
                             </div>
                             
                             <button onClick={handlePayment} disabled={loading} className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-purple-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                                {loading ? <Loader2 className="animate-spin" /> : 'Pay & Register Now'}
                             </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WorkshopEnrollment;
