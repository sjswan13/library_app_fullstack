/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import Logout from './Logout'
import { useAuthenticateQuery, useFetchUserDetailsQuery, useFetchCheckedOutBooksQuery, useReturnBookMutation } from "../API/api";

function Profile() {
  
  const { data, error, isLoading } = useAuthenticateQuery();
  const { data: userDetails, error: userError, isLoading: userLoading } = useFetchUserDetailsQuery();
  const { data: checkedOutBooks, error: booksError, isLoading: booksLoading, refetch } = useFetchCheckedOutBooksQuery();
  const [returnBook, {isLoading: isUpdating, returnData}] = useReturnBookMutation();

  const handleReturnBook = async (id) => {
    console.log('bookid*******', id)
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
  console.log(checkedOutBooksArray, 'books')
  
  if(!data.isLoggedIn) {
    return (
      <div>
        <h1>Welcome {data.firstname}!</h1>
        <h2>Account Details:</h2>
        <p>Name: {userFullName}</p>
        <p>Email: {data.email}</p>

        <h2>Books Currently Checked Out:</h2>
        <ul>
          {checkedOutBooksArray.map((reservation) => (
            <li key={reservation.id}>
              <div>
                {reservation.id}
                <strong>Title:</strong> {reservation.title}
              </div>
              <div>
                <strong>Author:</strong>{reservation.author}
              </div>
              <div>
                <button onClick={() => handleReturnBook(reservation.id)}>Return Book</button>
                <button className="books" onClick={() => navigate('/books')}>Books</button>
              </div>
            </li>
          ))}
        </ul>
        <Logout />
      </div>
    );
  }
  return <div>User is Logged in</div>
}


export default Profile;
