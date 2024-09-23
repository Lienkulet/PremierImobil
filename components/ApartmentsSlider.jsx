'use client';
import Slider from "react-slick";
import ApartmentCard from "./ApartmentCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const ApartmentSlider = () => {
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
        const response = await fetch('/api/apartamente'); // Adjust the endpoint based on your API
        const data = await response.json();
        setProperties(data.slice(0, 5)); // Store the latest 5 properties
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
    slidesToShow: isMobile ? 1 : 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false
  };

  return (
    (
      properties.length === 0 ? <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#BB8D3F" loading={loading} size={150} />
      </div>
        :
        <section className="py-12">
          <img src="/Features.png" className="max-w-[600px] w-full md:ml-4 md:mt-4" />

          <div className="slider-container md:-mt-[270px] -mt-40">
            <Slider {...settings}>
              {properties?.map((property, index) => (
                <div key={index}>
                  <ApartmentCard property={property} />
                </div>
              ))}
            </Slider>
          </div>
        </section>
    )
  );
};

export default ApartmentSlider;
