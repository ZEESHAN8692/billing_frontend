import { toast } from "react-toastify";
import { getPurchases, deletePurchase } from "../../api/apiCalls";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../Components/Spinner/Spinner";
import { useNavigate } from "react-router-dom";

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
      <div className="bg-gray-100 shadow-md rounded p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Purchases</h2>
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
            <button
              className="bg-green-500 text-white rounded p-2 ml-2 cursor-pointer"
              onClick={() => navigate("/add-purchase")}
            >
              Add Purchase
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-b border-gray-200">
            <thead>
              <tr className="bg-[#DADDEC]">
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Supplier</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Purchase Price</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPurchases?.map((purchase) => (
                <tr key={purchase._id} className="border-b border-gray-200">
                  <td className="px-4 py-2">{purchase.product.name}</td>
                  <td className="px-4 py-2">{purchase.supplier}</td>
                  <td className="px-4 py-2">{purchase.quantity}</td>
                  <td className="px-4 py-2">{purchase.purchasePrice}</td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-[#3B58FF] text-white rounded p-2 mr-2 cursor-pointer"
                      onClick={() => toast.warning("code not found")}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white rounded p-2 cursor-pointer"
                      onClick={() => handleDelete(purchase._id)}
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

export default PurchaseTable;
