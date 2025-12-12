import React from 'react';
import { Youtube, Instagram, Linkedin, Facebook, MessageCircle, Star, Award } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#0A0A0A] text-[#EDE6D6] py-10 border-t border-white/5 font-sans relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Our Free Courses */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-lg tracking-wide mb-6">Our Free Courses</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              {['Full Stack Development', 'Frontend Development', 'Backend Development', 'Python Programming', 'Java Programming', 'SQL & Databases', 'HTML', 'CSS', 'JavaScript', 'Git & GitHub'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-green-400 transition-all duration-300">
                    {item}
                  </a>
                </li>
              ))}  
            </ul>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-lg tracking-wide mb-6">Quick Links</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              {['Home', 'Courses', 'Workshop', 'Blog', 'About Prolync', 'Join as Student', 'Join as Instructor', 'Contact Us'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-green-400 transition-all duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Prolync Learning Hub (Legal) */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-lg tracking-wide mb-6">Prolync Learning Hub</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              {['Privacy Policy', 'Refund Policy', 'Terms of Use', 'Support & FAQs'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-green-400 transition-all duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Badges & Socials (Right Side) */}
          <div className="space-y-8 lg:pl-8">
            {/* Badges */}
            <div className="flex flex-col gap-4">
              <div className="border border-white/10 rounded-xl p-4 flex items-center gap-4 bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
                <div className="p-2 bg-yellow-500/20 rounded-full text-yellow-500 group-hover:scale-110 transition-transform">
                  <Award size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Featured by</p>
                  <p className="font-bold text-white">Prolync Community</p>
                </div>
              </div>
              
              <div className="border border-white/10 rounded-xl p-4 flex items-center gap-4 bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
                <div className="p-2 bg-blue-500/20 rounded-full text-blue-500 group-hover:scale-110 transition-transform">
                   <FaGoogle size={22} />
                </div>
                <div>
                   <div className="flex text-yellow-400 gap-0.5 mb-1 text-sm">
                     <Star size={14} fill="currentColor" />
                     <Star size={14} fill="currentColor" />
                     <Star size={14} fill="currentColor" />
                     <Star size={14} fill="currentColor" />
                     <Star size={14} fill="currentColor" />
                   </div>
                   <p className="text-xs font-bold text-white">Google Rating (4.9/5)</p>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 pt-4">
               {[
                 { Icon: Youtube, color: "hover:text-red-500" }, 
                 { Icon: Instagram, color: "hover:text-pink-500" }, 
                 { Icon: Linkedin, color: "hover:text-blue-600" }, 
                 { Icon: Facebook, color: "hover:text-blue-500" }
               ].map(({ Icon, color }, i) => (
                 <a key={i} href="#" className={`p-2 bg-white/5 rounded-full text-gray-400 transition-all duration-300 hover:bg-white/10 hover:scale-110 ${color}`}>
                   <Icon size={20} />
                 </a>
               ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © 2025 Prolync Learning Private Limited • <a href="#" className="hover:text-white">Terms</a> • <a href="#" className="hover:text-white">Privacy</a> • <a href="mailto:support@prolync.in" className="hover:text-white">support@prolync.in</a>
          </p>
          

        </div>
      </div>
    </footer>
  );
};

export default Footer;
