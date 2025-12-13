import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaReact, FaNodeJs, FaPython, FaAws, FaDocker, FaJs, FaHtml5, FaCss3, FaGithub, FaAndroid, FaApple,
  FaJava, FaVuejs, FaAngular, FaPhp, FaGitAlt, FaNpm, FaYarn, FaJenkins, FaFigma, FaSketch, FaTrello
} from 'react-icons/fa';
import { 
  SiMongodb, SiExpress, SiNextdotjs, SiTailwindcss, SiTypescript, SiFirebase, SiKubernetes, SiMysql,
  SiPostgresql, SiRedis, SiGraphql, SiJest, SiCypress, SiStorybook, SiVercel, SiNetlify, SiJira,
  SiRedux, SiSpringboot, SiDjango, SiFlask, SiFastapi, SiTensorflow, SiPytorch
} from 'react-icons/si';
import { 
  Bot, Users, Award, Headphones, Briefcase, Code, Cpu, Globe, Zap, CheckCircle,
  Shield, Clock, Target, BarChart, Brain, Rocket, Sparkles, Terminal, Cloud, Database,
  CpuIcon, Server, Wifi, MessageSquare, Video, BookOpen, TrendingUp, Gift, Star
} from 'lucide-react';

const techStack = [
  { icon: FaReact, name: "React", color: "text-cyan-500", bg: "bg-cyan-50", shadow: "shadow-cyan-200" },
  { icon: FaNodeJs, name: "Node.js", color: "text-green-600", bg: "bg-green-50", shadow: "shadow-green-200" },
  { icon: SiMongodb, name: "MongoDB", color: "text-emerald-600", bg: "bg-emerald-50", shadow: "shadow-emerald-200" },
  { icon: FaAws, name: "AWS", color: "text-orange-600", bg: "bg-orange-50", shadow: "shadow-orange-200" },
  { icon: FaPython, name: "Python", color: "text-blue-600", bg: "bg-blue-50", shadow: "shadow-blue-200" },
  { icon: SiNextdotjs, name: "Next.js", color: "text-slate-900", bg: "bg-slate-100", shadow: "shadow-slate-300" },
  { icon: SiTypescript, name: "TypeScript", color: "text-blue-700", bg: "bg-blue-50", shadow: "shadow-blue-200" },
  { icon: FaDocker, name: "Docker", color: "text-blue-500", bg: "bg-blue-50", shadow: "shadow-blue-200" },
  { icon: SiTailwindcss, name: "Tailwind", color: "text-cyan-400", bg: "bg-cyan-50", shadow: "shadow-cyan-200" },
  { icon: SiFirebase, name: "Firebase", color: "text-orange-500", bg: "bg-orange-50", shadow: "shadow-orange-200" },
  { icon: FaJava, name: "Java", color: "text-red-600", bg: "bg-red-50", shadow: "shadow-red-200" },
  { icon: FaVuejs, name: "Vue.js", color: "text-green-500", bg: "bg-green-50", shadow: "shadow-green-200" },
  { icon: SiRedux, name: "Redux", color: "text-purple-600", bg: "bg-purple-50", shadow: "shadow-purple-200" },
  { icon: SiSpringboot, name: "Spring Boot", color: "text-green-700", bg: "bg-green-50", shadow: "shadow-green-200" },
  { icon: SiDjango, name: "Django", color: "text-emerald-700", bg: "bg-emerald-50", shadow: "shadow-emerald-200" },
];

const features = [
  { icon: Rocket, name: "Quick Start", bg: "bg-gradient-to-br from-purple-500 to-pink-500", height: "h-16" },
  { icon: Brain, name: "AI Mentor", bg: "bg-gradient-to-br from-blue-500 to-cyan-400", height: "h-20" },
  { icon: Users, name: "Live Community", bg: "bg-gradient-to-br from-green-500 to-emerald-400", height: "h-14" },
  { icon: Award, name: "Certified Paths", bg: "bg-gradient-to-br from-orange-500 to-yellow-400", height: "h-18" },
  { icon: Headphones, name: "24/7 Support", bg: "bg-gradient-to-br from-indigo-500 to-purple-400", height: "h-16" },
  { icon: Briefcase, name: "Job Ready", bg: "bg-gradient-to-br from-red-500 to-orange-400", height: "h-20" },
  { icon: Code, name: "Real Projects", bg: "bg-gradient-to-br from-teal-500 to-green-400", height: "h-14" },
  { icon: Zap, name: "Fast Track", bg: "bg-gradient-to-br from-pink-500 to-rose-400", height: "h-18" },
  { icon: Shield, name: "Secure Learning", bg: "bg-gradient-to-br from-slate-700 to-slate-600", height: "h-16" },
  { icon: Clock, name: "Flexible Hours", bg: "bg-gradient-to-br from-amber-500 to-yellow-400", height: "h-14" },
  { icon: Target, name: "Goal-Oriented", bg: "bg-gradient-to-br from-violet-500 to-purple-400", height: "h-20" },
  { icon: BarChart, name: "Progress Tracking", bg: "bg-gradient-to-br from-cyan-500 to-blue-400", height: "h-16" },
  { icon: Sparkles, name: "Premium Content", bg: "bg-gradient-to-br from-rose-500 to-pink-400", height: "h-18" },
  { icon: Terminal, name: "Hands-On Labs", bg: "bg-gradient-to-br from-lime-500 to-green-400", height: "h-14" },
  { icon: Cloud, name: "Cloud Access", bg: "bg-gradient-to-br from-sky-500 to-blue-400", height: "h-20" },
];

