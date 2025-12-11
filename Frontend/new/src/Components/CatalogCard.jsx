import React from 'react';
import { Clock, Globe, Play, Heart } from 'lucide-react';

const CatalogCard = ({ course }) => {
  // Mock 'In Progress' for specific courses (e.g., id is even)
  const inProgress = course.id % 2 === 0;
  const progressValue = inProgress ? 45 : 0; // 45% progress if in progress

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-200 ease-out overflow-hidden flex flex-col h-full">
      
      {/* 1. Thumbnail Section */}
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Dark Overlay on Hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Badge: In Progress (Conditional) */}
        {inProgress && (
           <div className="absolute top-3 right-3 bg-[#4F46E5] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md tracking-wide uppercase">
             In Progress
           </div>
        )}
      </div>

      {/* 2. Content Area */}
      <div className="p-6 flex flex-col flex-grow">
         
         {/* Category Chip */}
         <div className="mb-3">
            <span className="inline-block px-3 py-1 bg-[#3B82F6] text-[#DBEAFE] text-[10px] uppercase font-bold tracking-wider rounded-full">
               {course.domain || "Development"}
            </span>
         </div>

         {/* Title */}
         <h3 className="text-[#0A2540] font-bold text-lg leading-snug mb-3 line-clamp-2">
            {course.title}
         </h3>

         {/* Meta Row */}
         <div className="flex items-center gap-4 text-xs text-slate-500 font-medium mb-5">
            <div className="flex items-center gap-1.5">
               <Clock size={14} className="text-[#4F46E5]" />
               <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
               <Globe size={14} className="text-[#4F46E5]" />
               <span>{course.language}</span>
            </div>
         </div>

         {/* 3. Progress Bar (Conditional) */}
         <div className="mt-auto mb-5 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
            {inProgress ? (
               <div 
                 className="h-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] rounded-full animate-pulse"
                 style={{ width: `${progressValue}%` }}
               ></div>
            ) : (
                <div className="h-full w-0"></div> // Hidden/Empty
            )}
         </div>

         {/* 4. Footer Action Row */}
         <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-auto">
             {/* Progress text or placeholder */}
             <div className="text-xs font-semibold text-indigo-600">
                {inProgress ? `${progressValue}% Completed` : 'Start Course'}
             </div>

             <div className="flex items-center gap-3">
                {/* Save Button */}
                <button className="p-2 rounded-full border border-gray-200 text-gray-400 hover:text-purple-600 hover:border-purple-200 hover:bg-purple-50 transition-colors">
                   <Heart size={16} />
                </button>
                {/* Continue/Play Button */}
                <button className="p-2 rounded-full border border-indigo-100 text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white transition-all shadow-sm hover:shadow-indigo-500/30 group/play">
                   <Play size={16} className="ml-0.5 fill-current" />
                </button>
             </div>
         </div>
      </div>
    </div>
  );
};

export default CatalogCard;
