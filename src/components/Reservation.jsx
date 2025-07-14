import React, {useState} from "react"
import {nanoid} from "nanoid"
import reserveIcon from "../assets/icons/reservation-icon.png"
import dropdownIcon from "../assets/icons/dropdown-icon.png"

export default function Reservation(){

  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleReservation(e) {
  e.preventDefault();
  const today = new Date();
  const todayYear = today.getFullYear();

  if (!reservation.fullName || !reservation.email || !reservation.date || !reservation.reservationComments) {
    setError("Please fill in missing fields");
  } else {
    const selectedDate = new Date(reservation.date);
    if (selectedDate.getFullYear() > todayYear + 1 || selectedDate.getFullYear() < todayYear + 1) {
      setError(`Cannot make a reservation for ${reservation.date}`);
    } else {
      localStorage.setItem(`reservation-details ${reservation.id}`, JSON.stringify(reservation));
      setIsSubmitted(true);
    }
    }
  }


  const [reservation, setReservation] = useState({
    id: nanoid(),
    fullName: "",
    email: "",
    date: "",
    numberOfGuests: 0,
    reservationComments: "",
  })

  const [error, setError] = useState("")

  function handleChange(event){
    const{value, name} = event.target
    
    setReservation(prevReservation => {
      return({
        ...prevReservation,
        [name] : value
      })
    } 
    )
  }

  function validateEmail(){
    const emailRegen = '/^[^\s@]+@[^\s@]+\.[^\s@]+$/'

    if (!emailRegen.test(reservation.email)){
      setError("Invalid email")
    } else {
      setError("")
    }

  }
  function getReservation(){
    return(
       <div>
          <p>Full name: <span>{reservation.fullName}</span></p>
          <p>Email: <span>{reservation.email}</span></p>
          <p>Date: <span>{reservation.date}</span></p>
          <p>Number of guests: <span>{reservation.numberOfGuests}</span></p>
          <p>Reservation comments: <span>{reservation.reservationComments}</span></p>
       </div>
    )
  }
  
  
  return (
    <section className="p-6 my-10 md:p-12 flex justify-center items-center dark:bg-[#2E2E2E]">
      <form className="w-full max-w-lg md:max-w-3xl border border-solid border-black rounded-2xl px-6 py-8 md:px-10 md:py-10 font-serif dark:bg-[#6D6D6D] dark:border-white">
        <fieldset className="flex flex-col gap-6">
          <div className="flex items-center justify-center gap-2">
            <img src={reserveIcon} alt="Reserve Icon" className="h-6" />
            <p className="text-2xl md:text-3xl font-normal text-dark-font dark:text-white">Reserve</p>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-dark-font text-center dark:text-white">
            Make a <span className="text-pistachio">Reservation</span>
          </h2>
          <p className="text-center mb-4 text-sm md:text-base">Book your Dining Experience in just a few clicks</p>

          <input
            type="text"
            placeholder="Full Name"
            className="border border-black rounded-md p-3 text-black dark:bg-[#FAF9F666] dark:border-white dark:placeholder-[#6D6D6D]"
            onChange={handleChange}
            value={reservation.fullName}
            name="fullName"
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="border border-black rounded-md p-3 text-black dark:bg-[#FAF9F666] dark:border-white dark:placeholder-[#6D6D6D]"
            onChange={handleChange}
            onBlur={validateEmail}
            value={reservation.email}
            name="email"
            required
          />
          

          <input
            type="date"
            className="border border-black rounded-md p-3 text-black dark:bg-[#FAF9F666] dark:border-white"
            onChange={handleChange}
            value={reservation.date}
            name="date"
            required
          />

          <div className="relative">
            <select
              className="w-full border block appearance-none border-black rounded-md p-3 text-black dark:bg-[#FAF9F666] dark:border-white"
              name="numberOfGuests"
              onChange={handleChange}
              value={reservation.numberOfGuests}
            >
              <option value="">Number of Guests</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5+">5+</option>
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <img src={dropdownIcon} alt="Dropdown arrow" className="w-4 h-4" />
            </div>
          </div>

          <textarea
            rows="4"
            placeholder="Notes"
            className="border border-black rounded-md p-3 text-black dark:bg-[#FAF9F666] dark:border-white dark:placeholder-[#6D6D6D]"
            name="reservationComments"
            value={reservation.reservationComments}
            onChange={handleChange}
            required
          />
         {reservation.reservationComments && <p>Number of characters: {reservation.reservationComments.length}</p>}
         {error && <div className="bg-red-400 text-white px-2 py-1 rounded">{error}</div>}

          <button
            onClick={handleReservation}
            className="bg-pistachio text-white py-3 px-6 rounded-2xl hover:bg-green-600 mx-auto"
          >
            Reserve
          </button>

          {isSubmitted && (
            <div>
              <div className="bg-pistachio p-4 mt-4 rounded shadow-md text-center text-white text-3xl">
                Thank you for your reservation!
              </div>
              {getReservation}
            </div>
          )}
        </fieldset>
      </form>
    </section>

  )
}