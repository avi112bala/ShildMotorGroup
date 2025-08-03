import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { useStepsStore } from "../../Store/ServicesSteps";
import { useGoogleAutocomplete } from "./GoogleAuth";

export const PickupLocation = ({
  label,
  onLocationSelect,
  from,
}) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  const setCurrentLocation = useStepsStore((state) => state.setCurrentLocation);
  const currentAddress = useStepsStore((state) => state.address);
  const currentLocation = useStepsStore((state) => state.currentLocation);
  const handleClearAddress = useStepsStore((state) => state.setCurrentAddress);

  // Initialize Google Autocomplete
  useGoogleAutocomplete(inputRef, (place) => {
    if (place.geometry) {
      const location = {
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
        time: new Date(),
        address: place.formatted_address || "",
      };
      setSelectedLocation(location);
      setInputValue(location.address);

      if (from === "pickup") {
        setCurrentLocation(location);
      }
    }
  });

  useEffect(() => {
    if (currentAddress && inputValue !== currentAddress?.address) {
      setInputValue(currentAddress?.address || "");
      setSelectedLocation(currentAddress);
    }
  }, [currentAddress, inputValue]);

  // const handleContinue = () => {
  //   if (selectedLocation) {
  //     onLocationSelect(selectedLocation);
  //   } else if (currentAddress?.lat && currentAddress?.lng && currentAddress?.time) {
  //     const updatedAddress = {
  //       latitude: currentAddress.lat,
  //       longitude: currentAddress.lng,
  //       time: currentAddress.time,
  //       address: currentAddress.address || "Unknown Address",
  //     };
  //     onLocationSelect(updatedAddress);
  //   } else {
  //     toast.error("Please select a location.");
  //   }
  // };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (!value) {
      setSelectedLocation(null);
    }


    if (selectedLocation) {
      onLocationSelect(selectedLocation);
    } else if (currentAddress?.lat && currentAddress?.lng && currentAddress?.time) {
      const updatedAddress = {
        latitude: currentAddress.lat,
        longitude: currentAddress.lng,
        time: currentAddress.time,
        address: currentAddress.address || "Unknown Address",
      };
      onLocationSelect(updatedAddress);
    } else {
      toast.error("Please select a location.");
    }
  };

  const clearValue = () => {
    handleClearAddress("");
    setInputValue("");
  };

  return (
    <div
      className="max-h-[100svh] overflow-y-auto sm:max-h-none sm:overflow-visible xs:pb-24 pb-4 sm:pb-4 mt-4"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <h3 className="block text-gray-700">
        {label}
      </h3>
      <div className="relative w-full">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="w-full bg-[#F8F8F8] py-2 sm:py-2 pl-4 pr-10 text-black border-[#97979780] border-[1px] rounded-2xl font-common"
          placeholder={`Enter ${label.toLowerCase()}`}
          ref={inputRef}
        />
        {inputValue && (
          <button
            onClick={clearValue}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        )}
      </div>
      <div>
        {/* <button
          onClick={handleContinue}
          className="w-full py-2 px-4 text-white rounded-3xl hover:bg-[#8F25F8] transition mt-8 font-common"
          style={{ backgroundColor: `var(--button_background)` }}
        >
          Continue
        </button> */}
      </div>
    </div>
  );
};