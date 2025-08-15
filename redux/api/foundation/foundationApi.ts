import { api } from "@/redux/services/api";

export interface ICapability {
  capability: string;
  type: string;
  _id: string;
}

export interface IIdentity {
  mission: string;
  value: string;
  purpose: string;
}

export interface IZeroIn {
  targetCustomer: string;
  keyCustomerNeed: string;
  valueProposition: string;
}

export interface IFoundation {
  _id: string;
  companyName: string;
  identity?: IIdentity;
  zeroIn?: IZeroIn;
  capabilitys?: ICapability[];
  differentiatingCapabilities: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Interface for individual field updates
export interface IUpdateSingleFieldRequest {
  [key: string]: string; // This allows dynamic field names like { mission: "..." } or { value: "..." } or { purpose: "..." }
}

// Updated response interface to match actual API response
export interface IFoundationResponse {
  success: boolean;
  message: string;
  data: IFoundation;
}

// Updated get identity response interface
export interface IGetIdentityResponse {
  success: boolean;
  message: string;
  data: Array<{
    identity: IIdentity;
    companyName: string;
  }>;
}

export const foundationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    patchFoundation: builder.mutation<
      IFoundationResponse,
      IUpdateSingleFieldRequest
    >({
      query: (body) => {
        const token = typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null;

        return {
          url: "/foundation/create-identity",
          method: "PATCH",
          body,
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        };
      },
      invalidatesTags: ["Foundation"],
    }),
    
    getIdentityData: builder.query<IGetIdentityResponse, void>({
      query: () => {
        const token = typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null;

        return {
          url: "/foundation/get-identity",
          method: "GET",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        };
      },
      providesTags: ["Foundation"],
    })
  }),
});

export const { usePatchFoundationMutation, useGetIdentityDataQuery } = foundationApi;