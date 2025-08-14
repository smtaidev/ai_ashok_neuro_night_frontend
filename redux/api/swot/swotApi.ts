import { api } from "@/redux/services/api";


interface Swot {
  id: string;
  title: string;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

interface CreateSwotRequest {
  categoryName: string;
  details: string;
}

interface UpdateSwotRequest extends CreateSwotRequest {
  id: string;
}

export const swotApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSwots: builder.query<{ data: Swot[] }, void>({
      query: () => "/create-swot/get-swot",
      providesTags: ["Swot"],
    }),
    getSwot: builder.query<{ data: Swot }, string>({
      query: (id) => `/swots/${id}`,
      providesTags: ["Swot"],
    }),
    createSwot: builder.mutation<
      {
        success: boolean;
        message: string;
        data: Swot;
      },
      CreateSwotRequest
    >({
      query: (body) => ({
        url: "/create-swot/create",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Swot"],
    }),
    updateSwot: builder.mutation<
      {
        success: boolean;
        message: string;
        data: Swot;
      },
      UpdateSwotRequest
    >({
      query: ({ id, ...body }) => ({
        url: `/create-swot/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Swot"],
    }),
    deleteSwot: builder.mutation<
      {
        success: boolean;
        message: string;
      },
      string
    >({
      query: (id) => ({
        url: `/create-swot/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Swot"],
    }),
  }),
});

export const {
  useGetSwotsQuery,
  useGetSwotQuery,
  useCreateSwotMutation,
  useUpdateSwotMutation,
  useDeleteSwotMutation,
} = swotApi;