

import { api } from "@/redux/services/api";

// Selected Answer for a Question
export interface AlignmentAnswer {
  questionNumber: number;
  selectedOptions: string[];
  
}

// Selected Components
export interface AlignmentComponent {
  name: string;
  checked: boolean;
}

// Main Alignment Data
export interface AlignmentData {
  id: string;
  title: string;
  userId: string;
  companyName: string;
  answers: AlignmentAnswer[];
  selectedComponents: AlignmentComponent[];
  suggestions: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// API Response for create alignment
export interface CreateAlignmentResponse {
  success: boolean;
  message: string;
  data: AlignmentData;
}

// API Response for get alignments
export interface GetAlignmentsResponse {
  success: boolean;
  message: string;
  data: AlignmentData[];
}

export const clarhetAiApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Create Alignment
    createAlignment: builder.mutation<CreateAlignmentResponse, Partial<AlignmentData>>({
      query: (body) => ({
        url: "/alignments",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Alignment"],
    }),

    // Get Alignments
    getMyAlignment: builder.query<GetAlignmentsResponse, void>({
      query: () => "alignments/my-alignment",
      providesTags: ["Alignment"],
    }),
  }),
});

export const {
  useCreateAlignmentMutation,
  useGetMyAlignmentQuery,
} = clarhetAiApi;
