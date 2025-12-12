// import React from 'react';
// import { motion } from 'framer-motion';
// import { FaFacebook, FaDiscord, FaSlack, FaReddit, FaTwitter, FaWhatsapp, FaGithub, FaTelegram, FaReact, FaNodeJs, FaPython, FaAws, FaLinux, FaGitAlt } from 'react-icons/fa';
// import { SiMongodb, SiExpress, SiHtml5, SiCss3, SiJavascript, SiTypescript, SiTailwindcss, SiNextdotjs, SiFirebase, SiDocker, SiKubernetes, SiRedux, SiBootstrap, SiVite, SiPostgresql, SiMysql, SiGraphql } from 'react-icons/si';
// import { MessageCircle, Globe, Users, Zap, Cpu, Database, Terminal, Cloud, Code, Server, Wifi, CpuIcon, Shield } from 'lucide-react';

// // Enhanced TechIcon with premium styling
// const TechIcon = ({ src, name, color, IconComponent }) => (
//   <motion.div 
//     initial={{ opacity: 0, scale: 0.9 }}
//     whileInView={{ opacity: 1, scale: 1 }}
//     whileHover={{ 
//       scale: 1.1, 
//       y: -8,
//       rotate: 5,
//       boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)"
//     }}
//     transition={{ 
//       type: "spring",
//       stiffness: 300,
//       damping: 20
//     }}
//     className={`
//       relative group
//       bg-gradient-to-br from-white to-gray-50
//       p-4 rounded-2xl 
//       shadow-lg shadow-gray-200/50
//       border border-white/60
//       backdrop-blur-sm
//       flex flex-col items-center justify-center
//       cursor-pointer
//       transition-all duration-300
//       hover:border-${color}-500/40
//       hover:shadow-2xl hover:shadow-${color}-500/20
//       overflow-hidden
//     `}
//   >
//     {/* Gradient Overlay */}
//     <div className={`absolute inset-0 bg-gradient-to-br from-${color}-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
    
//     {/* Icon Container */}
//     <div className={`relative z-10 p-3 rounded-xl bg-gradient-to-br from-${color}-50 to-white mb-3 group-hover:scale-110 transition-transform duration-300`}>
//       {src ? (
//         <img src={src} alt={name} className="w-8 h-8 object-contain" />
//       ) : (
//         <IconComponent className={`w-8 h-8 text-${color}-600`} />
//       )}
//     </div>
    
//     {/* Name */}
//     <span className={`text-sm font-semibold text-gray-800 group-hover:text-${color}-700 transition-colors duration-300 relative z-10`}>
//       {name}
//     </span>
    
//     {/* Hover Glow Effect */}
//     <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-${color}-500/0 via-${color}-500/5 to-${color}-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}></div>
    
//     {/* Tooltip */}
//     <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
//       <div className="bg-gray-900 text-white text-xs font-medium py-2 px-3 rounded-lg whitespace-nowrap shadow-xl">
//         {name}
//         <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
//       </div>
//     </div>
//   </motion.div>
// );

// // Network Connection Line Component
// const NetworkLine = ({ index, total }) => {
//   const angle = (index / total) * Math.PI * 2;
//   const length = 150;
//   const x1 = 50;
//   const y1 = 50;
//   const x2 = 50 + Math.cos(angle) * length;
//   const y2 = 50 + Math.sin(angle) * length;
  
//   return (
//     <motion.line
//       x1={x1}
//       y1={y1}
//       x2={x2}
//       y2={y2}
//       stroke="url(#gradientLine)"
//       strokeWidth="1.5"
//       strokeDasharray="5,5"
//       initial={{ pathLength: 0, opacity: 0 }}
//       animate={{ 
//         pathLength: 1,
//         opacity: 0.3,
//         strokeDashoffset: [0, 20]
//       }}
//       transition={{
//         duration: 3,
//         repeat: Infinity,
//         ease: "linear",
//         delay: index * 0.1
//       }}
//     />
//   );
// };

// // Floating Geometric Shape
// const FloatingShape = ({ shape, color, size, x, y, rotation, delay }) => {
//   const ShapeComponent = shape;
  
//   return (
//     <motion.div
//       className="absolute pointer-events-none"
//       style={{
//         left: `${x}%`,
//         top: `${y}%`,
//         width: `${size}px`,
//         height: `${size}px`,
//       }}
//       animate={{
//         y: [0, -30, 0],
//         rotate: rotation ? [0, 180, 360] : [0, -180, -360],
//         scale: [1, 1.1, 1]
//       }}
//       transition={{
//         duration: 8 + Math.random() * 4,
//         repeat: Infinity,
//         ease: "easeInOut",
//         delay: delay
//       }}
//     >
//       <ShapeComponent className={`w-full h-full opacity-10`} style={{ color }} />
//     </motion.div>
//   );
// };

