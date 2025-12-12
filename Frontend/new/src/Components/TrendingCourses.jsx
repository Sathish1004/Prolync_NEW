import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, Clock, Users, Star, GraduationCap, Award, BookOpen, Video, Laptop, Code, FileText } from 'lucide-react';
import CourseCard from './CourseCard';
import { courses } from '../data/courses';

const TrendingCourses = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Paid');
  
  const tabs = [
    { id: 'Paid', label: 'Paid Courses', icon: TrendingUp },
    { id: 'Free', label: 'Free Courses', icon: Star }
  ];

  // Filter courses based on active tab
  const filteredCourses = courses.filter(course => {
    if (activeTab === 'Paid') return course.category === 'Paid';
    if (activeTab === 'Free') return course.category === 'Free';
    return course.category === activeTab;
  });

  const [hoveredCourse, setHoveredCourse] = useState(null);

  return (
    <section className="relative py-8 lg:py-12 overflow-hidden">
      {/* ... (previous background code) ... */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/40 via-white to-cyan-50/30"></div>
      
      {/* ... (rest of the component structure until the CTA) ... */}
      
      {/* Animated Gradient Blobs */}
      <motion.div 
        className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full"
        animate={{
          background: [
            'radial-gradient(circle at 30% 30%, rgba(79, 70, 229, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 70% 70%, rgba(79, 70, 229, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 30% 30%, rgba(79, 70, 229, 0.15) 0%, transparent 50%)',
          ]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full"
        animate={{
          background: [
            'radial-gradient(circle at 70% 70%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 30% 30%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 70% 70%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)',
          ]
        }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" className="text-indigo-500"/>
        </svg>
      </div>

      {/* Floating Elements */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-indigo-500/20 to-cyan-500/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-white/80 to-white/40 backdrop-blur-sm border border-white/60 shadow-lg mb-6">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              Weekly Updated
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Trending{' '}
            </span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
                Courses
              </span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
            Explore our most popular programs, handpicked and updated weekly by industry experts.
          </p>
        </motion.div>

        {/* Header Row with Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8"
        >
          <div className="text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Explore Our Most Popular Programs
            </h3>
            <p className="text-gray-600 font-medium">
              Updated weekly based on enrollment trends and student feedback
            </p>
          </div>

          {/* Premium Glass Morphism Tabs */}
          <div className="flex items-center p-1.5 bg-gradient-to-br from-white/80 to-white/40 rounded-2xl border border-white/60 backdrop-blur-sm shadow-xl shadow-gray-200/30">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                    activeTab === tab.id 
                      ? 'text-white' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Course Grid - 4 Column with Enhanced Animations */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="h-full"
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {/* No Courses Message */}
        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24 bg-gradient-to-br from-white/60 to-white/40 rounded-3xl border border-dashed border-gray-200 backdrop-blur-sm"
          >
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              We're working on adding more {activeTab.toLowerCase()} courses. Check back soon!
            </p>
          </motion.div>
        )}

        {/* Explore All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-gradient-to-r from-indigo-50 via-purple-50 to-cyan-50 rounded-2xl p-8 shadow-2xl shadow-indigo-100/30 border border-indigo-100/60 backdrop-blur-sm w-[100%] max-w-7xl mx-auto relative overflow-hidden">
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  'linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)',
                  'linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(79, 70, 229, 0.05) 100%)',
                  'linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)',
                ]
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            
            <div className="text-left relative z-10 max-w-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Start Learning?</h3>
              <p className="text-gray-600">Explore our complete catalog of 100+ courses .</p>
            </div>

            {/* DECORATIVE FLOATING CIRCLES */}
            <div className="absolute right-0 top-0 bottom-0 w-1/3 overflow-hidden pointer-events-none z-0 hidden lg:block">
                 {[
                    { Icon: GraduationCap, size: 80, text: 'text-indigo-600', ring: 'border-indigo-200', top: '10%', right: '15%', delay: 0, duration: 6, y: -20 },
                    { Icon: Award, size: 60, text: 'text-pink-600', ring: 'border-pink-200', top: '60%', right: '25%', delay: 1, duration: 5, y: 15 },
                    { Icon: BookOpen, size: 50, text: 'text-blue-600', ring: 'border-blue-200', top: '30%', right: '50%', delay: 2, duration: 7, y: -15 },
                    { Icon: Video, size: 45, text: 'text-purple-600', ring: 'border-purple-200', top: '80%', right: '10%', delay: 0.5, duration: 5.5, y: 10 },
                    { Icon: Laptop, size: 55, text: 'text-emerald-600', ring: 'border-emerald-200', top: '20%', right: '70%', delay: 1.5, duration: 6.5, y: -25 },
                    { Icon: Code, size: 40, text: 'text-orange-600', ring: 'border-orange-200', top: '50%', right: '5%', delay: 2.5, duration: 4.5, y: 12 },
                    { Icon: FileText, size: 40, text: 'text-cyan-600', ring: 'border-cyan-200', top: '75%', right: '45%', delay: 0.8, duration: 6, y: -10 }
                 ].map((item, idx) => (
                    <motion.div
                        key={idx}
                        className="absolute flex items-center justify-center"
                        style={{ 
                            width: item.size, 
                            height: item.size,
                            top: item.top,
                            right: item.right
                        }}
                        animate={{ y: [0, item.y, 0] }}
                        transition={{ 
                            duration: item.duration, 
                            repeat: Infinity, 
                            ease: "easeInOut",
                            delay: item.delay 
                        }}
                    >
                        {/* Orbiting Outer Ring */}
                        <motion.div
                            className={`absolute -inset-4 rounded-full border border-dashed ${item.ring} opacity-60`}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10 + idx * 2, repeat: Infinity, ease: "linear" }}
                        />
                        
                        {/* 3D Glass Bubble */}
                        <div className={`relative w-full h-full rounded-full bg-gradient-to-br from-white via-white/80 to-white/40 backdrop-blur-md shadow-[0_8px_32px_rgba(31,38,135,0.15)] border border-white/60 flex items-center justify-center ${item.text}`}>
                             <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/50 to-white opacity-80" />
                             <item.Icon size={item.size * 0.5} strokeWidth={1.5} className="relative z-10 drop-shadow-sm" />
                        </div>

                        {/* Tiny Satellite Dot */}
                        <motion.div 
                            className={`absolute w-2 h-2 rounded-full ${item.text.replace('text-', 'bg-')} top-0 right-0`}
                            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            style={{ top: -5, right: '20%' }}
                        />
                    </motion.div>
                 ))}
            </div>

            <div className="flex gap-4 relative z-10 sm:absolute sm:left-1/2 sm:top-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2">
              <motion.button
                onClick={() => navigate('/courses')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/50 transition-all duration-300 relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
                <span className="relative z-10">Explore All Courses</span>
                <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrendingCourses;
