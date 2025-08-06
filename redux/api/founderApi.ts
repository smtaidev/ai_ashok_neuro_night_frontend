import { IFounder, IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const FOUNDER_URL = "/founders";

export const founderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllFounder: build.query({
      query: () => {
        return {
          url: FOUNDER_URL,
          method: "GET",
        };
      },
      transformResponse: (response: IFounder[], meta: IMeta) => {
        return {
          founders: response,
          meta,
        };
      },
      providesTags: [tagTypes.founder],
    }),

    getSingleFounder: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `${FOUNDER_URL}/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.founder],
    }),

    createFounder: build.mutation({
      query: (data) => ({
        url: `${FOUNDER_URL}/create-founder`,
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.founder],
    }),

    updateFounder: build.mutation({
      query: (data) => ({
        url: `${FOUNDER_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.founder],
    }),

    deleteFounder: build.mutation({
      query: (id) => ({
        url: `${FOUNDER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.founder],
    }),
  }),
});

export const {
  useGetAllFounderQuery,
  useGetSingleFounderQuery,
  useCreateFounderMutation,
  useUpdateFounderMutation,
  useDeleteFounderMutation,
} = founderApi;
