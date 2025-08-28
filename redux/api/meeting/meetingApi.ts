

//? before code 


// // redux/api/meeting/meetingApi.ts
// import { api } from "@/redux/services/api";

// // =======================
// // Interfaces
// // =======================

// // Meeting type
// // export interface Meeting {
// //   _id: string;
// //   name: string;
// //   location: string;
// //   type: string;
// //   meetingDate: string;
// //   startDate: string;
// //   endDate: string;
// //   meetingLength: string;
// //   owner: string;
// //   description: string;
// //   status: string;
// // }

// export interface Meeting {
//   _id: string
// companyName: string
// location: string
// description: string
// agendaItems?: any
// type: "Annual" | "Board" | "Monthly" | "Quarterly"
// status: string
// name: string
// owner: string
// meetingLength: string
// meetingDate: string
// createdAt: string
// startDate: string
// __v: number
// endDate: string
// updatedAt: string
// agendaId?:any
// }

// // Create Meeting Request
// export interface CreateMeetingRequest {
//   name: string;
//   location: string;
//   type: string;
//   meetingDate: string;
//   startDate: string;
//   endDate: string;
//   meetingLength: string;
//   owner: string;
//   description: string;
//   status: string;
// }

// // Update Meeting Request
// export interface UpdateMeetingRequest extends CreateMeetingRequest {
//   _id: string;
// }

// // Create Agenda Request
// export interface CreateAgendaRequest {
//   meetingId: string;
//   inviteAttendees: { attendees: string[] };
//   welcomeAndOpeningRemark: {
//     presenter: string[];
//     timeAllocated: { hours: number; minutes: number };
//   };
//   agendaItems: {
//     title: string;
//     presenter: string[];
//     timeAllocated: { hours: number; minutes: number };
//     details: string;
//   }[];
// }

// // =======================
// // API Definition
// // =======================
// export const meetingApi = api.injectEndpoints({
//   endpoints: (builder) => ({
//     // ✅ Create Meeting
//     createMeeting: builder.mutation<
//       { success: boolean; message: string; data: Meeting },
//       CreateMeetingRequest
//     >({
//       query: (body) => ({
//         url: "/meetings/create-meeting",
//         method: "POST",
//         body,
//       }),
//       invalidatesTags: ["Meeting"],
//     }),

//     // ✅ Get All Meetings
//     getMeetings: builder.query<{ data: Meeting[] }, void>({
//       query: () => "/meetings/get-all-meeting",
//       providesTags: ["Meeting"],
//     }),
   
//     // ✅ Get upcoming Meetings
//     getUpcomingMeetings: builder.query<{ data: Meeting[] }, void>({
//       query: () => "/meetings/upcoming-meetings",
//       providesTags: ["Meeting"],
//     }),
//     // ✅ Get Past Meetings
//     getPastMeetings: builder.query<{ data: Meeting[] }, void>({
//       query: () => "/meetings/past-meetings",
//       providesTags: ["Meeting"],
//     }),

//     // ✅ Get Single Meeting
//     getMeetingById: builder.query<{ success: boolean; data: Meeting }, string>({
//       query: (_id) => `/meetings/${_id}`,
//       providesTags: (result, error, _id) => [{ type: "Meeting", id: _id }],
//     }),
//     // ✅ Get Single Meeting
//     getAllAgenda: builder.query<{ success: boolean; data: Meeting }, string>({
//       query: (_id) => `/agendas/get-all-agenda/${_id}`,
//       providesTags: (result, error, _id) => [{ type: "Meeting", id: _id }],
//     }),

//     // ✅ Update Meeting
//     updateMeeting: builder.mutation<
//       { success: boolean; message: string; data: Meeting },
//       UpdateMeetingRequest
//     >({
//       query: ({ _id, ...body }) => ({
//         url: `/meetings/${_id}`,
//         method: "PATCH",
//         body,
//       }),
//       invalidatesTags: ["Meeting"],
//     }),

//     // ✅ Delete Meeting
//     deleteMeeting: builder.mutation<{ success: boolean; message: string }, string>({
//       query: (_id) => ({
//         url: `/meetings/${_id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Meeting"],
//     }),

//     // ✅ Create Agenda
//     createAgenda: builder.mutation<
//       { success: boolean; message: string },
//       CreateAgendaRequest
//     >({
//       query: ({ meetingId, ...body }) => ({
//         url: `/agendas/create-agenda/${meetingId}`,
//         method: "POST",
//         body,
//       }),
//       invalidatesTags: ["Meeting"],
//     }),
//   }),
// });

// // =======================
// // Hooks
// // =======================
// export const {
//   useCreateMeetingMutation,
//   useGetMeetingsQuery,
//   useGetUpcomingMeetingsQuery,
//   useGetPastMeetingsQuery,
//   useGetMeetingByIdQuery,
//   useUpdateMeetingMutation,
//   useDeleteMeetingMutation,
//   useCreateAgendaMutation,
//   useGetAllAgendaQuery,    
// } = meetingApi;



// redux/api/meeting/meetingApi.ts
import { api } from "@/redux/services/api";

// =======================
// Interfaces
// =======================

