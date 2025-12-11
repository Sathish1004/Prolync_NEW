// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Award, CheckCircle, Smartphone, Download, ShieldCheck, Star } from 'lucide-react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { EffectCards, Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/effect-cards';

// import CertificateImage from '../assets/certificate-design.jpg';

// const CertificationSection = () => {
//   // Demo state for grading logic
//   const [score, setScore] = useState(85);

//   // Determine Grade Logic
//   let gradeData = {};
  
//   if (score >= 80) {
//     gradeData = {
//       grade: 'A',
//       label: 'Distinction',
//       color: 'text-amber-500',
//       bgColor: 'bg-amber-50',
//       borderColor: 'border-amber-200',
//       badgeColor: 'bg-amber-500',
//       gradient: 'from-amber-400 to-yellow-600',
//       showPercentage: true,
//       message: 'Outstanding Performance!'
//     };
//   } else if (score >= 65) {
//     gradeData = {
//       grade: 'B',
//       label: 'Passed & Certified',
//       color: 'text-emerald-500',
//       bgColor: 'bg-emerald-50',
//       borderColor: 'border-emerald-200',
//       badgeColor: 'bg-emerald-500',
//       gradient: 'from-emerald-400 to-green-600',
//       showPercentage: false,
//       message: 'Successfully Certified'
//     };
//   } else {
//     gradeData = {
//       grade: 'Completion',
//       label: 'Certificate Provided',
//       color: 'text-slate-500',
//       bgColor: 'bg-slate-50',
//       borderColor: 'border-slate-200',
//       badgeColor: 'bg-slate-500',
//       gradient: 'from-slate-400 to-gray-600',
//       showPercentage: false,
//       message: 'Course Completed'
//     };
//   }

//   return (
//     <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
//       <div className="container mx-auto px-4 max-w-[1400px]">
        
//         {/* Section Header */}
//          <div className="text-center mb-20 relative">
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 mb-6">
//                 <ShieldCheck className="w-4 h-4 text-indigo-600" />
//                 <span className="text-sm font-medium text-indigo-600">Official Certification</span>
//             </div>
//             <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
//                Why Choose Prolync – <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Verified Certification</span>
//             </h2>
//             <p className="text-slate-500 text-lg max-w-2xl mx-auto">
//                Earn a globally recognized certificate that validates your skills and boosts your career profile.
//             </p>
//          </div>

//          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
//             {/* LEFT SIDE: 3D Certificate Slider */}
//             <div className="relative h-[400px] lg:h-[500px] flex items-center justify-center w-full max-w-lg mx-auto">
//                 <Swiper
//                   effect={'cards'}
//                   grabCursor={true}
//                   modules={[EffectCards, Autoplay]}
//                   autoplay={{
//                     delay: 2500,
//                     disableOnInteraction: false,
//                   }}
//                   className="w-[320px] h-[240px] sm:w-[400px] sm:h-[300px] lg:w-[450px] lg:h-[340px]"
//                 >
//                   {/* Slide 1 - The User Provided Design */}
//                   <SwiperSlide className="rounded-xl shadow-2xl overflow-hidden">
//                     <img 
//                       src={CertificateImage} 
//                       alt="Prolync Certificate" 
//                       className="w-full h-full object-cover" 
//                     />
//                   </SwiperSlide>
                  
//                   {/* Slide 2 - Variation (Simulated) */}
//                   <SwiperSlide className="rounded-xl shadow-2xl overflow-hidden bg-white">
//                      <div className="relative w-full h-full">
//                         <img 
//                           src={CertificateImage} 
//                           alt="Prolync Certificate Variation" 
//                           className="w-full h-full object-cover filter hue-rotate-15" 
//                         />
//                         <div className="absolute inset-0 bg-black/10"></div>
//                      </div>
//                   </SwiperSlide>

//                   {/* Slide 3 - Variation */}
//                   <SwiperSlide className="rounded-xl shadow-2xl overflow-hidden bg-white">
//                      <div className="relative w-full h-full">
//                         <img 
//                           src={CertificateImage} 
//                           alt="Prolync Certificate Variation" 
//                           className="w-full h-full object-cover filter sepia-[.3]" 
//                         />
//                      </div>
//                   </SwiperSlide>
//                 </Swiper>

