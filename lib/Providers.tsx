"use client";

import { Toaster } from "@/components/ui/sonner";
import { store } from "@/redux";

import { Provider } from "react-redux";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <Toaster position="bottom-left" richColors closeButton />
      {children}
    </Provider>
  );
};

export default Providers;
