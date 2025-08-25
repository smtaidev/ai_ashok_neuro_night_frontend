import { api } from "@/redux/services/api"

export interface ITeamMember {
  _id: string
  userName: string
  email: string
  companyName: string
  companyRole: string
  skills: string[]
  location: string
  teamRole: string
  type: string
  availability: string
  role: string
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

export interface ICreateTeamMember {
  memberId: string
  location: string
  skills: string[]
  teamRole: string
  type: string
  availability: number
}

export interface IUpdateTeamMember {
  name?: string
  role?: string
  skills?: string[]
  allocation?: string
}

const url = '/choreograph'

export const teamMemberApi = api.injectEndpoints({
  endpoints: (builder) => ({
    
    createTeamMember: builder.mutation<
      { success: boolean; message: string; data: any },
      { choreographId: string; body: ICreateTeamMember }
    >({
      query: ({ choreographId, body }) => ({
        url: `${url}/${choreographId}/members`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["TeamMember"],
    }),
    
    getAllMembers: builder.query<
      { success: boolean; message: string; data: ITeamMember[] },
      { teamId: string }
    >({
      query: ({ teamId }) => `${url}/${teamId}/members`,
      providesTags: ["TeamMember"],
    }),
    
    getSingleMember: builder.query<
      { success: boolean; message: string; data: ITeamMember },
      { teamId: string; memberId: string }
    >({
      query: ({ teamId, memberId }) =>
        `${url}/${teamId}/members/${memberId}`,
      providesTags: (result, error, { memberId }) => [{ type: "TeamMember", id: memberId }],
    }),
    
    updateTeamMember: builder.mutation<
      { success: boolean; message: string; data: ITeamMember },
      { teamId: string; memberId: string; body: IUpdateTeamMember }
    >({
      query: ({ teamId, memberId, body }) => ({
        url: `${url}/${teamId}/members/${memberId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { memberId }) => [
        { type: "TeamMember", id: memberId },
        "TeamMember",
      ],
    }),

    deleteTeamMember: builder.mutation<
      { success: boolean; message: string; data: null },
      { choreographId: string; memberId: string }
    >({
      query: ({ choreographId, memberId }) => ({
        url: `${url}/${choreographId}/members/${memberId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TeamMember"],
    }),
  }),

  overrideExisting: false,
})

export const {
  useCreateTeamMemberMutation,
  useGetAllMembersQuery,
  useGetSingleMemberQuery,
  useUpdateTeamMemberMutation,
  useDeleteTeamMemberMutation,
} = teamMemberApi
