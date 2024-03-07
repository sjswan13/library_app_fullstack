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

  const [register, { isLoaging: isUpdating, error, data}] = useRegistrationFormMutation();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await register({ username, password }).unwrap();
      console.log('signup results:', response.token);
      dispatch(setToken(response.token));
      setUsername('');
      setPassword('');
      navigate('/')
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div>
      <h2>Register</h2>
      {/* {successMessage && <p>{successMessage}<p/>} */}
      {/* {error && <p>{error}<p/>} */}
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
        <button>Submit</button>
        <button className="homeButton" onClick={() => navigate('/')}>Home</button>
      </form>
    </div>
  )
}