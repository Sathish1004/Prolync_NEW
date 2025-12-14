import React from 'react';
import { Calendar, ArrowRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BlogCard = ({ blog }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col sm:flex-row gap-6 h-full"
    >
      {/* Image Container - Left Side (or Top on Mobile) */}
      <div className="w-full sm:w-2/5 h-48 sm:h-auto flex-shrink-0 relative overflow-hidden rounded-xl">
        <img 
          src={blog.coverImage || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"} 
          alt={blog.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
           <span className="text-white text-xs font-bold px-2 py-1 bg-purple-600 rounded-md">
             {blog.category || "Tech"}
           </span>
        </div>
      </div>

      {/* Content - Right Side */}
      <div className="flex flex-col justify-center flex-grow py-2">
        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3 font-medium">
          <div className="flex items-center gap-1">
            <Calendar size={14} className="text-purple-500" />
            <span>{new Date(blog.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          {blog.author && (
             <div className="flex items-center gap-1">
                <User size={14} className="text-purple-500" />
                <span>{blog.author}</span>
             </div>
          )}
        </div>

        {/* Title */}
        <Link to={`/blog/${blog.slug || '#'}`} className="block">
          <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-purple-600 transition-colors line-clamp-2">
            {blog.title}
          </h3>
        </Link>
        
        {/* Excerpt */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow leading-relaxed">
          {blog.excerpt || "Unlock the potential of your tech career with our latest insights and comprehensive guides."}
        </p>

        {/* Action */}
        <div className="mt-auto pt-2 border-t border-gray-50">
            <Link 
            to={`/blog/${blog.slug || '#'}`}
            className="inline-flex items-center text-sm font-bold text-gray-900 hover:text-purple-600 transition-colors group/link"
            >
            Read Article 
            <ArrowRight className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform text-purple-600" />
            </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
