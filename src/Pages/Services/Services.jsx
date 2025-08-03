
import CommonLayout from "../CommonLayout/CommonLayout";
import { useStepsStore } from "../../Store/ServicesSteps";
import ServicesList from "./ServicesList";
import ServicesLocation from "./ServicesLocation";
import ServicesInvoice from "./ServicesInvoice";
import ServicesNearestGarage from "./ServicesNearestGarage";
import ResponsiveHeader from "../../MainHeader/Header";
import BookingFor from "../Refrijretorq/Refrerater";
import DeliveryDetails from "../DeliveryLoaction/DeliveryDetails";

const ServicesPage = () => {
  const currentStep = useStepsStore((state) => state.currentStep);
  const setCurrentStep = useStepsStore((state) => state.setCurrentStep);
  const totalSteps = 5;

  return (
    <div className="w-full max-w-xl mx-auto bg-white h-full">
      <ResponsiveHeader />
      <CommonLayout currentStep={currentStep} totalSteps={totalSteps}>
        {currentStep === 1 ? (
          <ServicesList next={() => setCurrentStep(currentStep + 1)} />
        ) :
          currentStep === 2 ? (
            <BookingFor />
          )

            : currentStep === 3 ? (
              <ServicesLocation next={() => setCurrentStep(currentStep + 1)} />
            ) : 
            currentStep ===4?(
              <DeliveryDetails next={() => setCurrentStep(currentStep + 1)}/>
            ):
            
            currentStep === 5 ? (
              <ServicesInvoice next={() => setCurrentStep(currentStep + 1)} />
            ) : (
              <ServicesNearestGarage />
            )}
      </CommonLayout>
    </div>
  );
};

export default ServicesPage;
