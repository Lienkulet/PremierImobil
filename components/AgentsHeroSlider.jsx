'use client';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import AgentCard from "./AgentCard";
import AgentsHeroSliderCard from "./AgentHeroSliderCard";

const AgentsHeroSlider = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
  
    useEffect(() => {
      // Ensure this runs only on the client-side
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };
  
      // Set the initial value on mount
      handleResize();
  
      window.addEventListener("resize", handleResize);
  
      // Clean up the event listener on component unmount
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    useEffect(() => {
      const fetchProperties = async () => {
        try {
          const response = await fetch('/api/agent');
          const data = await response.json();
          setProperties(data); 
          console.log(properties)
        } catch (error) {
          console.error('Error fetching properties:', error);
        }
      };
  
      fetchProperties(); // Call the function to fetch properties on component mount
      setLoading(false)
    }, []);
  return  (
    (
      loading ? <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#BB8D3F" loading={loading} size={150} />
      </div>
        :
        <section className="flex md:hidden flex-col">
            <h1 className="font-bold text-2xl text-center text-white mb-5">Echipa noastră de agenți imobiliari</h1>

          <div className="flex flex-col items-center justify-center gap-4 mt-5">
           
              {properties?.map((property, index) => (
                <div key={index}>
                  <AgentsHeroSliderCard property={property} />
                </div>
              ))}
          </div>
        </section>
    )
  );
};

export default AgentsHeroSlider