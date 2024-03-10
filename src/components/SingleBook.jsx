/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import React from 'react';
import {useParams, useNavigate } from 'react-router-dom';
import { useFetchBookByIdQuery, useCheckoutBookMutation } from '../API/api';
import CheckoutBook from './CheckoutBook';
import { useSelector } from 'react-redux';


const SingleBook= () => {
  const { bookId } = useParams();
  const { data: book, error, isLoading, refetch } = useFetchBookByIdQuery(bookId);
  const [checkout, { isLoading: isUpdating, data}] = useCheckoutBookMutation();
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);

  async function handleCheckoutClick(e) {
    e.preventDefault();

    try {
     
      const response = await checkout({ bookId, available: false }).unwrap();
      refetch();
      
    } catch (error) {
      console.log(error.message)
    }
  }

 


  if(isLoading) return <div>Loading...</div>;
  if(error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {book && (
        <div>
          <h2>{book.book.title}</h2>
          <img src={book.book.coverimage} alt={`Cover of ${book.title}`} style={{ width: '200px'}} />
          <p>Author: {book.book.author}</p>
          <p>Description: {book.book.description}</p>
          <p>Available for Checkout?{book.book.available ? ' Yes' : ' No'}</p>
          <button className="homeButton" onClick={() => navigate('/')}>Home</button>
          { token && book.book.available ? <CheckoutBook handleCheckoutClick={handleCheckoutClick} /> : null}
        </div>
      )}
    </div>
  );
};

export default SingleBook;