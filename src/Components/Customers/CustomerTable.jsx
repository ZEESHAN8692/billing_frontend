import React, { useState } from "react";
import { deleteCustomer, getCustomers } from "../../api/apiCalls";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Spinner/Spinner";
import { toast } from "react-toastify";

const CustomerTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { isLoading, data, isError, error, refetch } = useQuery({
    queryKey: ["customer"],
    queryFn: getCustomers,
  });
  if (isLoading) return <Spinner />;
  if (isError) return <div>Error: {error.message}</div>;
  const filteredCustomers = data.data.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (customerId) => {
    try {
      await deleteCustomer(customerId);
      await refetch();
      toast.success("Customer deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="bg-gray-100 shadow-md rounded p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Customers</h2>
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
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b border-gray-200">
                  <td className="px-4 py-2">{customer.name}</td>
                  <td className="px-4 py-2">{customer.email}</td>
                  <td className="px-4 py-2">{customer.phone}</td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-[#3B58FF] text-white rounded p-2 mr-2 cursor-pointer"
                      onClick={() => toast.warning("code not found")}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white rounded p-2 cursor-pointer"
                      onClick={() => handleDelete(customer._id)}
                    >
                      Delete
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

export default CustomerTable;
