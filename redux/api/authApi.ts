import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    // changePasswordByToken: build.mutation({
    //   query: (cpdata) => {
    //     return {
    //       url: `${AUTH_URL}/change-password`,
    //       method: "POST",
    //       headers: {
    //         Authorization: `${cpdata.authKey}`,
    //       },
    //       data: cpdata.data,
    //     };
    //   },
    //   invalidatesTags: [tagTypes.admin],
    // }),
  }),
});

export const { useUserLoginMutation } =
  authApi;