const tools = [
  { icon: FaFigma, name: "Figma", color: "text-pink-600", bg: "bg-gradient-to-br from-pink-100 to-white" },
  { icon: FaGithub, name: "GitHub", color: "text-slate-800", bg: "bg-gradient-to-br from-slate-100 to-white" },
  { icon: SiJira, name: "Jira", color: "text-blue-700", bg: "bg-gradient-to-br from-blue-100 to-white" },
  { icon: SiVercel, name: "Vercel", color: "text-black", bg: "bg-gradient-to-br from-slate-100 to-white" },
  { icon: SiNetlify, name: "Netlify", color: "text-teal-600", bg: "bg-gradient-to-br from-teal-100 to-white" },
  { icon: SiPostgresql, name: "PostgreSQL", color: "text-blue-800", bg: "bg-gradient-to-br from-blue-100 to-white" },
  { icon: SiRedis, name: "Redis", color: "text-red-600", bg: "bg-gradient-to-br from-red-100 to-white" },
  { icon: SiGraphql, name: "GraphQL", color: "text-pink-600", bg: "bg-gradient-to-br from-pink-100 to-white" },
  { icon: SiTensorflow, name: "TensorFlow", color: "text-orange-600", bg: "bg-gradient-to-br from-orange-100 to-white" },
  { icon: SiPytorch, name: "PyTorch", color: "text-red-700", bg: "bg-gradient-to-br from-red-100 to-white" },
];

