import React, {useState, useEffect} from 'react'
import bgImage from '../assets/images/bg_2.jpg'

const CounterSection = () => {
    const [customers, setCustomers] = useState(0);
    const [destinations, setDestinations] = useState(0);
    const [hotels, setHotels] = useState(0);
    const [resturants, setResturants] = useState(0);

    useEffect(() => {
        const animateValue = (start, end, duration, setter)=>{
            let startTimestamp = null;
            const step = (timestamp) => {
                if(!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                setter(Math.floor(progress * (end - start) + start));
                if(progress < 1) window.requestAnimationFrame(step);

            };
            window.requestAnimationFrame(step);
        };
        animateValue(0, 1000, 5000, setCustomers);
        animateValue(0, 100, 5000, setDestinations);
        animateValue(0, 200, 5000, setHotels);
        animateValue(0, 50, 5000, setResturants);
    }, []
);
  return (
    <section className="relative bg-cover bg-center counter h-auto py-16 my-32" style={{ backgroundImage: `url(${bgImage})` }}
    >
         
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center mt-24 justify-center">
          <div className="lg:w-10/12">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex justify-center p-4 animate-fade-in">
                <div className="text-center">
                  <strong className="text-3xl md:text-5xl lg:text-5xl font-medium text-white" data-number="18">
                    {customers}
                  </strong>
                  <span className="block text-lg md:text-xl lg:text-2xl mt-2 text-white">
                    Happy Customers
                  </span>
                </div>
              </div>
              <div className="flex justify-center p-4 animate-fade-in">
                <div className="text-center">
                  <strong className="text-3xl md:text-5xl lg:text-5xl font-medium text-white" data-number="15000">
                    {destinations}
                  </strong>
                  <span className="block text-lg md:text-xl lg:text-2xl mt-2 text-white">
                    Destination Places
                  </span>
                </div>
              </div>
              <div className="flex justify-center p-4 animate-fade-in">
                <div className="text-center">
                  <strong className="text-3xl md:text-5xl lg:text-5xl font-medium text-white" data-number="100">
                    {hotels}
                  </strong>
                  <span className="block text-lg md:text-xl lg:text-2xl mt-2 text-white">
                    Hotels
                  </span>
                </div>
              </div>
              <div className="flex justify-center p-4 animate-fade-in">
                <div className="text-center">
                  <strong className="text-3xl md:text-5xl lg:text-5xl font-medium text-white" data-number="20">
                    {resturants}
                  </strong>
                  <span className="block text-lg md:text-xl lg:text-2xl mt-2 text-white">
                    Resturants
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-gray-500 opacity-5"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CounterSection
