import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Coin, ProductQuantity } from "../../types.ts";

interface OrderState {
  totalToPay: number;
  productQuantities: ProductQuantity[];
  coinQuantities: Coin[];
  change: Coin[];
}

const initialState: OrderState = {
  totalToPay: 0,
  productQuantities: [],
  coinQuantities: [
    { denomination: 1, quantity: 0 },
    { denomination: 2, quantity: 0 },
    { denomination: 5, quantity: 0 },
    { denomination: 10, quantity: 0 },
  ],
  change: [
    { denomination: 1, quantity: 0 },
    { denomination: 2, quantity: 0 },
    { denomination: 5, quantity: 0 },
    { denomination: 10, quantity: 0 },
  ],
};

const orderSlice = createSlice({
  name: "order-payment",
  initialState,
  reducers: {
    updateProductQuantities(state, action: PayloadAction<ProductQuantity>) {
      const { id, quantity } = action.payload;
      const existingProduct = state.productQuantities.find((p) => p.id === id);

      if (existingProduct) {
        existingProduct.quantity = quantity;
      } else {
        state.productQuantities.push({ id, quantity });
      }
    },

    removeProductQuantity(state, action: PayloadAction<number>) {
      state.productQuantities = state.productQuantities.filter(
        (product) => product.id !== action.payload,
      );
    },

    updateCoinQuantity(state, action: PayloadAction<Coin>) {
      const { denomination, quantity } = action.payload;
      const existingCoin = state.coinQuantities.find(
        (p) => p.denomination === denomination,
      );

      if (existingCoin) {
        existingCoin.quantity = quantity;
      } else {
        state.coinQuantities.push({ denomination, quantity });
      }
    },

    setSum(state, action: PayloadAction<number>) {
      state.totalToPay = action.payload;
    },

    setChange(state, action: PayloadAction<Coin[]>) {
      state.change = action.payload;
    },

    clearChange(state) {
      state.change = initialState.change;
    },

    clearCoinQuantities(state) {
      state.coinQuantities = initialState.coinQuantities;
    },
  },
});

export const {
  setSum,
  updateProductQuantities,
  removeProductQuantity,
  updateCoinQuantity,
  clearChange,
  setChange,
  clearCoinQuantities,
} = orderSlice.actions;
export default orderSlice.reducer;
