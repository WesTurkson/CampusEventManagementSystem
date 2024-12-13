import React, { useState, useEffect } from "react";

const Hero = () => {
  const images = [
    "/A5.jpg",
    "/A6.jpg",
    "/A7.jpg"
  ];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 9000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-full h-60 bg-cover bg-center flex" style={{ backgroundImage: `url(${images[currentImage]})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'background-image 0.5s ease-in-out' }}>
      <div className="flex items-center mx-auto">
        <div className="w-auto p-5 md:p-00">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800 text-center md:text-left">
            Welcome to Acity Event Book
          </h1>
          <p className="text-sm md:text-lg mt-2 text-white text-center md:text-left">
            Experience seamless event booking with our user-friendly platform. <br className="hidden md:block "></br> Our system ensures secure transactions and instant confirmations for all reservations. 
            Join thousands of satisfied users who trust us for their event planning needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
