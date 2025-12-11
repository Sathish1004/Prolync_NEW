import React, { useState, useRef } from 'react';
import TopBanner from './Components/TopBanner';
import Header from './Components/Header';
import HeroCarousel from './Components/HeroCarousel';
import Chatbot from './Components/Chatbot';
import AuthModal from './Components/AuthModal';
import TrendingCourses from './Components/TrendingCourses';
import Workshops from './Components/Workshops';
import ScrollBackground from './Components/ScrollBackground';
import VerifyEmail from './Components/VerifyEmail';
import CourseCatalog from './Components/CourseCatalog';
import CommunityEcosystem from './Components/CommunityEcosystem';
import CommunityFeatures from './Components/CommunityFeatures';
import CertificationSection from './Components/CertificationSection';
import BlogPage from './Components/BlogPage';

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  
  // Ref and State for Workshops Scroll & Highlight
  const workshopsRef = useRef(null);
  const [highlightWorkshops, setHighlightWorkshops] = useState(false);

  const handleNavigate = (view) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const scrollToWorkshops = () => {
    if (currentView !== 'home') {
        setCurrentView('home');
        // Allow time for render if switching views
        setTimeout(() => {
            if(workshopsRef.current) {
                workshopsRef.current.scrollIntoView({ behavior: 'smooth' });
                triggerHighlight();
            }
        }, 100);
    } else {
        if(workshopsRef.current) {
            workshopsRef.current.scrollIntoView({ behavior: 'smooth' });
            triggerHighlight();
        }
    }
  };

  const triggerHighlight = () => {
      // Small delay to allow scroll to start/finish
      setTimeout(() => {
          setHighlightWorkshops(true);
          // Remove highlight after 2 seconds
          setTimeout(() => setHighlightWorkshops(false), 2000);
      }, 500);
  };

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900 relative">
      <ScrollBackground />
      
      {/* Content Wrapper ensures it sits above the fixed background */}
      <div className="relative z-10 flex flex-col min-h-screen">
          <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
          
          {window.location.pathname === '/verify-email' ? (
              <VerifyEmail />
          ) : (
          <>
          <TopBanner />
          <Header 
            onOpenAuth={() => setIsAuthOpen(true)} 
            onNavigate={handleNavigate} 
            currentView={currentView} 
            onScrollToWorkshops={scrollToWorkshops}
          />
          
          <main className="flex-grow">
        {currentView === 'blog' ? (
          <BlogPage onNavigate={handleNavigate} />
        ) : currentView === 'browse_courses' ? (
          <CourseCatalog />
        ) : (
          <>
            <HeroCarousel />
            <TrendingCourses onNavigate={handleNavigate} />
            <Workshops sectionRef={workshopsRef} highlight={highlightWorkshops} />
            <CommunityEcosystem />
            <CommunityFeatures />
            {/* Certification Section */}
            <CertificationSection />
          </>
        )} : (
          <CourseCatalog />
        )}
      </main>


      <Chatbot />
      
      <footer className="bg-gray-900 text-white py-8 mt-auto">
          <div className="container mx-auto px-4 text-center text-gray-400">
              {/* <p>&copy; 2024 Prolync. All rights reserved.</p> */}
          </div>
      </footer>
      </>
      )}
      </div>
    </div>
  );
}

export default App;
