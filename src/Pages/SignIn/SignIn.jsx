import React, {  useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthUsers } from '../../Store/AuthStore';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import CustomButton from '../../Utils/CustomButton';
import { Call, lock, LOGO_IMAGE, towinggif } from '../../Media/Media';
import { useStepsStore } from '../../Store/ServicesSteps';
import UserService from '../../api/UserServices';
import { FiLoader } from 'react-icons/fi';


const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false); // State for controlling the loader visibility
  const navigate = useNavigate();
  const setCurrentStep = useStepsStore((state) => state.setCurrentStep);

  const handleLogoClick = () => {
    navigate("/");
    setCurrentStep(1)
  };


  const onSubmit = async (data) => {
    setLoading(true);
    setShowLoader(true);

    try {
      const response = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Phone: data.mobile,
          Password: data.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem("authToken", data.token);

        UserService.showToast("Success!", "Sign In Successfully!");

        setTimeout(() => {
          navigate("/services");
        }, 1000);
      } else {
        const errorData = await response.json();
        UserService.showToastError("Error!", errorData.message);
        setLoading(false)
         setShowLoader(false);
        // setResponseMessage(`${errorData.message}`);
      }
    } catch (error) {
      // setResponseMessage("An error occurred: " + error.message);
      UserService.showToastError("An error occurred", error.message);
    } finally {
      setLoading(false);
      setShowLoader(false);
    }
  };
  return (
    <div className="relative flex justify-center items-center overflow-x-hidden">
      {/* Sign In Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`w-full min-h-screen max-w-xl p-8 bg-white shadow-lg relative z-10 ${
          loading ? "blur-sm pointer-events-none select-none" : ""
        }`}
      >
        {/* Logo and Heading */}
        <div className="text-center mb-8">
          <img
            // src="/images/logo.png"
            src={LOGO_IMAGE}
            className="mx-auto my-6 sm:my-8 w-28 sm:w-32 cursor-pointer"
            alt="Logo"
            onClick={handleLogoClick}
          />
          <h4 className="text-xl sm:text-2xl font-bold text-center text-[#000000]">
            Log In
          </h4>
        </div>

        {/* Phone Number Input */}
        <div className="mt-8">
          <label className="block mb-1 text-sm text-[#898989]">
            Phone Number
          </label>
          <div className="relative">
            <input
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={10}
              placeholder="Enter Phone Number"
              {...register("mobile", {
                required: "Mobile Number is required",
                validate: (value) => {
                  const onlyNumbers = /^[0-9]{10}$/;
                  return (
                    onlyNumbers.test(value) ||
                    "Mobile Number must be exactly 10 digits"
                  );
                },
              })}
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value.replace(
                  /[^0-9]/g,
                  ""
                );
              }}
              className={`w-full rounded-xl border-[1px] ${
                errors.mobile ? "border-red-500" : "border-[#CBCBCB]"
              } border-l-4 border-l-[#012653] bg-[#F8F8F8] py-2 sm:py-2 pl-14 pr-4 placeholder-[#D8D8D8] text-black outline-none focus:ring-2 focus:ring-[#012653]`}
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm mt-1">
                {errors.mobile.message}
              </p>
            )}
            <div className="absolute left-3 top-2.5 sm:top-3 text-gray-400">
              {/* <img src="/images/call 2.svg" alt="Phone Icon" className="w-5 h-5 " /> */}
              <img src={Call} alt="Phone Icon" className="w-5 h-5 " />
            </div>
          </div>
        </div>

        {/* Password Input */}
        <div className="mt-6">
          <label className="block mb-1 text-sm text-[#898989]">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
              })}
              className={`w-full rounded-xl border-[1px] ${
                errors.password ? "border-red-500" : "border-[#CBCBCB]"
              } border-l-4 border-l-[#012653] bg-[#F8F8F8] py-2 sm:py-2 pl-14 pr-4 placeholder-[#D8D8D8] text-black outline-none focus:ring-2 focus:ring-[#012653]`}
            />
            <div className="absolute left-3 top-2.5 sm:top-3 text-gray-400">
              {/* <img src="/images/lock.svg" alt="Lock Icon" className="w-5 h-5 " /> */}
              <img src={lock} alt="Lock Icon" className="w-5 h-5 " />
            </div>
            <div
              className="absolute right-3 top-3.5 sm:top-3 cursor-pointer text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <IoEyeOffOutline size={20} />
              ) : (
                <IoEyeOutline size={20} />
              )}
            </div>
          </div>

          {/* Forget Password Link */}
          <div className="text-right mt-2">
            <Link
              to="/auth/forget"
              className="text-sm text-[#012653] hover:underline hover:text-[#000000]"
            >
              Forget Password?
            </Link>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-14">
          <CustomButton
            loading={loading}
            title={
              <div className="flex justify-center items-center h-[24px]">
                {loading ? <FiLoader className="animate-spin" /> : "Continue"}
              </div>
            }
            className="w-full py-3 sm:py-2 text-white rounded-xxl hover:bg-[#8F25F8] transition min-h-[48px]"
          />
        </div>

        {/* Sign Up Link */}
        <div className="flex items-center justify-center mt-16 gap-1">
          <h2 className="text-[#898989]">Don't have an account?</h2>
          <Link
            className="hover:text-[#8f25f8b4]"
            to={"/auth/signup"}
            style={{ color: `var(--common_text_color)` }}
          >
            Sign up
          </Link>
        </div>
      </form>

      {/* Loading Overlay */}
      {showLoader && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-20">
          {/* <img src="/images/towber.gif" alt="Loading" className="w-24" /> */}
          <img src={towinggif} alt="Loading" className="w-24" />
        </div>
      )}
    </div>
  );
}

export default SignIn