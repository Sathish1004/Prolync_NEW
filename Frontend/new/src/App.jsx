import React, { useState } from 'react';
import TopBanner from './Components/TopBanner';
import Header from './Components/Header';
import HeroCarousel from './Components/HeroCarousel';
import Chatbot from './Components/Chatbot';
import AuthModal from './Components/AuthModal';
import CourseCatalog from './Components/CourseCatalog';
import TrendingCourses from './Components/TrendingCourses';
import Workshops from './Components/Workshops';
import ScrollBackground from './Components/ScrollBackground';

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');

  const handleNavigate = (view) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900 relative">
      <ScrollBackground />
      
      {/* Content Wrapper ensures it sits above the fixed background */}
      <div className="relative z-10 flex flex-col min-h-screen">
          <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
          
          <TopBanner />
          <Header onOpenAuth={() => setIsAuthOpen(true)} onNavigate={handleNavigate} currentView={currentView} />
          
          <main className="flex-grow">
        {currentView === 'home' ? (
          <>
            <HeroCarousel />
            <TrendingCourses onNavigate={handleNavigate} />
            <Workshops />
          </>
        ) : (
          <CourseCatalog />
        )}
      </main>


      <Chatbot />
      
      <footer className="bg-gray-900 text-white py-8 mt-auto">
          <div className="container mx-auto px-4 text-center text-gray-400">
              {/* <p>&copy; 2024 Prolync. All rights reserved.</p> */}
          </div>
      </footer>
      </div>
    </div>
  );
}

export default App;
