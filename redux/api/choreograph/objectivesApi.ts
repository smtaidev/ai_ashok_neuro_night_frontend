import { api } from "@/redux/services/api"

export interface IRiskOrChallenge {
  lavel: "High" | "Medium" | "Low" | string;
  description: string;
}

export interface IObjective {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  priority: "High" | "Medium" | "Low" | string;
  progress: string;
  fundingAllocated: string;
  envSocialIssues: "Yes" | "No" | string;
  envSocialDetails?: string;
  risksAssociated: "Yes" | "No" | string;
  riskDetails?: IRiskOrChallenge;
  potentialChallenges?: IRiskOrChallenge;
  objectiveOwner: string;
  assignedTeamMembers: string[];
  invitedTeamMembers: string[];
  crossTeamCollaboration: "Yes" | "No" | string;
  businessGoals: string;
  termType: "Annual" | "Quarterly" | "Monthly" | string;
  specificStrategic: "Yes" | "No" | string;
  necessaryResources: "Yes" | "No" | string;
  additionalTalent?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITeam {
  _id: string;
  teamName: string;
  description: string;
  members: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ICompanyData {
  _id: string;
  companyName: string;
  alignmentCheckId: string | null;
  objectives: IObjective[];
  teams: ITeam[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IObjectiveResponse {
  success: boolean;
  message: string;
  data: ICompanyData;
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
  title: string;
  description: string;
  startDate: string; // ISO date string (e.g., "2025-09-01")
  endDate: string;   // ISO date string (e.g., "2026-09-01")
  priority: "High" | "Medium" | "Low" | string;
  progress: string;
  fundingAllocated: string;

  envSocialIssues: "Yes" | "No" | string;
  envSocialDetails?: string;

  risksAssociated: "Yes" | "No" | string;
  riskDetails?: {
    lavel: "High" | "Medium" | "Low" | string;
    description: string;
  };

  objectiveOwner: string; // userId reference
  assignedTeamMembers: string | string[]; // could be single or multiple
  invitedTeamMembers: string | string[];
  crossTeamCollaboration: "Yes" | "No" | string;

  businessGoals: string; // business goal id
  termType: "Annual" | "Quarterly" | "Monthly" | string;
  specificStrategic: "Yes" | "No" | string;

  necessaryResources: "Yes" | "No" | string;
  additionalTalent?: string;

  potentialChallenges?: {
    lavel: "High" | "Medium" | "Low" | string;
    description: string;
  };
}

export interface IRiskOrChallenge {
  lavel: "High" | "Medium" | "Low" | string;
  description: string;
}

export interface IObjective {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  priority: "High" | "Medium" | "Low" | "Urgent" | string;
  progress: string;
  fundingAllocated: string;
  envSocialIssues: "Yes" | "No" | string;
  envSocialDetails?: string;
  risksAssociated: "Yes" | "No" | string;
  riskDetails?: IRiskOrChallenge;
  potentialChallenges?: IRiskOrChallenge;
  objectiveOwner: string;
  assignedTeamMembers: string[];
  invitedTeamMembers: string[];
  crossTeamCollaboration: "Yes" | "No" | string;
  businessGoals: string;
  termType: "Annual" | "Quarterly" | "Monthly" | string;
  specificStrategic: "Yes" | "No" | string;
  necessaryResources: "Yes" | "No" | string;
  additionalTalent?: string;
  createdAt: string;
  updatedAt: string;
}

interface IBusinessGoal {
  _id: string;
  strategicID: string;
  title: string;
  description: string;
  related_strategic_theme: string;
  priority: "High" | "Medium" | "Low" | string;
  resource_readiness: "Yes" | "No" | string;
  duration: "Short-term" | "Long-term" | string;

  // Impact Ratings
  impact_ratings: {
    risks: "High" | "Medium" | "Low" | string;
    compliance: "High" | "Medium" | "Low" | string;
    culture: "High" | "Medium" | "Low" | string;
    change_management: "High" | "Medium" | "Low" | string;
    l_and_d: "High" | "Medium" | "Low" | string;
    capabilities: "High" | "Medium" | "Low" | string;
    _id: string;
  };

  esg_issues: "Yes" | "No" | string;
  new_capabilities_needed: "Yes" | "No" | string;
  existing_capabilities_to_enhance: "Yes" | "No" | string;

  capabilityDescription?: string;
  capabilityEnhancement?: string;
  capabilityType?: string;
  capabilityInfluenced?: string[];
  capabilityOwners?: string[];

  changeTransformation?: string;
  culturalRealignment?: string;
  enhancementDetails?: string;
  environmentalIssuesDetails?: string;

  funding: number;
  goalProgress: number;
  goalTimelineEnd: string;
  goalTimelineStart: string;
  goal_impact: "High" | "Medium" | "Low" | string | null;

  hasTalent: "Yes" | "No" | string;
  isSpecificStrategic: "Yes" | "No" | string;

  newCapabilityName?: string;
  otherDetails?: string;
  regulatoryCompliance?: string;
  resourcesDetails?: string;
  risksChallenges?: string;
  talentDetails?: string;

  goalOwner?: string[];
  assigned_functions?: string[];

  objectives: IObjective[];
}

export interface IStrategicTheme {
  _id: string;
  name: string;
  description: string;
  businessGoals: IBusinessGoal[];
}

// 3️⃣ Final Response Type
export interface IObjectivesOverviewResponse {
  success: boolean;
  message: string;
  data: IStrategicTheme[];
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

    // Get All Objectives Overview
    getAllObjectivesOverview: builder.query<IObjectivesOverviewResponse, void>({
      query: () => {
        const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null
        return {
          url: `${url}/get-overviews`,
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
  useGetAllObjectivesOverviewQuery,
  useGetSingleObjectiveQuery,
  useDeleteObjectiveMutation,
} = objectivesApi
