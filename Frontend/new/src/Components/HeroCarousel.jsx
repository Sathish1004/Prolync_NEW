import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const HeroCarousel = () => {
  const slides = [
    {
      id: 1,
      courseId: 5, // AI
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      title: "Artificial Intelligence (AI)",
      subtitle: "Shape the future with Machine Learning, Neural Networks, and GenAI."
    },
    {
      id: 2,
      courseId: 6, // Data Science
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      title: "Data Science & Analytics",
      subtitle: "Turn raw data into actionable insights with Python and Big Data tools."
    },
    {
      id: 3,
      courseId: 1, // MERN
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80",
      title: "Full Stack Web Development",
      subtitle: "Build modern, scalable applications with the MERN Stack."
    },
    {
      id: 4,
      courseId: 7, // Java
      image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      title: "Java Programming",
      subtitle: "Master Object-Oriented Programming and build robust enterprise systems."
    },
    {
      id: 5,
      courseId: 8, // SQL
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      title: "SQL & Database Management",
      subtitle: "Design, query, and optimize databases with MySQL and PostgreSQL."
    },
    {
      id: 6,
      courseId: 9, // C/C++
      image: "https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      title: "C / C++ Programming",
      subtitle: "Dive deep into system programming and high-performance computing."
    }
  ];

  return (
    <div className="w-full h-[55vh] md:h-[70vh] hero-carousel">
      <style>{`
        .hero-carousel .swiper-button-next,
        .hero-carousel .swiper-button-prev {
           width: 32px !important;
           height: 32px !important;
           border-radius: 50% !important;
           color: #7dd3fc !important; /* light blue 300 */
           border: 1px solid rgba(125, 211, 252, 0.5) !important;
        }
        .hero-carousel .swiper-button-next::after,
        .hero-carousel .swiper-button-prev::after {
            font-size: 14px !important;
            font-weight: bold;
        }
        .hero-carousel .swiper-button-prev {
            left: 20px !important;
        }
         .hero-carousel .swiper-button-next {
            right: 20px !important;
        }
      `}</style>
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
                    <Link 
                        to={`/course/${slide.courseId}`}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 shadow-lg text-lg inline-block"
                    >
                      Apply Now
                    </Link>
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
