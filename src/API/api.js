import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if(token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      headers.set("Content-Type", "application/json")
      return headers;
    }
  }),
    endpoints: (builder) => ({
      fetchAllBooks: builder.query({
        query: () => '/books',
      }),
      fetchBookById: builder.query({
        query: (bookId) => `/books/${bookId}`,
      }),
      registrationForm: builder.mutation({
          query: (body) => ({
            url: '/users/register',
            method: 'POST',
            body,
          }),
      }),
      authenticate: builder.query({
        query: () => ({
          url:'/users/me'
          
        })
      }),
      login: builder.mutation({
        query: (body) => ({
          url: '/users/login',
          method: 'POST',
          body,
        }),
      }),
      home: builder.query({
        query: () => '/', 
      }),
      checkoutBook: builder.mutation({
        query: ({ bookId, ...body }) => ({
          url: `/books/${bookId}`,
          method: 'PATCH',
          body,
        })
      }),
      fetchUserDetails: builder.query({
        query: () => '/users/me',
      }),
      fetchCheckedOutBooks: builder.query({
        query: () => `/reservations`,
      }),
      returnBook: builder.mutation({
        query: ({ id }) => ({
          url: `/reservations/${id}`,
          method: 'DELETE',
        }),
      }),
      refetchCheckedOutBooks: builder.query({
        query: () => '/reservations',
      }),
    }),
});


export const { 
  useFetchAllBooksQuery, 
  useRegistrationFormMutation, 
  useFetchBookByIdQuery, 
  useLoginMutation, 
  useAuthenticateQuery,
  useCheckoutBookMutation,
  useFetchUserDetailsQuery,
  useFetchCheckedOutBooksQuery,
  useReturnBookMutation,
  useRefetchCheckedOutBooksQuery,
} = api;