// // Enhanced Marquee Community Item
// const MarqueeItem = ({ icon: Icon, name, color, index }) => (
//   <motion.div
//     whileHover={{ scale: 1.2, rotate: 5 }}
//     className="relative group/icon mx-2"
//   >
//     <div className={`
//       w-16 h-16 rounded-xl
//       bg-gradient-to-br from-white to-gray-50
//       flex items-center justify-center 
//       text-gray-600 
//       shadow-lg shadow-gray-200/50
//       border border-white/80
//       hover:shadow-2xl
//       hover:text-${color}-600
//       hover:border-${color}-500/30
//       transition-all duration-300
//       cursor-pointer
//       backdrop-blur-sm
//       relative overflow-hidden
//     `}>
//       {/* Animated Background */}
//       <motion.div
//         className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-cyan-500/0 to-purple-500/0"
//         whileHover={{
//           background: `linear-gradient(135deg, ${color}500/10, ${color}400/5)`
//         }}
//         transition={{ duration: 0.3 }}
//       />
//       <Icon size={24} className="relative z-10" />
//     </div>
    
//     {/* Floating Label */}
//     <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover/icon:opacity-100 transition-all duration-300 pointer-events-none">
//       <div className={`bg-${color}-600 text-white text-xs font-semibold py-1 px-2 rounded-lg whitespace-nowrap shadow-lg backdrop-blur-sm`}>
//         {name}
//         <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-${color}-600 rotate-45`} />
//       </div>
//     </div>
//   </motion.div>
// );

// const CommunityEcosystem = () => {

//   const techStack = [
//     { name: 'React', IconComponent: FaReact, color: 'cyan' },
//     { name: 'Node.js', IconComponent: FaNodeJs, color: 'emerald' },
//     { name: 'MongoDB', IconComponent: SiMongodb, color: 'green' },
//     { name: 'Express', IconComponent: SiExpress, color: 'gray' },
//     { name: 'HTML5', IconComponent: SiHtml5, color: 'orange' },
//     { name: 'CSS3', IconComponent: SiCss3, color: 'blue' },
//     { name: 'JavaScript', IconComponent: SiJavascript, color: 'yellow' },
//     { name: 'TypeScript', IconComponent: SiTypescript, color: 'blue' },
//     { name: 'Tailwind', IconComponent: SiTailwindcss, color: 'cyan' },
//     { name: 'Next.js', IconComponent: SiNextdotjs, color: 'gray' },
//     { name: 'Firebase', IconComponent: SiFirebase, color: 'orange' },

//     { name: 'Python', IconComponent: FaPython, color: 'blue' },
//     { name: 'Kubernetes', IconComponent: SiKubernetes, color: 'blue' },
//     { name: 'API', IconComponent: Cloud, color: 'purple' },
//     { name: 'Database', IconComponent: Database, color: 'indigo' },
//     // New Additions
//     { name: 'Redux', IconComponent: SiRedux, color: 'purple' },
//     { name: 'AWS', IconComponent: FaAws, color: 'orange' },
//     { name: 'Linux', IconComponent: FaLinux, color: 'stone' },
//     { name: 'Git', IconComponent: FaGitAlt, color: 'red' },
//     { name: 'GitHub', IconComponent: FaGithub, color: 'gray' },
//     { name: 'Bootstrap', IconComponent: SiBootstrap, color: 'purple' },
//     { name: 'Vite', IconComponent: SiVite, color: 'yellow' },
//     { name: 'PostgreSQL', IconComponent: SiPostgresql, color: 'blue' },
//     { name: 'MySQL', IconComponent: SiMysql, color: 'blue' },
//     { name: 'GraphQL', IconComponent: SiGraphql, color: 'pink' },
//     { name: 'Security', IconComponent: Shield, color: 'green' },
//   ];

//   const communities = [
//     { icon: FaFacebook, color: 'blue', name: 'Facebook' },
//     { icon: FaDiscord, color: 'indigo', name: 'Discord' },
//     { icon: FaReddit, color: 'orange', name: 'Reddit' },
//     { icon: FaSlack, color: 'purple', name: 'Slack' },
//     { icon: FaTwitter, color: 'sky', name: 'Twitter' },
//     { icon: FaWhatsapp, color: 'green', name: 'WhatsApp' },
//     { icon: FaGithub, color: 'gray', name: 'GitHub' },
//     { icon: FaTelegram, color: 'blue', name: 'Telegram' },
//   ];

//   const stats = [
//     { number: '100+', label: 'Tech Communities', icon: Users },
//     { number: '24/7', label: 'Active Support', icon: Zap },
//     { number: '50K+', label: 'Members', icon: Globe },
//     { number: '30+', label: 'Tech Stacks', icon: Cpu },
//   ];

//   // Custom SVG shapes
//   const shapes = [
//     { id: 1, type: 'square', color: '#4F46E5', size: 60, x: 10, y: 20, rotation: true },
//     { id: 2, type: 'circle', color: '#7C3AED', size: 80, x: 85, y: 15, rotation: false },
//     { id: 3, type: 'triangle', color: '#10B981', size: 50, x: 5, y: 70, rotation: true },
//     { id: 4, type: 'hexagon', color: '#06B6D4', size: 70, x: 90, y: 75, rotation: false },
//     { id: 5, type: 'diamond', color: '#EC4899', size: 40, x: 20, y: 85, rotation: true },
//     { id: 6, type: 'pentagon', color: '#8B5CF6', size: 55, x: 75, y: 40, rotation: false },
//   ];

