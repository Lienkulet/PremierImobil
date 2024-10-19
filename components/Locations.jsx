'use client';
import Slider from "react-slick";
import ApartmentCard from "./ApartmentCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";

const ApartmentSlider = () => {
    const [isMobile, setIsMobile] = useState(false);

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
    let settingsDesktop = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: isMobile? 1 : 3,
        slidesToScroll: 1,
        swipeToSlide: true,
        arrows: false
    };
    return (
        <section className="py-12 hidden md:flex flex-col gap-12">
            <h1 className="font-bold text-white text-2xl md:text-5xl text-center">Suntem Disponibili în Multe Locații</h1>
            <div className="slider-container">
                <Slider {...settingsDesktop}>
                    <div className="relative w-fit">
                        <img src="telecentru.webp" className="h-[450px] md:h-[500px] w-[400px] rounded-xl" />
                        <h4 className="text-white font-semibold text-2xl text-center absolute bottom-8 left-1/3">Telecentru</h4>
                    </div>
                    <div className="relative">
                        <img src="centru.jpg" className="h-[450px] md:h-[500px] w-[400px] rounded-xl" />
                        <h4 className="text-white font-semibold text-2xl text-center absolute bottom-8 left-1/3">Centru</h4>
                    </div>
                    <div className="flex flex-col items-center justify-center relative">
                        <img src="rascani.jpeg" className="h-[450px] md:h-[500px] w-[400px] rounded-xl" />
                        <h4 className="text-white font-semibold text-2xl text-center absolute bottom-8 left-1/3">Râșcani</h4>
                    </div>
                    <div className="relative">
                        <img src="ciocana.jpg" className="h-[450px] md:h-[500px] w-[400px] rounded-xl" />
                        <h4 className="text-white font-semibold text-2xl text-center absolute bottom-8 left-1/3">Ciocana</h4>
                    </div>
                    <div className="relative">
                        <img src="buiucani.jpg" className="h-[450px] md:h-[500px] w-[400px] rounded-xl" />
                        <h4 className="text-white font-semibold text-2xl text-center absolute bottom-8 left-1/3">Buiucani</h4>
                    </div>
                    <div className="relative">
                        <img src="botanica.jpg" className="h-[450px] md:h-[500px] w-[400px] rounded-xl" />
                        <h4 className="text-white font-semibold text-2xl text-center absolute bottom-8 left-1/3">Botanica</h4>
                    </div>
                </Slider>
            </div>
        </section>

    );
}

export default ApartmentSlider;