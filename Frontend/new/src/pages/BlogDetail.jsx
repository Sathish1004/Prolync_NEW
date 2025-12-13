import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, User, ChevronLeft, Share2, Linkedin, Twitter, Facebook, ExternalLink } from 'lucide-react';
import { getBlogBySlug, getLatestBlogs } from '../services/blogService';

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getBlogBySlug(slug);
        setBlog(data);
        
        // Fetch related/latest blogs for sidebar
        const latest = await getLatestBlogs(3);
        setRelatedBlogs(latest.filter(b => b.slug !== slug));
      } catch (error) {
        console.error("Failed to fetch blog details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Blog not found</h2>
            <Link to="/blogs" className="text-purple-600 hover:text-purple-700 font-semibold">Back to Blog</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">

      {/* Hero Header */}
      <header className="bg-gray-900 text-white relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-gray-900/90 z-10"></div>
        <img 
          src={blog.coverImage} 
          alt={blog.title} 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        
        <div className="container mx-auto px-4 py-20 relative z-20">
          <Link to="/blogs" className="inline-flex items-center text-gray-300 hover:text-white mb-8 transition-colors">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Articles
          </Link>
          
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/20 text-purple-200 border border-purple-500/30 text-sm font-semibold mb-6">
              {blog.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-300 text-sm md:text-base">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>{blog.readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content */}
          <article className="lg:w-2/3">
            {/* Social Share Mobile */}
            <div className="flex gap-4 mb-8 lg:hidden border-b border-gray-100 pb-6">
              <button className="p-2 rounded-full bg-blue-50 text-blue-600"><Linkedin className="w-5 h-5" /></button>
              <button className="p-2 rounded-full bg-sky-50 text-sky-500"><Twitter className="w-5 h-5" /></button>
              <button className="p-2 rounded-full bg-blue-50 text-blue-700"><Facebook className="w-5 h-5" /></button>
            </div>

            {/* Blog Body - Using dangerouslySetInnerHTML assuming sanitized content from CMS */}
            <div 
              className="prose prose-lg prose-purple max-w-none text-gray-600 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
            
            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-100">
                <h4 className="text-sm uppercase tracking-wide text-gray-400 font-bold mb-4">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md text-sm hover:bg-gray-200 cursor-pointer">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="lg:w-1/3 space-y-8">
            
            {/* CTA Card */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-4">Ready to master these skills?</h3>
              <p className="text-indigo-100 mb-6">
                Join thousands of students learning on Prolync. Get hands-on experience and expert guidance.
              </p>
              <Link to="/courses" className="block w-full py-3 bg-white text-indigo-600 text-center font-bold rounded-xl hover:bg-gray-50 transition-colors">
                Browse Courses
              </Link>
            </div>

            {/* Recommended Posts */}
            {relatedBlogs.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Recommended for you</h3>
                <div className="space-y-6">
                  {relatedBlogs.map((item) => (
                    <Link key={item._id} to={`/blog/${item.slug}`} className="flex gap-4 group">
                      <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                        <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-purple-600 mb-1 block">{item.category}</span>
                        <h4 className="font-bold text-gray-800 leading-tight group-hover:text-purple-600 transition-colors mb-1 line-clamp-2">
                          {item.title}
                        </h4>
                        <span className="text-xs text-gray-400">{item.readTime} min read</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Sticky Share (Desktop) */}
            <div className="hidden lg:block sticky top-24">
              <p className="text-sm font-bold text-gray-400 mb-4 uppercase text-center">Share this article</p>
              <div className="flex justify-center gap-4">
                <button className="p-3 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-600 transition-all shadow-sm">
                  <Linkedin className="w-5 h-5" />
                </button>
                <button className="p-3 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-sky-500 hover:border-sky-500 transition-all shadow-sm">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="p-3 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-blue-700 hover:border-blue-700 transition-all shadow-sm">
                  <Facebook className="w-5 h-5" />
                </button>
              </div>
            </div>

          </aside>
        </div>
      </div>
      
    </div>
  );
};

export default BlogDetail;
