/* TODO - add your code to create a functional React component that renders a login form */
import React, { useState }  from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../API/api';
import { setToken } from '../redux/authslice';

const Login = () => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading, error }] = useLoginMutation();

  async function handleSubmit(e) {
    e.preventDefault();

    
    try {
      const user = await login({ username, password }).unwrap();
      console.log('signup results:', user.token);
      if(response.token) dispatch(setToken(user.token));
      setUsername('');
      setPassword('');
      navigate('/')
    } catch (error) {
      alert("Authorization failed" + (err.data?.message) || "Please Try Again");
      console.log(error.message)
    }
  }

  return (
    <div>
      <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
              />
          </label>
          <label>
            Password:
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              />
          </label>
          <button type='submit' disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
          {error && <p>Login failed: {error.data?.message || 'Please try again'}</p>}
          <button className="books" onClick={() => navigate('/books')}>Available Books</button>
          <button className="homeButton" onClick={() => navigate('/')}>Home</button>
        </form>
    </div>
  );
};

export default Login