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
    invoice?.customer?.name.toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Invoices</h2>
          <div className="flex items-center gap-4">
            <button
              className="bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded-lg px-4 py-2"
              onClick={() => navigate("/")}
            >
              Dashboard
            </button>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4 py-2"
              onClick={() => navigate("/create-invoices")}
            >
              Create Invoice
            </button>
            <div className="flex items-center">
              <input
                type="search"
                className="bg-gray-100 rounded-lg px-4 py-2 w-64 border border-gray-300"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg px-4 py-2 ml-2">
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full bg-white border border-gray-200 ">
            <thead>
              <tr className="bg-indigo-500 text-white">
                <th className="px-6 py-3 text-left font-medium text-gray-600 text-white">
                  Invoice ID
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-600 text-white">
                  Customer
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-600 text-white">
                  Total Amount
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-600 text-white">
                  Payment Status
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-600 text-white">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-600 text-white">
                  Invoice Date
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-600 text-white">
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
                  <td className="px-6 py-4 whitespace-nowrap flex space-x-3">
                    <button
                      className="text-gray-500 hover:text-gray-600 rounded-lg p-2 text-lg cursor-pointer"
                      onClick={() => navigate(`/invoices/${invoice._id}`)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-600 rounded-lg p-2 text-lg cursor-pointer"
                      onClick={() => handleDelete(invoice._id)}
                    >
                      <FaTrash />
                    </button>
                    <button
                      className="text-purple-500 hover:text-purple-600  rounded-lg p-2 text-lg cursor-pointer"
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
