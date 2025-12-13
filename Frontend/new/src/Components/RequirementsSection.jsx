
import React from 'react';
import { Monitor, TrendingUp, Code, User, CheckCircle } from 'lucide-react';

const RequirementsSection = () => {
  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm font-sans">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">You are eligible for this course and software developer roles if you have:</h3>
      
      {/* Eligibility Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="flex flex-col gap-4 p-5 bg-indigo-50/50 rounded-xl border border-indigo-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-white text-indigo-600 rounded-full flex items-center justify-center shadow-sm">
                <TrendingUp size={24} />
            </div>
            <div>
                <h4 className="font-bold text-gray-900 text-lg mb-2">Passion to Learn & Grow</h4>
                <p className="text-sm text-gray-600 leading-relaxed">No prior coding experience is required. A strong interest in learning technology is enough to start.</p>
            </div>
        </div>
        
        <div className="flex flex-col gap-4 p-5 bg-purple-50/50 rounded-xl border border-purple-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-white text-purple-600 rounded-full flex items-center justify-center shadow-sm">
                <Monitor size={24} />
            </div>
            <div>
                <h4 className="font-bold text-gray-900 text-lg mb-2">Basic Computer Knowledge</h4>
                <p className="text-sm text-gray-600 leading-relaxed">You can operate a computer and use the internet for learning and practice.</p>
            </div>
        </div>

        <div className="flex flex-col gap-4 p-5 bg-blue-50/50 rounded-xl border border-blue-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-sm">
                <Code size={24} />
            </div>
            <div>
                <h4 className="font-bold text-gray-900 text-lg mb-2">Career Goal in Tech</h4>
                <p className="text-sm text-gray-600 leading-relaxed">If you aim to become a Software Developer, Full Stack Developer, or Web Developer, this course is designed for you.</p>
            </div>
        </div>
      </div>

      {/* Role Confirmation Box */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 mb-10">
          <h4 className="font-bold text-gray-900 text-lg mb-4">You can become eligible for roles such as:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {['Software Developer', 'Full Stack Developer', 'Frontend Developer', 'Junior Backend Developer'].map((role, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
                      <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                      <span className="text-sm font-medium text-gray-800">{role}</span>
                  </div>
              ))}
          </div>
          <p className="text-sm text-green-800 font-medium py-2 px-4 bg-green-100/50 rounded-lg inline-block">
            This course builds the required skills step-by-step to make you job-ready.
          </p>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-6">This course is for you if...</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
           <div className="flex flex-col items-center justify-center p-6 border border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition cursor-default text-center group">
               <div className="w-12 h-12 bg-gray-100 group-hover:bg-white rounded-full flex items-center justify-center mb-3 transition-colors">
                   <User size={24} className="text-gray-600 group-hover:text-indigo-600" />
               </div>
               <span className="font-bold text-gray-900 mb-1">Students</span>
               <p className="text-xs text-gray-500">Students aiming for a software career</p>
           </div> 

           <div className="flex flex-col items-center justify-center p-6 border border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition cursor-default text-center group">
               <div className="w-12 h-12 bg-gray-100 group-hover:bg-white rounded-full flex items-center justify-center mb-3 transition-colors">
                   <User size={24} className="text-gray-600 group-hover:text-indigo-600" />
               </div>
               <span className="font-bold text-gray-900 mb-1">Job Seekers</span>
               <p className="text-xs text-gray-500">Job seekers preparing for developer roles</p>
           </div> 

           <div className="flex flex-col items-center justify-center p-6 border border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition cursor-default text-center group">
               <div className="w-12 h-12 bg-gray-100 group-hover:bg-white rounded-full flex items-center justify-center mb-3 transition-colors">
                   <User size={24} className="text-gray-600 group-hover:text-indigo-600" />
               </div>
               <span className="font-bold text-gray-900 mb-1">Freelancers</span>
               <p className="text-xs text-gray-500">Freelancers upgrading to development projects</p>
           </div> 
      </div>
    </div>
  );
};

export default RequirementsSection;
