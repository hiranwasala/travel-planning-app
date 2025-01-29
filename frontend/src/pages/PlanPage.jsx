import React from 'react'
import LayOut from '../components/LayOut'
import bgImage from '../assets/images/bg_2.jpg';

const PlanPage = () => {
  return (
    <LayOut>
    

                {/* Plan Section */}
                <div className='mt-40'>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-center text-gray-800 mb-8 lg:mb-0">
                  Plan Your <span className='text-red-400'>Perfect Trip</span>
                </h2>
                </div>

                <section className="py-28 flex items-center justify-center">
  {/* Destination selections */}
  <form className="grid grid-cols-2 gap-8">
    <div className="flex flex-col">
      <label htmlFor="destination" className="mb-2 text-sm font-medium">
        Enter destination
      </label>
      <input
        id="destination"
        type="text"
        className="w-80 h-10 border-2 rounded-xl border-black px-4"
        placeholder="Enter a destination"
      />
    </div>

    <div className="flex flex-col">
      <label htmlFor="tour-begins" className="mb-2 text-sm font-medium">
        Tour begins
      </label>
      <input
        id="tour-begins"
        type="date"
        className="w-80 h-10 border-2 rounded-xl border-black px-4"
        placeholder="Select the date"
      />
    </div>

    <div className="flex flex-col">
      <label htmlFor="tour-ends" className="mb-2 text-sm font-medium">
        Tour ends
      </label>
      <input
        id="tour-ends"
        type="date"
        className="w-80 h-10 border-2 rounded-xl border-black px-4"
        placeholder="Select the date"
      />
    </div>

    <div className="flex flex-col">
      <label htmlFor="budget" className="mb-2 text-sm font-medium">
        Maximum Budget
      </label>
      <input
        id="budget"
        type="number"
        className="w-80 h-10 border-2 rounded-xl border-black px-4"
        placeholder="Enter your budget"
      />
    </div>

    <div className="flex flex-col">
      <label htmlFor="travelers" className="mb-2 text-sm font-medium">
        Number of travelers
      </label>
      <input
        id="travelers"
        type="number"
        className="w-80 h-10 border-2 rounded-xl border-black px-4"
        placeholder="Number of travelers"
      />
    </div>

    <div className="flex flex-col">
      <label htmlFor="transportation" className="mb-2 text-sm font-medium">
        Transportation Preference
      </label>
      <input
        id="transportation"
        type="text"
        className="w-80 h-10 border-2 rounded-xl border-black px-4"
        placeholder="Transportation preference"
      />
    </div>

    <div className="flex flex-col">
      <label htmlFor="accommodation" className="mb-2 text-sm font-medium">
        Accommodation Type
      </label>
      <input
        id="accommodation"
        type="text"
        className="w-80 h-10 border-2 rounded-xl border-black px-4"
        placeholder="Accommodation type"
      />
    </div>

    <div className="col-span-2 flex justify-center mt-8">
      <button className="bg-black rounded-xl w-32 h-10 text-white">
        Create Trip
      </button>
    </div>
  </form>
</section>



    </LayOut>
  )
}

export default PlanPage
