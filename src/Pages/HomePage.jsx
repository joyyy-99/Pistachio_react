import Hero from '../components/Hero';
import MenuTaste from '../components/MenuTaste';
import OurStory from '../components/OurStory';
import SignatureDishes from '../components/SignatureDishes';
import Reservation from '../components/Reservation';

import Feedback from '../components/Feedback';
import Reviews from '../components/Reviews';

function HomePage() {
  
  return (
    <div className="bg-white text-gray-900 dark:bg-navbar-dark dark:text-white">
      <Hero />
      <MenuTaste />
      <Reservation />
      <OurStory />
      <SignatureDishes />
      <Reviews />
      <Feedback />
      
    </div>
  );
}

export default HomePage;