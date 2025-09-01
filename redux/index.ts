import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/api";
import appReducer from "./slices/appSlice";
import authReducer from "./slices/auth.slice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    app: appReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
