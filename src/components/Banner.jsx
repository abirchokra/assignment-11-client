import React, { useState } from "react";
import { motion } from "framer-motion";
import imgOne from "../assets/one.jpg";
import imgTwo from "../assets/two.jpg";
import imgThree from "../assets/three.jpg";

const Banner = () => {
  const images = [
    {
      src: imgOne,
      title: "Professional House Cleaning",
      description: "Enjoy a spotless home with our expert cleaning services tailored for your convenience.",
    },
    {
      src: imgTwo,
      title: "Beautiful Home Painting",
      description: "Transform your walls with vibrant colors and expert craftsmanship.",
    },
    {
      src: imgThree,
      title: "Comprehensive Maintenance",
      description: "Reliable solutions to keep your home in perfect condition year-round.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return (
    <div className="relative overflow-hidden w-full h-[500px]">

      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index > currentIndex ? "100%" : "-100%" }}
            animate={{
              opacity: index === currentIndex ? 1 : 0,
              x: index === currentIndex ? 0 : index > currentIndex ? "100%" : "-100%",
            }}
            transition={{ duration: 0.8 }}
            className={`absolute inset-0`}
          >
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white px-4 md:px-10">
              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-3xl md:text-5xl font-bold"
              >
                {image.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-4 text-sm md:text-lg"
              >
                {image.description}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="absolute top-1/2 transform -translate-y-1/2 left-4 z-20">
        <button
          onClick={prevSlide}
          className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70"
        >
          ❮
        </button>
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 right-4 z-20">
        <button
          onClick={nextSlide}
          className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70"
        >
          ❯
        </button>
      </div>

    
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
