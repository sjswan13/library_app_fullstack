/* TODO - add your code to create a functional React component that renders a registration form */
import { useState } from 'react';
import { useRegistrationFormMutation } from '../API/api';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/authslice';
import { useNavigate } from 'react-router-dom';

export default function RegistrationForm() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading: isUpdating, error, data}] = useRegistrationFormMutation();

  const validateInputs = (input) => {
    return input.trim().length > 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if(!validateInputs(username) || !validateInputs(password)) {
      alert("You must enter both username and password")
      return;
    }

    try {
      const response = await register({ username, password }).unwrap();
      console.log('signup results:', response.token);

      if(response.token) {
        dispatch(setToken(response.token));
      }

      setUsername('');
      setPassword('');
      navigate('/users/me')
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div>
      <h2>Register</h2>
        <form onSubmit = {handleSubmit}>
          <label>
            Username:{" "}
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              />
          </label>
          <label>
            Password:{" "}
            <input 
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            />
          </label>
          <button type='submit' disabled={isUpdating}>
            {isUpdating ? 'Registering...' : 'Register'}
            </button>
            {error && <p>Registration failed: {error.data?.message || "Please try again"}</p>}
          <button className="homeButton" onClick={() => navigate('/')}>Home</button>
          <button className="books" onClick={() => navigate('/books')}>Available Books</button>
        </form>
    </div>
  )
}