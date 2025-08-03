import React from "react";
import { motion, AnimatePresence } from "framer-motion";
// import Map from "@/components/Map";
import { commonTitle } from "./CommonTitle";
import WelcomeText from "./WelcomeText";
import { LOGO_IMAGE, Persongif } from "../../Media/Media";
import Map from "../Services/Map";

const CommonLayout = ({
  currentStep,
  //   totalSteps,
  children,
}) => {
  if (currentStep === 1) {
    return <div className="relative w-full h-[88vh] overflow-scroll">{children}</div>;
  }

  const welcomeMessages = {
    1: `Welcome to ${commonTitle}! Please select a service to proceed.`,
    2: `Welcome to ${commonTitle}! We are here to help you out, please fill in all the information.`,
    3: `Welcome to ${commonTitle}! We are here to help you out, please fill in all the information.`,
    4: `Welcome to ${commonTitle}! Please select the location.`,
    5: `Find the nearest garage to help you out.`,
  };

  console.log(currentStep,"currentStepcurrentStep");
  

  return (
    <div className="relative flex flex-1 justify-between items-end h-[88vh] overflow-scroll">
      {/* Background Map */}
      <div className="absolute inset-0 h-full">
        <Map />
      </div> 

      {/* Foreground Content */}
      <div className="relative flex flex-col w-full justify-between h-full pointer-events-none overflow-scroll">
        <div className="relative mx-4 md:mx-0 top-2 flex items-start justify-center pointer-events-none">
          <img src={Persongif} alt="Provider Animation" className="w-20 mt-[15px]" />
          <WelcomeText text={welcomeMessages[currentStep] || "Welcome to Shield Motor Group!"} />
        </div>
        


        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative bg-white p-4 shadow-lg pointer-events-auto rounded-t-xl overflow-scroll"
          >
            {children}
            {/* <div className="h-[100px]  w-full md:hidden "></div> */}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CommonLayout;
