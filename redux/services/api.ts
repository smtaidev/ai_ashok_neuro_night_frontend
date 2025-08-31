import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "https://clarhet-server-sable.vercel.app/api/v1",
    prepareHeaders: (headers) => {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null;
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  }), 
  tagTypes: ["User", "superUsers",  "Swot", "Trend", "Challenge", "Alignment","Talents",  "Foundation", "Vision","StrategicTheme","BusinessGoal", "Choreograph", "OrganizationUsers", "Meeting", "TeamMember", "Objective", "Auth"],
  endpoints: () => ({}),
});
