import { api } from "@/redux/services/api";

export interface Talent {
  _id: string;
  companyName: string;
  talent: string;
  function: string;
  identifiedSkillsGaps: string;
  priorityForFillingGaps: string;
  trainingAndDevelopmentNeeds: string;
  marketTrendsAffectingWorkforce: string;
  talentShortageRisks: string;
  regulatoryChanges: string;
  otherTalentRelatedRisks: string;
  summary: string;
  actionItems: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CreateTalentResponse {
  success: boolean;
  message: string;
  data: Talent;
}







export const talentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Create Talent
    createTalent: builder.mutation<CreateTalentResponse, Partial<Talent>>({
      query: (body) => ({
        url: "/talents/create-talent",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Talents"],
    }),

    createFunction: builder.mutation<any, any>({
      query: (body) => ({
        url: "/finalcialTracker",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Talents"],
    }),
  }),
});

export const { useCreateTalentMutation, useCreateFunctionMutation } = talentApi;
