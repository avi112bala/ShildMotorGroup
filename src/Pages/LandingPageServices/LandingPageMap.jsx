import React from 'react'
import { landingpagemap } from '../../Media/Media'

const LandingPageMap = () => {
    return (
        <div className='w-full'>
        <div className='p-4 md:p-5'>
          <h2 className='text-[#2E3192] font-bold text-2xl md:text-4xl text-center' style={{ fontFamily: "Bebas Neue" }}>
            We Ship Everywhere
          </h2>
          <p className='text-sm md:text-base text-center mb-4'>
            Serving Every State in the USA including Alaska & All Provinces in Canada with Flatbed Hauling
          </p>
        </div>
        
        <div className='flex flex-col md:flex-row'>
          {/* Map Image - Now centered and responsive */}
          <div className='w-full md:w-[30%] flex justify-center p-4 md:p-5'>
            <img
              src={landingpagemap}
              className='w-full max-w-[500px] md:w-[500px] h-auto max-h-[300px] md:max-h-[400px] object-contain'
              alt="Service Coverage Map"
            />
          </div>
          
          {/* Text Content */}
          <div className='w-full md:w-[70%] p-4 md:p-28'>
            <div className='space-y-4'>
              <p className='text-xs md:text-sm'>
                Our flatbed transportation services cover every state in the United States of America including Alaska and all the provinces of Canada, providing you with the flexibility and reach to deliver goods anywhere. Whether your shipment is traveling across town, country, or borders, we have the experience, equipment, and commitment to ensure a seamless logistical experience.
              </p>
              
              <p className='text-xs md:text-sm'>
                You can rely on us to make sure your shipment gets to its destination on time, safely, and ready for the next leg of your journey.
              </p>
              
              {/* Location Highlights */}
              <div className='flex flex-wrap gap-4 mt-4'>
                <span className='text-[#2E3192] font-medium text-sm md:text-base'>Alaska</span>
                <span className='text-[#2E3192] font-medium text-sm md:text-base'>Canada</span>
                <span className='text-[#2E3192] font-medium text-sm md:text-base'>United States</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
}

export default LandingPageMap