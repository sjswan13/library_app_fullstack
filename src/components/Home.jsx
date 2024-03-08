import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {

  const navigate = useNavigate();

  return (
    <div>
      <h2>Welcome to the Book Buddy Library Page!!</h2>
      <p>Not a member? No problem, you can register for an account here:</p>
      <button className="registerButton" onClick={() => navigate('/users/register')}>Register Here!</button>
      <p>Already a member?  Login here:</p>
      <button className="loginButton" onClick={() => navigate('/users/login')}>Login Here!</button>
      <button className="books" onClick={() => navigate('/books')}>Available Books</button>
    </div>
  )
}

export default Home;