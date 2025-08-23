// import { api } from "@/redux/services/api";

// // Selected Answer for a Question
// export interface AlignmentAnswer {
//   questionNumber: number;
//   selectedOptions: string[];
//   _id: string;
// }

// // Selected Components
// export interface AlignmentComponent {
//   name: string;
//   checked: boolean;
//   _id: string;
// }

// // Main Alignment Data
// export interface AlignmentData {
//   _id: string;
//   title: string;
//   userId: string;
//   companyName: string;
//   answers: AlignmentAnswer[];
//   selectedComponents: AlignmentComponent[];
//   suggestions: string;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }

// // API Response
// export interface CreateAlignmentResponse {
//   success: boolean;
//   message: string;
//   data: AlignmentData;
// }


// export const clarhetAiApi = api.injectEndpoints({
//   endpoints: (builder) => ({
//     // for alignment check create 
//    createAlignment: builder.mutation<CreateAlignmentResponse, Partial<AlignmentData>>({
//   query: (body) => ({
//     url: "/alignments",
//     method: "PATCH",
//     body,
//   }),
//   invalidatesTags: ["Alignment"],
// }),

    
//   }),
// });

// export const {
//   useCreateAlignmentMutation,
// } = clarhetAiApi;









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

// API Response
export interface CreateAlignmentResponse {
  success: boolean;
  message: string;
  data: AlignmentData;
}


export const clarhetAiApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // for alignment check create 
   createAlignment: builder.mutation<CreateAlignmentResponse, Partial<AlignmentData>>({
  query: (body) => ({
    url: "/alignments",
    method: "POST",
    body,
  }),
  invalidatesTags: ["Alignment"],
}),

    
  }),
});

export const {
  useCreateAlignmentMutation,
} = clarhetAiApi;