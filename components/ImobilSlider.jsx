'use client';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";

const ImobilSlider = ({ img }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [selectedImage, setSelectedImage] = useState(img[0]); // Default to the first image

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

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        centerMode: false,
        slidesToShow: Math.min(isMobile ? 1 : 5, img.length), // Adjust slidesToShow based on the number of images
        slidesToScroll: 1,
        swipeToSlide: true,
        arrows: isMobile? false : true,

    };

    return (
        <section className="py-4">
            {/* Main image */}
            <img src={selectedImage} alt="Main" className="w-full md:h-[600px] h-[350px] mb-4 bg-contain bg-no-repeat rounded-xl" />
            {/* Slider for thumbnails */}
            {
                isMobile || img.length > 6 ?
                <div className="slider-container">
                    <Slider {...settings}>
                        {img.map((image, index) => (
                            <div key={index} onClick={() => setSelectedImage(image)}>
                                <img
                                    src={image}
                                    alt={`Thumbnail ${index}`}
                                    className="w-[290px] h-[200px] cursor-pointer rounded-xl"
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
                :
                <div className="flex flex-row gap-2">
                     {img.map((image, index) => (
                            <div key={index} onClick={() => setSelectedImage(image)}>
                                <img
                                    src={image}
                                    alt={`Thumbnail ${index}`}
                                    className="w-[290px] h-[200px] cursor-pointer rounded-xl"
                                />
                            </div>
                        ))}
                </div>
            }

        </section>
    );
};

export default ImobilSlider;
