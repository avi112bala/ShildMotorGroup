import React from 'react'
import { LOGO_IMAGE } from '../Media/Media'
import { Outlet, useNavigate } from 'react-router-dom'
import LandingImage from '../Pages/LandingImage'
import { useStepsStore } from '../Store/ServicesSteps'
import { FaPhoneAlt } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

const MainHeader = () => {
  const navigate = useNavigate()

  const setCurrentStep = useStepsStore((state) => state.setCurrentStep);

  const BookServices = () => {
    // const token=sessionStorage.getItem("token")
    // if(!token){
    //   navigate("/auth/signin")
    // }
    setCurrentStep(1)
    navigate("/services")

  }
  return (
    <>
      <div className='flex flex-col md:flex-row bg-[#012653] justify-between items-center p-2 md:p-4 gap-2 md:gap-0'>
        {/* Logo Container - Centered on mobile, left-aligned on desktop */}
        <div className='h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 p-1 md:p-2 flex justify-center md:justify-start'>
          <img
            src={LOGO_IMAGE}
            alt='Company Logo'
            className='w-full h-full object-contain rounded-full'
          />
        </div>

        {/* Contact Info and Button Container - Now properly centered */}
        <div className='flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 md:gap-6 w-full sm:w-auto'>
          {/* Phone - Centered in all views */}
          <div className='flex justify-center'>
            <a
              href='tel:437-236-5653'
              className='flex gap-2 items-center text-xs sm:text-sm md:text-lg p-1 md:p-2 text-white hover:text-white transition-colors whitespace-nowrap'
            >
              <FaPhoneAlt className='text-white' />
              437-236-5653
            </a>
          </div>

          {/* Email - Centered in all views */}
          <div className='flex justify-center'>
            <a
              href='mailto:dispatch@shieldmotorgroup.ca'
              className='flex gap-2 items-center text-xs sm:text-sm md:text-lg p-1 md:p-2 text-white hover:text-white transition-colors whitespace-nowrap'
            >
              <MdEmail className='text-white' />
              dispatch@shieldmotorgroup.ca
            </a>
          </div>

          {/* Button - Centered in all views */}
          <div className='flex justify-center'>
            <button
              onClick={BookServices}
              className='flex gap-2 items-center text-xs sm:text-sm md:text-lg rounded-full bg-white cursor-pointer text-[#012653] transition-colors px-3 py-1 sm:px-4 sm:py-2 md:px-6 md:py-3 whitespace-nowrap hover:bg-gray-100'
            >
              Book Service
            </button>
          </div>
        </div>
      </div>

      <LandingImage />
      <Outlet />

    </>
  )
}

export default MainHeader