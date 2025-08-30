import { useEffect, useRef } from "react";


export const PickupLocation = ({
  label,
  onLocationSelect,
  from,
}) => {
const inputRef = useRef(null);

useEffect(() => {
  if (!window.google) return;

  const autocomplete = new window.google.maps.places.Autocomplete(
    inputRef.current,
    { types: ["geocode"] }
  );

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (place && onLocationSelect) {
      onLocationSelect(place, from); // pass place + type (pickup/delivery)
    }
  });
}, [onLocationSelect, from]);
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <input
        ref={inputRef}
        type="text"
        placeholder={`Enter ${
          from === "pickup" ? "pickup" : "delivery"
        } location`}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
      />
    </div>
  );
};