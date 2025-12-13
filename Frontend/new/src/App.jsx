import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import TopBanner from './Components/TopBanner';
import Header from './Components/Header';
import HeroCarousel from './Components/HeroCarousel';
import Chatbot from './Components/Chatbot';
import AuthModal from './Components/AuthModal';
import TrendingCourses from './Components/TrendingCourses';
import Workshops from './Components/Workshops';
import ScrollBackground from './Components/ScrollBackground';
import VerifyEmail from './Components/VerifyEmail';
import CourseList from './Components/CourseList';
import CourseDetails from './Components/CourseDetails';
import CommunityEcosystem from './Components/CommunityEcosystem';
import CommunityFeatures from './Components/CommunityFeatures';
import LogoMarquee from './Components/LogoMarquee';
import TestimonialSection from './Components/TestimonialSection';
import BoldTypographyBanner from './Components/BoldTypographyBanner';
import Footer from './Components/Footer';
import BlogPage from './pages/BlogPage';
import BlogDetail from './pages/BlogDetail';

import UserDashboard from './Components/UserDashboard';
import AdminDashboard from './Components/AdminDashboard';
import LecturerDashboard from './Components/LecturerDashboard';

// Protected Route Wrapper
const ProtectedRoute = ({ children, role }) => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token || !user) {
        return <Navigate to="/" replace />;
    }

    if (role && user.role !== role) {
        return <Navigate to="/" replace />;
    }

    return children;
};

// Layout for Public Pages (Home, Courses, Blog)
const PublicLayout = ({ children, setIsAuthOpen, isAuthenticated }) => {
    return (
        <div className="bg-white min-h-screen font-sans text-gray-900 relative flex flex-col">
             <ScrollBackground />
             <div className="relative z-10 flex flex-col min-h-screen">
                <TopBanner />
                <Header 
                    onOpenAuth={() => setIsAuthOpen(true)} 
                    isAuthenticated={isAuthenticated}
                    // onNavigate unused now, handled by Links
                />
                <main className="flex-grow">
                    {children}
                </main>
                <Chatbot />
                <Footer />
             </div>
        </div>
    );
};

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsAuthenticated(true);
  }, []);

  return (
    <>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={
            <PublicLayout setIsAuthOpen={setIsAuthOpen} isAuthenticated={isAuthenticated}>
                <HeroCarousel />
                <div id="trending"><TrendingCourses /></div>
                <div id="workshops"><Workshops /></div>
                <CommunityEcosystem />
                <LogoMarquee />
                <CommunityFeatures />
                <TestimonialSection />
                <BoldTypographyBanner />
            </PublicLayout>
        } />
        
        {/* Course Pages */}
        <Route path="/courses" element={
             <PublicLayout setIsAuthOpen={setIsAuthOpen} isAuthenticated={isAuthenticated}>
                <CourseList />
             </PublicLayout>
        } />
        
        <Route path="/course/:id" element={
            <PublicLayout setIsAuthOpen={setIsAuthOpen} isAuthenticated={isAuthenticated}>
               <CourseDetails />
            </PublicLayout>
        } />
        
        {/* Blog Page */}
        <Route path="/blog" element={
             <PublicLayout setIsAuthOpen={setIsAuthOpen} isAuthenticated={isAuthenticated}>
                <BlogPage />
             </PublicLayout>
        } />
        
        <Route path="/blog/:slug" element={
             <PublicLayout setIsAuthOpen={setIsAuthOpen} isAuthenticated={isAuthenticated}>
                <BlogDetail />
             </PublicLayout>
        } />

        {/* Verification */}
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Dashboards - Standalone Layouts */}
        <Route path="/dashboard" element={
            <ProtectedRoute>
                <UserDashboard />
            </ProtectedRoute>
        } />
        
        <Route path="/admin-dashboard" element={
            <ProtectedRoute role="admin">
                <AdminDashboard />
            </ProtectedRoute>
        } />
        
        <Route path="/lecturer-dashboard" element={
            <ProtectedRoute role="lecturer">
                <LecturerDashboard />
            </ProtectedRoute>
        } />

        {/* Redirect Legacy or Unknown */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
