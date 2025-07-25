import React, { useState } from "react";
import { getProducts, getCustomers } from "../../api/apiCalls";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createInvoice } from "../../Redux/Slice/invoiceCreateSlice";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const InvoiceForm = () => {
  const navigate = useNavigate();
  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  const { data: customersData, isLoading: customersLoading } = useQuery({
    queryKey: ["customer"],
    queryFn: getCustomers,
  });

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.createInvoice);
  const [customerId, setCustomerId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("Paid");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [items, setItems] = useState([
    { productId: "", price: 0, quantity: 1, tax: 0 },
  ]);
  // console.log("Data Invoice Create", invoice);

  const resetForm = () => {
    setCustomerId("");
    setPaymentStatus("Paid");
    setPaymentMethod("Cash");
    setItems([{ productId: "", price: 0, quantity: 1, tax: 0 }]);
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const addRow = () => {
    setItems([...items, { productId: "", price: 0, quantity: 1, tax: 0 }]);
  };

  const removeRow = (index) => {
    if (items.length === 1) return;
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const calculateTotal = () => {
    return items
      .reduce((total, item) => {
        const lineTotal = item.price * item.quantity;
        const taxAmount = (lineTotal * item.tax) / 100;
        return total + lineTotal + taxAmount;
      }, 0)
      .toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const invoice = {
      customer: customerId,
      products: items.map((item) => ({
        product: item.productId,
        quantity: item.quantity,
        price: item.price,
        taxRate: item.tax,
      })),
      totalAmount: calculateTotal(),
      paymentStatus: paymentStatus,
      paymentMethod: paymentMethod,
      date: new Date().toISOString(),
    };
    try {
     
      dispatch(createInvoice(invoice));
      toast.success("Invoice created successfully!");
      resetForm();
    } catch (err) {
      console.error("Invoice creation failed:", err);
      toast.error(err?.message || "Failed to create invoice.");
    }
  };

  return (
    <div className="min-h-screen  px-4 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-6 rounded shadow w-full max-w-6xl"
      >
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">
          Create Invoice
        </h2>

        {/* Customer Select */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Customer
            </label>
            <select
              className="border border-gray-300 p-3 rounded w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Customer
              </option>
              {!customersLoading &&
                customersData?.data?.map((customer) => (
                  <option key={customer._id} value={customer._id}>
                    {customer.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Status
            </label>
            <select
              className="border border-gray-300 p-3 rounded w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              required
            >
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Method
            </label>
            <select
              className="border border-gray-300 p-3 rounded w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            >
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Credit Card">Credit Card</option>
            </select>
          </div>
        </div>

        {/* Item Table */}
        <table className="w-full text-sm mb-6 border border-gray-300 rounded-lg shadow-lg overflow-hidden">
          <thead className="bg-indigo-500 text-white">
            <tr>
              <th className="p-3 border-r border-indigo-400">#</th>
              <th className="p-3 border-r border-indigo-400">Product</th>
              <th className="p-3 border-r border-indigo-400">Price</th>
              <th className="p-3 border-r border-indigo-400">Qty</th>
              <th className="p-3 border-r border-indigo-400">Tax %</th>
              <th className="p-3 border-r border-indigo-400">Total</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {items.map((item, idx) => (
              <tr key={idx} className="text-center hover:bg-gray-100">
                <td className="border-r border-gray-300 p-3">{idx + 1}</td>
                <td className="border-r border-gray-300 p-2">
                  <select
                    className="w-full p-2  rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={item.productId}
                    onChange={(e) =>
                      handleItemChange(idx, "productId", e.target.value)
                    }
                    required
                  >
                    <option value="" disabled>
                      Select Product
                    </option>
                    {!productsLoading &&
                      productsData?.data?.map((product) => (
                        <option key={product._id} value={product._id}>
                          {product.name}
                        </option>
                      ))}
                  </select>
                </td>
                <td className="border-r border-gray-300 p-2">
                  <input
                    type="number"
                    className="w-full p-2  rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={item.price}
                    onChange={(e) =>
                      handleItemChange(idx, "price", parseFloat(e.target.value))
                    }
                    step="0.01"
                    min="0"
                  />
                </td>
                <td className="border-r border-gray-300 p-2">
                  <input
                    type="number"
                    className="w-full p-2  rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(
                        idx,
                        "quantity",
                        parseInt(e.target.value)
                      )
                    }
                    min="1"
                  />
                </td>
                <td className="border-r border-gray-300 p-2">
                  <input
                    type="number"
                    className="w-full p-2  rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={item.tax}
                    onChange={(e) =>
                      handleItemChange(idx, "tax", parseFloat(e.target.value))
                    }
                    step="0.1"
                    min="0"
                  />
                </td>
                <td className="border-r border-gray-300 p-2 text-right pr-4">
                  ₹
                  {(
                    item.price * item.quantity +
                    (item.price * item.quantity * item.tax) / 100
                  ).toFixed(2)}
                </td>
                <td className="p-2">
                  <button
                    type="button"
                    className="text-2xl hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    onClick={() => removeRow(idx)}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add Item Button */}
        <div className="text-right">
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#615FFF] hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mb-4"
            onClick={addRow}
          >
            + Add Item
          </button>
        </div>

        {/* Total */}
        <hr className="text-gray-300 mb-1.5" />
        <div className="text-right font-bold text-lg text-black mb-4 flex justify-end gap-5 ">
          <span>Grand Total :</span>
          <span> ₹{calculateTotal()}</span>
        </div>

        {/* Submit */}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded shadow-md"
            disabled={loading}
          >
            {loading ? "Invoice Saving..." : "Save Invoice"}
          </button>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow-md"
            onClick={() => {}}
          >
            Save to Download
          </button>
          <button
            type="button"
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded shadow-md"
            onClick={() => navigate("/invoices")}
          >
            Views Invoices
          </button>
          <button
            type="button"
            className="bg-gray-500 hover:bg-gray-700 text-white font-semibold px-6 py-2 rounded shadow-md"
            onClick={() => navigate("/")}
          >
            Dashboard
          </button>
        </div>
      </form>
    </div>
  );
};

export default InvoiceForm;
