'use client';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";

const ImobilSlider = ({ img, category }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Track the index of the selected image

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

    // Logic to go to the next image
    const nextImage = () => {
        if (selectedImageIndex < img.length - 1) {
            setSelectedImageIndex(selectedImageIndex + 1);
        }
    };

    // Logic to go to the previous image
    const prevImage = () => {
        if (selectedImageIndex > 0) {
            setSelectedImageIndex(selectedImageIndex - 1);
        }
    };

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        centerMode: false,
        slidesToShow: Math.min(isMobile ? 2 : 5, img.length), // Adjust slidesToShow based on the number of images
        slidesToScroll: 1,
        swipeToSlide: true,
        arrows: isMobile ? false : true,
    };

    return (
        <section className="py-4">
            {/* Main image with category badge */}
            <div className="flex w-full items-center justify-center relative">
                <div className={`relative ${isMobile ? 'w-full' : 'w-1/2'}`}>
                    <img
                        src={img[selectedImageIndex]}
                        alt="Main"
                        className="w-full md:h-[600px] h-[350px] mb-4 bg-contain bg-no-repeat rounded-xl"
                    />

                    {/* Category displayed in the top-right corner */}
                    <div className="absolute top-4 right-4 text-mainOrange px-4 py-2 rounded-lg font-semibold text-xl">
                        {category}
                    </div>

                    {/* Left Arrow */}
                    {selectedImageIndex > 0 && (
                        <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full text-white"
                        >
                            &#8592;
                        </button>
                    )}

                    {/* Right Arrow */}
                    {selectedImageIndex < img.length - 1 && (
                        <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full text-white"
                        >
                            &#8594;
                        </button>
                    )}
                </div>
            </div>

            {/* Slider for thumbnails */}
            {isMobile || img.length > 6 ? (
                <div className="slider-container">
                    <Slider {...settings}>
                        {img.map((image, index) => (
                            <div key={index} onClick={() => setSelectedImageIndex(index)}>
                                <img
                                    src={image}
                                    alt={`Thumbnail ${index}`}
                                    className="w-[180px] md:w-[250px] h-[200px] cursor-pointer rounded-xl"
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            ) : (
                <div className="flex flex-row gap-2">
                    {img.map((image, index) => (
                        <div key={index} onClick={() => setSelectedImageIndex(index)}>
                            <img
                                src={image}
                                alt={`Thumbnail ${index}`}
                                className="w-[290px] h-[200px] cursor-pointer rounded-xl"
                            />
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default ImobilSlider;
