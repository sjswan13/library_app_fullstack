import { render, screen } from '@testing-library/react'
import { describe, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom';
import Home from '../components/Home'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../redux/authslice'

describe('<Home />', () => {
  it('renders the welcome message', async () => {
    const store = configureStore({
      reducer: {
        auth: authSlice,
      },
    });

    render(
      <Provider store= {store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

   const welcomeMessage = await screen.findByText(/Welcome to the Book Buddy Library Page!!/i);
   expect(welcomeMessage).toBeInTheDocument();
  });
});