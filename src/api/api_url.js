const base_url = import.meta.env.VITE_API_BASE_URL || "http://localhost:9090/";
const register_end = "api/register";
const login_end = "api/login";
const addCustomer_end = "api/customer-add";
const customer_list_end = "api/customer-list";
const getSingleCustomer_end = "api/customer/:id";
const updateCustomer_end = "api/update-customer/:id";
const deleteCustomer_end = "api/delete-customer/:id";

export {
  base_url,
  register_end,
  login_end,
  addCustomer_end,
  customer_list_end,
  getSingleCustomer_end,
  updateCustomer_end,
  deleteCustomer_end,
};