// Meeting type
export interface Meeting {
  _id: string;
  companyName: string;
  location: string;
  description: string;
  agendaItems?:any;
  type: "Annual" | "Board" | "Monthly" | "Quarterly";
  status: string;
  name: string;
  owner: string;
  meetingLength: string;
  meetingDate: string;
  createdAt: string;
  startDate: string;
  __v: number;
  endDate: string;
  updatedAt: string;
  agendaId?: any;
  welcomeAndOpeningRemark?:any
}

// Create Meeting Request
export interface CreateMeetingRequest {
  name: string;
  location: string;
  type: string;
  meetingDate: string;
  startDate: string;
  endDate: string;
  meetingLength: string;
  owner: string;
  description: string;
  status: string;
}

// Update Meeting Request
export interface UpdateMeetingRequest extends CreateMeetingRequest {
  _id: string;
}

// Create Agenda Request
export interface CreateAgendaRequest {
  meetingId: string;
  inviteAttendees: { attendees: string[] };
  welcomeAndOpeningRemark: {
    presenter: string[];
    timeAllocated: { hours: number; minutes: number };
  };
  agendaItems: {
    title: string;
    presenter: string[];
    timeAllocated: { hours: number; minutes: number };
    details: string;
  }[];
}

// Delete Agenda Response
export interface DeleteAgendaResponse {
  success: boolean;
  message: string;
}

// =======================
// API Definition
// =======================
export const meetingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Create Meeting
    createMeeting: builder.mutation<
      { success: boolean; message: string; data: Meeting },
      CreateMeetingRequest
    >({
      query: (body) => ({
        url: "/meetings/create-meeting",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Meeting"],
    }),

    // ✅ Get All Meetings
    getMeetings: builder.query<{ data: Meeting[] }, void>({
      query: () => "/meetings/get-all-meeting",
      providesTags: ["Meeting"],
    }),

    // ✅ Get upcoming Meetings
    getUpcomingMeetings: builder.query<{ data: Meeting[] }, void>({
      query: () => "/meetings/upcoming-meetings",
      providesTags: ["Meeting"],
    }),

    // ✅ Get Past Meetings
    getPastMeetings: builder.query<{ data: Meeting[] }, void>({
      query: () => "/meetings/past-meetings",
      providesTags: ["Meeting"],
    }),
    // ✅ Get Past 2 Meetings
    getPastTwoMeetings: builder.query<{ data: Meeting[] }, void>({
      query: () => "/meetings/past-two-meetings",
      providesTags: ["Meeting"],
    }),
    // ✅ Get next 2 Meetings
    getNextTwoMeetings: builder.query<{ data: Meeting[] }, void>({
      query: () => "/meetings/upcoming-two-meetings",
      providesTags: ["Meeting"],
    }),

    // ✅ Get Single Meeting
    getMeetingById: builder.query<{ success: boolean; data: Meeting }, string>({
      query: (_id) => `/meetings/${_id}`,
      providesTags: (result, error, _id) => [{ type: "Meeting", id: _id }],
    }),

    // ✅ Get All Agenda
    getAllAgenda: builder.query<{ success: boolean; data: Meeting }, string>({
      query: (_id) => `/agendas/get-all-agenda/${_id}`,
      providesTags: (result, error, _id) => [{ type: "Meeting", id: _id }],
    }),
    // ✅ Get My All Agenda
    getMyAllAgenda: builder.query<{ success: boolean; data: Meeting }, string>({
      query: (_id) => `/agendas/get-my-all-agenda/${_id}`,
      providesTags: (result, error, _id) => [{ type: "Meeting", id: _id }],
    }),

    // ✅ Update Meeting
    updateMeeting: builder.mutation<
      { success: boolean; message: string; data: Meeting },
      UpdateMeetingRequest
    >({
      query: ({ _id, ...body }) => ({
        url: `/meetings/${_id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Meeting"],
    }),

    // ✅ Delete Meeting
    deleteMeeting: builder.mutation<{ success: boolean; message: string }, string>({
      query: (_id) => ({
        url: `/meetings/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Meeting"],
    }),

    // ✅ Create Agenda
    createAgenda: builder.mutation<
      { success: boolean; message: string },
      CreateAgendaRequest
    >({
      query: ({ meetingId, ...body }) => ({
        url: `/agendas/create-agenda/${meetingId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Meeting"],
    }),

    // ✅ Delete Single Agenda
    deleteAgenda: builder.mutation<
      DeleteAgendaResponse,
      { agendaId: string; meetingId: string }
    >({
      query: ({ agendaId, meetingId }) => ({
        url: `/agendas/${agendaId}/delete-agenda/${meetingId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Meeting"],
    }),
  }),
});

// =======================
// Hooks
// =======================
export const {
  useCreateMeetingMutation,
  useGetMeetingsQuery,
  useGetUpcomingMeetingsQuery,
  useGetPastMeetingsQuery,
  useGetPastTwoMeetingsQuery,
  useGetNextTwoMeetingsQuery,
  useGetMeetingByIdQuery,
  useUpdateMeetingMutation,
  useDeleteMeetingMutation,
  useCreateAgendaMutation,
  useGetAllAgendaQuery,
  useGetMyAllAgendaQuery,
  useDeleteAgendaMutation, // ✅ Hook for delete agenda
} = meetingApi;
