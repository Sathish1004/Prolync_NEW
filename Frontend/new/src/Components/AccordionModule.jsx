
import React, { useState } from 'react';
import { ChevronDown, Video, Lock } from 'lucide-react';

const AccordionModule = ({ module, index, isOpen, onClick }) => {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden mb-4 bg-white shadow-sm">
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between p-5 bg-gray-50 hover:bg-gray-100 transition text-left"
      >
        <div className="flex items-center gap-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold text-sm">
                {index + 1}
            </span>
            <span className="font-bold text-gray-900 text-lg">{module.title}</span>
        </div>
        <ChevronDown size={20} className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <div 
        className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${
            isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="p-5 border-t border-gray-100 bg-white">
            <ul className="space-y-3">
                {module.topics.map((topic, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-600 text-sm">
                        <Video size={16} className="text-gray-400" />
                        <span>{topic}</span>
                        <div className="ml-auto">
                           <Lock size={14} className="text-gray-300" /> 
                        </div>
                    </li>
                ))}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default AccordionModule;
