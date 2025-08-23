// import { api } from "@/redux/services/api";

// interface StrategicTheme {
//   id: string;
//   name: string;
//   description: string;
// }

// interface CreateStrategicThemeRequest {
//   name: string;
//   description: string;
// }

// export const strategicThemeApi = api.injectEndpoints({
//   endpoints: (builder) => ({
//     // Create Strategic Theme
//     createStrategicTheme: builder.mutation<
//       { success: boolean; message: string; data: StrategicTheme },
//       CreateStrategicThemeRequest
//     >({
//       query: (body) => ({
//         url: "/blueprint/stategic-theme",
//         method: "PATCH", // ✅ use POST (not PATCH) since you are creating
//         body,
//       }),
//       invalidatesTags: ["StrategicTheme"],
//     }),

//     // Get All Strategic Themes (optional if you want listing)
    
//     getStrategicThemes: builder.query<{ data: StrategicTheme[] }, void>({
//       query: () => "/blueprint/stategic-theme",
//       providesTags: ["StrategicTheme"],
//     }),
//   }),
// });

// export const {
//   useCreateStrategicThemeMutation,
//   useGetStrategicThemesQuery,
// } = strategicThemeApi;


import { api } from "@/redux/services/api";

export interface StrategicTheme {
  _id: string; // ✅ use _id since your backend returns _id
  name: string;
  description: string;
}

export interface CreateStrategicThemeRequest {
  name: string;
  description: string;
}

export interface UpdateStrategicThemeRequest {
  _id: string;
  name: string;
  description: string;
}

export const strategicThemeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Create Strategic Theme
    createStrategicTheme: builder.mutation<
      { success: boolean; message: string; data: StrategicTheme },
      CreateStrategicThemeRequest
    >({
      query: (body) => ({
        url: "/blueprint/stategic-theme",
        method: "PATCH", // ✅ corrected from PATCH to POST
        body,
      }),
      invalidatesTags: ["StrategicTheme"],
    }),

    // ✅ Get All Strategic Themes
    getStrategicThemes: builder.query<{ data: StrategicTheme[] }, void>({
      query: () => "/blueprint/stategic-theme",
      providesTags: ["StrategicTheme"],
    }),

    // ✅ Update Strategic Theme
    updateStrategicTheme: builder.mutation<
      { success: boolean; message: string; data: StrategicTheme },
      UpdateStrategicThemeRequest
    >({
      query: ({ _id, ...body }) => ({
        url: `/blueprint/stategic-theme/${_id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["StrategicTheme"],
    }),

    // ✅ Delete Strategic Theme
    deleteStrategicTheme: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (_id) => ({
        url: `/blueprint/stategic-theme/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["StrategicTheme"],
    }),
  }),
});

export const {
  useCreateStrategicThemeMutation,
  useGetStrategicThemesQuery,
  useUpdateStrategicThemeMutation,
  useDeleteStrategicThemeMutation,
} = strategicThemeApi;
