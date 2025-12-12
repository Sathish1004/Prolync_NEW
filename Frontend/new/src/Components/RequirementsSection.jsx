
import React from 'react';
import { Monitor, Cpu, User } from 'lucide-react';

const RequirementsSection = () => {
  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">All You Need to Start This Course</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                <Cpu size={24} />
            </div>
            <div>
                <h4 className="font-bold text-gray-900">Enthusiasm to Learn</h4>
                <p className="text-xs text-gray-500">No prior coding experience required</p>
            </div>
        </div>
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                <Monitor size={24} />
            </div>
            <div>
                <h4 className="font-bold text-gray-900">Computer & Internet</h4>
                <p className="text-xs text-gray-500">Mac or Windows with stable connection</p>
            </div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-6">This course is for you if...</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["Students", "Job Seekers", "Freelancers"].map((role, i) => (
             <div key={i} className="flex flex-col items-center justify-center p-6 border border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition cursor-default">
                 <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                     <User size={20} className="text-gray-600" />
                 </div>
                 <span className="font-bold text-gray-800">{role}</span>
             </div> 
          ))}
      </div>
    </div>
  );
};

export default RequirementsSection;
