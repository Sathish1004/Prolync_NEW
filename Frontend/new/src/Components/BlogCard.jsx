import React from 'react';
import { Clock, ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative overflow-hidden h-48 sm:h-56">
        <img 
          src={blog.coverImage || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60"} 
          alt={blog.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-purple-600 text-xs font-semibold rounded-full shadow-sm">
            {blog.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-grow flex flex-col">
        {/* Meta Info */}
        <div className="flex items-center text-gray-500 text-xs mb-3 space-x-4">
          <div className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            <span>{blog.readTime} min read</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
          {blog.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {blog.excerpt}
        </p>

        {/* Action */}
        <Link 
          to={`/blog/${blog.slug}`}
          className="inline-flex items-center text-purple-600 font-semibold text-sm hover:text-purple-700 transition-colors mt-auto"
        >
          Read Article 
          <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
