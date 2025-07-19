import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UpdateProductRequest } from "../../BackendService/Contracts.ts";

interface PageState {
  productIsEdited: boolean;
  editedProducts: UpdateProductRequest[];
}

const initialState: PageState = {
  productIsEdited: false,
  editedProducts: [],
};

const adminPageSlice = createSlice({
  name: "admin-page",
  initialState,
  reducers: {
    setIsProductEdited: (state, action: PayloadAction<boolean>) => {
      state.productIsEdited = action.payload;
    },
    setEditedProducts: (
      state,
      action: PayloadAction<UpdateProductRequest[]>,
    ) => {
      state.editedProducts = action.payload;
    },
  },
});

export const { setIsProductEdited, setEditedProducts } = adminPageSlice.actions;
export default adminPageSlice.reducer;
