import reviewSectionImage from "../assets/icons/reviews-section.png"
import starIcon from "../assets/icons/reviews-stars.png"

export default function Reviews(){
  return(
    <section id="reviews" className="py-16 bg-brand-light dark:bg-feedback-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <img src={reviewSectionImage} alt="Reviews Icon" className="h-6 mb-2"/>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-dark-font dark:text-white mb-4">What Our <span className="text-pistachio">Guests</span> Are Saying</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mb-0">
          <div className="bg-white dark:bg-input-dark p-6 rounded-lg shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex flex-row gap-1 mb-3">
                <img src={starIcon} alt="5 stars" className="h-5"/>
                <img src={starIcon} alt="5 stars" className="h-5"/>
                <img src={starIcon} alt="5 stars" className="h-5"/>
                <img src={starIcon} alt="5 stars" className="h-5"/>
                <img src={starIcon} alt="5 stars" className="h-5"/>
              </div>
              <p className="text-medium-gray-text dark:text-gray-800 mb-4">"The butter chicken is absolutely phenomenal…"</p>
            </div>
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-800">– Aisha K.</div>
          </div>
          <div className="bg-white dark:bg-input-dark p-6 rounded-lg shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex flex-row gap-1 mb-3">
                <img src={starIcon} alt="5 stars" className="h-5"/>
                <img src={starIcon} alt="5 stars" className="h-5"/>
                <img src={starIcon} alt="5 stars" className="h-5"/>
                <img src={starIcon} alt="5 stars" className="h-5"/>
                <img src={starIcon} alt="5 stars" className="h-5"/>
              </div>
              <p className="text-medium-gray-text dark:text-gray-800 mb-4">"Loved the ambiance and warm service…"</p>
            </div>
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-800">– David M.</div>
          </div>
        </div>
      </div>
  </section>
  )
}