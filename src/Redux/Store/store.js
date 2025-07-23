import { configureStore } from "@reduxjs/toolkit";
import RegistrationSlice from "../Slice/registrationSlice";
import LoginSlice from "../Slice/loginSlice";
import customerAddSlice from "../Slice/cutomerAddSlice";

const store = configureStore({
  reducer: {
    registration: RegistrationSlice,
    login: LoginSlice,
    addCustomer: customerAddSlice,
  },
});

export default store;
