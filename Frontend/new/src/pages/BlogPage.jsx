import React, { useState, useEffect } from 'react';
import { Search, Sparkles, BookOpen, GraduationCap } from 'lucide-react';
import BlogCard from '../Components/BlogCard';
import { getBlogs } from '../services/blogService';

const categories = [
  'All',
  'Learning & Career Guidance',
  'Course & Skill-Based',
  'Industry & Tech Updates',
  'Project & Case Study',
  'Student Success & Community',
  'Company & Platform Updates'
];

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, [activeCategory]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const params = {};
      if (activeCategory !== 'All') {
        params.category = activeCategory;
      }
      const data = await getBlogs(params);
      setBlogs(data);
    } catch (error) {
      console.error("Failed to fetch blogs", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (blog.excerpt && blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 py-20 relative z-10 text-center">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6 border border-white/20">
            <Sparkles className="w-4 h-4 mr-2 text-yellow-300" />
            <span className="text-sm font-medium text-yellow-100">Prolync Knowledge Hub</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Insights for Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">Tech Journey</span>
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto mb-10">
            Expert articles on coding, career growth, and industry trends to help you stay ahead.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <input 
              type="text" 
              placeholder="Search specific topics..." 
              className="w-full py-4 px-6 pr-12 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-purple-500/30 shadow-2xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 flex-grow">
        
        {/* Categories */}
        <div className="flex overflow-x-auto pb-4 mb-10 gap-3 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat 
                  ? 'bg-purple-600 text-white shadow-md transform scale-105' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white h-96 rounded-2xl shadow-sm animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-2xl"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {filteredBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.map((blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-600">No articles found</h3>
                <p className="text-gray-500">Try adjusting your search or category filter.</p>
              </div>
            )}
          </>
        )}
      </main>

    </div>
  );
};

export default BlogPage;
