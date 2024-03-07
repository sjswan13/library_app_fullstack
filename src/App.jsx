import { Routes, Route } from 'react-router-dom'
import AllBooks from './components/Books'
import RegistrationForm from './components/Register'
import SingleBook from './components/SingleBook'
import './index.css'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<AllBooks />} />
        <Route path='/users/register' element={<RegistrationForm />} />
        <Route path='/books/:bookId' element={<SingleBook />} />
      </Routes>
    </>
  );
}

export default App;