//   return (
//     <section className="relative py-20 lg:py-28 overflow-hidden">
//       {/* Creative Geometric Background */}
//       <div className="absolute inset-0">
//         {/* Main Gradient Background */}
//         <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-50"></div>
        
//         {/* Animated Grid Pattern */}
//         <div className="absolute inset-0 opacity-5">
//           <svg className="w-full h-full">
//             <defs>
//               <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
//                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
//               </pattern>
//               <linearGradient id="gradientLine" x1="0%" y1="0%" x2="100%" y2="0%">
//                 <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.3" />
//                 <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.5" />
//                 <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.3" />
//               </linearGradient>
//             </defs>
//             <rect width="100%" height="100%" fill="url(#grid)" className="text-indigo-300" />
//           </svg>
//         </div>

//         {/* Network Connection Visualization */}
//         <div className="absolute inset-0 flex items-center justify-center">
//           <motion.svg 
//             width="400" 
//             height="400" 
//             className="w-full h-full opacity-10"
//             initial={{ rotate: 0 }}
//             animate={{ rotate: 360 }}
//             transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
//           >
//             {[...Array(12)].map((_, i) => (
//               <NetworkLine key={i} index={i} total={12} />
//             ))}
            
//             {/* Central Hub */}
//             <motion.circle
//               cx="50%"
//               cy="50%"
//               r="40"
//               fill="url(#centralHub)"
//               animate={{ scale: [1, 1.2, 1] }}
//               transition={{ duration: 4, repeat: Infinity }}
//             />
            
//             <defs>
//               <radialGradient id="centralHub">
//                 <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.3" />
//                 <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
//               </radialGradient>
//             </defs>
//           </motion.svg>
//         </div>

//         {/* Floating Geometric Shapes */}
//         {shapes.map((shape) => (
//           <FloatingShape
//             key={shape.id}
//             shape={({ className, style }) => {
//               switch(shape.type) {
//                 case 'square':
//                   return <div className={`rounded-lg ${className}`} style={{ ...style, backgroundColor: shape.color }} />;
//                 case 'circle':
//                   return <div className={`rounded-full ${className}`} style={{ ...style, backgroundColor: shape.color }} />;
//                 case 'triangle':
//                   return (
//                     <div className={className} style={style}>
//                       <svg viewBox="0 0 100 100">
//                         <polygon points="50,15 85,85 15,85" fill={shape.color} />
//                       </svg>
//                     </div>
//                   );
//                 case 'hexagon':
//                   return (
//                     <div className={className} style={style}>
//                       <svg viewBox="0 0 100 100">
//                         <polygon points="50,15 85,35 85,65 50,85 15,65 15,35" fill={shape.color} />
//                       </svg>
//                     </div>
//                   );
//                 case 'diamond':
//                   return <div className={`rotate-45 ${className}`} style={{ ...style, backgroundColor: shape.color }} />;
//                 default:
//                   return <div className={`rounded-lg ${className}`} style={{ ...style, backgroundColor: shape.color }} />;
//               }
//             }}
//             color={shape.color}
//             size={shape.size}
//             x={shape.x}
//             y={shape.y}
//             rotation={shape.rotation}
//             delay={shape.id * 0.5}
//           />
//         ))}

//         {/* Floating Tech Icons in Background */}
//         {[...Array(8)].map((_, i) => (
//           <motion.div
//             key={`tech-bg-${i}`}
//             className="absolute opacity-5"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//             }}
//             animate={{
//               y: [0, -50, 0],
//               x: [0, Math.random() * 20 - 10, 0],
//               rotate: [0, 180, 360]
//             }}
//             transition={{
//               duration: 15 + Math.random() * 10,
//               repeat: Infinity,
//               ease: "linear"
//             }}
//           >
//             <FaReact className="w-16 h-16 text-indigo-500" />
//           </motion.div>
//         ))}

//         {/* Animated Data Flow Lines */}
//         <svg className="absolute inset-0 w-full h-full opacity-10">
//           {[...Array(5)].map((_, i) => (
//             <motion.path
//               key={i}
//               d={`M 0,${20 + i * 15} Q ${50 + i * 10},${40 + i * 10} 100,${20 + i * 15}`}
//               fill="none"
//               stroke="#4F46E5"
//               strokeWidth="1.5"
//               strokeDasharray="10,10"
//               initial={{ pathLength: 0, strokeDashoffset: 0 }}
//               animate={{ 
//                 strokeDashoffset: [0, 100],
//               }}
//               transition={{
//                 duration: 3 + i,
//                 repeat: Infinity,
//                 ease: "linear"
//               }}
//             />
//           ))}
//         </svg>

