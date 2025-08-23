import { api } from "@/redux/services/api";

// Define the score interface
interface Score {
  value: number;
  rationale: string;
}

// Define the scores interface
interface Scores {
  strengths: Score;
  weaknesses: Score;
  opportunities: Score;
  threats: Score;
}

// Define the recommendations interface
interface Recommendations {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

// Define the SWOT data interface
interface SwotData {
  scores: Scores;
  recommendations: Recommendations;
  _id: string;
  companyName: string;
  error: null | string;
  __v: number;
}

// Define the Trend Summary interface
interface TrendSummary {
  key_opportunities: string;
  strengths: string;
  significant_risks: string;
  challenges: string;
  strategic_recommendations: string;
  irrelevant_answers: string[];
  _id: string;
}

// Define the Trend data interface
interface TrendData {
  _id: string;
  companyName: string;
  summary: TrendSummary;
  trend_synthesis: string[];
  early_warnings: string;
  strategic_opportunities: string[];
  analyst_recommendations: string;
  radar_executive_summary: string[];
  radar_recommendation: string[];
  error: null | string;
  __v: number;
}

// Define the Trend API response interface
interface TrendApiResponse {
  success: boolean;
  message: string;
  data: TrendData;
}

// Define the Challenge data interface
interface ChallengeData {
  _id: string;
  companyName: string;
  recommendations: string;
  __v: number;
}

// Define the Challenge API response interface
interface ChallengeApiResponse {
  success: boolean;
  message: string;
  data: ChallengeData;
}

// Define the SWOT API response interface
interface SwotApiResponse {
  length: number;
  success: boolean;
  message: string;
  data: SwotData;
}

export const clarhetAiApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAiSwot: builder.query<SwotApiResponse, void>({
      query: () => "/ai-recommendations/get-swot",
      providesTags: ["Challenge"],
    }),
    getAiChallenge: builder.query<ChallengeApiResponse, void>({
      query: () => "/ai-recommendations/get-challenge",
      providesTags: ["Challenge"],
    }),
    getAiTrend: builder.query<TrendApiResponse, void>({
      query: () => "/ai-recommendations/get-trend",
      providesTags: ["Challenge"],
    }),
    
  }),
});

export const {
  useGetAiSwotQuery,
  useGetAiChallengeQuery,
  useGetAiTrendQuery,
} = clarhetAiApi;

// Export types for use in components
export type { SwotApiResponse, SwotData, Scores, Recommendations, Score, ChallengeApiResponse, ChallengeData, TrendApiResponse, TrendData, TrendSummary };