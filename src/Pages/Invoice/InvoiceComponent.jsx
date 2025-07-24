import React, { useRef } from "react";
import "./invoice.scss";
import { getSingleInvoice } from "../../api/apiCalls";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../Components/Spinner/Spinner";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const InvoiceComponent = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["invoice", id],
    queryFn: () => getSingleInvoice(id),
  });
  const invoiceRef = useRef(null);
  const handleDownloadPdf = async () => {
    const element = invoiceRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true, // for logo images etc.
    });

    const dataUrl = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "pt", "a4");

    const imgProps = pdf.getImageProperties(dataUrl);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("invoice.pdf");
  };

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString("en-GB");

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <Spinner />;

  const {
    _id,
    customer: { name, phone, address },
    products,
    totalAmount,
    paymentStatus,
    paymentMethod,
    invoiceDate,
  } = data.data;

  return (
    <>
      <div className="fixed right-[10rem] p-4 z-30">
        <button
          onClick={handleDownloadPdf}
          className="print-button bg-[#ffffff] border px-3 py-1 text-sm rounded shadow hover:bg-[#F3F4F6] cursor-pointer"
        >
          Download PDF
        </button>
      </div>

      <div className="min-h-screen bg-[#F3F4F6] py-10 px-4 flex justify-center">
        <div
          id="invoice"
          className="w-full max-w-3xl bg-[#ffffff] rounded-md shadow-md p-6 relative"
          ref={invoiceRef}
        >
          {/* Header */}
          <div className="bg-[#6366f1] text-[#ffffff] px-6 py-4 rounded-t-md flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              <img src="/logo/logo.png" alt="" className="h-12" />
            </h1>
            <h2 className="text-xl uppercase tracking-widest font-semibold">
              Invoice
            </h2>
          </div>

          {/* Invoice Info */}
          <div className="mt-4 flex justify-between flex-wrap text-sm">
            <div>
              <p className="font-semibold">INVOICE TO :</p>
              <p>{name}</p>
              <p>{phone}</p>
              <p>{address}</p>
            </div>
            <div className="text-right">
              <p>
                <span className="font-semibold">INVOICE ID #:</span>
                {_id.slice(-5)}
              </p>
              <p>
                <span className="font-semibold">DATE :</span>
                {formatDate(invoiceDate)}
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-sm border border-[#e2e8f0]">
              <thead>
                <tr className="bg-[#F3F4F6] text-left">
                  <th className="p-2 border-b border-[#e2e8f0]">SL.</th>
                  <th className="p-2 border-b border-[#e2e8f0]">
                    Item Description
                  </th>
                  <th className="p-2 border-b border-[#e2e8f0]">Price</th>
                  <th className="p-2 border-b border-[#e2e8f0]">Qty</th>
                  <th className="p-2 border-b border-[#e2e8f0]">Tax</th>
                  <th className="p-2 border-b border-[#e2e8f0]">Total</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, idx) => {
                  const { product, quantity, price, taxRate } = item;
                  return (
                    <tr
                      key={item._id || idx}
                      className={idx % 2 === 0 ? "bg-[#f8f7f7]" : ""}
                    >
                      <td className="p-2 border-b border-[#e2e8f0]">
                        {idx + 1}
                      </td>
                      <td className="p-2 border-b border-[#e2e8f0]">
                        {product?.name}
                      </td>
                      <td className="p-2 border-b border-[#e2e8f0]">
                        ₹{price.toFixed(2)}
                      </td>
                      <td className="p-2 border-b border-[#e2e8f0]">
                        {quantity}
                      </td>
                      <td className="p-2 border-b border-[#e2e8f0]">
                        {taxRate}%
                      </td>
                      <td className="p-2 border-b border-[#e2e8f0]">
                        ₹{(price * quantity).toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="mt-6 flex justify-end text-sm">
            <div className="w-1/2 sm:w-1/3">
              <div className="flex justify-between py-1">
                <span className="font-semibold">Sub Total:</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-semibold">Tax:</span>
                <span>Included</span>
              </div>
              <div className="flex justify-between py-1 border-t pt-2 font-bold text-[#5a67d8]">
                <span>Total:</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-sm">
            <p className="font-semibold">Payment Info:</p>
            <p>Payment Status: {paymentStatus}</p>
            <p>Payment Method: {paymentMethod}</p>
          </div>

          {/* Signature */}
          <div className="mt-6">
            <p className="font-bold">Authorised Sign</p>
          </div>

          {/* Conditions */}
          <div className="mt-8 text-xs text-[#718096] border-t pt-4">
            <p>Condition Type: All goods once sold are not returnable.</p>
            <p>Warranty and service are as per the manufacturer’s terms.</p>
          </div>

          {/* Print Button */}
        </div>
      </div>
    </>
  );
};

export default InvoiceComponent;
