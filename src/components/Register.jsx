/* TODO - add your code to create a functional React component that renders a registration form */
import { useState } from 'react';
import { useRegistrationFormMutation } from '../API/api';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/authslice';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material'

export default function RegistrationForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading: isUpdating, error, data}] = useRegistrationFormMutation();

  const validateInputs = (input) => {
    return input.trim().length > 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if(!validateInputs(email) || !validateInputs(password)) {
      alert("You must enter both email and password")
      return;
    }

    try {
      const response = await register({ email, password, firstname, lastname }).unwrap();
   

      if(response.token) {
        dispatch(setToken(response.token));
      }

      setEmail('');
      setPassword('');
      setfirstname('')
      setlastname('')
      navigate('/users/me')
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <Container maxWidth='sm'>
      <Typography variant='h4' component='h1' gutterBottom>
        Register
      </Typography>
        <Box
          component='form'
          onSubmit = {handleSubmit}
          noValidate
          sm={{ mt: 1 }}
        >
        <TextField
          margin='normal'
          required
          fullWidth
          label='Email Address'
          name='email'
          autoComplete='email'
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField 
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="firstname"
          label="First Name"
          autoComplete="firstname"
          value={firstname}
          onChange={(e) => setfirstname(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="lastname"
          label="Last Name"
          autoComplete="lastname"
          value={lastname}
          onChange={(e) => setlastname(e.target.value)}
        />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
          disabled={isUpdating}
        >
          {isUpdating ? 'Registering...' : 'Register'}
        </Button>
        {error && (
          <Typography color='error'>
            Registration Failed: {error.data?.message || "Please Try Again"}
          </Typography>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2}}>
          <Button variant='outlined' onClick={() => navigate('/')}>Home</Button>
          <Button variant='outlined' onClick={() => navigate('/books')}>Books</Button>
        </Box>
      </Box>
    </Container>
  )
}