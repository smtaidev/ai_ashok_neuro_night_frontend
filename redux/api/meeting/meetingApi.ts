// meetingApi.ts
import { api } from "@/redux/services/api";

// =======================
// Interfaces
// =======================

// Meeting type
export interface Meeting {
  _id: string;
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

// Create request
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

// Update request
export interface UpdateMeetingRequest extends CreateMeetingRequest {
  _id: string;
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
  }),
});

// =======================
// Hooks
// =======================
export const {
  useCreateMeetingMutation,
  useGetMeetingsQuery,
  useUpdateMeetingMutation,
  useDeleteMeetingMutation,
} = meetingApi;
