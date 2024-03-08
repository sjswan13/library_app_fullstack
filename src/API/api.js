import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import RegistrationForm from '../components/Register';

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
          query: (credentials) => ({
            url: '/users/register',
            method: 'POST',
            body: credentials,
          }),
      }),
      authenticate: builder.query({
        query: () => ({
          url:'/users/me'
        })
      }),
      login: builder.mutation({
        query: (credentials) => ({
          url: '/users/login',
          method: 'POST',
          body: credentials,
        }),
      }),
      home: builder.query({
        query: () => '/',
      })
    }),

});


export const { 
  useFetchAllBooksQuery, 
  useRegistrationFormMutation, 
  useFetchBookByIdQuery, 
  useLoginMutation, 
  useAuthenticateQuery
} = api;


