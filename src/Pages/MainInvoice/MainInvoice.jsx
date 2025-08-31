import React, { useEffect, useState } from "react";
import { useStepsStore } from "../../Store/ServicesSteps";
import { invoiceStore } from "../../Store/InvoiceData";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import UserService from "../../api/UserServices";
import { FiLoader } from "react-icons/fi";

const MainInvoice = () => {
  const setCurrentStep = useStepsStore((state) => state.setCurrentStep);
  const invoice = invoiceStore((state) => state.invoice);
  const [InvoiceData, setInvoiceDta] = useState([]);
  const [loading, setLoading] = useState(false);

const downloadInvoice = () => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text(`Invoice ${InvoiceData?.invoiceId}`, 14, 20);

  // Date
  doc.setFontSize(12);
  doc.text(`Invoice Date: ${formattedDate}`, 14, 30);
  doc.text(`Balance Due: 07/25/2025`, 14, 37);
  doc.text(`Total: $ ${InvoiceData?.totalAmount?.toFixed(2)}`,14,44);

  // From / Bill To (Side by Side)
  doc.setFontSize(12);
  doc.text("From:", 14, 55);
  doc.text(`${InvoiceData?.senderDetails?.sendername}`, 14, 62);
  doc.text(`${InvoiceData?.senderDetails?.senderStreet}`, 14, 69);
  doc.text(
    `${InvoiceData?.senderDetails?.sendercity}, ${InvoiceData?.senderDetails?.senderzipcode}`,
    14,
    76
  );
  doc.text(`Phone: ${InvoiceData?.senderDetails?.senderphone}`, 14, 83);
  doc.text(`Email: ${InvoiceData?.senderDetails?.senderEmail}`, 14, 90);

  doc.text("Bill To:", 105, 55);
  doc.text(`${InvoiceData?.receiverDetails?.receivername}`, 105, 62);
  doc.text(`${InvoiceData?.receiverDetails?.receiverStreet}`, 105, 69);
  doc.text(
    `${InvoiceData?.receiverDetails?.receivercity}, ${InvoiceData?.receiverDetails?.receiverzipcode}`,
    105,
    76
  );
  doc.text(`Phone: ${InvoiceData?.receiverDetails?.receiverphone}`, 105, 83);
  doc.text(`Email: ${InvoiceData?.receiverDetails?.receiverEmail}`, 105, 90);

  // Pickup / Delivery (Side by Side like above)
  doc.text("Pickup:", 14, 105);
  doc.text(`${InvoiceData?.senderDetails?.senderStreet}`, 14, 112);
  doc.text(
    `${InvoiceData?.senderDetails?.sendercity}, ${InvoiceData?.senderDetails?.senderzipcode}`,
    14,
    119
  );

  doc.text("Delivery:", 105, 105);
  doc.text(`${InvoiceData?.receiverDetails?.receiverStreet}`, 105, 112);
  doc.text(
    `${InvoiceData?.receiverDetails?.receivercity}, ${InvoiceData?.receiverDetails?.receiverzipcode}`,
    105,
    119
  );

  // Table
  autoTable(doc, {
    startY: 130,
    head: [["Item Name", "Type", "Qty", "Amount"]],
    body: [
      [
        InvoiceData?.ServiceData?.title || "",
        `${InvoiceData?.loadingitem} / ${InvoiceData?.secondoption} / ${
          InvoiceData?.secondoptionref
        } ${InvoiceData?.secondoptionref === "cooler"?"":"/"} ${
          InvoiceData?.secondoptionref === "cooler"
            ? ""
            : InvoiceData?.freezervalue
        }`,
        "1",
        `$${InvoiceData?.totalAmount?.toFixed(2)}`,
      ],
    ],
  });

  // Footer
  doc.text(
    "Terms: PAYMENT TERMS ARE 45 DAYS FROM RECEIPT OF ORIGINAL INVOICE.",
    14,
    doc.lastAutoTable.finalY + 7
  );
  doc.text(
    "Invoice and POD must be emailed to accounting@shieldmotorgroup.ca",
    14,
    doc.lastAutoTable.finalY + 14
  );

  // Save PDF
  doc.save(`Invoice_${InvoiceData?.invoiceId}.pdf`);
};



  const ConfirmBooking = async () => {
    setLoading(true);
    const response = await fetch(
      "http://localhost:8080/invoice/confirmbooking",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoiceId: InvoiceData.invoiceId }),
      }
    );
    if (response?.status === 200) {
      console.log(response);
      setLoading(false);
      setCurrentStep(7);
      UserService.showToast("Success!", "Order Booked Successfully!");
    } else {
      setLoading(false);
      UserService.showToastError("Error!", "Order Not Booked!");
    }
  };

  const getinvoicedata = async () => {
    const response = await fetch(
      `http://localhost:8080/invoice/getsingleinvoice/${invoice}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response) {
      const data = await response.json();
      console.log(data?.data);
      setInvoiceDta(data?.data);
    }
  };
  useEffect(() => {
    getinvoicedata();
  }, [invoice]);

  const formattedDate = new Date(InvoiceData?.createdAt).toLocaleDateString(
    "en-GB"
  );
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-white shadow-md rounded-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Invoice {InvoiceData?.invoiceId}
          </h1>
          <p className="text-gray-600">Invoice Date: {formattedDate}</p>
        </div>
        <div className="mt-4 sm:mt-0 text-right">
          <p className="text-gray-800 font-semibold">Balance Due: 07/25/2025</p>
          <p className="text-lg font-bold text-green-600">
            ${InvoiceData?.totalAmount?.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Company Info */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-700">From:</h2>
          <p>{InvoiceData?.senderDetails?.sendername}</p>
          <p>{InvoiceData?.senderDetails?.senderStreet}</p>
          <p>{InvoiceData?.senderDetails?.sendercity}</p>
          <p>{InvoiceData?.senderDetails?.senderzipcode}</p>
          <p>Phone No: {InvoiceData?.senderDetails?.senderphone}</p>
          <p>Email: {InvoiceData?.senderDetails?.senderEmail}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-700">Bill To:</h2>
          <p>{InvoiceData?.receiverDetails?.receivername}</p>
          <p>{InvoiceData?.receiverDetails?.receiverStreet}</p>
          <p>{InvoiceData?.receiverDetails?.receivercity}</p>
          <p>{InvoiceData?.receiverDetails?.receiverzipcode}</p>
          <p>Phone No: {InvoiceData?.receiverDetails?.receiverphone}</p>
          <p>Email: {InvoiceData?.receiverDetails?.receiverEmail}</p>
        </div>
      </div>

      {/* Delivery Details */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          Pickups & Deliveries
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="font-semibold">Pickup:</p>
            <p>{InvoiceData?.senderDetails?.senderStreet}</p>
            <p>{InvoiceData?.senderDetails?.sendercity}</p>
            <p>{InvoiceData?.senderDetails?.senderzipcode}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="font-semibold">Delivery:</p>
            <p>{InvoiceData?.receiverDetails?.receiverStreet}</p>
            <p>{InvoiceData?.receiverDetails?.receivercity}</p>
            <p>{InvoiceData?.receiverDetails?.receiverzipcode}</p>
          </div>
        </div>
      </div>

      {/* Item Table */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-3 border-b">Item Name</th>
              <th className="text-left p-3 border-b">Type</th>
              <th className="text-left p-3 border-b">Qty</th>
              <th className="text-left p-3 border-b">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border-b">
                {" "}
                {InvoiceData?.ServiceData?.title}
              </td>
              <td className="p-3 border-b">
                {InvoiceData?.loadingitem}
                <br /> {InvoiceData?.secondoption}
                <br />
                {InvoiceData?.secondoptionref}
                <br />
                {InvoiceData?.secondoptionref === "cooler"
                  ? ""
                  : InvoiceData?.freezervalue}
              </td>
              <td className="p-3 border-b">1</td>
              <td className="p-3 border-b">
                ${InvoiceData?.totalAmount?.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Terms */}
      <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-600">
        <p>
          <strong>Terms:</strong> PAYMENT TERMS ARE 45 DAYS FROM RECEIPT OF
          ORIGINAL INVOICE.
        </p>
        <p>
          Invoice and POD must be emailed to{" "}
          <span className="text-blue-600">accounting@shieldmotorgroup.ca</span>{" "}
          and order number must be referenced.
        </p>
        <p>Failure to deliver on time will result in a fine.</p>
      </div>

      {/* Footer */}
      <div className="mt-6 text-center text-gray-500 text-sm mb-5">
        Thank you for your business!
      </div>

      <button
        onClick={ConfirmBooking}
        className="w-full py-2 px-4 rounded-3xl  text-white font-bold transition mb-2 font-common cursor-pointer  items-center"
        style={{ backgroundColor: `var(--button_background)` }}
      >
        {loading ? <FiLoader className="animate-spin" /> : " Confirm Booking"}
      </button>

      {/* Download Invoice Button */}
      <button
        onClick={downloadInvoice}
        className="w-full py-2 px-4 rounded-3xl text-white font-bold transition font-common cursor-pointer"
        style={{ backgroundColor: `var(--button_background)` }}
      >
        Download Invoice (PDF)
      </button>
    </div>
  );
};

export default MainInvoice;
