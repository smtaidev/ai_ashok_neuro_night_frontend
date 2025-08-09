"use client";

import { AppDispatch } from "@/redux";
import { userApi } from "@/redux/services/userApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function AppInitializer() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(
        userApi.endpoints.getMe.initiate(undefined, { forceRefetch: true })
      );
    }

  }, [dispatch]);

  return null;
}
