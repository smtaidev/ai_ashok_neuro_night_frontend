import { api } from "@/redux/services/api";


interface Swot {
  recommendations: any;
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




// ai recommendations
export interface AiSwotApiResponse {
  data: {
    recommendations: {
      strengths_recommendation: string;
      weaknesses_recommendation: string;
      opportunities_recommendation: string;
      threats_recommendation: string;
    };
  };
}

// Type for the parsed recommendations you'll use in your component
export interface AiSwotRecommendations {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
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
    // aiswot create for get update data
    createAiSwot: builder.mutation<
      {
        success: boolean;
        message: string;
        data: Swot;
      },
      AiSwotApiResponse
    >({
      query: (body) => ({
        url: "/ai-recommendations/create-swot",
        method: "POST",
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
  useCreateAiSwotMutation,
  useUpdateSwotMutation,
  useDeleteSwotMutation,
} = swotApi;

