import type { Brand, Product } from "../../types.ts";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  priceRange: [number, number];
  selectedBrand: Brand | null;
  filteredProducts: Product[];
}

const initialState: FilterState = {
  priceRange: [0, 0],
  selectedBrand: null,
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilterRange(state, action: PayloadAction<[number, number]>) {
      state.priceRange = action.payload;
    },
    setSelectedBrand(state, action: PayloadAction<Brand | null>) {
      state.selectedBrand = action.payload;
    },
    setFilteredProducts(state, action: PayloadAction<Product[]>) {
      state.filteredProducts = action.payload;
    },
  },
});

export const { setFilterRange, setSelectedBrand, setFilteredProducts } =
  filterSlice.actions;
export default filterSlice.reducer;
