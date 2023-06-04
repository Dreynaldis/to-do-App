import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./reducers/auth";

export const store = configureStore({
  reducer: {
    loginHandler: loginReducer,
  },
});
