/* TODO - add your code to create a functional React component that renders a login form */
import React, { useState }  from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../API/api';
import { setToken } from '../redux/authslice';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

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
      console.log('signup results:', response.token);
       
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
    <Container component='main' maxWidth='xs'>
      <Box
      sx={{
        marginTop: 8,
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      >
      <Typography component='h1' variant='h5'>
        Login
      </Typography>
      <Box 
      component='form'
      onSubmit={handleSubmit}
      noValidate
      sx={{ mt: 1 }}
      >
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          label="Email Address"
          name='email'
          autoComplete='email'
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        >
        </TextField>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />  
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
          disabled={isUpdating}  
        >
          {isUpdating ? 'Logging in...' : 'Log In'}
        </Button>
        {error && (
          <Typography color='error' sx={{ mt: 2 }}>
            Login Failed: {error.data?.message || 'Please Try Again'}
          </Typography>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2}}>
          <Button variant='outlined' onClick={() => navigate('/books')}>Books</Button>
          <Button variant='outlined' onClick={() => navigate('/')}>Home</Button>
        </Box>
      </Box>
      </Box>
    </Container>
  );
};

export default Login