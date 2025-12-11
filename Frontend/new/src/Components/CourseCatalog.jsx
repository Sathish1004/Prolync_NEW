import React, { useState } from 'react';
import CourseCard from './CourseCard';
import { courses } from '../data/courses';

const CourseCatalog = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = [
    "All",
    "Web Development",
    "AI & Tech",
    "Data Science", // Mapped from Programming & Data for demo
    "Cloud & DevOps",
    "Mobile Development"
  ];

  // Map simplified filter categories to data domains if needed
  const filteredCourses = activeCategory === 'All' 
    ? courses 
    : courses.filter(course => {
        if (activeCategory === "Data Science") return course.domain === "Programming & Data" || course.domain === "Data Science";
        if (activeCategory === "Web Development") return course.domain === "Web Development";
        if (activeCategory === "AI & Tech") return course.domain === "AI & Tech" || course.domain === "AI";
        if (activeCategory === "Mobile Development") return course.domain === "Mobile Development";
        if (activeCategory === "Cloud & DevOps") return course.domain === "Cloud & DevOps";
        return course.domain === activeCategory;
    });

  return (
    <div className="min-h-screen bg-slate-50 pt-8 pb-20">
      <div className="container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header with Breadcrumbs & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
           <div className="text-left">
              {/* Breadcrumb */}
              <nav className="flex items-center text-sm text-slate-500 mb-3 animate-fade-in">
                  <span className="hover:text-indigo-600 cursor-pointer transition-colors">Home</span>
                  <span className="mx-2">/</span>
                  <span className="font-semibold text-indigo-600">Courses</span>
              </nav>
              
              <h1 className="text-3xl md:text-4xl font-bold text-[#0A2540] mb-2 tracking-tight">Explore All Courses</h1>
              <p className="text-slate-500 text-lg">Browse courses across multiple categories and skill levels.</p>
           </div>

           {/* Search Bar */}
           <div className="relative w-full md:w-80">
              <input 
                type="text" 
                placeholder="Search courses..." 
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm"
              />
              <svg className="absolute left-3.5 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
           </div>
        </div>

        {/* Sticky Category Filters */}
        <div className="sticky top-[80px] z-30 bg-slate-50/95 backdrop-blur-sm py-4 mb-8 -mx-4 px-4 md:mx-0 md:px-0">
           <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm border ${
                    activeCategory === cat
                      ? 'bg-[#4F46E5] text-white border-[#4F46E5] shadow-indigo-500/30 shadow-md'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
           </div>
        </div>

        {/* Course Grid - 4 Column */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
           {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
           ))}
        </div>

        {filteredCourses.length === 0 && (
            <div className="text-center py-20">
                <p className="text-gray-400">No courses found in this category.</p>
            </div>
        )}

      </div>
    </div>
  );
};

export default CourseCatalog;
