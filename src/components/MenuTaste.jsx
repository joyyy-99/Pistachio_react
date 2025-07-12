import React from 'react';
import menuSectionIcon from '../assets/icons/menu-section.png';
import mainCourseImg from '../assets/images/Menu-preview/main-course.jpg';
import starterImg from '../assets/images/Menu-preview/starter-img.jpg';
import sidesImg from '../assets/images/Menu-preview/sides.jpg';
import dessertImg from '../assets/images/Menu-preview/dessert.jpg';

const MenuTaste = () => {
  return (
    <section id="menu-taste" className="py-16 bg-white dark:bg-navbar-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 text-center">
          <img src={menuSectionIcon} alt="Menu Icon" className="h-6 mx-auto mb-2"/>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-dark-font dark:text-white">
            A Taste of <span className="text-pistachio">Pistachio</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Main Course (large) */}
          <div className="relative group overflow-hidden rounded-lg shadow-lg">
            <img
              src={mainCourseImg}
              alt="Main Course"
              className="w-full h-[600px] object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              className="absolute bottom-4 left-4 bg-white/70 backdrop-blur-sm p-4 rounded-lg max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <h3 className="text-lg font-semibold font-serif text-dark-font mb-1">Main-Course</h3>
              <p className="text-sm italic text-dark-font mb-1">
                “Our hearty mains are crafted with rich, authentic flavors - offering both vegetarian and non-vegetarian options, from classic paneer curries to grilled meats and biryanis”
              </p>
              <p className="text-xs text-gray-700">Dish shown: Paneer Tikka Masala</p>
            </div>
          </div>

          {/* Starter + Sides (stacked) */}
          <div className="space-y-8">
            {/* Starter */}
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img
                src={starterImg}
                alt="Starter"
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute bottom-4 left-4 bg-white/70 backdrop-blur-sm p-3 rounded-lg max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <h3 className="text-base font-semibold text-dark-font mb-1">Starter</h3>
                <p className="text-xs italic text-dark-font mb-1">
                  “Begin your journey with light, flavorful starters - from crispy vegetarian bites to spicy kebabs and Middle Eastern mezze.”
                </p>
                <p className="text-2xs text-gray-700">Dish shown: Seekh Kebabs</p>
              </div>
            </div>

            {/* Sides */}
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img
                src={sidesImg}
                alt="Sides"
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute bottom-4 left-4 bg-white/70 backdrop-blur-sm p-3 rounded-lg max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <h3 className="text-base font-semibold text-dark-font mb-1">Sides</h3>
                <p className="text-xs italic text-dark-font mb-1">
                  “Complete your meal with fresh-baked breads, seasoned rice and savory accompaniments to pair perfectly with every main.”
                </p>
                <p className="text-2xs text-gray-700">Dish shown: Garlic Naan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dessert (full width) */}
        <div className="relative group mt-12 overflow-hidden rounded-lg shadow-lg">
          <img
            src={dessertImg}
            alt="Dessert"
            className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            className="absolute bottom-6 left-6 bg-white/70 backdrop-blur-sm p-5 rounded-lg max-w-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <h3 className="text-xl font-semibold text-dark-font mb-1">Desserts</h3>
            <p className="italic text-sm text-dark-font mb-1">
              “A sweet ending awaits with indulgent Indian and Middle Eastern treats - rich kulfi, delicate pastries and fusion flavors you will remember.”
            </p>
            <p className="text-xs text-gray-700">Dish shown: Pistachio Kulfi & Cream</p>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-block bg-pistachio hover:bg-pistachio/90 text-white font-medium px-8 py-3 rounded-full transition"
          >
            View The Full Menu →
          </a>
        </div>
      </div>
    </section>
  );
};

export default MenuTaste;