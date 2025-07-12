import React from 'react';
import logoImage from '../assets/images/logo-image.png';
import dropdownIcon from '../assets/icons/dropdown-icon.png';
import darkModeIcon from '../assets/icons/dark-mode-icon.png';
import lightModeIcon from '../assets/icons/light-mode-icon.png'; // Assuming you have a light mode icon
import hamburgerIcon from '../assets/icons/hamburger-icon-menu.png';

export default function Navbar(props){
  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-brand-light dark:bg-navbar-dark shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-4 py-2">
        {/* Logo */}
        <a href="#home" className="flex items-center">
          <img src={logoImage} alt="Pistachio logo" className="h-16 w-16 md:h-20 md:w-20"/>
        </a>

        {/* Desktop menu + theme-toggle */}
        <div className="flex-1 flex justify-center">
          <ul className="hidden md:flex items-center space-x-8 text-dark-font dark:text-white">
            <li><a href="#home" className="hover:text-pistachio transition">Home</a></li>
            <li className="relative group">
              <button className="flex items-center hover:text-pistachio transition">
                Menu <img src={dropdownIcon} className="ml-1 h-3" alt="⌄"/>
              </button>
              <ul className="absolute left-0 mt-2 w-44 rounded bg-white dark:bg-navbar-dark shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <li><a href="#starter" className="block px-4 py-2 hover:text-pistachio">Starters</a></li>
                <li><a href="#main-courses" className="block px-4 py-2 hover:text-pistachio">Mains</a></li>
                <li><a href="#sides" className="block px-4 py-2 hover:text-pistachio">Sides</a></li>
                <li><a href="#desserts" className="block px-4 py-2 hover:text-pistachio">Desserts</a></li>
              </ul>
            </li>
            <li><a href="#story" className="hover:text-pistachio transition">Our Story</a></li>
            <li><a href="#feedback" className="hover:text-pistachio transition">Feedback</a></li>
          </ul>
        </div>

        <div className="md:flex items-center space-x-2 hidden">
          <button id="theme-toggle" onClick={props.toggleTheme} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition">
            <img src={props.isDarkMode ? lightModeIcon : darkModeIcon} className="h-5 w-5" alt="Toggle theme"/>
          </button>
        </div>

        {/* Mobile theme + menu button */}
        <div className="md:hidden flex items-center space-x-2">
          <button id="theme-toggle-mobile" onClick={props.toggleTheme} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition">
            <img src={props.isDarkMode ? lightModeIcon : darkModeIcon} className="h-5 w-5" alt="Toggle theme"/>
          </button>
          <button id="mobile-menu-button" onClick={props.toggleMobileMenu} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition">
            <img src={hamburgerIcon} className="h-6 w-6" alt="Open menu"/>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div id="mobile-menu" className={`${props.isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-brand-light dark:bg-navbar-dark`}>
        <ul className="space-y-2 px-4 py-6 text-dark-font dark:text-white">
          <li><a href="#home" onClick={props.toggleMobileMenu} className="block hover:text-pistachio">Home</a></li>
          <li><a href="#starter" onClick={props.toggleMobileMenu} className="block hover:text-pistachio">Starters</a></li>
          <li><a href="#main-courses" onClick={props.toggleMobileMenu} className="block hover:text-pistachio">Main Courses</a></li>
          <li><a href="#sides" onClick={props.toggleMobileMenu} className="block hover:text-pistachio">Sides</a></li>
          <li><a href="#desserts" onClick={props.toggleMobileMenu} className="block hover:text-pistachio">Desserts</a></li>
          <li><a href="#story" onClick={props.toggleMobileMenu} className="block hover:text-pistachio">Our Story</a></li>
          <li><a href="#feedback" onClick={props.toggleMobileMenu} className="block hover:text-pistachio">Feedback</a></li>
        </ul>
      </div>
    </nav>
  );
};

