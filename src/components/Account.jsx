/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import { useAuthenticateQuery } from "../API/api";

function Profile() {
  //this will run when page loads
  const { data, error, isLoading } = useAuthenticateQuery();
  if(isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Welcome{data.username}!</h1>
      <p>My Profile</p>
    </div>
  );
}

export default Profile;
