import React, {useEffect, useState} from "react"
import logoImage from '../assets/images/logo-image.png';
import locationPinIcon from '../assets/icons/location-pin-footer.png';
import contactIcon from '../assets/icons/contact-icon-footer.png';
import emailIcon from '../assets/icons/email-icon-footer.png';

const Footer = () => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours(); 
    const day = now.getDay();     

    if (day >= 0 && day <= 4) {  
      setOpen(hours >= 11 && hours <= 22);
    } else {
      setOpen(hours >= 12 && hours <= 23);
    }
  }, []);
  const styles = {
    color: open ? "pistachio" : "red"
  }
  return (
    <footer className="bg-brand-light dark:bg-feedback-dark text-dark-font dark:text-gray-300">
      {/* Top row: 5 columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {/* Logo */}
        <div className="flex flex-col items-start space-y-1">
          <img src={logoImage} alt="Pistachio Logo" className="h-32 md:h-40 lg:h-44 xl:h-48"/>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="#home" className="hover:text-pistachio transition">Home</a></li>
            <li><a href="#menu-taste" className="hover:text-pistachio transition">Menu</a></li>
            <li><a href="#story" className="hover:text-pistachio transition">Our Story</a></li>
            <li><a href="#feedback" className="hover:text-pistachio transition">Feedback</a></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h4 className="font-semibold mb-2">Contact Us</h4>
          <ul className="space-y-1 text-sm">
            <li className="flex items-center gap-2">
              <img src={locationPinIcon} className="h-4 w-4" alt="Location"/>
              14 Riversdale Drive, Nairobi
            </li>
            <li className="flex items-center gap-2">
              <img src={contactIcon} className="h-4 w-4" alt="Phone"/>
              +254 712 345678
            </li>
            <li className="flex items-center gap-2">
              <img src={emailIcon} className="h-4 w-4" alt="Email"/>
              info@pistachio.com
            </li>
          </ul>
        </div>

        {/* Opening Hours */}
        <div>
          <h4 className="font-semibold mb-2">
            <div>
              <h2 style = {styles}>{open ? 'We are OPEN!' : 'Sorry, we are CLOSED.'}</h2>
            </div>
          </h4>
          <ul className="space-y-1 text-sm">
            <li>Mon–Fri: 11:00 AM – 10:00 PM</li>
            <li>Sat–Sun: 12:00 PM – 11:00 PM</li>
          </ul>
        </div>

        {/* Map */}
        <div>
          <h4 className="font-semibold mb-2">Location</h4>
          <div className="w-full h-32 rounded overflow-hidden">
            <iframe
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.82664530064!2d36.78229861475459!3d-1.2777174990666904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10b7b1b3b1b1%3A0x6d8f1e5a7b7e5a7b!2s14%20Riversdale%20Dr%2C%20Nairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1678901234567!5m2!1sen!2sus"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Location"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Disclaimer + social */}
      <div className="border-t border-gray-200 dark:border-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col md:flex-row items-center justify-center text-sm text-medium-gray-text dark:text-gray-400">
          <p>
            Disclaimer: This is a student project. All images and brand references belong to Pistachio by Masala Twist.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;