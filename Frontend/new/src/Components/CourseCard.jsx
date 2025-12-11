import React from 'react';
import { Clock, Globe, Heart } from 'lucide-react';

const CourseCard = ({ course }) => {
  const isFree = course.category === 'Free';

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex flex-col h-full relative">
      
      {/* Thumbnail Container */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Gradient Overlay for neon effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent opacity-60"></div>

        {/* Badge */}
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-md text-xs font-bold text-white uppercase tracking-wide ${isFree ? 'bg-blue-600' : 'bg-red-500'}`}>
          {isFree ? 'Free' : 'Paid'}
        </div>
        
        {/* Wishlist/Heart Icon */}
        <button className="absolute top-3 right-3 p-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/40 transition">
             <Heart size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-[#0A2540] font-bold text-base md:text-lg mb-2 line-clamp-2 leading-tight">
          {course.title}
        </h3>

        {/* Meta Info */}
        <div className="flex items-center text-gray-500 text-xs md:text-sm mb-4 space-x-4">
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center">
            <Globe size={14} className="mr-1" />
            <span>{course.language}</span>
          </div>
        </div>

        {/* Pricing / CTA Section */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          
          {/* Left Side: Price */}
          <div className="flex flex-col">
            {isFree ? (
               <span className="text-green-600 font-bold text-lg">FREE</span>
            ) : (
                <>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 font-bold text-lg">₹{course.price}</span>
                    <span className="text-gray-400 text-xs line-through">₹{course.originalPrice}</span>
                  </div>
                  <span className="text-[10px] text-yellow-600 font-medium bg-yellow-50 px-1.5 py-0.5 rounded w-fit mt-1">
                    {course.discount} Off
                  </span>
                </>
            )}
          </div>

          {/* Right Side: View More Button */}
          <button className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors shadow-sm shadow-purple-200">
            View More
          </button>

        </div>
      </div>
    </div>
  );
};

export default CourseCard;
