import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { LOGO_IMAGE } from "../../Media/Media";
 // Install Heroicons: npm install @heroicons/react

const ConfirmBooking = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-50 p-4">
      {/* Logo */}
      {/* <img
        src={LOGO_IMAGE} // replace with your logo path
        alt="Company Logo"
        className="w-28 h-28 object-contain mb-4"
      /> */}

      {/* Success Icon */}
      {/* <CheckCircleIcon className="w-20 h-20 text-green-500 mb-4" /> */}
      <FaCheckCircle className="w-20 h-20 text-green-500 mb-4" />

      {/* Title */}
      <h1 className="text-2xl mt-5 sm:text-3xl font-bold text-gray-800 text-center">
        Order Booked Successfully!
      </h1>

      {/* Message */}
      <p className="text-gray-600 text-center  max-w-md mt-5">
        Thank you for your order. Your booking has been confirmed and is being
        processed. You will receive an email with the details shortly.
      </p>

      {/* Button */}
      <button
        onClick={() => (window.location.href = "/")}
        className="mt-10 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition"
      >
        Go to Home
      </button>
    </div>
  );
};

export default ConfirmBooking;