//                 {/* Floating Particles (Preserved) */}
//                 {[...Array(5)].map((_, i) => (
//                     <motion.div
//                        key={i}
//                        className="absolute w-2 h-2 rounded-full bg-indigo-400 opacity-40"
//                        animate={{
//                            y: [0, -40, 0],
//                            x: [0, Math.random() * 30 - 15, 0],
//                            opacity: [0.2, 0.8, 0.2]
//                        }}
//                        transition={{
//                            duration: 3 + i,
//                            repeat: Infinity,
//                            ease: "easeInOut"
//                        }}
//                        style={{
//                            left: `${Math.random() * 100}%`,
//                            top: `${Math.random() * 100}%`,
//                            zIndex: -1
//                        }}
//                     />
//                 ))}
//             </div>

//              {/* RIGHT SIDE: Grading Logic & Details */}
//             <div>
                 
//                  {/* Details Card */}
//                  <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 relative overflow-hidden">
//                      <div className={`absolute top-0 inset-x-0 h-2 bg-gradient-to-r ${gradeData.gradient}`}></div>
                     
//                      <div className="flex justify-between items-start mb-8">
//                          <div>
//                              <p className="text-sm text-slate-400 font-semibold tracking-wider uppercase mb-1">Status</p>
//                              <h3 className="text-2xl font-bold text-slate-900">{gradeData.label}</h3>
//                          </div>
//                          <div className={`p-3 rounded-xl ${gradeData.bgColor}`}>
//                               <Award className={`w-8 h-8 ${gradeData.color}`} />
//                          </div>
//                      </div>

//                      {/* Details List */}
//                      <div className="space-y-6 mb-8">
//                          <div className="flex justify-between items-center py-3 border-b border-slate-50">
//                              <span className="text-slate-500 font-medium">Learner Name</span>
//                              <span className="font-bold text-slate-800">Mohan Kumar</span>
//                          </div>
//                          <div className="flex justify-between items-center py-3 border-b border-slate-50">
//                              <span className="text-slate-500 font-medium">Course Title</span>
//                              <span className="font-bold text-slate-800">Full Stack Development</span>
//                          </div>
//                          <div className="flex justify-between items-center py-3 border-b border-slate-50">
//                              <span className="text-slate-500 font-medium">Validation ID</span>
//                              <span className="font-mono text-sm text-slate-400 bg-slate-50 px-2 py-1 rounded">PRL-883920</span>
//                          </div>
                         
//                          {/* Dynamic Grading Row */}
//                          <div className="flex justify-between items-center py-3">
//                              <span className="text-slate-500 font-medium">Certification Grade</span>
//                              <div className="flex items-center gap-2">
//                                  {gradeData.showPercentage && (
//                                      <span className="text-2xl font-bold text-slate-900">{score}%</span>
//                                  )}
//                                  <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${gradeData.badgeColor}`}>
//                                     {gradeData.showPercentage ? `Grade ${gradeData.grade}` : gradeData.grade}
//                                  </span>
//                              </div>
//                          </div>
//                      </div>
                     
//                      {/* Buttons */}
//                      <div className="flex flex-col sm:flex-row gap-4">
//                          <button className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-white font-bold shadow-lg shadow-indigo-200 transition-all hover:scale-[1.02] bg-gradient-to-r ${gradeData.gradient}`}>
//                              <Download size={18} />
//                              Download Certificate
//                          </button>
//                          <button className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-white border-2 border-slate-100 text-slate-600 font-bold hover:border-slate-300 transition-all">
//                              Verify Certificate
//                          </button>
//                      </div>

//                  </div>

//                  {/* Demo Slider - For User Testing */}
//                  <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
//                      <div className="flex justify-between items-center mb-4">
//                          <span className="text-sm font-bold text-slate-500 uppercase">Interactive Preview</span>
//                          <span className="text-sm font-mono bg-white px-2 py-1 rounded border border-slate-200">Score: {score}%</span>
//                      </div>
//                      <input 
//                        type="range" 
//                        min="0" 
//                        max="100" 
//                        value={score} 
//                        onChange={(e) => setScore(parseInt(e.target.value))}
//                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
//                      />
//                      <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
//                          <span>0%</span>
//                          <span>65% (Pass)</span>
//                          <span>80% (Distinction)</span>
//                          <span>100%</span>
//                      </div>
//                      <p className="text-xs text-center text-slate-400 mt-3 italic">
//                          *Drag slider to test grade logic (User View)
//                      </p>
//                  </div>

//             </div>
//          </div>
//       </div>
//     </section>
//   );
// };

// export default CertificationSection;



import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle, ShieldCheck, Download, Copy, ExternalLink } from 'lucide-react';

import CertificateImage from '../assets/certificate-design.jpg';

