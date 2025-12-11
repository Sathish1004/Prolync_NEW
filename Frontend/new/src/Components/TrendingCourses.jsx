import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import CourseCard from './CourseCard';
import { courses } from '../data/courses';

const TrendingCourses = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('Paid');
  const tabs = ['Paid', 'Combo', 'Free'];

  // Filter courses based on active tab
  const filteredCourses = courses.filter(course => {
      if (activeTab === 'Paid') return course.category === 'Paid';
      if (activeTab === 'Free') return course.category === 'Free';
      if (activeTab === 'Combo') return course.category === 'Combo';
      return course.category === activeTab;
  });

  return (
    <section className="py-20 bg-transparent relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="text-left">
              <h2 className="text-4xl font-extrabold text-[#0A2540] tracking-tight mb-3">Trending Courses</h2>
              <p className="text-slate-500 text-lg font-medium">Explore our most popular programs updated weekly.</p>
            </div>

            {/* Neo-Minimal Tabs */}
            <div className="flex items-center p-1.5 bg-white/60 backdrop-blur-md rounded-full border border-white/40 shadow-sm">
             {tabs.map((tab) => (
               <button
                 key={tab}
                 onClick={() => setActiveTab(tab)}
                 className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                   activeTab === tab 
                     ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20' 
                     : 'bg-transparent text-slate-500 hover:text-indigo-600 hover:bg-white/50'
                 }`}
               >
                 {tab}
               </button>
             ))}
            </div>
        </div>

        {/* Course Grid - 4 Column */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        
        {filteredCourses.length === 0 && (
            <div className="text-center py-24 text-slate-400 font-medium bg-white/40 rounded-3xl border border-dashed border-slate-200">
                No courses found in this category yet.
            </div>
        )}

        {/* Explore All Link - Centered Button */}
        <div className="mt-12 text-center">
            <button 
              onClick={() => onNavigate('courses')}
              className="group inline-flex items-center gap-2 px-8 py-3 bg-white text-indigo-600 font-bold rounded-full border-2 border-indigo-50 shadow-sm hover:border-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300 hover:shadow-indigo-200"
            >
              Explore All Courses
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>

      </div>
    </section>
  );
};

export default TrendingCourses;
