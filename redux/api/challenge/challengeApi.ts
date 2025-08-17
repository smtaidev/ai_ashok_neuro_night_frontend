
import { api } from "@/redux/services/api";

// API Response interfaces based on actual response structure
interface ChallengeItem {
  _id: string;
  title: string;
  category: string;
  impact_on_business: string;
  ability_to_address: string;
  description: string;
  risk_score: number;
}

interface ChallengeResponse {
  _id: string;
  companyName: string;
  challenge: ChallengeItem[];
  __v: number;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface ApiDeleteResponse {
  success: boolean;
  message: string;
}

// Form interfaces for creating/updating challenges
interface ChallengeDetail {
  question: string;
  answer: string;
  impactLevel: 'High' | 'Medium' | 'Low';
}

interface SubChallenge {
  challengeName: string;
  challengeDetails: ChallengeDetail[];
}

interface CreateChallengeRequest {
  title: string;
  category: string;
  impact_on_business: string;
  ability_to_address: string;
  description: string;
}

interface CreateChallengeResponse {
  _id: string;
  title: string;
  category: string;
  impact_on_business: string;
  ability_to_address: string;
  description: string;
  risk_score: number;
}

export const challengeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getChallenges: builder.query<ApiResponse<ChallengeResponse>, void>({
      query: () => "/ai-recommendations/challenge-rixScore",
      providesTags: ["Challenge"],
    }),
    createChallenge: builder.mutation<ApiResponse<CreateChallengeResponse>, CreateChallengeRequest>({
      query: (body) => ({
        url: "/challenge/create-challenge",
        method: "PATCH", // Changed from PATCH to POST
        body,
      }),
      invalidatesTags: ["Challenge"],
    }),
    updateChallenge: builder.mutation<
      ApiResponse<ChallengeItem>,
      { id: string } & CreateChallengeRequest
    >({
      query: ({ id, ...body }) => ({
        url: `/assess/create-challenge/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Challenge"],
    }),
    deleteChallenge: builder.mutation<ApiDeleteResponse, string>({
      query: (id) => ({
        url: `/challenges/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Challenge"],
    }),
  }),
});

export const {
  useGetChallengesQuery,
  useCreateChallengeMutation,
  useUpdateChallengeMutation,
  useDeleteChallengeMutation,
} = challengeApi;

// Export types for use in components
export type { ChallengeItem, ChallengeResponse, CreateChallengeRequest, CreateChallengeResponse };