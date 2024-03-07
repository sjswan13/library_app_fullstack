/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import React from 'react';
import {useParams, useNavigate } from 'react-router-dom';
import { useFetchBookByIdQuery } from '../API/api';

const SingleBook= () => {
  const { bookId } = useParams();
  const { data: book, error, isLoading } = useFetchBookByIdQuery(bookId);

  const navigate = useNavigate();

  console.log('book data', book);
  console.log ('loading', isLoading);
  console.log('Error', error)

  if(isLoading) return <div>Loading...</div>;
  if(error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {book && (
        <div>
          <h2>{book.title}</h2>
          <img src={book.book.coverimage} alt={`Cover of ${book.title}`} style={{ width: '200px'}} />
          <p>Author: {book.book.author}</p>
          <p>Description: {book.book.description}</p>
          <button className="homeButton" onClick={() => navigate('/')}>Home</button>
        </div>
      )}
    </div>
  );
};

export default SingleBook;