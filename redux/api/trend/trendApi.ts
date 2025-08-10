import { api } from "@/redux/services/api";

interface TrendDetail {
  question: string;
  answer: string;
  impactLevel: 'High' | 'Medium' | 'Low';
}

interface SubTrend {
  trendName: string;
  trendDetails: TrendDetail[];
}

interface Trend {
  id: string;
  trends: SubTrend[];
}

interface CreateTrendRequest {
  trends: SubTrend[];
}

interface UpdateTrendRequest extends CreateTrendRequest {
  id: string;
}

export const trendApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTrends: builder.query<{ data: Trend[] }, void>({
      query: () => "/trends",
      providesTags: ["Trend"],
    }),
    getTrend: builder.query<{ data: Trend }, string>({
      query: (id) => `/trends/${id}`,
      providesTags: ["Trend"],
    }),
    createTrend: builder.mutation<
      {
        success: boolean;
        message: string;
        data: Trend;
      },
      CreateTrendRequest
    >({
      query: (body) => ({
        url: "/assess/create-trend",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Trend"],
    }),
    updateTrend: builder.mutation<
      {
        success: boolean;
        message: string;
        data: Trend;
      },
      UpdateTrendRequest
    >({
      query: ({ id, ...body }) => ({
        url: `/trends/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Trend"],
    }),
    deleteTrend: builder.mutation<
      {
        success: boolean;
        message: string;
      },
      string
    >({
      query: (id) => ({
        url: `/trends/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Trend"],
    }),
  }),
});

export const {
  useGetTrendsQuery,
  useGetTrendQuery,
  useCreateTrendMutation,
  useUpdateTrendMutation,
  useDeleteTrendMutation,
} = trendApi;