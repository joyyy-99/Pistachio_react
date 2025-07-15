import {useState} from "react"
import { Link, useNavigate} from "react-router-dom"
export default function DishesSection(){
  const navigate = useNavigate() 
  const [activeButton, setActiveButton] = useState(null);

  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
    if (buttonName === "starters"){
      navigate('/MenuPageStarters')
    } else if (buttonName === "mains"){
      navigate('/MenuPageMains')
    } else if (buttonName === "sides"){
      navigate('/MenuPageSides')
    } else {
      navigate('/MenuPageDesserts')
    }
  };

 return(
 <section id="dishes" className = "px-10 py-10">
    <div id = "dishes-section" className = "mt-20 ">
      <h2 className = "text-center mt-0 mb-3 text-5xl md:text-8xl font-serif font-bold pb-8 text-dark-font  dark:text-white">
        Our 
        <span className = "text-pistachio"> Menu</span>
      </h2>
      <p className = "text-center font-medium text-gray-500 p-1 text-3xl dark:text-gray-400 pb-3 ">
        Explore our Vibrant Indian and Middle Eastern Cuisine
      </p>
    </div>
    <div id="buttons" className = "mx-auto w-full flex flex-row justify-center gap-5 mb-4">
      <button
        id="starters"
        onClick={() => handleClick("starters")}
        className={`${
          activeButton === "starters" ? "bg-pistachio" : "bg-[#E0E0DC]"
        } w-48 mt-5 px-5 py-3 rounded-3xl`}
      >
        <Link to="/MenuPageStarters">Starters</Link>
      </button>
      
      <button
        id="mains"
        onClick={() => handleClick("mains")}
        className={`${
          activeButton === "mains" ? "bg-pistachio" : "bg-[#E0E0DC]"
        } w-48 mt-5 px-5 py-3 rounded-3xl`}
      >
        <Link to="/MenuPageMains">Mains</Link>
      </button>
      <button
        id="sides"
        onClick={() => handleClick("sides")}
        className={`${
          activeButton === "sides" ? "bg-pistachio" : "bg-[#E0E0DC]"
        } w-48 mt-5 px-5 py-3 rounded-3xl`}
      >
        <Link to="/MenuPageSides">Sides</Link>
      </button>
      <button
        id="desserts"
        onClick={() => handleClick("desserts")}
        className={`${
          activeButton === "desserts" ? "bg-pistachio" : "bg-[#E0E0DC]"
        } w-48 mt-5 px-5 py-3 rounded-3xl`}
      >
        <Link to="/MenuPageDesserts">Desserts</Link>
      </button>
      
    </div>
  </section>)
} 