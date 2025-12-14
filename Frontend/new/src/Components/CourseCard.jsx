
import React from 'react';
import { Clock, Globe, Star, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';

const CourseCard = ({ course }) => {
  const { addNotification } = useNotification();

  const handleAddToWishlist = (e) => {
    e.preventDefault(); // Prevent navigation if wrapped in Link
    e.stopPropagation();
    addNotification();
    // Optional: Add toast or visual feedback here
    console.log("Added to notifications");
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
            {course.badge}
          </span>
        </div>
        <div className="absolute top-4 right-4">
            <button 
                onClick={handleAddToWishlist}
                className="p-2 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-red-500 hover:text-white transition-all transform active:scale-95"
            >
                <Heart size={18} />
            </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {course.title}
        </h3>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-xs text-gray-500 font-medium mb-6">
          <div className="flex items-center gap-1">
            <Clock size={14} className="text-indigo-500" />
            {course.duration}
          </div>
          <div className="flex items-center gap-1">
            <Globe size={14} className="text-green-500" />
            {course.language}
          </div>
          <div className="flex items-center gap-1">
            <Star size={14} className="text-orange-400 fill-orange-400" />
            {course.rating}
          </div>
        </div>

        {/* Pricing & Button Area */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
            <div>
                <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded mb-1 inline-block">50% Off</span>
                <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-green-600">₹{course.newPrice}</span>
                    <span className="text-xs text-gray-400 line-through">₹{course.oldPrice}</span>
                </div>
            </div>
            
            <Link 
                to={`/course/${course.id}`}
                className="bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-bold px-6 py-2.5 rounded-lg transition-all flex items-center gap-1 transform translate-y-1"
            >
                View More →
            </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
