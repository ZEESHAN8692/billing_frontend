import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addPurchase } from "../../Redux/Slice/purchaseAddSlice";
import { getProducts } from "../../api/apiCalls";
import { useQuery } from "@tanstack/react-query";

const AddPurchase = () => {
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
      <div className="p-8 max-w-6xl mx-auto bg-gray-100 rounded-xl shadow space-y-6">
        <h1 className="text-2xl font-bold text-center ">Add Purchase</h1>
        <form
          className="grid grid-cols-2 gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Supplier
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              {...register("supplier")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product
            </label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              {...register("product")}
            >
              <option value="">Select Product</option>
              {data?.data?.map((product) => (
                <option value={product._id} key={product._id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              {...register("quantity")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Purchase Price
            </label>
            <input
              type="number"
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              {...register("purchasePrice")}
            />
          </div>
          <div className="col-span-2 text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              disabled={loading}
            >
              Add Purchase
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddPurchase;
