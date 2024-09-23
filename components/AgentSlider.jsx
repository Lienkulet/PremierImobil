'use client';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import AgentCard from "./AgentCard";

const AgentSlider = () => {
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

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false
  };

  return (
    (
      loading ? <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#BB8D3F" loading={loading} size={150} />
      </div>
        :
        <section className="py-12">
            <h1 className="font-bold text-5xl text-center text-mainOrange mb-5">Agenții Noștri</h1>

          <div className="slider-container mt-12">
            <Slider {...settings}>
              {properties?.map((property, index) => (
                <div key={index}>
                  <AgentCard property={property} />
                </div>
              ))}
            </Slider>
          </div>
        </section>
    )
  );
};

export default AgentSlider;