//         {/* Binary Code Animation */}
//         <div className="absolute inset-0 overflow-hidden opacity-5">
//           {[...Array(20)].map((_, i) => (
//             <motion.div
//               key={`binary-${i}`}
//               className="absolute text-xs font-mono text-indigo-500 whitespace-nowrap"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//               }}
//               animate={{
//                 y: ['100vh', '-100vh']
//               }}
//               transition={{
//                 duration: 20 + Math.random() * 10,
//                 repeat: Infinity,
//                 ease: "linear",
//                 delay: Math.random() * 5
//               }}
//             >
//               10101010 01010101 11110000 00001111
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* Floating Particles with Different Colors */}
//       {[...Array(30)].map((_, i) => {
//         const colors = ['#4F46E5', '#7C3AED', '#06B6D4', '#10B981', '#EC4899'];
//         const color = colors[Math.floor(Math.random() * colors.length)];
        
//         return (
//           <motion.div
//             key={`particle-${i}`}
//             className="absolute rounded-full"
//             style={{
//               width: `${Math.random() * 4 + 1}px`,
//               height: `${Math.random() * 4 + 1}px`,
//               backgroundColor: color,
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               opacity: 0
//             }}
//             animate={{
//               y: [null, -Math.random() * 100 - 50, 0],
//               x: [0, Math.random() * 40 - 20, 0],
//               opacity: [0, 0.3, 0]
//             }}
//             transition={{
//               duration: 4 + Math.random() * 3,
//               repeat: Infinity,
//               delay: Math.random() * 2
//             }}
//           />
//         );
//       })}

//       <div className="container mx-auto px-4 max-w-[1400px] relative z-10">
        
//         {/* Section Header */}
//         <motion.div 
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, type: "spring" }}
//           className="text-center mb-16"
//         >
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-white/80 to-white/40 backdrop-blur-sm border border-white/60 shadow-lg mb-6">
//             <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 animate-pulse"></div>
//             <span className="text-sm font-medium bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
//               Community Network
//             </span>
//           </div>
          
//           <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
//             <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
//               Prolync Community{' '}
//             </span>
//             <span className="relative inline-block">
//               <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
//                 Ecosystem
//               </span>
//               <motion.div
//                 className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full"
//                 initial={{ scaleX: 0 }}
//                 whileInView={{ scaleX: 1 }}
//                 transition={{ duration: 1, delay: 0.5 }}
//               />
//             </span>
//           </h2>
          
//           <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
//             Join a powerful network of <span className="font-semibold bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">learners, mentors, and tech communities</span> to accelerate your growth with 24/7 support.
//           </p>
//         </motion.div>

//         {/* Stats Grid */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
//         >
//           {stats.map((stat, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, scale: 0.9 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               whileHover={{ y: -5, scale: 1.05 }}
//               className="bg-gradient-to-br from-white/80 to-white/40 rounded-2xl p-6 shadow-2xl shadow-gray-200/30 border border-white/60 backdrop-blur-sm group hover:shadow-indigo-200/30 transition-all duration-300 relative overflow-hidden"
//             >
//               {/* Animated Background */}
//               <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
//               <div className="flex items-center gap-4 relative z-10">
//                 <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 group-hover:scale-110 transition-transform duration-300">
//                   <stat.icon className="w-6 h-6 bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent" />
//                 </div>
//                 <div>
//                   <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
//                   <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>

//         <div className="flex flex-col gap-16">
          
//           {/* Section 1: Active Community Network (Full Width) */}



//           {/* Section 2: Choose Your Stack (Full Width) */}
//           <motion.div
//              initial={{ opacity: 0, y: 30 }}
//              whileInView={{ opacity: 1, y: 0 }}
//              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
//              className="relative w-full"
//           >
//             <div className="mb-8 text-center max-w-3xl mx-auto">
//               <h3 className="text-2xl font-bold text-gray-900 mb-3">Master Your Tech Stack</h3>
//                    <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mx-auto" />
//             </div>

//             {/* Enhanced Grid Container - Mirrored Style */}
//             <div className="relative w-full bg-gradient-to-br from-white/80 to-white/40 rounded-3xl p-8 shadow-2xl shadow-indigo-100/20 overflow-hidden border border-white/60 backdrop-blur-sm group hover:shadow-indigo-200/30 transition-all duration-500">
               
//                {/* Animated Border Glow */}
//               <motion.div
//                 className="absolute inset-0 rounded-3xl"
//                 animate={{
//                   boxShadow: [
//                     'inset 0 0 20px rgba(16, 185, 129, 0.1)',
//                     'inset 0 0 30px rgba(16, 185, 129, 0.2)',
//                     'inset 0 0 20px rgba(16, 185, 129, 0.1)',
//                   ]
//                 }}
//                 transition={{ duration: 3, repeat: Infinity }}
//               />

//                {/* Center Glow Effect */}
//               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                 <div className="w-96 h-96 rounded-full bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 blur-3xl opacity-50"></div>
//               </div>

