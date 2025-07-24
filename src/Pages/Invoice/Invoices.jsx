import { toast } from "react-toastify";
import { getInvoices, deleteInvoice } from "../../api/apiCalls";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../Components/Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaDownload } from "react-icons/fa";

const Invoices = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { isLoading, data, isError, error, refetch } = useQuery({
    queryKey: ["invoice"],
    queryFn: getInvoices,
  });
  console.log("invoice Data", data);
  if (isLoading) return <Spinner />;
  if (isError) return <div>Error: {error.message}</div>;
  const filteredInvoices = data?.data?.filter((invoice) =>
    invoice.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (invoiceId) => {
    try {
      await deleteInvoice(invoiceId);
      await refetch();
      toast.success("Invoice deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    // <>hhh</>
    <>
      <div className="bg-gray-100 shadow-md rounded p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Invoices</h2>
          <div className="flex items-center">
            <input
              type="search"
              className="bg-gray-100 rounded p-2 w-64 border border-gray-200"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-[#3B58FF] text-white rounded p-2 ml-2 cursor-pointer">
              Search
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-b border-gray-200">
            <thead>
              <tr className="bg-[#DADDEC]">
                <th className="px-4 py-2">Invoice ID</th>
                <th className="px-4 py-2">Customer</th>
                {/* <th className="px-4 py-2">Product</th> */}
                <th className="px-4 py-2">Total Amount</th>
                <th className="px-4 py-2">Payment Status</th>
                <th className="px-4 py-2">Payment Method</th>
                <th className="px-4 py-2">Invoice Date</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices?.map((invoice) => (
                <tr key={invoice._id} className="border-b border-gray-200">
                  <td className="px-4 py-2">{invoice?.invoiceId}</td>
                  <td className="px-4 py-2">{invoice?.customer.name}</td>
                  {/* <td className="px-4 py-2">{invoice?.product.name}</td> */}
                  <td className="px-4 py-2">{invoice?.totalAmount}</td>
                  <td className="px-4 py-2">{invoice?.paymentStatus}</td>
                  <td className="px-4 py-2">{invoice?.paymentMethod}</td>
                  <td className="px-4 py-2">
                    {new Date(invoice?.invoiceDate).toLocaleString("en-GB", {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-[#3B58FF] text-white rounded p-2 mr-2 cursor-pointer"
                      style={{ marginRight: "0.5rem" }}
                      onClick={() => navigate(`/invoices/${invoice._id}`)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="bg-red-500 text-white rounded p-2 mr-2 cursor-pointer"
                      style={{ marginRight: "0.5rem" }}
                      onClick={() => handleDelete(invoice._id)}
                    >
                      <FaTrash />
                    </button>
                    <button
                      className="bg-green-500 text-white rounded p-2 cursor-pointer"
                      onClick={() =>
                        navigate(`/download-invoice/${invoice._id}`)
                      }
                    >
                      <FaDownload />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Invoices;
