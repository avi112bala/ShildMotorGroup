import React from 'react'
import { Landingservice1, Landingservice2 } from '../../Media/Media'

const LandingPageServices = () => {
  return (
    <div className='w-full'>
      <div className='p-4 md:p-5'>
        <h2 className='text-[#2E3192] font-bold text-2xl md:text-4xl text-center' style={{ fontFamily: "Bebas Neue" }}>
          OUR COMPREHENSIVE TRANSPORTATION SOLUTIONS
        </h2>
        <p className='text-sm md:text-lg text-center mb-4'>
          We do not just move loads; we move with purpose at Tarzan Transport, offering specialized services that ensure your cargo always reaches its destination on time, safely, and in an efficient manner.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-3 md:mt-5 p-2 md:p-5'>
        {/* Service 1 */}
        <div className='flex flex-col md:flex-row w-full bg-white rounded-lg overflow-hidden shadow-md'>
          <div className='w-full md:w-[50%] flex justify-center md:block'>
            <img
              src={Landingservice1}
              className='w-full max-w-[300px] md:w-[300px] h-auto md:h-[200px] object-cover'
              alt="Refrigerated Division"
            />
          </div>
          <div className='w-full md:w-[50%] p-3 md:p-5'>
            <h5 className='font-medium text-md'>Refrigerated Division</h5>
            <p className='text-xs md:text-sm'>
              Our team is fully trained on how to deal with refrigerated shipments. We specialize in temperature-controlled shipments (refrigerated and heated). We understand that these shipments require extreme care, control, and handling during transportation.
            </p>
          </div>
        </div>

        {/* Service 2 */}
        <div className='flex flex-col md:flex-row w-full bg-white rounded-lg overflow-hidden shadow-md'>
          <div className='w-full md:w-[50%] flex justify-center md:block'>
            <img
              src={Landingservice2}
              className='w-full max-w-[300px] md:w-[300px] h-auto md:h-[200px] object-cover'
              alt="Dry Division"
            />
          </div>
          <div className='w-full md:w-[50%] p-3 md:p-5'>
            <h5 className='font-medium text-md'>DRY DIVISON</h5>
            <p className='text-xs md:text-sm'>
              Our team is fully trained on how to handle dry shipments. We are the #1 long-haul LTL carrier.
              When it comes to full loads, we understand the urgency of getting these shipments to their destinations. We put them on our teams and haul coast to coast.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPageServices