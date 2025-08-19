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
  [key: string]: string; 
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

export interface IGetZeroInResponse{
  success: boolean;
  message: string;
  data: Array<{
    zeroIn: IZeroIn;
    companyName: string;
  }>;
}

export interface IGetCapabilitiesResponse {
  success: boolean;
  message: string;
  data: {
    identity: IIdentity;
    zeroIn: IZeroIn;
    _id: string;
    companyName: string;
    capabilitys: ICapability[];
    differentiatingCapabilities: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

const url = "/foundation"

export const foundationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    patchFoundationIdentity: builder.mutation<
      IFoundationResponse,
      IUpdateSingleFieldRequest
    >({
      query: (body) => {
        const token = typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null;

        return {
          url: `${url}/create-identity`,
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
          url: `${url}/get-identity`,
          method: "GET",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        };
      },
      providesTags: ["Foundation"],
    }),
    patchFoundationZeroIn: builder.mutation<
      IFoundationResponse,
      IUpdateSingleFieldRequest
    >({
      query: (body) => {
        const token = typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null;

        return {
          url: `${url}/create-zero`,
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
    
    getZeroInData: builder.query<IGetZeroInResponse, void>({
      query: () => {
        const token = typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null;

        return {
          url: `${url}/get-zero`,
          method: "GET",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        };
      },
      providesTags: ["Foundation"],
    }),

    patchFoundationCapabilities: builder.mutation<
      IFoundationResponse,
      IUpdateSingleFieldRequest
    >({
      query: (body) => {
        const token = typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null;

        return {
          url: `${url}/create-capability`,
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

    getCapabilitiesData: builder.query<IGetCapabilitiesResponse, void>({
      query: () => {
        const token = typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null;

        return {
          url: `${url}/get-capability`,
          method: "GET",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        };
      },
      providesTags: ["Foundation"],
    }),

    // patchSingleFoundationCapability: builder.mutation<
    //   IFoundationResponse,
    //   IUpdateSingleFieldRequest
    // >({
    //   query: (body: any, id : string) => {
    //     const token = typeof window !== "undefined"
    //       ? localStorage.getItem("accessToken")
    //       : null;

    //     return {
    //       url: `${url}/${id}/update-capability`,
    //       method: "PATCH",
    //       body,
    //       headers: {
    //         Authorization: token ? `Bearer ${token}` : "",
    //         "Content-Type": "application/json",
    //       },
    //     };
    //   },
    //   invalidatesTags: ["Foundation"],
    // })

  }),
});

export const { 
  usePatchFoundationIdentityMutation, useGetIdentityDataQuery, usePatchFoundationZeroInMutation, useGetZeroInDataQuery,
  useGetCapabilitiesDataQuery, usePatchFoundationCapabilitiesMutation
} = foundationApi;