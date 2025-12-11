import React from 'react';

const TopBanner = () => {
  return (
    <div className="w-full h-12 bg-gradient-to-r  via-purple-600 to-indigo-700 flex items-center relative px-4 text-white overflow-hidden shadow-md">
      {/* Scrolling Text Container */}
      <div className="w-full overflow-hidden flex items-center">
        <div className="w-full animate-marquee whitespace-nowrap flex items-center">
            <span className="text-xs md:text-sm font-medium tracking-wide mx-4 flex items-center gap-2">
              <span className="animate-bounce">🚀</span> Secure your future with Intel AIML — Master GenAI, Agentic AI 🤖, Deep Learning 🧠, LLM & MLOps <span className="animate-pulse">✨</span>
            </span>
            <span className="text-xs md:text-sm font-medium tracking-wide mx-4 flex items-center gap-2">
               <span className="animate-bounce">🚀</span> Secure your future with Intel AIML — Master GenAI, Agentic AI 🤖, Deep Learning 🧠, LLM & MLOps <span className="animate-pulse">✨</span>
            </span>
        </div>
      </div>

      {/* Right-aligned Button */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 pl-4">
        <button className="bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600 text-white font-bold py-1 px-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md shadow-green-500/20 text-[10px] md:text-xs whitespace-nowrap border border-white/10 flex items-center backdrop-blur-sm">
            Apply Now
        </button>
      </div>
    </div>
  );
};

export default TopBanner;
