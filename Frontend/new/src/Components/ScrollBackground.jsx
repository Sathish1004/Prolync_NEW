import React, { useEffect, useState } from 'react';

const ScrollBackground = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax calculation
  // We want the background to move slower than the content (e.g., 0.3 speed)
  // This means as we scroll DOWN (scrollY increases), the background should move UP but less than the content.
  // Actually, usually parallax backgrounds move slightly DOWN relative to the viewport to look "far away", 
  // or simply stay fixed. The prompt asks for "Background shadows move at 30% scroll speed".
  // If content moves 100px up, background moves 30px up (relative to screen) -> translateY(-30px)?
  // Let's try simple offset.

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* 1. Ultra-Clean Base Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC] to-[#FFFFFF]"></div>

      {/* 2. Scroll-Triggered Shadow Blocks */}
      
      {/* Hero Section Shadow (Top Right) */}
      <div 
        className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-indigo-200/20 rounded-full blur-[100px] mix-blend-multiply transition-opacity duration-1000"
        style={{ 
            transform: `translateY(${scrollY * 0.2}px) rotate(${scrollY * 0.02}deg)`,
            opacity: Math.max(0, 1 - scrollY / 800) // Fade out as we scroll past hero
        }}
      ></div>

      {/* Trending Courses Shadow (Middle Left - Approximated position) */}
      <div 
        className="absolute top-[40vh] -left-[10%] w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-[80px] mix-blend-multiply transition-opacity duration-1000"
        style={{ 
            transform: `translateY(${scrollY * 0.15}px) rotate(-${scrollY * 0.01}deg)`,
            opacity: scrollY > 300 ? 0.8 : 0 
        }}
      ></div>

      {/* Workshop Preview Shadow (Lower Right) */}
      <div 
        className="absolute top-[120vh] -right-[10%] w-[700px] h-[700px] bg-purple-200/20 rounded-full blur-[90px] mix-blend-multiply transition-opacity duration-1000"
        style={{ 
             transform: `translateY(${scrollY * 0.1}px)`,
             opacity: scrollY > 800 ? 0.8 : 0
        }}
      ></div>

      {/* 3. Soft Floating Image Shadows / Abstract Patterns */}
      {/* Diagonal Streak */}
      <div 
        className="absolute top-[20%] left-[20%] w-[1000px] h-[20px] bg-gradient-to-r from-transparent via-indigo-100/40 to-transparent transform -rotate-45 blur-xl"
        style={{ transform: `translateY(${scrollY * 0.4}px) rotate(-45deg)` }}
      ></div>

       {/* Ring Halo (Centerish) */}
       <div 
        className="absolute top-[60%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] border-[40px] border-slate-50/50 rounded-full blur-[50px]"
        style={{ transform: `translateX(-50%) translateY(${scrollY * 0.1}px)` }}
      ></div>

    </div>
  );
};

export default ScrollBackground;
