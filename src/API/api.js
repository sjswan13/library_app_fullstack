import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api',
    baseUrl: 'http://localhost:3001/api',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if(token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      headers.set("Content-Type", "application/json")
      return headers;
    }, 
    async onError({ error, dispatch }) {
      if (error.status === 401 && error.data?.message === 'jwt expired') {
      dispatch(logoutUser());
      alert('Session expired. Please login again');
      }
  }}),
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
          url: `/books/${bookId}/checkout`,
          method: 'PATCH',
          body,
        })
      }),
      fetchUserDetails: builder.query({
        query: () => '/users/me',
      }),
      fetchCheckedOutBooksByUser: builder.query({
        query: (userId) => `/users/${userId}/checked-out-books`,
      }),
      returnBook: builder.mutation({
        query: ({ id }) => ({
          url: `/books/${id}/return`,
          method: 'PATCH',
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
  useFetchCheckedOutBooksByUserQuery,
  useReturnBookMutation,
  useRefetchCheckedOutBooksQuery,
  
} = api;


