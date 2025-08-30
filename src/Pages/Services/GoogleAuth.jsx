
import {  useEffect } from "react";


export const useGoogleAutocomplete = (inputRef, onPlaceSelect) => {
  useEffect(() => {
    if (!inputRef.current) return;
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      console.warn("Google Maps Places library not loaded.");
      return;
    }

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        types: ["geocode"],
        fields: ["geometry", "formatted_address"],
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      onPlaceSelect(place);
    });

    return () => {
      window.google.maps.event.clearInstanceListeners(autocomplete);
    };
  }, [inputRef, onPlaceSelect]);
};



