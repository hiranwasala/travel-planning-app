import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import React from 'react'
import LayOut from '../components/LayOut'
import bgImage from '../assets/images/bg_1.jpg'
import CounterSection from "../components/CounterSection";
import Reviews from "../components/Reviews";
import FeaturedDestinations from "../components/FeaturedDestinations";



const HomePage = () => {
	const destinations = [
		{
		  title: "Nature",
		  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		  image: "https://source.unsplash.com/500x500/?nature,water",
		},
		{
		  title: "Mountain",
		  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		  image: "https://source.unsplash.com/500x500/?mountain,water",
		},
		{
		  title: "Beach",
		  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		  image: "https://source.unsplash.com/500x500/?beach,water",
		},
		{
		  title: "Desert",
		  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		  image: "https://source.unsplash.com/500x500/?desert,sand",
		},
		{
		  title: "Forest",
		  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		  image: "https://source.unsplash.com/500x500/?forest,trees",
		},
	  ];
  return (
    <LayOut>
      <div
  className="hero-wrap relative w-full h-[80vh] bg-cover bg-center"
  style={{ backgroundImage: `url(${bgImage})` }}
>
  {/* Overlay with gradient */}
  <div className="overlay absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60"></div>

  {/* Container for content */}
  <div className="container mx-auto relative z-10 h-full flex flex-col justify-center items-center text-center">
    <div className="slider-text text-white">
      <h1 className="mb-4 font-bold text-6xl md:text-7xl leading-tight">
        <strong>Plan your </strong> <br /> perfect journey
      </h1>
      <p className="mb-8 text-lg md:text-xl">
        Discover the best destinations, experiences, and recommendations for a memorable trip.
      </p>
      <div className="inline-flex items-center">
        <input
          type="text"
          className="my-6 w-80 h-16 bg-white pl-6 placeholder:text-gray-600"
          placeholder="Ex: food,service,hotel"
        />
        <button className="bg-red-400 w-40 h-16">Search</button>
      </div>
    </div>
  </div>
</div>

{/* Featured Destinations */}
<FeaturedDestinations/>
{/* CounterSection */}
<CounterSection/>

<Reviews/>

{/* Popular Hotels and Rooms */}
<section className="featured-section mt-20">
      {/* Heading */}
      <div className="container mx-auto ">
        <span className="text-lg text-gray-500">Special</span>
        <h2 className="mb-4 text-2xl font-bold">
          <strong>Popular Hotels</strong> Rooms
        </h2>
      </div>

      {/* Carousel */}
      <div className="container mx-auto mt-8">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={3}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
        >
          {destinations.map((destination, index) => (
            <SwiperSlide key={index}>
              <div className="relative">
                <img
                  src={destination.image}
                  alt={destination.title}
                  className="w-full h-60 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center rounded-lg">
                  <h3 className="text-white text-2xl font-bold">
                    {destination.title}
                  </h3>
                  <p className="text-white">{destination.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>

    </LayOut>
  )
}

export default HomePage
