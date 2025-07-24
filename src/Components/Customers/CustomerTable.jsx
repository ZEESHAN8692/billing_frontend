import React, { useState } from "react";
import { deleteCustomer, getCustomers } from "../../api/apiCalls";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Spinner/Spinner";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Customers</h2>
          <div className="flex items-center gap-6">
            <Link to="/">
              <button className="bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg px-4 py-2">
                Dashboard
              </button>
            </Link>
            <Link to="/add-customers">
              <button className="bg-[#3B58FF] hover:bg-[#2C66F5] text-white font-semibold rounded-lg px-4 py-2">
                Add Customer
              </button>
            </Link>
            <input
              type="search"
              className="bg-gray-200 rounded-lg px-4 py-2 w-64 border border-gray-300"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-[#3B58FF] hover:bg-[#2C66F5] text-white font-semibold rounded-lg px-4 py-2"
              onClick={() => refetch()}
            >
              Search
            </button>
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full">
            <thead className="bg-[#DADDEC]">
              <tr>
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
                      className="bg-[#3B58FF] hover:bg-[#2C66F5] text-white font-semibold rounded-lg px-4 py-2 mr-2"
                      onClick={() => toast.warning("code not found")}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-semibold rounded-lg px-4 py-2"
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
