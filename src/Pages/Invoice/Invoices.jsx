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
    <>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Invoices</h2>
          <div className="flex items-center gap-6">
            <button
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg px-4 py-2"
              onClick={() => navigate("/")}
            >
              Dashboard
            </button>
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg px-4 py-2"
              onClick={() => navigate("/create-invoices")}
            >
              Create Invoice
            </button>
            <div className="flex items-center">
              <input
                type="search"
                className="bg-gray-200 rounded-lg px-4 py-2 w-72 border border-gray-300"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4 py-2 ml-2">
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left font-medium text-gray-600">
                  Invoice ID
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-600">
                  Customer
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-600">
                  Total Amount
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-600">
                  Payment Status
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-600">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-600">
                  Invoice Date
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices?.map((invoice) => (
                <tr
                  key={invoice._id}
                  className="hover:bg-gray-50 border-b border-gray-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {invoice?.invoiceId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {invoice?.customer.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {invoice?.totalAmount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {invoice?.paymentStatus}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {invoice?.paymentMethod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(invoice?.invoiceDate).toLocaleString("en-GB", {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex space-x-4">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-2"
                      onClick={() => navigate(`/invoices/${invoice._id}`)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white rounded-lg p-2"
                      onClick={() => handleDelete(invoice._id)}
                    >
                      <FaTrash />
                    </button>
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white rounded-lg p-2"
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
