import { useState } from 'react';
import { LOGO_IMAGE } from '../Media/Media';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useStepsStore } from '../Store/ServicesSteps';

const ResponsiveHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentStep = useStepsStore((state) => state.currentStep);
  const setCurrentStep = useStepsStore((state) => state.setCurrentStep)
  const updateSenderData = useStepsStore((state) => state.updateSenderData);
const navigate=useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleclick = () => {
    setCurrentStep(currentStep - 1);
  }


  const logout=()=>{
    sessionStorage.clear()
    updateSenderData({})
    navigate("/auth/signin");
  }

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          {currentStep !== 1 && currentStep !== 7 && (
              <button onClick={handleclick} className="cursor-pointer">
                <FiArrowLeft className="h-6 w-6" />
              </button>
            )}

          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-blue-600">
              <img src={LOGO_IMAGE} className="rounded-full h-15 w-15" />
            </a>
          </div>

          {/* Desktop Navigation - Now Hidden on ALL screens */}
          <nav className="hidden">
            <div className="flex space-x-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Home
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                About
              </Link>
              <Link
                to="/services"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Services
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Contact
              </Link>
              <Link
                to="/terms-condition"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Terms & Conditions
              </Link>
              <Link
                onClick={() => logout()}
                className="text-red-700 hover:text-red-500 font-medium"
              >
                LogOut
              </Link>
            </div>
          </nav>

          {/* Mobile menu button - Always Visible */}
          <div>
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Always Visible When Toggled */}
        {isMenuOpen && (
          <div className="mt-4 pb-4">
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Home
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                About
              </Link>
              <Link
                to="/services"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Services
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Contact
              </Link>
              <Link
                to="/terms-condition"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Terms & Conditions
              </Link>
              <a
                onClick={() => logout()}
                className="text-red-700 hover:text-red-500 font-medium cursor-pointer"
              >
                LogOut
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default ResponsiveHeader;