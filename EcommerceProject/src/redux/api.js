import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const item_api = createApi({
  reducerPath: "item_api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
  }),
  tagTypes: ["user", "items", "reviews", "comments"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation({
        query: (body) => ({
            url: "/auth/login",
            method: "POST",
            body,
        }),
    }),
    getItems: builder.query({
        query: (token) => ({
            url: "/api/items",
            headers: {
                authorization: `Bearer ${token}`,
            },
        }),
        providesTags: ["items"]
    }),
    getItemById: builder.query({
        query: ({ token, id }) => ({
            url: `/api/plants/${id}`,
            headers: {
                authorization:`Bearer ${token}`,
            },
        }),
        providesTag: ["item"]
    }),
    getReviewById: builder.query({
      query: ({ token, item_id }) => ({
        url: `/api/reviews/${item_id}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["reviews"],
    }),
    createReview: builder.mutation({
      query: ({ token, body }) => ({
        url: "/api/reviews",
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body,
      }),
      invalidatesTags: ["reviews"],
    }),
    updateReview: builder.mutation({
      query: ({ id, token, body }) => ({
        url: `/api/reviews/${id}`,
        method: "PUT",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body,
      }),
      invalidatesTags: ["reviews", "review"],
    }),
    deleteReview: builder.mutation({
      query: ({ id, token }) => ({
        url: `/api/reviews/${id}`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["reviews", "review"],
    }),
    getCommentById: builder.query({
      query: ({ token, review_id }) => ({
        url: `/api/comments/${review_id}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["comments"],
    }),
    createComment: builder.mutation({
      query: ({ token, body }) => ({
        url: "/api/comments",
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body,
      }),
      invalidatesTags: ["comments"],
    }),
    updateComment: builder.mutation({
      query: ({ id, token, body }) => ({
        url: `/api/comments/${id}`,
        method: "PUT",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body,
      }),
      invalidatesTags: ["comments", "comment"],
    }),
    deleteComment: builder.mutation({
      query: ({ id, token }) => ({
        url: `/api/comments/${id}`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["comments", "comment"],
    }),
  }),
});

export const { 
    useRegisterMutation,
    useLoginMutation,
    useGetItemsQuery,
    useGetItemByIdQuery,
    useGetReviewByIdQuery,
    useCreateReviewMutation,
    useUpdateReviewMutation,
    useDeleteReviewMutation,
    useGetCommentByIdQuery,
    useCreateCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation,
 } = item_api;