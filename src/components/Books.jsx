/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import React, { useState } from 'react';
import { useFetchAllBooksQuery } from '../API/api';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const AllBooks = () => {
  const { data: booksData, error, isLoading } = useFetchAllBooksQuery();
  const [searchParam, setSearchParam] = useState('');

  const navigate = useNavigate();

  if(isLoading) return <div>Loading...</div>;
  if(error) return <div>Error: {error.message}</div>;

  const books = booksData?.books || [];

  const booksToDisplay = books.filter((book) =>
  book.title.toLowerCase().includes(searchParam.toLowerCase())
  );
  
    return (
      <Box sx={{ padding: '2rem' }}>
        <Typography variant='h4' gutterBottom>
          Book Catalog
        </Typography>
        <Box sx={{ margin: '1rem 0', display: 'flex', justifyContent: 'center' }}>
          <TextField
          variant='outlined'
          placeholder='Search books...'
          onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
          fullWidth
          />
        </Box>
        <List >
          {booksToDisplay.map(book => (
            <ListItem key={book.id} buttonComponent={Link}to={`/books/${book.id}`}>
              <ListItemText primary={book.title} />
            </ListItem>
          ))}
        </List>
        <Box sx={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <Button variant='containted' color='primary' onClick={() => navigate('/users/register')}>
            Register Here! 
          </Button>
          <Button variant='contained' color='secondary' onClick={() => navigate('/users/login')}>
            Login Here!
          </Button>
          <Button variant='outlined' onClick={() => navigate('/')}>
            Home
          </Button> 
        </Box>
      </Box>
    );
};

export default AllBooks;
 