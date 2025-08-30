import React from 'react'
import { Landingservice1 } from '../../Media/Media';

const Whychoose = () => {
  return (
    <div className="w-full mt-4">
      <h2 className="text-[#2E3192] text-center text-2xl md:text-4xl font-bold">
        Why Choose Shield Motor Group Limited.?
      </h2>
      <div className="flex flex-col md:flex-row p-4 mt-4">
        <div className="w-full md:w-1/2 p-2">
          <img src={Landingservice1} className="w-[28rem] md:w-full object-cover  rounded-sm" />
        </div>
        <div className="w-full p-2">
          <p className='text-start text-lg font-base'>
            Choose Shield Motor Group for more than just flatbed hauling—choose
            a partner that redefines the transportation experience. We blend
            decades of expertise with innovative solutions to safely,
            efficiently, and timely move your cargo. We care about the details
            in handling every shipment precisely, from the beginning to the end
            of your journey, and make it as seamless and hassle-free as
            possible. We are here to help you handle logistics so that you can
            focus on what is really importan
          </p>
        </div>
      </div>
    </div>
  );
}

export default Whychoose