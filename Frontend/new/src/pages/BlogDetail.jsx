import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, User, ChevronLeft, Linkedin, Twitter, Facebook, BookOpen, Trophy, Video } from 'lucide-react';
import { getBlogBySlug, getLatestBlogs } from '../services/blogService';

// --- RICH MOCK DATA FOR DEMO ---
const MOCK_ARTICLES = {
    "java-interview-mastery": {
        _id: '1',
        title: "Master Java Coding Interview for Freshers & Experienced (2025)",
        category: "Course & Skill-Based", // Triggers Course CTA
        author: "Tech Team Prolync",
        readTime: 12,
        createdAt: new Date().toISOString(),
        coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80",
        content: `
            <h2>Introduction</h2>
            <p>Java remains one of the most dominant programming languages in the enterprise world. Whether you are a fresh graduate or an experienced developer, mastering Core Java concepts is crucial for cracking interviews at top product-based companies like Zoho, Freshworks, and Amazon.</p>
            
            <h3>Top 5 Concepts to Master</h3>
            <ul>
                <li><strong>OOPs Principles:</strong> Polymorphism, Encapsulation, Inheritance, and Abstraction. Real-world examples are key.</li>
                <li><strong>Exception Handling:</strong> Checked vs Unchecked exceptions, try-with-resources.</li>
                <li><strong>Collections Framework:</strong> HashMap internal working, ArrayList vs LinkedList, and HashSet.</li>
                <li><strong>Multithreading:</strong> Thread lifecycle, Synchronization, and ConcurrentHashMap.</li>
                <li><strong>Java 8 Features:</strong> Lambda expressions, Stream API, and Optional class.</li>
            </ul>

            <h3>Sample Interview Question: HashMap Internal Working</h3>
            <p>HashMap uses hashing to store elements. It uses the 'hashCode()' method to calculate the hash value and find the bucket location. In case of a collision (same hash), it uses a LinkedList (or Balanced Tree in Java 8+) to store multiple entries.</p>

            <div class="bg-blue-50 p-6 rounded-xl border border-blue-100 my-8">
                <h4 class="text-blue-800 font-bold text-lg mb-2">Want to learn this in-depth?</h4>
                <p class="text-blue-700">Our seamless "Full Stack Java" course covers Data Structures and Algorithms with live mock interviews.</p>
            </div>
        `,
        ctaType: "COURSE",
        price: "₹499"
    },
    "react-js-tamil-guide": {
        _id: '2',
        title: "React JS Course in Tamil: Complete Front-End Guide",
        category: "Course & Skill-Based",
        author: "Error Makes Clever",
        readTime: 8,
        createdAt: new Date().toISOString(),
        coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&q=80",
        content: `
            <h2>Why Learn React? (React ஏன் கற்க வேண்டும்?)</h2>
            <p>React is the most popular frontend library today. It allows you to build fast, interactive user interfaces with reusable components.</p>
            
            <h3>Course Syllabus</h3>
            <p>In this vernacular course, we break down complex topics into simple Tamil explanations:</p>
            <ul>
                <li>React Basics & Installation (NPM/Yarn)</li>
                <li>JSX & Virtual DOM explained</li>
                <li>Props vs State</li>
                <li>Hooks: useState, useEffect, useContext</li>
                <li>Redux Toolkit for State Management</li>
            </ul>
        `,
        ctaType: "COURSE",
        price: "₹1,499"
    },
    "priya-zoho-success": {
        _id: '3',
        title: "Success Story: How Priya Cracked a 12 LPA Package at Zoho",
        category: "Student Success",
        author: "Prolync Editorial",
        readTime: 5,
        createdAt: new Date().toISOString(),
        coverImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80",
        content: `
            <p class="lead">From a Tier-3 college student to a Software Developer at Zoho. This is Priya's inspiring journey.</p>
            
            <h3>The Beginning</h3>
            <p>Priya started with zero coding knowledge. She joined our "Zero to Hero" bootcamp in 2024. Consistently solving 3 problems a day on LeetCode changed her trajectory.</p>
            
            <h3>The Struggle</h3>
            <p>"I failed 10+ interviews. I was rejected by service-based companies for aptitude scores. But Prolync's mentors told me to focus on my Logic Building," says Priya.</p>
            
            <h3>The Result</h3>
            <p>After 6 months of intense preparation, she cracked the Zoho interview in the fitst round of off-campus drive.</p>
        `,
        ctaType: "GENERAL"
    },
    "system-design-basics": {
        _id: '4',
        title: "System Design for Beginners: Scaling to 1 Million Users",
        category: "Workshop",
        author: "Sathish (CTO)",
        readTime: 15,
        createdAt: new Date().toISOString(),
        coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
        content: `
            <h2>What is System Design?</h2>
            <p>It is the process of defining the architecture, interfaces, and data for a system to satisfy specified requirements.</p>

            <h3>Key Concepts for this Workshop</h3>
            <ul>
                <li><strong>Vertical vs Horizontal Scaling:</strong> Adding power vs adding machines.</li>
                <li><strong>Load Balancers:</strong> NGINX, HAProxy.</li>
                <li><strong>Caching:</strong> Redis, Memcached.</li>
                <li><strong>Database Sharding:</strong> Splitting data across multiple machines.</li>
            </ul>
        `,
        ctaType: "WORKSHOP",
        date: "Dec 20, 2025"
    }
};

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Minimum loading time for smoothness (800ms) + API Timeout (1.5s)
        const minLoadTime = new Promise(resolve => setTimeout(resolve, 800));
        
        let data = null; 
        try {
            // Race: API Call vs 2s Timeout
            const apiCall = getBlogBySlug(slug);
            const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 1500));
            
            data = await Promise.race([apiCall, timeout]);
        } catch(e) { 
            console.warn("Using mock data due to API delay/error");
        }

        // Wait for minimum load time to finish (prevents flicker)
        await minLoadTime;

        // Fallback to Mock Data
        if (!data || !data.title) {
            data = MOCK_ARTICLES[slug] || MOCK_ARTICLES['java-interview-mastery'];
        }
        
        setBlog(data);
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

  if (!blog) return null;

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">

      {/* Hero Header */}
      <div className="relative h-[60vh] min-h-[400px]">
        <div className="absolute inset-0 bg-gray-900">
             <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover opacity-40 mix-blend-overlay" />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 h-full relative z-10 flex flex-col justify-end pb-12">
            <Link to="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-6 w-fit transition-colors font-medium">
                <ChevronLeft className="w-5 h-5 mr-1" /> Back to Articles
            </Link>
            
            <div className="max-w-4xl">
                <span className="inline-block px-4 py-1.5 rounded-full bg-purple-600 text-white text-sm font-bold tracking-wide mb-6 shadow-lg shadow-purple-600/30">
                    {blog.category}
                </span>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight">
                    {blog.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-gray-300 text-sm md:text-base font-medium">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold">
                            {blog.author?.[0] || 'A'}
                        </div>
                        <span className="text-white">{blog.author}</span>
                    </div>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                    <div className="flex items-center gap-2">
                        <Calendar size={18} />
                        <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                    <div className="flex items-center gap-2">
                         <Clock size={18} />
                         <span>{blog.readTime} min read</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Main Content */}
          <article className="lg:w-2/3">
             <div className="prose prose-lg prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-purple-600 max-w-none">
                 {/*  Render HTML Content */}
                 <div dangerouslySetInnerHTML={{ __html: blog.content }} />
             </div>
             {/* Share Section */}
             <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-between">
                 <h4 className="font-bold text-gray-900">Share this article</h4>
                 <div className="flex gap-4">
                     <button className="p-3 bg-gray-50 rounded-full hover:bg-blue-50 hover:text-blue-600 transition"><Facebook size={20} /></button>
                     <button className="p-3 bg-gray-50 rounded-full hover:bg-sky-50 hover:text-sky-500 transition"><Twitter size={20} /></button>
                     <button className="p-3 bg-gray-50 rounded-full hover:bg-blue-50 hover:text-blue-700 transition"><Linkedin size={20} /></button>
                 </div>
             </div>
          </article>

          {/* Dynamic Sidebar CTA */}
          <aside className="lg:w-1/3">
             <div className="sticky top-24 space-y-8">
                
                {/* 1. Logic for Course/Workshop CTA */}
                {(blog.ctaType === 'COURSE' || blog.category.includes('Course')) && (
                    <div className="bg-gradient-to-br from-indigo-900 to-purple-800 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                        <div className="relative z-10">
                            <span className="text-xs font-bold uppercase tracking-wider text-purple-200">Featured Course</span>
                            <h3 className="text-2xl font-bold mt-2 mb-4">Master this Subject</h3>
                            <p className="text-purple-100 mb-6 text-sm leading-relaxed">
                                Get comprehensive training with certificate, live mentorship, and placement support.
                            </p>
                            <div className="flex items-baseline gap-2 mb-6">
                                <span className="text-3xl font-bold">{blog.price || "₹499"}</span>
                                <span className="text-purple-300 line-through text-sm">₹2999</span>
                            </div>
                            <Link to="/courses" className="block w-full py-4 bg-[#FFD600] text-black font-bold text-center rounded-xl hover:bg-[#FFC000] transition-colors shadow-lg">
                                Enroll Now
                            </Link>
                        </div>
                        {/* Blob */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
                    </div>
                )}

                {(blog.ctaType === 'WORKSHOP' || blog.category === 'Workshop') && (
                    <div className="bg-black text-white rounded-3xl p-8 shadow-2xl">
                         <div className="flex items-center gap-3 mb-4 text-[#FFD600]">
                            <Video size={24} />
                            <span className="font-bold uppercase tracking-widest text-sm">Live Workshop</span>
                         </div>
                         <h3 className="text-2xl font-bold mb-4">Join the Live Session</h3>
                         <p className="text-gray-400 mb-6 text-sm">
                            Real-time interactive session with Q&A. Limited seats available.
                         </p>
                         <div className="flex items-center gap-2 mb-6 text-sm font-medium">
                            <Calendar size={18} className="text-gray-500" />
                            <span>{blog.date || "Next Saturday, 10 AM"}</span>
                         </div>
                         <button className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors">
                            Register for Workshop
                         </button>
                    </div>
                )}

                {/* Newsletter */}
                <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Subscribe for Updates</h3>
                    <p className="text-gray-500 text-sm mb-4">Get the latest tech news and tutorials directly to your inbox.</p>
                    <input type="email" placeholder="Enter your email" className="w-full px-4 py-3 rounded-xl border border-gray-200 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    <button className="w-full py-3 bg-purple-600 text-white font-bold rounded-xl text-sm hover:bg-purple-700 transition">
                        Subscribe
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
