import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';



function Home() {

  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);

  return (
    <div>
      <div className='home-container'>
        <h2>Welcome to the Book Buddy Library Page!!</h2>
        <p>Not a member? No problem, you can register for an account here:</p>
        { token ? <Link to='/users/me'>Go to Profile</Link> : <Link to='/users/register'>Register Here!</Link>}
        <p>Already a member?  Login here:</p>
        <button className="loginButton" onClick={() => navigate('/users/login')}>Login Here!</button>
        <button className="books" onClick={() => navigate('/books')}>Books</button>
      </div>
      <img className='libraryImg'
        src='https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_504,q_80,w_760/v1/crm/boulder/Boulder-Public-Library_a149f746-5056-a36a-07530dec446a6fe9.jpg' 
        alt='LibraryImg'>
      </img>
    </div>
  )
}

export default Home;