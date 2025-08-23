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
interface DeleteSwotRequest {
  itemId: string;
  categoryName: string;
  
 
}

interface UpdateSwotRequest extends CreateSwotRequest {
  id: string;
}
const url = "/create-swot";

export const swotApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSwots: builder.query<{ data: Swot[] }, void>({
      query: () => `${url}/get-swot`,
      providesTags: ["Swot"],
    }),
    getSwot: builder.query<{ data: Swot }, string>({
      query: (id) => `${url}/swots/${id}`,
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
        url: `${url}/create`,
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
        url: `${url}/${id}`,
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
      DeleteSwotRequest
    >({
      query: ({ itemId, categoryName }) => ({
        url: `${url}/${itemId}`,
        method: "DELETE",
         body: { categoryName },
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

