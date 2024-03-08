/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import React from 'react';
import { useFetchAllBooksQuery } from '../API/api';
import { Link, useNavigate } from 'react-router-dom';

const AllBooks = () => {
  const { data: booksData, error, isLoading } = useFetchAllBooksQuery();

  const navigate = useNavigate();

  console.log(booksData, 'books!');

  if(isLoading) return <div>Loading...</div>;
  if(error) return <div>Error: {error.message}</div>;

  const books = booksData?.books;
console.log(books)
  
    return (
      <div>
        <h2>Available Books</h2>
        <ul>
          
          {books.map(book => (
            <li key={book.id}>
              <Link to={`/books/${book.id}`}>{book.title}</Link>
            </li>
          ))}
        </ul>
        <button className="registerButton" onClick={() => navigate('/users/register')}>Register Here!</button>
        <button className="loginButton" onClick={() => navigate('/users/login')}>Login Here!</button>
         <button className="homeButton" onClick={() => navigate('/')}>Home</button>
      </div>
    );
};

export default AllBooks;
 