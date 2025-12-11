import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const HeroCarousel = () => {
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80",
      title: "Full Stack Development",
      subtitle: "Master Frontend & Backend with React, Node.js, and MongoDB."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      title: "Python Programming",
      subtitle: "From Basics to Advanced: The language of AI & Data Science."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      title: "Data Science & AI",
      subtitle: "Unlock the power of data with Deep Learning and MLOps."
    }
  ];

  return (
    <div className="w-full h-[50vh] md:h-[90vh]">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-blue-900/40 flex items-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-2xl text-white">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in-up">
                      {slide.title}
                    </h2>
                    <p className="text-lg md:text-xl mb-8 text-gray-200">
                      {slide.subtitle}
                    </p>
                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 shadow-lg text-lg">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroCarousel;
