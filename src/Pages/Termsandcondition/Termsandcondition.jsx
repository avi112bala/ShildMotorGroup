import ResponsiveHeader from "../../MainHeader/Header";

export default function Termsandcondition() {
  return (
    <div className="w-full max-w-xl mx-auto h-[730px]  bg-white overflow-y-auto">
      <ResponsiveHeader />
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-4xl overflow-y-auto">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-8">
          Terms & Conditions
        </h1>

        {/* Content */}
        <div className="text-justify space-y-4 text-gray-700 leading-relaxed">
          <p>
            <strong>ATTENTION CARRIER</strong>
          </p>
          <p>
            - THIS RATE IS ALL INCLUSIVE. PLEASE FAX SIGNED COPY OF POD
            IMMEDIATELY AFTER DELIVERY.
          </p>
          <p>- PAYMENT TERMS ARE 45 DAYS FROM RECEIPT OF ORIGINAL INVOICE.</p>
          <p>
            - INVOICE AND POD MUST BE EMAILED TO{" "}
            <a
              href="mailto:accounting@shieldmotorgroup.ca"
              className="text-blue-600 underline"
            >
              ACCOUNTING@SHIELDMOTORGROUP.CA
            </a>{" "}
            AND ORDER NO# MUST BE REFERENCED ON YOUR INVOICE.
          </p>
          <p>- FAILURE TO DELIVER ON TIME WILL RESULT IN A FINE.</p>
          <p>
            - BACK SOLICITATION WILL RESULT IN LEGAL ACTION. DOUBLE BROKERING IS
            NOT PERMITTED AND WILL RESULT IN NON-PAYMENT.
          </p>
          <p>- DRIVER MUST ASSIGN HIMSELF AS SHIELD MOTOR GROUP LIMITED.</p>
          <p>
            - WAITING TIMES AFTER 2 HOURS ON ALL SHIPMENTS [$50/HOUR] SHOULD BE
            SUBMITTED WITHIN 24 HOURS.
          </p>
          <p>
            - ALL ACCESSORIAL CHARGES MUST BE AUTHORIZED BY DISPATCH, BEFORE
            RECEIPT OF INVOICE.
          </p>
          <p>
            - SHIPPER WEIGHT AND COUNT IS ESTIMATE ONLY - DRIVER MUST VERIFY
            PIECE COUNT PER BILL OF LADING.
          </p>
          <p>
            - DELAY, BREAK DOWNS AND ACCIDENT MUST BE REPORTED IMMEDIATELY.
            HOURS OF OPERATION ARE MON THRU FRI 9AM TO 6PM EST. AFTER HOURS
            DISPATCH: 437-236-5653
          </p>
          <p>
            - TRAILER MUST BE CLEAN, DRY, ODOUR FREE AND IN SAFE OPERATING
            CONDITION. PROTECTED SERVICE LOADS MUST BE MAINTAINED AT TEMP PER
            BILL OF LADING.
          </p>
          <p>
            - THERE WILL BE $150 FINE FOR ANY MISSED OR LATE PICKUP OR DELIVERY
            APPOINTMENT.
          </p>
          <p>
            - ALL PO's MENTIONED ON THE DISPATCH SHEET MUST BE PICKED UP WITHOUT
            ANY ISSUE. IF ANY PO IS MISSED IT IS CARRIER RESPONSIBILITY TO
            RECOVER THE PO AND DELIVER TO CUSTOMER AT THEIR OWN COST.
          </p>
          <p>
            - IF THE PO's ARE NOT MATCHING NEED TO CONTACT BROKER OR DISPATCH.
          </p>
        </div>
      </div>
    </div>
  );
}


