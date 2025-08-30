import { useStepsStore } from "../../Store/ServicesSteps";
import { secondoptionref, vehicleInfo } from "../../Utils/Servicedata";

const BookingFor = () => {
  const senderdata = useStepsStore((state) => state.senderdata);
  const updateSenderData = useStepsStore((state) => state.updateSenderData);
  const setCurrentStep = useStepsStore((state) => state.setCurrentStep);
  const senderData = useStepsStore((state) => state.senderdata);
  const handleSubmit = () => {
    setCurrentStep(3);
  };
  console.log(senderData, "senderData");

  return (
    <div
      className="max-h-[100dvh] overflow-y-auto pb-12 sm:max-h-none sm:overflow-visible sm:pb-0  xs:pb-24"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <h2 className="mb-4 font-bold text-lg text-center">{`Select ${senderData?.ServiceData?.title} Services`}</h2>
      <h5 className="text-md font-medium text-black mb-4 font-common">
        choose one of the method
      </h5>
      <div className="relative mb-4">
        <select
          id="vehicleType"
          value={senderdata?.loadingitem}
          onChange={(e) => {
            updateSenderData({ key: "loadingitem", value: e.target.value });
          }}
          className="w-full  appearance-none bg-[#F8F8F8] text-black py-2 px-4 pr-10 border border-[#ccc] rounded-2xl focus:outline-none focus:ring-2 font-common"
        >
          <option value="" disabled className="">
            Select an option
          </option>
          {vehicleInfo.map((item) => (
            <option key={item.id} value={item.type} className="font-common">
              {item.type}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      {senderdata?.loadingitem === "Full Truck Load(FTL)" && (
        <>
          <h6 className="font-medium text-md font-common mb-4">
            Choose the options
          </h6>
          <div className="flex items-center gap-4 mb-4">
            <button
              className="w-full py-2 px-4  md:w-96 rounded-3xl shadow-md buttononlyhover transition font-common"
              onClick={() => {
                updateSenderData({ key: "secondoption", value: "triaxle" });
              }}
              style={{
                backgroundColor:
                  senderdata?.secondoption === "triaxle"
                    ? "var(--button_background)"
                    : "#ffffff",
                color:
                  senderdata?.secondoption === "triaxle"
                    ? "#ffffff"
                    : "#000000",
              }}
            >
              Tri-axle
            </button>
            <button
              className="w-full py-2 px-4 buttonhover rounded-3xl bg-transparent border-2  hover:text-black  transition md:w-96 font-common"
              onClick={() => {
                updateSenderData({ key: "secondoption", value: "tendemaxle" });
              }}
              style={{
                backgroundColor:
                  senderdata?.secondoption === "tendemaxle"
                    ? "var(--button_background)"
                    : "#ffffff",
                color:
                  senderdata?.secondoption === "tendemaxle"
                    ? "#ffffff"
                    : "#000000",
              }}
            >
              tandem axle
            </button>
          </div>
        </>
      )}

      {senderdata?.ServiceData?.title !== "Dry Division" && (
        <div className="relative mb-4">
          <select
            id="vehicleType"
            value={senderdata?.secondoptionref}
            onChange={(e) => {
              updateSenderData({
                key: "secondoptionref",
                value: e.target.value,
              });
            }}
            className="w-full appearance-none bg-[#F8F8F8] text-black py-2 px-4 pr-10 border border-[#ccc] rounded-2xl focus:outline-none focus:ring-2 font-common"
          >
            <option value="" disabled>
              Select an option
            </option>
            {secondoptionref.map((item) => (
              <option key={item.id} value={item.type} className="font-common">
                {item.type}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      )}
      {senderdata?.secondoptionref === "freezer" && (
        <>
          <h6 className="font-medium text-md font-common mb-2 mt-2">
            Choose the options
          </h6>
          <div className="flex items-center gap-4 mb-4">
            <button
              className="w-full py-2 px-4  md:w-96 rounded-3xl shadow-md buttononlyhover transition font-common"
              onClick={() => {
                updateSenderData({ key: "freezervalue", value: "fresh" });
              }}
              style={{
                backgroundColor:
                  senderdata?.freezervalue === "fresh"
                    ? "var(--button_background)"
                    : "#ffffff",
                color:
                  senderdata?.freezervalue === "fresh" ? "#ffffff" : "#000000",
              }}
            >
              Fresh
            </button>
            <button
              className="w-full py-2 px-4 buttonhover rounded-3xl bg-transparent border-2  hover:text-black  transition md:w-96 font-common"
              onClick={() => {
                updateSenderData({
                  key: "freezervalue",
                  value: "frozen",
                });
              }}
              style={{
                backgroundColor:
                  senderdata?.freezervalue === "frozen"
                    ? "var(--button_background)"
                    : "#ffffff",
                color:
                  senderdata?.freezervalue === "frozen" ? "#ffffff" : "#000000",
              }}
            >
              Frozen
            </button>
          </div>
        </>
      )}

      <button
        onClick={handleSubmit}
        className="w-full py-2 px-4 rounded-3xl  text-white font-bold transition mb-2 font-common cursor-pointer"
        style={{ backgroundColor: `var(--button_background)` }}
      >
        Continue
      </button>
    </div>
  );
};

export default BookingFor;
