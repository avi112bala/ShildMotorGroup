

// export default DefaultLayout;
import React, { ReactNode, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion from framer-motion
import { BackGround_Image } from "../Media/Media";

const DefaultLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Authentication check
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const routes = [
      "/auth/signin",
      "/auth/signup",
      "/auth/signin",
      "/auth/reset",
      "/auth/confirm",
      "/auth/verify",
      "/auth/forget",
      "/services"
    ];
    if (!token && !routes.includes(location.pathname)) {
      navigate("/auth/signin");
    }
  }, [navigate, location.pathname]);

  return (
    <div
      className="h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${BackGround_Image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Motion only applied to children content */}
      <motion.div
        key={location.pathname} // Ensures the transition on route change
        initial={{ opacity: 0, x: 50 }} // Start slightly from the right
        animate={{ opacity: 1, x: 0 }} // End at the original position
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5, ease: "easeInOut" }} // Adjust timing and easing
        className="relative"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default DefaultLayout;
