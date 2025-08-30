import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { LOGO_IMAGE } from "../../Media/Media";

export default function Footer() {
  return (
    <footer className="bg-[#2a2a96] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
        {/* Logo */}
        <div className="flex justify-center md:justify-start">
          <img
            src={LOGO_IMAGE} // replace with your logo path
            alt="Tarzan Transport"
            className="h-24 rounded-md"
          />
        </div>

        {/* Contact Section */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold mb-4">Contact</h2>
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <FaEnvelope className="text-yellow-400" />
            <a
              href="mailto:dispatch@shieldmotorgroup.ca"
              className="hover:underline"
            >
              dispatch@shieldmotorgroup.ca
            </a>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <FaPhone className="text-yellow-400" />
            <span>+1 (437) 236 5653</span>
          </div>
        </div>

        {/* Address Section */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold mb-4">Address</h2>
          <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
            <FaMapMarkerAlt className="text-yellow-400" />
            <p>
              81 Taralake st, NE Calgary,
              <br />
              Alberta, T3J 0E9
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
