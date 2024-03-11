import { render, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import Login from '../components/Login'

const initialState = {};
const mockStore = configureStore();
let store;

const WrappedLogin = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  </Provider>
);

beforeEach(() => {
  store = mockStore(initialState);
});

test('Login form renders correctly', ()=> {
  const { getByLabelText, getByRole } = render(<WrappedLogin />);
  expect(getByLabelText(/Email Address/i)).toBeInTheDocument();
  expect(getByLabelText(/Password/i)).toBeInTheDocument();
  expect(getByRole('button', { name: /Login/i})).toBeInTheDocument();
})

test('Show Alert if email or password is missing', async () => {
  window.alert = jest.fn();

  const { getByRole } = render(<WrappedLogin />);
  const loginButton = getByRole('button', { name: /Login/i });
  
  fireEvent.click(loginButton);
  
  await waitFor(() => {
    expect(window.alert).toHaveBeenCalledWith("You must enter both email and password");
  });
});


