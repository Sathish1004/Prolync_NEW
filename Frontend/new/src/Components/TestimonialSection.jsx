import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Akhil S.",
    role: "Full Stack Trainee",
    quote: "Prolync helped me master Full Stack Development with structured guidance and real-time mentor support. The projects boosted my confidence and helped me get placed.",
    rating: 5
  },
  {
    id: 2,
    name: "Priya M.",
    role: "Data Science Intern",
    quote: "The practical approach to AI & ML concepts was refreshing. I built real models that I could show in my interviews. Truly a career-changing experience.",
    rating: 5
  },
  {
    id: 3,
    name: "Rahul Verma",
    role: "Cloud Engineer",
    quote: "I struggled with AWS concepts until I joined Prolync. The hands-on labs and certification roadmap made everything clear and achievable.",
    rating: 5
  }
];

// Using random Unsplash avatars for the cluster
const avatars = [
  { src: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=256&h=256&auto=format&fit=crop", size: "w-24 h-24", pos: "top-10 left-20", delay: 0 },
  { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&auto=format&fit=crop", size: "w-32 h-32", pos: "top-1/3 left-1/3", delay: 1, main: true },
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&auto=format&fit=crop", size: "w-20 h-20", pos: "bottom-20 left-10", delay: 2 },
  { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&h=256&auto=format&fit=crop", size: "w-28 h-28", pos: "top-20 right-20", delay: 1.5 },
  { src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=256&h=256&auto=format&fit=crop", size: "w-16 h-16", pos: "bottom-1/3 right-10", delay: 0.5 },
  { src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=256&h=256&auto=format&fit=crop", size: "w-20 h-20", pos: "top-0 right-1/3", delay: 2.5 },
  { src: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=256&h=256&auto=format&fit=crop", size: "w-14 h-14", pos: "bottom-10 right-1/4", delay: 1 },
   { src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=256&h=256&auto=format&fit=crop", size: "w-16 h-16", pos: "top-1/2 left-0", delay: 1.2 },
];

const TestimonialSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const handlePrev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 max-w-10xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Testimonial Text */}
          <div className="relative z-10 space-y-8">
            <div>
              <span className="text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-2 block">
                Learning Testimonials
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Some feedback from <br /> our <span className="text-purple-600">learners</span>
              </h2>
            </div>
            
            {/* Stars */}
            <div className="flex gap-1">
               {[...Array(5)].map((_, i) => (
                 <Star key={i} size={24} className="fill-amber-400 text-amber-400" />
               ))}
            </div>

            {/* Content Slider */}
            <div className="min-h-[200px] relative">
              <AnimatePresence mode='wait'>
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <p className="text-xl text-gray-600 leading-relaxed font-medium">
                    "{testimonials[current].quote}"
                  </p>
                  <div>
                    <h4 className="text-2xl font-bold text-blue-600">
                      {testimonials[current].name}
                    </h4>
                    <p className="text-gray-500 font-medium">
                      {testimonials[current].role}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex gap-4">
              <button 
                onClick={handlePrev}
                className="w-12 h-12 rounded-full bg-gray-100 hover:bg-purple-100 text-gray-600 hover:text-purple-600 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={handleNext}
                className="w-12 h-12 rounded-full bg-gray-100 hover:bg-purple-100 text-gray-600 hover:text-purple-600 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          {/* Right Column: Avatar Cluster */}
          <div className="relative h-[500px] w-full hidden lg:block perspective-1000">
             {/* Central Glow */}
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
             
             {avatars.map((av, idx) => (
               <motion.div
                 key={idx}
                 className={`absolute ${av.pos} ${av.size} rounded-full border-[3px] border-white shadow-xl overflow-hidden cursor-pointer`}
                 initial={{ y: 0, scale: 0.8, opacity: 0 }}
                 animate={{ 
                    y: [0, -15, 0],
                    scale: 1,
                    opacity: 1
                 }}
                 transition={{ 
                   y: { duration: 3 + Math.random(), repeat: Infinity, ease: "easeInOut", delay: av.delay },
                   opacity: { duration: 0.5, delay: idx * 0.1 },
                   scale: { duration: 0.5, delay: idx * 0.1 }
                 }}
                 whileHover={{ scale: 1.15, zIndex: 10 }}
               >
                 <img src={av.src} alt="Learner" className="w-full h-full object-cover" />
                 
                 {/* Tooltip for Main Avatar */}
                 {av.main && (
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.8 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     transition={{ delay: 1 }}
                     className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-3 rounded-lg shadow-lg whitespace-nowrap"
                   >
                     Learner Feedback
                     <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                   </motion.div>
                 )}
               </motion.div>
             ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
