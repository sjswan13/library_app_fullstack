/* TODO - add your code to create a functional React component that renders a login form */
import React, { useState }  from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginFunctionMutation } from '../API/api';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading, error }] = useLoginFunctionMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      const user = await login({ username, password }).unwrap();
      console.log('Login successful:', user);
      navigate('/');
    } catch (err) {
      console.error('Login Failed:', err);
    }
  };

  return (
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
    </form>
  );
};

export default LoginForm