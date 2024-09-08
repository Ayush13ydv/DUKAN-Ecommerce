import { createSlice } from "@reduxjs/toolkit";

// Initialize cart state from localStorage or set to an empty array if no valid data is found
const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Action to add items to the cart
    AddToCart(state, action) {
      // Ensure the item being added has a quantity property, default to 1 if missing
      const newItem = { ...action.payload, quantity: action.payload.quantity ?? 1 };
      state.push(newItem);
    },
    // Action to delete an item from the cart
    DeleteCart(state, action) {
      return state.filter(item => item.id !== action.payload.id);
    },
    // Action to update item quantity in the cart
    updateCartQuantity: (state, action) => {
      const { item, type } = action.payload;
      const index = state.findIndex(cartItem => cartItem.id === item.id);

      // Update the quantity based on the type ('increase' or 'decrease')
      if (index !== -1) {
        if (type === 'increase') {
          state[index].quantity += 1;
        } else if (type === 'decrease' && state[index].quantity > 1) {
          state[index].quantity -= 1;
        }
      }
    },
  },
});

export const { AddToCart, DeleteCart, updateCartQuantity } = cartSlice.actions;
export default cartSlice.reducer;