const CertificationSection = () => {
  const [score, setScore] = useState(92);
  const [copied, setCopied] = useState(false);

  // Certificate data
  const certificate = {
    id: 'PRL-2024-883920',
    name: 'Mohan Kumar',
    course: 'Full Stack Development with MERN Stack',
    issueDate: 'Dec 15, 2024',
    expiryDate: 'Lifetime',
    verificationUrl: 'https://verify.prolync.com/cert/883920',
    grade: score >= 80 ? 'Distinction' : score >= 65 ? 'Certified' : 'Completion'
  };

  // Determine Grade
  let gradeData = {};
  
  if (score >= 80) {
    gradeData = {
      label: 'Distinction',
      color: 'text-amber-600',
      badgeColor: 'bg-gradient-to-r from-amber-500 to-orange-500',
      message: 'Excellent Performance'
    };
  } else if (score >= 65) {
    gradeData = {
      label: 'Certified',
      color: 'text-emerald-600',
      badgeColor: 'bg-gradient-to-r from-emerald-500 to-green-500',
      message: 'Successfully Certified'
    };
  } else {
    gradeData = {
      label: 'Completion',
      color: 'text-blue-600',
      badgeColor: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      message: 'Course Completed'
    };
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(certificate.verificationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-white to-cyan-50/20"></div>
      
      <div className="container mx-auto px-4 max-w-[1200px] relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-white/60 shadow-sm mb-6">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium text-gray-700">Verified Certification</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Industry Recognized <span className="text-indigo-600">Certificate</span>
          </h2>
          
          <p className="text-gray-600 max-w-2xl mx-auto">
            Earn a certificate that validates your skills and boosts your career profile.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left Side: Certificate Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Your Certificate</h3>
              <p className="text-gray-600 text-sm">Preview of your achievement certificate</p>
            </div>

            {/* Certificate Image */}
            <div className="relative rounded-xl overflow-hidden border-2 border-gray-100 mb-6">
              <img 
                src={CertificateImage} 
                alt="Certificate" 
                className="w-full h-auto object-cover"
              />
              
              {/* Grade Badge */}
              <div className="absolute top-4 right-4">
                <div className={`px-3 py-1.5 rounded-full text-white text-xs font-bold ${gradeData.badgeColor} shadow-md`}>
                  {gradeData.label}
                </div>
              </div>
            </div>

            {/* Download Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Download className="w-4 h-4" />
              Download Certificate
            </motion.button>
          </motion.div>

          {/* Right Side: Certificate Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Certificate Info Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-xl bg-indigo-50">
                  <Award className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Certificate Details</h3>
                  <p className="text-gray-600 text-sm">Complete information about your certification</p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Recipient</span>
                  <span className="font-semibold text-gray-900">{certificate.name}</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Course</span>
                  <span className="font-semibold text-gray-900">{certificate.course}</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Issue Date</span>
                  <span className="font-semibold text-gray-900">{certificate.issueDate}</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Certificate ID</span>
                  <span className="font-mono text-sm text-gray-900 bg-gray-50 px-2 py-1 rounded">
                    {certificate.id}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600">Grade</span>
                  <span className={`font-bold ${gradeData.color}`}>{gradeData.label}</span>
                </div>
              </div>
            </div>

            {/* Verification Section */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-gray-900">Verify Certificate</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="flex-1 bg-gray-50 rounded-lg px-4 py-3 text-sm text-gray-600 overflow-x-auto">
                    {certificate.verificationUrl}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={copyToClipboard}
                    className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </motion.button>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold hover:shadow-lg transition-all duration-300"
                >
                  <ExternalLink className="w-4 h-4" />
                  Verify Online
                </motion.button>
              </div>
            </div>

            {/* Score Adjustment */}
            <div className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl p-6 border border-indigo-100">
              <div className="mb-4">
                <div className="text-lg font-bold text-gray-900 mb-2">Your Score: {score}%</div>
                <p className="text-gray-600 text-sm mb-4">{gradeData.message}</p>
                
                <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 1 }}
                    className={`absolute inset-y-0 left-0 ${gradeData.badgeColor} rounded-full`}
                  />
                </div>
                
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0%</span>
                  <span>65%</span>
                  <span>80%</span>
                  <span>100%</span>
                </div>
              </div>
              
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={score} 
                onChange={(e) => setScore(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600"
              />
              <div className="text-xs text-gray-500 text-center mt-2">
                Adjust score to see different grades
              </div>
            </div>
          </motion.div>
        </div>

        {/* Simple CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white rounded-2xl p-6 shadow-lg border border-gray-100 max-w-lg mx-auto">
            <div className="text-left">
              <h3 className="text-lg font-bold text-gray-900 mb-1">Ready to get certified?</h3>
              <p className="text-gray-600 text-sm">Start your learning journey today.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 whitespace-nowrap"
            >
              Explore Courses
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationSection;