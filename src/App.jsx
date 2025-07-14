import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuTaste from './components/MenuTaste';
import OurStory from './components/OurStory';
import SignatureDishes from './components/SignatureDishes';
import Reservation from './components/Reservation';
import ChatbotToggle from './components/ChatbotToggle';
import ChatbotUI from './components/ChatbotUI';
import Footer from './components/Footer';
import Feedback from './components/Feedback';
import Reviews from './components/Reviews';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  useEffect(() => {
    // Check if we're in a browser environment and localStorage is available
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
          setIsDarkMode(true);
          document.documentElement.classList.add('dark');
        } else {
          setIsDarkMode(false);
          document.documentElement.classList.remove('dark');
        }
      } catch (error) {
        console.warn('localStorage not available:', error);
        // Fallback to system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(prefersDark);
        if (prefersDark) {
          document.documentElement.classList.add('dark');
        }
      }
    }
  }, []);

  const toggleTheme = () => {
    console.log('Theme toggle clicked, current isDarkMode:', isDarkMode); // Debug log
    
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      console.log('New theme mode:', newMode ? 'dark' : 'light'); // Debug log
      
      // Update document class
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      // Try to save to localStorage if available
      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          localStorage.setItem('theme', newMode ? 'dark' : 'light');
        } catch (error) {
          console.warn('Could not save theme to localStorage:', error);
        }
      }
      
      return newMode;
    });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prevState => !prevState);
  };

  const toggleChatbot = () => {
    setIsChatbotOpen(prevState => !prevState);
  };

  return (
    <div className="bg-white text-gray-900 dark:bg-navbar-dark dark:text-white">
      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
      />
      <Hero />
      <MenuTaste />
      <Reservation />
      <OurStory />
      <SignatureDishes />
      <Reviews />
      <Feedback />
      <ChatbotToggle toggleChatbot={toggleChatbot} />
      <ChatbotUI isChatbotOpen={isChatbotOpen} toggleChatbot={toggleChatbot} />
      <Footer />
    </div>
  );
}

export default App;