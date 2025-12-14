import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Trophy, Users, Briefcase, ChevronRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import BlogCard from '../components/BlogCard';


// --- MOCK DATA FOR UI ---
const MOCK_BLOGS = [
    {
        _id: '1',
        title: "Master Java Coding Interview for Freshers & Experienced (2025)",
        excerpt: "Top 20 Java interview questions, OOPs concepts, Exception handling, and Collections framework explained.",
        coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
        category: "Learning & Career Guidance",
        createdAt: new Date().toISOString(),
        slug: "java-interview-mastery"
    },
    {
        _id: '2',
        title: "React JS Course in Tamil: Complete Front-End Guide",
        excerpt: "Learn React JS from scratch. Components, State, Props, and Hooks explained in simple Tamil.",
        coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
        category: "Course & Skill-Based",
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        slug: "react-js-tamil-guide"
    },
    {
        _id: '3',
        title: "Success Story: How Priya Cracked a 12 LPA Package at Zoho",
        excerpt: "From a Tier-3 college to a top product company. Read Priya's journey with Prolync.",
        coverImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
        category: "Student Success",
        createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
        slug: "priya-zoho-success"
    },
    {
        _id: '4',
        title: "System Design for Beginners: Scaling to 1 Million Users",
        excerpt: "Load balancers, Caching, Database sharding - simplified for beginners.",
        coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
        category: "Industry & Tech Updates",
        createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
        slug: "system-design-basics"
    }
];

const ACHIEVEMENTS = [
    {
        id: 1,
        title: "100+ Students Placed",
        desc: "In top MNCs like Zoho, TCS, and Freshworks this year.",
        icon: Users,
        color: "bg-green-100 text-green-600"
    },
    {
        id: 2,
        title: "Best EdTech Startup",
        desc: "Recognized by Startup India for innovation in vernacular learning.",
        icon: Trophy,
        color: "bg-yellow-100 text-yellow-600"
    },
    {
        id: 3,
        title: "50+ Workshops Conducted",
        desc: "Hands-on coding bootcamps across 20+ colleges.",
        icon: Briefcase,
        color: "bg-blue-100 text-blue-600"
    }
];

const categories = [
  'All',
  'Learning & Career Guidance',
  'Course & Skill-Based',
  'Industry & Tech Updates',
  'Student Success',
  'Workshops'
];

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [blogs, setBlogs] = useState(MOCK_BLOGS);

  // Filter Logic
  const filteredBlogs = blogs.filter(blog => {
      const matchesCategory = activeCategory === 'All' || blog.category === activeCategory;
      const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      
      {/* 1. HERO SECTION (Clean, Centered, EWC Style) */}
      <section className="relative py-24 bg-white overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl opacity-60 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-60 translate-x-1/3 translate-y-1/3"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-6xl font-extrabold mb-6 tracking-tight text-gray-900">
              Blog
            </h1>
            <p className="text-xl text-gray-500 mb-10 font-medium">
              Insights, Success Stories, and Tech Learning from <span className="text-purple-600 font-bold">Prolync</span>
            </p>

            {/* Premium Search Bar */}
            <div className="flex items-center bg-white shadow-xl shadow-gray-200/50 rounded-2xl p-2 border border-gray-100 max-w-2xl mx-auto transform hover:scale-[1.01] transition-transform duration-300">
                <div className="pl-4 text-gray-400">
                    <Search className="w-6 h-6" />
                </div>
                <input 
                    type="text" 
                    placeholder="Search blog posts..." 
                    className="w-full px-4 py-3 text-lg text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="bg-[#FFD600] text-black font-bold px-8 py-3 rounded-xl hover:bg-[#FFC000] transition-colors shadow-sm">
                    Search
                </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. CATEGORY FILTERS */}
      <section className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 py-4">
        <div className="container mx-auto px-4 overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 min-w-max pb-2 md:pb-0 justify-center">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                            activeCategory === cat 
                            ? 'bg-black text-white shadow-md' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
      </section>

      {/* 3. BLOG GRID */}
      <main className="container mx-auto px-4 py-16">
        {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                {filteredBlogs.map((blog, idx) => (
                    <BlogCard key={blog._id} blog={blog} />
                ))}
            </div>
        ) : (
            <div className="text-center py-24 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-600">No articles found</h3>
                <p className="text-gray-500 mt-2">Try searching for something else.</p>
            </div>
        )}
      </main>

      {/* 4. ACHIEVEMENTS & WORKSHOPS SECTION */}
      <section className="bg-gray-50 py-20 border-t border-gray-100 relative overflow-hidden">
         <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <span className="inline-block py-1 px-3 rounded-full bg-purple-100 text-purple-700 text-xs font-bold tracking-wide uppercase mb-4">
                    Why Prolync?
                </span>
                <h2 className="text-4xl font-bold text-gray-900">Achievements & Workshops</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {ACHIEVEMENTS.map((item) => (
                    <motion.div 
                        key={item.id}
                        whileHover={{ y: -10 }}
                        className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 relative group"
                    >
                        <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mb-6 text-xl shadow-sm`}>
                            <item.icon size={28} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                            {item.title}
                        </h3>
                        <p className="text-gray-500 leading-relaxed">
                            {item.desc}
                        </p>
                        <div className="mt-6 flex items-center text-purple-600 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">
                            Learn more <ChevronRight size={16} />
                        </div>
                    </motion.div>
                ))}
            </div>
         </div>
      </section>

      {/* 5. COLLABORATORS & COMMUNITY */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">Trusted by Leading Institutions & Partners</h2>
            
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Placeholder Logos */}
                <span className="text-2xl font-black text-gray-400 hover:text-blue-600 transition-colors cursor-pointer">ZOHO</span>
                <span className="text-2xl font-black text-gray-400 hover:text-blue-800 transition-colors cursor-pointer">TCS</span>
                <span className="text-2xl font-black text-gray-400 hover:text-green-600 transition-colors cursor-pointer">Freshworks</span>
                <span className="text-2xl font-black text-gray-400 hover:text-red-600 transition-colors cursor-pointer">IIT Madras</span>
                <span className="text-2xl font-black text-gray-400 hover:text-orange-600 transition-colors cursor-pointer">Anna University</span>
            </div>
            
            <div className="mt-16 text-center">
                <div className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-purple-500/20 hover:scale-105 transition-transform cursor-pointer">
                    <Star className="text-yellow-400 fill-current" />
                    Join 5,000+ Learners Community
                </div>
            </div>
        </div>
      </section>

    </div>
  );
};
export default BlogPage;
