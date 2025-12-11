import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, Clock, Users, Star } from 'lucide-react';
import CourseCard from './CourseCard';
import { courses } from '../data/courses';

const TrendingCourses = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('Paid');
  
  const tabs = [
    { id: 'Paid', label: 'Paid Courses', icon: TrendingUp },
    { id: 'Combo', label: 'Combo Courses', icon: Sparkles },
    { id: 'Free', label: 'Free Courses', icon: Star }
  ];

  // Filter courses based on active tab
  const filteredCourses = courses.filter(course => {
    if (activeTab === 'Paid') return course.category === 'Paid';
    if (activeTab === 'Free') return course.category === 'Free';
    if (activeTab === 'Combo') return course.category === 'Combo';
    return course.category === activeTab;
  });

  // Course stats for the header
  const courseStats = [
    { value: '100+', label: 'Total Courses', icon: '📚' },
    { value: '4.9', label: 'Avg Rating', icon: '⭐' },
    { value: '50K+', label: 'Students', icon: '👥' },
    { value: '98%', label: 'Completion', icon: '🎯' },
  ];

  const [hoveredCourse, setHoveredCourse] = useState(null);

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Advanced Background with Gradient Mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/40 via-white to-cyan-50/30"></div>
      
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

        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {courseStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.05 }}
              className="bg-gradient-to-br from-white/80 to-white/40 rounded-2xl p-6 shadow-xl shadow-gray-200/30 border border-white/60 backdrop-blur-sm group hover:shadow-indigo-200/30 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex items-center gap-4 relative z-10">
                <div className="text-3xl">{stat.icon}</div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
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
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-gradient-to-br from-white/80 to-white/40 rounded-2xl p-8 shadow-2xl shadow-indigo-100/30 border border-white/60 backdrop-blur-sm max-w-4xl mx-auto relative overflow-hidden">
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
            
            <div className="text-left relative z-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Start Learning?</h3>
              <p className="text-gray-600">Explore our complete catalog of 100+ courses across all categories.</p>
            </div>
            <div className="flex gap-4 relative z-10">
              <motion.button
                onClick={() => onNavigate('courses')}
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
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-br from-white to-gray-50 text-gray-800 font-semibold rounded-xl border border-gray-200 shadow-lg shadow-gray-200/30 hover:shadow-xl hover:shadow-gray-300/30 transition-all duration-300"
              >
                View Pricing
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrendingCourses;
