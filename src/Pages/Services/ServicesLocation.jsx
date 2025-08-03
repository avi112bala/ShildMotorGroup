import { useEffect, useState } from "react";
import { useStepsStore } from "../../Store/ServicesSteps";
import { PickupLocation } from "./PickupLocation";

const ServicesLocation = () => {
  const setCurrentLocation = useStepsStore((state) => state.setCurrentLocation);
  const updateSenderData=useStepsStore((state)=>state.updateSenderData);
  const senderdata=useStepsStore((state)=>state.senderdata)
  const setCurrentStep = useStepsStore((state) => state.setCurrentStep);

  const [formData, setFormdata] = useState({
    sendername: "",
    senderphone: "",
    senderEmail: "",
    senderStreet: "",
    sendercity: "",
    senderzipcode: ""
  })

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormdata((prev)=>({
      ...prev,
      [name]:value
    }))
  }
  useEffect(()=>{
    updateSenderData({key:"senderDetails",value:formData})
  },[formData])

  const handleContinue=()=>{
    setCurrentStep(4)

  }

  console.log(senderdata,"senderdatasenderdata");
  
  return (
    <>
    <h2 className="font-semibold text-md text-center mb-4">Enter Shipper Details</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">      
        <div>
          <lable className="block text-gray-700">Name</lable>
          <input type="text" name="sendername" value={formData.sendername} className="w-full px-4 py-2 border rounded-md" onChange={handleChange} placeholder="Enter Name..."/>
        </div>
        <div>
          <lable className="block text-gray-700">Phone</lable>
          <input type="number"  name="senderphone" value={formData?.senderphone} className="w-full px-4 py-2 border rounded-md" onChange={handleChange} placeholder="Enter Phone Number..."/>
        </div>
        <div>
          <lable className="block text-gray-700">Email</lable>
          <input type="email" name="senderEmail" value={formData?.senderEmail} className="w-full px-4 py-2 border rounded-md" onChange={handleChange} placeholder="Enter Email..."/>
        </div>
        <div>
          <lable className="block text-gray-700">Street</lable>
          <input type="text" name="senderStreet" value={formData?.senderStreet} className="w-full px-4 py-2 border rounded-md" onChange={handleChange} placeholder="Enter Street..."/>
        </div>
        <div>
          <lable className="block text-gray-700">City</lable>
          <input type="text" name="sendercity" value={formData?.sendercity} className="w-full px-4 py-2 border rounded-md" onChange={handleChange} placeholder="Enter City..."/>
        </div>
        <div>
          <lable className="block text-gray-700">Zip Code</lable>
          <input type="text" name="senderzipcode" value={formData?.senderzipcode} className="w-full px-4 py-2 border rounded-md" onChange={handleChange} placeholder="Enter Zip Code..."/>
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

export default ServicesLocation;