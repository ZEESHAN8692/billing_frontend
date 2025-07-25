import { configureStore } from "@reduxjs/toolkit";
import RegistrationSlice from "../Slice/registrationSlice";
import LoginSlice from "../Slice/loginSlice";
import customerAddSlice from "../Slice/cutomerAddSlice";
import productAddSlice from "../Slice/productAddSlice";
import purchaseAddSlice from "../Slice/purchaseAddSlice";
import invoiceCreateSlice from "../Slice/invoiceCreateSlice";
import productUpdateSlice from "../Slice/updateProductsSlice";
import customerUpdateSlice from "../Slice/updateCustomerSlice";
import purchaseUpdateSlice from "../Slice/updatePurchaseSlice";
const store = configureStore({
  reducer: {
    registration: RegistrationSlice,
    login: LoginSlice,
    addCustomer: customerAddSlice,
    addProduct: productAddSlice,
    addPurchase: purchaseAddSlice,
    createInvoice: invoiceCreateSlice,
    productUpdate: productUpdateSlice,
    updateCustomer: customerUpdateSlice,
    updatePurchase: purchaseUpdateSlice,
  },
});

export default store;
