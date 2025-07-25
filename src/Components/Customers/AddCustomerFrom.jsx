import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addCustomer } from "../../Redux/Slice/cutomerAddSlice";
import { Link } from "react-router-dom";

const AddCustomerForm = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.addCustomer);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    dispatch(addCustomer(data));
    toast.success("Customer added successfully");
    reset();
  };

  return (
    <>
      <div className="p-8 max-w-6xl mx-auto bg-white rounded-xl shadow space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Add Customer
        </h1>
        <form
          className="grid grid-cols-2 gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-gray-900 focus:border-gray-900"
              {...register("name")}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-gray-900 focus:border-gray-900"
              {...register("phone")}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-gray-900 focus:border-gray-900"
              {...register("email")}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              GST Number
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-gray-900 focus:border-gray-900"
              {...register("gstNumber")}
            />
          </div>

          <div className="col-span-2 space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-gray-900 focus:border-gray-900"
              {...register("address")}
            />
          </div>

          <div className="col-span-2 text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={loading}
            >
              Add Customer
            </button>
          </div>
        </form>

        {/* Navigation Buttons */}
        <div className="col-span-2 text-left mt-4">
          <Link to="/customers">
            <button
              type="button"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              View Customers
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

export default AddCustomerForm;
