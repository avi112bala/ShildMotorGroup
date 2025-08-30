import React, { useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaQuoteRight } from "react-icons/fa";

const Clientfeedback = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3, // default for large screens
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // for tablets/laptops
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, // for mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  let sliderRef = useRef(null);

  return (
    <div className="w-full mt-4">
      {/* Heading */}
      <h2 className="text-[#2E3192] text-center text-2xl md:text-4xl font-bold">
        WHAT OUR CLIENTS ARE SAYING
      </h2>

      {/* Slider */}
      <div className="slider-container py-8 px-3 custom-dots mt-5">
        <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
          {/* Card 1 */}
          <div className="px-3">
            <div className="h-full flex flex-col justify-between bg-gray-50 shadow-md rounded-lg p-6 relative">
              <FaQuoteRight className="text-purple-400 text-3xl absolute top-4 right-4" />
              <p className="text-center text-gray-700 italic mb-6">
                Tarzan Transport’s attention to detail is unmatched. They’ve
                consistently delivered our goods safely and efficiently. Their
                service is dependable and top-notch.
              </p>
              <div className="text-center mt-auto">
                <h3 className="font-semibold text-lg text-gray-900">
                  Emma Fitzpatrick
                </h3>
                <p className="text-sm text-gray-600">
                  Supply Chain Coordinator
                </p>
              </div>
            </div>
          </div>
          <div className="px-3">
            <div className="h-full flex flex-col justify-between bg-gray-50 shadow-md rounded-lg p-6 relative">
              <FaQuoteRight className="text-purple-400 text-3xl absolute top-4 right-4" />
              <p className="text-center text-gray-700 italic mb-6">
                Tarzan Transport’s attention to detail is unmatched. They’ve
                consistently delivered our goods safely and efficiently. Their
                service is dependable and top-notch.
              </p>
              <div className="text-center mt-auto">
                <h3 className="font-semibold text-lg text-gray-900">
                  Emma Fitzpatrick
                </h3>
                <p className="text-sm text-gray-600">
                  Supply Chain Coordinator
                </p>
              </div>
            </div>
          </div>
          <div className="px-3">
            <div className="h-full flex flex-col justify-between bg-gray-50 shadow-md rounded-lg p-6 relative">
              <FaQuoteRight className="text-purple-400 text-3xl absolute top-4 right-4" />
              <p className="text-center text-gray-700 italic mb-6">
                Tarzan Transport’s attention to detail is unmatched. They’ve
                consistently delivered our goods safely and efficiently. Their
                service is dependable and top-notch.
              </p>
              <div className="text-center mt-auto">
                <h3 className="font-semibold text-lg text-gray-900">
                  Emma Fitzpatrick
                </h3>
                <p className="text-sm text-gray-600">
                  Supply Chain Coordinator
                </p>
              </div>
            </div>
          </div>
          <div className="px-3">
            <div className="h-full flex flex-col justify-between bg-gray-50 shadow-md rounded-lg p-6 relative">
              <FaQuoteRight className="text-purple-400 text-3xl absolute top-4 right-4" />
              <p className="text-center text-gray-700 italic mb-6">
                Tarzan Transport’s attention to detail is unmatched. They’ve
                consistently delivered our goods safely and efficiently. Their
                service is dependable and top-notch.
              </p>
              <div className="text-center mt-auto">
                <h3 className="font-semibold text-lg text-gray-900">
                  Emma Fitzpatrick
                </h3>
                <p className="text-sm text-gray-600">
                  Supply Chain Coordinator
                </p>
              </div>
            </div>
          </div>
          <div className="px-3">
            <div className="h-full flex flex-col justify-between bg-gray-50 shadow-md rounded-lg p-6 relative">
              <FaQuoteRight className="text-purple-400 text-3xl absolute top-4 right-4" />
              <p className="text-center text-gray-700 italic mb-6">
                Tarzan Transport’s attention to detail is unmatched. They’ve
                consistently delivered our goods safely and efficiently. Their
                service is dependable and top-notch.
              </p>
              <div className="text-center mt-auto">
                <h3 className="font-semibold text-lg text-gray-900">
                  Emma Fitzpatrick
                </h3>
                <p className="text-sm text-gray-600">
                  Supply Chain Coordinator
                </p>
              </div>
            </div>
          </div>
          <div className="px-3">
            <div className="h-full flex flex-col justify-between bg-gray-50 shadow-md rounded-lg p-6 relative">
              <FaQuoteRight className="text-purple-400 text-3xl absolute top-4 right-4" />
              <p className="text-center text-gray-700 italic mb-6">
                Tarzan Transport’s attention to detail is unmatched. They’ve
                consistently delivered our goods safely and efficiently. Their
                service is dependable and top-notch.
              </p>
              <div className="text-center mt-auto">
                <h3 className="font-semibold text-lg text-gray-900">
                  Emma Fitzpatrick
                </h3>
                <p className="text-sm text-gray-600">
                  Supply Chain Coordinator
                </p>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Clientfeedback;