//               {/* 3-Row Grid Layout (9 Columns) */}
//               <div className="relative z-10 flex overflow-x-auto pb-4 gap-4 px-2 md:grid md:grid-cols-6 lg:grid-cols-9 md:overflow-visible scrollbar-hide justify-items-center">
//                 {[...techStack, { name: 'Docker Compose', IconComponent: SiDocker, color: 'blue' }].map((tech, i) => (
//                   <TechIcon key={i} {...tech} />
//                 ))}
//               </div>
//             </div>
//           </motion.div>

//         </div>

//         {/* CTA Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.6 }}
//           className="mt-20 text-center"
//         >
//           <div className="relative inline-flex flex-col sm:flex-row items-center gap-6 bg-gradient-to-br from-white/80 to-white/40 rounded-2xl p-8 shadow-2xl shadow-indigo-100/30 border border-white/60 backdrop-blur-sm max-w-4xl mx-auto overflow-hidden">
//             {/* Animated Background */}
//             <motion.div
//               className="absolute inset-0"
//               animate={{
//                 background: [
//                   'linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)',
//                   'linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(79, 70, 229, 0.05) 100%)',
//                   'linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)',
//                 ]
//               }}
//               transition={{ duration: 5, repeat: Infinity }}
//             />
            
//             <div className="text-left relative z-10">
//               <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Join the Ecosystem?</h3>
//               <p className="text-gray-600">Connect with like-minded developers and accelerate your learning journey.</p>
//             </div>
//             <div className="flex gap-4 relative z-10">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/50 transition-all duration-300 relative overflow-hidden group"
//               >
//                 <motion.div
//                   className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                   initial={false}
//                 />
//                 <span className="relative z-10">Join Community</span>
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="px-8 py-3 bg-gradient-to-br from-white to-gray-50 text-gray-800 font-semibold rounded-xl border border-gray-200 shadow-lg shadow-gray-200/30 hover:shadow-xl hover:shadow-gray-300/30 transition-all duration-300"
//               >
//                 Explore Stacks
//               </motion.button>
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       {/* Tailwind Custom Animation Style */}
//       <style jsx>{`
//         @keyframes pulse-glow {
//           0%, 100% { box-shadow: 0 0 20px rgba(79, 70, 229, 0.3); }
//           50% { box-shadow: 0 0 40px rgba(79, 70, 229, 0.5); }
//         }
        
//         .pulse-glow {
//           animation: pulse-glow 3s ease-in-out infinite;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default CommunityEcosystem;



import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaDiscord, FaSlack, FaReddit, FaTwitter, FaWhatsapp, FaGithub, FaTelegram, FaReact, FaNodeJs, FaPython, FaAws, FaLinux, FaGitAlt } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiHtml5, SiCss3, SiJavascript, SiTypescript, SiTailwindcss, SiNextdotjs, SiFirebase, SiDocker, SiKubernetes, SiRedux, SiBootstrap, SiVite, SiPostgresql, SiMysql, SiGraphql } from 'react-icons/si';
import { MessageCircle, Globe, Users, Zap, Cpu, Database, Terminal, Cloud, Code, Server, Wifi, CpuIcon, Shield } from 'lucide-react';

