import { IMeta, ITeamMember } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const TEAM_MEMBER_URL = "/team-members";

export const teamMemberApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllTeamMember: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: TEAM_MEMBER_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: ITeamMember[], meta: IMeta) => {
        return {
          teamMembers: response,
          meta,
        };
      },
      providesTags: [tagTypes.teamMember],
    }),

    getSingleTeamMember: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `${TEAM_MEMBER_URL}/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.teamMember],
    }),

    createTeamMember: build.mutation({
      query: (data) => ({
        url: `${TEAM_MEMBER_URL}/create-team-member`,
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.teamMember],
    }),

    updateTeamMember: build.mutation({
      query: (data) => ({
        url: `${TEAM_MEMBER_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.teamMember],
    }),

    deleteTeamMember: build.mutation({
      query: (id) => ({
        url: `${TEAM_MEMBER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.teamMember],
    }),
  }),
});

export const {
  useGetAllTeamMemberQuery,
  useGetSingleTeamMemberQuery,
  useCreateTeamMemberMutation,
  useUpdateTeamMemberMutation,
  useDeleteTeamMemberMutation,
} = teamMemberApi;
