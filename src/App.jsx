import { Routes, Route } from 'react-router-dom'
import AllBooks from './components/Books'
import RegistrationForm from './components/Register'
import Login from './components/Login'
import Logout from './components/Logout'
import SingleBook from './components/SingleBook'
import Profile from './components/Account'
import Home from'.//components/Home'
import './index.css'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/books' element={<AllBooks />} />
        <Route path='/users/register' element={<RegistrationForm />} />
        <Route path='/books/:bookId' element={<SingleBook />} />
        <Route path='/auth/login' element={<Login />} />
        <Route path='/users/login' element={<Login />} />
        <Route path='/auth/logout' element={<Logout />} />
        <Route path='/users/me' element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
