import React from 'react';
import { Clock, Globe, ArrowRight } from 'lucide-react';

const WorkshopCard = ({ workshop }) => {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={workshop.image} 
          alt={workshop.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>
        {/* Badge */}
        <div className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider shadow-md">
          Workshop
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-[#0A2540] font-bold text-lg mb-2 leading-tight group-hover:text-purple-600 transition-colors">
          {workshop.title}
        </h3>
        
        <p className="text-slate-500 text-sm mb-4 line-clamp-2">
          {workshop.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-slate-500 font-medium mb-6">
           <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-purple-500" />
              <span>{workshop.duration}</span>
           </div>
           <div className="flex items-center gap-1.5">
              <Globe size={14} className="text-purple-500" />
              <span>{workshop.mode}</span>
           </div>
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
           <div className="flex flex-col">
              <span className="text-lg font-bold text-[#0A2540]">
                {workshop.price === 'Free' ? 'Free' : `₹${workshop.price}`}
              </span>
              {workshop.originalPrice && (
                 <span className="text-xs text-slate-400 line-through">₹{workshop.originalPrice}</span>
              )}
           </div>
           
           <button className="flex items-center gap-2 bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300">
             Apply Now
             <ArrowRight size={16} />
           </button>
        </div>
      </div>
    </div>
  );
};

export default WorkshopCard;
