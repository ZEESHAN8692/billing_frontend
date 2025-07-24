import React, { useState } from "react";
import { getProducts, getCustomers } from "../../api/apiCalls";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createInvoice } from "../../Redux/Slice/invoiceCreateSlice";

const InvoiceForm = () => {
  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  const { data: customersData, isLoading: customersLoading } = useQuery({
    queryKey: ["customer"],
    queryFn: getCustomers,
  });

  const dispatch = useDispatch();
  const { loading, success } = useSelector((state) => state.createInvoice);
  const [customerId, setCustomerId] = useState("");
  const [items, setItems] = useState([
    { productId: "", price: 0, quantity: 1, tax: 0 },
  ]);

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
      paymentStatus: "Paid",
      paymentMethod: "Cash",
      date: new Date().toISOString(),
    };

    dispatch(createInvoice(invoice));

    console.log("Invoice Data:", invoice);
    toast.success("Invoice created! Check console.");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-4xl"
      >
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">
          Create Invoice
        </h2>

        {/* Customer Select */}
        <div className="mb-6">
          <select
            className="border p-2 rounded w-full"
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

        {/* Item Table */}
        <table className="w-full text-sm mb-6 border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Product</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Qty</th>
              <th className="p-2 border">Tax %</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx} className="text-center">
                <td className="border p-2">{idx + 1}</td>
                <td className="border p-1">
                  <select
                    className="w-full p-1 border rounded"
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
                <td className="border p-1">
                  <input
                    type="number"
                    className="w-full p-1 border rounded"
                    value={item.price}
                    onChange={(e) =>
                      handleItemChange(idx, "price", parseFloat(e.target.value))
                    }
                    step="0.01"
                    min="0"
                  />
                </td>
                <td className="border p-1">
                  <input
                    type="number"
                    className="w-full p-1 border rounded"
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
                <td className="border p-1">
                  <input
                    type="number"
                    className="w-full p-1 border rounded"
                    value={item.tax}
                    onChange={(e) =>
                      handleItemChange(idx, "tax", parseFloat(e.target.value))
                    }
                    step="0.1"
                    min="0"
                  />
                </td>
                <td className="border p-1 text-right pr-2">
                  ₹
                  {(
                    item.price * item.quantity +
                    (item.price * item.quantity * item.tax) / 100
                  ).toFixed(2)}
                </td>
                <td className="border p-1">
                  <button
                    type="button"
                    className="text-red-600 hover:text-red-800"
                    onClick={() => removeRow(idx)}
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add Item Button */}
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          onClick={addRow}
        >
          + Add Item
        </button>

        {/* Total */}
        <div className="text-right font-bold text-lg text-indigo-700 mb-4">
          Grand Total: ₹{calculateTotal()}
        </div>

        {/* Submit */}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded"
          >
            Save Invoice
          </button>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
            onClick={() => {}}
          >
            Save to Download
          </button>
        </div>
      </form>
    </div>
  );
};

export default InvoiceForm;
