import React, { useRef } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BackGround_Image, SliderImage1, SliderImage2, SliderImage3, SliderImage4, SliderImage5, Truck1, Truck2, Truck3, Truck4 } from '../Media/Media'
import Slider from 'react-slick';
import LandingPageServices from './LandingPageServices/LandingPageServices';
import LandingPageMap from './LandingPageServices/LandingPageMap';
import OurValues from './LandingPageServices/OurValues';
import Whychoose from './LandingPageServices/Whychoose';
import Footer from './LandingPageServices/Footer';
import Clientfeedback from './LandingPageServices/Clientfeedback';

const LandingImage = () => {
  //SLIDER START HERE

  // const play = () => {
  //   sliderRef.slickPlay();
  // };
  // const pause = () => {
  //   sliderRef.slickPause();
  // };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };
  let sliderRef = useRef(null);
  //SLIDER END HERE
  return (
    <>
      <div className="w-full">
        <img
          className="h-[400px] sm:h-[300px] md:h-[800px] lg:h-[580px] w-full md:w-[100%] object-cover"
          src={BackGround_Image}
          alt="Background"
        />
      </div>
      <div className=" landingcontainer">
        {/* Hero Image */}

        {/* Main Content Section */}
        <div className="flex flex-col lg:flex-row w-full mb-5 mt-8 px-3">
          {/* Image Grid */}
          <div className="w-full lg:w-[40%] flex flex-col sm:flex-row gap-4 mb-8 lg:mb-0">
            <div className="flex-1 grid gap-4">
              <img
                className="w-full h-auto object-cover max-h-[209px]"
                src={Truck4}
                alt="Truck 4"
              />
              <img
                className="w-full h-auto object-cover max-h-[209px]"
                src={Truck1}
                alt="Truck 1"
              />
            </div>
            <div className="flex-1 grid gap-4 mt-0 sm:mt-10">
              <img
                className="w-full h-auto object-cover max-h-[209px]"
                src={Truck3}
                alt="Truck 3"
              />
              <img
                className="w-full h-auto object-cover max-h-[209px]"
                src={Truck2}
                alt="Truck 2"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-[60%] p-4 md:p-8 lg:p-10">
            <div className="mb-6">
              <h1 className="font-serif font-[800] text-2xl sm:text-3xl md:text-4xl leading-[1.2] text-[#FFD336]">
                SHIELD MOTOR GROUP (SMG)
              </h1>
              <p className="font-serif font-[600] text-xl sm:text-2xl md:text-3xl leading-[1.2] text-[#2E3192] mt-2">
                DRIVING EXCELLENCE IN EVERY LOAD
              </p>
            </div>

            {/* Content */}
            <div className="space-y-4 text-gray-700">
              <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                Founded in 2024 by two ambitious young entrepreneurs, our
                trucking company began as a shared dream during our early days
                as drivers on the road. Experiencing the industry firsthand, we
                understood the challenges and gaps that existed—and envisioned
                creating something better. With that vision, we launched this
                company with a mission to deliver reliable, efficient, and
                customer-focused transportation services across North America.
              </p>

              <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                Driven by passion, experience, and a commitment to excellence,
                we set out to provide world-class trucking solutions that not
                only meet but exceed industry standards. Our goal is simple: to
                redefine logistics through innovation, integrity, and
                professionalism. We’re not just in the business of moving
                freight—we’re building a trusted name in transportation, one
                mile at a time.
              </p>
            </div>
          </div>
        </div>

        {/* Slider Section */}
        <div className="slider-container py-8 px-3">
          <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
            <div>
              <img
                className="w-full max-w-[196px]"
                src={SliderImage1}
                alt="Slider 1"
              />
            </div>
            <div>
              <img
                className="w-full max-w-[196px]"
                src={SliderImage2}
                alt="Slider 2"
              />
            </div>
            <div>
              <img
                className="w-full max-w-[196px]"
                src={SliderImage3}
                alt="Slider 3"
              />
            </div>
            <div>
              <img
                className="w-full max-w-[196px]"
                src={SliderImage4}
                alt="Slider 4"
              />
            </div>
            <div>
              <img
                className="w-full max-w-[196px]"
                src={SliderImage5}
                alt="Slider 5"
              />
            </div>
          </Slider>
        </div>
        <LandingPageServices />
        <LandingPageMap />
        <OurValues/>
        <Whychoose/>
        <Clientfeedback/>
        <Footer/>
      </div>
    </>
  );
}

export default LandingImage