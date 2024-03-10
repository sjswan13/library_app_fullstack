import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { selectToken } from '../redux/authslice'


function Home() {

  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);

  return (
    <div>
      <h2>Welcome to the Book Buddy Library Page!!</h2>
      <p>Not a member? No problem, you can register for an account here:</p>
      { token ? <Link to='/users/me'>Go to Profile</Link> : <Link to='/users/register'>Register Here!</Link>}
      <p>Already a member?  Login here:</p>
      <button className="loginButton" onClick={() => navigate('/users/login')}>Login Here!</button>
      <button className="books" onClick={() => navigate('/books')}>Books</button>
    </div>
  )
}

export default Home;