
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import { IAdmin, IMeta } from "@/types";

const ADMIN_URL = "/admin";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllAdmin: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: ADMIN_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IAdmin[], meta: IMeta) => {
        return {
          admins: response,
          meta,
        };
      },
      providesTags: [tagTypes.admin],
    }),

    getSingleAdmin: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `${ADMIN_URL}/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.admin],
    }),
    // Create User
    createAdmin: build.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/create-admin`,
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.admin],
    }),

    updateAdmin: build.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.admin],
    }),
    deleteAdmin: build.mutation({
      query: (id) => ({
        url: `${ADMIN_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.admin],
    }),
  }),
});

export const {
  useGetAllAdminQuery,
  useGetSingleAdminQuery,
  useCreateAdminMutation,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
} = adminApi;
