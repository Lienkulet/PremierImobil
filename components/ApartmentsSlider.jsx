'use client';
import Slider from 'react-slick';
import ApartmentCard from './ApartmentCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

const ApartmentSlider = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('/api/apartamente');
        const data = await response.json();
        setProperties(data.slice(0, 5));
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
    setLoading(false);
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: isMobile ? 1 : 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false
  };

  return loading ? (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader color="#BB8D3F" loading={loading} size={150} />
    </div>
  ) : (
    <section className="py-12">
      <img src="/Features.png" className="max-w-[600px] w-full md:ml-4 md:mt-4" alt="features" />

      <div className="slider-container md:-mt-[270px] -mt-20 md:mx-0 mx-4 py-4">
        <Slider {...settings}>
          {properties.map((property, index) => (
            <div key={index} className="px-2 py-10">
              <ApartmentCard property={property} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ApartmentSlider;
