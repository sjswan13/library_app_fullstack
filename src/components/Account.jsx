import React from 'react'
import Logout from './Logout'
import { useAuthenticateQuery, useFetchUserDetailsQuery, useFetchCheckedOutBooksQuery, useReturnBookMutation } from "../API/api";
import { Typography, Button, List, ListItem, ListItemText, Box } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

function Profile() {
  
  const { data, error, isLoading } = useAuthenticateQuery();
  const { data: userDetails, error: userError, isLoading: userLoading } = useFetchUserDetailsQuery();
  const { data: checkedOutBooks, error: booksError, isLoading: booksLoading, refetch } = useFetchCheckedOutBooksQuery();
  const [returnBook, {isLoading: isUpdating, returnData}] = useReturnBookMutation();

  const handleReturnBook = async (id) => {
    try{
      await returnBook({ id }).unwrap();
      // await refetchCheckedOutBooks();
      refetch();
    } catch (error) {
      console.error('Error returning book:', error);
    }
  };

  if(isLoading || userLoading || booksLoading) return <div>Loading...</div>;
  if (error || userError || booksError) {
    return <div>Error: {error ? error.message : userError ? userError.message : booksError.message}</div>;
  }

  const userFullName = userDetails ? `${userDetails.firstname || ''} ${userDetails.lastname || ''}` : '';
  const checkedOutBooksArray = checkedOutBooks.reservation || [];
  
  if(!data.isLoggedIn) {
    return (
      <Box sx={{ p: 2 }}>
        <Button
        startIcon={<ArrowBackIcon/>}
        sx={{ mb: 2 }}
        onClick={() => window.history.back()}
        >
        Back to Catalog
      </Button>
        <Typography variant='h4' gutterBottom>Welcome {data.firstname}!</Typography>
        <Typography variant='h5' gutterBottom>Account Details:</Typography>
        <Typography>Name: {userFullName}</Typography>
        <Typography>Email: {data.email}</Typography>
        <Typography variant='h5' gutterBottom>Books Currently Checked Out:</Typography>

        <List>
          {checkedOutBooksArray.map((reservation) => (
            <ListItem key={reservation.id} divider>
              <ListItemText
                primary={reservation.title}
                secondary={`Author: ${reservation.author}`}
                />
              <Button variant='containted' color='primary' onClick={() => handleReturnBook(reservation.id)} sx={{ mr: 1 }}>
                Return Book
              </Button>
            </ListItem>
          ))}
        </List>
        <Logout />
      </Box>
    );
  }
  return <Typography>User is Logged in</Typography>;
}


export default Profile;
