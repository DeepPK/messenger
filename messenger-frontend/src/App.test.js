import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
  post: jest.fn(() => Promise.resolve()),
  delete: jest.fn(() => Promise.resolve())
}));

describe('App', () => {
  test('renders without crashing', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/Messenger/i)).toBeInTheDocument();
    });
  });
});
