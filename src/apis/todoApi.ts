import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  // The "endpoints" represent operations and requests for this server
  endpoints: builder => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    getTodos: builder.query<any, string>({
      // The URL for the request is '/fakeApi/posts'
      query: (id) => `todos/${id}`
    })
  })
});

// 這裡的query名稱，會依照上面endpoint取的名字加上use和query
export const { useGetTodosQuery } = todoApi;