const MarqueeRow = ({ items, speed = 20, direction = "left", type = "tech", height = "h-20" }) => {
  return (
    <div className={`flex overflow-hidden relative w-full ${height} mb-2 last:mb-0 group cursor-default`}>
       <motion.div
         className="flex gap-4 md:gap-6 min-w-full pl-4 md:pl-6"
         animate={{ x: direction === "left" ? "-50%" : "50%" }}
         initial={{ x: direction === "left" ? "0%" : "-50%" }}
         transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
       >
         {[...items, ...items, ...items].map((item, index) => (
            <motion.div 
              key={`${item.name}-${index}`} 
              whileHover={{ scale: 1.05, y: -5 }}
              className={`
                 flex items-center justify-center gap-3 px-6 py-3 md:px-8 md:py-4 rounded-2xl 
                 shadow-lg hover:shadow-2xl transition-all duration-300
                 whitespace-nowrap select-none relative overflow-hidden
                 ${type === 'feature' ? item.bg : item.bg || 'bg-gradient-to-br from-white to-slate-50'}
                 ${type === 'feature' ? 'min-w-[200px] md:min-w-[240px]' : 'min-w-[160px] md:min-w-[180px]'}
                 border ${type === 'feature' ? 'border-white/30' : 'border-slate-200/50'}
                 backdrop-blur-sm
              `}
            >
              {/* Background Pattern for Tech/Tools */}
              {type !== 'feature' && (
                  <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: 'linear-gradient(to right, rgba(100, 116, 139, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(100, 116, 139, 0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}></div>
              )}
              
              {/* Glow Effect */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl ${
                type === 'feature' ? 'bg-white/20' : 'from-white/20 to-transparent'
              }`}></div>
              
              {/* Icon Container */}
              <div className={`
                p-3 rounded-xl flex items-center justify-center z-10
                ${type === 'feature' 
                  ? 'bg-white/20 backdrop-blur-sm' 
                  : 'bg-white shadow-md'
                }
              `}>
                {type === 'feature' ? (
                  <item.icon size={24} className="text-white" />
                ) : (
                  <item.icon size={type === 'tools' ? 20 : 24} className={item.color || "text-slate-700"} />
                )}
              </div>
              
              {/* Name */}
              <span className={`
                text-base md:text-lg font-bold z-10
                ${type === 'feature' 
                  ? 'text-white drop-shadow-sm' 
                  : 'bg-gradient-to-r from-slate-800 to-slate-700 bg-clip-text text-transparent'
                }
              `}>
                {item.name}
              </span>
              

              

            </motion.div>
         ))}
       </motion.div>
    </div>
  );
};

const LogoMarquee = () => {
  return (
    <section className="py-12 md:py-20 relative overflow-hidden bg-slate-50">
      <div className="container mx-auto px-4 md:px-8 max-w-10xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Human Interaction (PhysicsWallah Style) */}
            <div className="lg:col-span-5 relative h-[400px] flex items-center justify-center">
               
               {/* Decorative Dotted Rings */}
               <div className="absolute inset-0 border-[3px] border-dotted border-blue-200 rounded-full animate-spin-slow opacity-30 scale-125"></div>
               <div className="absolute inset-0 border-[2px] border-dotted border-purple-200 rounded-full animate-reverse-spin opacity-30 scale-90"></div>

               {/* Student Circle (Now Second - Bottom Right) */}
               <motion.div 
                 className="absolute right-0 lg:right-4 bottom-1/4 z-10"
                 animate={{ y: [0, 15, 0] }}
                 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               >
                 <div className="relative">
                   <div className="w-20 h-20 md:w-28 md:h-28 rounded-full p-1 bg-gradient-to-br from-purple-500 to-pink-500 shadow-xl">
                      <img 
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&auto=format&fit=crop" 
                        alt="Student" 
                        className="w-full h-full rounded-full object-cover border-4 border-white"
                      />
                   </div>
                   {/* Student Bubble - Positioned to Left */}
                   <motion.div 
                      initial={{ opacity: 0, scale: 0.8, x: 20 }}
                      whileInView={{ opacity: 1, scale: 1, x: 0 }}
                      transition={{ delay: 0.9, duration: 0.3 }}
                      className="absolute -left-44 -top-10 bg-white text-slate-800 p-3 rounded-xl rounded-br-none shadow-lg w-48 border border-purple-100 z-20"
                   >
                     <p className="text-xs font-bold text-slate-900 mb-1">Priya, Student</p>
                     <p className="text-xs text-slate-600">
                       Sir, how do I start my learning journey at Prolync?
                     </p>
                   </motion.div>
                 </div>
               </motion.div>

               {/* Mentor Circle (Now First - Top Left) */}
               <motion.div 
                 className="absolute left-0 lg:left-4 top-1/4 z-10"
                 animate={{ y: [0, -15, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               >
                 <div className="relative">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full p-1 bg-gradient-to-br from-blue-500 to-cyan-400 shadow-xl">
                      <img 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&auto=format&fit=crop" 
                        alt="Mentor" 
                        className="w-full h-full rounded-full object-cover border-4 border-white"
                      />
                    </div>
                    {/* Mentor Bubble - Positioned to Right */}
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8, x: -20 }}
                      whileInView={{ opacity: 1, scale:1, x: 0 }}
                      transition={{ delay: 2.1, duration: 0.6 }}
                      className="absolute -right-40 top-0 bg-blue-900 text-white p-3 rounded-xl rounded-tl-none shadow-lg w-48 z-20"
                    >
                      <p className="text-xs font-semibold leading-relaxed">
                        At Prolync, you learn with structured guidance, real projects, and AI support.
                      </p>
                    </motion.div>
                 </div>
               </motion.div>

               {/* Floating Dots */}
               <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-10 right-20 w-4 h-4 rounded-full bg-orange-400 blur-[1px]"></motion.div>
               <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute bottom-10 left-20 w-3 h-3 rounded-full bg-blue-400 blur-[1px]"></motion.div>
               <motion.div animate={{ x: [0, 20, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-1/2 left-10 w-2 h-2 rounded-full bg-green-400 blur-[1px]"></motion.div>

            </div>

            {/* Right Column: Marquee Logos */}
            <div className="lg:col-span-7 relative w-full overflow-hidden">
                {/* Gradient Masks (Adjusted for column) */}
                <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-slate-50 to-transparent z-20 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-slate-50 to-transparent z-20 pointer-events-none"></div>

                <div className="flex flex-col gap-6">
                    {/* Row 1 */}
                    <div className="relative">

                      <MarqueeRow items={techStack} speed={35} direction="left" type="tech" height="h-20" />
                    </div>

                    {/* Row 2 */}
                    <div className="relative">

                      <MarqueeRow items={features} speed={25} direction="right" type="feature" height="h-20" />
                    </div>

                    {/* Row 3 */}
                    <div className="relative">

                      <MarqueeRow items={tools} speed={30} direction="left" type="tools" height="h-16" />
                    </div>
                </div>
            </div>

        </div>
      </div>
      
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes reverse-spin {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-reverse-spin {
          animation: reverse-spin 25s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default LogoMarquee;