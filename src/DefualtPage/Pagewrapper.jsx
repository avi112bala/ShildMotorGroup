
import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-full h-full z-50"
    >
      {children}
    </motion.div>
  );
}
