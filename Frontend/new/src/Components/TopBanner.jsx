import React from 'react';

const TopBanner = () => {
  return (
    <div className="w-full h-12 bg-gradient-to-r  via-purple-600 to-indigo-700 flex items-center relative px-4 text-white overflow-hidden shadow-md">
      {/* Content Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-10xl flex justify-between items-center text-xs sm:text-sm h-full">
        
        {/* Scrolling Text (Takes available space) */}
        <div className="flex-1 overflow-hidden relative h-full flex items-center">
            <div className="w-full animate-marquee whitespace-nowrap flex items-center absolute">
                <span className="text-xs md:text-sm font-medium tracking-wide mx-4 flex items-center gap-2">
                <span className="animate-bounce">🚀</span> Secure your future with Intel AIML — Master GenAI, Agentic AI 🤖, Deep Learning 🧠, LLM & MLOps <span className="animate-pulse">✨</span>
                </span>
                <span className="text-xs md:text-sm font-medium tracking-wide mx-4 flex items-center gap-2">
                <span className="animate-bounce">🚀</span> Secure your future with Intel AIML — Master GenAI, Agentic AI 🤖, Deep Learning 🧠, LLM & MLOps <span className="animate-pulse">✨</span>
                </span>
            </div>
        </div>

        {/* Right-aligned Button (Stays inside container) */}
        <div className="z-20 pl-4 flex-shrink-0">
            <button className="bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600 text-white font-bold py-1 px-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md shadow-green-500/20 text-[10px] md:text-xs whitespace-nowrap border border-white/10 flex items-center backdrop-blur-sm">
                Apply Now
            </button>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
