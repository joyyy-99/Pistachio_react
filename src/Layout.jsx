import {Outlet, useLocation} from "react-router-dom";
import {useEffect, useState} from "react"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatbotToggle from './components/ChatbotToggle';
import ChatbotUI from './components/ChatbotUI';
import DishesSection from "./components/dishesSection";

export default function Layout(){
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(prevState => !prevState);
  };
  const location = useLocation();
  return(
    <>
      <Navbar
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
          />
      <main>
        {location.pathname !== '/' && <DishesSection/>}
        <Outlet/>
        <ChatbotToggle toggleChatbot={toggleChatbot} />
        <ChatbotUI isChatbotOpen={isChatbotOpen} toggleChatbot={toggleChatbot} />
      </main>
      <Footer/>
    </>
  )
}