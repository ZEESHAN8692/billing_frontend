import { toast } from "react-toastify";
import { getPurchases, deletePurchase } from "../../api/apiCalls";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../Components/Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

const PurchaseTable = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { isLoading, data, isError, error, refetch } = useQuery({
    queryKey: ["purchase"],
    queryFn: getPurchases,
  });
  console.log("purchase Data", data);
  if (isLoading) return <Spinner />;
  if (isError) return <div>Error: {error.message}</div>;
  const filteredPurchases = data?.data?.filter((purchase) =>
    purchase.product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (purchaseId) => {
    try {
      await deletePurchase(purchaseId);
      await refetch();
      toast.success("Purchase deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Purchases</h2>
          <div className="flex items-center gap-6">
            <button
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg px-4 py-2"
              onClick={() => navigate("/")}
            >
              Dashboard
            </button>
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg px-4 py-2"
              onClick={() => navigate("/add-purchase")}
            >
              Add Purchase
            </button>

            <input
              type="search"
              className="bg-gray-200 rounded-lg px-4 py-2 w-64 border border-gray-300"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4 py-2"
              onClick={() => refetch()}
            >
              Search
            </button>
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full">
            <thead className="bg-indigo-500 text-white">
              <tr>
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Supplier</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Purchase Price</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPurchases?.map((purchase) => (
                <tr
                  key={purchase._id}
                  className="border-b border-gray-200 hover:bg-[#F5F5F5]"
                >
                  <td className="px-4 py-2">{purchase.product.name}</td>
                  <td className="px-4 py-2">{purchase.supplier}</td>
                  <td className="px-4 py-2">{purchase.quantity}</td>
                  <td className="px-4 py-2">{purchase.purchasePrice}</td>
                  <td className="px-4 py-2 flex items-center gap-2">
                    <button
                      className="text-green-500 hover:text-green-700 font-semibold rounded-lg px-4 py-2 text-lg"
                      onClick={() => navigate(`/purchase/${purchase._id}`)}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="text-[#3B58FF] hover:text-[#2C66F5] font-semibold rounded-lg px-4 py-2 text-lg"
                      onClick={() => navigate(`/update-purchase/${purchase._id}`)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-600 font-semibold rounded-lg px-4 py-2 text-lg"
                      onClick={() => handleDelete(purchase._id)}
                    >
                      <FaTrash />
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

export default PurchaseTable;
