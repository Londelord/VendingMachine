import type { Brand, Product } from "../../types.ts";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  products: Product[];
  brands: Brand[];
  selectedProducts: Product[];
}

const initialState: ProductState = {
  products: [],
  brands: [],
  selectedProducts: [],
};

const productSlice = createSlice({
  name: "product-brand",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    setBrands(state, action: PayloadAction<Brand[]>) {
      state.brands = action.payload;
    },
    addSelectedProduct(state, action: PayloadAction<Product>) {
      const alreadyExists = state.selectedProducts.find(
        (p) => p.id === action.payload.id,
      );
      if (!alreadyExists) state.selectedProducts.push(action.payload);
    },
    removeSelectedProduct(state, action: PayloadAction<number>) {
      state.selectedProducts = state.selectedProducts.filter(
        (p) => p.id !== action.payload,
      );
    },
    setSelectedProducts(state, action: PayloadAction<Product[]>) {
      state.selectedProducts = action.payload;
    },
  },
});

export const {
  setProducts,
  setBrands,
  addSelectedProduct,
  removeSelectedProduct,
  setSelectedProducts,
} = productSlice.actions;
export default productSlice.reducer;
