import React from 'react';
import { motion } from 'framer-motion';
import avatar1 from '../assets/avatar_1.png';
import avatar2 from '../assets/avatar_2.png';
import avatar3 from '../assets/avatar_3.png';
import avatar4 from '../assets/avatar_4.png';
import avatar5 from '../assets/avatar_5.png';

const StatCard = ({ count, label, subLabel, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-gray-50 rounded-2xl p-6 flex flex-col justify-center items-start hover:shadow-lg transition-shadow duration-300 border border-transparent hover:border-gray-200"
  >
     <h3 className="text-4xl font-extrabold text-[#0A2540] mb-2">{count}</h3>
     <p className="text-lg font-semibold text-gray-800">{label}</p>
     {subLabel && <p className="text-sm text-gray-500">{subLabel}</p>}
  </motion.div>
);

const AvatarRow = () => (
    <div className="flex flex-col items-center justify-center mb-16">
        <div className="flex -space-x-4 mb-4">
            {[avatar1, avatar2, avatar3, avatar4, avatar5].map((src, i) => (
                <motion.img 
                    key={i}
                    src={src}
                    alt={`Community Member ${i+1}`}
                    initial={{ opacity: 0, scale: 0.5, x: -20 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.1, zIndex: 10 }}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white shadow-lg object-cover cursor-pointer hover:shadow-xl transition-all"
                />
            ))}
            <motion.div 
               initial={{ opacity: 0, scale: 0.5 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.6 }}
               className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white shadow-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg md:text-xl z-0"
            >
                +5k
            </motion.div>
        </div>
        <p className="text-slate-500 text-center max-w-lg">
            Our vibrant community produces content, teaches courses, and leads events all over the globe.
        </p>
    </div>
);

const CommunityFeatures = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl relative z-20">
        
        {/* Header */}
        <div className="text-center mb-12">
             <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
             >
                Why Choose Us
             </motion.div>
             <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold text-[#0A2540] mb-4 tracking-tight"
             >
                Why Choose the Prolync Community?
             </motion.h2>
             <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-slate-500 text-lg"
             >
                Built for modern learners, powered by collaboration and AI guidance.
             </motion.p>
        </div>

        {/* Avatar Row */}
        <AvatarRow />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
                count="5000+" 
                label="Learners" 
                subLabel="Asking questions daily"
                delay={0.2} 
            />
            <StatCard 
                count="805k+" 
                label="Subscribers" 
                subLabel="On YouTube"
                delay={0.3} 
            />
             <StatCard 
                count="5000+" 
                label="Students" 
                subLabel="On WhatsApp Channel"
                delay={0.4} 
            />
             <StatCard 
                count="10,000+" 
                label="Followers" 
                subLabel="On LinkedIn"
                delay={0.5} 
            />
        </div>

      </div>
    </section>
  );
};

export default CommunityFeatures;
