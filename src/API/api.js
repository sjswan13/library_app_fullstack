import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import RegistrationForm from '../components/Register';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books',
  }),
    endpoints: (builder) => ({
      fetchAllBooks: builder.query({
        query: () => '/',
      }),
      fetchBookById: builder.query({
        query: (bookId) => `/${bookId}`,
      }),
      registrationForm: builder.mutation({
          query: (credentials) => ({
            url: '/users/register',
            method: 'POST',
            body: credentials,
          }),
      }),
      loginFunction: builder.mutation({
        query: (credentials) => ({
          url: '/users/login',
          method: 'POST',
          body: credentials,
        }),
      })
    })
});


export const { 
  useFetchAllBooksQuery, 
  useRegistrationFormMutation, 
  useFetchBookByIdQuery, 
  useLoginFunctionMutation, 
} = api;


