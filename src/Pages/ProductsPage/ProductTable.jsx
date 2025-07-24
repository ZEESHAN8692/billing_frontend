import { toast } from "react-toastify";
import { getProducts, deleteProduct } from "../../api/apiCalls";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../Components/Spinner/Spinner";
import { useNavigate } from "react-router-dom";

const ProductTable = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { isLoading, data, isError, error, refetch } = useQuery({
    queryKey: ["product"],
    queryFn: getProducts,
  });
  console.log("product Data", data);
  if (isLoading) return <Spinner />;
  if (isError) return <div>Error: {error.message}</div>;
  const filteredProducts = data?.data?.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      await refetch();
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Products</h2>
          <div className="flex items-center gap-6">
            <input
              type="search"
              className="bg-gray-200 rounded-lg px-4 py-2 w-64 border border-gray-300"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-[#3B58FF] hover:bg-[#2C66F5] text-white font-semibold rounded-lg px-4 py-2"
              onClick={() => navigate("/add-products")}
            >
              Add Product
            </button>
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full">
            <thead className="bg-[#DADDEC]">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">SKU</th>
                <th className="px-4 py-2">HSN Code</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Tax Rate</th>
                <th className="px-4 py-2">Stock Qty</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product._id} className="border-b border-gray-200">
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2">{product.sku}</td>
                  <td className="px-4 py-2">{product.hsnCode}</td>
                  <td className="px-4 py-2">{product.price}</td>
                  <td className="px-4 py-2">{product.taxRate}</td>
                  <td className="px-4 py-2">{product.stockQty}</td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-[#3B58FF] hover:bg-[#2C66F5] text-white font-semibold rounded-lg px-4 py-2 mr-2"
                      onClick={() => toast.warning("code not found")}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg px-4 py-2"
                      onClick={() => handleDelete(product._id)}
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

export default ProductTable;
