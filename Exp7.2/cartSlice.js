import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [
    { id: 1, name: "Smartphone", price: 299.99, qty: 1 },
    { id: 2, name: "Tablet", price: 449.99, qty: 2 },
    { id: 3, name: "Smartwatch", price: 199.99, qty: 1 }
  ]
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    removeItem: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },

    updateQty: (state, action) => {
      const item = state.cart.find(i => i.id === action.payload.id);
      if (item) {
        item.qty = action.payload.qty;
      }
    }
  }
});

export const { removeItem, updateQty } = cartSlice.actions;
export default cartSlice.reducer;