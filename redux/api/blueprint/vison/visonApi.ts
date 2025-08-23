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
      query: () => "/blueprint/get-vision", // if you have this endpoint
      providesTags: ["Vision"],
    }),
    createAIVision: builder.mutation<
  { success: boolean; data: { vision: string } },
  { vision: string }
>({
  query: (body) => ({
    url: "/ai-recommendations/create-vision",
    method: "POST",
    body,
  }),
  invalidatesTags: ["Vision"],
}),
  }),
});

export const { useCreateVisionMutation, useGetVisionsQuery, useCreateAIVisionMutation } = visionApi;
