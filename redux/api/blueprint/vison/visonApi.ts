import { api } from "@/redux/services/api";

interface Vision {
  id: string;
  vision: string;
}

interface CreateVisionRequest {
  vision: string;
}

export const visionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createVision: builder.mutation<
      { success: boolean; message: string; data: Vision },
      CreateVisionRequest
    >({
      query: (body) => ({
        url: "/blueprint/create-vison",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Vision"],
    }),

    getVisions: builder.query<{ data: Vision[] }, void>({
      query: () => "/blueprint/get-visons", // if you have this endpoint
      providesTags: ["Vision"],
    }),
  }),
});

export const { useCreateVisionMutation, useGetVisionsQuery } = visionApi;
