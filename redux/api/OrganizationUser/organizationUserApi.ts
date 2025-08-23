import { api } from "@/redux/services/api"

export interface IPermissions {
  foundations: string
  trends: string
  swot: string
  challenges: string
  competitorsAnalysis: string
  clarhetAIRec: string
  alignment: string
  vision: string
  themes: string
  choreographObjectives: string
  teams: string
  generateReport: string
  reportArchives: string
  agendaBuilder: string
  archives: string
}

export interface IOrganizationUserCreate {
  name: string
  email: string
  businessFunction: string
  notes?: string
  companyRole: string
  permissions: IPermissions
}

export interface IOrganizationUser {
  _id: string
  userId: {
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
  }
  businessFunction: string
  notes?: string
  companyName: string
  createdAt: string
  updatedAt: string
}

export interface IUpdateOrganizationUser {
  [key: string]: string
}

export interface ISetPassword {
  password: string
  token: string
}

const url = "/organization";

export const organizationUserApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createOrganizationUser: builder.mutation<any, IOrganizationUserCreate>({
      query: (body) => ({
        url: `${url}/create-organization-user`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["OrganizationUsers"],
    }),

    getAllOrganizationUsers: builder.query<IOrganizationUser[], void>({
      query: () => `${url}/get-all-organization-users`,
      providesTags: ["OrganizationUsers"],
      transformResponse: (response: any) => response.data,
    }),

    getOrganizationUser: builder.query<IOrganizationUser, string>({
      query: (id) => `${url}/${id}`,
      providesTags: (result, error, id) => [{ type: "OrganizationUsers", id }],
      transformResponse: (response: any) => response.data,
    }),
    
    updateOrganizationUser: builder.mutation<any, { id: string; body: IUpdateOrganizationUser }>({
      query: ({ id, body }) => ({
        url: `${url}/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "OrganizationUsers", id }],
    }),
    
    deleteOrganizationUser: builder.mutation<any, string>({
      query: (id) => ({
        url: `${url}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["OrganizationUsers"],
    }),

    
    setOrganizationUserPassword: builder.mutation<any, ISetPassword>({
      query: (body) => ({
        url: `${url}/set-password`,
        method: "PATCH",
        body,
      }),
    }),
  }),
})

export const {
  useCreateOrganizationUserMutation,
  useGetAllOrganizationUsersQuery,
  useGetOrganizationUserQuery,
  useUpdateOrganizationUserMutation,
  useDeleteOrganizationUserMutation,
  useSetOrganizationUserPasswordMutation,
} = organizationUserApi
