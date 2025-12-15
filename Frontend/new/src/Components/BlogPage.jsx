import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Clock, 
  Calendar, 
  ChevronRight, 
  ArrowRight, 
  Hash, 
  Mail, 
  BookOpen,
  Code,
  Cpu,
  Database,
  Globe,
  Smartphone,
  Cloud
} from 'lucide-react';

const BlogPage = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Categories
  const categories = [
    { id: 'All', label: 'All Posts' },
    { id: 'Web Development', label: 'Web Development' },
    { id: 'AI & Tech', label: 'AI & Tech' },
    { id: 'Data Science', label: 'Data Science' },
    { id: 'Career Guidance', label: 'Career Guidance' },
    { id: 'Cloud & DevOps', label: 'Cloud & DevOps' },
  ];

  // Blog Posts Data
  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI in Education: How It's Changing Learning",
      summary: "Explore how Artificial Intelligence is personalizing education, automating administrative tasks, and creating immersive learning experiences for students worldwide.",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "AI & Tech",
      author: "Dr. Sarah Mitchell",
      authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
      date: "Dec 12, 2024",
      readTime: "5 min read",
      featured: true
    },
    {
      id: 2,
      title: "Mastering React Server Components in 2025",
      summary: "A comprehensive guide to understanding and implementing React Server Components for better performance and SEO.",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Web Development",
      author: "Alex Chen",
      authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      date: "Dec 10, 2024",
      readTime: "8 min read",
      featured: false
    },
    
    {
      id: 3,
      title: "Data Science Roadmap: From Beginner to Pro",
      summary: "Step-by-step path to becoming a Data Scientist, including essential skills, tools, and projects to build your portfolio.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Data Science",
      author: "Priya Patel",
      authorAvatar: "https://randomuser.me/api/portraits/women/65.jpg",
      date: "Dec 08, 2024",
      readTime: "6 min read",
      featured: false
    },
    {
      id: 4,
      title: "Top 10 Soft Skills Every Developer Needs",
      summary: "Technical skills get you hired, but soft skills get you promoted. Learn communication, teamwork, and problem-solving.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Career Guidance",
      author: "Michael Ross",
      authorAvatar: "https://randomuser.me/api/portraits/men/86.jpg",
      date: "Dec 05, 2024",
      readTime: "4 min read",
      featured: false
    },
    {
      id: 5,
      title: "Introduction to Kubernetes and Container Orchestration",
      summary: "Simplify deployment and management of containerized applications with our beginner-friendly guide to K8s.",
      image: "https://images.unsplash.com/photo-1667372393119-c81c0c0bd739?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Cloud & DevOps",
      author: "David Kim",
      authorAvatar: "https://randomuser.me/api/portraits/men/22.jpg",
      date: "Dec 01, 2024",
      readTime: "10 min read",
      featured: false
    },
    {
      id: 6,
      title: "Building Mobile Apps with Flutter vs React Native",
      summary: "A detailed comparison of the two most popular cross-platform frameworks to help you choose the right one.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Web Development",
      author: "Emma Wilson",
      authorAvatar: "https://randomuser.me/api/portraits/women/29.jpg",
      date: "Nov 28, 2024",
      readTime: "7 min read",
      featured: false
    }
  ];

  const filteredPosts = activeCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-b from-white to-slate-50 border-b border-slate-100 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
        
        {/* Floating Icons Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           {[Code, Cpu, Database, Globe, Smartphone, Cloud].map((Icon, idx) => (
             <motion.div
               key={idx}
               className="absolute text-slate-200"
               style={{
                 top: `${Math.random() * 80}%`,
                 left: `${Math.random() * 90}%`,
               }}
               animate={{
                 y: [0, -20, 0],
                 opacity: [0.3, 0.6, 0.3],
               }}
               transition={{
                 duration: 4 + Math.random() * 4,
                 repeat: Infinity,
                 ease: "easeInOut"
               }}
             >
               <Icon size={40 + Math.random() * 40} />
             </motion.div>
           ))}
        </div>

        <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10 flex flex-col md:flex-row items-center gap-12 max-w-10xl">
          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm mb-6">
                Prolync Blog
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Learn, Explore & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                   Stay Ahead
                </span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto md:mx-0">
                Insights, tutorials, industry news, and career guidance for learners and professionals. Join our community of 50k+ readers.
              </p>
              
              {/* Search Bar - Hero Version */}
              <div className="relative max-w-md mx-auto md:mx-0">
                <input 
                  type="text" 
                  placeholder="Search articles..." 
                  className="w-full pl-12 pr-4 py-4 rounded-full border border-slate-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/80 backdrop-blur-sm transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              </div>
            </motion.div>
          </div>
          
          <div className="flex-1 relative">
             <motion.img 
               src="https://cdni.iconscout.com/illustration/premium/thumb/online-education-4395027-3657731.png" 
               alt="Learning Illustration"
               className="w-full max-w-lg mx-auto drop-shadow-2xl"
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.8 }}
             />
          </div>
        </div>
      </section>

      {/* 2. Featured & Main Content */}
      <section className="py-16 container mx-auto px-4 max-w-10xl">
        
        {/* Featured Post Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden shadow-2xl mb-20 group cursor-pointer"
        >
           <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent z-10" />
           <img 
             src={blogPosts[0].image} 
             alt="Featured Post" 
             className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
           />
           <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20 max-w-3xl">
              <span className="inline-flex items-center gap-2 bg-rose-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-4 animate-pulse">
                 Trending Now
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight group-hover:text-indigo-300 transition-colors">
                 {blogPosts[0].title}
              </h2>
              <p className="text-slate-300 text-lg mb-6 line-clamp-2">
                 {blogPosts[0].summary}
              </p>
              <div className="flex items-center gap-4 text-slate-300 text-sm font-medium">
                 <div className="flex items-center gap-2">
                    <img src={blogPosts[0].authorAvatar} alt={blogPosts[0].author} className="w-8 h-8 rounded-full border border-white/30" />
                    <span>{blogPosts[0].author}</span>
                 </div>
                 <span>•</span>
                 <span>{blogPosts[0].date}</span>
                 <span>•</span>
                 <span>{blogPosts[0].readTime}</span>
              </div>
           </div>
        </motion.div>

        {/* Filters */}
        <div className="mb-10 overflow-x-auto pb-4">
           <div className="flex gap-2 min-w-max">
             {categories.map((cat) => (
               <button
                 key={cat.id}
                 onClick={() => setActiveCategory(cat.id)}
                 className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                   activeCategory === cat.id 
                     ? 'bg-indigo-600 text-white border-indigo-600 shadow-md transform scale-105' 
                     : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
                 }`}
               >
                 {cat.label}
               </button>
             ))}
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* Left: Blog Grid */}
           <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.filter(p => !p.featured).map((post, index) => (
                 <motion.div
                   key={post.id}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: index * 0.1 }}
                   className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col group h-full"
                 >
                    <div className="relative h-48 overflow-hidden">
                       <img 
                         src={post.image} 
                         alt={post.title} 
                         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                       />
                       <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold text-indigo-600 rounded-lg shadow-sm">
                             {post.category}
                          </span>
                       </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                       <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                          {post.title}
                       </h3>
                       <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-grow">
                          {post.summary}
                       </p>
                       
                       <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                          <div className="flex items-center gap-2">
                             <img src={post.authorAvatar} alt={post.author} className="w-6 h-6 rounded-full" />
                             <div className="text-xs text-slate-500 font-medium">
                                <p className="text-slate-900">{post.author}</p>
                                <p>{post.date} • {post.readTime}</p>
                             </div>
                          </div>
                          
                          <button className="text-indigo-600 hover:text-indigo-700 font-bold text-sm flex items-center gap-1 group/btn">
                             Read More
                             <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                          </button>
                       </div>
                    </div>
                 </motion.div>
              ))}
           </div>

           {/* Right: Sidebar */}
           <div className="hidden lg:block space-y-8">
              
              {/* Newsletter Widget */}
              <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-6 text-white shadow-lg">
                 <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                    <Mail size={24} />
                 </div>
                 <h3 className="text-xl font-bold mb-2">Weekly Insights</h3>
                 <p className="text-indigo-100 text-sm mb-4">Get the latest tutorials and tech news delivered to your inbox.</p>
                 <div className="space-y-3">
                    <input 
                      type="email" 
                      placeholder="Your email address" 
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder-indigo-200 focus:outline-none focus:bg-white/20 text-white"
                    />
                    <button className="w-full py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors">
                       Subscribe
                    </button>
                 </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                 <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Hash size={18} className="text-indigo-500" />
                    Popular Tags
                 </h3>
                 <div className="flex flex-wrap gap-2">
                    {['React', 'Python', 'Machine Learning', 'Career', 'CSS', 'Node.js', 'DevOps', 'Interview Tips'].map(tag => (
                       <span key={tag} className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-medium rounded-full cursor-pointer hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                          #{tag}
                       </span>
                    ))}
                 </div>
              </div>

              {/* Recommended */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                 <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <BookOpen size={18} className="text-indigo-500" />
                    Must Read
                 </h3>
                 <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                       <div key={i} className="flex gap-4 group cursor-pointer">
                          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                             <img src={`https://source.unsplash.com/random/200x200?tech&sig=${i}`} alt="Thumb" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                          </div>
                          <div>
                             <h4 className="text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-indigo-600 transition-colors mb-1">
                                10 Tips to Crack FAANG Interviews in 2024
                             </h4>
                             <span className="text-xs text-slate-400">Nov 15 • 5 min read</span>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>

        </div>

      </section>

      {/* 3. Footer CTA */}
      <section className="bg-slate-900 py-16 relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/50 to-purple-900/50" />
         <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Level up your skills with Prolync</h2>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto text-lg">
               Ready to take your career to the next level? Explore our industry-validated courses today.
            </p>
            <button 
              onClick={() => onNavigate('courses')}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold rounded-full shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transform hover:scale-105 transition-all flex items-center gap-2 mx-auto"
            >
               Explore Courses
               <ArrowRight size={20} />
            </button>
         </div>
      </section>

    </div>
  );
};

export default BlogPage;
