import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Slices/ProductSlice.ts";
import adminPageReducer from "./Slices/AdminPageSlice.ts";
import filterReducer from "./Slices/FilterSlicer.ts";
import orderReducer from "./Slices/OrderSlice.ts";

export const store = configureStore({
  reducer: {
    product_brands: productReducer,
    admin_page: adminPageReducer,
    filter: filterReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
