import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import {
  FaBookOpen,
  FaBoxOpen,
  FaGift,
  FaHeart,
  FaHiking,
  FaPaintBrush,
  FaStar,
  FaUsers,
} from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./slider.css"; // Create this file for custom styles

const HobbyHubSlider = () => {
  const slides = [
    {
      id: 1,
      title: "Join Local Book Circles",
      description:
        "Meet fellow readers in your area and dive into meaningful stories together—loved by 3,200+ book lovers.",
      icon: <FaBookOpen className="text-5xl mb-4 text-primary" />,
      bgColor: "bg-gradient-to-r from-yellow-50 to-orange-50",
    },
    {
      id: 2,
      title: "Weekend Hiking Crews",
      description:
        "Explore nature with new friends and discover hidden trails—trusted by outdoor enthusiasts nationwide.",
      icon: <FaHiking className="text-5xl mb-4 text-primary" />,
      bgColor: "bg-gradient-to-r from-green-50 to-lime-50",
    },
    {
      id: 3,
      title: "Paint & Sip Gatherings",
      description:
        "Unleash your creativity in a casual setting with local art lovers—rated 4.9 by aspiring artists.",
      icon: <FaPaintBrush className="text-5xl mb-4 text-primary" />,
      bgColor: "bg-gradient-to-r from-pink-50 to-rose-50",
    },
    {
      id: 4,
      title: "Create Your Own Group",
      description:
        "Start a community around your passion—whether it’s chess, cooking, or coding. Make it yours!",
      icon: <FaUsers className="text-5xl mb-4 text-primary" />,
      bgColor: "bg-gradient-to-r from-indigo-50 to-violet-50",
    },
    {
      id: 5,
      title: "Discover Hidden Talents",
      description:
        "From pottery to poetry, find unique hobby groups nearby and try something new every weekend.",
      icon: <FaStar className="text-5xl mb-4 text-primary" />,
      bgColor: "bg-gradient-to-r from-sky-50 to-cyan-50",
    },
  ];

  return (
    <div className="mx-auto">
      <Swiper
        spaceBetween={30}
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
        className="mySwiper rounded-xl shadow-lg"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className={`bg-base-200 h-full w-full p-8 md:p-12 flex flex-col items-center justify-center text-center`}
            >
              <div className="mb-6">{slide.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-primary">
                {slide.title}
              </h3>
              <p className="text-lg text-accent max-w-2xl">
                {slide.description}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HobbyHubSlider;