// Enhanced TechIcon with premium styling
const TechIcon = ({ src, name, color, IconComponent }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    whileHover={{ 
      scale: 1.1, 
      y: -8,
      rotate: 5,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)"
    }}
    transition={{ 
      type: "spring",
      stiffness: 300,
      damping: 20
    }}
    className={`
      relative group
      bg-gradient-to-br from-white to-gray-50
      p-4 rounded-2xl 
      shadow-lg shadow-gray-200/50
      border border-white/60
      backdrop-blur-sm
      flex flex-col items-center justify-center
      cursor-pointer
      transition-all duration-300
      hover:border-${color}-500/40
      hover:shadow-2xl hover:shadow-${color}-500/20
      overflow-hidden
    `}
  >
    {/* Gradient Overlay */}
    <div className={`absolute inset-0 bg-gradient-to-br from-${color}-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
    
    {/* Icon Container */}
    <div className={`relative z-10 p-3 rounded-xl bg-gradient-to-br from-${color}-50 to-white mb-3 group-hover:scale-110 transition-transform duration-300`}>
      {src ? (
        <img src={src} alt={name} className="w-8 h-8 object-contain" />
      ) : (
        <IconComponent className={`w-8 h-8 text-${color}-600`} />
      )}
    </div>
    
    {/* Name */}
    <span className={`text-sm font-semibold text-gray-800 group-hover:text-${color}-700 transition-colors duration-300 relative z-10`}>
      {name}
    </span>
    
    {/* Hover Glow Effect */}
    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-${color}-500/0 via-${color}-500/5 to-${color}-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}></div>
    
    {/* Tooltip */}
    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
      <div className="bg-gray-900 text-white text-xs font-medium py-2 px-3 rounded-lg whitespace-nowrap shadow-xl">
        {name}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
      </div>
    </div>
  </motion.div>
);

// Network Connection Line Component
const NetworkLine = ({ index, total }) => {
  const angle = (index / total) * Math.PI * 2;
  const length = 150;
  const x1 = 50;
  const y1 = 50;
  const x2 = 50 + Math.cos(angle) * length;
  const y2 = 50 + Math.sin(angle) * length;
  
  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="url(#gradientLine)"
      strokeWidth="1.5"
      strokeDasharray="5,5"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ 
        pathLength: 1,
        opacity: 0.3,
        strokeDashoffset: [0, 20]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
        delay: index * 0.1
      }}
    />
  );
};

// Floating Geometric Shape
const FloatingShape = ({ shape, color, size, x, y, rotation, delay }) => {
  const ShapeComponent = shape;
  
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
      }}
      animate={{
        y: [0, -30, 0],
        rotate: rotation ? [0, 180, 360] : [0, -180, -360],
        scale: [1, 1.1, 1]
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }}
    >
      <ShapeComponent className={`w-full h-full opacity-10`} style={{ color }} />
    </motion.div>
  );
};

// Enhanced Marquee Community Item
const MarqueeItem = ({ icon: Icon, name, color, index }) => (
  <motion.div
    whileHover={{ scale: 1.2, rotate: 5 }}
    className="relative group/icon mx-2"
  >
    <div className={`
      w-16 h-16 rounded-xl
      bg-gradient-to-br from-white to-gray-50
      flex items-center justify-center 
      text-gray-600 
      shadow-lg shadow-gray-200/50
      border border-white/80
      hover:shadow-2xl
      hover:text-${color}-600
      hover:border-${color}-500/30
      transition-all duration-300
      cursor-pointer
      backdrop-blur-sm
      relative overflow-hidden
    `}>
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-cyan-500/0 to-purple-500/0"
        whileHover={{
          background: `linear-gradient(135deg, ${color}500/10, ${color}400/5)`
        }}
        transition={{ duration: 0.3 }}
      />
      <Icon size={24} className="relative z-10" />
    </div>
    
    {/* Floating Label */}
    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover/icon:opacity-100 transition-all duration-300 pointer-events-none">
      <div className={`bg-${color}-600 text-white text-xs font-semibold py-1 px-2 rounded-lg whitespace-nowrap shadow-lg backdrop-blur-sm`}>
        {name}
        <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-${color}-600 rotate-45`} />
      </div>
    </div>
  </motion.div>
);

// New Community Card Component
const CommunityCard = ({ icon: Icon, name, description, members, color, gradient }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ y: -10, scale: 1.02 }}
    className="bg-gradient-to-br from-white/90 to-white/50 rounded-2xl p-6 shadow-xl shadow-gray-200/30 border border-white/70 backdrop-blur-sm hover:shadow-2xl hover:shadow-indigo-200/30 transition-all duration-500 group overflow-hidden relative"
  >
    {/* Animated Gradient Background */}
    <motion.div
      className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${gradient}`}
      animate={{
        backgroundPosition: ['0% 0%', '100% 100%']
      }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    />
    
    <div className="relative z-10">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br from-${color}-500/15 to-${color}-400/10 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-7 h-7 text-${color}-600`} />
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-${color}-100 text-${color}-700`}>
          {members} members
        </span>
      </div>
      
      <h4 className={`text-lg font-bold text-gray-900 mb-2 group-hover:text-${color}-700 transition-colors duration-300`}>
        {name}
      </h4>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {description}
      </p>
      
      <div className="flex items-center justify-between">
        <button className={`text-sm font-medium text-${color}-600 hover:text-${color}-700 transition-colors flex items-center gap-1`}>
          Join Now
          <motion.svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <path
              fill="currentColor"
              d="M5 12H19M19 12L12 5M19 12L12 19"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </button>
        
        <div className="flex -space-x-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-indigo-400 to-purple-500"></div>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

// New Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, gradient }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    whileHover={{ y: -8 }}
    className="bg-gradient-to-br from-white/80 to-white/40 rounded-xl p-6 shadow-lg shadow-gray-200/20 border border-white/60 backdrop-blur-sm hover:shadow-xl hover:shadow-indigo-100/30 transition-all duration-500 group relative overflow-hidden"
  >
    {/* Shimmer Effect */}
    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    
    <div className={`relative z-10 p-3 rounded-lg ${gradient} bg-opacity-10 w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
      <Icon className="w-6 h-6 text-indigo-600" />
    </div>
    
    <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
      {title}
    </h4>
    
    <p className="text-gray-600 text-sm">
      {description}
    </p>
  </motion.div>
);

