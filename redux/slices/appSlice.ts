
import { Product } from "@/constants/data";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthStatus = "unauthenticated" | "authenticated" | "authForm";
type AppStatus = "idle" | "fetching" | "error";

interface User {
  id: string;
  name: string;
  email: string;
  token: string
  // Add other user fields as needed
}


interface AppState {
  appStatus: AppStatus;
  auth: AuthStatus;
  user: User | null;
  token: User | null
}

const initialState: AppState = {
  appStatus: "idle",
  auth: "unauthenticated",
  user: null,
  token: null
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
      state.token = null;
      state.appStatus = "idle";
    }, 

    // Add or update user info (e.g. after profile update)
    addUser(state, action: PayloadAction<User | null>) {
      if (!action.payload) return state;

      state.user = action.payload;
      state.auth = "authenticated";
      state.appStatus = "idle";
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
  
  showAuthForm,
  setAuthStatus,
  
} = appSlice.actions;

export default appSlice.reducer;
