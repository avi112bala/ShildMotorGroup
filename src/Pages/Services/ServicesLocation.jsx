import { useEffect, useState } from "react";
import { useStepsStore } from "../../Store/ServicesSteps";
import { PickupLocation } from "./PickupLocation";

const ServicesLocation = () => {
  const updateSenderData = useStepsStore((state) => state.updateSenderData);
  const senderdata = useStepsStore((state) => state.senderdata);
  const setCurrentStep = useStepsStore((state) => state.setCurrentStep);

  

  const [formData, setFormdata] = useState({
    sendername: "",
    senderphone: "",
    senderEmail: "",
    senderStreet: "",
    sendercity: "",
    senderzipcode: "",
    senderFullAddress:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    updateSenderData({ key: "senderDetails", value: formData });
  }, [formData]);

  const handleContinue = () => {
    setCurrentStep(4);
  };


  console.log(senderdata, "senderdatasenderdata");

  return (
    <>
      <h2 className="font-semibold text-md text-center mb-4">
        Enter Shipper Details
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        <div>
          <lable className="block text-gray-700">Name</lable>
          <input
            type="text"
            name="sendername"
            value={formData.sendername}
            className="w-full px-4 py-2 border rounded-md"
            onChange={handleChange}
            placeholder="Enter Name..."
          />
        </div>
        <div>
          <lable className="block text-gray-700">Phone</lable>
          <input
            type="tel"
            name="senderphone"
            value={formData?.senderphone}
            className="w-full px-4 py-2 border rounded-md"
            onChange={handleChange}
            placeholder="Enter Phone Number..."
          />
        </div>
        <div>
          <lable className="block text-gray-700">Email</lable>
          <input
            type="email"
            name="senderEmail"
            value={formData?.senderEmail}
            className="w-full px-4 py-2 border rounded-md"
            onChange={handleChange}
            placeholder="Enter Email..."
          />
        </div>
        <div>
          <lable className="block text-gray-700">Street</lable>
          <input
            type="text"
            name="senderStreet"
            value={formData?.senderStreet}
            className="w-full px-4 py-2 border rounded-md"
            onChange={handleChange}
            placeholder="Enter Street..."
          />
        </div>
        <div>
          <lable className="block text-gray-700">City</lable>
          <input
            type="text"
            name="sendercity"
            value={formData?.sendercity}
            className="w-full px-4 py-2 border rounded-md"
            onChange={handleChange}
            placeholder="Enter City..."
          />
        </div>
        <div>
          <lable className="block text-gray-700">Postal Code</lable>
          <input
            type="text"
            name="senderzipcode"
            value={formData?.senderzipcode}
            className="w-full px-4 py-2 border rounded-md"
            onChange={handleChange}
            placeholder="Enter Postal Code..."
          />
        </div>
      </div>
      <PickupLocation
        from="pickup"
        label="Pickup Location"
        onLocationSelect={(place) => {
           console.log(place, "place=======");
          if (place?.address_components) {
            console.log(place,"place=======")
            let street = "";
            let city = "";
            let postalCode = "";

            place.address_components.forEach((component) => {
              if (component.types.includes("street_number")) {
                street = component.long_name + " " + street;
              }
              if (component.types.includes("route")) {
                street += component.long_name;
              }
              if (component.types.includes("locality")) {
                city = component.long_name;
              }
              if (component.types.includes("postal_code")) {
                postalCode = component.long_name;
              }
            });

            // ✅ update formData and store in one place
            setFormdata((prev) => ({
              ...prev,
              senderStreet: street.trim(),
              sendercity: city,
              senderzipcode: postalCode,
              senderFullAddress: place?.formatted_address,
            }));

            updateSenderData({
              key: "senderDetails",
              value: {
                ...formData,
                senderStreet: street.trim(),
                sendercity: city,
                senderzipcode: postalCode,
                senderFullAddress: place?.formatted_address,
              },
            });
          }
        }}
      />

      <button
        onClick={handleContinue}
        className="w-full py-2 px-4 text-white rounded-3xl hover:bg-[#8F25F8] transition mt-8 font-common"
        style={{ backgroundColor: `var(--button_background)` }}
      >
        Continue
      </button>
    </>
  );
};

export default ServicesLocation;
