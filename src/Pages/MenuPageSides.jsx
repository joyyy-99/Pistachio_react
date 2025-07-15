import {menuSidesData} from "../components/menudata.js"

export default function MenuPageSides(){
    return(
      <>
        <section className="bg-white text-gray-900 dark:bg-navbar-dark dark:text-white">
          <div id="menu-container" class="grid w-full grid-cols-1 md:grid-cols-[2fr_1fr] gap-10 px-4 md:px-12 py-8 md:py-14">
            <div id="column1" class="grid grid-cols-1 md:grid-rows-4 gap-8">
            {menuSidesData.slice(0, 4).map((item, index) => {
                return(
                <div key = {index} class="flex flex-col sm:flex-row gap-4 sm:gap-6 bg-[#FAF9F6] dark:bg-gray-800 p-4 md:p-6">
                  <div class="w-full sm:w-1/2">
                    <img class="w-full h-56 object-cover block" src={item.image} alt="Butter Chicken Makhani"/>
                  </div>
                  <div class="w-full sm:w-1/2 flex flex-col justify-start pt-4 md:pt-8">
                    <h2 class="text-center text-2xl md:text-3xl font-medium mb-4">{item.dish}</h2>
                    <p class="text-center text-sm md:text-base mt-2 font-inter text-gray-500">
                      {item.description}
                    </p>
                  </div>
                </div>)})}
            </div>
            <div id="column2" class="grid grid-cols-1 md:grid-rows-2 gap-8 content-center">
              {menuSidesData.slice(4, 6).map((item, index) => {
                return(
                <div key = {index} class="flex flex-col sm:flex-row gap-4 sm:gap-6 bg-[#FAF9F6] dark:bg-gray-800 p-4 md:p-6">
                  <div class="w-full sm:w-1/2">
                    <img class="w-full h-56 object-cover block" src={item.image} alt="Butter Chicken Makhani"/>
                  </div>
                  <div class="w-full sm:w-1/2 flex flex-col justify-start pt-4 md:pt-8">
                    <h2 class="text-center text-2xl md:text-3xl font-medium mb-4">{item.dish}</h2>
                    <p class="text-center text-sm md:text-base mt-2 font-inter text-gray-500">
                      {item.description}
                    </p>
                  </div>
                </div>)})} 
            </div>
          </div>
        </section>
      </>
)
}