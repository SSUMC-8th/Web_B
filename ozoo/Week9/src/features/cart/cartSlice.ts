import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import cartItems from "../../constants/cartItem";

interface CartItem {
  id: string;
  title: string;
  singer: string;
  price: string;
  img: string;
  amount: number;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
}

const initialState: CartState = {
  items: cartItems,
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.items[itemIndex].amount += 1;
      } else {
        state.items.push({ ...action.payload, amount: 1 });
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    increaseAmount(state, action: PayloadAction<string>) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.amount += 1;
      }
    },
    decreaseAmount(state, action: PayloadAction<string>) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        if (item.amount > 1) {
          item.amount -= 1;
        } else {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
      }
    },
    clearCart(state) {
      state.items = [];
    },
    calculateTotals(state) {
      let totalQuantity = 0;
      let totalAmount = 0;
      state.items.forEach((item) => {
        totalQuantity += item.amount;
        totalAmount += item.amount * parseInt(item.price);
      });
      state.totalQuantity = totalQuantity;
      state.totalAmount = totalAmount;
    },
  },
});
export const {
  addItem,
  removeItem,
  increaseAmount,
  decreaseAmount,
  clearCart,
  calculateTotals,
} = cartSlice.actions;
export default cartSlice.reducer;
