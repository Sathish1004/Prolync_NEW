import React, { useState } from 'react';
import { Menu, X, LogIn, User } from 'lucide-react';

const Header = ({ onOpenAuth, onNavigate, currentView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#' },
    { name: 'Courses', href: '#' },
    { name: 'Workshop', href: '#' },
    { name: 'Blog', href: '#' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
             <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-2">
               P
             </div>
             <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-blue-600">
               Prolync
             </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-2">
             <button 
               onClick={() => onNavigate('home')} 
               className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                 currentView === 'home' 
                   ? 'bg-purple-50 text-purple-700 shadow-sm ring-1 ring-purple-100' 
                   : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
               }`}
             >
                Home
             </button>
             <button 
               onClick={() => onNavigate('courses')} 
               className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                 currentView === 'courses' 
                   ? 'bg-purple-50 text-purple-700 shadow-sm ring-1 ring-purple-100' 
                   : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
               }`}
             >
                Courses
             </button>
            {navItems.slice(2).map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-gray-50 rounded-full font-medium transition duration-200"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Login Button (Desktop) */}
          <div className="hidden md:flex items-center">
            <button 
              onClick={onOpenAuth}
              className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 font-medium px-4 py-2 rounded-full border border-gray-200 hover:border-purple-200 hover:bg-purple-50 transition duration-150"
            >
              <User size={18} />
              <span>Login</span>
            </button>
          </div>

          {/* Mobile Menu Button + Login Icon */}
          <div className="flex md:hidden items-center space-x-4">
             <button onClick={onOpenAuth} className="text-gray-700 hover:text-purple-600">
                <User size={24} />
             </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-purple-600 focus:outline-none"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
              >
                {item.name}
              </a>
            ))}
            <button
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenAuth();
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-purple-600 hover:bg-purple-50 font-semibold"
            >
              Login / Register
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
