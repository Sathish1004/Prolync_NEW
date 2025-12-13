
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fullCourseData } from '../data/fullCourseData';
import AccordionModule from './AccordionModule';
import CertificateSection from './CertificateSection';
import RequirementsSection from './RequirementsSection';
import { CheckCircle, AlertCircle, PlayCircle } from 'lucide-react';

import EnrollmentCard from './EnrollmentCard';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('about');
  const [openModuleIndex, setOpenModuleIndex] = useState(0);

  useEffect(() => {
    // Find course by ID
    const foundCourse = fullCourseData.find(c => c.id === parseInt(id));
    setCourse(foundCourse);
    window.scrollTo(0, 0);
  }, [id]);

  if (!course) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const tabs = [
      { id: 'about', label: 'About' },
      { id: 'modules', label: 'Modules' },
      { id: 'certificate', label: 'Certificate' },
      { id: 'benefits', label: 'Benefits' },
      { id: 'requirements', label: 'Requirements' },
  ];

  const scrollToSection = (sectionId) => {
      setActiveTab(sectionId);
      const element = document.getElementById(sectionId);
      if(element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
        {/* Hero Section */}
        <div className="bg-[#1e1b4b] text-white pt-32 pb-16 px-6">
            <div className="max-w-10xl mx-auto flex flex-col md:flex-row gap-10 items-center">
                <div className="md:w-2/3">
                    <span className="bg-indigo-500/20 text-indigo-200 border border-indigo-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
                        Best Seller
                    </span>
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">{course.title}</h1>
                    <p className="text-indigo-200 text-lg mb-6 leading-relaxed max-w-2xl">{course.description}</p>
                    
                    <div className="flex flex-wrap gap-6 text-sm font-medium text-indigo-300">
                        <div className="flex items-center gap-2"><PlayCircle size={18} /> {course.duration} On-demand Video</div>
                        <div className="flex items-center gap-2"><CheckCircle size={18} /> {course.language}</div>
                        <div className="flex items-center gap-2 text-yellow-400"><span className="text-yellow-400">★</span> {course.rating} Rating</div>
                    </div>
                </div>
                
                <div className="md:w-1/3 w-full">
                    {/* Reels / Shorts Section */}
                    {course.reels && (
                        <div className="relative">
                            <h3 className="text-indigo-200 text-sm font-bold uppercase tracking-wider mb-3">Course Shorts</h3>
                            <div className="flex gap-4 overflow-x-auto pb-4 snap-x no-scrollbar">
                                {course.reels.map((reel) => (
                                    <div key={reel.id} className="flex-shrink-0 w-32 h-56 bg-gray-800 rounded-xl overflow-hidden relative group cursor-pointer border-2 border-transparent hover:border-green-400 transition-all snap-start shadow-lg">
                                        <img src={reel.image} alt={reel.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full group-hover:scale-110 transition-transform">
                                                 <PlayCircle size={24} className="text-white fill-current" />
                                            </div>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/90 to-transparent">
                                            <p className="text-white text-xs font-bold line-clamp-2">{reel.title}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                 </div>
            </div>
        </div>

        {/* Sticky Navigation */}
        <div className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-10xl mx-auto px-6">
                <div className="flex gap-8 overflow-x-auto no-scrollbar">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => scrollToSection(tab.id)}
                            className={`py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                                activeTab === tab.id 
                                ? 'border-indigo-600 text-indigo-600' 
                                : 'border-transparent text-gray-500 hover:text-gray-800'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* Content Area */}
        <div className="max-w-10xl mx-auto px-6 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* Main Content (Left Side - 70% approx) */}
                <div className="lg:col-span-8 space-y-12">
                    
                    {/* About Section */}
                    <section id="about" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Course</h2>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-gray-600 leading-relaxed">
                            {course.about}
                        </div>
                    </section>

                     {/* Content / Modules Section */}
                     <section id="modules" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Modules</h2>
                        <div>
                            {course.modules.map((module, idx) => (
                                <AccordionModule 
                                    key={idx} 
                                    module={module} 
                                    index={idx}
                                    isOpen={openModuleIndex === idx}
                                    onClick={() => setOpenModuleIndex(openModuleIndex === idx ? -1 : idx)}
                                />
                            ))}
                        </div>
                    </section>

                     {/* Certificate Section */}
                     <section id="certificate" className="scroll-mt-24">
                        <CertificateSection />
                    </section>

                     {/* Benefits Section */}
                     <section id="benefits" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">What You Will Learn</h2>
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {course.benefits.map((bg, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-100 text-green-600 rounded-full p-1">
                                            <CheckCircle size={14} />
                                        </div>
                                        <span className="text-gray-700 font-medium">{bg}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Requirements Section */}
                    <section id="requirements" className="scroll-mt-24">
                        <RequirementsSection />
                    </section>

                </div>

                {/* Sidebar / Right Side (30% approx) - Enrollment Form */}
                <div className="lg:col-span-4 relative mt-10 lg:mt-0">
                     <div className="lg:sticky lg:top-[90px] space-y-6">
                        <EnrollmentCard />
                     </div>
                </div>
            
            </div>
        </div>
        
        {/* Floating enrollment button for mobile/easy access */}
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-lg md:hidden flex items-center justify-between z-50">
           <div>
               <span className="text-xs text-gray-500 line-through">₹{course.oldPrice}</span>
               <span className="block text-xl font-bold text-gray-900">₹{course.newPrice}</span>
           </div>
           <button className="bg-[#22C55E] text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-green-200">
               Enroll Now
           </button>
        </div>
    </div>
  );
};

export default CourseDetails;