// Infinite Marquee Component
const InfiniteMarquee = ({ items, speed = 40 }) => {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{
          x: {
            repeat: Infinity,
            duration: speed,
            ease: "linear",
          }
        }}
      >
        {[...items, ...items].map((item, index) => (
          <div key={index} className="inline-block mx-4">
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const CommunityEcosystem = () => {
  const techStack = [
    { name: 'React', IconComponent: FaReact, color: 'cyan' },
    { name: 'Node.js', IconComponent: FaNodeJs, color: 'emerald' },
    { name: 'MongoDB', IconComponent: SiMongodb, color: 'green' },
    { name: 'Express', IconComponent: SiExpress, color: 'gray' },
    { name: 'HTML5', IconComponent: SiHtml5, color: 'orange' },
    { name: 'CSS3', IconComponent: SiCss3, color: 'blue' },
    { name: 'JavaScript', IconComponent: SiJavascript, color: 'yellow' },
    { name: 'TypeScript', IconComponent: SiTypescript, color: 'blue' },
    { name: 'Tailwind', IconComponent: SiTailwindcss, color: 'cyan' },
    { name: 'Next.js', IconComponent: SiNextdotjs, color: 'gray' },
    { name: 'Firebase', IconComponent: SiFirebase, color: 'orange' },
    { name: 'Python', IconComponent: FaPython, color: 'blue' },
    { name: 'Kubernetes', IconComponent: SiKubernetes, color: 'blue' },
    { name: 'API', IconComponent: Cloud, color: 'purple' },
    { name: 'Database', IconComponent: Database, color: 'indigo' },
    { name: 'Redux', IconComponent: SiRedux, color: 'purple' },
    { name: 'AWS', IconComponent: FaAws, color: 'orange' },
    { name: 'Linux', IconComponent: FaLinux, color: 'stone' },
    { name: 'Git', IconComponent: FaGitAlt, color: 'red' },
    { name: 'GitHub', IconComponent: FaGithub, color: 'gray' },
    { name: 'Bootstrap', IconComponent: SiBootstrap, color: 'purple' },
    { name: 'Vite', IconComponent: SiVite, color: 'yellow' },
    { name: 'PostgreSQL', IconComponent: SiPostgresql, color: 'blue' },
    { name: 'MySQL', IconComponent: SiMysql, color: 'blue' },
    { name: 'GraphQL', IconComponent: SiGraphql, color: 'pink' },
    { name: 'Security', IconComponent: Shield, color: 'green' },
    { name: 'Docker', IconComponent: SiDocker, color: 'blue' },
  ];

  const communities = [
    { icon: FaFacebook, color: 'blue', name: 'Facebook' },
    { icon: FaDiscord, color: 'indigo', name: 'Discord' },
    { icon: FaReddit, color: 'orange', name: 'Reddit' },
    { icon: FaSlack, color: 'purple', name: 'Slack' },
    { icon: FaTwitter, color: 'sky', name: 'Twitter' },
    { icon: FaWhatsapp, color: 'green', name: 'WhatsApp' },
    { icon: FaGithub, color: 'gray', name: 'GitHub' },
    { icon: FaTelegram, color: 'blue', name: 'Telegram' },
  ];

  const detailedCommunities = [
    {
      icon: FaDiscord,
      name: "Discord Hub",
      description: "Real-time tech discussions, coding help, and community events",
      members: "15K+",
      color: "indigo",
      gradient: "bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10"
    },
    {
      icon: FaGithub,
      name: "GitHub Org",
      description: "Open source projects, contributions, and collaborative coding",
      members: "8K+",
      color: "gray",
      gradient: "bg-gradient-to-br from-gray-500/10 via-slate-500/10 to-zinc-500/10"
    },
    {
      icon: FaTelegram,
      name: "Telegram Groups",
      description: "Daily coding challenges and quick tech support",
      members: "12K+",
      color: "blue",
      gradient: "bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-teal-500/10"
    },
    {
      icon: FaSlack,
      name: "Slack Workspace",
      description: "Professional networking and career opportunities",
      members: "6K+",
      color: "purple",
      gradient: "bg-gradient-to-br from-purple-500/10 via-violet-500/10 to-fuchsia-500/10"
    }
  ];

  const features = [
    {
      icon: Users,
      title: "Mentorship Programs",
      description: "1:1 mentorship with industry experts and code reviews",
      gradient: "bg-gradient-to-br from-indigo-500/10 to-cyan-500/10"
    },
    {
      icon: Code,
      title: "Pair Programming",
      description: "Real-time collaborative coding sessions and workshops",
      gradient: "bg-gradient-to-br from-emerald-500/10 to-green-500/10"
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Connect with developers from 50+ countries worldwide",
      gradient: "bg-gradient-to-br from-purple-500/10 to-pink-500/10"
    },
    {
      icon: Zap,
      title: "Live Events",
      description: "Weekly webinars, hackathons, and tech talks",
      gradient: "bg-gradient-to-br from-orange-500/10 to-amber-500/10"
    }
  ];

  const stats = [
    { number: '100+', label: 'Tech Communities', icon: Users },
    { number: '24/7', label: 'Active Support', icon: Zap },
    { number: '50K+', label: 'Members', icon: Globe },
    { number: '30+', label: 'Tech Stacks', icon: Cpu },
  ];

  const shapes = [
    { id: 1, type: 'square', color: '#4F46E5', size: 60, x: 10, y: 20, rotation: true },
    { id: 2, type: 'circle', color: '#7C3AED', size: 80, x: 85, y: 15, rotation: false },
    { id: 3, type: 'triangle', color: '#10B981', size: 50, x: 5, y: 70, rotation: true },
    { id: 4, type: 'hexagon', color: '#06B6D4', size: 70, x: 90, y: 75, rotation: false },
    { id: 5, type: 'diamond', color: '#EC4899', size: 40, x: 20, y: 85, rotation: true },
    { id: 6, type: 'pentagon', color: '#8B5CF6', size: 55, x: 75, y: 40, rotation: false },
  ];

  const marqueeItems = communities.map((community, index) => (
    <MarqueeItem key={index} {...community} />
  ));

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-indigo-50/30">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-indigo-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-300/20 to-emerald-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-80 h-80 bg-gradient-to-r from-pink-300/15 to-rose-300/15 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, #4F46E5 1px, transparent 1px),
                             linear-gradient(to bottom, #4F46E5 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Floating Tech Icons */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-5"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
          >
            <FaReact className="w-20 h-20 text-indigo-400" />
          </motion.div>
        ))}

        {/* Network Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          {[...Array(8)].map((_, i) => (
            <motion.path
              key={i}
              d={`M ${i * 12.5},0 Q ${50 + i * 5},${50 + i * 10} ${100 - i * 12.5},100`}
              fill="none"
              stroke="#4F46E5"
              strokeWidth="0.5"
              strokeDasharray="5,5"
              animate={{ 
                strokeDashoffset: [0, 50],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </svg>

        {/* Floating Educational Keywords (Left Side) */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
             {['learning', 'skills', 'practice', 'build', 'explore', 'mentor', 'innovate', 'projects', 'coding', 'career', 'growth', 'AI-guided', 'teamwork'].map((word, i) => (
             <div
                key={i}
                className="absolute font-semibold text-indigo-900/60"
                style={{
                  left: `${2 + (i * 8) % 35}%`, // Slightly wider spread on left
                  top: `${10 + (i * 9) % 80}%`, // Wider vertical spread
                  fontSize: `${12 + (i % 4)}px`, // Larger font
                  letterSpacing: '0.5px',
                  animation: `floatWord ${2.5 + (i % 3)}s ease-in-out infinite alternate`,
                  animationDelay: `${i * 0.2}s`,
                  zIndex: 20 // Bring them up slightly
                }}
              >
                {word}
              </div>
            ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes floatWord {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-6px); }
        }
      `}</style>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Enhanced Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-white/70 shadow-lg shadow-gray-200/30 mb-8 hover:shadow-xl hover:shadow-indigo-200/30 transition-all duration-500 group">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 animate-pulse group-hover:scale-150 transition-transform duration-300"></div>
            <span className="text-sm font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
              Global Developer Network
            </span>
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-indigo-500 animate-pulse group-hover:scale-150 transition-transform duration-300 delay-150"></div>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              ProLync{' '}
            </span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
                Community
              </span>
              <motion.div
                className="absolute -bottom-3 left-0 right-0 h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-full blur-sm"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.3 }}
              />
            </span>
            <br />
            <span className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 bg-clip-text text-transparent">
              Ecosystem
            </span>
          </h1>
        


        </motion.div>

        {/* Active Communities Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-20"
        >
         

          {/* Infinite Marquee */}
          <div className="relative mb-12">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
            <InfiniteMarquee 
              items={marqueeItems}
              speed={60}
            />
          </div>

          {/* Detailed Community Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {detailedCommunities.map((community, index) => (
              <CommunityCard key={index} {...community} />
            ))}
          </div>
        </motion.div>



        {/* Tech Stack Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-20"
        >
         

          <div className="relative w-full">
            {/* Gradient Border Container - Full Width with Shine */}
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-gray-200/50 overflow-hidden border border-white/60 group w-full transform transition-all duration-500 hover:shadow-indigo-500/25 hover:scale-[1.005]">
              
              {/* Premium Sliding Shine Effect - Colorized for Visibility */}
              <div className="absolute inset-0 z-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-indigo-100/60 to-transparent skew-x-12"></div>
              
              {/* Animated Border Gradient */}
              <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-cyan-500/5"></div>
              
              {/* Animated Border Glow */}
              <motion.div
                className="absolute inset-0 rounded-3xl"
                animate={{
                  boxShadow: [
                    'inset 0 0 20px rgba(16, 185, 129, 0.1)',
                    'inset 0 0 40px rgba(16, 185, 129, 0.2)',
                    'inset 0 0 20px rgba(16, 185, 129, 0.1)',
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

                <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Master Your <span className="bg-gradient-to-r from-emerald-600 to-cyan-500 bg-clip-text text-transparent">Tech Stack</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Learn and collaborate across 30+ technologies with expert guidance
            </p>
          </div>

              {/* Center Glow Effect */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-96 h-96 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 blur-3xl opacity-60"></div>
              </div>

              {/* Tech Stack Grid */}
              <div className="relative z-10 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4">
                {techStack.map((tech, index) => (
                  <TechIcon key={index} {...tech} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}

      </div>
    </section>
  );
};

export default CommunityEcosystem;