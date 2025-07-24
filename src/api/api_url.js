const base_url = import.meta.env.VITE_API_BASE_URL || "http://localhost:9090/";
const register_end = "api/register";
const login_end = "api/login";
// customer endpoint
const addCustomer_end = "api/customer-add";
const customer_list_end = "api/customer-list";
const getSingleCustomer_end = "api/customer";
const updateCustomer_end = "api/update-customer";
const deleteCustomer_end = "api/delete-customer";

// product endpont
const addproduct_end = "api/add-product";
const listProduct_end = "api/list-product";
const getSingleProduct_end = "api/product";
const updateProduct_end = "api/update-product";
const deleteProduct_end = "api/delete-product";

// Purchase endpoint
const addPurchase_end = "api/add-purchase";
const listPurchase_end = "api/list-purchases";
const getSinglePurchase_end = "api/purchase";
const updatePurchase_end = "api/update-purchase";
const deletePurchase_end = "api/delete-purchase";

// Invoice end poipoint
const createInvoice_end = "api/add-invoice";
const getInvoice_end = "api/list-invoice";
const getSingleInvoice_end = "api/invoice";
const updateInvoice_end = "api/update-invoice";
const deleteInvoice_end = "api/delete-invoice";

export {
  base_url,
  register_end,
  login_end,
  addCustomer_end,
  customer_list_end,
  getSingleCustomer_end,
  updateCustomer_end,
  deleteCustomer_end,
  addproduct_end,
  getSingleProduct_end,
  listProduct_end,
  updateProduct_end,
  deleteProduct_end,
  addPurchase_end,
  listPurchase_end,
  getSinglePurchase_end,
  updatePurchase_end,
  deletePurchase_end,
  createInvoice_end,
  getInvoice_end,
  getSingleInvoice_end,
  deleteInvoice_end,
};
