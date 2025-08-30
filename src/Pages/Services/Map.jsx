import { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import { useStepsStore } from "../../Store/ServicesSteps";
import getSetting from "../../api/UserServices.jsx";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

// const fallbackCenter = {
//   lat: 40.712776,
//   lng: -74.005974,
// };

const Map = () => {
  const { isLoaded } = useLoadScript({
    // googleMapsApiKey: "AIzaSyBCfZxDjzBIz_cit9zk8Bp5l7d6VIRXAvc", // Replace with your API key
    // googleMapsApiKey: "AIzaSyDHCriaDbKEue6Bahn71bfcTipV8MgKryQ",
    // googleMapsApiKey: "AIzaSyDXk06jpf-i4PtF1p65i5g73BAbms0agWc",
    // googleMapsApiKey: "AIzaSyBvtNQDxMuJz0QSNvAuepTvFVka60sv588",
    googleMapsApiKey: "AIzaSyBdWmYu_njpBYS4im2omZNkmtwvq3xqkZ8",
    libraries: ["places"],
  });

  const currentStep = useStepsStore((state) => state.currentStep);
  const currentLocation = useStepsStore((state) => state.currentLocation);
  const dropoffLocation = useStepsStore((state) => state.DropoffLocation);
  const setCurrentAddress = useStepsStore((state) => state.setCurrentAddress);

  const [markers, setMarkers] = useState([]);
  const [_address, setAddress] = useState("");
  const [_formState, setFormState] = useState({ location: "" });
  const [center, setCenter] = useState("");
  const [zoom, setZoom] = useState(14);

  // useEffect(() => {
  //   const fetchDefaultCenter = async () => {
  //     try {
  //       const response = await getSetting();
  //       const hq = response?.data?.response?.[0]?.HeadquaterLocation;

  //       if (hq?.lat && hq?.lng) {
  //         setCenter({ lat: hq.lat, lng: hq.lng });
  //       }
  //     } catch (err) {
  //       console.error("Failed to fetch HQ location:", err);
  //     }
  //   };

  //   fetchDefaultCenter();
  // }, []);

  useEffect(() => {
    if (currentLocation) {
      console.log(currentLocation, "currentLocation");
      
      setMarkers([
        {
          lat: currentLocation.latitude,
          lng: currentLocation.longitude,
          time: new Date(),
        },
      ]);
      if (currentLocation.latitude && currentLocation.longitude) {
        setCenter({ lat: currentLocation.latitude, lng: currentLocation.longitude });
      }
      setZoom(14);
    }
  }, [currentLocation]);

  useEffect(() => {

     const fetchDefaultCenter = async () => {
       try {
         const response = await getSetting();
         const hq = response?.data?.response?.[0]?.HeadquaterLocation;

         if (hq?.lat && hq?.lng) {
           setCenter({ lat: hq.lat, lng: hq.lng });
         }
       } catch (err) {
         console.error("Failed to fetch HQ location:", err);
       }
     };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
          setMarkers([{ lat: latitude, lng: longitude, time: new Date() }]);
          fetchAddress(latitude, longitude); // reverse geocode to address
        },
        (error) => {
          console.error("Error getting user location:", error);
          // fallback to HQ or New York if denied
          fetchDefaultCenter();
        }
      );
    } else {
      fetchDefaultCenter();
    }
  }, []);


  if (!isLoaded) return <div>Loading...</div>;

  const onMapClick = (event) => {
    if (currentLocation && dropoffLocation) return;

    setMarkers(() => [
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      },
    ]);

    fetchAddress(event.latLng.lat(), event.latLng.lng());
  };

  const customIcon = {
    // url: "/images/location_marker.svg",
    url: "/images/location_marker_blue.png",
    scaledSize: new window.google.maps.Size(90, 60),
  };

  const fetchAddress = async (lat, lng) => {
    const apiKey = "AIzaSyBdWmYu_njpBYS4im2omZNkmtwvq3xqkZ8";
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK" && data.results.length > 0) {
        const formattedAddress = data.results[0].formatted_address;
        console.log(formattedAddress);
        setAddress(formattedAddress);
        setCurrentAddress({
          address: formattedAddress,
          lat,
          lng,
          time: new Date(),
        });

        setFormState((prevState) => ({
          ...prevState,
          location: formattedAddress,
        }));
      } else {
        console.error("No address found for the given coordinates.");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };
  

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={zoom} center={center} onClick={(e) => onMapClick(e)}>
      {currentStep !== 1 &&
        markers?.map((marker, index) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            draggable={currentStep !== 2}
            icon={customIcon}
            onDragEnd={(e) => {
              if (currentStep !== 1) return;
              const newLat = e.latLng.lat();
              const newLng = e.latLng.lng();
              const updatedMarkers = markers.map((m, i) => (i === index ? { ...m, lat: newLat, lng: newLng } : m));

              setMarkers(updatedMarkers);
              console.log("Marker moved to:", { lat: newLat, lng: newLng });
            }}
          />
        ))}
    </GoogleMap>
  );
};

export default Map;
