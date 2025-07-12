import React from 'react';
import signatureDishesIcon from '../assets/icons/signature-dishes-section.png';
import spicyTagIcon from '../assets/icons/spicy-tag.png';
import veganTagIcon from '../assets/icons/vegan-tag.png';

// Import all signature dish images
import braisedMuttonImg from '../assets/images/signature-dishes/braised-mutton.jpg';
import chilliChickenImg from '../assets/images/signature-dishes/chilli-chicken.jpg';
import prawnsKolapuriImg from '../assets/images/signature-dishes/prawns-kolapuri.jpg';
import fishChilliFryImg from '../assets/images/signature-dishes/fish-chilli-fry.jpg';
import chickenBiryaniImg from '../assets/images/signature-dishes/chicken-biryani.jpg';
import butterChickenMakhaniImg from '../assets/images/signature-dishes/butter-chicken-makhani.jpg';
import macAndCheeseImg from '../assets/images/signature-dishes/mac-and-cheese.jpg';
import chilliGarlicMushroomsImg from '../assets/images/signature-dishes/chilli-garlic-mushrooms.jpg';

const dishes = [
  {
    name: 'Braised Mutton Champ Maple Kokum Glaze',
    image: braisedMuttonImg,
    description: 'Braised goat rack with maple and kokum syrup, kokum plant called \'garcinia indica\' grown in kokan regions of Maharashtra.',
    tags: []
  },
  {
    name: 'Chilli Chicken',
    image: chilliChickenImg,
    description: 'Succulent boneless chicken tossed in spicy semi dry sauce garnished with spring onions.',
    tags: ['spicy']
  },
  {
    name: 'Prawns Kolapuri',
    image: prawnsKolapuriImg,
    description: 'A classic dish of prawns sautéed with inhouse Kolapuri spices.',
    tags: ['spicy']
  },
  {
    name: 'Fish Chilli Fry',
    image: fishChilliFryImg,
    description: 'Red snapper marinated with chinese spices deep-fried tossed with bell pepper, onions and a dash of lemon.',
    tags: ['spicy']
  },
  {
    name: 'Chicken Biryani',
    image: chickenBiryaniImg,
    description: 'The most trending Indian dish across the globe which is proud of Indian cuisine! Boneless chicken cooked in tandoor served with rich makhani gravy dusted off with dehydrated fenugreek.',
    tags: []
  },
  {
    name: 'Butter Chicken Makhani',
    image: butterChickenMakhaniImg,
    description: 'Tandoor chicken in rich makhani gravy.',
    tags: []
  },
  {
    name: 'Mac & Cheese Arancini',
    image: macAndCheeseImg,
    description: 'Macaroni and Cheese made in arancini dumpling served with tomato salsa-our humble take on Italian arancini',
    tags: []
  },
  {
    name: 'Chilli Garlic Button Mushrooms',
    image: chilliGarlicMushroomsImg,
    description: 'Fresh button mushrooms tossed in sharp chilli dry spices topped with spring onions-a must try for every mushroom lover.',
    tags: ['vegan']
  }
];

const SignatureDishes = () => {
  return (
    <section id="signature" className="py-16 bg-white dark:bg-navbar-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 text-center">
          <img src={signatureDishesIcon} alt="Signature Dishes Icon" className="h-6 mx-auto mb-2"/>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-dark-font dark:text-white mb-4">
            Our <span className="text-pistachio">Signature</span> Dishes
          </h2>
          <p className="text-medium-gray-text dark:text-gray-400 max-w-2xl mx-auto">
            Pistachio’s most celebrated creations—curated for flavor, flair and finesse
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dishes.map((dish, index) => (
            <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg">
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {dish.tags.includes('spicy') && (
                <div className="absolute top-2 right-2">
                  <span className="bg-orange-500 text-white px-2 py-1 text-xs rounded-full flex items-center">
                    <img src={spicyTagIcon} className="inline w-3 h-3 mr-1" alt="Spicy"/> Spicy
                  </span>
                </div>
              )}
              {dish.tags.includes('vegan') && (
                <div className="absolute top-2 right-2">
                  <span className="bg-green-600 text-white px-2 py-1 text-xs rounded-full flex items-center">
                    <img src={veganTagIcon} className="inline w-3 h-3 mr-1" alt="Vegan"/> Vegan
                  </span>
                </div>
              )}
              <div
                className="absolute bottom-4 left-4 bg-white/70 backdrop-blur-sm p-3 rounded-md max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <h3 className="text-base font-semibold font-serif text-dark-font mb-1">{dish.name}</h3>
                <p className="text-xs text-dark-font">{dish.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignatureDishes;