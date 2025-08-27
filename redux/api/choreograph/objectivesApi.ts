import { api } from "@/redux/services/api"

export interface IObjective {
  _id: string
  title: string
  description?: string
  startDate?: string
  endDate?: string
  priority?: string
  progress?: string
  fundingAllocated?: string
  envSocialIssues?: string
  envSocialDetails?: string
  risksAssociated?: string
  riskDetails?: string
  objectiveOwner?: string
  assignedTeamMembers?: string[]
  invitedTeamMembers?: string[]
  crossTeamCollaboration?: string
  businessGoals?: string
  termType?: string
  specificStrategic?: string
  necessaryResources?: string
  additionalTalent?: string
  potentialChallenges?: string
  priorityLevel?: string
  department?: string
  completeness?: number
  talent?: string
  challengesAndRollbacks?: string
  risk?: string
  envAndSocial?: string
  createdAt?: string
  updatedAt?: string
}

export interface IChoreograph {
  _id: string
  companyName: string
  alignmentCheckId: string | null
  objectives: IObjective[]
  teams: any[]
  createdAt: string
  updatedAt: string
  __v: number
}

export interface IChoreographResponse {
  success: boolean
  message: string
  data: IChoreograph | null
}

export interface IGetAllObjectivesResponse {
  success: boolean
  message: string
  data: IObjective[]
}

export interface IGetSingleObjectiveResponse {
  success: boolean
  message: string
  data: IObjective
}

export interface IDeleteResponse {
  success: boolean
  message: string
  data: null
}

export interface IObjectiveRequest {
  title: string
  description?: string
  startDate?: string
  endDate?: string
  priority?: string
  progress?: string
  fundingAllocated?: string
  envSocialIssues?: string
  envSocialDetails?: string
  risksAssociated?: string
  riskDetails?: string
  objectiveOwner?: string
  assignedTeamMembers?: string[]
  invitedTeamMembers?: string[]
  crossTeamCollaboration?: string
  businessGoals?: string
  termType?: string
  specificStrategic?: string
  necessaryResources?: string
  additionalTalent?: string
  potentialChallenges?: string
  priorityLevel?: string
  department?: string
  completeness?: number
  talent?: string
  challengesAndRollbacks?: string
  risk?: string
  envAndSocial?: string
}

const url = "/choreograph/objective"

export const objectivesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Create Objective
    createObjective: builder.mutation<IChoreographResponse, IObjectiveRequest>({
      query: (body) => {
        const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null
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
      invalidatesTags: ["Objective"],
    }),

    // Update Objective
    updateObjective: builder.mutation<IChoreographResponse, { id: string; body: Partial<IObjectiveRequest> }>({
      query: ({ id, body }) => {
        const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null
        return {
          url: `${url}/update-objective/${id}`,
          method: "PATCH",
          body,
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        }
      },
      invalidatesTags: ["Objective"],
    }),

    // Get All Objectives
    getAllObjectives: builder.query<IGetAllObjectivesResponse, void>({
      query: () => {
        const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null
        return {
          url: `${url}/get-all`,
          method: "GET",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      },
      providesTags: ["Objective"],
    }),

    // Get Single Objective
    getSingleObjective: builder.query<IGetSingleObjectiveResponse, string>({
      query: (id) => {
        const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null
        return {
          url: `${url}/${id}`,
          method: "GET",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      },
      providesTags: ["Objective"],
    }),

    // Delete Objective
    deleteObjective: builder.mutation<IDeleteResponse, string>({
      query: (id) => {
        const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null
        return {
          url: `${url}/${id}`,
          method: "DELETE",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      },
      invalidatesTags: ["Objective"],
    }),
  }),
})

export const {
  useCreateObjectiveMutation,
  useUpdateObjectiveMutation,
  useGetAllObjectivesQuery,
  useGetSingleObjectiveQuery,
  useDeleteObjectiveMutation,
} = objectivesApi
