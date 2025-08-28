
// User type
export interface CompanyUser {
  isSubscribed: boolean;
  foundationId: string | null;
  _id: string;
  userName: string;
  email: string;
  password: string;
  companyName: string | null;
  companyRole: string | null;
  role: "superAdmin" | "admin" | "user"; // you can expand if there are other roles
  isDeleted: boolean;
  __v: number;
  createdAt: string;
  updatedAt: string;
}
// Single User type
export interface ClarhetUser {
  _id: string;
  userName: string;
  email: string;
  password: string;
  role: "superAdmin" | "admin" | "support" | "finance"; // extend if needed
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// API response type
export interface GetClarhetUsersResponse {
  success: boolean;
  message: string;
  data: ClarhetUser[];
}

// API response type
export interface GetCompanyAllUserResponse {
  success: boolean;
  message: string;
  data: CompanyUser[];
}


import { api } from "@/redux/services/api";


export const superAdminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get All Users
    getCompanyAllUser: builder.query<GetCompanyAllUserResponse, void>({
      query: () => "/user",
      providesTags: ["superUsers"],
    }),
    getClarhetAllUser: builder.query<GetClarhetUsersResponse, void>({
      query: () => "/user/clarhet/get-clarhet-user",
      providesTags: ["superUsers"],
    }),
  }),
});

export const { useGetCompanyAllUserQuery, useGetClarhetAllUserQuery } = superAdminApi;
