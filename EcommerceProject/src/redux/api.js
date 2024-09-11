import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const item_api = createApi({
  reducerPath: "item_api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://e-commerce-website-api.onrender.com",
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation } = item_api;