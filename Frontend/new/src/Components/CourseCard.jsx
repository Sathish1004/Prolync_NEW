import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Globe, Star, Heart, ArrowRight } from 'lucide-react';

const CourseCard = ({ course }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full group"
    >
      {/* 1. Header Section (Thumbnail) */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>

        {/* Top-Left: Category Badge */}
        <div className="absolute top-4 left-4">
           <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-sm ${
               course.category === 'Paid' ? 'bg-indigo-500' :
               course.category === 'Free' ? 'bg-green-500' :
               'bg-orange-500'
           }`}>
               {course.category}
           </span>
        </div>

        {/* Top-Right: Wishlist Icon */}
        <div className="absolute top-4 right-4">
            <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-red-500 transition-all duration-300">
                <Heart size={18} />
            </button>
        </div>
      </div>

      {/* 2. Content Section */}
      <div className="p-6 flex flex-col flex-grow">
          
          {/* Title */}
          <h3 className="text-lg font-bold text-[#0F172A] mb-3 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">
              {course.title}
          </h3>

          {/* Meta Info Row */}
          <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-6 py-3 border-t border-b border-slate-50">
              <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-indigo-500" />
                  <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                  <Globe size={14} className="text-green-500" />
                  <span>{course.language}</span>
              </div>
              <div className="flex items-center gap-1.5">
                  <Star size={14} className="text-amber-500 fill-amber-500" />
                  <span>{course.rating}</span>
              </div>
          </div>

          {/* Price & CTA Section */}
          <div className="mt-auto flex items-end justify-between">
              <div>
                  {/* Discount Badge */}
                  {course.discount && (
                      <span className="inline-block px-2 py-0.5 bg-yellow-100 text-yellow-700 text-[10px] font-bold rounded-full mb-1">
                          {course.discount}
                      </span>
                  )}
                  
                  <div className="flex items-baseline gap-2">
                       <span className="text-xl font-bold text-[#10B981]">
                           {course.price === 0 || course.price === 'Free' ? 'Free' : `₹${course.price}`}
                       </span>
                       {course.originalPrice > 0 && (
                           <span className="text-sm text-gray-400 line-through">
                               ₹{course.originalPrice}
                           </span>
                       )}
                  </div>
              </div>

              {/* View More Button */}
              <button className="group/btn flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0BA360] to-[#3BD97F] text-white text-sm font-bold rounded-lg shadow-md hover:shadow-green-500/30 transform hover:scale-105 transition-all duration-300">
                  View More
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
          </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
