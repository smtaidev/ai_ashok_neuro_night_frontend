import { addUser } from "../slices/appSlice";
import { api } from "./api";
import { RootState } from "@reduxjs/toolkit/query";
import { setCookie } from '../../utils/cookie-storage';
import { set } from "zod";

interface User {
  id: string;
  name: string;
  email: string;
  token: string
}

interface AuthResponse {
  accessToken: string;
}

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({

    //! Previous code
    // login: builder.mutation<
    //   {
    //     success: boolean;
    //     message: string;
    //     data: {
    //       accessToken: string;
    //     };
    //   },
    //   { email: string; password: string }
    // >({
    //   query: (body) => ({
    //     url: "/auth/login",
    //     method: "POST",
    //     body,
    //   }),
    //   async onQueryStarted(_, { dispatch, queryFulfilled }) {
    //   try {
    //     const { data } = await queryFulfilled;
    //     console.log("Login response from userApi:", data);
    //     const accessToken = data.data.accessToken;

    //     // localStorage.setItem("accessToken", accessToken);
    //     setCookie('accessToken', accessToken);
    //     dispatch(userApi.endpoints.getMe.initiate());
    //   } catch {
    //     dispatch(addUser(null));
    //   }
    // },
    //   invalidatesTags: ["User"],
    // }),


    //! clarhet login here

    //! Update code for protected route
    login: builder.mutation<
      { success: boolean; message: string; data: { accessToken: string } }, // ✅ ঠিক করা
      { email: string; password: string }
    >({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
        credentials: "include",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Login response from userApi:", data);

          // ✅ cookie set
          setCookie('accessToken', data.data.accessToken);
        } catch {
          dispatch(addUser(null));
        }
      },
      invalidatesTags: ["User"],
    }),
    
    clarhetAdminLogin: builder.mutation<{
      success: boolean;
      message: string;
      data: { accessToken: string };
    }, { email: string; password: string }>({
      query: (body) => ({
        url: "/auth/clarhet-login",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Login response from userApi:", data);

          // ✅ You are **always accessing** data.data.accessToken
          const accessToken = data.data.accessToken;

          // localStorage.setItem("accessToken", accessToken);
          // dispatch(userApi.endpoints.getMe.initiate());
          setCookie('accessToken', accessToken, );

        } catch {
          dispatch(addUser(null));
        }
      },
      invalidatesTags: ["User"],
    }),


    signup: builder.mutation<
      AuthResponse,
      { fullName: string; email: string; password: string }
    >({
      query: (body) => ({
        url: "/users/register",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch {}
      },
      invalidatesTags: ["User"],
    }),

    //! Previous Code
    // getMe: builder.query<{ data: User }, void>({
    //   query: () => "/auth/profile", 
    //   providesTags: ["User"],
    //   async onQueryStarted(_, { dispatch, queryFulfilled }) {
    //     try {
    //       const { data } = await queryFulfilled;
    //       dispatch(addUser(data.data));
    //     } catch {}
    //   },
    // }),

    //! Update code for protect route
    getMe: builder.query<{ data: any }, void>({
      query: () => "/auth/profile", // 👉 এটা আপনার backend-এর protected API
      providesTags: ["User"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addUser(data.data));
        } catch {
          dispatch(addUser(null));
        }
      },
    }),

    //! Updated code for protect route
    logout: builder.mutation<{ success: boolean; message: string }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(addUser(null));
        } catch {}
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation, useClarhetAdminLoginMutation, useSignupMutation, useGetMeQuery, useLogoutMutation } = userApi;
