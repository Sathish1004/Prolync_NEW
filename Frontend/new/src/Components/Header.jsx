import React, { useState } from 'react';
import { Menu, X, LogIn, User, Bell, LogOut } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';

const Header = ({ onOpenAuth, onScrollToWorkshops, isAuthenticated }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const { notificationCount } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    // ... existing effect
    const user = JSON.parse(localStorage.getItem('user'));
    if(user) setUserRole(user.role);
  }, [isAuthenticated]);
  
  // ... existing handler and navItems
  const handleScroll = (id) => {
      if (location.pathname !== '/') {
          navigate('/');
          setTimeout(() => {
              const element = document.getElementById(id);
              if (element) element.scrollIntoView({ behavior: 'smooth' });
          }, 300);
      } else {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'Workshop', action: () => handleScroll('workshops') },
    { name: "Blog", path: '/blog' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-10xl flex justify-between items-center h-full">
        <div className="flex justify-between items-center h-20 w-full">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center cursor-pointer">
             <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-2">
               P
             </div>
             <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-blue-600">
               Prolync
             </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-12 ml-auto mr-16">
             {navItems.map((item) => (
               item.path ? (
                 <Link 
                   key={item.name} 
                   to={item.path} 
                   className={`text-[15px] font-medium transition duration-200 ${location.pathname === item.path ? 'text-purple-700 font-bold' : 'text-gray-600 hover:text-purple-600'}`}
                 >
                   {item.name}
                 </Link>
               ) : (
                 <button
                   key={item.name}
                   onClick={item.action}
                   className="text-[15px] font-medium text-gray-600 hover:text-purple-600 transition duration-200"
                 >
                   {item.name}
                 </button>
               )
             ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Notification Bell */}
             <button className="relative p-2 text-gray-600 hover:text-purple-600 transition-colors">
                <Bell size={22} />
                {notificationCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full min-w-[18px]">
                        {notificationCount}
                    </span>
                )}
             </button>

            {isAuthenticated ? (
                // ... existing authenticated UI

                <>
                    <Link 
                    to={userRole === 'admin' ? '/admin-dashboard' : userRole === 'lecturer' ? '/lecturer-dashboard' : '/dashboard'}
                    className="flex items-center space-x-2 text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg hover:shadow-purple-500/30 font-medium px-6 py-2.5 rounded-full transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                    <User size={18} />
                    <span>Dashboard</span>
                    </Link>
                    
                    <button 
                        onClick={() => {
                            if(onLogout) onLogout();
                            else {
                                localStorage.removeItem('token');
                                localStorage.removeItem('user');
                                window.location.reload();
                            }
                        }}
                        className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors"
                        title="Logout"
                    >
                        <LogOut size={20} />
                    </button>
                </>
            ) : (
                <Link 
                  to="/login"
                  className="flex items-center gap-2 text-gray-700 hover:text-purple-600 font-medium px-6 py-2 rounded-full border border-gray-200 hover:border-purple-200 hover:bg-purple-50 transition duration-150"
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
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
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg h-screen px-6 py-6">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
               item.path ? (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium text-gray-700 py-2 border-b border-gray-50"
                >
                  {item.name}
                </Link>
               ) : (
                <button
                  key={item.name}
                  onClick={() => {
                    item.action();
                    setIsMenuOpen(false);
                  }}
                  className="text-left text-lg font-medium text-gray-700 py-2 border-b border-gray-50"
                >
                  {item.name}
                </button>
               )
            ))}
             <div className="mt-4 pt-4">
                {isAuthenticated ? (
                    <>
                        <Link
                            to={userRole === 'admin' ? '/admin-dashboard' : userRole === 'lecturer' ? '/lecturer-dashboard' : '/dashboard'}
                            onClick={() => setIsMenuOpen(false)}
                            className="flex w-full items-center justify-center gap-2 bg-purple-600 text-white py-3 rounded-xl font-bold"
                        >
                        Dashboard
                        </Link>
                        <button
                            onClick={() => {
                                if(onLogout) onLogout();
                                setIsMenuOpen(false);
                            }}
                            className="flex w-full items-center justify-center gap-2 mt-4 border border-red-200 text-red-600 py-3 rounded-xl font-bold"
                        >
                        Logout
                        </button>
                    </>
                ) : (
                <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex w-full items-center justify-center gap-2 border border-gray-200 text-gray-700 py-3 rounded-xl font-bold"
                >
                    Login / Register
                </Link>
                )}
             </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
