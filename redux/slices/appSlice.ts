
import { Product } from "@/constants/data";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthStatus = "unauthenticated" | "authenticated" | "authForm";
type AppStatus = "idle" | "fetching" | "error";

interface User {
  id: string;
  name: string;
  email: string;
  // Add other user fields as needed
}

interface CartItem {
  productId: string;
  quantity: number;
}

interface AppState {
  appStatus: AppStatus;
  auth: AuthStatus;
  cart: Record<string, CartItem>; // key: productId
  user: User | null;
  products: Product[];
}

const initialState: AppState = {
  appStatus: "idle",
  auth: "unauthenticated",
  cart: {},
  user: null,
  products: [],
};

const appSlice = createSlice({
  name: "appStatus",
  initialState,
  reducers: {
    // Called when login process starts
    startLogin(state) {
      if (state.auth === "unauthenticated") {
        state.appStatus = "fetching";
      }
    },

    // Called when login is successful
    loginSuccess(state, action: PayloadAction<User>) {
      state.auth = "authenticated";
      state.user = action.payload;
      state.appStatus = "idle";
    },

    // Logout resets auth and user state
    logout(state) {
      state.auth = "unauthenticated";
      state.user = null;
      state.appStatus = "idle";
    },

    // Add or update user info (e.g. after profile update)
    addUser(state, action: PayloadAction<User | null>) {
      if (!action.payload) return state;

      state.user = action.payload;
      state.auth = "authenticated";
      state.appStatus = "idle";
    },
    hydrateCartFromStorage(
      state,
      action: PayloadAction<Record<string, CartItem>>
    ) {
      state.cart = action.payload;
    },
    // Add a product to the cart or increase quantity if exists
    addToCart(
      state,
      action: PayloadAction<{ productId: string; quantity?: number }>
    ) {
      const { productId, quantity = 1 } = action.payload;
      if (state.cart[productId]) {
        state.cart[productId].quantity += quantity;
      } else {
        state.cart[productId] = { productId, quantity };
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    // Remove a product or decrease quantity from the cart
    removeFromCart(
      state,
      action: PayloadAction<{ productId: string; quantity?: number }>
    ) {
      const { productId, quantity = 1 } = action.payload;
      if (state.cart[productId]) {
        if (state.cart[productId].quantity <= quantity) {
          delete state.cart[productId];
        } else {
          state.cart[productId].quantity -= quantity;
        }
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    // Clear the entire cart
    clearCart(state) {
      state.cart = {};
      localStorage.removeItem("cart");
    },

    // Optional: Add or replace products list (e.g. from API)
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },

    showAuthForm(state) {
      if (state.auth === "unauthenticated") {
        state.auth = "authForm";
      }
    },

    setAuthStatus(state, action: PayloadAction<AuthStatus>) {
      state.auth = action.payload;
    },
  },
});

export const {
  startLogin,
  loginSuccess,
  logout,
  addUser,
  addToCart,
  removeFromCart,
  clearCart,
  setProducts,
  showAuthForm,
  setAuthStatus,
  hydrateCartFromStorage,
} = appSlice.actions;

export default appSlice.reducer;
