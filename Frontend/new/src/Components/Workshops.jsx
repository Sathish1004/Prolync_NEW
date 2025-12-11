import React from 'react';
import { CheckCircle, ArrowRight, Code, Terminal, Database, Cloud } from 'lucide-react';
import WorkshopCard from './WorkshopCard';

const Workshops = () => {
  const workshopData = [
    {
      id: 1,
      title: "UI/UX Design Workshop",
      description: "Master the art of user interface and experience design with Figma.",
      image: "https://images.unsplash.com/photo-1586717791821-3f44a5638d0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "2 Days",
      mode: "Live Online",
      price: "499",
      originalPrice: "1999"
    },
    {
      id: 2,
      title: "AI Prompt Engineering",
      description: "Learn how to communicate effectively with AI models like GPT-4.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "1 Day",
      mode: "Live Online",
      price: "Free",
      originalPrice: "999"
    },
    {
      id: 3,
      title: "Python for Data Analytics",
      description: "Hands-on bootcamp for data analysis using Python and Pandas.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "3 Days",
      mode: "Hybrid",
      price: "999",
      originalPrice: "2499"
    },
    {
        id: 4,
        title: "Cloud Foundations Workshop",
        description: "Introduction to AWS and cloud computing fundamentals.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "1 Day",
        mode: "Live Online",
        price: "299",
        originalPrice: "999"
      },
      {
        id: 5,
        title: "Digital Marketing Essentials",
        description: "Learn SEO, SEM, and Social Media Marketing strategies.",
        image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "2 Days",
        mode: "Live Online",
        price: "499",
        originalPrice: "1499"
      },
      {
        id: 6,
        title: "MERN Stack Crash Course",
        description: "Build a full-stack application from scratch in this intensive workshop.",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "4 Days",
        mode: "Offline",
        price: "1499",
        originalPrice: "3999"
      }
  ];

  return (
    <section className="py-20 bg-transparent relative" id="workshops">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION 1: HERO - Split Layout with Circular Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 relative z-10">
            
            {/* Left Column: Text Block */}
            <div className="text-left animate-fade-in-up">
                <span className="text-purple-600 font-bold tracking-wider uppercase text-sm mb-2 block">Skill Upgrade</span>
                <h1 className="text-5xl md:text-6xl font-extrabold text-[#0A2540] mb-6 leading-tight tracking-tight">
                    Workshops to Upgrade<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Your Tech Skills</span>
                </h1>
                
                <p className="text-xl text-[#64748B] mb-8 max-w-lg font-medium leading-relaxed">
                    Hands-on, intensive sessions designed to bridge the gap between theory and practice. Get certified in days.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 mb-10">
                   <button className="px-8 py-4 bg-gradient-to-r from-[#16A34A] to-[#22C55E] text-white rounded-xl font-bold shadow-lg hover:shadow-green-500/30 hover:scale-[1.03] transition-all duration-300 text-lg">
    Apply Now
</button>

                    
                    {/* Schedule Button Container with Hover Card */}
                    <div className="relative group">
                        <button className="px-8 py-4 bg-white text-[#0A2540] border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-all duration-300 text-lg w-full sm:w-auto">
                            View Schedule
                        </button>

                        {/* HOVER CARD */}
                        <div className="absolute top-full left-0 mt-4 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-white/50 p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] z-50">
                            
                            {/* Card Header */}
                            <h4 className="text-[#0A2540] font-bold text-lg mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
                                Workshop Schedule
                            </h4>

                            {/* Timeline Items */}
                            <div className="space-y-4 relative">
                                {/* Connector Line */}
                                <div className="absolute top-2 bottom-2 left-[5px] w-0.5 bg-slate-100 -z-10"></div>

                                {/* Item 1: Completed */}
                                <div className="flex items-start gap-3">
                                    <div className="mt-1.5 w-3 h-3 rounded-full bg-green-500 border-2 border-white shadow-sm shrink-0"></div>
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-medium text-slate-500 line-through decoration-slate-400">HTML/CSS & ES6 Mastery</p>
                                        <span className="text-[10px] uppercase font-bold text-red-600 bg-green-50 px-2 py-0.5 rounded-full inline-block">Completed</span>
                                    </div>
                                </div>

                                {/* Item 2: Ongoing */}
                                <div className="flex items-start gap-3">
                                    <div className="mt-1.5 relative">
                                        <div className="w-3 h-3 rounded-full bg-indigo-500 border-2 border-white shadow-sm relative z-10"></div>
                                        <div className="absolute top-0 left-0 w-3 h-3 bg-indigo-500 rounded-full animate-ping opacity-75"></div>
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-bold text-[#0A2540]">Node.js API Development</p>
                                        <span className="text-[10px] uppercase font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full inline-block">Ongoing</span>
                                    </div>
                                </div>

                                {/* Item 3: Upcoming */}
                                <div className="flex items-start gap-3 opacity-60">
                                    <div className="mt-1.5 w-3 h-3 rounded-full bg-slate-300 border-2 border-white shadow-sm shrink-0"></div>
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-medium text-slate-600">MongoDB CRUD Operations</p>
                                        <span className="text-[10px] uppercase font-bold text-green-500 bg-slate-100 px-2 py-0.5 rounded-full inline-block">Upcoming</span>
                                    </div>
                                </div>
                                
                                {/* Item 4: Upcoming */}
                                <div className="flex items-start gap-3 opacity-60">
                                    <div className="mt-1.5 w-3 h-3 rounded-full bg-slate-300 border-2 border-white shadow-sm shrink-0"></div>
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-medium text-slate-600">Deployment (Render/Vercel)</p>
                                        <span className="text-[10px] uppercase font-bold text-green-500 bg-slate-100 px-2 py-0.5 rounded-full inline-block">Upcoming</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="flex items-center gap-6 text-sm font-semibold text-slate-500">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-100 rounded-full shadow-sm hover:-translate-y-1 transition-transform duration-500">
                        <CheckCircle size={16} className="text-indigo-600" />
                        <span>ISO Certified</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-100 rounded-full shadow-sm hover:-translate-y-1 transition-transform duration-500 delay-100">
                        <CheckCircle size={16} className="text-purple-600" />
                        <span>10K+ Learners</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-100 rounded-full shadow-sm hover:-translate-y-1 transition-transform duration-500 delay-200">
                        <CheckCircle size={16} className="text-blue-600" />
                        <span>AI Verified</span>
                    </div>
                </div>
            </div>

            {/* Right Column: Circular Hero Visual */}
            <div className="relative flex justify-center lg:justify-end animate-fade-in-up delay-200">
                
                {/* Main Circular Image Frame */}
                <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px]">
                    
                    {/* Decorative Blur Glows */}
                    <div className="absolute top-10 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                    <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

                    {/* The Image */}
                    <div className="relative w-full h-full rounded-full border-[8px] border-white shadow-2xl overflow-hidden z-10 animate-float-slow">
                        <img 
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                            alt="Team Collaboration" 
                            className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-1000"
                        />
                        {/* Glass Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/20 to-transparent pointer-events-none"></div>
                    </div>

                    {/* Floating Badges */}
                    
                    {/* Badge 1: Live Class */}
                    <div className="absolute top-10 left-0 z-20 animate-float-delayed">
                        <div className="flex items-center gap-2 px-4 py-2 bg-[#E0EAFF] backdrop-blur-md border border-white/60 rounded-full shadow-lg">
                            <div className="p-1.5 bg-indigo-600 rounded-full text-white">
                                <Code size={12} />
                            </div>
                            <span className="text-sm font-bold text-indigo-900">Live Class</span>
                        </div>
                    </div>

                    {/* Badge 2: AI Assistant */}
                    <div className="absolute bottom-20 -right-6 z-20 animate-float">
                        <div className="flex items-center gap-2 px-4 py-2 bg-[#F3E8FF] backdrop-blur-md border border-white/60 rounded-full shadow-lg">
                             <div className="p-1.5 bg-purple-600 rounded-full text-white">
                                <Terminal size={12} />
                            </div>
                            <span className="text-sm font-bold text-purple-900">AI Assistant</span>
                        </div>
                    </div>

                    {/* Badge 3: Certification */}
                    <div className="absolute bottom-10 left-10 z-20 animate-float-reverse">
                         <div className="flex items-center gap-2 px-4 py-2 bg-[#DCFCE7] backdrop-blur-md border border-white/60 rounded-full shadow-lg">
                             <div className="p-1.5 bg-green-600 rounded-full text-white">
                                <CheckCircle size={12} />
                            </div>
                            <span className="text-sm font-bold text-green-900">Certification</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        {/* SECTION 2: GRID */}
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0A2540]">Popular Workshops</h2>
            <p className="text-slate-500 mt-2">Choose from our wide range of expert-led sessions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workshopData.map(workshop => (
                <WorkshopCard key={workshop.id} workshop={workshop} />
            ))}
        </div>

      </div>
    </section>
  );
};

export default Workshops;
