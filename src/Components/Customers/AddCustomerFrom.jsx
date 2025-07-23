import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addCustomer } from "../../Redux/Slice/cutomerAddSlice";

const AddCustomerForm = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.addCustomer);
  const { register, handleSubmit , reset } = useForm();

  const onSubmit = (data) => {
    dispatch(addCustomer(data));
    toast.success("Customer added successfully");
    reset();
  };

  return (
    <>
      <div className="p-8 max-w-6xl mx-auto bg-gray-100 rounded-xl shadow space-y-6">
        <h1 className="text-2xl font-bold text-center ">Add Customer</h1>
        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit(onSubmit)}>
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
              Phone
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              {...register("phone")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              {...register("email")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              GST Number
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              {...register("gstNumber")}
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              defaultValue={""}
              {...register("address")}
            />
          </div>
          <div className="col-span-2 text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              disabled={loading}
            >
              Add Customer
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCustomerForm;

