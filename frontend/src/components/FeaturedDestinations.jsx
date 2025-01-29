import React, { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { BASE_URL } from "../constants";

const FeaturedDestinations = () => {
  const [places, setPlaces] = useState([]); // State to hold fetched data

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/places`);
        setPlaces(response.data); // Save fetched data to state
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };
    fetchPlaces();
  }, []);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <section className="py-12 bg-gray-100" id="featured-dishes">
      <div className="container mx-auto px-4">
        <h2
          className="text-5xl font-normal text-center text-gray-800 mb-8"
          data-aos="fade-up"
        >
          Featured Destinations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {places.length > 0 ? (
            places.slice(0, 6).map((place, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                data-aos="fade-up"
                data-aos-delay={`${index * 100}`}
              >
                <img
                  src={place.image}
                  alt={place.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {place.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{place.description}</p>
                  <div className="mt-4 text-lg font-bold text-gray-800">
                    {place.address}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">Loading destinations...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
