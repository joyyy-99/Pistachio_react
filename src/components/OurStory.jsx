import React from 'react';
import storySectionIcon from '../assets/icons/story-section.png';
import storySectionImg from '../assets/images/Story-section-img.png';
import freshnessIcon from '../assets/icons/freshness-icon.png';
import cultureIcon from '../assets/icons/Culture-icon.png';
import experienceIcon from '../assets/icons/experience-icon.png';

const OurStory = () => {
  return (
    <section id="story" className="py-16 bg-brand-light dark:bg-feedback-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-8 flex items-center space-x-2">
          <img src={storySectionIcon} alt="Story Icon" className="h-6"/>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-dark-font dark:text-white">
            Our <span className="text-pistachio">Story</span>
          </h2>
        </div>
        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* IMAGE COLUMN */}
          <div className="flex justify-center lg:justify-start lg:order-1 order-2">
            <img
              src={storySectionImg}
              alt="Serving food"
              className="w-full max-w-md rounded-lg shadow-lg object-cover"
            />
          </div>
          {/* TEXT COLUMN */}
          <div className="lg:order-2 order-1">
            <p className="text-lg text-dark-font dark:text-gray-300 mb-4">
                At <span className="text-pistachio font-semibold">Pistachio by Masala Twist</span>, food is more than a flavor – it's a feeling.
            </p>

            <p className="text-medium-gray-text dark:text-gray-400 mb-4">
              Founded by the team behind the beloved Masala Twist, Pistachio brings a modern approach to traditional Indian and Middle Eastern cuisine. Our space was designed to feel warm yet refined, where every dish tells a story rooted in culture, spice, and soul.
            </p>
            <p className="text-medium-gray-text dark:text-gray-400 mb-8">
              From slow-cooked curries to smoky grilled meats and fresh vegetarian thalis, our kitchen blends authenticity with a contemporary touch — crafted for those who appreciate thoughtful dining.
            </p>

            <h3 className="text-xl font-semibold text-dark-font dark:text-white mb-4">Core Values:</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <img src={freshnessIcon} alt="Freshness" className="h-6 w-6 mt-1"/>
                <p>
                  <strong className="text-pistachio">Freshness</strong> – Ingredients sourced daily, prepared with care
                </p>
              </li>
              <li className="flex items-start gap-3">
                <img src={cultureIcon} alt="Culture" className="h-6 w-6 mt-1"/>
                <p>
                  <strong className="text-pistachio">Culture</strong> – Flavors inspired by heritage, served with heart
                </p>
              </li>
              <li className="flex items-start gap-3">
                <img src={experienceIcon} alt="Experience" className="h-6 w-6 mt-1"/>
                <p>
                  <strong className="text-pistachio">Experience</strong> – Every plate is part of a larger story
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;