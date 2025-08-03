
import { useRef, useEffect } from "react";

export const useGoogleAutocomplete = (onPlaceSelect) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!window.google || !inputRef.current) return;

      const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
        types: ["geocode"], 
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        onPlaceSelect(place);
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [onPlaceSelect]);

  return inputRef;
};
