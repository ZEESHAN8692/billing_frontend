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
      <div className="p-8 max-w-6xl mx-auto bg-gray-100 rounded-xl shadow space-y-6">
        <h1 className="text-2xl font-bold text-center ">Add Product</h1>
        <form
          className="grid grid-cols-2 gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              {...register("name")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              SKU
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              {...register("sku")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              HSN Code
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              {...register("hsnCode")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              defaultValue={""}
              {...register("description")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              step={0.01}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              {...register("price")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tax Rate
            </label>
            <input
              type="number"
              step={0.01}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              {...register("taxRate")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stock Quantity
            </label>
            <input
              type="number"
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              {...register("stockQty")}
            />
          </div>
          <div className="col-span-2 text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
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
