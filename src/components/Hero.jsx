import React, { useState, useEffect } from 'react';
import HeroImg1 from '../assets/images/Hero-img-1.webp';
import HeroImg2 from '../assets/images/hero-img-2.webp';
import HeroImg3 from '../assets/images/hero-img-3.webp';
import HeroImg4 from '../assets/images/hero-img-4.webp';

const heroImages = [HeroImg1, HeroImg2, HeroImg3, HeroImg4];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden pt-16 dark:bg-navbar-dark">
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`hero-slide absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={image} className="w-full h-full object-cover" alt={`Slide ${index + 1}`}/>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-6">
        <h1 className="flex items-baseline font-serif text-white mb-4 text-5xl md:text-6xl">
          <span className="text-pistachio">Pistachio</span>
          <span className="ml-4 text-xl md:text-2xl font-normal text-pistachio">by Masala Twist</span>
        </h1>
        <p className="text-white text-lg md:text-xl max-w-2xl mb-6">
          A refined fusion of Indian and Middle Eastern flavours.
        </p>
        <a href="#story" className="inline-block bg-pistachio hover:bg-pistachio/90 text-white px-8 py-3 rounded-full font-medium transition">
          Explore Our Brand
        </a>
      </div>
      <div className="absolute bottom-6 w-full flex justify-center space-x-2 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`hero-dot w-3 h-3 rounded-full bg-white transition-opacity duration-300 ${
              index === currentSlide ? 'opacity-100' : 'opacity-50'
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default Hero;