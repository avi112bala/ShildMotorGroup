import { useForm } from "react-hook-form";
import { useState } from "react";
import { FiLoader, FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { Call, lock, LOGO_IMAGE, towinggif, User } from "../../Media/Media";
import { AuthUsers } from "../../Store/AuthStore";
import CustomButton from "../../Utils/CustomButton";
import { useStepsStore } from "../../Store/ServicesSteps";
import UserService from "../../api/UserServices";

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLoader, setShowLoader] = useState(false); // State for controlling the loader visibility

  const setCurrentStep = useStepsStore((state) => state.setCurrentStep);

  const handleLogoClick = () => {
    navigate("/");
    setCurrentStep(1);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setShowLoader(true);

    try {
      const response = await fetch("http://localhost:8080/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Phone: data.mobile,
          Password: data.password,
          name: data.fullName,
          comfirmpassword: data.confirmPassword,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // setResponseMessage("Account created successfully! Welcome, " + data.username);
        sessionStorage.setItem("authToken", data.token);
        UserService.showToast("Success!", "Sign Up Successfully!");
        setShowLoader(false);
        setTimeout(() => {
          navigate("/services");
        }, 1000);
      } else {
        const errorData = await response.json();
        UserService.showToastError("Error!", errorData.message);
        // setResponseMessage(`${errorData.message}`);
        setShowLoader(false);
      }
    } catch (error) {
      // setResponseMessage("An error occurred: " + error.message);
      UserService.showToastError("An error occurred", error.message);
      setShowLoader(false);
    } finally {
      setLoading(false);
      setShowLoader(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full min-h-screen max-w-xl p-8 bg-white shadow-lg relative  overflow-scroll h-[88vh]">
        <div className="text-center mb-4">
          <img
            src={LOGO_IMAGE}
            className="mx-auto my-6 sm:my-8 w-28 sm:w-32"
            alt="Logo"
            onClick={handleLogoClick}
          />
          <h4 className="text-xl sm:text-2xl font-bold text-center text-[#000000]">
            Sign Up
          </h4>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Input */}
          <div className="mt-6">
            <label className="block mb-1 text-sm text-[#898989]">
              Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter full name"
                {...register("fullName", {
                  required: "Full name is required",
                  maxLength: {
                    value: 12,
                    message: "Max 12 characters allowed",
                  },
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Only alphabets allowed",
                  },
                })}
                className="w-full rounded-xl border-[1px] border-[#CBCBCB] border-l-4 border-l-[#012653] bg-[#F8F8F8] py-2 pl-14 pr-4 text-black outline-none focus:ring-2 focus:ring-[#012653]"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                {/* <img src="/images/user.svg" alt="User Icon" className="w-5 h-5" /> */}
                <img src={User} alt="User Icon" className="w-5 h-5" />
              </div>
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6">
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
                className={`w-full rounded-xl border-[1px] border-[#CBCBCB] border-l-4 border-l-[#012653] bg-[#F8F8F8] py-2 pl-14 pr-4 text-black outline-none focus:ring-2 focus:ring-[#012653] ${
                  errors.mobile ? "border-red-500" : "border-[#CBCBCB]"
                }  border-l-[#012653] bg-[#F8F8F8] py-2 sm:py-2 pl-14 pr-4  text-black outline-none focus:ring-2 focus:ring-[#012653]`}
              />

              {errors.mobile && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.mobile.message}
                </p>
              )}
              <div className="absolute left-3 top-2.5 sm:top-3 text-gray-400">
                <img src={Call} alt="Phone Icon" className="w-5 h-5 " />
              </div>
            </div>
          </div>
          {/* Password Input */}
          <div className="mt-6">
            <label className="block mb-1 text-sm text-[#898989]">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character",
                  },
                })}
                className="w-full rounded-xl border-[1px] border-[#CBCBCB] border-l-4 border-l-[#012653] bg-[#F8F8F8] py-2 pl-14 pr-10 text-black outline-none"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <img src={lock} alt="Lock Icon" className="w-5 h-5" />
              </div>
              <span
                className="absolute right-3 top-2.5 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          {/* Confirm Password Input */}
          <div className="mt-6">
            <label className="block mb-1 text-sm text-[#898989]">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                })}
                className="w-full rounded-xl border-[1px] border-[#CBCBCB] border-l-4 border-l-[#012653] bg-[#F8F8F8] py-2 pl-14 pr-10 text-black outline-none"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <img src={lock} alt="Lock Icon" className="w-5 h-5" />
              </div>
              <span
                className="absolute right-3 top-2.5 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </span>
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
              className="w-full py-3 sm:py-2  text-white rounded-xxl hover:bg-[#8F25F8] transition min-h-[48px]"
            />
          </div>
          <div className="flex items-center justify-center mt-14 mb-6 gap-1">
            <h2 className="text-[#898989]">Already have an account?</h2>
            <Link
              className=" hover:text-[#8f25f8b4]"
              to={"/auth/signin"}
              style={{ color: `var(--common_text_color)` }}
            >
              Log In
            </Link>
          </div>
        </form>
      </div>
      {showLoader && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-20">
          {/* <img src="/images/towber.gif" alt="Loading" className="w-24" /> */}
          <img src={towinggif} alt="Loading" className="w-24" />
        </div>
      )}
    </div>
    // </div>
  );
};

export default SignUp;
