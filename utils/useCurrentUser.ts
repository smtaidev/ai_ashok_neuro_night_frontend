// utils/auth.ts
"use client";
import { jwtDecode } from "jwt-decode";

export interface DecodedUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isActive: boolean;
}

export const getCurrentAuthUser = async (): Promise<DecodedUser | null> => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    try {
      const decoded = jwtDecode<DecodedUser>(token);
      console.log("Decoded User:", decoded);
      return decoded;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }
  return null;
};
