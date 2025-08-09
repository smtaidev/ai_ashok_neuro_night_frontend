import { addUser } from "../slices/appSlice";
import { api } from "./api";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthResponse {
  accessToken: string;
}

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      {
        success: boolean;
        message: string;
        data: {
          accessToken: string;
        };
      },
      { email: string; password: string }
    >({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
      try {
        const { data } = await queryFulfilled;
        console.log("Login response from userApi:", data);

        // Correct path: data.data.accessToken
        const accessToken = data.data.accessToken;

        localStorage.setItem("accessToken", accessToken);
        dispatch(userApi.endpoints.getMe.initiate());
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

    getMe: builder.query<{ data: User }, void>({
      query: () => "/auth/profile", 
      providesTags: ["User"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addUser(data.data));
        } catch {}
      },
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useGetMeQuery } = userApi;
