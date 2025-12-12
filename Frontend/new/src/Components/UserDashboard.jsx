import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, BookOpen, Award, Settings, LogOut, Bell, Search, User, 
  ChevronRight, PlayCircle, Clock, Star, TrendingUp 
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active, onClick, delay }) => (
  <motion.button
    initial={{ x: -20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: delay * 0.1 }}
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
      active 
        ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-200' 
        : 'text-gray-500 hover:bg-indigo-50 hover:text-indigo-600'
    }`}
  >
    <Icon size={20} className={`${active ? 'text-white' : 'text-gray-400 group-hover:text-indigo-600'}`} />
    <span className="font-medium">{label}</span>
    {active && (
      <motion.div 
        layoutId="activeIndicator"
        className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
      />
    )}
  </motion.button>
);

const CourseCard = ({ course, index }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ y: -5, scale: 1.02 }}
    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 cursor-pointer group"
  >
    <div className="relative rounded-xl overflow-hidden mb-4 aspect-video">
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
      <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute bottom-3 left-3 z-20">
        <span className="text-xs font-semibold px-2 py-1 bg-white/20 backdrop-blur-md rounded-lg text-white border border-white/20">
          {course.level}
        </span>
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
            <PlayCircle size={24} className="text-white fill-white" />
        </div>
      </div>
    </div>
    
    <h3 className="font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-indigo-600 transition-colors">{course.title}</h3>
    <p className="text-sm text-gray-500 mb-3">{course.instructor}</p>
    
    <div className="w-full bg-gray-100 h-1.5 rounded-full mb-3 overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${course.progress}%` }}
        transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
        className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full"
      />
    </div>
    
    <div className="flex items-center justify-between text-xs text-gray-400">
      <span className="flex items-center gap-1"><Clock size={12} /> {course.duration}</span>
      <span className="font-medium text-emerald-500">{course.progress}% Complete</span>
    </div>
  </motion.div>
);

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState({ full_name: 'Student', email: '' });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  };

  const courses = [
    { title: "Complete Web Development Bootcamp", instructor: "Sarah Johnson", progress: 65, image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600", level: "Intermediate", duration: "12h left" },
    { title: "Advanced React Patterns", instructor: "Michael Chen", progress: 32, image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600", level: "Advanced", duration: "8h left" },
    { title: "UI/UX Design Masterclass", instructor: "Emma Davis", progress: 89, image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600", level: "Beginner", duration: "2h left" },
  ];

  const stats = [
    { label: "Courses in Progress", value: "4", icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Completed", value: "12", icon: CheckCircle => <Award size={24} />, color: "text-emerald-600", bg: "bg-emerald-50" }, // Using Award as placeholder if CheckCircle not imported
    { label: "Hours Learned", value: "148", icon: Clock, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Certificates", value: "7", icon: Award, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-white fixed h-full z-30 border-r border-gray-100 hidden lg:flex flex-col p-6">
        <div className="flex items-center gap-3 px-2 mb-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200">
            P
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Prolync</span>
        </div>

        <nav className="flex-1 space-y-2">
          <SidebarItem icon={Home} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} delay={1} />
          <SidebarItem icon={BookOpen} label="My Courses" active={activeTab === 'courses'} onClick={() => setActiveTab('courses')} delay={2} />
          <SidebarItem icon={Award} label="Certificates" active={activeTab === 'certificates'} onClick={() => setActiveTab('certificates')} delay={3} />
          <SidebarItem icon={TrendingUp} label="Learning Path" active={activeTab === 'path'} onClick={() => setActiveTab('path')} delay={4} />
          <SidebarItem icon={Settings} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} delay={5} />
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-50">
           <button 
             onClick={handleLogout}
             className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all duration-300"
           >
             <LogOut size={20} />
             <span className="font-medium">Logout</span>
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-0 lg:ml-72 p-4 md:p-8 overflow-y-auto">
        {/* Top Bar */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user.full_name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-gray-500">Let's continue your learning journey.</p>
          </div>

          <div className="flex items-center gap-4">
             <div className="relative hidden md:block">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
               <input 
                 type="text" 
                 placeholder="Search courses..." 
                 className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 w-64 transition-all"
               />
             </div>
             <button className="p-2.5 rounded-xl border border-gray-200 text-gray-500 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all relative">
               <Bell size={20} />
               <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-red-500 border border-white"></span>
             </button>
             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 p-0.5 cursor-pointer">
               <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-indigo-600 font-bold border-2 border-transparent">
                  {user.full_name?.charAt(0)}
               </div>
             </div>
          </div>
        </header>

        {/* content */}
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {stats.map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4"
                >
                  <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Resume Learning Section */}
            <section>
               <div className="flex items-center justify-between mb-6">
                 <h2 className="text-xl font-bold text-gray-900">Continue Learning</h2>
                 <button className="text-indigo-600 font-medium text-sm hover:underline flex items-center gap-1">
                   View All <ChevronRight size={16} />
                 </button>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course, i) => (
                    <CourseCard key={i} course={course} index={i} />
                  ))}
               </div>
            </section>
            
            {/* Banner */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden"
            >
               <div className="relative z-10 max-w-lg">
                 <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-sm font-medium mb-4 border border-white/20">Pro Member</span>
                 <h2 className="text-3xl font-bold mb-4">Unlock Premium Workshops</h2>
                 <p className="text-indigo-100 mb-8 leading-relaxed">Get unlimited access to live workshops, mentor sessions, and exclusive projects with your premium plan.</p>
                 <button className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-colors shadow-lg shadow-indigo-900/20">
                   Explore Premium
                 </button>
               </div>
               
               {/* Decorative Shapes */}
               <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
               <div className="absolute left-0 bottom-0 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
            </motion.div>
        </div>

      </main>
    </div>
  );
};

export default UserDashboard;
