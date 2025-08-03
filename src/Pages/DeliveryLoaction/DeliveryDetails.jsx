import { useEffect, useState } from "react";
import { useStepsStore } from "../../Store/ServicesSteps";
import { PickupLocation } from "../Services/PickupLocation";

const DeliveryDetails = () => {
  const setCurrentLocation = useStepsStore((state) => state.setCurrentLocation);
  const updateSenderData=useStepsStore((state)=>state.updateSenderData);
  const senderdata=useStepsStore((state)=>state.senderdata)
  const setCurrentStep = useStepsStore((state) => state.setCurrentStep);

  const [formData, setFormdata] = useState({
    receivername: "",
    receiverphone: "",
    receiverEmail: "",
    receiverStreet: "",
    receivercity: "",
    receiverzipcode: ""
  })

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormdata((prev)=>({
      ...prev,
      [name]:value
    }))
  }
  useEffect(()=>{
    updateSenderData({key:"receiverDetails",value:formData})
  },[formData])

  const handleContinue=()=>{
    setCurrentStep(5)
  }

  console.log(senderdata,"senderdatasenderdata");
  
  return (
    <>
    <h2 className="font-semibold text-md text-center mb-4">Enter Delivery Details</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">      
        <div>
          <lable className="block text-gray-700">Name</lable>
          <input type="text" name="receivername" value={formData.receivername} className="w-full px-4 py-2 border rounded-md" onChange={handleChange} placeholder="Enter Name..."/>
        </div>
        <div>
          <lable className="block text-gray-700">Phone</lable>
          <input type="number"  name="receiverphone" value={formData?.receiverphone} className="w-full px-4 py-2 border rounded-md" onChange={handleChange} placeholder="Enter Phone Number..."/>
        </div>
        <div>
          <lable className="block text-gray-700">Email</lable>
          <input type="email" name="receiverEmail" value={formData?.receiverEmail} className="w-full px-4 py-2 border rounded-md" onChange={handleChange} placeholder="Enter Email..."/>
        </div>
        <div>
          <lable className="block text-gray-700">Street</lable>
          <input type="text" name="receiverStreet" value={formData?.receiverStreet} className="w-full px-4 py-2 border rounded-md" onChange={handleChange} placeholder="Enter Street..."/>
        </div>
        <div>
          <lable className="block text-gray-700">City</lable>
          <input type="text" name="receivercity" value={formData?.receivercity} className="w-full px-4 py-2 border rounded-md" onChange={handleChange} placeholder="Enter City..."/>
        </div>
        <div>
          <lable className="block text-gray-700">Zip Code</lable>
          <input type="text" name="receiverzipcode" value={formData?.receiverzipcode} className="w-full px-4 py-2 border rounded-md" onChange={handleChange} placeholder="Enter Zip Code..."/>
        </div>
      </div>
      <PickupLocation
          from="pickup"
          label="Pickup Location"
          onLocationSelect={(location) => {
            setCurrentLocation(location);
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

export default DeliveryDetails;