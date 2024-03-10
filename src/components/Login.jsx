/* TODO - add your code to create a functional React component that renders a login form */
import React, { useState }  from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../API/api';
import { setToken } from '../redux/authslice';

const Login = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading: isUpdating, error, data }] = useLoginMutation();

  async function handleSubmit(e) {
    e.preventDefault();

    const validateInputs = (input) => {
      return input.trim().length > 0;
    }

    if(!validateInputs(email) || !validateInputs(password)) {
      alert("You must enter both email and password")
      return;
    }

    try {

      const response = await login({ email, password }).unwrap();
     
       
      if(response.token) {
        dispatch(setToken(response.token))
      };
      setEmail('');
      setPassword('');
      navigate('/')
    } catch (error) {
      alert("Authorization failed" + (error.data?.message) || "Please Try Again");
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <button type='submit'>Log In</button>
          {error && <p>Login failed: {error.data?.message || 'Please try again'}</p>}
          <button className="books" onClick={() => navigate('/books')}>Books</button>
          <button className="homeButton" onClick={() => navigate('/')}>Home</button>
        </form>
    </div>
  );
};

export default Login