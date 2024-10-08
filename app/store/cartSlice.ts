import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  //   items: localStorage.getItem("carts")
  //     ? JSON.parse(window.localStorage.getItem("carts"))
  //     : [],
  items: [],
  statusTab: false,
  hasPurchased: false,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { productId, quantity } = action.payload;
      const indexProductId = state.items.findIndex(
        (item) => item.productId === productId
      );
      if (indexProductId >= 0) {
        state.items[indexProductId].quantity += quantity;
      } else {
        state.items.push({ productId, quantity });
      }
      localStorage.setItem("carts", JSON.stringify(state.items));
    },
    changeQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const indexProductId = state.items.findIndex(
        (item) => item.productId === productId
      );
      if (quantity > 0) {
        state.items[indexProductId].quantity = quantity;
      } else {
        state.items = state.items.filter(
          (item) => item.productId !== productId
        );
      }
      localStorage.setItem("carts", JSON.stringify(state.items));
    },
    toggleStatusTab(state) {
      if (state.statusTab === false) {
        state.statusTab = true;
      } else {
        state.statusTab = false;
      }
    },
    checkoutComplete(state) {
      // clear
      state.items = [];
      state.statusTab = false;
      state.hasPurchased = true;
    },
    dismissPurchasedToast(state) {
      state.hasPurchased = false;
    },
  },
});

export const {
  dismissPurchasedToast,
  addToCart,
  changeQuantity,
  toggleStatusTab,
  checkoutComplete,
} = cartSlice.actions;

export default cartSlice.reducer;
