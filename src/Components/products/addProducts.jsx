import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addProduct } from "../../Redux/Slice/productAddSlice";

const AddProductsForm = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.addProduct);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    dispatch(addProduct(data));
    toast.success("Product added successfully");
    reset();
  };

  return (
    <>
      <div className="p-8 max-w-6xl mx-auto bg-white rounded-xl shadow-lg space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Add Product
        </h1>
        <form
          className="grid grid-cols-2 gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-gray-900 focus:border-gray-900"
              {...register("name")}
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="sku"
              className="block text-sm font-medium text-gray-700"
            >
              SKU
            </label>
            <input
              type="text"
              id="sku"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-gray-900 focus:border-gray-900"
              {...register("sku")}
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="hsnCode"
              className="block text-sm font-medium text-gray-700"
            >
              HSN Code
            </label>
            <input
              type="text"
              id="hsnCode"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-gray-900 focus:border-gray-900"
              {...register("hsnCode")}
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-gray-900 focus:border-gray-900"
              defaultValue={""}
              {...register("description")}
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              step={0.01}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-gray-900 focus:border-gray-900"
              {...register("price")}
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="taxRate"
              className="block text-sm font-medium text-gray-700"
            >
              Tax Rate
            </label>
            <input
              type="number"
              id="taxRate"
              step={0.01}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-gray-900 focus:border-gray-900"
              {...register("taxRate")}
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="stockQty"
              className="block text-sm font-medium text-gray-700"
            >
              Stock Quantity
            </label>
            <input
              type="number"
              id="stockQty"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-gray-900 focus:border-gray-900"
              {...register("stockQty")}
            />
          </div>
          <div className="col-span-2 text-right">
            <button
              type="submit"
              className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              disabled={loading}
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProductsForm;
