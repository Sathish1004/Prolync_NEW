import React from 'react';
import { motion } from 'framer-motion';
import { FaDiscord, FaSlack, FaReddit, FaTwitter, FaFacebook, FaReact, FaNodeJs, FaPython, FaHtml5, FaCss3, FaJs, FaAws } from 'react-icons/fa';
import { SiFirebase, SiMongodb } from 'react-icons/si';
import { Users, MessageCircle, Share2, CheckCircle, ShieldCheck, Rocket } from 'lucide-react';

const FeatureCard = ({ title, description, children, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ y: -5, scale: 1.02 }}
    className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl border border-gray-100 hover:border-indigo-200 transition-all duration-300 relative overflow-hidden group h-full flex flex-col"
  >
    {/* Soft Gradient Background */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC] to-white pointer-events-none"></div>
    
    {/* Card Content */}
    <div className="relative z-10 flex flex-col h-full">
        {/* Icon Area */}
        <div className="h-32 mb-6 flex items-center justify-center relative">
            {children}
        </div>

        <h3 className="text-xl font-bold text-[#0A2540] mb-3 group-hover:text-indigo-600 transition-colors">
            {title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed">
            {description}
        </p>
    </div>
  </motion.div>
);

const FloatingIcon = ({ icon: Icon, color, className, delay = 0 }) => (
    <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
        className={`absolute bg-white p-2.5 rounded-xl shadow-md border border-gray-100 text-${color}-500 ${className}`}
    >
        <Icon size={20} />
    </motion.div>
);

const CommunityFeatures = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-10xl relative z-20">
        
        {/* Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
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
                className="text-4xl md:text-5xl font-bold text-[#0A2540] mb-6 tracking-tight"
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

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

            {/* CARD 1: Support Network */}
            <FeatureCard 
                title="24/7 Learning Support Network" 
                description="Get answers fast from mentors & peers anytime. Never get stuck on a bug again."
                delay={0.1}
            >
                <div className="relative w-full h-full flex items-center justify-center bg-indigo-50/50 rounded-2xl overflow-hidden">
                   <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.1]"></div>
                   <FloatingIcon icon={FaDiscord} color="indigo" className="top-4 left-4" delay={0} />
                   <FloatingIcon icon={FaSlack} color="purple" className="top-8 right-6" delay={1} />
                   <FloatingIcon icon={FaReddit} color="orange" className="bottom-6 left-8" delay={2} />
                   <FloatingIcon icon={FaTwitter} color="sky" className="bottom-8 right-4" delay={1.5} />
                   <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center z-10 relative">
                       <MessageCircle size={24} className="text-indigo-600" />
                       <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                   </div>
                </div>
            </FeatureCard>

            {/* CARD 2: Choose Tech Language */}
            <FeatureCard 
                title="Choose Your Tech Language" 
                description="Learn in your preferred ecosystem with structured paths designed by industry experts."
                delay={0.2}
            >
                <div className="grid grid-cols-3 gap-3 p-4 bg-white rounded-2xl shadow-inner border border-gray-50 w-full rotate-3 hover:rotate-0 transition-transform duration-500">
                    {[FaReact, FaNodeJs, FaJs, FaPython, SiFirebase, SiMongodb, FaHtml5, FaCss3, FaAws].map((Icon, i) => (
                        <div key={i} className="flex items-center justify-center p-2 bg-gray-50 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
                            <Icon size={18} />
                        </div>
                    ))}
                </div>
            </FeatureCard>

            {/* CARD 3: Community Circles */}
            <FeatureCard 
                title="Prolync Community Circles" 
                description="Join curated circles for Web Dev, AI, Cloud, Data, and DevOps to focus your growth."
                delay={0.3}
            >
                 <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute w-24 h-24 bg-purple-100 rounded-full animate-ping opacity-20"></div>
                    <div className="absolute w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center">
                        <Users size={32} className="text-purple-600" />
                    </div>
                    {/* Orbiting dots */}
                    <div className="absolute w-full h-full animate-spin-slow">
                        <div className="absolute top-0 left-1/2 w-3 h-3 bg-indigo-400 rounded-full -translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-pink-400 rounded-full -translate-x-1/2"></div>
                    </div>
                 </div>
            </FeatureCard>

            {/* CARD 4: Career-Ready Skills */}
            <FeatureCard 
                title="Career-Ready Skill Catalog" 
                description="Industry-designed skill tracks with project-based certification to get you hired."
                delay={0.4}
            >
                <div className="w-full h-full flex flex-col gap-3 justify-center px-4">
                     {[
                        { text: "Project Based", icon: Rocket, color: "text-orange-500" },
                        { text: "Certified", icon: ShieldCheck, color: "text-green-500" },
                        { text: "Job Ready", icon: CheckCircle, color: "text-blue-500" }
                     ].map((item, i) => (
                         <motion.div 
                           key={i}
                           initial={{ x: -10, opacity: 0 }}
                           whileInView={{ x: 0, opacity: 1 }}
                           transition={{ delay: 0.5 + (i * 0.1) }}
                           className="flex items-center gap-3 bg-white p-2 rounded-lg shadow-sm border border-gray-100"
                         >
                             <item.icon size={16} className={item.color} />
                             <span className="text-xs font-bold text-gray-700">{item.text}</span>
                         </motion.div>
                     ))}
                </div>
            </FeatureCard>

        </div>

      </div>
    </section>
  );
};

export default CommunityFeatures;
