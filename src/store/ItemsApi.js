import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const ItemsApi = createApi({
  reducerPath: "itemsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://s10.syntradeveloper.be/api/users/",
  }),
  refetchOnReconnect: true,
  refetchOnFocus: true,
  endpoints: (builder) => ({
    getAllItems: builder.query({
      query: () => ``,
      providesTags: () => ["Items"],
    }),
    postItem: builder.mutation({
      query: (id, body) => ({
        url: `items/${id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Items"],
    }),
    deleteItem: builder.mutation({
      query: (id, item_id) => ({
        url: `${id}/items/${item_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Items"],
    }),
    // changeItem: builder.mutation({
    //   query: ({ id, newName, newLastName, newAge }) => ({
    //     url: `${id}`,
    //     method: "PUT",
    //     body: {
    //       name: newName,
    //       last_name: newLastName,
    //       age: newAge,
    //     },
    //   }),
    //   invalidatesTags: ["Items"],
    // }),
  }),
});

export default ItemsApi;
