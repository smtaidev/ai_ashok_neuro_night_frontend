import { api } from "@/redux/services/api"

export interface ITeamMember {
  _id: string
  userName: string
  email: string
  companyName: string
  companyRole: string
  role: string
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

export interface ITeam {
  _id: string
  teamName: string
  description: string
  members: (string | ITeamMember)[]
  createdAt: string
  updatedAt: string
}

export interface IChoreograph {
  _id: string
  companyName: string
  alignmentCheckId: string | null
  objectives: any[]
  teams: ITeam[]
  createdAt: string
  updatedAt: string
  __v: number
}

export interface IChoreographResponse {
  success: boolean
  message: string
  data: IChoreograph | null
}

export interface IGetAllTeamsResponse {
  success: boolean
  message: string
  data: {
    teams: ITeam[]
  }
}

export interface IGetSingleTeamResponse {
  success: boolean
  message: string
  data: ITeam
}

export interface IDeleteResponse {
  success: boolean
  message: string
  data: null
}

export interface ITeamRequest {
  teamName: string
  description: string
  members: string[]
}

const url = "/choreograph"


export const choreographApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createChoreographTeam: builder.mutation<IChoreographResponse, ITeamRequest>({
      query: (body) => {
        const token = typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null

        return {
          url,
          method: "PATCH",
          body,
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        }
      },
      invalidatesTags: ["Choreograph"],
    }),

    updateChoreographTeam: builder.mutation<IChoreographResponse, { id: string; body: ITeamRequest }>({
      query: ({ id, body }) => {
        const token = typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null

        return {
          url: `${url}/update-teams/${id}`,
          method: "PATCH",
          body,
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        }
      },
      invalidatesTags: ["Choreograph"],
    }),

    getAllChoreographTeams: builder.query<IGetAllTeamsResponse, void>({
      query: () => {
        const token = typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null
 
        return {
          url,
          method: "GET",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      },
      providesTags: ["Choreograph"],
    }),

    getSingleChoreographTeam: builder.query<IGetSingleTeamResponse, string>({
      query: (id) => {
        const token = typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null
        return {
          url: `${url}/${id}`,
          method: "GET",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      },
      providesTags: ["Choreograph"],
    }),

    getSingleTeamByTeamName: builder.query<IGetSingleTeamResponse, string>({
      query: (teamName) => {
        const token = typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null
        return {
          url: `${url}/${teamName}/get-single-team`,
          method: "GET",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      },
      providesTags: ["Choreograph"],
    }),

    deleteChoreographTeam: builder.mutation<IDeleteResponse, string>({
      query: (id) => {
        const token = typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null

        return {
          url: `${url}/${id}`,
          method: "DELETE",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      },
      invalidatesTags: ["Choreograph"],
    }),
  
  }),
})

export const {
  useCreateChoreographTeamMutation,
  useUpdateChoreographTeamMutation,
  useGetAllChoreographTeamsQuery,
  useGetSingleChoreographTeamQuery,
  useGetSingleTeamByTeamNameQuery,
  useDeleteChoreographTeamMutation,
} = choreographApi
