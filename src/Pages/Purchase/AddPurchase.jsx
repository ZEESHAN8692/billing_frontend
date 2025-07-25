import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addPurchase } from "../../Redux/Slice/purchaseAddSlice";
import { getProducts } from "../../api/apiCalls";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AddPurchase = () => {
  const navigate = useNavigate();
  // product fetch
  const { data } = useQuery({
    queryKey: ["product"],
    queryFn: getProducts,
  });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.addPurchase);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    dispatch(addPurchase(data));
    if (error) {
      toast.error(error);
    }
    toast.success("Purchase added successfully");
    reset();
  };

  return (
    <>
      <div className="p-8 max-w-6xl mx-auto bg-white rounded-xl shadow space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Add Purchase
        </h1>
        <form
          className="grid grid-cols-2 gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Supplier
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-gray-900 focus:border-gray-900"
              {...register("supplier", { required: true })}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Product
            </label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-gray-900 focus:border-gray-900"
              {...register("product" )}
            >
              <option value="">Select Product</option>
              {data?.data?.map((product) => (
                <>
                  <option value={product._id} key={product._id}>
                    {product.name}
                  </option>
                  <button
                    type="button"
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-2"
                    onClick={() => navigate(`/add-purchase/${product._id}`)}
                  >
                    Add Purchase
                  </button>
                </>

              ))}
            </select>
           
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-gray-900 focus:border-gray-900"
              {...register("quantity")}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Purchase Price
            </label>
            <input
              type="number"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-gray-900 focus:border-gray-900"
              {...register("purchasePrice")}
            />
          </div>
          <div className="col-span-2 text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={loading}
            >
              Add Purchase
            </button>
          </div>
        </form>
        <div className="col-span-2 text-left mt-4">
          <Link to="/purchase-order">
            <button
              type="button"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              View Purchases
            </button>
          </Link>
          <Link to="/">
            <button
              type="button"
              className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ml-4"
            >
              Dashboard
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AddPurchase;
