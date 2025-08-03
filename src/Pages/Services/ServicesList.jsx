
import { useEffect, useState } from "react";
import WelcomeText from "../CommonLayout/WelcomeText";
import { Persongif, Service1, Service2 } from "../../Media/Media";
import {  useStepsStore } from "../../Store/ServicesSteps";


const ServicesList = ({ next }) => {
  const [hasBookings, setHasBookings] = useState(false);
  const [bookings, setBookings] = useState([]);

  const setCurrentStep = useStepsStore((state) => state.setCurrentStep);
  const updateSenderData=useStepsStore((state)=>state.updateSenderData)


  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getBookingList();
        const relevantBookings = response.data.data.filter(
          (booking) =>
            booking.bookingStatus === "inProgress" ||
            booking.bookingStatus === "pending" ||
            booking.bookingStatus === "toDispatcher"
        );

        if (relevantBookings.length > 0) {
          setHasBookings(true);
          setBookings(relevantBookings);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);
  useEffect(() => {
    sessionStorage.removeItem("Bookedcomplete");

  }, []);

  const serviceList=[
    {
      title:"Refrigerated Division",
      logo:Service1
    },
    {
      title:"Dry Division",
      logo:Service2
    },
  ]


  const selectService=(Service)=>{
    updateSenderData({key:"ServiceData",value:Service})
    setCurrentStep(2)
    
  }



  return (
    <div
      className="max-h-[100%]  h-[80vh] overflow-y-auto bg-white  sm:max-h-none sm:overflow-visible pb-8 xs:pb-24 sm:pb-4"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <div className="w-full p-4 md:p-6">     
          <div className="flex flex-row items-start justify-start gap-2 w-full px-2">
            <img src={Persongif} className="w-12 sm:w-16 mt-1 shrink-0" />
            <div className="flex-1">
              <WelcomeText text="Welcome to Shield Motor Group!!! We are here to help you out, please select one of the following." />
            </div>
          </div>

        <div className="mt-10">
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
            {serviceList?.map((service, index) => (
              <div
                key={index}
                onClick={() => selectService(service)}
                className="flex flex-col items-center justify-center p-2 transition-transform hover:scale-105 cursor-pointer"
              >
                <div className="p-4 rounded-full h-20 w-20 sm:h-24 sm:w-24 flex items-center justify-center mb-2" style={{backgroundColor:`var(--button_background)`}}>
                  <img src={service.logo} alt={service.title} className="w-16 h-16 sm:w-16 sm:h-16 rounded-full" />
                </div>
                <h2 className="capitalize text-xs sm:text-sm text-center font-medium">{service.title}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesList;
