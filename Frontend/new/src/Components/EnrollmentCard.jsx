import React, { useState } from 'react';
import { ChevronDown, CheckCircle, Gift } from 'lucide-react';

const EnrollmentCard = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    qualification: '',
    profile: '',
    graduationYear: '',
    language: '',
    couponCode: ''
  });

  const [errors, setErrors] = useState({});
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile is required';
    else if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = 'Invalid mobile number';
    if (!formData.qualification) newErrors.qualification = 'Qualification is required';
    if (!formData.profile) newErrors.profile = 'Profile is required';
    if (!formData.graduationYear) newErrors.graduationYear = 'Year is required';
    if (!formData.language) newErrors.language = 'Language is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Application Submitted! Redirecting to payment...");
      // Add actual submission logic here
    }
  };

  const years = Array.from({ length: 15 }, (_, i) => 2026 - i);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 w-full font-sans transition-all duration-300 hover:shadow-2xl">
      <div className="text-center mb-6">
        <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">Apply now to Unlock Offer!</h3>
        <p className="text-xs text-center text-gray-500 mt-1">Limited seats available for this batch</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Name"
            className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
              errors.fullName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-red-400 focus:ring-red-100'
            }`}
          />
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
              errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-red-400 focus:ring-red-100'
            }`}
          />
        </div>

        {/* Mobile */}
        <div className="flex">
          <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-600 font-medium text-sm">
            IN +91
          </span>
          <input
            type="tel"
            name="mobile"
            maxLength="10"
            value={formData.mobile}
            onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                handleChange({ target: { name: 'mobile', value: val } });
            }}
            placeholder="Mobile Number"
            className={`w-full px-4 py-3 rounded-r-lg border focus:outline-none focus:ring-2 transition-all ${
              errors.mobile ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-red-400 focus:ring-red-100'
            }`}
          />
        </div>

        {/* Qualification */}
        <div className="relative">
          <select
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border appearance-none bg-white focus:outline-none focus:ring-2 transition-all ${
              errors.qualification ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-red-400 focus:ring-red-100'
            } ${!formData.qualification ? 'text-gray-400' : 'text-gray-900'}`}
          >
            <option value="" disabled>Education Qualification</option>
            <option value="B.Tech">B.Tech / B.E.</option>
            <option value="BCA">BCA / MCA</option>
            <option value="B.Sc">B.Sc / M.Sc</option>
            <option value="Diploma">Diploma</option>
            <option value="Others">Others</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
        </div>

        {/* Profile */}
        <div className="relative">
          <select
            name="profile"
            value={formData.profile}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border appearance-none bg-white focus:outline-none focus:ring-2 transition-all ${
              errors.profile ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-red-400 focus:ring-red-100'
            } ${!formData.profile ? 'text-gray-400' : 'text-gray-900'}`}
          >
            <option value="" disabled>Current Profile</option>
            <option value="Student">Student</option>
            <option value="Fresher">Fresher / Job Seeker</option>
            <option value="Working Professional">Working Professional</option>
            <option value="Freelancer">Freelancer</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
        </div>

        {/* Year */}
        <div className="relative">
          <select
            name="graduationYear"
            value={formData.graduationYear}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border appearance-none bg-white focus:outline-none focus:ring-2 transition-all ${
              errors.graduationYear ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-red-400 focus:ring-red-100'
            } ${!formData.graduationYear ? 'text-gray-400' : 'text-gray-900'}`}
          >
            <option value="" disabled>Year of Graduation</option>
            {years.map(year => (
                <option key={year} value={year}>{year}</option>
            ))}
            <option value="Before 2010">Before 2010</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
        </div>

        {/* Language */}
         <div className="relative">
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border appearance-none bg-white focus:outline-none focus:ring-2 transition-all ${
              errors.language ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-red-400 focus:ring-red-100'
            } ${!formData.language ? 'text-gray-400' : 'text-gray-900'}`}
          >
             <option value="" disabled>Speaking Language</option>
             <option value="English">English</option>
             <option value="Hindi">Hindi</option>
             <option value="Tamil">Tamil</option>
             <option value="Telugu">Telugu</option>
             <option value="Kannada">Kannada</option>
             <option value="Others">Others</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
        </div>

        {/* Coupon */}
        <div className="text-center">
            {!showCouponInput ? (
                <button
                    type="button" 
                    onClick={() => setShowCouponInput(true)}
                    className="text-gray-500 text-sm hover:text-red-500 font-medium underline decoration-dashed underline-offset-4 flex items-center justify-center gap-1 mx-auto transition-colors"
                >
                    <Gift size={16} /> Have a Coupon code? Redeem
                </button>
            ) : (
                <div className="flex gap-2 animate-fade-in-up">
                     <input 
                        type="text"
                        name="couponCode"
                        value={formData.couponCode}
                        onChange={handleChange}
                        placeholder="Enter Code"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-red-400"
                     />
                     <button type="button" onClick={() => setCouponApplied(true)} className="bg-gray-800 text-white px-3 py-2 rounded-lg text-xs font-bold hover:bg-black transition-colors">
                        APPLY
                     </button>
                </div>
            )}
            {couponApplied && <p className="text-green-600 text-xs font-bold mt-2 flex items-center justify-center gap-1"><CheckCircle size={12} /> Coupon Applied!</p>}
        </div>

        {/* Validated Error Message */}
         {Object.keys(errors).length > 0 && (
             <p className="text-red-500 text-xs font-semibold text-center mt-2 animate-pulse">
                 *Please fill in all the fields to proceed.
             </p>
         )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#10B981] text-white font-bold text-lg py-3 rounded-lg hover:bg-green-600 active:scale-[0.98] transition-all transform shadow-lg shadow-green-200 mt-4"
        >
          Apply Now
        </button>
        
        <p className="text-[10px] text-gray-400 text-center leading-tight px-4 mt-2">
            By registering, I agree to be contacted via phone, SMS, or email for offers & products, even if I am on a DNC/NDNC list
        </p>
      </form>
    </div>
  );
};

export default EnrollmentCard;
