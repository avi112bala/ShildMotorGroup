import React, { useEffect, useState } from 'react'
import { useStepsStore } from '../../Store/ServicesSteps';
import { invoiceStore } from '../../Store/InvoiceData';
import UserService from '../../api/UserServices';

const ServicesInvoice = () => {
  const [loading,setLoading]=useState(false)
  const [totalmiles,setTotalmiles]=useState("")
  const [totaltime, setTotaltime] = useState("");
    const senderdata=useStepsStore((state)=>state.senderdata)
    const setCurrentStep = useStepsStore((state) => state.setCurrentStep);
    const setInvoice = invoiceStore((state) => state.setInvoice);
    const updateSenderData = useStepsStore((state) => state.updateSenderData);

  console.log(senderdata,"allcontextdata");
  console.log(totaltime, "totaltime");
  

  function getDistance(origin, destination, callback) {
    if (!window.google) return;

    const service = new window.google.maps.DistanceMatrixService();

    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === "OK" && response) {
          const result = response.rows[0].elements[0];
          const distance = result.distance.text;
          const duration = result.duration.text;
           const durationValue = result.duration.value;
            const hours = (durationValue / 3600).toFixed(2);
          callback({ distance, duration,totalhours:hours });
        } else {
          console.error("DistanceMatrix failed:", status);
        }
      }
    );
  }


  // Example usage:
getDistance(
  senderdata?.senderDetails?.senderFullAddress,
  senderdata?.receiverDetails?.receiverFullAddress,
  (res) => {
    setTotalmiles(res.distance);
    setTotaltime(res.totalhours);
    console.log("Distance:", res.distance, "Duration:", res.duration);
  }
);


  // const totalamount=()=>{    
  //  const miles = parseFloat(totalmiles.replace(/,/g, "")) * 0.621371;

  //   let amount = 0;
  //   if (
  //     senderdata?.ServiceData?.title === "Refrigerated Division" &&
  //     senderdata?.secondoption === "triaxle"
  //   ) {
  //      amount=3.50*miles
  //   }else if(  senderdata?.ServiceData?.title === "Refrigerated Division" &&
  //     senderdata?.secondoption === "tendemaxle"){
  //        amount=3.00*miles;
  //     }else if (
  //       senderdata?.ServiceData?.title === "Dry Division" &&
  //       senderdata?.secondoption === "triaxle"
  //     ) {
  //        amount=3.25*miles;
  //     }else{
  //        amount = 2.75 * miles;
  //     }
  //      updateSenderData({ key: "totalAmount", value: amount?.toFixed(2) });
  //      return amount
  // }

 const totalamount = () => {
   const miles = parseFloat(totalmiles.replace(/,/g, "")) * 0.621371;
   console.log(miles,"miles");
   
   let amount = 0;

   if (miles > 0 && miles <= 200) {
     // hourly rate instead of per-mile
     amount = totaltime * 80; // totaltime = hours from DistanceMatrix
   } else if (miles > 350 && miles <= 400) {
     amount = 3.5 * miles;
   } else if (miles > 400 && miles <= 1000) {
     amount = 3.0 * miles;
   } else if (miles > 1000) {
     // pick a base rate, e.g. $2.80
     amount = 2.8 * miles;
   }

   // Service-specific adjustments
   if (
     senderdata?.ServiceData?.title === "Refrigerated Division" &&
     senderdata?.secondoption === "tendemaxle"
   ) {
     amount = 3.0 * miles;
   } else if (
     senderdata?.ServiceData?.title === "Dry Division" &&
     senderdata?.secondoption === "triaxle"
   ) {
     amount = 3.25 * miles;
   } else {
     // default fallback
     amount = amount || 2.75 * miles;
   }

   updateSenderData({ key: "totalAmount", value: amount?.toFixed(2) });
   return amount;
 };


  useEffect(()=>{
    totalamount()
  },[])
  
  if (!senderdata) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading details...
      </div>
    );
  }
    const {
      ServiceData,
      loadingitem,
      receiverDetails,
      secondoption,
      secondoptionref,
      senderDetails,
    } = senderdata;

      const handleCancel = () => {
        setCurrentStep(6);
      };

        const creatinvoice = async () => {
          setLoading(true);
          const response = await fetch(
            "https://smgserver.onrender.com/invoice/createinvoice",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                Invoicedata: senderdata,
              }),
            }
          );

          if (response) {
             UserService.showToast("Success!", "Invoice Created Successfully!");
            const data = await response.json();
            console.log(data?.data, "response=====");
            setInvoice(data?.data?.invoice?.invoiceId);
            setCurrentStep(6);
            setLoading(false);
          }
        };
  
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Order Details
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Details */}
        <div className="bg-white shadow-lg rounded-xl p-5 hover:shadow-xl transition">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2 text-gray-700">
            Product Details
          </h2>
          <p>
            {/* <img className="w-10 h-10 rounded-full" src={ServiceData?.logo} /> */}
            <span className="font-medium">Service:</span> {ServiceData?.title}
          </p>
          <p>
            <span className="font-medium">Loding Type:</span>{" "}
            {loadingitem ?? "--"}
          </p>
          {loadingitem === "Full Truck Load(FTL)" ? (
            <p>
              <span className="font-medium">Full Load Option:</span>{" "}
              {secondoption}
            </p>
          ) : (
            ""
          )}
          <p>
            <span className="font-medium">Colling Type:</span>{" "}
            {secondoptionref ?? "--"}
          </p>
        </div>

        {/* Sender Details */}
        <div className="bg-white shadow-lg rounded-xl p-5 hover:shadow-xl transition">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2 text-gray-700">
            Sender Details
          </h2>
          <p>
            <span className="font-medium">Name:</span>{" "}
            {senderDetails?.sendername}
          </p>
          <p>
            <span className="font-medium">Phone:</span>{" "}
            {senderDetails?.senderphone}
          </p>
          <p>
            <span className="font-medium">Email:</span>{" "}
            {senderDetails?.senderEmail}
          </p>
          <p>
            <span className="font-medium">Address:</span>{" "}
            {senderDetails?.senderStreet}
          </p>
        </div>

        {/* Receiver Details */}
        <div className="bg-white shadow-lg rounded-xl p-5 hover:shadow-xl transition">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2 text-gray-700">
            Receiver Details
          </h2>
          <p>
            <span className="font-medium">Name:</span>{" "}
            {receiverDetails?.receivername}
          </p>
          <p>
            <span className="font-medium">Phone:</span>{" "}
            {receiverDetails?.receiverphone}
          </p>
          <p>
            <span className="font-medium">Email:</span>{" "}
            {receiverDetails?.receiverEmail}
          </p>
          <p>
            <span className="font-medium">Address:</span>{" "}
            {receiverDetails?.receivercity}
          </p>
        </div>
      </div>

      <button
        onClick={()=>creatinvoice()}
        className="w-full py-2 px-4 rounded-3xl  text-white font-bold transition mb-2 font-common cursor-pointer"
        style={{ backgroundColor: `var(--button_background)` }}
      >
        Continue
      </button>
      <button
        onClick={handleCancel}
        className="w-full py-2 px-4 rounded-3xl  text-white font-bold transition mb-2 font-common cursor-pointer"
        style={{ backgroundColor: `var(--cancel_Button_background)` }}
      >
        Cancel
      </button>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-20">
          {/* <img src="/images/towber.gif" alt="Loading" className="w-24" /> */}
          <img src="/images/towingknox.gif" alt="Loading" className="w-24" />
        </div>
      )}
    </div>
  );
}

export default ServicesInvoice