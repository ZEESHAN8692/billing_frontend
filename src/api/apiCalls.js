import axiosInstance from "../api/axiosInstance";
import {
  customer_list_end,
  listProduct_end,
  deleteCustomer_end,
  deleteProduct_end,
  deletePurchase_end,
  listPurchase_end,
  getInvoice_end,
  deleteInvoice_end,
  getSingleInvoice_end,
} from "../api/api_url";

async function getCustomers() {
  try {
    const response = await axiosInstance.get(customer_list_end);
    return response.data;
  } catch (error) {
    console.error("Error fetching customer list:", error);
    throw error;
  }
}

async function deleteCustomer(customerId) {
  try {
    const response = await axiosInstance.delete(
      `${deleteCustomer_end}/${customerId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw error;
  }
}

async function getProducts() {
  try {
    const response = await axiosInstance.get(listProduct_end);
    return response.data;
  } catch (error) {
    console.error("Error fetching products list:", error);
    throw error;
  }
}

async function deleteProduct(productId) {
  try {
    const response = await axiosInstance.delete(
      `${deleteProduct_end}/${productId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

async function getPurchases() {
  try {
    const response = await axiosInstance.get(listPurchase_end);
    return response.data;
  } catch (error) {
    console.error("Error fetching purchases list:", error);
    throw error;
  }
}

async function deletePurchase(purchaseId) {
  try {
    const response = await axiosInstance.delete(
      `${deletePurchase_end}/${purchaseId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting purchase:", error);
  }
}

async function getInvoices() {
  try {
    const response = await axiosInstance.get(getInvoice_end);
    return response.data;
  } catch (error) {
    console.error("Error fetching invoices list:", error);
    throw error;
  }
}

async function getSingleInvoice(invoiceId) {
  try {
    const response = await axiosInstance.get(
      `${getSingleInvoice_end}/${invoiceId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching single invoice:", error);
    throw error;
  }
}

async function deleteInvoice(invoiceId) {
  try {
    const response = await axiosInstance.delete(
      `${deleteInvoice_end}/${invoiceId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting invoice:", error);
    throw error;
  }
}
export {
  getCustomers,
  getProducts,
  deleteCustomer,
  deleteProduct,
  deletePurchase,
  getPurchases,
  getInvoices,
  getSingleInvoice,
  deleteInvoice,
};
