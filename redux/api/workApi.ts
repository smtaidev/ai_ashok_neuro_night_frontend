import { IMeta, IWork } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const WORK_URL = "/works";

export const workApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllWork: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: WORK_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IWork[], meta: IMeta) => {
        return {
          works: response,
          meta,
        };
      },
      providesTags: [tagTypes.work],
    }),

    getSingleWork: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `${WORK_URL}/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.work],
    }),

    createWork: build.mutation({
      query: (data) => ({
        url: `${WORK_URL}/create-work`,
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.work],
    }),

    updateWork: build.mutation({
      query: (data) => ({
        url: `${WORK_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.work],
    }),

    deleteWork: build.mutation({
      query: (id) => ({
        url: `${WORK_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.work],
    }),
  }),
});

export const {
  useGetAllWorkQuery,
  useGetSingleWorkQuery,
  useCreateWorkMutation,
  useUpdateWorkMutation,
  useDeleteWorkMutation,
} = workApi;
