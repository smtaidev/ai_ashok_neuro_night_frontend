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
  _id: string | undefined;
  data: any;
  trendDetails: any;
  trendName: string;
  id: string;
  trends: SubTrend[];
}

export const trendApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTrends: builder.query<{
      length: number; data: Trend[] 
}, void>({
      query: () => "/assess/trend",
      providesTags: ["Trend"],
    }),
    createTrend: builder.mutation<
      {
        success: boolean;
        message: string;
        data: Trend;
      },
      SubTrend[]
    >({
      query: (body) => ({
        url: "/assess/create-trend",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Trend"],
    }),
    // updateTrend: builder.mutation<
    //   {
    //     success: boolean;
    //     message: string;
    //     data: Trend;
    //   },
    //   { id: string; trends: SubTrend[] }
    // >({
    //   query: ({ body }) => ({
    //     url: "/assess/create-trend",
    //     method: "PATCH",
    //     body,
    //   }),
    //   invalidatesTags: ["Trend"],
    // }),


    updateTrend: builder.mutation<
  {
    success: boolean;
    message: string;
    data: Trend;
  },
  { id: string; trends: SubTrend[] }
>({
  query: ({ id, trends }) => ({
    url: `/assess/create-trend/${id}`, // ✅ include id in URL
    method: "PATCH",
    body: { trends }, // ✅ send only trends in body
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
  useCreateTrendMutation,
  useUpdateTrendMutation,
  useDeleteTrendMutation,
} = trendApi;