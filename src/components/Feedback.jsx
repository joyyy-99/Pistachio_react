import feedbackIcon from "../assets/icons/feedback-section.png"
import feedbackImage from "../assets/images/feedback-img.webp"
export default function feedBack(){
  return(
    <section id="feedback" className="py-16 bg-white dark:bg-navbar-dark">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <img src={feedbackIcon} alt="Feedback Icon"className="h-6 mb-2"/>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-dark-font dark:text-white mb-2">
          We’d love your <span className="text-pistachio">Feedback</span>
        </h2>
      </div>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1">
          <form className="space-y-4">
            <input type="text" id="full-name" name="full-name" placeholder="Full Name"
              className="w-full px-4 py-3 rounded-md bg-white dark:bg-input-dark border border-gray-300 dark:border-gray-600 text-dark-font dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-pistachio focus:border-pistachio"/>
            <input type="email" id="email" name="email" placeholder="Email"
              className="w-full px-4 py-3 rounded-md bg-white dark:bg-input-dark border border-gray-300 dark:border-gray-600 text-dark-font dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-pistachio focus:border-pistachio"/>
            <input type="tel" id="phone-number" name="phone-number" placeholder="Phone Number"
              className="w-full px-4 py-3 rounded-md bg-white dark:bg-input-dark border border-gray-300 dark:border-gray-600 text-dark-font dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-pistachio focus:border-pistachio"/>
            <textarea id="message" name="message" rows="5" placeholder="Message"
              className="w-full px-4 py-3 rounded-md bg-white dark:bg-input-dark border border-gray-300 dark:border-gray-600 text-dark-font dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-pistachio focus:border-pistachio"></textarea>
            <button type="submit" className="bg-pistachio hover:bg-pistachio/90 text-white px-6 py-3 rounded-full font-medium transition">
              Submit Message
            </button>
          </form>
        </div>
        <div className="order-1 lg:order-2 flex justify-center items-start mt-0">
          <img src={feedbackImage} alt="Feedback image" className="w-3/4 max-w-sm rounded-lg shadow-lg mt-0"/>
        </div>
      </div>
    </div>
  </section>
  )
} 