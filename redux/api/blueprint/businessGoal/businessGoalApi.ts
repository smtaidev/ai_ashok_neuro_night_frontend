// // businessGoalApi.ts 
// import { api } from "@/redux/services/api";

// // =======================
// // Interfaces
// // =======================
// export interface BusinessGoal {
//   _id: string;
//   title: string;
//   description: string;
//   capabilityInfluence: string;
//   capabilityOwners: string[];
//   enhanceExisting: boolean;
//   enhanceDescription?: string;
//   addNew: boolean;
//   newCapabilityName?: string;
//   capabilityType?: string;
//   capabilityDescription?: string;
//   otherDetails?: string;
// }

// export interface CreateBusinessGoalRequest {
//   title: string;
//   description: string;
//   capabilityInfluence: string;
//   capabilityOwners: string[];
//   enhanceExisting: boolean;
//   enhanceDescription?: string;
//   addNew: boolean;
//   newCapabilityName?: string;
//   capabilityType?: string;
//   capabilityDescription?: string;
//   otherDetails?: string;
// }

// export interface UpdateBusinessGoalRequest extends CreateBusinessGoalRequest {
//   _id: string;
// }

// // =======================
// // API Definition
// // =======================
// export const businessGoalApi = api.injectEndpoints({
//   endpoints: (builder) => ({
//     // ✅ Create Business Goal
//     createBusinessGoal: builder.mutation<
//       { success: boolean; message: string; data: BusinessGoal },
//       CreateBusinessGoalRequest
//     >({
//       query: (body) => ({
//         url: "/blueprint/business-goals/create",
//         method: "PATCH",
//         body,
//       }),
//       invalidatesTags: ["BusinessGoal"],
//     }),

//     // ✅ Get All Business Goals
//     getBusinessGoals: builder.query<{ data: BusinessGoal[] }, void>({
//       query: () => "/blueprint/get-business-goals",
//       providesTags: ["BusinessGoal"],
//     }),

//     // ✅ Update Business Goal
//     updateBusinessGoal: builder.mutation<
//       { success: boolean; message: string; data: BusinessGoal },
//       UpdateBusinessGoalRequest
//     >({
//       query: ({ _id, ...body }) => ({
//         url: `/blueprint/${_id}/get-business-goals`,
//         method: "PATCH",
//         body,
//       }),
//       invalidatesTags: ["BusinessGoal"],
//     }),

//     // ✅ Delete Business Goal
//     deleteBusinessGoal: builder.mutation<
//       { success: boolean; message: string },
//       string
//     >({
//       query: (_id) => ({
//         url: `/blueprint/${_id}/get-business-goals`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["BusinessGoal"],
//     }),
//   }),
// });

// // =======================
// // Hooks
// // =======================
// export const {
//   useCreateBusinessGoalMutation,
//   useGetBusinessGoalsQuery,
//   useUpdateBusinessGoalMutation,
//   useDeleteBusinessGoalMutation,
// } = businessGoalApi;




// businessGoalApi.ts 
import { api } from "@/redux/services/api";

// =======================
// Interfaces
// =======================
export interface BusinessGoal {
  _id: string;
  title: string;
  description: string;
  capabilityInfluence: string;
  capabilityOwners: string[];
  enhanceExisting: boolean;
  enhanceDescription?: string;
  addNew: boolean;
  newCapabilityName?: string;
  capabilityType?: string;
  capabilityDescription?: string;
  otherDetails?: string;
}

// Create request
export interface CreateBusinessGoalRequest {
  title: string;
  description: string;
  capabilityInfluence: string;
  capabilityOwners: string[];
  enhanceExisting: boolean;
  enhanceDescription?: string;
  addNew: boolean;
  newCapabilityName?: string;
  capabilityType?: string;
  capabilityDescription?: string;
  otherDetails?: string;
}

// Update request
export interface UpdateBusinessGoalRequest extends CreateBusinessGoalRequest {
  _id: string;
}

// Overview response type (example)
export interface BusinessGoalOverview {
  totalGoals: number;
  goalsByCapabilityType: Record<string, number>;
  ownersCount: number;
}

// =======================
// API Definition
// =======================
export const businessGoalApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Create Business Goal
    createBusinessGoal: builder.mutation<
      { success: boolean; message: string; data: BusinessGoal },
      CreateBusinessGoalRequest
    >({
      query: (body) => ({
        url: "/blueprint/business-goals/create",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["BusinessGoal"],
    }),

    // ✅ Get All Business Goals
    getBusinessGoals: builder.query<{ data: BusinessGoal[] }, void>({
      query: () => "/blueprint/get-business-goals",
      providesTags: ["BusinessGoal"],
    }),

    // ✅ Get Business Goal Overview
    getBusinessGoalOverview: builder.query<
      { success: boolean; data: BusinessGoalOverview },
      void
    >({
      query: () => "/blueprint/business-goal-overview",
      providesTags: ["BusinessGoal"],
    }),

    // ✅ Update Business Goal
    updateBusinessGoal: builder.mutation<
      { success: boolean; message: string; data: BusinessGoal },
      UpdateBusinessGoalRequest
    >({
      query: ({ _id, ...body }) => ({
        url: `/blueprint/${_id}/get-business-goals`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["BusinessGoal"],
    }),

    // ✅ Delete Business Goal
    deleteBusinessGoal: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (_id) => ({
        url: `/blueprint/${_id}/get-business-goals`,
        method: "DELETE",
      }),
      invalidatesTags: ["BusinessGoal"],
    }),
  }),
});

// =======================
// Hooks
// =======================
export const {
  useCreateBusinessGoalMutation,
  useGetBusinessGoalsQuery,
  useGetBusinessGoalOverviewQuery, // ✅ new hook
  useUpdateBusinessGoalMutation,
  useDeleteBusinessGoalMutation,
} = businessGoalApi;
